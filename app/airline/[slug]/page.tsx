import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AirlineHero } from "@/app/components/airline/airline-hero";
import { AirlineOperatingAirports } from "@/app/components/airline/airline-operating-airports";
import { AirlineOverview } from "@/app/components/airline/airline-overview";
import { AirlinePageShell } from "@/app/components/airline/airline-page-shell";
import { AirlineStatusCard } from "@/app/components/airline/airline-status-card";
import { RelatedAirlines } from "@/app/components/airline/related-airlines";
import { LiveAlerts } from "@/app/components/dashboard/live-alerts";
import { breadcrumbJsonLd } from "@/app/components/layout/breadcrumbs";
import {
  getAirlineBySlug,
  getAllAirlineSlugs,
  getRelatedAirlines,
} from "@/app/lib/airlines-data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://darbiy.app";

export function generateStaticParams() {
  return getAllAirlineSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const airline = getAirlineBySlug(slug);

  if (!airline) {
    return {
      title: "شركة طيران غير موجودة | داربي",
      description: "لم يتم العثور على صفحة شركة الطيران المطلوبة.",
    };
  }

  const title = `${airline.nameAr} | داربي`;
  const description =
    airline.overviewAr.length > 168
      ? `${airline.overviewAr.slice(0, 165).trimEnd()}…`
      : airline.overviewAr;

  return {
    title,
    description,
    keywords: [
      airline.nameAr,
      airline.nameEn,
      airline.countryAr,
      airline.countryEn,
      airline.code,
      "تنبيهات طيران",
      "شركة طيران",
      "مسافرين عرب",
      "داربي",
    ],
    openGraph: {
      title,
      description,
      locale: "ar_SA",
      type: "website",
      url: `${siteUrl}/airline/${airline.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `/airline/${airline.slug}`,
    },
  };
}

export default async function AirlinePage({ params }: PageProps) {
  const { slug } = await params;
  const airline = getAirlineBySlug(slug);

  if (!airline) {
    notFound();
  }

  const relatedAirlines = getRelatedAirlines(slug);
  const breadcrumbs = [
    { label: "الرئيسية", href: "/" },
    { label: "شركات الطيران", href: "/#airlines" },
    { label: airline.nameAr, href: `/airline/${airline.slug}` },
  ];
  const jsonLd = breadcrumbJsonLd(breadcrumbs, siteUrl);

  return (
    <AirlinePageShell airline={airline}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <AirlineHero airline={airline} />

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <LiveAlerts
            airlineSearchTerms={airline.searchTerms}
            title="تنبيهات الشركة المباشرة"
            subtitle={`رحلات مرتبطة بـ ${airline.nameAr} · تحديث كل ٣٠ ثانية`}
            emptyMessage={`لا توجد تنبيهات مرتبطة بـ ${airline.nameAr} حالياً`}
          />
          <AirlineOverview airline={airline} />
        </div>
        <div className="space-y-8">
          <AirlineStatusCard airline={airline} />
          <AirlineOperatingAirports airline={airline} />
        </div>
      </div>

      <RelatedAirlines airlines={relatedAirlines} currentSlug={slug} />
    </AirlinePageShell>
  );
}

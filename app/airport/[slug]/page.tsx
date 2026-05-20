import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AirportAirlines } from "@/app/components/airport/airport-airlines";
import { AirportHero } from "@/app/components/airport/airport-hero";
import { AirportPageShell } from "@/app/components/airport/airport-page-shell";
import { AirportStatusCard } from "@/app/components/airport/airport-status-card";
import { RelatedAirports } from "@/app/components/airport/related-airports";
import { LiveAlerts } from "@/app/components/dashboard/live-alerts";
import { breadcrumbJsonLd } from "@/app/components/layout/breadcrumbs";
import {
  getAirportBySlug,
  getAllAirportSlugs,
  getRelatedAirports,
} from "@/app/lib/airports-data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://darbiy.app";

export function generateStaticParams() {
  return getAllAirportSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const airport = getAirportBySlug(slug);

  if (!airport) {
    return {
      title: "مطار غير موجود | داربي",
      description: "لم يتم العثور على صفحة المطار المطلوبة.",
    };
  }

  const title = `${airport.nameAr} | داربي`;
  const description = `تنبيهات مباشرة، حالة تشغيلية، وشركات الطيران في ${airport.nameAr} — ${airport.cityAr}، ${airport.countryAr}.`;

  return {
    title,
    description,
    keywords: [
      airport.nameAr,
      airport.cityAr,
      airport.countryAr,
      airport.code,
      "تنبيهات مطار",
      "رحلات",
      "داربي",
    ],
    openGraph: {
      title,
      description,
      locale: "ar_SA",
      type: "website",
      url: `${siteUrl}/airport/${airport.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `/airport/${airport.slug}`,
    },
  };
}

export default async function AirportPage({ params }: PageProps) {
  const { slug } = await params;
  const airport = getAirportBySlug(slug);

  if (!airport) {
    notFound();
  }

  const relatedAirports = getRelatedAirports(slug);
  const breadcrumbs = [
    { label: "الرئيسية", href: "/" },
    { label: "المطارات", href: "/#airports" },
    { label: airport.cityAr, href: `/airport/${airport.slug}` },
  ];
  const jsonLd = breadcrumbJsonLd(breadcrumbs, siteUrl);

  return (
    <AirportPageShell airport={airport}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <AirportHero airport={airport} />

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <LiveAlerts
            airportSearchTerms={airport.searchTerms}
            title="تنبيهات المطار المباشرة"
            subtitle={`رحلات مرتبطة بـ ${airport.nameAr} · تحديث كل ٣٠ ثانية`}
            emptyMessage={`لا توجد تنبيهات مرتبطة بـ ${airport.cityAr} حالياً`}
          />
        </div>
        <div className="space-y-8">
          <AirportStatusCard airport={airport} />
          <AirportAirlines airport={airport} />
        </div>
      </div>

      <RelatedAirports airports={relatedAirports} currentSlug={slug} />
    </AirportPageShell>
  );
}

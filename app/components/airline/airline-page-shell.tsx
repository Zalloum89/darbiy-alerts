"use client";

import type { ReactNode } from "react";
import type { AirlineDefinition } from "@/app/lib/airlines-data";
import { AppLayout } from "@/app/components/layout/app-layout";
import { PageHeader } from "@/app/components/layout/page-header";
import type { BreadcrumbItem } from "@/app/components/layout/breadcrumbs";

type AirlinePageShellProps = {
  airline: AirlineDefinition;
  children: ReactNode;
};

function getAirlineBreadcrumbs(airline: AirlineDefinition): BreadcrumbItem[] {
  return [
    { label: "الرئيسية", href: "/" },
    { label: "شركات الطيران", href: "/#airlines" },
    { label: airline.nameAr, href: `/airline/${airline.slug}` },
  ];
}

export function AirlinePageShell({ airline, children }: AirlinePageShellProps) {
  const breadcrumbs = getAirlineBreadcrumbs(airline);

  return (
    <AppLayout
      renderHeader={({ onMenuClick }) => (
        <PageHeader
          eyebrow="داربي · صفحة شركة الطيران"
          title={airline.nameAr}
          subtitle={`${airline.countryAr} · ${airline.code}`}
          breadcrumbs={breadcrumbs}
          onMenuClick={onMenuClick}
        />
      )}
    >
      <main className="mx-auto w-full max-w-7xl flex-1 space-y-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        {children}
      </main>
    </AppLayout>
  );
}

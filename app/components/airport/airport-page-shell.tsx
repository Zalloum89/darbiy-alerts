"use client";

import type { ReactNode } from "react";
import type { AirportDefinition } from "@/app/lib/airports-data";
import { AppLayout } from "@/app/components/layout/app-layout";
import { PageHeader } from "@/app/components/layout/page-header";
import type { BreadcrumbItem } from "@/app/components/layout/breadcrumbs";

type AirportPageShellProps = {
  airport: AirportDefinition;
  children: ReactNode;
};

function getAirportBreadcrumbs(airport: AirportDefinition): BreadcrumbItem[] {
  return [
    { label: "الرئيسية", href: "/" },
    { label: "المطارات", href: "/#airports" },
    { label: airport.cityAr, href: `/airport/${airport.slug}` },
  ];
}

export function AirportPageShell({ airport, children }: AirportPageShellProps) {
  const breadcrumbs = getAirportBreadcrumbs(airport);

  return (
    <AppLayout
      renderHeader={({ onMenuClick }) => (
        <PageHeader
          eyebrow="صفحة المطار"
          title={airport.nameAr}
          subtitle={`${airport.cityAr} · ${airport.countryAr}`}
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

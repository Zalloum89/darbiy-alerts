"use client";

import { useState } from "react";
import { AppLayout } from "@/app/components/layout/app-layout";
import { PageHeader } from "@/app/components/layout/page-header";
import { AlertsSearchBar } from "./alerts-search-bar";
import { StatsCards } from "./stats-cards";
import { LiveAlerts } from "./live-alerts";
import { AirportsSection } from "./airports-section";
import { AirlinesSection } from "./airlines-section";

export function DashboardShell() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <AppLayout
      renderHeader={({ onMenuClick }) => (
        <PageHeader
          title="لوحة المراقبة"
          breadcrumbs={[{ label: "الرئيسية", href: "/" }]}
          onMenuClick={onMenuClick}
        />
      )}
    >
      <main className="mx-auto w-full max-w-7xl flex-1 space-y-10 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <AlertsSearchBar value={searchQuery} onChange={setSearchQuery} />

        <StatsCards />

        <LiveAlerts searchQuery={searchQuery} />

        <div className="grid gap-10 lg:grid-cols-2">
          <AirportsSection />
          <AirlinesSection />
        </div>
      </main>
    </AppLayout>
  );
}

"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { DashboardHeader } from "./header";
import { AlertsSearchBar } from "./alerts-search-bar";
import { StatsCards } from "./stats-cards";
import { LiveAlerts } from "./live-alerts";
import { AirportsSection } from "./airports-section";
import { AirlinesSection } from "./airlines-section";

export function DashboardShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

        <main className="mx-auto w-full max-w-7xl flex-1 space-y-10 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <AlertsSearchBar value={searchQuery} onChange={setSearchQuery} />

          <StatsCards />

          <LiveAlerts searchQuery={searchQuery} />

          <div className="grid gap-10 lg:grid-cols-2">
            <AirportsSection />
            <AirlinesSection />
          </div>
        </main>
      </div>
    </div>
  );
}

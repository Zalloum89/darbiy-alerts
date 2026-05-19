"use client";

import { useState, type ReactNode } from "react";
import { AppSidebar } from "./app-sidebar";
import { MobileBottomNav } from "./mobile-bottom-nav";
import { useLockBodyScroll } from "./use-lock-body-scroll";

type AppLayoutProps = {
  renderHeader: (props: { onMenuClick: () => void }) => ReactNode;
  children: ReactNode;
};

export function AppLayout({ renderHeader, children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useLockBodyScroll(sidebarOpen);

  const openMenu = () => setSidebarOpen(true);
  const closeMenu = () => setSidebarOpen(false);

  return (
    <>
      <div className="flex min-h-screen bg-slate-50 pb-[calc(4.5rem+env(safe-area-inset-bottom))] lg:pb-0">
        <AppSidebar open={sidebarOpen} onClose={closeMenu} />

        <div className="flex min-w-0 flex-1 flex-col">
          {renderHeader({ onMenuClick: openMenu })}
          {children}
        </div>
      </div>

      <MobileBottomNav onMenuClick={openMenu} />
    </>
  );
}

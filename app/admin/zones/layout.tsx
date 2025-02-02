import type { ReactNode } from "react";
import Sidebar from "@/components/layout/Sidebar";

interface AdminZonesLayoutProps {
  children: ReactNode;
}

export default function AdminZonesLayout({ children }: AdminZonesLayoutProps) {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="lg:pl-64">
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="space-y-8">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">
                  Dating Zones
                </h1>
                <p className="text-muted-foreground text-lg">
                  Create and manage exclusive dating zones for your users.
                </p>
              </div>
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

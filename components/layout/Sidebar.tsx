"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  LayoutDashboard,
  Map as MapIcon,
  Users,
  BarChart,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const navigationItems = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Dating Zones",
    href: "/admin/zones",
    icon: MapIcon,
  },
  {
    name: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    name: "Reports",
    href: "/admin/reports",
    icon: BarChart,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const NavContent = () => (
    <div className="space-y-4 py-4">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold">Admin Panel</h2>
        <Separator />
      </div>
      <nav className="space-y-1 px-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center rounded-md px-3 py-2 text-sm font-medium",
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <Icon className="mr-2 h-4 w-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="lg:hidden fixed top-4 left-4 z-40"
            size="icon"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <NavContent />
        </SheetContent>
      </Sheet>

      {/* Desktop */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex flex-col flex-grow border-r bg-background">
          <NavContent />
        </div>
      </div>
    </>
  );
}

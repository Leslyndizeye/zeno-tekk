"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  FileText,
  Users,
  MessageSquare,
  Package,
  Zap,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/admin",
  },
  {
    icon: Zap,
    label: "Hero Content",
    href: "/admin/hero-content",
  },
  {
    icon: FileText,
    label: "Services",
    href: "/admin/services",
  },
  {
    icon: Package,
    label: "Products",
    href: "/admin/products",
  },
  {
    icon: Users,
    label: "Team Members",
    href: "/admin/team",
  },
  {
    icon: MessageSquare,
    label: "Testimonials",
    href: "/admin/testimonials",
  },
  {
    icon: BarChart3,
    label: "Statistics",
    href: "/admin/stats",
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-card border-r border-border h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link href="/admin" className="text-2xl font-bold text-primary">
          Admin
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
              pathname === item.href
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-border">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-muted-foreground hover:bg-muted transition-all duration-200">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}

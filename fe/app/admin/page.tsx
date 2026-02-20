"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, FileText, Users, MessageSquare, Package, Zap } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const dashboardItems = [
    {
      icon: Zap,
      title: "Hero Content",
      description: "Manage the hero section content",
      href: "/admin/hero-content",
      color: "text-blue-500",
    },
    {
      icon: FileText,
      title: "Services",
      description: "Manage services and features",
      href: "/admin/services",
      color: "text-green-500",
    },
    {
      icon: Package,
      title: "Products",
      description: "Manage products and projects",
      href: "/admin/products",
      color: "text-purple-500",
    },
    {
      icon: Users,
      title: "Team Members",
      description: "Manage team members",
      href: "/admin/team",
      color: "text-orange-500",
    },
    {
      icon: MessageSquare,
      title: "Testimonials",
      description: "Manage customer testimonials",
      href: "/admin/testimonials",
      color: "text-pink-500",
    },
    {
      icon: BarChart3,
      title: "Statistics",
      description: "Manage homepage statistics",
      href: "/admin/stats",
      color: "text-indigo-500",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome to Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage all your website content from one place
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardItems.map((item, index) => (
          <Link key={index} href={item.href}>
            <Card className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border hover:border-primary/50 h-full">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center ${item.color}`}>
                  <item.icon className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

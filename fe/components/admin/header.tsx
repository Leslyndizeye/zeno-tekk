"use client";

import { Bell, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdminHeader() {
  return (
    <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold">Content Management</h2>
        <p className="text-sm text-muted-foreground">Manage your website content</p>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Bell className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Settings className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <User className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
}

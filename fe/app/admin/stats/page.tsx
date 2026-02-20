"use client";

import React from "react"

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Trash2, Edit, Plus } from "lucide-react";
import useSWR from "swr";

interface Stat {
  id: number;
  label: string;
  value: string;
  description?: string;
  isActive: boolean;
  order: number;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export default function StatsPage() {
  const { data, mutate, isLoading } = useSWR<{ success: boolean; data: Stat[] }>(
    `${API_URL}/content/stats/all`,
    fetcher
  );

  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    label: "",
    value: "",
    description: "",
    order: 0,
  });

  const stats = data?.data || [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      order: Number(formData.order),
    };

    try {
      if (editingId) {
        await fetch(`${API_URL}/content/stats/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch(`${API_URL}/content/stats`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      mutate();
      setIsOpen(false);
      setEditingId(null);
      setFormData({ label: "", value: "", description: "", order: 0 });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = (stat: Stat) => {
    setFormData({
      label: stat.label,
      value: stat.value,
      description: stat.description || "",
      order: stat.order,
    });
    setEditingId(stat.id);
    setIsOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure?")) {
      await fetch(`${API_URL}/content/stats/${id}`, { method: "DELETE" });
      mutate();
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setEditingId(null);
      setFormData({ label: "", value: "", description: "", order: 0 });
    }
    setIsOpen(open);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Statistics Management</h1>
          <p className="text-muted-foreground mt-2">Manage your homepage statistics</p>
        </div>
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Stat
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Stat" : "Add New Stat"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Label</label>
                <Input
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  placeholder="e.g., Projects Completed"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Value</label>
                <Input
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  placeholder="e.g., 500+"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description (optional)</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Description"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Order</label>
                <Input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                  placeholder="Order"
                />
              </div>
              <Button type="submit" className="w-full">
                {editingId ? "Update Stat" : "Create Stat"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <Card className="p-6">Loading...</Card>
      ) : (
        <div className="grid gap-4">
          {stats.map((stat) => (
            <Card key={stat.id} className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{stat.label}</h3>
                  <p className="text-2xl font-bold text-primary mt-2">{stat.value}</p>
                  {stat.description && (
                    <p className="text-muted-foreground text-sm mt-2">{stat.description}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(stat)}
                    className="gap-2"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(stat.id)}
                    className="gap-2 text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

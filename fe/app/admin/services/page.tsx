"use client";

import React from "react"

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Trash2, Edit, Plus } from "lucide-react";
import useSWR from "swr";

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
  isActive: boolean;
  order: number;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export default function ServicesPage() {
  const { data, mutate, isLoading, error } = useSWR<{ success: boolean; data: Service[] }>(
    `${API_URL}/content/services/all`,
    fetcher
  );

  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "",
    features: "",
    order: 0,
  });

  const services = data?.data || [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const featuresArray = formData.features
      .split(",")
      .map((f) => f.trim())
      .filter((f) => f);

    const payload = {
      ...formData,
      features: featuresArray,
      order: Number(formData.order),
    };

    try {
      if (editingId) {
        await fetch(`${API_URL}/content/services/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch(`${API_URL}/content/services`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      mutate();
      setIsOpen(false);
      setEditingId(null);
      setFormData({ title: "", description: "", icon: "", features: "", order: 0 });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = (service: Service) => {
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon,
      features: service.features.join(", "),
      order: service.order,
    });
    setEditingId(service.id);
    setIsOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure?")) {
      await fetch(`${API_URL}/content/services/${id}`, { method: "DELETE" });
      mutate();
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setEditingId(null);
      setFormData({ title: "", description: "", icon: "", features: "", order: 0 });
    }
    setIsOpen(open);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Services Management</h1>
          <p className="text-muted-foreground mt-2">Manage your service offerings</p>
        </div>
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Service" : "Add New Service"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Service title"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Service description"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Icon (lucide name)</label>
                <Input
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="e.g., Code2, Smartphone"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Features (comma-separated)</label>
                <Textarea
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  placeholder="Feature 1, Feature 2, Feature 3"
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
                {editingId ? "Update Service" : "Create Service"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <Card className="p-6">Loading...</Card>
      ) : (
        <div className="grid gap-4">
          {services.map((service) => (
            <Card key={service.id} className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{service.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{service.description}</p>
                  <div className="mt-3 space-y-1">
                    <p className="text-xs text-muted-foreground">Icon: {service.icon}</p>
                    {service.features.length > 0 && (
                      <p className="text-xs text-muted-foreground">Features: {service.features.join(", ")}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(service)}
                    className="gap-2"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(service.id)}
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

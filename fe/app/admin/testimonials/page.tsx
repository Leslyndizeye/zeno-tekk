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

interface Testimonial {
  id: number;
  clientName: string;
  clientCompany: string;
  content: string;
  clientImage?: string;
  rating: number;
  isActive: boolean;
  order: number;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export default function TestimonialsPage() {
  const { data, mutate, isLoading } = useSWR<{ success: boolean; data: Testimonial[] }>(
    `${API_URL}/content/testimonials/all`,
    fetcher
  );

  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    clientName: "",
    clientCompany: "",
    content: "",
    clientImage: "",
    rating: 5,
    order: 0,
  });

  const testimonials = data?.data || [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      rating: Number(formData.rating),
      order: Number(formData.order),
    };

    try {
      if (editingId) {
        await fetch(`${API_URL}/content/testimonials/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch(`${API_URL}/content/testimonials`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      mutate();
      setIsOpen(false);
      setEditingId(null);
      setFormData({
        clientName: "",
        clientCompany: "",
        content: "",
        clientImage: "",
        rating: 5,
        order: 0,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setFormData({
      clientName: testimonial.clientName,
      clientCompany: testimonial.clientCompany,
      content: testimonial.content,
      clientImage: testimonial.clientImage || "",
      rating: testimonial.rating,
      order: testimonial.order,
    });
    setEditingId(testimonial.id);
    setIsOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure?")) {
      await fetch(`${API_URL}/content/testimonials/${id}`, { method: "DELETE" });
      mutate();
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setEditingId(null);
      setFormData({
        clientName: "",
        clientCompany: "",
        content: "",
        clientImage: "",
        rating: 5,
        order: 0,
      });
    }
    setIsOpen(open);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Testimonials Management</h1>
          <p className="text-muted-foreground mt-2">Manage customer testimonials</p>
        </div>
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Testimonial" : "Add New Testimonial"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Client Name</label>
                <Input
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  placeholder="Client name"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Client Company</label>
                <Input
                  value={formData.clientCompany}
                  onChange={(e) => setFormData({ ...formData, clientCompany: e.target.value })}
                  placeholder="Company name"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Testimonial Content</label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Testimonial text"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Client Image URL (optional)</label>
                <Input
                  value={formData.clientImage}
                  onChange={(e) => setFormData({ ...formData, clientImage: e.target.value })}
                  placeholder="Image URL"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Rating (1-5)</label>
                <Input
                  type="number"
                  min="1"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                  placeholder="Rating"
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
                {editingId ? "Update Testimonial" : "Create Testimonial"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <Card className="p-6">Loading...</Card>
      ) : (
        <div className="grid gap-4">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="p-6">
              <div className="flex gap-4 justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">{testimonial.clientName}</h3>
                    <span className="text-yellow-500">{"★".repeat(Math.floor(testimonial.rating))}</span>
                  </div>
                  <p className="text-primary text-sm font-medium">{testimonial.clientCompany}</p>
                  <p className="text-muted-foreground text-sm mt-2">{testimonial.content}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(testimonial)}
                    className="gap-2"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(testimonial.id)}
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

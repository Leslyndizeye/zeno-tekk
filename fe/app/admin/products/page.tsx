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

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  url?: string;
  isActive: boolean;
  order: number;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export default function ProductsPage() {
  const { data, mutate, isLoading } = useSWR<{ success: boolean; data: Product[] }>(
    `${API_URL}/content/products/all`,
    fetcher
  );

  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    image: "",
    url: "",
    order: 0,
  });

  const products = data?.data || [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      order: Number(formData.order),
    };

    try {
      if (editingId) {
        await fetch(`${API_URL}/content/products/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch(`${API_URL}/content/products`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      mutate();
      setIsOpen(false);
      setEditingId(null);
      setFormData({ title: "", description: "", category: "", image: "", url: "", order: 0 });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = (product: Product) => {
    setFormData({
      title: product.title,
      description: product.description,
      category: product.category,
      image: product.image,
      url: product.url || "",
      order: product.order,
    });
    setEditingId(product.id);
    setIsOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure?")) {
      await fetch(`${API_URL}/content/products/${id}`, { method: "DELETE" });
      mutate();
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setEditingId(null);
      setFormData({ title: "", description: "", category: "", image: "", url: "", order: 0 });
    }
    setIsOpen(open);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Products Management</h1>
          <p className="text-muted-foreground mt-2">Manage your product portfolio</p>
        </div>
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Product" : "Add New Product"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Product title"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Product description"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Category</label>
                <Input
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g., Web, Mobile, AI/ML"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Image URL</label>
                <Input
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="Image URL"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Project URL (optional)</label>
                <Input
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="Project URL"
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
                {editingId ? "Update Product" : "Create Product"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <Card className="p-6">Loading...</Card>
      ) : (
        <div className="grid gap-4">
          {products.map((product) => (
            <Card key={product.id} className="p-6">
              <div className="flex gap-4 justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{product.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{product.description}</p>
                  <div className="mt-3 space-y-1">
                    <p className="text-xs text-muted-foreground">Category: {product.category}</p>
                    {product.url && (
                      <p className="text-xs text-muted-foreground">URL: {product.url}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(product)}
                    className="gap-2"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(product.id)}
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

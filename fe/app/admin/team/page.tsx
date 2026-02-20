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

interface TeamMember {
  id: number;
  name: string;
  position: string;
  bio?: string;
  image: string;
  email?: string;
  linkedin?: string;
  twitter?: string;
  isActive: boolean;
  order: number;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export default function TeamPage() {
  const { data, mutate, isLoading } = useSWR<{ success: boolean; data: TeamMember[] }>(
    `${API_URL}/content/team/all`,
    fetcher
  );

  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    bio: "",
    image: "",
    email: "",
    linkedin: "",
    twitter: "",
    order: 0,
  });

  const teamMembers = data?.data || [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      order: Number(formData.order),
    };

    try {
      if (editingId) {
        await fetch(`${API_URL}/content/team/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch(`${API_URL}/content/team`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      mutate();
      setIsOpen(false);
      setEditingId(null);
      setFormData({
        name: "",
        position: "",
        bio: "",
        image: "",
        email: "",
        linkedin: "",
        twitter: "",
        order: 0,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = (member: TeamMember) => {
    setFormData({
      name: member.name,
      position: member.position,
      bio: member.bio || "",
      image: member.image,
      email: member.email || "",
      linkedin: member.linkedin || "",
      twitter: member.twitter || "",
      order: member.order,
    });
    setEditingId(member.id);
    setIsOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure?")) {
      await fetch(`${API_URL}/content/team/${id}`, { method: "DELETE" });
      mutate();
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setEditingId(null);
      setFormData({
        name: "",
        position: "",
        bio: "",
        image: "",
        email: "",
        linkedin: "",
        twitter: "",
        order: 0,
      });
    }
    setIsOpen(open);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Team Management</h1>
          <p className="text-muted-foreground mt-2">Manage your team members</p>
        </div>
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Member" : "Add New Member"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Full name"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Position</label>
                <Input
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  placeholder="Job position"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Bio (optional)</label>
                <Textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Short bio"
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
                <label className="text-sm font-medium">Email (optional)</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Email address"
                />
              </div>
              <div>
                <label className="text-sm font-medium">LinkedIn (optional)</label>
                <Input
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  placeholder="LinkedIn URL"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Twitter (optional)</label>
                <Input
                  value={formData.twitter}
                  onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                  placeholder="Twitter handle"
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
                {editingId ? "Update Member" : "Create Member"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <Card className="p-6">Loading...</Card>
      ) : (
        <div className="grid gap-4">
          {teamMembers.map((member) => (
            <Card key={member.id} className="p-6">
              <div className="flex gap-4 justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-primary text-sm font-medium">{member.position}</p>
                  {member.bio && (
                    <p className="text-muted-foreground text-sm mt-2">{member.bio}</p>
                  )}
                  <div className="mt-3 space-y-1">
                    {member.email && (
                      <p className="text-xs text-muted-foreground">Email: {member.email}</p>
                    )}
                    {member.linkedin && (
                      <p className="text-xs text-muted-foreground">LinkedIn: {member.linkedin}</p>
                    )}
                    {member.twitter && (
                      <p className="text-xs text-muted-foreground">Twitter: {member.twitter}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(member)}
                    className="gap-2"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(member.id)}
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

"use client";

import React from "react"

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import useSWR from "swr";

interface HeroContent {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  ctaButton1Text: string;
  ctaButton1Url: string;
  ctaButton2Text: string;
  ctaButton2Url: string;
  badge: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export default function HeroContentPage() {
  const { data, mutate, isLoading } = useSWR<{ success: boolean; data: HeroContent }>(
    `${API_URL}/content/hero-content`,
    fetcher
  );

  const [formData, setFormData] = useState<Partial<HeroContent>>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (data?.data) {
      setFormData(data.data);
    }
  }, [data]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = await fetch(`${API_URL}/content/hero-content`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        mutate();
        // Show success message (you could add a toast here)
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <Card className="p-6">Loading...</Card>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Hero Content Management</h1>
        <p className="text-muted-foreground mt-2">Edit your homepage hero section</p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium">Badge Text</label>
              <Input
                value={formData.badge || ""}
                onChange={(e) => handleChange("badge", e.target.value)}
                placeholder="Badge text"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Main Title</label>
            <Textarea
              value={formData.title || ""}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Main hero title"
              rows={3}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Subtitle (highlighted text)</label>
            <Input
              value={formData.subtitle || ""}
              onChange={(e) => handleChange("subtitle", e.target.value)}
              placeholder="Highlighted subtitle"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={formData.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Hero section description"
              rows={4}
            />
          </div>

          <div className="border-t pt-6">
            <h3 className="font-semibold mb-4">Call-to-Action Buttons</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium">Button 1 Text</label>
                <Input
                  value={formData.ctaButton1Text || ""}
                  onChange={(e) => handleChange("ctaButton1Text", e.target.value)}
                  placeholder="Button text"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Button 1 URL</label>
                <Input
                  value={formData.ctaButton1Url || ""}
                  onChange={(e) => handleChange("ctaButton1Url", e.target.value)}
                  placeholder="/path"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Button 2 Text</label>
                <Input
                  value={formData.ctaButton2Text || ""}
                  onChange={(e) => handleChange("ctaButton2Text", e.target.value)}
                  placeholder="Button text"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Button 2 URL</label>
                <Input
                  value={formData.ctaButton2Url || ""}
                  onChange={(e) => handleChange("ctaButton2Url", e.target.value)}
                  placeholder="/path"
                />
              </div>
            </div>
          </div>

          <Button type="submit" disabled={isSaving} className="w-full">
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </Card>

      <Card className="p-6 bg-muted/50">
        <h3 className="font-semibold mb-3">Preview</h3>
        <div className="space-y-2 text-sm">
          <p className="text-primary text-xs">{formData.badge}</p>
          <h2 className="text-xl font-bold">{formData.title}</h2>
          <p className="text-muted-foreground">{formData.description}</p>
          <div className="pt-4 flex gap-2">
            <span className="px-3 py-1 bg-primary text-primary-foreground rounded text-xs">
              {formData.ctaButton1Text}
            </span>
            <span className="px-3 py-1 border border-border rounded text-xs">
              {formData.ctaButton2Text}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}

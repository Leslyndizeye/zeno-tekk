"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send, MessageCircle, Twitter, Github, Linkedin, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { toast } from "sonner"

export default function Contact02() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" })
  const [sending, setSending] = useState(false)
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    try {
      const res = await fetch(`${API_URL}/content/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        toast.success("Message sent! We'll get back to you soon.")
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        const err = await res.json()
        toast.error(err.message || "Failed to send message")
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setSending(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section className="py-24 bg-white dark:bg-background min-h-screen flex items-center">
      <div className="container px-4 mx-auto">
        <Card className="max-w-6xl mx-auto bg-white dark:bg-muted/20 border border-border/40 rounded-3xl overflow-hidden backdrop-blur-sm shadow-2xl flex flex-col lg:flex-row p-0">
          {/* Left Side: Info */}
          <div className="lg:w-2/5 bg-gradient-to-br from-primary via-primary to-primary/90 dark:from-primary dark:via-primary/80 dark:to-primary/70 p-10 lg:p-14 text-primary-foreground relative overflow-hidden">
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-32 -mb-32" />

            <div className="relative z-10 h-full flex flex-col">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="mb-12"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-5 h-5" />
                  <span className="text-[11px] font-black uppercase tracking-widest text-primary-foreground/70">Always Online</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight leading-none">Send us a Message.</h2>
                <p className="text-primary-foreground/70 text-base leading-relaxed">
                  Fill out the form below and we'll get back to you shortly. We're here to support your success 24/7.
                </p>
              </motion.div>

              <div className="space-y-6 flex-1">
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center transition-all group-hover:bg-white/20">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary-foreground/50 mb-1">Email us</p>
                    <p className="text-base font-bold text-white">info@zenotekk.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center transition-all group-hover:bg-white/20">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary-foreground/50 mb-1">Call us</p>
                    <p className="text-base font-bold text-white">+250 788 123 456</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center transition-all group-hover:bg-white/20">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary-foreground/50 mb-1">Visit us</p>
                    <p className="text-base font-bold text-white">Kigali, Rwanda</p>
                  </div>
                </div>
              </div>

              <div className="pt-12 flex gap-3">
                {[
                  { Icon: Twitter, href: "https://twitter.com/zenotekk" },
                  { Icon: Github, href: "https://github.com/zenotekk" },
                  { Icon: Linkedin, href: "https://linkedin.com/company/zenotekk" },
                ].map(({ Icon, href }, i) => (
                  <a key={i} href={href} target="_blank" rel="noopener noreferrer">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white hover:text-white transition-colors"
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </Button>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="lg:w-3/5 p-10 lg:p-14 bg-white dark:bg-background/50">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Full Name</label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="bg-gray-100 dark:bg-muted/30 border-none rounded-xl px-4 h-12 focus-visible:ring-2 focus-visible:ring-primary/20 transition-all placeholder:text-muted-foreground/50 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Email Address</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="bg-gray-100 dark:bg-muted/30 border-none rounded-xl px-4 h-12 focus-visible:ring-2 focus-visible:ring-primary/20 transition-all placeholder:text-muted-foreground/50 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Company / Project</label>
                <Input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="ACME Corp"
                  required
                  className="bg-gray-100 dark:bg-muted/30 border-none rounded-xl px-4 h-12 focus-visible:ring-2 focus-visible:ring-primary/20 transition-all placeholder:text-muted-foreground/50 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Your Message</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us about your project..."
                  required
                  className="bg-gray-100 dark:bg-muted/30 border-none rounded-xl px-5 py-3 focus-visible:ring-2 focus-visible:ring-primary/20 transition-all placeholder:text-muted-foreground/50 resize-none text-sm"
                />
              </div>

              <Button
                type="submit"
                disabled={sending}
                className="w-full h-12 bg-foreground text-background font-black rounded-xl flex items-center justify-center gap-3 hover:bg-foreground/90 transition-all shadow-xl text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                {sending ? "Sending..." : "Send Message"}
              </Button>

              <div className="pt-8 flex items-center gap-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                <MessageCircle className="w-4 h-4 text-primary" />
                <span>
                  Need urgent help? <a href="tel:+250788123456" className="underline text-foreground hover:text-primary transition-colors">
                    Call us now
                  </a>
                </span>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </section>
  )
}

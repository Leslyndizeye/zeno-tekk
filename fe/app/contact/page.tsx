"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Users, Headphones, Plus, Minus, HelpCircle, ArrowUpRight, Twitter, Github, Linkedin, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" })
  const [sending, setSending] = useState(false)
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    const initAOS = async () => {
      if (typeof window !== "undefined") {
        const AOS = (await import("aos")).default
        AOS.init({
          duration: 1000,
          once: true,
          offset: 100,
        })
      }
    }
    initAOS()
  }, [])

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
    } catch {
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
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "4s" }}
          />
          <div
            className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "6s", animationDelay: "1s" }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1 data-aos="fade-up" className="text-5xl md:text-6xl font-bold leading-tight text-balance">
              Let's Start a <span className="text-primary">Conversation</span>
            </h1>
            <p data-aos="fade-up" data-aos-delay="200" className="text-xl text-muted-foreground text-pretty">
              Have a project in mind? We'd love to hear from you. Send us a message and we'll respond as soon as
              possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section id="get-in-touch" className="py-16 bg-white dark:bg-black">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {[
              { icon: Mail,  label: "Email Us",      value: "info@zenotekk.com",    desc: "Drop us a line anytime — we read every message." },
              { icon: Phone, label: "Call Us",        value: "+250 788 123 456",     desc: "Available 24/7 — always someone on the line." },
              { icon: MapPin,label: "Visit Us",       value: "Kigali, Rwanda",       desc: "KG 7 Ave, Kigali Heights." },
              { icon: Clock, label: "Always On",      value: "24 / 7",               desc: "We work around the clock, every day of the year." },
            ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
                  className="h-full"
                >
                  <Card className="relative p-0 border-border/40 bg-muted/5 hover:bg-muted/10 overflow-hidden group h-full"
                    style={{ transition: "box-shadow 0.8s ease, background 0.8s ease" }}
                  >
                    <CardContent className="p-8">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -mr-12 -mt-12 transition-all duration-[900ms] group-hover:bg-primary/15" />

                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"
                          style={{ transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.6s ease" }}
                        >
                          <item.icon className="w-5 h-5 text-primary" style={{ transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)" }} />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{item.label}</span>
                      </div>

                      <h3 className="text-2xl font-black mb-2 tracking-tight">{item.value}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form — Contact02 Style */}
      <section className="py-16 bg-white dark:bg-black">
        <div className="container mx-auto px-6">
          <Card className="max-w-6xl mx-auto border border-border rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row p-0" data-aos="fade-up">

            {/* Left — Info Panel */}
            <div className="lg:w-2/5 p-10 lg:p-14 text-white relative overflow-hidden" style={{ backgroundColor: "oklch(0.55 0.25 250)" }}>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-32 -mb-32" />

              <div className="relative z-10 h-full flex flex-col">
                <div className="mb-12">
                  <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight leading-none">Get in touch.</h2>
                  <p className="text-primary-foreground/70 text-base leading-relaxed">
                    We're available <span className="font-bold text-primary-foreground">24/7</span> to help you build something amazing. Our team responds within hours — no matter the time zone.
                  </p>
                </div>

                <div className="space-y-6 flex-1">
                  {[
                    { icon: Mail,   label: "Email us",  value: "info@zenotekk.com" },
                    { icon: Phone,  label: "Call us",   value: "+250 788 123 456" },
                    { icon: MapPin, label: "Visit us",  value: "Kigali Heights, Rwanda" },
                    { icon: Clock,  label: "Available", value: "24 / 7 — Always on" },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center transition-all group-hover:bg-white/20 shrink-0">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-primary-foreground/50 mb-0.5">{label}</p>
                        <p className="text-sm font-bold">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-12 flex gap-3">
                  {[Twitter, Github, Linkedin].map((Icon, i) => (
                    <Button key={i} size="icon" variant="ghost" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white hover:text-white transition-colors">
                      <Icon className="w-3.5 h-3.5" />
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <div className="lg:w-3/5 p-10 lg:p-14 bg-background">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Full Name</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jean-Pierre Habimana"
                      required
                      className="bg-muted/30 border-none rounded-xl px-4 h-12 focus-visible:ring-2 focus-visible:ring-primary/20 placeholder:text-muted-foreground/50 text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Email Address</label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      className="bg-muted/30 border-none rounded-xl px-4 h-12 focus-visible:ring-2 focus-visible:ring-primary/20 placeholder:text-muted-foreground/50 text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Company / Project</label>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Your company or project name"
                    required
                    className="bg-muted/30 border-none rounded-xl px-4 h-12 focus-visible:ring-2 focus-visible:ring-primary/20 placeholder:text-muted-foreground/50 text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Your Message</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell us about your project, goals, or idea..."
                    required
                    className="bg-muted/30 border-none rounded-xl px-5 py-3 focus-visible:ring-2 focus-visible:ring-primary/20 placeholder:text-muted-foreground/50 resize-none text-sm"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={sending}
                  className="w-full h-12 bg-foreground text-background font-black rounded-xl flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-xl text-sm"
                >
                  <Send className="w-4 h-4" />
                  {sending ? "Sending..." : "Send Message"}
                </Button>

                <div className="pt-2 flex items-center gap-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  <MessageCircle className="w-4 h-4 text-primary shrink-0" />
                  <span>Prefer a quick call? <a href="tel:+250788123456" className="underline text-foreground">+250 788 123 456</a> — available 24/7</span>
                </div>
              </form>
            </div>
          </Card>

          {/* Map below */}
          <div className="max-w-6xl mx-auto mt-8" data-aos="fade-up">
            <Card className="overflow-hidden border-border rounded-3xl h-[320px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127641.84737051!2d30.0588584!3d-1.9440727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca4258ed8e797%3A0xe9b7e68a5cf8b5a!2sKigali%2C%20Rwanda!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ZENO TEKK Location"
              />
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 py-24 bg-white dark:bg-black">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 items-start gap-20 lg:grid-cols-2">
            <div className="lg:sticky lg:top-24" data-aos="fade-right">
              <h2 className="mb-10 text-4xl font-black leading-[1.1] tracking-tighter md:text-6xl">
                Your questions,
                <br /> <span className="text-primary italic underline decoration-primary/20 underline-offset-8">answered.</span>
              </h2>

              <p className="mb-12 max-w-sm text-sm italic leading-relaxed text-muted-foreground">
                Can&apos;t find what you&apos;re looking for? Reach out to our team and we&apos;ll guide you through the right next step for your project.
              </p>

              <Link href="/contact#get-in-touch">
                <Button
                  size="lg"
                  className="group flex h-12 items-center gap-3 rounded-2xl bg-zinc-950 px-8 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-xl shadow-black/20 transition-all hover:bg-zinc-900"
                >
                  Contact Technical Support
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Button>
              </Link>
            </div>

            <Accordion type="single" collapsible defaultValue="item-0" className="space-y-4" data-aos="fade-left">
              {[
                {
                  question: "What services can I contact ZENO TEKK about?",
                  answer:
                    "You can contact us about custom software, web and mobile apps, UI/UX design, AI solutions, cloud infrastructure, maintenance, and digital product strategy.",
                },
                {
                  question: "How quickly will your team respond?",
                  answer:
                    "We aim to respond as quickly as possible during business hours. For detailed project inquiries, we usually follow up with the next steps after reviewing your message.",
                },
                {
                  question: "Can I contact you even if my idea is still early?",
                  answer:
                    "Absolutely. You do not need a fully finished specification before reaching out. We can help you shape the idea, define requirements, and identify the best path forward.",
                },
                {
                  question: "Do you handle long-term support after launch?",
                  answer:
                    "Yes. We support clients beyond launch with maintenance, updates, optimization, issue resolution, and iterative product improvements.",
                },
              ].map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="overflow-hidden rounded-[2rem] border border-border bg-muted/10 transition-all duration-500 data-[state=open]:border-primary/20 data-[state=open]:bg-card data-[state=open]:shadow-xl"
                >
                  <AccordionTrigger className="group w-full justify-between p-8 text-left hover:no-underline [&>svg]:hidden">
                    <span className="pr-8 text-base font-black tracking-tight md:text-lg">{faq.question}</span>
                    <div className="shrink-0 rounded-xl bg-muted p-0 text-muted-foreground transition-colors group-data-[state=open]:bg-primary group-data-[state=open]:text-white">
                      <div className="flex h-10 w-10 items-center justify-center group-data-[state=open]:hidden">
                        <Plus className="h-4 w-4" />
                      </div>
                      <div className="hidden h-10 w-10 items-center justify-center group-data-[state=open]:flex">
                        <Minus className="h-4 w-4" />
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-8 pb-8">
                    <div className="mb-8 h-px bg-border opacity-50" />
                    <p className="max-w-lg text-sm leading-relaxed text-muted-foreground italic underline decoration-primary/5 underline-offset-4">
                      {faq.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Users, Headphones } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
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
            <div
              data-aos="fade-down"
              className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm text-primary mb-6"
            >
              Get In Touch
            </div>
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
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {[
              {
                icon: Mail,
                title: "Email Us",
                content: "info@zenotek.com",
                description: "Send us an email anytime",
                color: "from-blue-500/20 to-blue-600/20",
                iconColor: "text-blue-500",
              },
              {
                icon: Phone,
                title: "Call Us",
                content: "+250 788 123 456",
                description: "Mon-Fri from 8am to 5pm",
                color: "from-purple-500/20 to-purple-600/20",
                iconColor: "text-purple-500",
              },
              {
                icon: MapPin,
                title: "Visit Us",
                content: "Kigali, Rwanda",
                description: "KG 7 Ave, Kigali Heights",
                color: "from-cyan-500/20 to-cyan-600/20",
                iconColor: "text-cyan-500",
              },
              {
                icon: Clock,
                title: "Working Hours",
                content: "Mon - Fri",
                description: "8:00 AM - 5:00 PM",
                color: "from-orange-500/20 to-orange-600/20",
                iconColor: "text-orange-500",
              },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <Card
                  key={index}
                  data-aos="zoom-in"
                  data-aos-delay={index * 100}
                  className="p-8 group hover:shadow-2xl transition-all duration-[800ms] hover:-translate-y-2 border-border relative overflow-hidden"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-[800ms]`}
                  />
                  <div className="relative z-10">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-[800ms]`}
                    >
                      <Icon className={`w-7 h-7 ${item.iconColor}`} />
                    </div>
                    <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                    <p className="text-foreground font-medium mb-2">{item.content}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <Card data-aos="fade-right" className="p-10 border-border">
              <div className="mb-10">
                <h2 className="text-3xl font-bold mb-4">Send us a Message</h2>
                <p className="text-muted-foreground">Fill out the form below and we'll get back to you shortly.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-3">
                  <label htmlFor="name" className="text-sm font-medium">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="transition-all duration-500 focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="space-y-3">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="transition-all duration-500 focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="space-y-3">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    required
                    className="transition-all duration-500 focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="space-y-3">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    rows={6}
                    required
                    className="transition-all duration-500 focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full group transition-all duration-500">
                  Send Message
                  <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" />
                </Button>
              </form>
            </Card>

            {/* Map & Additional Info */}
            <div data-aos="fade-left" className="space-y-8">
              <Card className="overflow-hidden border-border h-[400px]">
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

              <div className="grid grid-cols-1 gap-6">
                {[
                  {
                    icon: MessageSquare,
                    title: "Live Chat",
                    description: "Chat with our team in real-time",
                    color: "from-blue-500/20 to-blue-600/20",
                  },
                  {
                    icon: Users,
                    title: "Community",
                    description: "Join our developer community",
                    color: "from-purple-500/20 to-purple-600/20",
                  },
                  {
                    icon: Headphones,
                    title: "24/7 Support",
                    description: "We're here to help anytime",
                    color: "from-cyan-500/20 to-cyan-600/20",
                  },
                ].map((item, index) => {
                  const Icon = item.icon
                  return (
                    <Card
                      key={index}
                      className="p-6 group hover:shadow-lg transition-all duration-[800ms] hover:-translate-y-1 border-border relative overflow-hidden"
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-[800ms]`}
                      />
                      <div className="relative z-10 flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-[800ms]`}
                        >
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Quick answers to questions you may have</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "What services do you offer?",
                answer:
                  "We offer custom software development, web and mobile app development, AI/ML solutions, UI/UX design, and ongoing maintenance and support.",
              },
              {
                question: "How long does a typical project take?",
                answer:
                  "Project timelines vary based on complexity and scope. A simple website might take 2-4 weeks, while a complex application could take 3-6 months. We'll provide a detailed timeline during our initial consultation.",
              },
              {
                question: "Do you provide post-launch support?",
                answer:
                  "Yes! We offer comprehensive maintenance and support packages to ensure your software continues to run smoothly after launch.",
              },
              {
                question: "What is your development process?",
                answer:
                  "We follow an agile methodology with regular client communication, iterative development, and continuous testing to ensure quality and alignment with your goals.",
              },
            ].map((faq, index) => (
              <Card
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="p-8 border-border hover:shadow-lg transition-all duration-[800ms]"
              >
                <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

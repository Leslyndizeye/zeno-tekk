"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowRight,
  Code2,
  Smartphone,
  Brain,
  Palette,
  Wrench,
  Zap,
  Target,
  Eye,
  Heart,
  Rocket,
  Users,
  Award,
  Linkedin,
  Twitter,
  Mail,
  CheckCircle2,
  Send,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Loader } from "@/components/loader"
import { UserFeedback } from "@/components/user-feedback"
import { StatsCounter } from "@/components/stats-counter"
import { useTeamMembers } from "@/hooks/useApi"
import Link from "next/link"

interface HeroContent {
  title: string
  subtitle: string
  description: string
  badge: string
  ctaButton1Text: string
  ctaButton1Url: string
  ctaButton2Text: string
  ctaButton2Url: string
}

export default function HomePage() {
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null)
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const { teamMembers } = useTeamMembers()
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const res = await fetch(`${API_URL}/content/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm),
      })
      if (res.ok) {
        setSubmitted(true)
        setContactForm({ name: "", email: "", subject: "", message: "" })
      }
    } catch (err) {
      console.error("Failed to send message:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    const initAOS = async () => {
      if (typeof window !== "undefined") {
        const AOS = (await import("aos")).default
        AOS.init({
          duration: 1200,
          once: true,
          offset: 100,
          easing: "ease-out-cubic",
        })
      }
    }
    initAOS()

    // Fetch hero content
    fetch(`${API_URL}/content/hero-content`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setHeroContent(data.data)
        }
      })
      .catch((err) => console.error("Failed to fetch hero content:", err))
  }, [API_URL])

  const defaultHeroContent: HeroContent = {
    title: "Transform Ideas Into Innovative Software",
    subtitle: "Innovative Software",
    description:
      "We create high-quality, scalable, and user-friendly software solutions that drive efficiency, productivity, and growth for businesses worldwide.",
    badge: "Empowering Innovation",
    ctaButton1Text: "Explore Services",
    ctaButton1Url: "/services",
    ctaButton2Text: "View Our Work",
    ctaButton2Url: "/products",
  }

  const content = heroContent || defaultHeroContent

  return (
    <>
      <Loader />
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-24">
          {/* Animated Background Gradient */}
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

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-12">
              <h1 data-aos="fade-up" className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight text-balance">
                {content.title.split(content.subtitle).map((part, i, arr) => (
                  <span key={i}>
                    {part}
                    {i < arr.length - 1 && <span className="text-primary">{content.subtitle}</span>}
                  </span>
                ))}
              </h1>

              <p
                data-aos="fade-up"
                data-aos-delay="200"
                className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-pretty"
              >
                {content.description}
              </p>

              <div
                data-aos="fade-up"
                data-aos-delay="400"
                className="flex flex-col sm:flex-row gap-6 justify-center pt-4"
              >
                <Link href={content.ctaButton1Url}>
                  <Button size="lg" className="group transition-all duration-500 hover:scale-105 hover:shadow-lg">
                    {content.ctaButton1Text}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" />
                  </Button>
                </Link>
                <Link href={content.ctaButton2Url}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="transition-all duration-500 hover:scale-105 hover:shadow-lg bg-transparent"
                  >
                    {content.ctaButton2Text}
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
              <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values Section */}
        <section className="py-32 sm:py-40 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-20" data-aos="fade-up">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm text-primary mb-6">
                Who We Are
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-balance">Our Foundation</h2>
              <p className="text-lg sm:text-xl text-muted-foreground text-pretty">
                Built on principles of innovation, excellence, and client success.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
              <Card
                data-aos="fade-up"
                data-aos-delay="100"
                className="p-6 sm:p-8 text-center transition-all duration-700 hover:shadow-2xl hover:-translate-y-2 group border-border bg-card"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-all duration-700 group-hover:scale-110">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-muted-foreground text-pretty">
                  To empower businesses with innovative software solutions that drive growth, efficiency, and digital
                  transformation in an ever-evolving technological landscape.
                </p>
              </Card>

              <Card
                data-aos="fade-up"
                data-aos-delay="200"
                className="p-6 sm:p-8 text-center transition-all duration-700 hover:shadow-2xl hover:-translate-y-2 group border-border bg-card"
              >
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-all duration-700 group-hover:scale-110">
                  <Eye className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-muted-foreground text-pretty">
                  To become a global leader in software development, recognized for delivering cutting-edge solutions
                  that shape the future of technology and business innovation.
                </p>
              </Card>

              <Card
                data-aos="fade-up"
                data-aos-delay="300"
                className="p-6 sm:p-8 text-center transition-all duration-700 hover:shadow-2xl hover:-translate-y-2 group border-border bg-card sm:col-span-2 lg:col-span-1"
              >
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-500/20 transition-all duration-700 group-hover:scale-110">
                  <Heart className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Values</h3>
                <p className="text-muted-foreground text-pretty">
                  Excellence, integrity, innovation, and client success. We believe in building lasting partnerships
                  through transparency, quality, and continuous improvement.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats Counter Section */}
        <StatsCounter />

        {/* Why Choose Us Section */}
        <section className="py-32 sm:py-40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-20" data-aos="fade-up">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm text-primary mb-6">
                Why ZENO TEKK
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-balance">What Sets Us Apart</h2>
              <p className="text-lg sm:text-xl text-muted-foreground text-pretty">
                We combine technical expertise with business acumen to deliver exceptional results.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
              {[
                {
                  icon: Rocket,
                  title: "Fast Delivery",
                  description: "Agile methodology ensures rapid development without compromising quality.",
                },
                {
                  icon: Users,
                  title: "Expert Team",
                  description: "Seasoned developers with expertise across multiple technologies and domains.",
                },
                {
                  icon: Award,
                  title: "Quality Assurance",
                  description: "Rigorous testing and code reviews guarantee robust, bug-free solutions.",
                },
              ].map((feature, index) => (
                <Card
                  key={index}
                  data-aos="zoom-in"
                  data-aos-delay={index * 100}
                  className="p-6 sm:p-8 text-center transition-all duration-700 hover:shadow-2xl hover:-translate-y-2 group border-border bg-card"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-all duration-700 group-hover:scale-110">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground text-pretty">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Services Preview */}
        <section className="py-32 sm:py-40 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-20" data-aos="fade-right">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm text-primary mb-6">
                What We Do
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-balance">
                Comprehensive Software Solutions
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground text-pretty">
                From concept to deployment, we deliver end-to-end software development services.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Code2,
                  title: "Custom Software",
                  description: "Tailored applications built with modern technologies.",
                },
                {
                  icon: Smartphone,
                  title: "Web & Mobile Apps",
                  description: "Interactive and responsive applications for all platforms.",
                },
                {
                  icon: Brain,
                  title: "AI & Machine Learning",
                  description: "Smart software for automation and intelligent decisions.",
                },
                {
                  icon: Palette,
                  title: "UI/UX Design",
                  description: "Beautiful interfaces that enhance user engagement.",
                },
                {
                  icon: Wrench,
                  title: "Maintenance & Support",
                  description: "Long-term support for your software solutions.",
                },
                {
                  icon: Zap,
                  title: "DevOps Solutions",
                  description: "Streamlined deployment and cloud infrastructure.",
                },
              ].map((service, index) => (
                <Card
                  key={index}
                  data-aos="flip-left"
                  data-aos-delay={index * 100}
                  className="p-6 transition-all duration-700 hover:shadow-2xl hover:-translate-y-2 group border-border bg-card"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-all duration-700">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground text-pretty">{service.description}</p>
                </Card>
              ))}
            </div>

            <div className="text-center mt-16" data-aos="fade-up">
              <Link href="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="transition-all duration-500 hover:scale-105 hover:shadow-lg bg-transparent"
                >
                  View All Services
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* User Feedback Section */}
        <UserFeedback />

        {/* Team Members Section */}
        {teamMembers.length > 0 && (
          <section className="py-32 sm:py-40 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto text-center mb-20" data-aos="fade-up">
                <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm text-primary mb-6">
                  Our Team
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-balance">
                  The People Behind ZENO TEKK
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground text-pretty">
                  A passionate team of engineers, designers, and innovators dedicated to building world-class software.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                {teamMembers.map((member, index) => (
                  <Card
                    key={member.id}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                    className="p-6 sm:p-8 text-center transition-all duration-700 hover:shadow-2xl hover:-translate-y-2 group border-border bg-card"
                  >
                    <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-5 ring-4 ring-primary/10 group-hover:ring-primary/30 transition-all duration-700">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random&size=96`
                        }}
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-primary text-sm font-medium mb-3">{member.position}</p>
                    {member.bio && (
                      <p className="text-muted-foreground text-sm text-pretty mb-4 line-clamp-3">{member.bio}</p>
                    )}
                    <div className="flex items-center justify-center gap-3">
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-all duration-300"
                          title={`Email ${member.name}`}
                        >
                          <Mail className="w-4 h-4" />
                        </a>
                      )}
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-all duration-300"
                          title={`${member.name} on LinkedIn`}
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                      {member.twitter && (
                        <a
                          href={`https://twitter.com/${member.twitter.replace("@", "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-all duration-300"
                          title={`${member.name} on Twitter`}
                        >
                          <Twitter className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Contact Form Section */}
        <section className="py-32 sm:py-40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-14" data-aos="fade-up">
                <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm text-primary mb-6">
                  Get In Touch
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-balance">
                  Let's Build Something Together
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground text-pretty">
                  Have a project in mind? Drop us a message and we'll get back to you.
                </p>
              </div>

              <Card className="p-8 sm:p-10" data-aos="fade-up" data-aos-delay="100">
                {submitted ? (
                  <div className="text-center py-8 space-y-4">
                    <CheckCircle2 className="w-16 h-16 text-primary mx-auto" />
                    <h3 className="text-2xl font-bold">Message Sent!</h3>
                    <p className="text-muted-foreground">
                      Thanks for reaching out. We'll get back to you as soon as possible.
                    </p>
                    <Button variant="outline" onClick={() => setSubmitted(false)} className="mt-4">
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Your Name</label>
                        <Input
                          placeholder="John Doe"
                          value={contactForm.name}
                          onChange={(e) => setContactForm((prev) => ({ ...prev, name: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email Address</label>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          value={contactForm.email}
                          onChange={(e) => setContactForm((prev) => ({ ...prev, email: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Subject</label>
                      <Input
                        placeholder="What's this about?"
                        value={contactForm.subject}
                        onChange={(e) => setContactForm((prev) => ({ ...prev, subject: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Message</label>
                      <Textarea
                        placeholder="Tell us about your project or ask us anything..."
                        rows={5}
                        value={contactForm.message}
                        onChange={(e) => setContactForm((prev) => ({ ...prev, message: e.target.value }))}
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full transition-all duration-500 hover:scale-[1.02] hover:shadow-lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 sm:py-40" data-aos="fade-up">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="p-12 sm:p-16 md:p-20 text-center bg-linear-to-br from-primary/10 to-accent/10 border-primary/20 transition-all duration-700 hover:shadow-2xl">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-balance">
                Ready to Build Something Amazing?
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty">
                Let's transform your ideas into reality. Contact us today to start your project.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="transition-all duration-500 hover:scale-105 hover:shadow-lg">
                    Get Started Now
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/products">
                  <Button
                    size="lg"
                    variant="outline"
                    className="transition-all duration-500 hover:scale-105 hover:shadow-lg bg-transparent"
                  >
                    View Portfolio
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}

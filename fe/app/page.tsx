"use client"

import React, { useEffect, useState } from "react"
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
  Terminal,
  Boxes,
  ShieldCheck,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { UserFeedback } from "@/components/user-feedback"
import { StatsCounter } from "@/components/stats-counter"
import { useTeamMembers } from "@/hooks/useApi"
import { PlasmaHero } from "@/components/home/plasma-hero"
import { FoundationCardSkeleton, FeatureCardSkeleton, ServiceCardSkeleton } from "@/components/ui/card-skeleton"
import { useCardsReady } from "@/hooks/useCardsReady"
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

function FoundationCard({ icon: Icon, title, description, index }: { icon: React.ElementType; title: string; description: string; index: number }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Card
      data-aos="fade-up"
      data-aos-delay={(index + 1) * 100}
      className="relative h-full overflow-hidden border-border/40 bg-muted/5 p-0 cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        boxShadow: hovered ? "0 20px 40px -12px rgba(0,0,0,0.18)" : "none",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "box-shadow 0.7s ease, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      <div className="absolute -right-12 -top-12 h-24 w-24 rounded-full bg-primary/5 blur-2xl" />
      <div className="relative flex h-full flex-col p-8">
        <div className="mb-6 flex items-center gap-4">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10"
            style={{
              transform: hovered ? "scale(1.12)" : "scale(1)",
              transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{title}</span>
        </div>
        <h3 className="mb-3 text-2xl font-black tracking-tight">{title}</h3>
        <p className="text-muted-foreground text-pretty leading-relaxed">{description}</p>
      </div>
    </Card>
  )
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
  const homeCardGlow = {
    backgroundColor: "#070b19",
    borderColor: "rgba(91, 111, 232, 0.2)",
    glowColor: "91 111 232",
    borderRadius: 24,
    glowRadius: 56,
    glowIntensity: 1,
    coneSpread: 22,
    fillOpacity: 0,
    colors: ["#5b6fe8", "#7d8df0", "#d3dbff"],
  }

  return (
    <>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />

        <PlasmaHero
          badge={content.badge}
          title={content.title}
          subtitle={content.subtitle}
          description={content.description}
          primaryLabel={content.ctaButton1Text}
          primaryHref={content.ctaButton1Url}
          secondaryLabel={content.ctaButton2Text}
          secondaryHref={content.ctaButton2Url}
        />

        <div className="border-t border-border/25" />

        {/* Mission, Vision, Values Section */}
        <section id="foundation" className="py-16 sm:py-24 bg-white dark:bg-black">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12" data-aos="fade-up">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-balance">Our Foundation</h2>
              <p className="text-lg sm:text-xl text-muted-foreground text-pretty">
                Built on principles of innovation, excellence, and client success.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                  { icon: Target, title: "Our Mission", description: "To empower businesses with innovative software solutions that drive growth, efficiency, and digital transformation in an ever-evolving technological landscape." },
                  { icon: Eye,    title: "Our Vision",  description: "To become a global leader in software development, recognized for delivering cutting-edge solutions that shape the future of technology and business innovation." },
                  { icon: Heart,  title: "Our Values",  description: "Excellence, integrity, innovation, and client success. We believe in building lasting partnerships through transparency, quality, and continuous improvement." },
                ].map((item, index) => (
                  <FoundationCard key={item.title} icon={item.icon} title={item.title} description={item.description} index={index} />
                ))}
            </div>
          </div>
        </section>

        <div className="border-t border-border/25" />

        {/* Stats Counter Section */}
        <StatsCounter />

        <div className="border-t border-border/25" />

        {/* Why Choose Us Section */}
        <section id="why-us" className="py-16 sm:py-24 bg-background dark:bg-black">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12" data-aos="fade-up">
              {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Code2 className="w-3.5 h-3.5 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">Our Edge</span>
              </div> */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 tracking-tight leading-[1.1] text-foreground">
                What Sets Us <span className="text-primary italic underline decoration-primary/20 underline-offset-8">Apart</span>
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground text-pretty">
                We combine technical expertise with business acumen to deliver exceptional results.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
              {[
                  { icon: Rocket, title: "Fast Delivery", desc: "Agile methodology ensures rapid development cycles without ever compromising on quality.", code: `zenotekk.deploy({\n  target: "production",\n  strategy: "zero-downtime",\n  // shipped in record time\n});` },
                  { icon: Users, title: "Expert Team", desc: "Seasoned engineers with deep expertise across the full modern technology stack.", code: `const team = zenotekk.squad({\n  roles: ["fullstack", "devops",\n          "ai", "design"],\n  // senior-level by default\n});` },
                  { icon: ShieldCheck, title: "Quality Assurance", desc: "Rigorous testing and code reviews guarantee robust, battle-tested solutions.", code: `npm run test:coverage\n// ✓ 98 tests passed\n// ✓ 100% coverage\n// ✓ zero regressions` },
                ].map((feature, index) => (
                  <div key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                    <Card className="flex flex-col h-full bg-card border border-border rounded-4xl sm:rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:border-primary/30 group p-0">
                      <div className="p-6 sm:p-10 pb-4 sm:pb-6 flex items-start gap-3 sm:gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                          <feature.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-black tracking-tight mb-2 text-foreground">{feature.title}</h3>
                          <p className="text-muted-foreground text-sm italic leading-relaxed">&ldquo;{feature.desc}&rdquo;</p>
                        </div>
                      </div>
                      <div className="mt-auto p-4 pt-0">
                        <div className="bg-zinc-100 dark:bg-zinc-950 rounded-3xl p-6 font-mono text-[11px] text-zinc-500 dark:text-zinc-400 overflow-hidden relative group-hover:bg-zinc-200 dark:group-hover:bg-black transition-colors duration-500">
                          <div className="absolute top-4 right-4 flex gap-1.5 opacity-30">
                            <div className="w-2 h-2 rounded-full bg-red-500" />
                            <div className="w-2 h-2 rounded-full bg-amber-500" />
                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                          </div>
                          <pre className="overflow-x-auto"><code>{feature.code}</code></pre>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
            </div>
          </div>
        </section>

        <div className="border-t border-border/25" />

        {/* Services Preview */}
        <section id="services" className="py-16 sm:py-24 bg-background dark:bg-black">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10 sm:mb-12" data-aos="fade-up">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-balance text-foreground">
                Comprehensive Software Solutions
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground text-pretty">
                From concept to deployment, we deliver end-to-end software development services.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { icon: Code2,     title: "Custom Software",       desc: "Tailored applications built with modern technologies to fit your exact needs." },
                { icon: Smartphone,title: "Web & Mobile Apps",     desc: "Interactive and responsive applications for all platforms and screen sizes." },
                { icon: Brain,     title: "AI & Machine Learning", desc: "Smart software for automation, prediction, and intelligent decisions." },
                { icon: Palette,   title: "UI/UX Design",          desc: "Beautiful, intuitive interfaces that keep users engaged and coming back." },
                { icon: Wrench,    title: "Maintenance & Support",  desc: "Long-term support and updates to keep your software running flawlessly." },
                { icon: Zap,       title: "DevOps Solutions",       desc: "Streamlined CI/CD pipelines and cloud infrastructure that scale with you." },
              ].map((service, index) => (
                <Link
                  key={index}
                  href="/services"
                  data-aos="fade-up"
                  data-aos-delay={index * 80}
                  className="group relative flex flex-col gap-4 rounded-2xl sm:rounded-3xl border border-border p-5 sm:p-7 overflow-hidden cursor-pointer h-auto sm:h-52 bg-card hover:border-primary/40 hover:shadow-[0_8px_40px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
                  style={{
                    transition: "border-color 0.7s ease, box-shadow 0.7s ease",
                  }}
                >
                  {/* large faded number */}
                  <span className="pointer-events-none absolute -right-2 -top-4 select-none text-[7rem] font-black leading-none text-foreground/[0.04] transition-all duration-500 group-hover:text-primary/10">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* top row: icon + arrow */}
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white group-hover:scale-110" style={{ transition: "background 0.5s ease, color 0.5s ease, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)" }}>
                      <service.icon className="h-5 w-5" />
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground/30 transition-all duration-500 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                  </div>

                  {/* text */}
                  <div>
                    <h3 className="mb-2 text-lg font-bold tracking-tight text-foreground">{service.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">{service.desc}</p>
                  </div>

                  {/* animated bottom line */}
                  <div className="absolute bottom-0 left-0 h-px w-0 bg-linear-to-r from-primary to-primary/20 group-hover:w-full" style={{ transition: "width 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)" }} />
                </Link>
              ))}
            </div>

            <div className="text-center mt-8 sm:mt-12" data-aos="fade-up">
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

        <div className="border-t border-border/25" />

        {/* User Feedback Section */}
        <UserFeedback />

        <div className="border-t border-border/25" />

        {/* Team Members Section */}
        {teamMembers.length > 0 && (
          <section id="team" className="py-16 sm:py-24 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto text-center mb-12" data-aos="fade-up">
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
                    glow
                    glowProps={homeCardGlow}
                    className="h-full p-6 sm:p-8 text-center transition-all duration-700 hover:-translate-y-2 group"
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


        <Footer />
      </div>
    </>
  )
}

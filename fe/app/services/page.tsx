"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ArrowRight, ArrowUpRight, CheckCircle2, Pause, Play, X } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { useServices, type Service } from "@/hooks/useApi"
import { useCardsReady } from "@/hooks/useCardsReady"
import { ServicePageCardSkeleton } from "@/components/ui/card-skeleton"

const defaultServices = [
  { id: 0, title: "Custom Software Development", description: "We build tailored software solutions that perfectly align with your business requirements. From enterprise applications to startup MVPs, our team delivers scalable and maintainable code.", icon: "Code2", features: ["Enterprise Applications", "SaaS Platforms", "API Development", "Legacy System Modernization"], isActive: true, order: 0 },
  { id: 1, title: "Web & Mobile Applications", description: "Create stunning, responsive applications that work seamlessly across all devices. We specialize in modern frameworks and native mobile development.", icon: "Smartphone", features: ["Progressive Web Apps", "iOS & Android Apps", "Cross-platform Solutions", "Responsive Design"], isActive: true, order: 1 },
  { id: 2, title: "AI & Machine Learning", description: "Harness the power of artificial intelligence to automate processes, gain insights, and make data-driven decisions.", icon: "Brain", features: ["Predictive Analytics", "Natural Language Processing", "Computer Vision", "Chatbots & Virtual Assistants"], isActive: true, order: 2 },
  { id: 3, title: "UI/UX Design", description: "Design beautiful, intuitive interfaces that users love. Our design process focuses on user research, prototyping, and creating delightful experiences.", icon: "Palette", features: ["User Research", "Wireframing & Prototyping", "Visual Design", "Usability Testing"], isActive: true, order: 3 },
  { id: 4, title: "Database Design & Management", description: "Build robust, scalable database architectures that ensure data integrity and optimal performance.", icon: "Database", features: ["Database Architecture", "Data Migration", "Performance Optimization", "Backup & Recovery"], isActive: true, order: 4 },
  { id: 5, title: "DevOps & Cloud Solutions", description: "Streamline your development pipeline with modern DevOps practices. We help you deploy faster, scale efficiently, and maintain high availability.", icon: "Zap", features: ["CI/CD Pipelines", "Cloud Infrastructure", "Container Orchestration", "Monitoring & Logging"], isActive: true, order: 5 },
  { id: 6, title: "Security & Compliance", description: "Protect your applications and data with comprehensive security measures. We implement industry best practices and ensure regulatory compliance.", icon: "Shield", features: ["Security Audits", "Penetration Testing", "GDPR Compliance", "Data Encryption"], isActive: true, order: 6 },
  { id: 7, title: "Maintenance & Support", description: "Keep your software running smoothly with our comprehensive maintenance and support services.", icon: "Wrench", features: ["24/7 Support", "Bug Fixes", "Performance Monitoring", "Feature Updates"], isActive: true, order: 7 },
]

const serviceMedia = [
  {
    backgroundImage: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1400&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    backgroundImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  },
  {
    backgroundImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1400&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  },
  {
    backgroundImage: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1400&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  },
  {
    backgroundImage: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1400&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  },
  {
    backgroundImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  },
  {
    backgroundImage: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1400&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  },
  {
    backgroundImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  },
]

function ServicePreviewCard({
  service,
  delay,
  backgroundImage,
  videoUrl,
  onLearnMore,
}: {
  service: typeof defaultServices[number]
  delay: number
  backgroundImage: string
  videoUrl: string
  onLearnMore: () => void
}) {
  const [isHovered, setIsHovered] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <div
      data-aos="fade-up"
      data-aos-delay={delay}
      className="group relative h-[30rem] w-full overflow-hidden rounded-3xl bg-background cursor-pointer active:scale-[0.98]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        boxShadow: isHovered ? "0 24px 48px -12px rgba(0,0,0,0.4)" : "0 1px 3px rgba(0,0,0,0.1)",
        transition: "box-shadow 1.2s ease",
      }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          filter: isHovered ? "brightness(0.32)" : "brightness(0.58)",
          transform: isHovered ? "scale(1.08)" : "scale(1)",
          transition: "transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.5s ease",
          willChange: "transform",
        }}
      />

      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out"
        style={{ opacity: isHovered ? 1 : 0 }}
        loop
        muted
        playsInline
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      <div
        className="absolute inset-0 transition-opacity duration-700 ease-out"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.88) 100%)",
          opacity: isHovered ? 0.92 : 0.76,
        }}
      />

      <div className="pointer-events-none absolute inset-0 rounded-3xl border-2 border-white/10 transition-all duration-300 group-hover:border-white/30" />

      <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-8 lg:p-10">
        <h2 className="mb-3 text-3xl font-bold text-white transition-all duration-500 ease-out md:text-4xl">
          {service.title}
        </h2>

        <p
          className="max-w-2xl text-base leading-relaxed text-white/80 transition-all duration-500 ease-out md:text-lg"
          style={{
            transform: isHovered ? "translateY(0)" : "translateY(10px)",
            opacity: isHovered ? 1 : 0.92,
            transitionDelay: "0.1s",
          }}
        >
          {service.description}
        </p>

        <div
          className="mt-6 flex flex-wrap items-center justify-between gap-4 transition-all duration-300 ease-out"
          style={{
            opacity: isHovered ? 1 : 0.72,
            transform: isHovered ? "translateX(0)" : "translateX(-5px)",
          }}
        >
          <Badge variant="outline" className="border-white/40 bg-white/10 px-3 py-1.5 text-white hover:bg-white/20">
            {isHovered ? <Pause className="mr-2 h-3 w-3 fill-current" /> : <Play className="mr-2 h-3 w-3 fill-current" />}
            {isHovered ? "Solution in Focus" : "Explore Solution"}
          </Badge>

          <button
            onClick={onLearnMore}
            className="group/btn relative flex items-center gap-2 overflow-hidden rounded-full border border-white/25 px-5 py-2 text-sm font-medium text-white backdrop-blur-sm"
            style={{
              background: isHovered ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.04)",
              borderColor: isHovered ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.2)",
              transform: isHovered ? "scale(1.05)" : "scale(1)",
              boxShadow: isHovered ? "0 0 18px rgba(255,255,255,0.12)" : "none",
              transition: "background 0.6s ease, border-color 0.6s ease, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.6s ease",
            }}
          >
            <span
              className="relative z-10 transition-transform duration-300 group-hover/btn:-translate-x-1"
            >
              Learn More
            </span>
            <ArrowRight
              className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1"
            />
            <span
              className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100"
              style={{ background: "rgba(255,255,255,0.08)" }}
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ServicesPage() {
  const { services, isLoading } = useServices()
  const cardsReady = useCardsReady(2000)
  const displayServices = services.length > 0 ? services : defaultServices
  const [activeService, setActiveService] = useState<Service | null>(null)

  useEffect(() => {
    const initAOS = async () => {
      if (typeof window !== "undefined") {
        const AOS = (await import("aos")).default
        AOS.init({ duration: 1200, once: true, offset: 100, easing: "ease-out-cubic" })
      }
    }
    initAOS()
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Learn More Popup */}
      <Dialog open={!!activeService} onOpenChange={(open) => { if (!open) setActiveService(null) }}>
        <DialogContent className="max-w-lg rounded-3xl border border-border bg-background p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black tracking-tight">{activeService?.title}</DialogTitle>
          </DialogHeader>
          <div className="mt-2 space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">{activeService?.description}</p>
            {activeService?.learnMore && (
              <div className="border-t border-border/40 pt-4">
                <p className="text-sm leading-relaxed text-foreground/80 whitespace-pre-line">{activeService.learnMore}</p>
              </div>
            )}
            {activeService?.features && activeService.features.length > 0 && (
              <div className="border-t border-border/40 pt-4">
                <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3">What's included</p>
                <ul className="space-y-2">
                  {activeService.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-foreground/80">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="pt-2">
              <Link href="/contact">
                <Button className="w-full h-11 rounded-xl font-black text-sm" onClick={() => setActiveService(null)}>
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Services Grid */}
      <section className="pt-32 pb-20 dark:bg-black">
        <div className="container mx-auto px-6">
          {isLoading || !cardsReady ? (
            <div className="grid md:grid-cols-2 gap-8">
              {Array.from({ length: 4 }).map((_, i) => <ServicePageCardSkeleton key={i} />)}
            </div>
          ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {displayServices.map((service, index) => {
              const media = serviceMedia[index % serviceMedia.length]
              return (
                <ServicePreviewCard
                  key={service.id}
                  service={service}
                  delay={index * 100}
                  backgroundImage={media.backgroundImage}
                  videoUrl={media.videoUrl}
                  onLearnMore={() => setActiveService(service)}
                />
              )
            })}
          </div>
          )}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 bg-background dark:bg-black">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div data-aos="fade-right">
              {/* <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest mb-6">
                How it works
              </div> */}
              <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-6 leading-[1.1] text-foreground">
                Seamless delivery in{" "}
                <span className="text-primary italic">four simple steps.</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-10 italic">
                Stop wrestling with complexity. Our proven process takes your idea from discovery to launch — on time, every time.
              </p>
              <Link href="/contact">
                <Button className="px-8 py-6 h-auto bg-foreground text-background font-black rounded-xl hover:opacity-90 text-sm uppercase tracking-[0.2em] shadow-xl">
                  Start Your Project
                </Button>
              </Link>
            </div>

            {/* Right — steps */}
            <div className="relative pl-8 md:pl-0" data-aos="fade-left">
              {/* Vertical line */}
              <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-border/40" />
              <div className="space-y-12">
                {[
                  { title: "Discovery", desc: "We deep-dive into your goals, audience, and requirements to map out the perfect solution." },
                  { title: "Design", desc: "Wireframes, prototypes, and UI crafted for clarity and a great user experience." },
                  { title: "Development", desc: "Clean, scalable code built with modern technologies and best practices." },
                  { title: "Deployment", desc: "Launch with confidence — then ongoing support, monitoring, and iteration." },
                ].map((step, i) => (
                  <div
                    key={i}
                    data-aos="fade-left"
                    data-aos-delay={String(i * 100)}
                    className="relative flex gap-8 md:gap-10"
                  >
                    <div className="relative z-10 w-14 h-14 rounded-full bg-background border-4 border-muted flex items-center justify-center shrink-0 shadow-sm group hover:border-primary transition-colors duration-300">
                      <span className="font-black text-lg text-muted-foreground group-hover:text-primary">{i + 1}</span>
                    </div>
                    <div className="pt-2">
                      <h3 className="text-xl font-bold tracking-tight mb-2 flex items-center gap-2">
                        {step.title}
                        {i === 0 && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background dark:bg-black" data-aos="fade-up">
        <div className="container mx-auto px-6">
          <Card className="relative overflow-hidden rounded-[2.5rem] border border-border dark:border-white/10 bg-muted/30 dark:bg-zinc-950 shadow-2xl">
            <div className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-primary/20 blur-[100px]" />
              <div className="absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-primary/10 blur-[100px]" />

              <div className="relative z-10 text-center md:text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary mb-4">Let's Create Together</p>
                <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4 tracking-tighter">
                  Ready to Transform <br /> Your Vision?
                </h2>
                <p className="text-muted-foreground text-sm max-w-sm">
                  Let's collaborate to turn your ideas into powerful digital solutions that accelerate growth and deliver measurable results.
                </p>
              </div>

              <div className="relative z-10 flex shrink-0">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="h-14 rounded-2xl bg-foreground text-background px-8 text-[10px] font-black uppercase tracking-widest shadow-xl hover:opacity-90"
                  >
                    Start Your Project
                    <ArrowUpRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}

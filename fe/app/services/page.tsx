"use client"

import { useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Code2, Smartphone, Brain, Palette, Wrench, Zap, Database, Shield, ArrowRight } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { useServices } from "@/hooks/useApi"
import * as LucideIcons from "lucide-react"

const iconMap: Record<string, React.ElementType> = {
  Code2, Smartphone, Brain, Palette, Wrench, Zap, Database, Shield,
}

function getIcon(name: string): React.ElementType {
  if (iconMap[name]) return iconMap[name]
  const icon = (LucideIcons as Record<string, unknown>)[name]
  if (typeof icon === "function" || (typeof icon === "object" && icon !== null)) {
    return icon as React.ElementType
  }
  return Code2
}

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

export default function ServicesPage() {
  const { services, isLoading } = useServices()
  const displayServices = services.length > 0 ? services : defaultServices

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

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "4s" }} />
          <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "6s", animationDelay: "1s" }} />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center" data-aos="fade-up">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm text-primary mb-4">Our Services</div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
              Comprehensive Software <span className="text-primary">Development Services</span>
            </h1>
            <p className="text-xl text-muted-foreground text-pretty">
              From concept to deployment, we deliver end-to-end solutions tailored to your business needs.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          {isLoading ? (
            <div className="grid md:grid-cols-2 gap-8">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="p-8 animate-pulse">
                  <div className="w-14 h-14 bg-muted rounded-lg mb-6" />
                  <div className="h-6 bg-muted rounded mb-4 w-3/4" />
                  <div className="h-4 bg-muted rounded mb-2" />
                  <div className="h-4 bg-muted rounded w-2/3" />
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {displayServices.map((service, index) => {
                const Icon = getIcon(service.icon)
                return (
                  <Card
                    key={service.id}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                    className="p-8 hover:shadow-xl transition-all duration-700 hover:-translate-y-2 group border-border bg-card"
                  >
                    <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-all duration-700">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                    <p className="text-muted-foreground mb-6 text-pretty">{service.description}</p>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, fi) => (
                        <li key={fi} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button variant="ghost" className="group/btn transition-all duration-500">
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-500" />
                    </Button>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16" data-aos="fade-up">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm text-primary mb-4">Our Process</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">How We Work</h2>
            <p className="text-xl text-muted-foreground text-pretty">A proven methodology that ensures successful project delivery.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Discovery", description: "Understanding your needs and goals" },
              { step: "02", title: "Design", description: "Creating the perfect solution architecture" },
              { step: "03", title: "Development", description: "Building with best practices and quality" },
              { step: "04", title: "Deployment", description: "Launching and supporting your solution" },
            ].map((phase, index) => (
              <Card key={index} data-aos="zoom-in" data-aos-delay={index * 100} className="p-6 text-center border-border bg-card transition-all duration-700 hover:shadow-xl hover:-translate-y-1">
                <div className="text-5xl font-bold text-primary/20 mb-4">{phase.step}</div>
                <h3 className="text-xl font-semibold mb-2">{phase.title}</h3>
                <p className="text-sm text-muted-foreground text-pretty">{phase.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32" data-aos="fade-up">
        <div className="container mx-auto px-6">
          <Card className="p-12 md:p-16 text-center bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Ready to Start Your Project?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
              Let's discuss how we can help bring your vision to life with our expert services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg">
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/products">
                <Button size="lg" variant="outline">View Our Work</Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}

"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
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
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Loader } from "@/components/loader"
import { UserFeedback } from "@/components/user-feedback"
import { StatsCounter } from "@/components/stats-counter"
import Link from "next/link"

export default function HomePage() {
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
  }, [])

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
              <div
                data-aos="fade-down"
                className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm text-primary mb-6 transition-all duration-500 hover:bg-primary/20"
              >
                Empowering Innovation
              </div>

              <h1 data-aos="fade-up" className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight text-balance">
                Transform Ideas Into <span className="text-primary">Innovative Software</span>
              </h1>

              <p
                data-aos="fade-up"
                data-aos-delay="200"
                className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-pretty"
              >
                We create high-quality, scalable, and user-friendly software solutions that drive efficiency,
                productivity, and growth for businesses worldwide.
              </p>

              <div
                data-aos="fade-up"
                data-aos-delay="400"
                className="flex flex-col sm:flex-row gap-6 justify-center pt-4"
              >
                <Link href="/services">
                  <Button size="lg" className="group transition-all duration-500 hover:scale-105 hover:shadow-lg">
                    Explore Services
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" />
                  </Button>
                </Link>
                <Link href="/products">
                  <Button
                    size="lg"
                    variant="outline"
                    className="transition-all duration-500 hover:scale-105 hover:shadow-lg bg-transparent"
                  >
                    View Our Work
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

        {/* CTA Section */}
        <section className="py-32 sm:py-40" data-aos="fade-up">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="p-12 sm:p-16 md:p-20 text-center bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 transition-all duration-700 hover:shadow-2xl">
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

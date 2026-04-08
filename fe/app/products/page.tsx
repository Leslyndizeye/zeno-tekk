"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, Clock3, ExternalLink, Flame, Package, Star } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { useProducts, type Product } from "@/hooks/useApi"
import { useCardsReady } from "@/hooks/useCardsReady"
import { ProductCardSkeleton } from "@/components/ui/card-skeleton"

interface ShowcaseProduct extends Product {
  productType: string
  techStack: string[]
  duration: string
}

interface TrendingProject {
  title: string
  subtitle: string
  rating: string
  company: string
  date: string
  likes: string
  views: string
  tags: string[]
}

const defaultProducts: ShowcaseProduct[] = [
  {
    id: 1,
    title: "Atlas Archive",
    description:
      "A digital records platform for museums and institutions, with multilingual content management, archive search, and curated collection publishing.",
    category: "Digital Archives",
    productType: "Web",
    techStack: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    duration: "2 weeks",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80",
    url: "",
    isActive: true,
    order: 0,
  },
  {
    id: 2,
    title: "PulsePay Gateway",
    description:
      "A modern payments platform for regional transactions, combining secure checkout, account verification, and real-time settlement visibility.",
    category: "Fintech",
    productType: "Web",
    techStack: ["Next.js", "Tailwind CSS", "Node.js", "MongoDB"],
    duration: "1 week",
    image:
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1400&q=80",
    url: "",
    isActive: true,
    order: 1,
  },
  {
    id: 3,
    title: "ChapterHouse",
    description:
      "A commerce and community platform for independent bookstores, featuring catalog discovery, reader accounts, and event-driven engagement.",
    category: "E-Commerce",
    productType: "Web",
    techStack: ["React", "Redux", "Node.js", "Express"],
    duration: "2 weeks",
    image:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1400&q=80",
    url: "",
    isActive: true,
    order: 2,
  },
  {
    id: 4,
    title: "SkillSpring Academy",
    description:
      "An online learning workspace built for practical upskilling, with guided lessons, assessments, and learner progress tracking.",
    category: "Education",
    productType: "Web",
    techStack: ["HTML", "CSS", "JavaScript", "Firebase"],
    duration: "4 weeks",
    image:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1400&q=80",
    url: "",
    isActive: true,
    order: 3,
  },
  {
    id: 5,
    title: "GreenLedger",
    description:
      "A sustainability reporting tool that helps teams log impact initiatives, monitor progress, and share measurable environmental outcomes.",
    category: "Sustainability",
    productType: "Web",
    techStack: ["HTML", "CSS", "JavaScript"],
    duration: "1 week",
    image:
      "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&w=1400&q=80",
    url: "",
    isActive: true,
    order: 4,
  },
  {
    id: 6,
    title: "CareBridge Suite",
    description:
      "A connected healthcare operations suite for patient coordination, referral workflows, and secure data sharing across care teams.",
    category: "Healthcare",
    productType: "Web",
    techStack: ["React", "Node.js", "Express", "MongoDB"],
    duration: "3 weeks",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=80",
    url: "",
    isActive: true,
    order: 5,
  },
]

const trendingProjects: TrendingProject[] = [
  {
    title: "CareBridge Suite",
    subtitle: "Connected healthcare operations with faster coordination and cleaner patient workflows",
    rating: "4.9",
    company: "ZENO TEKK",
    date: "Jun 10, 2024",
    likes: "1.4k",
    views: "1147",
    tags: ["Healthcare", "Workflow", "Operations"],
  },
  {
    title: "PulsePay Gateway",
    subtitle: "Regional payments infrastructure with stronger visibility, trust, and faster settlement flow",
    rating: "4.8",
    company: "ZENO TEKK",
    date: "Jun 8, 2024",
    likes: "2.3k",
    views: "1892",
    tags: ["Fintech", "Payments", "Security"],
  },
  {
    title: "SkillSpring Academy",
    subtitle: "Structured digital learning built for practical growth and measurable learner progress",
    rating: "4.7",
    company: "ZENO TEKK",
    date: "Jun 5, 2024",
    likes: "1.2k",
    views: "1154",
    tags: ["Education", "Learning", "Growth"],
  },
]

const fallbackMeta = [
  { productType: "Web", techStack: ["React", "TypeScript", "Node.js", "PostgreSQL"], duration: "2 weeks" },
  { productType: "Web", techStack: ["Next.js", "Tailwind CSS", "Node.js", "MongoDB"], duration: "1 week" },
  { productType: "Web", techStack: ["React", "Redux", "Node.js", "Express"], duration: "2 weeks" },
  { productType: "Web", techStack: ["HTML", "CSS", "JavaScript", "Firebase"], duration: "4 weeks" },
  { productType: "Web", techStack: ["HTML", "CSS", "JavaScript"], duration: "1 week" },
  { productType: "Web", techStack: ["React", "Node.js", "Express", "MongoDB"], duration: "3 weeks" },
]

function buildShowcaseProducts(products: Product[]) {
  return products.map((product, index) => {
    const meta = fallbackMeta[index % fallbackMeta.length]

    return {
      ...product,
      productType: meta.productType,
      techStack: meta.techStack,
      duration: meta.duration,
    }
  })
}

function ProjectCard({ project, delay }: { project: ShowcaseProduct; delay: number }) {
  const [hovered, setHovered] = useState(false)
  const visibleTech = project.techStack.slice(0, 3)
  const extraTechCount = Math.max(project.techStack.length - visibleTech.length, 0)

  return (
    <Card
      data-aos="fade-up"
      data-aos-delay={delay}
      className="overflow-hidden bg-card p-0 cursor-pointer active:scale-[0.98]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: hovered ? "1px solid hsl(var(--primary) / 0.4)" : "1px solid hsl(var(--border) / 0.6)",
        boxShadow: hovered ? "0 24px 48px -12px rgba(0,0,0,0.18)" : "0 1px 3px rgba(0,0,0,0.05)",
        transition: "box-shadow 0.8s ease, border-color 0.6s ease",
      }}
    >
      <div className="relative overflow-hidden border-b border-border/50 bg-muted/20">
        <img
          src={project.image || "/placeholder.svg"}
          alt={`${project.title} project screenshot`}
          className="h-60 w-full object-cover"
          loading="lazy"
          style={{
            transform: hovered ? "scale(1.08)" : "scale(1)",
            transition: "transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)",
            willChange: "transform",
          }}
        />
        <Badge className="absolute right-4 top-4 rounded-full bg-primary text-primary-foreground shadow-sm">
          {project.productType}
        </Badge>
      </div>

      <div className="p-6">
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{project.productType}</p>
        <h3 className="mb-3 text-2xl font-bold tracking-tight">{project.title}</h3>
        <p className="mb-5 text-sm leading-7 text-muted-foreground text-pretty">{project.description}</p>

        <div className="mb-5 flex flex-wrap gap-2">
          {visibleTech.map((tech) => (
            <Badge key={tech} variant="outline" className="rounded-full border-primary/20 bg-primary/5 text-primary">
              {tech}
            </Badge>
          ))}
          {extraTechCount > 0 && (
            <Badge variant="outline" className="rounded-full border-border bg-muted/30 text-muted-foreground">
              +{extraTechCount} more
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock3 className="h-4 w-4" />
            <span>{project.duration}</span>
          </div>

          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-medium text-primary transition-colors duration-300 hover:text-primary/80"
            >
              View Details
              <ExternalLink className="h-4 w-4" />
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 font-medium text-primary">
              View Details
              <ArrowRight className="h-4 w-4" />
            </span>
          )}
        </div>
      </div>
    </Card>
  )
}

export default function ProductsPage() {
  const { products, isLoading, error } = useProducts()
  const cardsReady = useCardsReady(2000)
  const displayProducts = products.length > 0 ? buildShowcaseProducts(products) : defaultProducts
  const showSkeleton = isLoading || !cardsReady

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

      <section className="relative overflow-hidden pb-18 pt-32">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute -left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-pulse"
            style={{ animationDuration: "4s" }}
          />
          <div
            className="absolute bottom-1/4 right-0 h-96 w-96 rounded-full bg-accent/20 blur-3xl animate-pulse"
            style={{ animationDuration: "6s", animationDelay: "1s" }}
          />
        </div>

        <div className="container relative z-10 mx-auto px-6">
          <div className="mx-auto max-w-4xl text-center" data-aos="fade-up">
            <h1 className="mb-6 text-5xl font-bold text-balance md:text-6xl">
              Featured <span className="text-primary">Products & Projects</span>
            </h1>
            <p className="text-xl text-muted-foreground text-pretty">
              Explore digital products, platforms, and systems designed to solve real business challenges.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-6">
          {showSkeleton ? (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : displayProducts.length === 0 ? (
            <div className="py-20 text-center">
              <Package className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
              <h3 className="mb-2 text-xl font-semibold">No projects yet</h3>
              <p className="text-muted-foreground">Check back soon for our portfolio.</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {displayProducts.map((product, index) => (
                <ProjectCard key={product.id} project={product} delay={index * 100} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-muted/30 py-24">
        <div className="container mx-auto px-6">
          <div className="mb-14 max-w-3xl" data-aos="fade-up">
            <h2 className="mb-4 text-4xl font-bold text-balance">Most Reviewed Projects</h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Discover standout products that combine strong usability, clear business impact, and memorable user experiences.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {trendingProjects.map((project, index) => (
              <Card
                key={project.title}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="border-border/60 bg-card p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
              >
                <div className="mb-5 flex items-center justify-between gap-4">
                  <Badge className="rounded-full bg-primary/10 text-primary hover:bg-primary/10">
                    <Flame className="mr-1 h-3.5 w-3.5" />
                    Trending
                  </Badge>
                  <div className="flex items-center gap-1 text-sm font-semibold text-foreground">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    {project.rating}
                  </div>
                </div>

                <h3 className="mb-2 text-2xl font-bold tracking-tight">{project.title}</h3>
                <p className="mb-5 text-sm leading-7 text-muted-foreground">{project.subtitle}</p>

                <div className="mb-6 flex items-center justify-between gap-4 border-y border-border/50 py-4 text-sm text-muted-foreground">
                  <div>
                    <p className="font-medium text-foreground">{project.company}</p>
                    <p>{project.date}</p>
                  </div>
                  <div className="text-right">
                    <p>{project.likes}</p>
                    <p>{project.views}</p>
                  </div>
                </div>

                <div className="mb-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="rounded-full border-primary/20 bg-primary/5 text-primary">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="inline-flex items-center gap-2 font-medium text-primary">
                  View Details
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 dark:bg-black" data-aos="fade-up">
        <div className="container mx-auto px-6">
          <Card className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-zinc-950 shadow-2xl group">
            <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-primary/20 blur-[100px] group-hover:scale-150 transition-transform duration-1000" />
            <div className="absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-primary/10 blur-[100px]" />
            <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="text-center md:text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary mb-4">Let&apos;s Create Together</p>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tighter">
                  Ready to Transform <br /> Your Vision?
                </h2>
                <p className="text-zinc-400 text-sm max-w-sm">
                  Let&apos;s collaborate to turn your ideas into powerful digital solutions that accelerate growth and deliver measurable results.
                </p>
              </div>
              <div className="shrink-0">
                <Link href="/contact">
                  <Button size="lg" className="bg-white text-black hover:bg-white/90 font-black rounded-2xl shadow-xl text-[10px] uppercase tracking-widest gap-3 h-14 px-8">
                    Start Your Project
                    <ArrowRight className="w-4 h-4" />
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

"use client"

import { useEffect, useState } from "react"
import { ArrowRight, Calendar, User, Newspaper, BookOpen } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useBlogPosts } from "@/hooks/useApi"
import type { BlogPost } from "@/hooks/useApi"
import { useCardsReady } from "@/hooks/useCardsReady"
import { BlogCardSkeleton } from "@/components/ui/card-skeleton"

const defaultPosts: BlogPost[] = [
  { id: 0, title: "How ZENO TEKK Helps Startups Launch Faster with Custom Web Apps", excerpt: "From idea to live product — we partner with early-stage startups to design, build, and deploy web applications that are ready to scale from day one.", author: "Lesly Ndizeye", category: "Web Development", image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg", readTime: "5 min read", isFeatured: true, isActive: true, order: 0, content: "", createdAt: "2025-03-10T00:00:00Z" },
  { id: 1, title: "Why Small Businesses Need a Professional Mobile App in 2025", excerpt: "A mobile app is no longer just for big corporations. We show how small businesses are gaining a competitive edge by going digital with ZENO TEKK.", author: "ZENO TEKK Team", category: "Mobile Apps", image: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg", readTime: "6 min read", isFeatured: false, isActive: true, order: 1, content: "", createdAt: "2025-02-20T00:00:00Z" },
  { id: 2, title: "Enterprise Partnerships: Building at Scale with ZENO TEKK", excerpt: "Large companies trust us to deliver robust, high-performance digital platforms. Here's how we approach enterprise-grade projects from architecture to deployment.", author: "ZENO TEKK Team", category: "Enterprise", image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg", readTime: "8 min read", isFeatured: false, isActive: true, order: 2, content: "", createdAt: "2025-02-05T00:00:00Z" },
  { id: 3, title: "From Vision to Launch: Our End-to-End App Development Process", excerpt: "We walk you through every phase of how ZENO TEKK takes a client idea — from the first wireframe to a fully deployed, live application.", author: "Lesly Ndizeye", category: "Process", image: "https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg", readTime: "7 min read", isFeatured: false, isActive: true, order: 3, content: "", createdAt: "2025-01-18T00:00:00Z" },
  { id: 4, title: "The Power of a Great Website: What We Build for Our Clients", excerpt: "Your website is your most powerful sales tool. We design and develop sites that convert visitors into customers — for companies of every size.", author: "ZENO TEKK Team", category: "Design & Web", image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg", readTime: "5 min read", isFeatured: false, isActive: true, order: 4, content: "", createdAt: "2025-01-05T00:00:00Z" },
  { id: 5, title: "Collaborating Across Borders: How ZENO TEKK Works with Global Clients", excerpt: "Distance is no barrier. We've built long-term partnerships with companies across Africa, Europe, and beyond — delivering on time, every time.", author: "ZENO TEKK Team", category: "Partnership", image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg", readTime: "6 min read", isFeatured: false, isActive: true, order: 5, content: "", createdAt: "2024-12-20T00:00:00Z" },
]

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
}

function BlogPostCard({ post, i }: { post: BlogPost; i: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      data-aos="fade-up"
      data-aos-delay={String(i * 100)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Card className="cursor-pointer border-none bg-transparent shadow-none">
        {/* Image */}
        <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 border border-border transition-shadow duration-300"
          style={{ boxShadow: hovered ? "0 20px 40px -12px rgba(0,0,0,0.2)" : "" }}
        >
          <img
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            loading="lazy"
            className="w-full h-full object-cover"
            style={{
              filter: hovered ? "grayscale(0)" : "grayscale(1)",
              transform: hovered ? "scale(1.08)" : "scale(1)",
              transition: "transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.5s ease",
              willChange: "transform, filter",
            }}
          />
          <div className="absolute top-4 left-4">
            <Badge className="bg-zinc-950/80 backdrop-blur-md border-white/20 text-white font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full text-[9px]">
              {post.category}
            </Badge>
          </div>
          <div
            className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"
            style={{ opacity: hovered ? 1 : 0, transition: "opacity 0.3s ease" }}
          />
        </div>

        {/* Content */}
        <CardContent className="px-1">
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3 text-muted-foreground" />
              <span className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">
                {formatDate(post.createdAt)}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <User className="w-3 h-3 text-muted-foreground" />
              <span className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">
                {post.author}
              </span>
            </div>
          </div>

          <h3
            className="text-lg font-black mb-2 tracking-tight leading-snug"
            style={{ color: hovered ? "var(--primary)" : "", transition: "color 0.3s ease" }}
          >
            {post.title}
          </h3>

          <p className="text-muted-foreground text-sm leading-relaxed mb-4 italic line-clamp-2">
            &ldquo;{post.excerpt}&rdquo;
          </p>

          <div
            className="flex items-center text-primary"
            style={{ gap: hovered ? "16px" : "8px", transition: "gap 0.3s ease" }}
          >
            <span className="text-[9px] font-black uppercase tracking-[0.2em]">Read Article</span>
            <div
              className="h-px bg-primary/30"
              style={{ width: hovered ? "48px" : "28px", transition: "width 0.3s ease" }}
            />
            <ArrowRight className="w-3 h-3" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function BlogPage() {
  const { posts, isLoading } = useBlogPosts()
  const cardsReady = useCardsReady(2000)
  const displayPosts = posts.length > 0 ? posts : defaultPosts

  useEffect(() => {
    const initAOS = async () => {
      if (typeof window !== "undefined") {
        const AOS = (await import("aos")).default
        AOS.init({ duration: 1000, once: true, offset: 100 })
      }
    }
    initAOS()
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="py-24 bg-background px-4 pt-36">
        <div className="container mx-auto">

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl text-center md:text-left">
              <div
                data-aos="fade-right"
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6"
              >
                <Newspaper className="w-3 h-3 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest text-primary"> & News</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] mb-4">
                From the{" "}
                <span className="text-primary italic underline decoration-primary/20 underline-offset-8">
                  workshop.
                </span>
              </h2>
              <p className="text-muted-foreground text-sm max-w-lg mt-6">
                Stay up to date with the latest industry trends, technical deep dives, and product updates from our engineering team.
              </p>
            </div>
            <div>
              <Button
                size="lg"
                className="bg-zinc-950 dark:bg-white dark:text-zinc-950 text-white border-white/10 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-zinc-900 hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-xl shadow-black/20"
              >
                View All Articles
                <ArrowRight className="w-4 h-4 ml-3" />
              </Button>
            </div>
          </div>

          {/* Posts */}
          {isLoading || !cardsReady ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <BlogCardSkeleton key={i} />
              ))}
            </div>
          ) : displayPosts.length === 0 ? (
            <div className="py-32 text-center">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold">No posts yet</h3>
              <p className="text-muted-foreground mt-2">Check back soon for articles.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayPosts.map((post, i) => (
                <BlogPostCard key={post.id} post={post} i={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 px-4 dark:bg-black">
        <div className="container mx-auto">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-zinc-950 shadow-2xl group">
            <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-primary/20 blur-[100px] group-hover:scale-150 transition-transform duration-1000" />
            <div className="absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-primary/10 blur-[100px]" />
            <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="text-center md:text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary mb-4">Stay in the loop</p>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tighter">
                  Subscribe to Our <br /> Newsletter
                </h2>
                <p className="text-zinc-400 text-sm max-w-sm">
                  Get the latest articles, tutorials, and tech insights delivered directly to your inbox.
                </p>
              </div>
              <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 md:w-64 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
                <Button size="lg" className="bg-white text-black hover:bg-white/90 font-black rounded-2xl shadow-xl text-[10px] uppercase tracking-widest gap-3 h-14 px-8 whitespace-nowrap">
                  Subscribe
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

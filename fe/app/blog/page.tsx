"use client"

import { useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Clock, User, BookOpen } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useBlogPosts } from "@/hooks/useApi"
import type { BlogPost } from "@/hooks/useApi"

const defaultPosts: BlogPost[] = [
  { id: 0, title: "The Future of AI in Software Development", excerpt: "Exploring how artificial intelligence is revolutionizing the way we build and maintain software applications.", author: "Lesly Ndizeye", category: "AI & ML", image: "/ai-software-development.jpg", readTime: "5 min read", isFeatured: true, isActive: true, order: 0, content: "", createdAt: "2025-01-15T00:00:00Z", updatedAt: "2025-01-15T00:00:00Z" },
  { id: 1, title: "Building Scalable Web Applications with Next.js", excerpt: "A comprehensive guide to creating high-performance, scalable web applications using the Next.js framework.", author: "ZENO TEKK Team", category: "Web Development", image: "/nextjs-web-development.jpg", readTime: "8 min read", isFeatured: false, isActive: true, order: 1, content: "", createdAt: "2025-01-10T00:00:00Z", updatedAt: "2025-01-10T00:00:00Z" },
  { id: 2, title: "Mobile App Development Best Practices", excerpt: "Essential tips and strategies for building successful mobile applications that users love.", author: "ZENO TEKK Team", category: "Mobile", image: "/mobile-app-development.png", readTime: "6 min read", isFeatured: false, isActive: true, order: 2, content: "", createdAt: "2025-01-05T00:00:00Z", updatedAt: "2025-01-05T00:00:00Z" },
  { id: 3, title: "Understanding Cloud Architecture", excerpt: "A deep dive into modern cloud architecture patterns and how to implement them effectively.", author: "ZENO TEKK Team", category: "Cloud", image: "/cloud-architecture.png", readTime: "10 min read", isFeatured: false, isActive: true, order: 3, content: "", createdAt: "2024-12-28T00:00:00Z", updatedAt: "2024-12-28T00:00:00Z" },
  { id: 4, title: "UI/UX Design Trends for 2025", excerpt: "Discover the latest design trends that are shaping the future of user interfaces and experiences.", author: "ZENO TEKK Team", category: "Design", image: "/ui-ux-design-trends.png", readTime: "7 min read", isFeatured: false, isActive: true, order: 4, content: "", createdAt: "2024-12-20T00:00:00Z", updatedAt: "2024-12-20T00:00:00Z" },
  { id: 5, title: "DevOps: Streamlining Your Development Pipeline", excerpt: "Learn how to implement DevOps practices to improve your development workflow and deployment process.", author: "ZENO TEKK Team", category: "DevOps", image: "/devops-pipeline.png", readTime: "9 min read", isFeatured: false, isActive: true, order: 5, content: "", createdAt: "2024-12-15T00:00:00Z", updatedAt: "2024-12-15T00:00:00Z" },
]

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
}

export default function BlogPage() {
  const { posts, isLoading } = useBlogPosts()
  const displayPosts = posts.length > 0 ? posts : defaultPosts
  const featuredPost = displayPosts.find((p) => p.isFeatured) || displayPosts[0]
  const restPosts = displayPosts.filter((p) => p.id !== featuredPost?.id)

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

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "4s" }} />
          <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "6s", animationDelay: "1s" }} />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center" data-aos="fade-up">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm text-primary mb-4">Our Blog</div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
              Insights & <span className="text-primary">Tech Articles</span>
            </h1>
            <p className="text-xl text-muted-foreground text-pretty">
              Stay updated with the latest trends, tutorials, and insights from the world of software development.
            </p>
          </div>
        </div>
      </section>

      {isLoading ? (
        <section className="py-20">
          <div className="container mx-auto px-6 space-y-8">
            <Card className="h-80 animate-pulse" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => <Card key={i} className="h-64 animate-pulse" />)}
            </div>
          </div>
        </section>
      ) : displayPosts.length === 0 ? (
        <section className="py-32 text-center">
          <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold">No posts yet</h3>
          <p className="text-muted-foreground mt-2">Check back soon for articles.</p>
        </section>
      ) : (
        <>
          {/* Featured Post */}
          <section className="py-20">
            <div className="container mx-auto px-6">
              <Card data-aos="fade-up" className="overflow-hidden border-border bg-card hover:shadow-2xl transition-all duration-300">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-64 md:h-auto">
                    <img
                      src={featuredPost.image || "/placeholder.svg"}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-primary text-primary-foreground text-xs rounded-full font-semibold">
                        Featured
                      </span>
                    </div>
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-semibold w-fit mb-4">
                      {featuredPost.category}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">{featuredPost.title}</h2>
                    <p className="text-muted-foreground mb-6 text-pretty">{featuredPost.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6 flex-wrap">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {featuredPost.author}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {formatDate(featuredPost.createdAt)}
                      </div>
                      {featuredPost.readTime && (
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {featuredPost.readTime}
                        </div>
                      )}
                    </div>
                    <Button className="w-fit group">
                      Read Article
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* Blog Grid */}
          {restPosts.length > 0 && (
            <section className="py-20 bg-muted/30">
              <div className="container mx-auto px-6">
                <div className="mb-12" data-aos="fade-up">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Articles</h2>
                  <p className="text-muted-foreground">Explore our recent posts and stay informed.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {restPosts.map((post, index) => (
                    <Card
                      key={post.id}
                      data-aos="fade-up"
                      data-aos-delay={index * 100}
                      className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-border bg-card p-0"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-primary/90 text-primary-foreground text-xs rounded-full font-semibold">
                            {post.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors text-balance">
                          {post.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 text-pretty">{post.excerpt}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4 flex-wrap">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(post.createdAt)}
                          </div>
                          {post.readTime && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {post.readTime}
                            </div>
                          )}
                        </div>
                        <Button variant="ghost" size="sm" className="group/btn p-0">
                          Read More
                          <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* Newsletter Section */}
      <section className="py-32" data-aos="fade-up">
        <div className="container mx-auto px-6">
          <Card className="p-12 md:p-16 text-center bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Subscribe to Our Newsletter</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
              Get the latest articles, tutorials, and tech insights delivered directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button size="lg">
                Subscribe
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}

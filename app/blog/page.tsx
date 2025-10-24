"use client"

import { useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Clock, User } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function BlogPage() {
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

  const blogPosts = [
    {
      title: "The Future of AI in Software Development",
      excerpt:
        "Exploring how artificial intelligence is revolutionizing the way we build and maintain software applications.",
      author: "Lesly Ndizeye",
      date: "Jan 15, 2025",
      readTime: "5 min read",
      category: "AI & ML",
      image: "/ai-software-development.jpg",
    },
    {
      title: "Building Scalable Web Applications with Next.js",
      excerpt:
        "A comprehensive guide to creating high-performance, scalable web applications using the Next.js framework.",
      author: "ZENO TEKK Team",
      date: "Jan 10, 2025",
      readTime: "8 min read",
      category: "Web Development",
      image: "/nextjs-web-development.jpg",
    },
    {
      title: "Mobile App Development Best Practices",
      excerpt: "Essential tips and strategies for building successful mobile applications that users love.",
      author: "ZENO TEKK Team",
      date: "Jan 5, 2025",
      readTime: "6 min read",
      category: "Mobile",
      image: "/mobile-app-development.png",
    },
    {
      title: "Understanding Cloud Architecture",
      excerpt: "A deep dive into modern cloud architecture patterns and how to implement them effectively.",
      author: "ZENO TEKK Team",
      date: "Dec 28, 2024",
      readTime: "10 min read",
      category: "Cloud",
      image: "/cloud-architecture.png",
    },
    {
      title: "UI/UX Design Trends for 2025",
      excerpt: "Discover the latest design trends that are shaping the future of user interfaces and experiences.",
      author: "ZENO TEKK Team",
      date: "Dec 20, 2024",
      readTime: "7 min read",
      category: "Design",
      image: "/ui-ux-design-trends.png",
    },
    {
      title: "DevOps: Streamlining Your Development Pipeline",
      excerpt: "Learn how to implement DevOps practices to improve your development workflow and deployment process.",
      author: "ZENO TEKK Team",
      date: "Dec 15, 2024",
      readTime: "9 min read",
      category: "DevOps",
      image: "/devops-pipeline.png",
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "4s" }}
          />
          <div
            className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "6s", animationDelay: "1s" }}
          />
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

      {/* Featured Post */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <Card
            data-aos="fade-up"
            className="overflow-hidden border-border bg-card hover:shadow-2xl transition-all duration-300"
          >
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-64 md:h-auto">
                <img
                  src={blogPosts[0].image || "/placeholder.svg"}
                  alt={blogPosts[0].title}
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
                  {blogPosts[0].category}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">{blogPosts[0].title}</h2>
                <p className="text-muted-foreground mb-6 text-pretty">{blogPosts[0].excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {blogPosts[0].author}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {blogPosts[0].date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {blogPosts[0].readTime}
                  </div>
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
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="mb-12" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Articles</h2>
            <p className="text-muted-foreground">Explore our recent posts and stay informed.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post, index) => (
              <Card
                key={index}
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
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </div>
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

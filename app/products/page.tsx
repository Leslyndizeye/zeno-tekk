"use client"

import { useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function ProductsPage() {
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

  // 9 placeholder project cards
  const projects = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    title: `Project ${i + 1}`,
    description: "Coming soon - This project will showcase our innovative solutions and cutting-edge technology.",
    category: ["Web", "Mobile", "AI/ML"][i % 3],
    image: `/placeholder.svg?height=400&width=600&query=modern software project ${i + 1}`,
  }))

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
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm text-primary mb-4">
              Our Portfolio
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
              Featured <span className="text-primary">Products & Projects</span>
            </h1>
            <p className="text-xl text-muted-foreground text-pretty">
              Innovative solutions we've built for clients across various industries.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={project.id}
                data-aos="zoom-in"
                data-aos-delay={index * 100}
                className="group overflow-hidden border-border bg-card hover:shadow-2xl transition-all duration-700"
              >
                {/* Image with blur overlay effect */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Blur overlay that appears on hover */}
                  <div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center">
                    <div className="text-center space-y-4 p-6">
                      <p className="text-sm text-muted-foreground">Project details coming soon</p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="transition-all duration-500 hover:scale-105 bg-transparent"
                      >
                        View Details
                        <ExternalLink className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full transition-all duration-500 hover:bg-primary/20">
                      {project.category}
                    </span>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-700" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-700">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground text-pretty">{project.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-32 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-16" data-aos="fade-up">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm text-primary mb-4">
              Highlighted Work
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Our Best Projects</h2>
            <p className="text-xl text-muted-foreground text-pretty">
              Explore some of our most successful implementations and innovative solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "FamCare",
                description: "Family health management app with predictive ML for proactive healthcare monitoring.",
                platform: "Flutter + Firebase",
                tags: ["Healthcare", "Mobile", "AI/ML"],
                image: "/healthcare-mobile-app.jpg",
              },
              {
                name: "nearbyPH",
                description: "Pharmacy locator app with real-time drug availability and price comparison.",
                platform: "Flutter + FastAPI",
                tags: ["Healthcare", "Mobile", "Real-time"],
                image: "/pharmacy-locator-app.jpg",
              },
              {
                name: "Mental Health Chatbot",
                description: "AI-powered conversational assistant providing mental health support and resources.",
                platform: "Python + NLP",
                tags: ["AI/ML", "Healthcare", "Chatbot"],
                image: "/ai-chatbot-interface.png",
              },
              {
                name: "ZENO ERP",
                description: "Enterprise resource planning software for streamlined business operations.",
                platform: "Web + Node.js",
                tags: ["Enterprise", "Web", "SaaS"],
                image: "/erp-dashboard.png",
              },
            ].map((product, index) => (
              <Card
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="overflow-hidden group hover:shadow-xl transition-all duration-700 border-border bg-card"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors duration-700">
                      {product.name}
                    </h3>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-700" />
                  </div>
                  <p className="text-muted-foreground mb-4 text-pretty">{product.description}</p>
                  <div className="text-sm text-primary font-medium mb-4">{product.platform}</div>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full transition-all duration-500 hover:bg-primary/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32" data-aos="fade-up">
        <div className="container mx-auto px-6">
          <Card className="p-12 md:p-16 text-center bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Want to See Your Project Here?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
              Let's collaborate to create something amazing that will be featured in our portfolio.
            </p>
            <Button size="lg">
              Start Your Project
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}

"use client"

import { useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink, Package } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useProducts } from "@/hooks/useApi"
import Link from "next/link"

export default function ProductsPage() {
  const { products, isLoading } = useProducts()

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
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm text-primary mb-4">Our Portfolio</div>
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
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse overflow-hidden p-0">
                  <div className="h-64 bg-muted" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-muted rounded w-1/3" />
                    <div className="h-5 bg-muted rounded w-2/3" />
                    <div className="h-4 bg-muted rounded" />
                  </div>
                </Card>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No projects yet</h3>
              <p className="text-muted-foreground">Check back soon for our portfolio.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <Card
                  key={product.id}
                  data-aos="zoom-in"
                  data-aos-delay={index * 100}
                  className="group overflow-hidden border-border bg-card hover:shadow-2xl transition-all duration-700 p-0"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center">
                      <div className="text-center space-y-4 p-6">
                        {product.url ? (
                          <a href={product.url} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" variant="outline" className="transition-all duration-500 hover:scale-105 bg-transparent">
                              View Project
                              <ExternalLink className="ml-2 w-4 h-4" />
                            </Button>
                          </a>
                        ) : (
                          <Button size="sm" variant="outline" className="transition-all duration-500 hover:scale-105 bg-transparent" disabled>
                            View Details
                            <ExternalLink className="ml-2 w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full transition-all duration-500 hover:bg-primary/20">
                        {product.category}
                      </span>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-700" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-700">{product.title}</h3>
                    <p className="text-sm text-muted-foreground text-pretty">{product.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          )}
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
            <Link href="/contact">
              <Button size="lg">
                Start Your Project
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}

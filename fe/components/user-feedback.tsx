"use client"

import { useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import { useTestimonials } from "@/hooks/useApi"

const defaultTestimonials = [
  {
    clientName: "Sarah Johnson",
    position: "CEO",
    clientCompany: "TechStart Inc",
    clientImage: "/professional-woman-ceo.png",
    rating: 5,
    content: "ZENO TEKK transformed our business with their innovative software solutions. Their team's expertise in AI and custom development exceeded our expectations.",
  },
  {
    clientName: "Michael Chen",
    position: "CTO",
    clientCompany: "Digital Innovations",
    clientImage: "/professional-man-cto.jpg",
    rating: 5,
    content: "Outstanding work! The mobile app they developed for us has significantly improved our customer engagement and operational efficiency.",
  },
  {
    clientName: "Emily Rodriguez",
    position: "Product Manager",
    clientCompany: "HealthTech Solutions",
    clientImage: "/professional-woman-manager.png",
    rating: 5,
    content: "Working with ZENO TEKK was a game-changer. Their attention to detail and commitment to quality is unmatched in the industry.",
  },
  {
    clientName: "David Okonkwo",
    position: "Founder",
    clientCompany: "AgriConnect Africa",
    clientImage: "/professional-man-founder.png",
    rating: 5,
    content: "The team at ZENO TEKK delivered beyond our expectations. Their AI-powered solution revolutionized how we connect farmers to markets.",
  },
  {
    clientName: "Lisa Anderson",
    position: "Director of IT",
    clientCompany: "Finance Plus",
    clientImage: "/professional-woman-director.png",
    rating: 5,
    content: "Exceptional service and technical expertise. ZENO TEKK's custom software has streamlined our operations and saved us countless hours.",
  },
  {
    clientName: "James Mutabazi",
    position: "Operations Manager",
    clientCompany: "Logistics Pro",
    clientImage: "/professional-man-operations.png",
    rating: 5,
    content: "Highly professional team with deep technical knowledge. They delivered a robust solution that perfectly fits our business needs.",
  },
]

export function UserFeedback() {
  const { testimonials, isLoading } = useTestimonials()

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("aos").then((module) => {
        module.default.init({
          duration: 800,
          once: true,
          offset: 100,
        })
      })
    }
  }, [])

  const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials

  return (
    <section className="py-32 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16" data-aos="fade-up">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm text-primary mb-4">
            Testimonials
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">What Our Clients Say</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Discover why businesses trust ZENO TEKK for their software development needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayTestimonials.map((testimonial, index) => (
            <Card
              key={index}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
              className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card border-border"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-4">
                  <img
                    src={testimonial.clientImage || "/placeholder.svg"}
                    alt={testimonial.clientName}
                    className="w-16 h-16 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="text-lg font-semibold">{testimonial.clientName}</h4>
                    <p className="text-primary text-sm">{testimonial.position || testimonial.clientCompany}</p>
                    <p className="text-muted-foreground text-xs">{testimonial.clientCompany}</p>
                  </div>
                </div>
                <Quote className="w-8 h-8 text-primary/30" />
              </div>
              <div className="mb-4">
                <div className="flex gap-1 mb-3">
                  {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm italic text-pretty">{testimonial.content}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

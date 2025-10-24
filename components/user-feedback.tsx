"use client"

import { useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO",
    company: "TechStart Inc",
    image: "/professional-woman-ceo.png",
    rating: 5,
    text: "ZENO TEKK transformed our business with their innovative software solutions. Their team's expertise in AI and custom development exceeded our expectations.",
  },
  {
    name: "Michael Chen",
    role: "CTO",
    company: "Digital Innovations",
    image: "/professional-man-cto.jpg",
    rating: 5,
    text: "Outstanding work! The mobile app they developed for us has significantly improved our customer engagement and operational efficiency.",
  },
  {
    name: "Emily Rodriguez",
    role: "Product Manager",
    company: "HealthTech Solutions",
    image: "/professional-woman-manager.png",
    rating: 5,
    text: "Working with ZENO TEKK was a game-changer. Their attention to detail and commitment to quality is unmatched in the industry.",
  },
  {
    name: "David Okonkwo",
    role: "Founder",
    company: "AgriConnect Africa",
    image: "/professional-man-founder.png",
    rating: 5,
    text: "The team at ZENO TEKK delivered beyond our expectations. Their AI-powered solution revolutionized how we connect farmers to markets.",
  },
  {
    name: "Lisa Anderson",
    role: "Director of IT",
    company: "Finance Plus",
    image: "/professional-woman-director.png",
    rating: 5,
    text: "Exceptional service and technical expertise. ZENO TEKK's custom software has streamlined our operations and saved us countless hours.",
  },
  {
    name: "James Mutabazi",
    role: "Operations Manager",
    company: "Logistics Pro",
    image: "/professional-man-operations.png",
    rating: 5,
    text: "Highly professional team with deep technical knowledge. They delivered a robust solution that perfectly fits our business needs.",
  },
]

export function UserFeedback() {
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
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
              className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card border-border"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-4">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="text-lg font-semibold">{testimonial.name}</h4>
                    <p className="text-primary text-sm">{testimonial.role}</p>
                    <p className="text-muted-foreground text-xs">{testimonial.company}</p>
                  </div>
                </div>
                <Quote className="w-8 h-8 text-primary/30" />
              </div>
              <div className="mb-4">
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm italic text-pretty">{testimonial.text}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

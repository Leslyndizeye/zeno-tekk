"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { Star } from "lucide-react"

import { useTestimonials, type Testimonial } from "@/hooks/useApi"
import { Card, CardContent } from "@/components/ui/card"

interface TestimonialItem extends Testimonial {
  position?: string
}

const defaultTestimonials: TestimonialItem[] = [
  {
    id: 1,
    clientName: "Jean-Pierre Habimana",
    position: "CEO",
    clientCompany: "Kigali Ventures",
    clientImage: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    content:
      "ZENO TEKK transformed our business with their innovative software solutions. Their team brought clarity, speed, and exceptional engineering quality from start to finish.",
    isActive: true,
    order: 1,
  },
  {
    id: 2,
    clientName: "Diane Mukasine",
    position: "CTO",
    clientCompany: "RwandaTech Hub",
    clientImage: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    content:
      "The platform they built for us improved customer engagement immediately. The product feels polished, scalable, and genuinely designed around our workflow.",
    isActive: true,
    order: 2,
  },
  {
    id: 3,
    clientName: "Eric Nkurunziza",
    position: "Founder",
    clientCompany: "Hanga Digital",
    clientImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    content:
      "Working with ZENO TEKK was a game-changer. Their attention to detail, communication, and delivery pace made the entire build process smooth and reliable.",
    isActive: true,
    order: 3,
  },
  {
    id: 4,
    clientName: "Aline Umubyeyi",
    position: "Product Manager",
    clientCompany: "Irembo Solutions",
    clientImage: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    content:
      "They delivered beyond our expectations. The final solution solved real operational problems and gave our business a much stronger digital foundation.",
    isActive: true,
    order: 4,
  },
  {
    id: 5,
    clientName: "Patrick Uwimana",
    position: "Co-Founder",
    clientCompany: "Norrsken Kigali",
    clientImage: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    content:
      "From the first call to final delivery, ZENO TEKK was professional, fast, and genuinely invested in making our product succeed. Highly recommend.",
    isActive: true,
    order: 5,
  },
  {
    id: 6,
    clientName: "Claudine Ingabire",
    position: "Director",
    clientCompany: "BPR Digital",
    clientImage: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    content:
      "The team understood our vision immediately and translated it into a product that our users love. Delivery was on time and the quality was outstanding.",
    isActive: true,
    order: 6,
  },
]

export function UserFeedback() {
  const { testimonials } = useTestimonials()

  const displayTestimonials: TestimonialItem[] =
    testimonials.length > 0 ? testimonials : defaultTestimonials
  const marqueeTestimonials = [...displayTestimonials, ...displayTestimonials]

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    import("aos").then((module) => {
      module.default.init({
        duration: 800,
        once: true,
        offset: 100,
      })
    })
  }, [])

  return (
    <section className="relative w-full overflow-hidden bg-white py-20 dark:bg-black">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto mb-10 max-w-3xl text-center"
          data-aos="fade-up"
        >
          <h2 className="text-3xl font-bold tracking-tight text-balance md:text-5xl">
            Trusted by Innovative Teams
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground text-pretty">
            Businesses choose ZENO TEKK for thoughtful product strategy, dependable delivery, and software that feels
            as strong as it looks.
          </p>
        </motion.div>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-20 bg-gradient-to-r from-white via-white/90 to-transparent dark:from-black dark:via-black/90 md:block" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-20 bg-gradient-to-l from-white via-white/90 to-transparent dark:from-black dark:via-black/90 md:block" />

        <div className="overflow-hidden px-6 pb-4 md:px-14">
          <div className="testimonial-marquee flex w-max gap-6">
            {marqueeTestimonials.map((testimonial, index) => (
              <motion.div
                key={`${testimonial.id}-${index}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: index < displayTestimonials.length ? index * 0.06 : 0 }}
                className="testimonial-item w-[300px] flex-shrink-0 sm:w-[330px] lg:w-[350px]"
              >
                <Card className="testimonial-card h-full cursor-pointer overflow-hidden rounded-[28px] border-border/60 bg-white p-0 dark:border-white/10 dark:bg-black/70 dark:hover:bg-black/85">
                  <CardContent className="flex h-full flex-col p-7">
                    <div className="mb-5 flex gap-1">
                      {Array.from({ length: Math.max(0, Math.floor(testimonial.rating || 0)) }).map((_, starIndex) => (
                        <Star key={starIndex} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>

                    <p className="mb-8 flex-1 text-sm leading-7 text-foreground/80 italic">
                      "{testimonial.content}"
                    </p>

                    <div className="flex items-center gap-4">
                      <img
                        src={testimonial.clientImage || "/placeholder.svg"}
                        alt={testimonial.clientName}
                        className="h-12 w-12 rounded-full border-2 border-primary/15 object-cover"
                        loading="lazy"
                      />

                      <div>
                        <h4 className="text-sm font-semibold text-foreground">{testimonial.clientName}</h4>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                          {testimonial.position || testimonial.clientCompany}
                        </p>
                        {testimonial.position && (
                          <p className="mt-1 text-xs text-muted-foreground/80">{testimonial.clientCompany}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .testimonial-marquee {
          animation: testimonial-marquee 34s linear infinite;
        }

        .testimonial-marquee:has(.testimonial-item:hover) {
          animation-play-state: paused;
        }

        .testimonial-card {
          transform: translate3d(0, 0, 0);
          will-change: transform, box-shadow, border-color, background-color;
          transition:
            transform 0.5s ease-out,
            box-shadow 0.5s ease-out,
            border-color 0.5s ease-out,
            background-color 0.5s ease-out;
          box-shadow: 0 20px 50px rgba(2, 6, 23, 0.06);
        }

        .testimonial-card:hover {
          transform: translate3d(0, -6px, 0);
          border-color: rgba(91, 111, 232, 0.35);
          box-shadow: 0 24px 60px rgba(91, 111, 232, 0.14);
        }

        :global(.dark) .testimonial-card:hover {
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
        }

        @keyframes testimonial-marquee {
          from {
            transform: translate3d(0, 0, 0);
          }

          to {
            transform: translate3d(calc(-50% - 0.75rem), 0, 0);
          }
        }

        @media (max-width: 768px) {
          .testimonial-marquee {
            animation-duration: 26s;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .testimonial-marquee {
            animation: none;
          }
        }
      `}</style>
    </section>
  )
}

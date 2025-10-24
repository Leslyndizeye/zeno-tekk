"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Users, Briefcase, Award, Clock } from "lucide-react"

interface Stat {
  icon: React.ElementType
  value: number
  suffix: string
  label: string
  prefix?: string
}

const stats: Stat[] = [
  { icon: Briefcase, value: 50, suffix: "+", label: "Projects Delivered" },
  { icon: Award, value: 99, suffix: "%", label: "Client Satisfaction" },
  { icon: Users, value: 100, suffix: "+", label: "Happy Clients" },
  { icon: Clock, value: 3, suffix: "+", label: "Years Experience" },
]

function CountUpAnimation({ end, suffix, prefix = "" }: { end: number; suffix: string; prefix?: string }) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const duration = 2000
          const steps = 60
          const increment = end / steps
          let current = 0

          const timer = setInterval(() => {
            current += increment
            if (current >= end) {
              setCount(end)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)

          return () => clearInterval(timer)
        }
      },
      { threshold: 0.5 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [end, hasAnimated])

  return (
    <div ref={ref} className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary">
      {prefix}
      {count}
      {suffix}
    </div>
  )
}

export function StatsCounter() {
  return (
    <section className="py-20 md:py-32 border-y border-border bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16" data-aos="fade-up">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm text-primary mb-4">
            Our Achievements
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            Trusted by Businesses Worldwide
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Our track record speaks for itself. Here's what we've accomplished together with our clients.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div key={index} data-aos="zoom-in" data-aos-delay={index * 100} className="text-center space-y-4 group">
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-all duration-500 group-hover:scale-110">
                <stat.icon className="w-8 h-8 md:w-10 md:h-10 text-primary" />
              </div>
              <CountUpAnimation end={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              <div className="text-sm md:text-base text-muted-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

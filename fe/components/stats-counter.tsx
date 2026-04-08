"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Award, Briefcase, Clock, Users } from "lucide-react"

import { useStats } from "@/hooks/useApi"
import { Card, CardContent } from "@/components/ui/card"

interface StatDisplay {
  icon: React.ElementType
  value: number
  suffix: string
  label: string
  prefix?: string
  description: string
}

const statMeta: Record<string, { icon: React.ElementType; description: string }> = {
  "Projects Delivered": {
    icon: Briefcase,
    description: "Custom digital products shipped for businesses across multiple industries.",
  },
  "Client Satisfaction": {
    icon: Award,
    description: "Consistently strong outcomes backed by long-term client trust and results.",
  },
  "Happy Clients": {
    icon: Users,
    description: "Growing partnerships with ambitious teams building for real-world scale.",
  },
  "Years Experience": {
    icon: Clock,
    description: "Hands-on product delivery experience across design, engineering, and launch.",
  },
}

function CountUpAnimation({
  end,
  suffix,
  prefix = "",
}: {
  end: number
  suffix: string
  prefix?: string
}) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || hasAnimated) {
          return
        }

        setHasAnimated(true)
        const duration = 1800
        const steps = 60
        const increment = end / steps
        let current = 0

        const timer = window.setInterval(() => {
          current += increment
          if (current >= end) {
            setCount(end)
            window.clearInterval(timer)
          } else {
            setCount(Math.floor(current))
          }
        }, duration / steps)
      },
      { threshold: 0.45 },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [end, hasAnimated])

  return (
    <div ref={ref} className="text-4xl font-black tracking-tighter md:text-5xl">
      {prefix}
      {count}
      {suffix}
    </div>
  )
}

function parseStatValue(rawValue: string) {
  const value = rawValue.trim()
  const numeric = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0
  const prefixMatch = value.match(/^[^0-9]+/)
  const suffixMatch = value.match(/[^0-9]+$/)

  return {
    value: numeric,
    prefix: prefixMatch?.[0] ?? "",
    suffix: suffixMatch?.[0] ?? "",
  }
}

export function StatsCounter() {
  const { stats } = useStats()

  const defaultStats = [
    { label: "Projects Delivered", value: "50+" },
    { label: "Client Satisfaction", value: "99%" },
    { label: "Happy Clients", value: "100+" },
    { label: "Years Experience", value: "3+" },
  ]

  const displayStats = stats.length > 0 ? stats : defaultStats

  const parsedStats: StatDisplay[] = displayStats.map((stat) => {
    const parsedValue = parseStatValue(stat.value)
    const meta = statMeta[stat.label] ?? {
      icon: Briefcase,
      description: "Trusted by teams that need thoughtful execution and reliable delivery.",
    }

    return {
      icon: meta.icon,
      label: stat.label,
      value: parsedValue.value,
      prefix: parsedValue.prefix,
      suffix: parsedValue.suffix,
      description: meta.description,
    }
  })

  return (
    <section className="bg-white dark:bg-black py-24">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center" data-aos="fade-up">
          <h2 className="mb-4 text-3xl font-bold text-balance md:text-4xl lg:text-5xl">
            Trusted by Businesses Worldwide
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty">
            Our track record reflects the quality, trust, and momentum we build with every client partnership.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {parsedStats.map((stat, index) => (
            <motion.div
              key={`${stat.label}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: index * 0.1, duration: 0.45, ease: "easeOut" }}
            >
              <Card className="group relative overflow-hidden border-border/40 bg-muted/5 p-0 transition-all duration-500 hover:bg-muted/10">
                <CardContent className="relative p-8">
                  <div className="absolute -right-12 -top-12 h-24 w-24 rounded-full bg-primary/5 blur-2xl transition-all duration-500 group-hover:bg-primary/10" />

                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 transition-transform duration-500 group-hover:scale-110">
                      <stat.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                      {stat.label}
                    </span>
                  </div>

                  <h3 className="mb-2 tracking-tighter">
                    <CountUpAnimation end={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                  </h3>

                  <p className="text-sm leading-relaxed text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

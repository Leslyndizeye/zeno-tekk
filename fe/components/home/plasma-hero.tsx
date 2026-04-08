"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Particles } from "@/components/ui/particles"

interface PlasmaHeroProps {
  badge: string
  title: string
  subtitle: string
  description: string
  primaryLabel: string
  primaryHref: string
  secondaryLabel: string
  secondaryHref: string
}

function splitTitle(title: string, subtitle: string) {
  if (!subtitle) {
    return { before: title, highlight: "", after: "" }
  }

  const lowerTitle = title.toLowerCase()
  const lowerSubtitle = subtitle.toLowerCase()
  const matchIndex = lowerTitle.indexOf(lowerSubtitle)

  if (matchIndex === -1) {
    return { before: title, highlight: "", after: "" }
  }

  return {
    before: title.slice(0, matchIndex).trim(),
    highlight: title.slice(matchIndex, matchIndex + subtitle.length).trim(),
    after: title.slice(matchIndex + subtitle.length).trim(),
  }
}

export function PlasmaHero({
  badge,
  title,
  subtitle,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: PlasmaHeroProps) {
  const titleParts = splitTitle(title, subtitle)


  return (
      <section className="relative h-screen w-full overflow-hidden" style={{ backgroundColor: "#050814" }}>
        <Particles
          particleCount={500}
          particleSpread={20}
          speed={0.1}
          particleColors={["#5b6fe8", "#a4b4ff", "#ffffff"]}
          moveParticlesOnHover
          particleHoverFactor={0.3}
          alphaParticles={false}
          particleBaseSize={80}
          sizeRandomness={1}
          cameraDistance={25}
          disableRotation={false}
        />
        

        <div className="relative z-10 flex min-h-screen items-center justify-center px-6 pb-20 pt-36 sm:px-10 sm:pt-40 lg:px-16">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            {/* <div
              data-aos="fade-up"
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(145,162,255,0.2)] bg-[rgba(12,18,44,0.48)] px-5 py-2 text-sm font-medium text-white/92 shadow-[0_20px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl"
            >
              <Sparkles className="h-4 w-4 text-[rgb(164,180,255)]" />
              <span>{displayBadge}</span>
            </div> */}

            <h1
              // data-aos="fade-up"
              // data-aos-delay="150"
              className="mb-10 max-w-4xl text-balance text-4xl font-semibold leading-[0.96] tracking-[-0.05em] text-white sm:text-6xl md:text-7xl lg:text-[5.4rem]"
            >
              {titleParts.highlight ? (
                <>
                  {titleParts.before && <span className="block">{titleParts.before}</span>}
                  <span className="mt-3 block bg-linear-to-r from-[#f7f9ff] via-[#c4ceff] to-primary bg-clip-text text-transparent">
                    {titleParts.highlight}
                  </span>
                  {titleParts.after && <span className="mt-3 block text-white/92">{titleParts.after}</span>}
                </>
              ) : (
                <span className="bg-linear-to-r from-[#f7f9ff] via-[#c4ceff] to-primary bg-clip-text text-transparent">
                  {title}
                </span>
              )}
            </h1>

            <p
              // data-aos="fade-up"
              // data-aos-delay="300"
              className="mb-10 max-w-2xl text-pretty text-base leading-7 text-white/72 sm:text-lg sm:leading-8"
            >
              {description}
            </p>

            <div
              data-aos="fade-up"
              data-aos-delay="450"
              className="mt-4 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Button
                asChild
                size="lg"
                className="h-14 rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-[0_18px_48px_rgba(91,111,232,0.22)] hover:bg-primary/90"
              >
                <Link href={primaryHref}>
                  {primaryLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-14 rounded-full border-[rgba(151,146,149,0.24)] bg-[rgba(204,208,224,0.46)] px-8 text-base font-semibold text-white backdrop-blur-xl hover:border-[rgba(145,162,255,0.38)] hover:bg-[rgba(91,111,232,0.14)]"
              >
                <Link href={secondaryHref}>{secondaryLabel}</Link>
              </Button>
            </div>

            {/* <div
              data-aos="fade-up"
              data-aos-delay="600"
              className="mt-12 inline-flex items-center gap-3 rounded-full border border-[rgba(145,162,255,0.14)] bg-[rgba(4,8,20,0.42)] px-4 py-2 text-xs tracking-[0.25em] text-white/48 uppercase backdrop-blur-md"
            >
              <span className="h-2 w-2 rounded-full bg-[rgb(91,111,232)] shadow-[0_0_16px_rgba(91,111,232,0.9)]" />
              Scalable software crafted for ambitious teams
            </div> */}
          </div>
        </div>
      </section>
    
  )
}

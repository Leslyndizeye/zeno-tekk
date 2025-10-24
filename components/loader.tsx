"use client"

import { useEffect, useState } from "react"

const quotes = [
  "Good is not good enough.",
  "Innovation distinguishes between a leader and a follower.",
  "The best way to predict the future is to invent it.",
  "Stay hungry. Stay foolish.",
  "Think different.",
  "Code is poetry.",
  "Simplicity is the ultimate sophistication.",
]

export function Loader() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentQuote, setCurrentQuote] = useState(0)
  const [isAnimating, setIsAnimating] = useState(true)
  const [isFirstVisit, setIsFirstVisit] = useState(false)

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited")
    if (hasVisited) {
      setIsLoading(false)
      return
    }

    setIsFirstVisit(true)
    sessionStorage.setItem("hasVisited", "true")

    const quoteInterval = setInterval(() => {
      setIsAnimating(false)
      setTimeout(() => {
        setCurrentQuote((prev) => (prev + 1) % quotes.length)
        setIsAnimating(true)
      }, 400)
    }, 3500) // Increased from 2500ms to 3500ms for better readability

    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 12000) // Increased from 8000ms to 12000ms to show more quotes

    return () => {
      clearInterval(quoteInterval)
      clearTimeout(timer)
    }
  }, [])

  if (!isLoading || !isFirstVisit) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-blue-600/5 animate-pulse" />

      <div className="relative z-10 max-w-4xl px-8 text-center">
        <div
          className={`transition-all duration-700 ${
            isAnimating ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-8 scale-95"
          }`}
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-light text-foreground leading-tight tracking-tight text-balance">
            {quotes[currentQuote]}
          </h1>
        </div>

        <div className="mt-16 w-80 h-1 mx-auto bg-border rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary via-blue-600 to-cyan-500 animate-[loading_12s_ease-in-out_forwards]" />
        </div>
      </div>

      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"

export function PageTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const pathname = usePathname()
  const { theme } = useTheme()

  useEffect(() => {
    setIsInitialLoad(false)
  }, [])

  useEffect(() => {
    if (isInitialLoad) return

    setIsTransitioning(true)
    const timer = setTimeout(() => {
      setIsTransitioning(false)
    }, 2000) // Display for 2 seconds

    return () => clearTimeout(timer)
  }, [pathname, isInitialLoad])

  if (!isTransitioning) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] w-full h-full ${
        theme === "dark" ? "bg-black" : "bg-white"
      } animate-[fadeOut_2s_ease-out_forwards]`}
    />
  )
}

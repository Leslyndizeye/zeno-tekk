"use client"

import { useEffect, useState } from "react"

export function useCardsReady(delay = 2000) {
  const [cardsReady, setCardsReady] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setCardsReady(true), delay)
    return () => clearTimeout(t)
  }, [delay])
  return cardsReady
}

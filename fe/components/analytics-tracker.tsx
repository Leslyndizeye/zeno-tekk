"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

const API_URL = process.env.NEXT_PUBLIC_API_URL

function getSessionId(): string {
  if (typeof window === "undefined") return ""
  let sid = sessionStorage.getItem("_zt_sid")
  if (!sid) {
    sid = Math.random().toString(36).slice(2) + Date.now().toString(36)
    sessionStorage.setItem("_zt_sid", sid)
  }
  return sid
}

export function AnalyticsTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Never track admin or auth routes
    if (pathname.startsWith("/admin") || pathname.startsWith("/authnxt")) return

    const sessionId = getSessionId()
    if (!sessionId) return

    fetch(`${API_URL}/content/analytics/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        page: pathname,
        referrer: document.referrer || undefined,
        sessionId,
      }),
    }).catch(() => {})
  }, [pathname])

  return null
}

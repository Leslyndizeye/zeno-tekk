import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { PageTransition } from "@/components/page-transition"
import { AnalyticsTracker } from "@/components/analytics-tracker"
import "./globals.css"
import { Toaster } from "sonner"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ZENO TEKK - Innovative Software Solutions",
  description: "Transform ideas into innovative software. Custom development, AI solutions, and modern applications.",
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo-icon.png", type: "image/png" },
    ],
    apple: "/logo-icon.png",
    shortcut: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Zenotekk",
              url: "https://zenotekk.com",
              logo: "https://zenotekk.com/logo.png",
              description:
                "Zenotekk is a software development company specializing in web, mobile and AI applications.",
              sameAs: [
                "https://linkedin.com/company/zenotekk",
                "https://instagram.com/zenotekk",
              ],
            }),
          }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <PageTransition />
          <AnalyticsTracker />
          {children}
        <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}

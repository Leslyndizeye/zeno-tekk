"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Moon, Sun, ArrowUp } from "lucide-react"
import { useTheme } from "next-themes"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQs" },
]

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => { setIsMenuOpen(false) }, [pathname])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center px-4 pt-5 md:px-6">
        {/* Main bar */}
        <nav
          style={{ transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)" }}
          className={`w-full max-w-5xl flex items-center justify-between ${
            scrolled
              ? "rounded-2xl bg-background/95 dark:bg-black/95 backdrop-blur-2xl border border-border/60 shadow-2xl shadow-black/10 px-5 py-3"
              : "rounded-full bg-black/60 backdrop-blur-xl border border-white/25 px-5 py-3"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <img
              src="logo.png"
              alt="ZENO TEKK"
              style={{ transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)" }}
              className={scrolled ? "w-24" : "w-28"}
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                    isActive
                      ? scrolled
                        ? "text-primary"
                        : "text-white"
                      : scrolled
                        ? "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                        : "text-white/65 hover:text-white hover:bg-white/8"
                  }`}
                >
                  {link.label}
                  {/* Active dot */}
                  <span
                    style={{ transition: "opacity 0.3s ease, transform 0.3s ease" }}
                    className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary ${
                      isActive ? "opacity-100 scale-100" : "opacity-0 scale-0"
                    }`}
                  />
                </Link>
              )
            })}
          </div>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-2">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 active:scale-90 ${
                  scrolled
                    ? "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                    : "text-white/65 hover:text-white hover:bg-white/10"
                }`}
              >
                {theme === "dark"
                  ? <Sun className="w-4 h-4" />
                  : <Moon className="w-4 h-4" />}
              </button>
            )}
            <Link
              href="/contact"
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-[1.04] active:scale-95 ${
                scrolled
                  ? "bg-primary text-primary-foreground hover:shadow-xl hover:shadow-primary/25"
                  : "bg-white text-zinc-900 hover:bg-white/90 hover:shadow-xl hover:shadow-black/20"
              }`}
            >
              Get in Touch
            </Link>
          </div>

          {/* Mobile right */}
          <div className="flex md:hidden items-center gap-1">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                  scrolled ? "text-muted-foreground" : "text-white/70"
                }`}
              >
                {theme === "dark"
                  ? <Sun className="w-4 h-4" />
                  : <Moon className="w-4 h-4" />}
              </button>
            )}
            <button
              onClick={() => setIsMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                scrolled
                  ? "text-foreground hover:bg-muted/60"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <span
                style={{ transition: "transform 0.3s ease, opacity 0.3s ease" }}
                className={`absolute ${isMenuOpen ? "opacity-100 rotate-0" : "opacity-0 rotate-90"}`}
              >
                <X className="w-5 h-5" />
              </span>
              <span
                style={{ transition: "transform 0.3s ease, opacity 0.3s ease" }}
                className={`absolute ${isMenuOpen ? "opacity-0 -rotate-90" : "opacity-100 rotate-0"}`}
              >
                <Menu className="w-5 h-5" />
              </span>
            </button>
          </div>
        </nav>

        {/* Mobile dropdown */}
        <div
          style={{
            transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            opacity: isMenuOpen ? 1 : 0,
            transform: isMenuOpen ? "translateY(0)" : "translateY(-8px)",
            pointerEvents: isMenuOpen ? "auto" : "none",
          }}
          className={`w-full max-w-5xl mt-2 rounded-2xl border overflow-hidden md:hidden ${
            scrolled
              ? "border-border/40 bg-background/90 backdrop-blur-2xl shadow-2xl shadow-black/10"
              : "border-white/10 bg-zinc-900/85 backdrop-blur-2xl shadow-2xl"
          }`}
        >
          <div className="p-3 space-y-0.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : scrolled
                        ? "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                        : "text-white/70 hover:bg-white/8 hover:text-white"
                  }`}
                >
                  {link.label}
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                </Link>
              )
            })}
            <div className="pt-2 pb-1 px-0.5">
              <Link
                href="/contact"
                className="flex w-full items-center justify-center rounded-xl py-3 text-sm font-semibold bg-primary text-primary-foreground transition-opacity duration-200 hover:opacity-90 active:scale-95"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Scroll to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
        style={{
          transition: "opacity 0.3s ease, transform 0.3s ease",
          opacity: showScrollTop ? 1 : 0,
          transform: showScrollTop ? "translateY(0) scale(1)" : "translateY(12px) scale(0.8)",
          pointerEvents: showScrollTop ? "auto" : "none",
        }}
        className="fixed bottom-8 right-8 z-50 w-11 h-11 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 flex items-center justify-center hover:scale-110 hover:shadow-xl hover:shadow-primary/40 active:scale-95 transition-transform duration-200"
      >
        <ArrowUp className="w-4 h-4" />
      </button>
    </>
  )
}

"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, Moon, Sun, Home, Briefcase, Package, BookOpen, ArrowUp } from "lucide-react"
import { useTheme } from "next-themes"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)
      setShowScrollTop(currentScrollY > 300)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/services", label: "Services", icon: Briefcase },
    { href: "/products", label: "Products", icon: Package },
    { href: "/blog", label: "Blog", icon: BookOpen },
  ]

  const isScrolled = scrollY > 30

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
          isScrolled ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-lg py-3" : "bg-transparent py-6"
        }`}
      >
        <div
          className={`transition-all duration-700 ease-out ${isScrolled ? "container mx-auto px-6" : "max-w-6xl mx-auto px-6"}`}
        >
          <div
            className={`flex items-center justify-between transition-all duration-700 ease-out ${
              isScrolled ? "rounded-none" : "rounded-full bg-card/50 backdrop-blur-md border border-border px-6 py-3"
            }`}
          >
            <Link href="/" className="flex items-center gap-3 group">
              <div
                className={`relative transition-all duration-700 ease-out ${
                  isScrolled ? "w-28" : "w-36"
                } flex items-center justify-center`}
              >
                <img src="logo.png" alt="logo" />
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full relative group ${
                      pathname === link.href
                        ? "text-primary bg-primary/10 backdrop-blur-sm"
                        : "hover:bg-card/80 hover:backdrop-blur-md"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                )
              })}

              <div className="ml-4 pl-4 border-l border-border/50">
                <Link
                  href="/contact"
                  className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold bg-gradient-to-r from-primary to-blue-600 text-primary-foreground rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/50 hover:scale-105 active:scale-95"
                >
                  Reach Us
                </Link>
              </div>

              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="ml-2 hover:bg-primary/10 hover:text-primary hover:backdrop-blur-md transition-all duration-300 rounded-full hover:scale-110 active:scale-95"
                >
                  {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="hover:bg-primary/10 hover:text-primary transition-all duration-300 rounded-full"
                >
                  {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </Button>
              )}
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200 bg-card/95 backdrop-blur-md rounded-2xl p-6 border border-border">
              {navLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 w-full text-left py-2 transition-colors ${
                      pathname === link.href ? "text-primary font-semibold" : "hover:text-primary"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {link.label}
                  </Link>
                )
              })}
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 mt-4 text-sm font-semibold bg-gradient-to-r from-primary to-blue-600 text-primary-foreground rounded-full"
              >
                Reach Us
              </Link>
            </div>
          )}
        </div>
      </nav>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 bg-gradient-to-r from-primary to-blue-600 text-primary-foreground rounded-full shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:scale-110 active:scale-95 animate-in fade-in slide-in-from-bottom-4"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </>
  )
}

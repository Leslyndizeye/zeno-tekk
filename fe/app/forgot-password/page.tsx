"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Mail, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const initAOS = async () => {
      if (typeof window !== "undefined") {
        const AOS = (await import("aos")).default
        AOS.init({ duration: 1000, once: true, offset: 100 })
      }
    }
    initAOS()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          frontendBaseUrl: window.location.origin,
        }),
      })

      if (res.ok) {
        setSent(true)
      } else {
        const err = await res.json()
        toast.error(err.message || "Failed to send reset email")
      }
    } catch {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="relative pt-32 pb-20 min-h-screen flex items-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "4s" }}
          />
          <div
            className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "6s", animationDelay: "1s" }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-md mx-auto">
            {/* Header */}
            <div className="text-center mb-8" data-aos="fade-up">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                Forgot <span className="text-primary">Password?</span>
              </h1>
              <p className="text-muted-foreground text-pretty">
                Enter your email and we&apos;ll send you a reset link.
              </p>
            </div>

            <Card
              data-aos="fade-up"
              data-aos-delay="100"
              className="p-8 border-border bg-card shadow-2xl"
            >
              {sent ? (
                <div className="text-center space-y-4">
                  <CheckCircle className="w-12 h-12 text-primary mx-auto" />
                  <h2 className="text-xl font-semibold">Check your inbox</h2>
                  <p className="text-muted-foreground text-sm">
                    If an account exists for <span className="font-medium text-foreground">{email}</span>, you will receive a password reset link shortly.
                  </p>
                  <Link href="/authnxt">
                    <Button variant="outline" className="w-full mt-2 cursor-pointer">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Sign In
                    </Button>
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        required
                        autoFocus
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full group cursor-pointer" size="lg" disabled={loading}>
                    {loading ? "Sending..." : "Send Reset Link"}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>

                  <div className="pt-4 border-t border-border">
                    <p className="text-center text-sm text-muted-foreground">
                      Remember your password?{" "}
                      <Link href="/authnxt" className="text-primary hover:underline font-medium">
                        Sign in
                      </Link>
                    </p>
                  </div>
                </form>
              )}
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="pt-36 pb-24 px-4">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl font-black tracking-tight mb-2">Cookie Policy</h1>
          <p className="text-sm text-muted-foreground mb-12">Last updated: April 2026</p>

          {[
            {
              title: "1. What Are Cookies",
              body: "Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work efficiently and to provide information to website owners.",
            },
            {
              title: "2. How We Use Cookies",
              body: "ZENO TEKK uses cookies to remember your preferences, understand how visitors interact with our website, improve the overall user experience, and analyze website performance through analytics tools.",
            },
            {
              title: "3. Types of Cookies We Use",
              body: "Essential cookies: Required for the website to function correctly. Analytics cookies: Help us understand how visitors use our site (e.g. Google Analytics). Preference cookies: Remember settings you have selected. These cookies do not store personally identifiable information.",
            },
            {
              title: "4. Third-Party Cookies",
              body: "Some pages on our website may include content from third-party services such as YouTube, Google Maps, or analytics providers. These services may set their own cookies subject to their respective privacy policies.",
            },
            {
              title: "5. Managing Cookies",
              body: "You can control and manage cookies through your browser settings. Most browsers allow you to refuse, accept, or delete cookies. Please note that disabling certain cookies may affect the functionality of our website. Refer to your browser's help documentation for instructions.",
            },
            {
              title: "6. Updates to This Policy",
              body: "We may update this Cookie Policy periodically. Changes will be reflected by updating the date at the top of this page. Continued use of our website after changes means you accept the updated policy.",
            },
            {
              title: "7. Contact Us",
              body: "If you have questions about our use of cookies, contact us at info.zenotekk@gmail.com or call +250 790 293 963.",
            },
          ].map((section) => (
            <div key={section.title} className="mb-10">
              <h2 className="text-lg font-black mb-3 tracking-tight">{section.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{section.body}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  )
}

"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="pt-36 pb-24 px-4">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl font-black tracking-tight mb-2">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground mb-12">Last updated: April 2026</p>

          {[
            {
              title: "1. Information We Collect",
              body: "We collect information you provide directly to us, such as your name, email address, phone number, and message content when you contact us through our website or request our services. We may also collect technical information including IP address, browser type, and pages visited through standard server logs and analytics tools.",
            },
            {
              title: "2. How We Use Your Information",
              body: "We use the information we collect to respond to your inquiries, provide and improve our services, send you relevant updates or proposals (only when you have expressed interest), and comply with legal obligations. We do not sell, rent, or trade your personal information to third parties.",
            },
            {
              title: "3. Data Storage and Security",
              body: "Your data is stored on secure servers. We implement industry-standard security measures including encryption and access controls. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.",
            },
            {
              title: "4. Cookies",
              body: "We use cookies and similar tracking technologies to improve your browsing experience on our website. You can control cookie settings through your browser. For more details, see our Cookie Policy.",
            },
            {
              title: "5. Third-Party Services",
              body: "We may use third-party services such as analytics providers (Google Analytics) and hosting platforms (Vercel). These services may collect information about your use of our website in accordance with their own privacy policies.",
            },
            {
              title: "6. Your Rights",
              body: "You have the right to access, correct, or delete the personal data we hold about you. You may also withdraw consent for marketing communications at any time. To exercise these rights, contact us at info.zenotekk@gmail.com.",
            },
            {
              title: "7. Changes to This Policy",
              body: "We may update this Privacy Policy from time to time. We will notify you of significant changes by updating the date at the top of this page. Continued use of our website after changes constitutes acceptance of the updated policy.",
            },
            {
              title: "8. Contact Us",
              body: "If you have any questions about this Privacy Policy, please contact us at info.zenotekk@gmail.com or call +250 790 293 963.",
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

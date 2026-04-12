"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="pt-36 pb-24 px-4">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl font-black tracking-tight mb-2">Terms of Service</h1>
          <p className="text-sm text-muted-foreground mb-12">Last updated: April 2026</p>

          {[
            {
              title: "1. Acceptance of Terms",
              body: "By accessing or using ZENO TEKK's website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.",
            },
            {
              title: "2. Services",
              body: "ZENO TEKK provides custom software development, web and mobile application development, UI/UX design, AI integration, DevOps, and related technology services. The specific scope, timeline, and deliverables for each project are defined in individual service agreements or proposals.",
            },
            {
              title: "3. Client Responsibilities",
              body: "Clients are responsible for providing accurate and complete information required to deliver the services, timely feedback and approvals at agreed milestones, and any third-party credentials, assets, or access needed for the project.",
            },
            {
              title: "4. Payment Terms",
              body: "Payment terms are specified in each project agreement. ZENO TEKK reserves the right to pause or terminate work if payments are not received according to the agreed schedule. All fees are non-refundable unless otherwise stated in the project agreement.",
            },
            {
              title: "5. Intellectual Property",
              body: "Upon full payment, clients receive ownership of the custom deliverables developed exclusively for their project. ZENO TEKK retains rights to any pre-existing tools, frameworks, or methodologies used in the development process. ZENO TEKK may showcase completed work in its portfolio unless explicitly agreed otherwise.",
            },
            {
              title: "6. Confidentiality",
              body: "Both parties agree to keep confidential any proprietary information shared during the project. This obligation survives the termination of the service agreement.",
            },
            {
              title: "7. Limitation of Liability",
              body: "ZENO TEKK's liability is limited to the fees paid for the specific service in question. We are not liable for indirect, incidental, or consequential damages arising from the use of our services.",
            },
            {
              title: "8. Governing Law",
              body: "These terms are governed by the laws of Rwanda. Any disputes shall be resolved through good-faith negotiation, and if unresolved, through the appropriate courts in Kigali, Rwanda.",
            },
            {
              title: "9. Contact",
              body: "For questions about these Terms of Service, contact us at info.zenotekk@gmail.com or +250 790 293 963.",
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

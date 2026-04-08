"use client"

import { useEffect, useMemo, useState } from "react"
import { useCardsReady } from "@/hooks/useCardsReady"
import { FAQSkeleton } from "@/components/ui/card-skeleton"
import { motion } from "framer-motion"
import { HelpCircle, Search } from "lucide-react"

import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"

const categories = [
  {
    id: "general",
    name: "General",
    faqs: [
      {
        question: "What does ZENO TEKK do?",
        answer:
          "ZENO TEKK is a software development company that helps startups, growing businesses, and organizations design, build, and launch custom web apps, mobile apps, and digital platforms.",
      },
      {
        question: "Who do you work with?",
        answer:
          "We work with startups, SMEs, institutions, and established companies that need modern digital products, process automation, or a stronger online platform.",
      },
      {
        question: "Where is ZENO TEKK based?",
        answer:
          "We are based in Rwanda and collaborate with clients across different regions through a flexible, remote-friendly workflow.",
      },
      {
        question: "How do I get started with ZENO TEKK?",
        answer:
          "You can reach out through our contact page, share your idea or requirements, and we’ll guide you through discovery, planning, and the next recommended steps.",
      },
    ],
  },
  {
    id: "services",
    name: "Services",
    faqs: [
      {
        question: "What services does ZENO TEKK offer?",
        answer:
          "We offer custom software development, web and mobile app development, UI/UX design, AI integration, DevOps support, cloud solutions, and ongoing maintenance.",
      },
      {
        question: "Do you build both websites and mobile apps?",
        answer:
          "Yes. We build responsive websites, web platforms, and mobile applications depending on your product goals, users, and delivery needs.",
      },
      {
        question: "Can you redesign or improve my existing product?",
        answer:
          "Absolutely. We can audit an existing product, improve performance, refresh the interface, expand features, and modernize the stack where needed.",
      },
      {
        question: "Do you offer post-launch support?",
        answer:
          "Yes. We provide maintenance and support for fixes, updates, performance improvements, monitoring, and product growth after launch.",
      },
    ],
  },
  {
    id: "process",
    name: "Process",
    faqs: [
      {
        question: "What is your development process?",
        answer:
          "Our process typically moves through discovery, design, development, testing, launch, and support, with regular collaboration and feedback throughout.",
      },
      {
        question: "How long does a project take?",
        answer:
          "Project timelines depend on scope. Smaller websites may take a few weeks, while full platforms or mobile products can take several weeks to a few months.",
      },
      {
        question: "Will I have a dedicated point of contact?",
        answer:
          "Yes. We keep communication clear by giving you a reliable point of contact throughout planning, execution, and delivery.",
      },
    ],
  },
  {
    id: "technical",
    name: "Technical",
    faqs: [
      {
        question: "What technologies do you use?",
        answer:
          "We work with modern technologies such as Next.js, React, TypeScript, Node.js, Python, PostgreSQL, cloud platforms, and related tooling based on project needs.",
      },
      {
        question: "How do you ensure data security?",
        answer:
          "We apply secure development practices including authentication controls, protected APIs, encrypted communication, access management, and ongoing review of security risks.",
      },
      {
        question: "Can you integrate with third-party tools and APIs?",
        answer:
          "Yes. We frequently integrate payment systems, CRMs, analytics tools, internal services, and external APIs into the products we build.",
      },
    ],
  },
]

export default function FAQPage() {
  const [search, setSearch] = useState("")

  useEffect(() => {
    const initAOS = async () => {
      if (typeof window !== "undefined") {
        const AOS = (await import("aos")).default
        AOS.init({ duration: 800, once: true, offset: 80 })
      }
    }

    initAOS()
  }, [])

  const faqs = useMemo(
    () =>
      categories.flatMap((category) =>
        category.faqs.map((faq) => ({
          ...faq,
          category: category.name,
        })),
      ),
    [],
  )

  const filteredFaqs = useMemo(() => {
    const query = search.trim().toLowerCase()

    if (!query) {
      return faqs
    }

    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.category.toLowerCase().includes(query),
    )
  }, [faqs, search])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="min-h-screen w-full bg-background px-4 py-24 pt-36">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-16 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="mb-6 inline-flex rounded-2xl bg-primary/10 p-3"
            >
              <HelpCircle className="h-8 w-8 text-primary" />
            </motion.div>

            <h1 className="mb-4 text-4xl font-black tracking-tight md:text-5xl">Questions? Answers.</h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Everything you need to know about working with ZENO TEKK, building digital products, and getting your project moving.
            </p>
          </div>

          <div className="relative mb-12">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search for questions..."
              className="h-14 rounded-2xl border-border/50 bg-muted/20 pl-12 text-lg shadow-sm transition-all focus-visible:ring-primary/30"
            />
          </div>

          <div className="space-y-4">
            {filteredFaqs.length > 0 ? (
              <Accordion type="single" collapsible className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <AccordionItem
                    key={`${faq.category}-${index}`}
                    value={`item-${index}`}
                    className="rounded-2xl border border-border/50 bg-background px-6 transition-all duration-300 data-[state=open]:border-primary/50 data-[state=open]:bg-muted/20 data-[state=open]:shadow-lg"
                  >
                    <AccordionTrigger className="w-full py-6 text-left hover:no-underline">
                      <div className="flex flex-col gap-1 text-left">
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary/80">
                          {faq.category}
                        </span>
                        <h3 className="pr-8 text-lg font-bold text-foreground">{faq.question}</h3>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-0 pb-6 pt-0 leading-relaxed text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="rounded-3xl border border-dashed py-20 text-center bg-muted/10">
                <p className="text-muted-foreground">No questions found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

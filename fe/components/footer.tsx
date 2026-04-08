import Link from "next/link"
import { Facebook, Github, Globe, Instagram, Linkedin, Mail, Twitter, Youtube } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-white text-foreground dark:border-white/10 dark:bg-black">
      <div className="container mx-auto px-6 py-16">
        <div className="mb-12 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4" data-aos="fade-up">
            <div className="flex items-center gap-2">
              <div className="flex w-28 items-center justify-center rounded-xl">
                <img src="logo.png" alt="" />
              </div>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground text-pretty">
              Transforming ideas into innovative software solutions. Building the future, one line of code at a time.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Globe className="h-4 w-4" />
              <span>Kigali, Rwanda</span>
            </div>
          </div>

          <div data-aos="fade-up" data-aos-delay="100">
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/services", label: "Services" },
                { href: "/products", label: "Products" },
                { href: "/blog", label: "Blog" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block text-sm text-muted-foreground transition-all duration-300 hover:translate-x-1 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div data-aos="fade-up" data-aos-delay="200">
            <h3 className="mb-4 text-lg font-semibold">Services</h3>
            <ul className="space-y-3">
              {[
                "Custom Software",
                "Web Development",
                "Mobile Apps",
                "AI Solutions",
                "UI/UX Design",
                "Cloud Services",
              ].map((service) => (
                <li key={service}>
                  <span className="inline-block cursor-pointer text-sm text-muted-foreground transition-all duration-300 hover:translate-x-1 hover:text-primary">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div data-aos="fade-up" data-aos-delay="300">
            <h3 className="mb-4 text-lg font-semibold">Connect With Us</h3>
            <p className="mb-4 text-sm text-muted-foreground">Follow us on social media for updates and insights.</p>
            <div className="grid grid-cols-4 gap-3">
              {[
                { icon: Github, href: "#", label: "GitHub" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Youtube, href: "#", label: "YouTube" },
                { icon: Mail, href: "mailto:contact@zenotekk.com", label: "Email" },
                { icon: Globe, href: "#", label: "Website" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="group flex h-12 w-12 items-center justify-center rounded-xl border border-primary/10 bg-primary/5 transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:border-primary hover:bg-primary hover:text-primary-foreground dark:bg-primary/10"
                >
                  <social.icon className="h-5 w-5 text-primary transition-colors group-hover:text-primary-foreground" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          className="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row"
          data-aos="fade-up"
        >
          <p className="text-sm text-muted-foreground">
            © {currentYear} ZENO TEKK. All rights reserved. Built with passion and innovation.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="#" className="text-muted-foreground transition-colors duration-300 hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="#" className="text-muted-foreground transition-colors duration-300 hover:text-primary">
              Terms of Service
            </Link>
            <Link href="#" className="text-muted-foreground transition-colors duration-300 hover:text-primary">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

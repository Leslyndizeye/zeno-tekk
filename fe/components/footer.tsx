import Link from "next/link"
import { Facebook, Globe, Instagram, Linkedin, Mail, Youtube } from "lucide-react"

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-white text-foreground dark:border-white/10 dark:bg-black">
      <div className="container mx-auto px-6 py-16">
        <div className="mb-12 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="col-span-2 space-y-4 lg:col-span-1" data-aos="fade-up">
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

          <div className="col-span-2 lg:col-span-1" data-aos="fade-up" data-aos-delay="300">
            <h3 className="mb-4 text-lg font-semibold">Connect With Us</h3>
            <p className="mb-4 text-sm text-muted-foreground">Follow us on social media for updates and insights.</p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Linkedin,  href: "#",                                                                                      label: "LinkedIn" },
                { icon: XIcon,     href: "https://x.com/Zenotekk",                                                                label: "X" },
                { icon: Facebook,  href: "#",                                                                                      label: "Facebook" },
                { icon: Instagram, href: "https://www.instagram.com/zenotekk/",                                                   label: "Instagram" },
                { icon: Youtube,   href: "https://www.youtube.com/@zenotekk",                                                      label: "YouTube" },
                { icon: Mail,      href: "https://mail.google.com/mail/?view=cm&to=info.zenotekk@gmail.com",                      label: "Email" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target={social.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
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
            <Link href="/privacy-policy" className="text-muted-foreground transition-colors duration-300 hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-muted-foreground transition-colors duration-300 hover:text-primary">
              Terms of Service
            </Link>
            <Link href="/cookie-policy" className="text-muted-foreground transition-colors duration-300 hover:text-primary">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

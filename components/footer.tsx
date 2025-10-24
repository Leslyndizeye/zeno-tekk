import Link from "next/link"
import { Github, Linkedin, Twitter, Mail, Facebook, Instagram, Youtube, Globe } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-4" data-aos="fade-up">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-primary-foreground font-bold text-xl">Z</span>
              </div>
              <span className="font-bold text-xl">ZENO TEKK</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs text-pretty">
              Transforming ideas into innovative software solutions. Building the future, one line of code at a time.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Globe className="w-4 h-4" />
              <span>Kigali, Rwanda</span>
            </div>
          </div>

          {/* Quick Links */}
          <div data-aos="fade-up" data-aos-delay="100">
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
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
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div data-aos="fade-up" data-aos-delay="200">
            <h3 className="font-semibold text-lg mb-4">Services</h3>
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
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 cursor-pointer hover:translate-x-1 inline-block">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div data-aos="fade-up" data-aos-delay="300">
            <h3 className="font-semibold text-lg mb-4">Connect With Us</h3>
            <p className="text-sm text-muted-foreground mb-4">Follow us on social media for updates and insights.</p>
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
                  className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 hover:-translate-y-1 group"
                >
                  <social.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4"
          data-aos="fade-up"
        >
          <p className="text-sm text-muted-foreground">
            © {currentYear} ZENO TEKK. All rights reserved. Built with passion and innovation.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

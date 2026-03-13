'use client'

import Link from 'next/link'
import { Github, Twitter, Mail, ArrowRight } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    tools: [
      { label: 'Developer Tools', href: '/tools?category=developer' },
      { label: 'Text Tools', href: '/tools?category=text' },
      { label: 'Image Tools', href: '/tools?category=image' },
      { label: 'Calculators', href: '/tools?category=calculator' },
    ],
    company: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  }

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Mail, href: '#', label: 'Email' },
  ]

  return (
    <footer className="border-t border-border bg-background">
      <div className="container-premium section-padding">

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">

          {/* Brand */}
          <div className="lg:col-span-2">

            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <ArrowRight className="w-5 h-5" />
              </div>

              <span className="text-lg font-bold text-primary">
                iConvertNow
              </span>
            </Link>

            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
              Premium online tools for file conversion, developers, and everyday utilities.
              Fast, secure, and completely free.
            </p>

            <div className="flex gap-3 mt-6">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    aria-label={link.label}
                    className="p-2 rounded-lg bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>

          </div>

          {/* Tools */}
          <div>
            <h4 className="font-semibold text-foreground mb-6">
              Tools
            </h4>

            <ul className="space-y-3">
              {footerLinks.tools.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-foreground mb-6">
              Company
            </h4>

            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-muted-foreground text-sm">
            © {currentYear} iConvertNow. All rights reserved.
          </p>

          <p className="text-xs text-muted-foreground">
            Built with Next.js & TypeScript
          </p>

        </div>

      </div>
    </footer>
  )
}
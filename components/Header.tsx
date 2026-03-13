'use client'

import Link from 'next/link'
import { ArrowRight, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="container-premium">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <ArrowRight className="w-5 h-5" />
            </div>

            <div className="flex flex-col leading-tight">
              <span className="text-lg md:text-xl font-bold text-primary">
                iConvertNow
              </span>
              <span className="text-xs text-muted-foreground">
                Online Tools
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link
              href="/tools"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Tools
            </Link>

            <Link
              href="/about"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <Button
              asChild
              className="bg-accent text-accent-foreground hover:opacity-90"
            >
              <Link href="/tools" className="flex items-center gap-2">
                Explore Tools
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-border pt-4 pb-4 space-y-3">

            <Link
              href="/tools"
              className="block px-3 py-2 text-muted-foreground hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Tools
            </Link>

            <Link
              href="/about"
              className="block px-3 py-2 text-muted-foreground hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>

            <Link
              href="/contact"
              className="block px-3 py-2 text-muted-foreground hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>

            <Button
              asChild
              className="w-full bg-accent text-accent-foreground mt-3"
            >
              <Link
                href="/tools"
                onClick={() => setMobileMenuOpen(false)}
              >
                Explore Tools
              </Link>
            </Button>

          </nav>
        )}
      </div>
    </header>
  )
}
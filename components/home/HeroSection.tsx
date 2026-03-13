'use client'

import Link from 'next/link'
import { ArrowRight, Sparkles, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden section-padding">

      {/* Subtle background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-24 right-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-24 left-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container-premium">
        <div className="max-w-5xl mx-auto text-center space-y-8">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            Premium Online Tools Platform
          </div>

          {/* Main heading */}
          <div className="space-y-6">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-balance">
              <span className="block">All-in-One Online Tools</span>
              <span>
                <span className="text-primary">for Files, Developers</span>
                {" & "}
                <span className="text-accent">AI</span>
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-balance">
              Convert files, format data, resize images, and simplify your workflow instantly. Fast, secure, and completely free.
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">

            {/* Primary CTA */}
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:opacity-90 w-full sm:w-auto"
            >
              <Link href="/tools" className="flex items-center gap-2">
                Explore Tools
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>

            {/* Secondary CTA */}
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 w-full sm:w-auto"
            >
              <Link href="#features" className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                Learn More
              </Link>
            </Button>

          </div>

          {/* Trust section */}
          <div className="pt-12 border-t border-border">
            <p className="text-sm text-muted-foreground mb-6">
              Trusted by developers, designers, and professionals worldwide
            </p>

            <div className="flex items-center justify-center gap-8 flex-wrap">

              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-primary" />
                  <div className="w-8 h-8 rounded-full bg-accent" />
                  <div className="w-8 h-8 rounded-full bg-primary/60" />
                </div>
                <span className="text-sm font-medium">50K+ Users</span>
              </div>

              <div className="text-sm text-muted-foreground">
                ⭐ 4.9/5 Rating
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
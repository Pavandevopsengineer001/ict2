'use client'

import Link from 'next/link'
import { getFeaturedTools } from '@/data/tools'
import { ToolCard } from '@/components/tools/ToolCard'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function PopularToolsSection() {
  const featuredTools = getFeaturedTools()

  return (
    <section className="section-padding">
      <div className="container-premium">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-balance">
            <span className="gradient-text">Most Popular Tools</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Start with our most-used tools, trusted by thousands of professionals every day
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredTools.slice(0, 8).map((tool) => (
            <ToolCard
              key={tool.id}
              slug={tool.slug}
              name={tool.name}
              description={tool.description}
              icon={tool.icon}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center pt-8">
  <Button
    asChild
    size="lg"
    className="bg-accent text-accent-foreground hover:opacity-90 group"
  >
    <Link href="/tools" className="flex items-center gap-2">
      View All Tools
      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </Link>
  </Button>
</div>
      </div>
    </section>
  )
}

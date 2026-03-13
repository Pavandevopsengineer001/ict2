'use client'

import { useState, useMemo } from 'react'
import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ToolCard } from '@/components/tools/ToolCard'
import { TOOLS, CATEGORIES } from '@/data/tools'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

export default function ToolsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredTools = useMemo(() => {
    return TOOLS.filter(tool => {
      const matchesSearch =
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = !selectedCategory || tool.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-20 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              All Tools
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl">
              Browse our complete collection of 24+ free online tools
            </p>
          </div>
        </section>

        {/* Search & Filter */}
        <section className="sticky top-20 z-40 py-6 bg-background/80 backdrop-blur-lg border-b border-border/50">
          <div className="container mx-auto px-4 space-y-4">
            {/* Search */}
            <div className="relative max-w-2xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background border-border/50 focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  selectedCategory === null
                    ? 'gradient-btn text-white'
                    : 'border border-border/50 text-gray-300 hover:border-primary/50'
                }`}
              >
                All Tools
              </button>
              {CATEGORIES.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    selectedCategory === category.id
                      ? 'gradient-btn text-white'
                      : 'border border-border/50 text-gray-300 hover:border-primary/50'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {filteredTools.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTools.map(tool => (
                  <ToolCard
                    key={tool.id}
                    slug={tool.slug}
                    name={tool.name}
                    description={tool.description}
                    icon={tool.icon}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg">
                  No tools found. Try adjusting your search.
                </p>
              </div>
            )}

            {/* Results Info */}
            <div className="mt-12 text-center text-gray-400">
              <p>
                Showing {filteredTools.length} of {TOOLS.length} tools
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

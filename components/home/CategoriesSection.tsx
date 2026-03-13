'use client'

import Link from 'next/link'
import { Code, Type, Image, Calculator, FileText, Zap } from 'lucide-react'

const categories = [
  {
    id: 'developer',
    name: 'Developer Tools',
    icon: Code,
    description: 'JSON, encoders, validators, regex tester, and more',
    count: '10+ tools',
    gradient: 'from-primary via-primary/50',
  },
  {
    id: 'text',
    name: 'Text Tools',
    icon: Type,
    description: 'Word counter, case converter, diff checker, sorter',
    count: '6+ tools',
    gradient: 'from-secondary via-orange-500',
  },
  {
    id: 'image',
    name: 'Image Tools',
    icon: Image,
    description: 'Resize, crop, convert, optimize images',
    count: '4+ tools',
    gradient: 'from-primary/80 via-secondary/50',
  },
  {
    id: 'calculator',
    name: 'Calculators',
    icon: Calculator,
    description: 'Percentage, age, discount, date calculations',
    count: '4+ tools',
    gradient: 'from-secondary via-orange-400',
  },
  {
    id: 'file',
    name: 'File Tools',
    icon: FileText,
    description: 'Coming soon - PDF, DOCX, ZIP conversions',
    count: 'Coming soon',
    gradient: 'from-primary/60 via-blue-400',
    disabled: true,
  },
  {
    id: 'ai',
    name: 'AI Tools',
    icon: Zap,
    description: 'Coming soon - AI-powered file processing',
    count: 'Coming soon',
    gradient: 'from-secondary/80 via-orange-500',
    disabled: true,
  },
]

export function CategoriesSection() {
  return (
    <section className="section-padding bg-gradient-to-b from-background via-card/20 to-background">
      <div className="container-premium">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-5xl font-bold mb-4 text-balance">
            <span className="gradient-text">All Tools Organized</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Browse our complete collection of tools organized by category. More tools coming soon.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link
                key={category.id}
                href={category.disabled ? '#' : `/tools?category=${category.id}`}
                className={category.disabled ? 'pointer-events-none' : ''}
              >
                <div className={`group relative overflow-hidden card-premium p-8 h-full transition-all duration-300 ${!category.disabled && 'card-hover'}`}>
                  {/* Gradient background overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 -z-10`} />
                  
                  <div className="relative z-10 space-y-4 h-full flex flex-col justify-between">
                    {/* Icon */}
                    <div className={`p-3 w-fit rounded-lg transition-all duration-300 ${
                      category.disabled 
                        ? 'bg-muted/20' 
                        : 'bg-gradient-to-br ' + category.gradient + ' group-hover:shadow-lg group-hover:shadow-primary/30'
                    }`}>
                      <Icon className={`w-7 h-7 ${category.disabled ? 'text-muted-foreground' : 'text-white'}`} />
                    </div>
                    
                    {/* Content */}
                    <div className="space-y-3">
                      <div>
                        <h3 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
                          category.disabled ? 'text-muted-foreground' : 'text-foreground group-hover:text-primary'
                        }`}>
                          {category.name}
                        </h3>
                        <p className={`text-sm leading-relaxed ${
                          category.disabled ? 'text-muted-foreground' : 'text-muted-foreground group-hover:text-foreground/80'
                        }`}>
                          {category.description}
                        </p>
                      </div>
                      
                      {/* Tool count badge */}
                      <div className="pt-2 border-t border-border/50">
                        <span className={`text-xs font-medium ${
                          category.disabled ? 'text-muted-foreground' : 'text-primary group-hover:text-secondary'
                        }`}>
                          {category.count}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

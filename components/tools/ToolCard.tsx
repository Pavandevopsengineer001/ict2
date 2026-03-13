'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import * as Icons from 'lucide-react'

interface ToolCardProps {
  slug: string
  name: string
  description: string
  icon: string
}

export function ToolCard({ slug, name, description, icon }: ToolCardProps) {
  // Get the icon component dynamically
  const IconComponent = (Icons as any)[icon] || Icons.Zap

  return (
    <Link href={`/tools/${slug}`}>
      <div className="group relative overflow-hidden card-premium p-6 h-full transition-all duration-300 cursor-pointer card-hover">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
        
        <div className="relative z-10 space-y-4 h-full flex flex-col justify-between">
          {/* Icon and Arrow */}
          <div className="flex items-start justify-between">
            <div className="p-3 bg-gradient-to-br from-primary/20 to-secondary/10 rounded-lg group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300">
              <IconComponent className="w-6 h-6 text-primary group-hover:text-secondary transition-colors duration-300" />
            </div>
            <div className="p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
              <ArrowRight className="w-5 h-5 text-primary" />
            </div>
          </div>
          
          {/* Content */}
          <div className="space-y-3">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                {name}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                {description}
              </p>
            </div>
          </div>

          {/* Bottom accent */}
          <div className="pt-3 border-t border-border/30">
            <div className="h-1 w-0 bg-gradient-to-r from-primary to-secondary group-hover:w-12 transition-all duration-300" />
          </div>
        </div>
      </div>
    </Link>
  )
}

'use client'

import Link from 'next/link'

export interface RelatedItem {
  slug: string
  title: string
  description: string
  type: 'converter' | 'format' | 'guide'
}

interface RelatedItemsProps {
  items: RelatedItem[]
  title?: string
  maxItems?: number
  className?: string
}

export function RelatedItems({
  items,
  title = 'Related Resources',
  maxItems = 6,
  className = '',
}: RelatedItemsProps) {
  const displayItems = items.slice(0, maxItems)

  if (displayItems.length === 0) {
    return null
  }

  const getHref = (item: RelatedItem): string => {
    switch (item.type) {
      case 'converter':
        return `/convert/${item.slug}`
      case 'format':
        return `/formats/${item.slug}`
      case 'guide':
        return `/guides/${item.slug}`
      default:
        return '#'
    }
  }

  const getBadgeColor = (type: RelatedItem['type']): string => {
    switch (type) {
      case 'converter':
        return 'bg-blue-500/10 text-blue-400'
      case 'format':
        return 'bg-purple-500/10 text-purple-400'
      case 'guide':
        return 'bg-green-500/10 text-green-400'
      default:
        return 'bg-gray-500/10 text-gray-400'
    }
  }

  return (
    <section className={`space-y-4 ${className}`}>
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayItems.map((item) => (
          <Link
            key={`${item.type}-${item.slug}`}
            href={getHref(item)}
            className="group rounded-lg border bg-card p-4 hover:bg-accent transition-colors"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold group-hover:text-primary transition-colors flex-1">
                {item.title}
              </h3>
              <span
                className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${getBadgeColor(item.type)}`}
              >
                {item.type}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

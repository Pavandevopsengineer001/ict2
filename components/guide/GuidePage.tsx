'use client'

import { Guide, getRelatedGuides } from '@/data/guides'
import { getConverterBySlug } from '@/data/converters'
import { getFormatBySlug } from '@/data/formats'
import Link from 'next/link'
import { RelatedItems, RelatedItem } from '@/components/RelatedItems'

interface GuidePageProps {
  guide: Guide
}

export function GuidePage({ guide }: GuidePageProps) {
  const relatedGuides = getRelatedGuides(guide.slug, 3)

  // Build related items from converter and format slugs
  const relatedItems: RelatedItem[] = []

  guide.relatedConverters.forEach((slug) => {
    const converter = getConverterBySlug(slug)
    if (converter) {
      relatedItems.push({
        slug: converter.slug,
        title: `${converter.from.toUpperCase()} to ${converter.to.toUpperCase()}`,
        description: converter.description,
        type: 'converter',
      })
    }
  })

  guide.relatedFormats.forEach((slug) => {
    const format = getFormatBySlug(slug)
    if (format) {
      relatedItems.push({
        slug: format.slug,
        title: `${format.name} Format`,
        description: format.description,
        type: 'format',
      })
    }
  })

  return (
    <article className="space-y-8">
      {/* Header */}
      <header className="space-y-4 border-b pb-8">
        <div className="flex items-center gap-2">
          <span className="inline-block px-3 py-1 rounded-full bg-muted text-sm font-medium capitalize">
            {guide.category.replace('-', ' ')}
          </span>
          <span className="text-sm text-muted-foreground">
            {guide.readTime} min read
          </span>
        </div>
        <h1 className="text-4xl font-bold">{guide.title}</h1>
        <p className="text-lg text-muted-foreground">{guide.description}</p>
      </header>

      {/* Table of Contents */}
      <nav className="rounded-lg border bg-card p-6">
        <h2 className="font-semibold mb-4">Quick Navigation</h2>
        <ul className="space-y-2 text-sm">
          <li>
            <a href="#overview" className="text-primary hover:underline">
              Overview
            </a>
          </li>
          {guide.relatedConverters.length > 0 && (
            <li>
              <a href="#converters" className="text-primary hover:underline">
                Related Converters
              </a>
            </li>
          )}
          {guide.relatedFormats.length > 0 && (
            <li>
              <a href="#formats" className="text-primary hover:underline">
                Relevant Formats
              </a>
            </li>
          )}
          {relatedGuides.length > 0 && (
            <li>
              <a href="#related-guides" className="text-primary hover:underline">
                Related Guides
              </a>
            </li>
          )}
        </ul>
      </nav>

      {/* Main Content */}
      <section id="overview" className="prose prose-invert max-w-none">
        <div
          dangerouslySetInnerHTML={{
            __html: guide.content
              .split('\n')
              .map((line) => {
                // Simple markdown to HTML conversion
                if (line.startsWith('# ')) {
                  return `<h2 className="text-3xl font-bold mt-8 mb-4">${line.substring(2)}</h2>`
                }
                if (line.startsWith('## ')) {
                  return `<h3 className="text-2xl font-semibold mt-6 mb-3">${line.substring(3)}</h3>`
                }
                if (line.startsWith('### ')) {
                  return `<h4 className="text-xl font-semibold mt-4 mb-2">${line.substring(4)}</h4>`
                }
                if (line.startsWith('- ')) {
                  return `<li className="ml-4">${line.substring(2)}</li>`
                }
                if (line.startsWith('✓ ')) {
                  return `<li className="ml-4 text-green-400">${line.substring(2)}</li>`
                }
                if (line === '') {
                  return '<br />'
                }
                return `<p>${line}</p>`
              })
              .join('\n'),
          }}
          className="space-y-4 text-muted-foreground leading-relaxed"
        />
      </section>

      {/* Related Converters */}
      {relatedItems.length > 0 && (
        <div id="converters">
          <RelatedItems
            items={relatedItems}
            title="Tools & Resources Mentioned"
            maxItems={6}
          />
        </div>
      )}

      {/* Related Guides */}
      {relatedGuides.length > 0 && (
        <section id="related-guides" className="space-y-4 border-t pt-8">
          <h2 className="text-2xl font-semibold">Read Next</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedGuides.map((relatedGuide) => (
              <Link
                key={relatedGuide.slug}
                href={`/guides/${relatedGuide.slug}`}
                className="group rounded-lg border bg-card p-4 hover:bg-accent transition-colors"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-2">
                    {relatedGuide.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {relatedGuide.description}
                </p>
                <span className="text-xs text-muted-foreground">
                  {relatedGuide.readTime} min read
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="rounded-lg border bg-gradient-to-r from-primary/10 to-primary/5 p-8 text-center space-y-4">
        <h2 className="text-2xl font-semibold">Ready to Convert Your Images?</h2>
        <p className="text-muted-foreground">
          Use our free online converters to transform your images instantly.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          {guide.relatedConverters.slice(0, 2).map((slug) => {
            const converter = getConverterBySlug(slug)
            if (!converter) return null
            return (
              <Link
                key={slug}
                href={`/convert/${slug}`}
                className="inline-block px-6 py-2 rounded-lg bg-primary hover:bg-primary/90 transition-colors font-medium"
              >
                {converter.from.toUpperCase()} → {converter.to.toUpperCase()}
              </Link>
            )
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-muted-foreground pt-8 border-t">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
      </footer>
    </article>
  )
}

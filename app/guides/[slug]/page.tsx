import type { Metadata } from 'next'
import {
  GUIDES,
  getAllGuideSlugs,
  getGuideBySlug,
} from '@/data/guides'
import {
  generateCanonicalUrl,
  generateBreadcrumbData,
  formatKeywords,
} from '@/lib/seo'
import { GuidePage } from '@/components/guide/GuidePage'

interface GuidePageRouteProps {
  params: Promise<{ slug: string }>
}

/**
 * Generate static parameters for all guides
 */
export async function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({
    slug,
  }))
}

/**
 * Generate dynamic metadata for guide pages
 */
export async function generateMetadata({
  params,
}: GuidePageRouteProps): Promise<Metadata> {
  const { slug } = await params
  const guide = getGuideBySlug(slug)

  if (!guide) {
    return {
      title: 'Guide Not Found',
      description: 'The requested guide page could not be found.',
    }
  }

  const title = `${guide.title} | iConvertNow`
  const description = guide.description
  const canonicalUrl = generateCanonicalUrl(`/guides/${guide.slug}`)

  return {
    title,
    description,
    keywords: formatKeywords(guide.keywords),
    canonical: canonicalUrl,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'article',
      url: canonicalUrl,
      title,
      description,
      siteName: 'iConvertNow',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

/**
 * Guide page component
 */
export default async function GuidePageRoute({ params }: GuidePageRouteProps) {
  const { slug } = await params
  const guide = getGuideBySlug(slug)

  if (!guide) {
    return (
      <div className="container py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Guide Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The guide you're looking for doesn't exist.
          </p>
          <a href="/guides" className="text-primary hover:underline">
            View all guides
          </a>
        </div>
      </div>
    )
  }

  const breadcrumbData = generateBreadcrumbData([
    { name: 'Home', url: 'https://iconvertnow.com' },
    { name: 'Guides', url: 'https://iconvertnow.com/guides' },
    { name: guide.title, url: `https://iconvertnow.com/guides/${guide.slug}` },
  ])

  return (
    <div className="container py-12 max-w-4xl">
      <GuidePage guide={guide} />

      {/* Structured Data - Breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData),
        }}
      />

      {/* Structured Data - Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: guide.title,
            description: guide.description,
            keywords: formatKeywords(guide.keywords),
            url: `https://iconvertnow.com/guides/${guide.slug}`,
            articleBody: guide.content,
            timeRequired: `PT${guide.readTime}M`,
            author: {
              '@type': 'Organization',
              name: 'iConvertNow',
            },
            datePublished: new Date().toISOString(),
            dateModified: new Date().toISOString(),
          }),
        }}
      />
    </div>
  )
}

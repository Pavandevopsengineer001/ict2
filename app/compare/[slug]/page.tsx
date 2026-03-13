import type { Metadata } from 'next'
import {
  COMPARISONS,
  getAllComparisonSlugs,
  getComparisonBySlug,
} from '@/data/comparisons'
import {
  generateCanonicalUrl,
  generateBreadcrumbData,
  formatKeywords,
} from '@/lib/seo'
import { ComparisonPage } from '@/components/comparison/ComparisonPage'

interface ComparisonPageRouteProps {
  params: Promise<{ slug: string }>
}

/**
 * Generate static parameters for all comparisons
 */
export async function generateStaticParams() {
  return getAllComparisonSlugs().map((slug) => ({
    slug,
  }))
}

/**
 * Generate dynamic metadata for comparison pages
 */
export async function generateMetadata({
  params,
}: ComparisonPageRouteProps): Promise<Metadata> {
  const { slug } = await params
  const comparison = getComparisonBySlug(slug)

  if (!comparison) {
    return {
      title: 'Comparison Not Found',
      description: 'The requested comparison page could not be found.',
    }
  }

  const title = `${comparison.title} | iConvertNow`
  const description = comparison.description
  const canonicalUrl = generateCanonicalUrl(`/compare/${comparison.slug}`)

  return {
    title,
    description,
    keywords: [
      `${comparison.format1Name} vs ${comparison.format2Name}`,
      'image format comparison',
      'format comparison',
    ],
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
 * Comparison page component
 */
export default async function ComparisonPageRoute({
  params,
}: ComparisonPageRouteProps) {
  const { slug } = await params
  const comparison = getComparisonBySlug(slug)

  if (!comparison) {
    return (
      <div className="container py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Comparison Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The comparison page you're looking for doesn't exist.
          </p>
          <a href="/compare" className="text-primary hover:underline">
            View all comparisons
          </a>
        </div>
      </div>
    )
  }

  const breadcrumbData = generateBreadcrumbData([
    { name: 'Home', url: 'https://iconvertnow.com' },
    { name: 'Compare', url: 'https://iconvertnow.com/compare' },
    { name: comparison.title, url: `https://iconvertnow.com/compare/${comparison.slug}` },
  ])

  return (
    <div className="container py-12 max-w-5xl">
      <ComparisonPage comparison={comparison} />

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
            headline: comparison.title,
            description: comparison.description,
            url: `https://iconvertnow.com/compare/${comparison.slug}`,
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

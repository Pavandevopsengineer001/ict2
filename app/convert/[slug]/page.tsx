import type { Metadata } from 'next'
import {
  CONVERTERS,
  getConverterBySlug,
} from '@/data/converters'
import {
  generateConverterTitle,
  generateConverterDescription,
  generateConverterKeywords,
  generateCanonicalUrl,
  generateConverterStructuredData,
  formatKeywords,
} from '@/lib/seo'
import { ConverterPage } from '@/components/converter/ConverterPage'

interface ConvertPageProps {
  params: Promise<{ slug: string }>
}

/**
 * Generate static parameters for all converters
 * This enables static pre-rendering of all converter pages at build time
 */
export async function generateStaticParams() {
  return CONVERTERS.map((converter) => ({
    slug: converter.slug,
  }))
}

/**
 * Generate dynamic metadata for each converter page
 */
export async function generateMetadata({
  params,
}: ConvertPageProps): Promise<Metadata> {
  const { slug } = await params
  const converter = getConverterBySlug(slug)

  if (!converter) {
    return {
      title: 'Converter Not Found',
      description: 'The requested converter page could not be found.',
    }
  }

  const title = generateConverterTitle(converter.from, converter.to)
  const description = generateConverterDescription(converter.from, converter.to)
  const keywords = generateConverterKeywords(converter.from, converter.to)
  const canonicalUrl = generateCanonicalUrl(`/convert/${converter.slug}`)

  return {
    title,
    description,
    keywords: formatKeywords(keywords),
    canonical: canonicalUrl,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'website',
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
 * Converter page component
 * Renders a specific converter page with metadata and related converters
 */
export default async function ConvertPage({ params }: ConvertPageProps) {
  const { slug } = await params
  const converter = getConverterBySlug(slug)

  if (!converter) {
    return (
      <div className="container py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Converter Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The converter you're looking for doesn't exist.
          </p>
          <a href="/convert" className="text-primary hover:underline">
            View all converters
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <ConverterPage converter={converter}>
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            Upload a {converter.from.toUpperCase()} file to convert to {converter.to.toUpperCase()}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Converter coming soon - placeholder for tool integration
          </p>
        </div>
      </ConverterPage>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateConverterStructuredData(converter.from, converter.to, converter.slug)
          ),
        }}
      />
    </div>
  )
}

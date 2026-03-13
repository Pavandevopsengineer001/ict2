import type { Metadata } from 'next'
import {
  FORMATS,
  getAllFormatSlugs,
  getFormatBySlug,
} from '@/data/formats'
import {
  generateCanonicalUrl,
  generateFormatStructuredData,
} from '@/lib/seo'
import { FormatPage } from '@/components/format/FormatPage'

interface FormatPageProps {
  params: Promise<{ slug: string }>
}

/**
 * Generate static parameters for all formats
 */
export async function generateStaticParams() {
  return getAllFormatSlugs().map((slug) => ({
    slug,
  }))
}

/**
 * Generate dynamic metadata for format pages
 */
export async function generateMetadata({
  params,
}: FormatPageProps): Promise<Metadata> {
  const { slug } = await params
  const format = getFormatBySlug(slug)

  if (!format) {
    return {
      title: 'Format Not Found',
      description: 'The requested format page could not be found.',
    }
  }

  const title = `What is ${format.name}? (${format.extension}) | iConvertNow`
  const description = format.description
  const canonicalUrl = generateCanonicalUrl(`/formats/${format.slug}`)

  return {
    title,
    description,
    keywords: [
      `${format.name} format`,
      `${format.name.toLowerCase()} file`,
      `what is ${format.name.toLowerCase()}`,
      format.extension,
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
 * Format information page component
 */
export default async function FormatPageRoute({ params }: FormatPageProps) {
  const { slug } = await params
  const format = getFormatBySlug(slug)

  if (!format) {
    return (
      <div className="container py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Format Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The format page you're looking for doesn't exist.
          </p>
          <a href="/formats" className="text-primary hover:underline">
            View all formats
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <FormatPage format={format} />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFormatStructuredData(format.name, format.slug)),
        }}
      />
    </div>
  )
}

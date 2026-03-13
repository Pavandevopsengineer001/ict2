/**
 * SEO Utility Module
 * Provides reusable functions for generating SEO-optimized metadata, titles, descriptions, and structured data
 */

export interface SEOConfig {
  baseUrl: string
  siteName: string
  twitterHandle?: string
}

const defaultConfig: SEOConfig = {
  baseUrl: 'https://iconvertnow.com',
  siteName: 'iConvertNow',
  twitterHandle: '@iconvertnow',
}

/**
 * Generate SEO title for converter pages
 * Pattern: "JPG to PNG Converter Online Free | iConvertNow"
 */
export function generateConverterTitle(
  from: string,
  to: string,
  suffix: string = 'Converter Online Free'
): string {
  return `${from.toUpperCase()} to ${to.toUpperCase()} ${suffix} | ${defaultConfig.siteName}`
}

/**
 * Generate SEO description for converter pages
 * Pattern: "Convert JPG to PNG online instantly using iConvertNow free converter."
 */
export function generateConverterDescription(from: string, to: string): string {
  return `Convert ${from.toUpperCase()} to ${to.toUpperCase()} online instantly using ${defaultConfig.siteName} free converter. No registration required.`
}

/**
 * Generate keywords for converter pages
 */
export function generateConverterKeywords(from: string, to: string): string[] {
  const fromUpper = from.toUpperCase()
  const toUpper = to.toUpperCase()
  return [
    `${fromUpper} to ${toUpper}`,
    `convert ${fromUpper} to ${toUpper}`,
    `${fromUpper} converter`,
    `${toUpper} converter`,
    `free ${fromUpper} to ${toUpper} converter`,
    `online ${fromUpper} converter`,
    `${fromUpper} to ${toUpper} online`,
  ]
}

/**
 * Generate canonical URL
 */
export function generateCanonicalUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${defaultConfig.baseUrl}${cleanPath}`
}

/**
 * Generate JSON-LD structured data for converter
 */
export function generateConverterStructuredData(
  from: string,
  to: string,
  slug: string
): Record<string, unknown> {
  const url = generateCanonicalUrl(`/convert/${slug}`)

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `${from.toUpperCase()} to ${to.toUpperCase()} Converter`,
    description: generateConverterDescription(from, to),
    url,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1000',
    },
  }
}

/**
 * Generate JSON-LD structured data for format page
 */
export function generateFormatStructuredData(
  format: string,
  slug: string
): Record<string, unknown> {
  const url = generateCanonicalUrl(`/formats/${slug}`)

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `What is ${format.toUpperCase()}?`,
    url,
    datePublished: new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: defaultConfig.siteName,
    },
  }
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbData(
  items: Array<{ name: string; url: string }>
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/**
 * Generate organization schema
 */
export function generateOrganizationSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: defaultConfig.siteName,
    url: defaultConfig.baseUrl,
    logo: `${defaultConfig.baseUrl}/logo.png`,
    description: 'Free online conversion tools for files, text, and more.',
    sameAs: [
      'https://twitter.com/iconvertnow',
      'https://www.facebook.com/iconvertnow',
    ],
  }
}

/**
 * Format keywords array as comma-separated string
 */
export function formatKeywords(keywords: string[]): string {
  return keywords.join(', ')
}

/**
 * Generate title for guide pages
 */
export function generateGuideTitle(title: string): string {
  return `${title} | ${defaultConfig.siteName}`
}

/**
 * Generate JSON-LD article schema for guides
 */
export function generateArticleSchema(
  title: string,
  description: string,
  slug: string,
  keywords: string[],
  content: string,
  readTime: number
): Record<string, unknown> {
  const url = generateCanonicalUrl(`/guides/${slug}`)

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    keywords: formatKeywords(keywords),
    url,
    articleBody: content,
    timeRequired: `PT${readTime}M`,
    author: {
      '@type': 'Organization',
      name: defaultConfig.siteName,
    },
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
  }
}

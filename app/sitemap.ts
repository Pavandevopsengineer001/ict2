import { MetadataRoute } from 'next'
import { TOOLS } from '@/data/tools'
import { CONVERTERS } from '@/data/converters'
import { FORMATS } from '@/data/formats'
import { GUIDES } from '@/data/guides'
import { COMPARISONS } from '@/data/comparisons'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://iconvertnow.com'

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/convert`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/formats`,
      lastModified: new Date(),
      changeFrequency: 'quarterly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  const toolPages: MetadataRoute.Sitemap = TOOLS.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const converterPages: MetadataRoute.Sitemap = CONVERTERS.map((converter) => ({
    url: `${baseUrl}/convert/${converter.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  const formatPages: MetadataRoute.Sitemap = FORMATS.map((format) => ({
    url: `${baseUrl}/formats/${format.slug}`,
    lastModified: new Date(),
    changeFrequency: 'quarterly' as const,
    priority: 0.7,
  }))

  const guidePages: MetadataRoute.Sitemap = GUIDES.map((guide) => ({
    url: `${baseUrl}/guides/${guide.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: guide.featured ? 0.8 : 0.75,
  }))

  const comparisonPages: MetadataRoute.Sitemap = COMPARISONS.map((comparison) => ({
    url: `${baseUrl}/compare/${comparison.slug}`,
    lastModified: new Date(),
    changeFrequency: 'quarterly' as const,
    priority: 0.75,
  }))

  return [
    ...staticPages,
    ...toolPages,
    ...converterPages,
    ...formatPages,
    ...guidePages,
    ...comparisonPages,
  ]
}

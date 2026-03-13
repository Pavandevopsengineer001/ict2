/**
 * Image Format Converters Data
 * Defines all available image format converters for programmatic page generation
 */

export interface Converter {
  from: string // source format (e.g., 'jpg')
  to: string // target format (e.g., 'png')
  slug: string // URL slug (e.g., 'jpg-to-png')
  description: string
  keywords: string[]
  toolId?: string // link to existing tool if available
}

export const CONVERTERS: Converter[] = [
  // JPG Converters
  {
    from: 'jpg',
    to: 'png',
    slug: 'jpg-to-png',
    description: 'Convert JPG images to PNG format with lossless quality',
    keywords: ['jpg to png', 'convert jpg', 'png converter', 'image converter'],
  },
  {
    from: 'jpg',
    to: 'webp',
    slug: 'jpg-to-webp',
    description: 'Convert JPG to WebP format for better compression and web optimization',
    keywords: ['jpg to webp', 'webp converter', 'image optimization'],
  },
  {
    from: 'jpg',
    to: 'gif',
    slug: 'jpg-to-gif',
    description: 'Convert JPG images to animated or static GIF format',
    keywords: ['jpg to gif', 'gif converter', 'image converter'],
  },
  {
    from: 'jpg',
    to: 'bmp',
    slug: 'jpg-to-bmp',
    description: 'Convert JPG to BMP bitmap format',
    keywords: ['jpg to bmp', 'bmp converter', 'bitmap format'],
  },
  {
    from: 'jpg',
    to: 'tiff',
    slug: 'jpg-to-tiff',
    description: 'Convert JPG to TIFF format for archival and professional printing',
    keywords: ['jpg to tiff', 'tiff converter', 'professional image'],
  },

  // PNG Converters
  {
    from: 'png',
    to: 'jpg',
    slug: 'png-to-jpg',
    description: 'Convert PNG images to JPG format with adjustable quality',
    keywords: ['png to jpg', 'convert png', 'jpg converter'],
  },
  {
    from: 'png',
    to: 'webp',
    slug: 'png-to-webp',
    description: 'Convert PNG to WebP for improved compression and web performance',
    keywords: ['png to webp', 'webp converter', 'web optimization'],
  },
  {
    from: 'png',
    to: 'gif',
    slug: 'png-to-gif',
    description: 'Convert PNG images to GIF format',
    keywords: ['png to gif', 'gif converter', 'image format'],
  },
  {
    from: 'png',
    to: 'bmp',
    slug: 'png-to-bmp',
    description: 'Convert PNG to BMP bitmap format',
    keywords: ['png to bmp', 'bmp converter'],
  },
  {
    from: 'png',
    to: 'tiff',
    slug: 'png-to-tiff',
    description: 'Convert PNG to TIFF format for professional use',
    keywords: ['png to tiff', 'tiff converter', 'professional'],
  },

  // WebP Converters
  {
    from: 'webp',
    to: 'jpg',
    slug: 'webp-to-jpg',
    description: 'Convert WebP images to JPG format for compatibility',
    keywords: ['webp to jpg', 'jpg converter', 'image conversion'],
  },
  {
    from: 'webp',
    to: 'png',
    slug: 'webp-to-png',
    description: 'Convert WebP to PNG format with transparency support',
    keywords: ['webp to png', 'png converter', 'transparent image'],
  },
  {
    from: 'webp',
    to: 'gif',
    slug: 'webp-to-gif',
    description: 'Convert WebP to GIF format',
    keywords: ['webp to gif', 'gif converter'],
  },

  // GIF Converters
  {
    from: 'gif',
    to: 'jpg',
    slug: 'gif-to-jpg',
    description: 'Convert GIF images to JPG format',
    keywords: ['gif to jpg', 'jpg converter', 'static image'],
  },
  {
    from: 'gif',
    to: 'png',
    slug: 'gif-to-png',
    description: 'Convert GIF to PNG format with preserved transparency',
    keywords: ['gif to png', 'png converter', 'transparent'],
  },
  {
    from: 'gif',
    to: 'webp',
    slug: 'gif-to-webp',
    description: 'Convert GIF to WebP format for modern browsers',
    keywords: ['gif to webp', 'webp converter', 'modern format'],
  },

  // BMP Converters
  {
    from: 'bmp',
    to: 'jpg',
    slug: 'bmp-to-jpg',
    description: 'Convert BMP images to JPG format',
    keywords: ['bmp to jpg', 'jpg converter'],
  },
  {
    from: 'bmp',
    to: 'png',
    slug: 'bmp-to-png',
    description: 'Convert BMP to PNG format',
    keywords: ['bmp to png', 'png converter'],
  },
  {
    from: 'bmp',
    to: 'webp',
    slug: 'bmp-to-webp',
    description: 'Convert BMP to WebP format',
    keywords: ['bmp to webp', 'webp converter'],
  },

  // TIFF Converters
  {
    from: 'tiff',
    to: 'jpg',
    slug: 'tiff-to-jpg',
    description: 'Convert TIFF images to JPG format',
    keywords: ['tiff to jpg', 'jpg converter', 'image conversion'],
  },
  {
    from: 'tiff',
    to: 'png',
    slug: 'tiff-to-png',
    description: 'Convert TIFF to PNG format',
    keywords: ['tiff to png', 'png converter'],
  },
  {
    from: 'tiff',
    to: 'webp',
    slug: 'tiff-to-webp',
    description: 'Convert TIFF to WebP format',
    keywords: ['tiff to webp', 'webp converter'],
  },

  // SVG Converters
  {
    from: 'svg',
    to: 'png',
    slug: 'svg-to-png',
    description: 'Convert SVG vector graphics to PNG raster format',
    keywords: ['svg to png', 'vector to raster', 'png converter'],
  },
  {
    from: 'svg',
    to: 'jpg',
    slug: 'svg-to-jpg',
    description: 'Convert SVG graphics to JPG format',
    keywords: ['svg to jpg', 'jpg converter'],
  },
  {
    from: 'svg',
    to: 'webp',
    slug: 'svg-to-webp',
    description: 'Convert SVG to WebP format',
    keywords: ['svg to webp', 'webp converter'],
  },
]

/**
 * Get converter by slug
 */
export function getConverterBySlug(slug: string): Converter | undefined {
  return CONVERTERS.find((converter) => converter.slug === slug)
}

/**
 * Get all converters from a specific format
 */
export function getConvertersFrom(format: string): Converter[] {
  return CONVERTERS.filter((converter) => converter.from.toLowerCase() === format.toLowerCase())
}

/**
 * Get all converters to a specific format
 */
export function getConvertersTo(format: string): Converter[] {
  return CONVERTERS.filter((converter) => converter.to.toLowerCase() === format.toLowerCase())
}

/**
 * Get related converters (same source or target format)
 */
export function getRelatedConverters(slug: string, limit: number = 5): Converter[] {
  const converter = getConverterBySlug(slug)
  if (!converter) return []

  const related = CONVERTERS.filter(
    (c) =>
      c.slug !== slug &&
      (c.from === converter.from || c.to === converter.to)
  )

  return related.slice(0, limit)
}

/**
 * Get all unique formats from converters
 */
export function getAllFormats(): string[] {
  const formats = new Set<string>()
  CONVERTERS.forEach((converter) => {
    formats.add(converter.from.toUpperCase())
    formats.add(converter.to.toUpperCase())
  })
  return Array.from(formats).sort()
}

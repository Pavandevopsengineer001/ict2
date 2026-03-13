/**
 * Format Comparison Pages Data
 * Side-by-side comparisons between formats for better decision making
 */

export interface ComparisonItem {
  label: string
  value1: string | number
  value2: string | number
}

export interface Comparison {
  slug: string
  title: string
  description: string
  format1: string // format slug
  format2: string // format slug
  format1Name: string
  format2Name: string
  comparisonTable: ComparisonItem[]
  useCase1: string
  useCase2: string
  recommendation: string
  relatedConverters: string[] // converter slugs
}

export const COMPARISONS: Comparison[] = [
  {
    slug: 'png-vs-jpg',
    title: 'PNG vs JPG: Complete Comparison',
    description: 'Understand the key differences between PNG and JPG formats to choose the right one for your images.',
    format1: 'png',
    format2: 'jpg',
    format1Name: 'PNG',
    format2Name: 'JPG',
    comparisonTable: [
      {
        label: 'Compression Type',
        value1: 'Lossless',
        value2: 'Lossy',
      },
      {
        label: 'File Size',
        value1: 'Larger (smaller than BMP)',
        value2: 'Smallest (compressed)',
      },
      {
        label: 'Transparency Support',
        value1: 'Yes (full alpha)',
        value2: 'No',
      },
      {
        label: 'Quality Loss',
        value1: 'None',
        value2: 'Yes (adjustable)',
      },
      {
        label: 'Best For',
        value1: 'Graphics, logos, text',
        value2: 'Photographs',
      },
      {
        label: 'Web Compatibility',
        value1: 'Universal',
        value2: 'Universal',
      },
      {
        label: 'Color Support',
        value1: '16 million colors',
        value2: '16 million colors',
      },
      {
        label: 'Animation Support',
        value1: 'No (use APNG)',
        value2: 'No',
      },
    ],
    useCase1: 'Perfect for web graphics, logos, and images requiring transparency',
    useCase2: 'Ideal for photographs and when file size is critical',
    recommendation:
      'Use PNG for graphics with transparency or sharp edges. Use JPG for photographs and when minimizing file size is important.',
    relatedConverters: ['png-to-jpg', 'jpg-to-png'],
  },

  {
    slug: 'webp-vs-jpg',
    title: 'WebP vs JPG: Modern Image Format Battle',
    description: 'Compare WebP and JPG to understand why WebP is the future of web images.',
    format1: 'webp',
    format2: 'jpg',
    format1Name: 'WebP',
    format2Name: 'JPG',
    comparisonTable: [
      {
        label: 'Compression Efficiency',
        value1: '25-35% smaller than JPG',
        value2: 'Standard lossy',
      },
      {
        label: 'File Size',
        value1: 'Smallest',
        value2: 'Large',
      },
      {
        label: 'Quality',
        value1: 'Excellent at small sizes',
        value2: 'Good with quality loss',
      },
      {
        label: 'Browser Support',
        value1: 'Modern browsers',
        value2: 'Universal',
      },
      {
        label: 'Transparency',
        value1: 'Yes',
        value2: 'No',
      },
      {
        label: 'Animation',
        value1: 'Yes',
        value2: 'No',
      },
      {
        label: 'Web Performance',
        value1: 'Excellent',
        value2: 'Good',
      },
      {
        label: 'Fallback Needed',
        value1: 'Yes (use JPG)',
        value2: 'No',
      },
    ],
    useCase1: 'Modern websites prioritizing performance and file size',
    useCase2: 'Universal compatibility or legacy systems',
    recommendation:
      'Use WebP with JPG fallbacks for modern websites. JPG for maximum compatibility or systems that must support older browsers.',
    relatedConverters: ['jpg-to-webp', 'webp-to-jpg'],
  },

  {
    slug: 'webp-vs-png',
    title: 'WebP vs PNG: Format Efficiency Comparison',
    description: 'Compare WebP and PNG to decide which format is best for your web graphics.',
    format1: 'webp',
    format2: 'png',
    format1Name: 'WebP',
    format2Name: 'PNG',
    comparisonTable: [
      {
        label: 'Compression Type',
        value1: 'Lossy & Lossless',
        value2: 'Lossless only',
      },
      {
        label: 'File Size',
        value1: 'Very small',
        value2: 'Medium',
      },
      {
        label: 'Transparency',
        value1: 'Yes',
        value2: 'Yes (better)',
      },
      {
        label: 'Quality Loss',
        value1: 'Adjustable',
        value2: 'None',
      },
      {
        label: 'Browser Support',
        value1: 'Modern (95%+)',
        value2: 'Universal (100%)',
      },
      {
        label: 'Animation',
        value1: 'Yes',
        value2: 'No (use APNG)',
      },
      {
        label: 'Best For',
        value1: 'Modern web graphics',
        value2: 'Perfect quality needed',
      },
      {
        label: 'Fallback',
        value1: 'Required',
        value2: 'Not needed',
      },
    ],
    useCase1: 'Performance-critical modern websites and web applications',
    useCase2: 'When quality loss is unacceptable or broad compatibility needed',
    recommendation:
      'Use WebP for modern projects with fallbacks to PNG. PNG when universal compatibility and perfect quality are required.',
    relatedConverters: ['webp-to-png', 'png-to-webp'],
  },

  {
    slug: 'jpg-vs-gif',
    title: 'JPG vs GIF: Raster Image Format Comparison',
    description: 'Understand when to use JPG vs GIF for different types of images.',
    format1: 'jpg',
    format2: 'gif',
    format1Name: 'JPG',
    format2Name: 'GIF',
    comparisonTable: [
      {
        label: 'Compression',
        value1: 'Lossy compression',
        value2: 'Lossless compression',
      },
      {
        label: 'File Size',
        value1: 'Small',
        value2: 'Medium (larger for animations)',
      },
      {
        label: 'Colors Supported',
        value1: '16 million',
        value2: 'Up to 256',
      },
      {
        label: 'Transparency',
        value1: 'No',
        value2: 'Yes (1-bit)',
      },
      {
        label: 'Animation',
        value1: 'No',
        value2: 'Yes',
      },
      {
        label: 'Quality',
        value1: 'Excellent for photos',
        value2: 'Poor for photos',
      },
      {
        label: 'Best For',
        value1: 'Photographs',
        value2: 'Animations & simple graphics',
      },
      {
        label: 'Browser Support',
        value1: 'Universal',
        value2: 'Universal',
      },
    ],
    useCase1: 'Photographs, complex images with many colors',
    useCase2: 'Animated images, simple graphics, memes',
    recommendation:
      'Use JPG for photographs. Use GIF for animations or simple graphics. Consider WebP for modern animated graphics.',
    relatedConverters: ['jpg-to-gif', 'gif-to-jpg'],
  },

  {
    slug: 'png-vs-gif',
    title: 'PNG vs GIF: Graphic Format Showdown',
    description: 'Compare PNG and GIF to choose the best format for web graphics.',
    format1: 'png',
    format2: 'gif',
    format1Name: 'PNG',
    format2Name: 'GIF',
    comparisonTable: [
      {
        label: 'Compression',
        value1: 'Lossless',
        value2: 'Lossless',
      },
      {
        label: 'File Size',
        value1: 'Medium',
        value2: 'Small (for simple images)',
      },
      {
        label: 'Colors',
        value1: '16 million',
        value2: 'Up to 256',
      },
      {
        label: 'Transparency',
        value1: 'Full alpha channel',
        value2: '1-bit (on/off)',
      },
      {
        label: 'Animation',
        value1: 'No (APNG exists)',
        value2: 'Yes',
      },
      {
        label: 'Edge Quality',
        value1: 'Excellent',
        value2: 'Good',
      },
      {
        label: 'Best For',
        value1: 'Modern web graphics',
        value2: 'Animated GIFs',
      },
      {
        label: 'Compatibility',
        value1: 'Universal',
        value2: 'Universal',
      },
    ],
    useCase1: 'Logos, screenshots, and graphics with transparency',
    useCase2: 'Animated images and internet culture content',
    recommendation:
      'Use PNG for static graphics with transparency. GIF for animations. Consider WebP/APNG for modern animation needs.',
    relatedConverters: ['png-to-gif', 'gif-to-png'],
  },

  {
    slug: 'svg-vs-png',
    title: 'SVG vs PNG: Vector vs Raster',
    description: 'Understand the fundamental differences between vector (SVG) and raster (PNG) formats.',
    format1: 'svg',
    format2: 'png',
    format1Name: 'SVG',
    format2Name: 'PNG',
    comparisonTable: [
      {
        label: 'Image Type',
        value1: 'Vector (scalable)',
        value2: 'Raster (fixed)',
      },
      {
        label: 'Scaling',
        value1: 'Unlimited without loss',
        value2: 'Pixelates when enlarged',
      },
      {
        label: 'File Size',
        value1: 'Very small (for simple graphics)',
        value2: 'Medium',
      },
      {
        label: 'Best For',
        value1: 'Logos, icons, illustrations',
        value2: 'Photographs, screenshots',
      },
      {
        label: 'Editability',
        value1: 'Yes (XML-based)',
        value2: 'No (raster)',
      },
      {
        label: 'Animation',
        value1: 'Yes (CSS/JS)',
        value2: 'No',
      },
      {
        label: 'Browser Support',
        value1: 'Excellent',
        value2: 'Universal',
      },
      {
        label: 'Text Selectable',
        value1: 'Yes',
        value2: 'No',
      },
    ],
    useCase1: 'Logos, responsive graphics, scalable illustrations',
    useCase2: 'Photographs, complex raster images',
    recommendation:
      'Use SVG for logos and icons to ensure crisp display at any size. PNG for photographs and when raster is necessary.',
    relatedConverters: ['svg-to-png', 'png-to-jpg'],
  },
]

/**
 * Get comparison by slug
 */
export function getComparisonBySlug(slug: string): Comparison | undefined {
  return COMPARISONS.find((comparison) => comparison.slug === slug)
}

/**
 * Get all comparison slugs for static generation
 */
export function getAllComparisonSlugs(): string[] {
  return COMPARISONS.map((comparison) => comparison.slug)
}

/**
 * Get comparisons involving a specific format
 */
export function getComparisonsForFormat(formatSlug: string): Comparison[] {
  return COMPARISONS.filter(
    (comparison) =>
      comparison.format1 === formatSlug || comparison.format2 === formatSlug
  )
}

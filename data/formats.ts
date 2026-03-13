/**
 * Image Format Information Pages Data
 * Defines all image formats with detailed information for educational pages
 */

export interface Format {
  name: string // format name (e.g., 'PNG')
  slug: string // URL slug (e.g., 'png')
  extension: string // file extension (e.g., '.png')
  mimeType: string // MIME type (e.g., 'image/png')
  description: string // short description
  fullDescription: string // detailed description for the page
  compression: 'lossless' | 'lossy' | 'none'
  useCases: string[] // common use cases
  pros: string[] // advantages
  cons: string[] // disadvantages
  bestFor: string // best for use case summary
}

export const FORMATS: Format[] = [
  {
    name: 'PNG',
    slug: 'png',
    extension: '.png',
    mimeType: 'image/png',
    description: 'Portable Network Graphics - Lossless image format with transparency support',
    fullDescription:
      'PNG (Portable Network Graphics) is a lossless image format that was created to improve upon and replace the older GIF format. It supports lossless compression, which means no image data is lost during compression. PNG is ideal for images that require transparency and is commonly used for web graphics, logos, and screenshots.',
    compression: 'lossless',
    useCases: [
      'Web graphics',
      'Logos and icons',
      'Screenshots',
      'Transparent images',
      'Detailed graphics',
      'Infographics',
    ],
    pros: [
      'Lossless compression preserves quality',
      'Supports full transparency (alpha channel)',
      'Better for images with text or sharp edges',
      'No quality loss when resaving',
      'Widely supported across all platforms',
    ],
    cons: [
      'Larger file sizes compared to JPG',
      'Not ideal for photographs',
      'Can be slower to load on websites',
    ],
    bestFor: 'Web graphics, logos, screenshots, and any image requiring transparency',
  },

  {
    name: 'JPG',
    slug: 'jpg',
    extension: '.jpg',
    mimeType: 'image/jpeg',
    description: 'Joint Photographic Experts Group - Lossy image format optimized for photographs',
    fullDescription:
      'JPG (JPEG) is a lossy image format developed by the Joint Photographic Experts Group. It uses lossy compression, which reduces file size by removing some image data that is less noticeable to the human eye. JPG is ideal for photographs and is the standard format for digital cameras and online images.',
    compression: 'lossy',
    useCases: [
      'Photographs',
      'Web images',
      'Digital camera photos',
      'Social media images',
      'Complex images with many colors',
      'Background images',
    ],
    pros: [
      'Excellent compression ratio',
      'Smaller file sizes ideal for web',
      'Excellent for photographs',
      'Widely supported across all devices',
      'Adjustable quality settings',
    ],
    cons: [
      'Lossy compression loses some quality',
      'Not suitable for graphics with text',
      'No transparency support',
      'Quality degrades with each save',
    ],
    bestFor: 'Photographs, web images, and any image where file size matters more than perfect quality',
  },

  {
    name: 'WebP',
    slug: 'webp',
    extension: '.webp',
    mimeType: 'image/webp',
    description: 'Modern image format by Google offering superior compression for web',
    fullDescription:
      'WebP is a modern image format developed by Google that provides superior lossless and lossy compression compared to PNG and JPG. It offers better compression while maintaining quality, making it ideal for web optimization. WebP is supported by all modern browsers and can reduce image file sizes by 25-35% compared to JPG.',
    compression: 'lossless',
    useCases: [
      'Web optimization',
      'Modern websites',
      'Responsive images',
      'E-commerce product images',
      'Social media',
      'Performance optimization',
    ],
    pros: [
      'Superior compression (25-35% smaller than JPG)',
      'Supports both lossless and lossy compression',
      'Better quality at smaller file sizes',
      'Supports transparency like PNG',
      'Faster page loads',
    ],
    cons: [
      'Limited support in older browsers',
      'Not supported by Internet Explorer',
      'Requires fallback formats for compatibility',
      'Less widely used than JPG/PNG',
    ],
    bestFor: 'Modern web applications where performance and file size optimization are priorities',
  },

  {
    name: 'GIF',
    slug: 'gif',
    extension: '.gif',
    mimeType: 'image/gif',
    description: 'Graphics Interchange Format - Supports animation and limited color palette',
    fullDescription:
      'GIF (Graphics Interchange Format) is a bitmap image format that supports animation and a limited color palette (up to 256 colors). While GIF can store multiple images as frames, making it suitable for animations, it is less efficient than modern alternatives like WebP or APNG for animation.',
    compression: 'lossless',
    useCases: [
      'Animated images',
      'Simple graphics',
      'Web animations',
      'Memes and internet culture',
      'Low-color images',
      'Transparent graphics',
    ],
    pros: [
      'Supports animation',
      'Supports transparency',
      'Excellent for simple graphics',
      'Universal browser support',
      'Small file sizes for simple images',
    ],
    cons: [
      'Limited to 256 colors',
      'Not ideal for photographs',
      'Larger animation files than video',
      'Outdated format',
    ],
    bestFor: 'Animated graphics and simple web images where universal compatibility is needed',
  },

  {
    name: 'BMP',
    slug: 'bmp',
    extension: '.bmp',
    mimeType: 'image/bmp',
    description: 'Bitmap Image Format - Uncompressed or minimally compressed image format',
    fullDescription:
      'BMP (Bitmap) is an image format that stores images in an uncompressed or minimally compressed format. While BMP preserves image quality perfectly, it results in very large file sizes, making it impractical for web use. BMP is primarily used in Windows operating systems and legacy applications.',
    compression: 'none',
    useCases: [
      'Windows system images',
      'Legacy applications',
      'Uncompressed storage',
      'Professional image archival',
    ],
    pros: [
      'Uncompressed, perfect quality',
      'No quality loss',
      'Simple format',
      'Native Windows support',
    ],
    cons: [
      'Very large file sizes',
      'Not suitable for web',
      'Poor compression',
      'Outdated format',
    ],
    bestFor: 'System files and legacy applications; not recommended for general use',
  },

  {
    name: 'TIFF',
    slug: 'tiff',
    extension: '.tiff',
    mimeType: 'image/tiff',
    description: 'Tagged Image File Format - Professional format for archival and printing',
    fullDescription:
      'TIFF (Tagged Image File Format) is a flexible image format commonly used in professional photography, printing, and document archival. TIFF supports both lossless and lossy compression and can store multiple images in one file, making it ideal for high-quality image storage and archival.',
    compression: 'lossless',
    useCases: [
      'Professional photography',
      'Document scanning',
      'Printing industry',
      'Medical imaging',
      'Archival storage',
      'Multi-page documents',
    ],
    pros: [
      'High quality lossless compression',
      'Supports multiple images per file',
      'Industry standard for printing',
      'Excellent for archival',
      'Supports various color depths',
    ],
    cons: [
      'Very large file sizes',
      'Poor web support',
      'Not ideal for online sharing',
      'Limited device support',
    ],
    bestFor: 'Professional photography, printing, document archival, and professional workflows',
  },

  {
    name: 'SVG',
    slug: 'svg',
    extension: '.svg',
    mimeType: 'image/svg+xml',
    description: 'Scalable Vector Graphics - Resolution-independent vector format',
    fullDescription:
      'SVG (Scalable Vector Graphics) is a vector image format that uses XML to define graphics. Unlike raster formats, SVG images can be scaled to any size without quality loss. SVG is ideal for logos, icons, and illustrations and is the standard for scalable web graphics.',
    compression: 'none',
    useCases: [
      'Logos and icons',
      'Illustrations',
      'Responsive web graphics',
      'Interactive graphics',
      'Data visualizations',
      'Animations',
    ],
    pros: [
      'Scalable to any size without quality loss',
      'Tiny file sizes for vector graphics',
      'Text remains selectable and searchable',
      'Can be animated with CSS/JavaScript',
      'Resolution-independent',
    ],
    cons: [
      'Not ideal for photographs',
      'Can be complex for detailed images',
      'Requires conversion for raster use',
      'Animation files can become large',
    ],
    bestFor: 'Logos, icons, illustrations, and any scalable web graphics',
  },

  {
    name: 'HEIC',
    slug: 'heic',
    extension: '.heic',
    mimeType: 'image/heic',
    description: 'High Efficiency Image Container - Apple format with advanced compression',
    fullDescription:
      'HEIC (High Efficiency Image Container) is a modern image format developed by Apple using HEVC compression. HEIC offers superior compression compared to JPG with better quality at smaller file sizes. It is the default format for photos on newer iPhones and is increasingly supported across devices.',
    compression: 'lossy',
    useCases: [
      'iPhone photos',
      'Apple devices',
      'Modern mobile photography',
      'Cloud storage optimization',
      'High-quality image storage',
    ],
    pros: [
      'Superior compression (better than JPG)',
      'Excellent quality at small file sizes',
      'Supports transparency and animation',
      'Default on Apple devices',
      'Modern codec',
    ],
    cons: [
      'Limited support outside Apple ecosystem',
      'Requires conversion for wide compatibility',
      'Browser support is limited',
      'Incompatible with many applications',
    ],
    bestFor: 'Apple device users seeking modern compression; requires conversion for web use',
  },

  {
    name: 'AVIF',
    slug: 'avif',
    extension: '.avif',
    mimeType: 'image/avif',
    description: 'AV1 Image File Format - Next-generation codec for extreme compression',
    fullDescription:
      'AVIF (AV1 Image File Format) is a next-generation image format based on the AV1 video codec. It provides significantly better compression than WebP and JPG while maintaining excellent quality. AVIF is gaining support in modern browsers and represents the future of web image formats.',
    compression: 'lossy',
    useCases: [
      'Modern web applications',
      'High-compression images',
      'Web performance optimization',
      'Next-generation web design',
      'Content delivery networks',
    ],
    pros: [
      'Superior compression (better than WebP)',
      'Excellent quality at tiny file sizes',
      'Next-generation standard',
      'Growing browser support',
      'Ideal for performance optimization',
    ],
    cons: [
      'Limited browser support',
      'Slower encoding/decoding',
      'Requires fallback formats',
      'Still developing',
    ],
    bestFor: 'Performance-critical modern web applications with supported browser targeting',
  },
]

/**
 * Get format by slug
 */
export function getFormatBySlug(slug: string): Format | undefined {
  return FORMATS.find((format) => format.slug === slug.toLowerCase())
}

/**
 * Get all format slugs for static generation
 */
export function getAllFormatSlugs(): string[] {
  return FORMATS.map((format) => format.slug)
}

/**
 * Get all compression types
 */
export function getFormatsByCompression(
  compression: 'lossless' | 'lossy' | 'none'
): Format[] {
  return FORMATS.filter((format) => format.compression === compression)
}

/**
 * Get related formats by use case
 */
export function getRelatedFormats(slug: string, limit: number = 4): Format[] {
  const format = getFormatBySlug(slug)
  if (!format) return []

  const related = FORMATS.filter((f) => {
    if (f.slug === slug) return false
    // Find formats with overlapping use cases
    const overlap = f.useCases.filter((useCase) =>
      format.useCases.includes(useCase)
    )
    return overlap.length > 0
  })

  return related.slice(0, limit)
}

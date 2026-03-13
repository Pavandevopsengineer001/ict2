/**
 * Educational Guides Data
 * Long-form content pages for tutorials and educational content
 */

export interface Guide {
  slug: string // URL slug
  title: string
  description: string
  category: 'how-to' | 'tutorial' | 'comparison' | 'best-practices'
  content: string // markdown or HTML content
  relatedConverters: string[] // converter slugs
  relatedFormats: string[] // format slugs
  keywords: string[]
  readTime: number // estimated read time in minutes
  featured?: boolean
}

export const GUIDES: Guide[] = [
  {
    slug: 'how-to-convert-png-to-jpg',
    title: 'How to Convert PNG to JPG',
    description:
      'Learn how to convert PNG images to JPG format with our step-by-step guide. Perfect for reducing file size while maintaining quality.',
    category: 'how-to',
    content: `# How to Convert PNG to JPG

Converting PNG images to JPG format is a common task when you need to reduce file size while maintaining reasonable image quality. This guide walks you through the process.

## Why Convert PNG to JPG?

PNG files are lossless and support transparency, making them larger than JPG files. JPG uses lossy compression, which means:
- Significantly smaller file sizes (often 80-90% reduction)
- Faster loading on websites
- Better for photographs and complex images
- Ideal for web optimization

However, JPG doesn't support transparency and loses some quality during compression.

## When to Use Each Format

**Use PNG when:**
- You need transparency
- Dealing with graphics, logos, or text
- Quality loss is unacceptable
- Working with web graphics

**Use JPG when:**
- Dealing with photographs
- File size matters (web, email)
- Transparency isn't needed
- You want faster loading times

## How to Convert PNG to JPG

### Using iConvertNow
1. Visit our PNG to JPG converter
2. Upload your PNG file
3. Select quality level (recommended: 85-95%)
4. Click Convert
5. Download your JPG file

### Best Practices

- **Test different quality levels** - Start at 90% quality and adjust based on results
- **Batch convert** - Use command-line tools for multiple files
- **Keep originals** - Always maintain your original PNG files
- **Check results** - Verify the JPG quality before deleting the PNG

### Quality Settings

- 95-100%: Highest quality, larger files
- 85-94%: Good quality, reasonable file size (recommended)
- 75-84%: Lower quality, smaller files
- Below 75%: Very low quality, very small files

## Troubleshooting

**Image looks blurry after conversion?**
- Try increasing the quality percentage
- Ensure you're not converting from an already-compressed image

**File size barely reduced?**
- The image may already be optimized
- Try a lower quality setting
- Check if the original PNG is using a limited color palette

**Lost transparency after conversion?**
- JPG doesn't support transparency
- Consider keeping as PNG or add a white/solid background
- Use a tool to fill transparent areas with a background color

## Conclusion

Converting PNG to JPG is straightforward and can significantly reduce file sizes. Use our free converter to easily transform your images today.`,
    relatedConverters: ['png-to-jpg', 'png-to-webp'],
    relatedFormats: ['png', 'jpg'],
    keywords: [
      'convert png to jpg',
      'png to jpg',
      'image conversion',
      'file format',
      'reduce file size',
    ],
    readTime: 4,
    featured: true,
  },

  {
    slug: 'image-optimization-guide',
    title: 'Complete Image Optimization Guide',
    description: 'Master image optimization techniques to improve website performance and reduce bandwidth costs.',
    category: 'best-practices',
    content: `# Complete Image Optimization Guide

Images are often the largest assets on websites. Optimizing them is crucial for performance, SEO, and user experience.

## Image Optimization Checklist

### 1. Choose the Right Format

- **PNG**: Logos, graphics, transparency needed
- **JPG**: Photographs, complex images
- **WebP**: Modern websites, best compression
- **SVG**: Icons, illustrations, scalability needed

### 2. Reduce File Size

- Compress without visible quality loss
- Remove unnecessary metadata
- Use progressive loading
- Implement responsive images

### 3. Responsive Images

\`\`\`html
<picture>
  <source srcset="image.webp" type="image/webp">
  <source srcset="image.jpg" type="image/jpeg">
  <img src="image.jpg" alt="Description">
</picture>
\`\`\`

### 4. Lazy Loading

\`\`\`html
<img src="image.jpg" loading="lazy" alt="Description">
\`\`\`

### 5. CDN Delivery

- Serve images from a CDN
- Use dynamic image optimization
- Enable compression headers

## Tools for Optimization

- **iConvertNow**: Format conversion
- **ImageOptim**: Batch compression
- **TinyPNG**: Intelligent compression
- **WebP Converters**: Modern format conversion

## Performance Impact

Optimized images can:
- Reduce page load time by 50%+
- Improve Core Web Vitals
- Increase conversion rates
- Reduce server bandwidth by 80%+

## Conclusion

Image optimization is essential for modern web development. Follow these guidelines to ensure your website loads fast and looks great.`,
    relatedConverters: ['png-to-webp', 'jpg-to-webp'],
    relatedFormats: ['png', 'jpg', 'webp'],
    keywords: [
      'image optimization',
      'web performance',
      'image compression',
      'file size reduction',
    ],
    readTime: 6,
    featured: true,
  },

  {
    slug: 'png-vs-jpg-comparison',
    title: 'PNG vs JPG: Complete Comparison',
    description: 'Understand the differences between PNG and JPG formats. Learn which to use for different situations.',
    category: 'comparison',
    content: `# PNG vs JPG: Complete Comparison

PNG and JPG are the two most common image formats on the web. Understanding their differences helps you choose the right format for your needs.

## Quick Comparison

| Feature | PNG | JPG |
|---------|-----|-----|
| Compression | Lossless | Lossy |
| File Size | Larger | Smaller |
| Transparency | Yes | No |
| Quality | Perfect | Adjustable |
| Best For | Graphics | Photos |
| Browser Support | Universal | Universal |

## PNG (Portable Network Graphics)

### Advantages
- Lossless compression preserves quality
- Supports transparency and alpha channels
- Perfect for text and sharp edges
- No quality degradation on re-saving

### Disadvantages
- Larger file sizes
- Not ideal for photographs
- Slower loading on slow connections
- Can be processor intensive

### Best For
- Logos and branding
- Screenshots
- Graphics with text
- Images requiring transparency
- Web design elements

## JPG (Joint Photographic Experts Group)

### Advantages
- Excellent compression (small files)
- Perfect for photographs
- Adjustable quality settings
- Faster page loads
- Wide camera support

### Disadvantages
- Lossy compression loses details
- No transparency support
- Quality degrades with editing
- Not suitable for graphics with text

### Best For
- Photographs and artwork
- Complex images with many colors
- Reducing bandwidth costs
- Web images where file size matters
- Digital camera photos

## Decision Tree

**Do you need transparency?** → Yes → Use PNG
**Is it a photograph?** → Yes → Use JPG
**Does file size matter?** → Yes → Use JPG/WebP
**Is it a logo or graphic?** → Yes → Use PNG
**Modern website?** → Yes → Consider WebP

## Conversion Tips

- Start with higher quality settings
- Always keep originals
- Test the results before publishing
- Consider WebP for even better compression

## Conclusion

Both PNG and JPG have their place in web development. Use PNG for graphics and JPG for photographs to get the best results.`,
    relatedConverters: ['png-to-jpg', 'jpg-to-png'],
    relatedFormats: ['png', 'jpg', 'webp'],
    keywords: [
      'png vs jpg',
      'image format comparison',
      'file format',
      'when to use png',
      'when to use jpg',
    ],
    readTime: 5,
    featured: true,
  },

  {
    slug: 'webp-advantages-guide',
    title: 'WebP: The Future of Web Images',
    description:
      'Discover why WebP is the best modern image format for web performance and how to implement it.',
    category: 'best-practices',
    content: `# WebP: The Future of Web Images

WebP is a modern image format developed by Google that offers superior compression compared to PNG and JPG. It's the best choice for performance-focused websites.

## Why WebP?

### Superior Compression
- 25-35% smaller than JPG
- Better quality at smaller file sizes
- Equivalent to 2x the compression of PNG

### Modern Standards
- Developed by Google
- Supported by all modern browsers
- Part of next-gen image optimization

### Web Performance
- Faster page loads
- Reduced bandwidth costs
- Better Core Web Vitals scores

## WebP Advantages

✓ 25-35% smaller files than JPG
✓ Better compression than PNG
✓ Supports both lossy and lossless compression
✓ Supports transparency like PNG
✓ Supports animation
✓ Growing browser support

## Implementation Strategy

### Method 1: Progressive Enhancement
\`\`\`html
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Image">
</picture>
\`\`\`

### Method 2: Automatic Conversion
Use image CDNs that automatically serve WebP to supported browsers.

### Method 3: Server-Side Detection
Detect browser support and serve appropriate format.

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (iOS 14+)
- IE: No support

## When to Use WebP

- Modern web applications
- Performance-critical sites
- E-commerce product images
- Responsive web design
- Mobile-first design

## Migration Path

1. Identify heavy images
2. Convert to WebP format
3. Use picture element for fallbacks
4. Implement on critical pages first
5. Monitor performance improvements

## Tools for Conversion

- iConvertNow WebP converter
- Google Cwebp command-line tool
- Online conversion tools
- Image CDNs with automatic conversion

## Conclusion

WebP represents the future of web images. Start implementing it today for better performance and user experience.`,
    relatedConverters: ['jpg-to-webp', 'png-to-webp'],
    relatedFormats: ['webp', 'jpg', 'png'],
    keywords: ['webp', 'image optimization', 'web performance', 'modern image format'],
    readTime: 5,
  },

  {
    slug: 'image-compression-techniques',
    title: 'Advanced Image Compression Techniques',
    description: 'Learn professional techniques for compressing images without sacrificing quality.',
    category: 'tutorial',
    content: `# Advanced Image Compression Techniques

Professional image compression requires understanding trade-offs between quality and file size. This guide covers advanced techniques.

## Compression Types

### Lossless Compression
- No data loss
- Reversible
- Larger file sizes
- Best for: Graphics, logos, text

### Lossy Compression
- Some data removed
- Irreversible
- Smaller file sizes
- Best for: Photographs, complex images

## Quality Settings

### High Quality (90-100%)
- Barely perceptible loss
- Larger file sizes
- Use for: Premium content, print

### Medium Quality (75-90%)
- Minimal visible loss
- Balanced file size
- Use for: Web images (recommended)

### Low Quality (50-75%)
- Noticeable loss
- Small file sizes
- Use for: Thumbnails, placeholders

## Optimization Workflow

1. **Start with original format**
   - Keep high-quality originals
   - Avoid editing compressed images

2. **Choose appropriate format**
   - PNG for graphics
   - JPG for photos
   - WebP for web

3. **Set quality level**
   - Start at 85% quality
   - Adjust based on results

4. **Add metadata removal**
   - Strip EXIF data
   - Remove color profiles
   - Reduce file size by 5-15%

5. **Test and verify**
   - Check on multiple devices
   - Compare file sizes
   - Validate quality

## Advanced Tricks

- **Progressive JPEG**: Load low-quality first, then high-quality
- **Metadata Stripping**: Remove camera data and color profiles
- **Color Reduction**: Limit color palette for simpler images
- **Batch Processing**: Automate compression for multiple files

## Tools Comparison

| Tool | Ease | Quality | Speed |
|------|------|---------|-------|
| iConvertNow | Easy | Good | Fast |
| Photoshop | Hard | Excellent | Slow |
| ImageMagick | Hard | Excellent | Fast |
| Online Tools | Easy | Good | Medium |

## Conclusion

Effective compression requires balancing quality and file size. Use these techniques to optimize your images professionally.`,
    relatedConverters: ['jpg-to-png', 'png-to-jpg', 'jpg-to-webp'],
    relatedFormats: ['jpg', 'png', 'webp'],
    keywords: [
      'image compression',
      'lossy compression',
      'lossless compression',
      'quality settings',
    ],
    readTime: 6,
  },
]

/**
 * Get guide by slug
 */
export function getGuideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((guide) => guide.slug === slug)
}

/**
 * Get all guide slugs for static generation
 */
export function getAllGuideSlugs(): string[] {
  return GUIDES.map((guide) => guide.slug)
}

/**
 * Get guides by category
 */
export function getGuidesByCategory(category: Guide['category']): Guide[] {
  return GUIDES.filter((guide) => guide.category === category)
}

/**
 * Get featured guides
 */
export function getFeaturedGuides(limit: number = 3): Guide[] {
  return GUIDES.filter((guide) => guide.featured).slice(0, limit)
}

/**
 * Get related guides
 */
export function getRelatedGuides(slug: string, limit: number = 4): Guide[] {
  const guide = getGuideBySlug(slug)
  if (!guide) return []

  const related = GUIDES.filter((g) => {
    if (g.slug === slug) return false
    // Find guides with overlapping converters or formats
    const converterOverlap = g.relatedConverters.filter((c) =>
      guide.relatedConverters.includes(c)
    )
    const formatOverlap = g.relatedFormats.filter((f) =>
      guide.relatedFormats.includes(f)
    )
    return converterOverlap.length > 0 || formatOverlap.length > 0
  })

  return related.slice(0, limit)
}

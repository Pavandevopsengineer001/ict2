'use client'

import { Format } from '@/data/formats'
import { getConvertersFrom, getConvertersTo } from '@/data/converters'
import Link from 'next/link'

interface FormatPageProps {
  format: Format
}

export function FormatPage({ format }: FormatPageProps) {
  const convertersFrom = getConvertersFrom(format.slug)
  const convertersTo = getConvertersTo(format.slug)
  const allConverters = [...convertersFrom, ...convertersTo].slice(0, 6)

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="space-y-4">
        <h1 className="text-4xl font-bold">
          What is {format.name}? ({format.extension})
        </h1>
        <p className="text-lg text-muted-foreground">{format.description}</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>MIME Type: <code className="bg-muted px-2 py-1 rounded">{format.mimeType}</code></span>
          <span>Compression: <code className="bg-muted px-2 py-1 rounded">{format.compression}</code></span>
        </div>
      </section>

      {/* Full Description */}
      <section className="prose prose-invert max-w-none">
        <p className="text-muted-foreground text-lg leading-relaxed">
          {format.fullDescription}
        </p>
      </section>

      {/* Pros and Cons */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Advantages */}
        <div className="rounded-lg border bg-card p-6 space-y-4">
          <h2 className="text-2xl font-semibold">Advantages</h2>
          <ul className="space-y-2">
            {format.pros.map((pro) => (
              <li key={pro} className="flex items-start gap-3">
                <span className="text-green-500 font-bold flex-shrink-0">✓</span>
                <span className="text-muted-foreground">{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Disadvantages */}
        <div className="rounded-lg border bg-card p-6 space-y-4">
          <h2 className="text-2xl font-semibold">Disadvantages</h2>
          <ul className="space-y-2">
            {format.cons.map((con) => (
              <li key={con} className="flex items-start gap-3">
                <span className="text-red-500 font-bold flex-shrink-0">✗</span>
                <span className="text-muted-foreground">{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Use Cases */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Best Use Cases</h2>
        <p className="text-muted-foreground text-lg">{format.bestFor}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {format.useCases.map((useCase) => (
            <div
              key={useCase}
              className="rounded-lg bg-muted px-4 py-2 text-sm text-muted-foreground"
            >
              {useCase}
            </div>
          ))}
        </div>
      </section>

      {/* Related Converters */}
      {allConverters.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Convert {format.name} to Other Formats
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {allConverters.map((converter) => (
              <Link
                key={converter.slug}
                href={`/convert/${converter.slug}`}
                className="group rounded-lg border bg-card p-4 hover:bg-accent transition-colors"
              >
                <h3 className="font-semibold group-hover:text-primary transition-colors text-sm">
                  {converter.from.toUpperCase()} ↔ {converter.to.toUpperCase()}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">{converter.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Technical Specifications */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Technical Details</h2>
        <div className="rounded-lg border bg-card p-6 space-y-3">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div>
              <dt className="font-semibold text-muted-foreground">File Extension</dt>
              <dd className="mt-1 font-mono">{format.extension}</dd>
            </div>
            <div>
              <dt className="font-semibold text-muted-foreground">MIME Type</dt>
              <dd className="mt-1 font-mono text-xs">{format.mimeType}</dd>
            </div>
            <div>
              <dt className="font-semibold text-muted-foreground">Compression</dt>
              <dd className="mt-1 capitalize">{format.compression}</dd>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div className="space-y-3">
          <details className="group border rounded-lg p-4 cursor-pointer">
            <summary className="font-semibold group-open:text-primary">
              When should I use {format.name}?
            </summary>
            <p className="text-sm text-muted-foreground mt-3">{format.bestFor}</p>
          </details>
          <details className="group border rounded-lg p-4 cursor-pointer">
            <summary className="font-semibold group-open:text-primary">
              What is the compression type of {format.name}?
            </summary>
            <p className="text-sm text-muted-foreground mt-3 capitalize">
              {format.name} uses {format.compression} compression, which means{' '}
              {format.compression === 'lossless'
                ? 'all image data is preserved during compression.'
                : format.compression === 'lossy'
                ? 'some data is removed to reduce file size, but the image still looks good to the human eye.'
                : 'no compression is applied and the file is stored in its original format.'}
            </p>
          </details>
          <details className="group border rounded-lg p-4 cursor-pointer">
            <summary className="font-semibold group-open:text-primary">
              Can I convert {format.name} to other formats?
            </summary>
            <p className="text-sm text-muted-foreground mt-3">
              Yes! Use our free online converters to convert {format.name} to virtually any other
              image format. Simply select your conversion from our list of converters above.
            </p>
          </details>
        </div>
      </section>
    </div>
  )
}

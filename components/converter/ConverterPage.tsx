'use client'

import { Converter } from '@/data/converters'
import { getRelatedConverters } from '@/data/converters'
import Link from 'next/link'

interface ConverterPageProps {
  converter: Converter
  children?: React.ReactNode
}

export function ConverterPage({ converter, children }: ConverterPageProps) {
  const relatedConverters = getRelatedConverters(converter.slug, 4)

  return (
    <div className="space-y-8">
      {/* Main Content */}
      <section className="space-y-4">
        <h1 className="text-4xl font-bold">
          {converter.from.toUpperCase()} to {converter.to.toUpperCase()} Converter
        </h1>
        <p className="text-lg text-muted-foreground">{converter.description}</p>
      </section>

      {/* Tool Interface (children) */}
      {children && (
        <section className="rounded-lg border bg-card p-6">
          {children}
        </section>
      )}

      {/* How it Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How to Convert {converter.from.toUpperCase()} to {converter.to.toUpperCase()}</h2>
        <ol className="space-y-3 list-decimal list-inside">
          <li className="text-muted-foreground">
            Upload your {converter.from.toUpperCase()} file to the converter above
          </li>
          <li className="text-muted-foreground">
            The conversion starts automatically and processes in your browser
          </li>
          <li className="text-muted-foreground">
            Download your converted {converter.to.toUpperCase()} file instantly
          </li>
        </ol>
      </section>

      {/* Features */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Features</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <li className="flex items-start gap-3">
            <span className="text-green-500 font-bold">✓</span>
            <span className="text-muted-foreground">Free and unlimited conversions</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-500 font-bold">✓</span>
            <span className="text-muted-foreground">No registration required</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-500 font-bold">✓</span>
            <span className="text-muted-foreground">Secure processing in your browser</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-500 font-bold">✓</span>
            <span className="text-muted-foreground">No file uploads to server</span>
          </li>
        </ul>
      </section>

      {/* Related Converters */}
      {relatedConverters.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Related Converters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedConverters.map((related) => (
              <Link
                key={related.slug}
                href={`/convert/${related.slug}`}
                className="group rounded-lg border bg-card p-4 hover:bg-accent transition-colors"
              >
                <h3 className="font-semibold group-hover:text-primary transition-colors">
                  {related.from.toUpperCase()} to {related.to.toUpperCase()}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{related.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div className="space-y-3">
          <details className="group border rounded-lg p-4 cursor-pointer">
            <summary className="font-semibold group-open:text-primary">
              Is the conversion process secure?
            </summary>
            <p className="text-sm text-muted-foreground mt-3">
              Yes, all conversions happen entirely in your browser. Your files are never uploaded to our servers.
            </p>
          </details>
          <details className="group border rounded-lg p-4 cursor-pointer">
            <summary className="font-semibold group-open:text-primary">
              What is the maximum file size?
            </summary>
            <p className="text-sm text-muted-foreground mt-3">
              File size limits depend on your browser and available memory. Most modern browsers can handle files up to 1GB.
            </p>
          </details>
          <details className="group border rounded-lg p-4 cursor-pointer">
            <summary className="font-semibold group-open:text-primary">
              Do I need to register?
            </summary>
            <p className="text-sm text-muted-foreground mt-3">
              No registration required. Our converter is completely free and anonymous.
            </p>
          </details>
        </div>
      </section>
    </div>
  )
}

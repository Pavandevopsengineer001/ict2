'use client'

import { Comparison } from '@/data/comparisons'
import { getConverterBySlug, getRelatedConverters } from '@/data/converters'
import Link from 'next/link'

interface ComparisonPageProps {
  comparison: Comparison
}

export function ComparisonPage({ comparison }: ComparisonPageProps) {
  const format1Converters = getRelatedConverters(`${comparison.format1}-to-${comparison.format2}`, 3)
  const format2Converters = getRelatedConverters(`${comparison.format2}-to-${comparison.format1}`, 3)

  return (
    <article className="space-y-8">
      {/* Header */}
      <header className="space-y-4 border-b pb-8">
        <h1 className="text-4xl font-bold">{comparison.title}</h1>
        <p className="text-lg text-muted-foreground">{comparison.description}</p>
      </header>

      {/* Quick Summary */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Format 1 Summary */}
        <div className="rounded-lg border bg-card p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-blue-400">{comparison.format1Name}</h2>
          <p className="text-muted-foreground">{comparison.useCase1}</p>
          {comparison.relatedConverters
            .filter((slug) => slug.includes(comparison.format1))
            .slice(0, 2)
            .map((slug) => {
              const converter = getConverterBySlug(slug)
              if (!converter) return null
              return (
                <Link
                  key={slug}
                  href={`/convert/${slug}`}
                  className="block w-full px-4 py-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors text-center text-sm font-medium"
                >
                  Convert to {converter.to.toUpperCase()}
                </Link>
              )
            })}
        </div>

        {/* Format 2 Summary */}
        <div className="rounded-lg border bg-card p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-purple-400">{comparison.format2Name}</h2>
          <p className="text-muted-foreground">{comparison.useCase2}</p>
          {comparison.relatedConverters
            .filter((slug) => slug.includes(comparison.format2))
            .slice(0, 2)
            .map((slug) => {
              const converter = getConverterBySlug(slug)
              if (!converter) return null
              return (
                <Link
                  key={slug}
                  href={`/convert/${slug}`}
                  className="block w-full px-4 py-2 rounded-lg bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 transition-colors text-center text-sm font-medium"
                >
                  Convert to {converter.to.toUpperCase()}
                </Link>
              )
            })}
        </div>
      </section>

      {/* Detailed Comparison Table */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Detailed Comparison</h2>
        <div className="rounded-lg border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Feature</th>
                <th className="px-6 py-3 text-left font-semibold text-blue-400">
                  {comparison.format1Name}
                </th>
                <th className="px-6 py-3 text-left font-semibold text-purple-400">
                  {comparison.format2Name}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {comparison.comparisonTable.map((item, index) => (
                <tr key={index} className="hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 font-medium">{item.label}</td>
                  <td className="px-6 py-4 text-muted-foreground">{item.value1}</td>
                  <td className="px-6 py-4 text-muted-foreground">{item.value2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Recommendation */}
      <section className="rounded-lg border bg-gradient-to-r from-green-500/10 to-green-500/5 p-8 space-y-4">
        <h2 className="text-2xl font-semibold">Our Recommendation</h2>
        <p className="text-lg text-muted-foreground">{comparison.recommendation}</p>
      </section>

      {/* Converter Tools */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Convert Between Formats</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Format 1 to Format 2 */}
          <div className="rounded-lg border bg-card p-6 space-y-4">
            <h3 className="text-xl font-semibold">
              {comparison.format1Name} to {comparison.format2Name}
            </h3>
            <p className="text-muted-foreground">
              Convert your {comparison.format1Name} files to {comparison.format2Name} format using our free converter.
            </p>
            {comparison.relatedConverters
              .filter((slug) => slug.includes(`${comparison.format1}-to-${comparison.format2}`))
              .slice(0, 1)
              .map((slug) => (
                <Link
                  key={slug}
                  href={`/convert/${slug}`}
                  className="inline-block w-full px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 transition-colors text-center font-medium"
                >
                  Start Converting
                </Link>
              ))}
          </div>

          {/* Format 2 to Format 1 */}
          <div className="rounded-lg border bg-card p-6 space-y-4">
            <h3 className="text-xl font-semibold">
              {comparison.format2Name} to {comparison.format1Name}
            </h3>
            <p className="text-muted-foreground">
              Convert your {comparison.format2Name} files to {comparison.format1Name} format using our free converter.
            </p>
            {comparison.relatedConverters
              .filter((slug) => slug.includes(`${comparison.format2}-to-${comparison.format1}`))
              .slice(0, 1)
              .map((slug) => (
                <Link
                  key={slug}
                  href={`/convert/${slug}`}
                  className="inline-block w-full px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 transition-colors text-center font-medium"
                >
                  Start Converting
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div className="space-y-3">
          <details className="group border rounded-lg p-4 cursor-pointer">
            <summary className="font-semibold group-open:text-primary">
              When should I use {comparison.format1Name}?
            </summary>
            <p className="text-sm text-muted-foreground mt-3">{comparison.useCase1}</p>
          </details>
          <details className="group border rounded-lg p-4 cursor-pointer">
            <summary className="font-semibold group-open:text-primary">
              When should I use {comparison.format2Name}?
            </summary>
            <p className="text-sm text-muted-foreground mt-3">{comparison.useCase2}</p>
          </details>
          <details className="group border rounded-lg p-4 cursor-pointer">
            <summary className="font-semibold group-open:text-primary">
              Which format is better for the web?
            </summary>
            <p className="text-sm text-muted-foreground mt-3">
              The best format for the web depends on your use case. {comparison.recommendation}
            </p>
          </details>
          <details className="group border rounded-lg p-4 cursor-pointer">
            <summary className="font-semibold group-open:text-primary">
              Can I convert between these formats?
            </summary>
            <p className="text-sm text-muted-foreground mt-3">
              Yes! Use our free online converter to easily convert between {comparison.format1Name} and{' '}
              {comparison.format2Name}. Select your conversion tool above.
            </p>
          </details>
        </div>
      </section>
    </article>
  )
}

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { TOOLS, getToolBySlug } from '@/data/tools'
import ToolContent from '@/components/tools/ToolContent'

interface PageProps {
  params: Promise<{ slug: string }>
}

// Generate static params for all tools
export async function generateStaticParams() {
  return TOOLS.map(tool => ({
    slug: tool.slug,
  }))
}

// Generate metadata for each tool
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const tool = getToolBySlug(slug)

  if (!tool) {
    return {
      title: 'Tool Not Found',
      description: 'The tool you are looking for does not exist.',
    }
  }

  return {
    title: `${tool.name} | iConvertNow`,
    description: tool.description,
    openGraph: {
      title: tool.name,
      description: tool.description,
      type: 'website',
    },
  }
}

export default async function DynamicToolPage({ params }: PageProps) {
  const { slug } = await params
  const tool = getToolBySlug(slug)

  if (!tool) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ToolContent tool={tool} />
      </main>
      <Footer />
    </div>
  )
}

'use client'

import type { Tool } from '@/data/tools'
import { ToolLayout } from './ToolLayout'
import DynamicToolContent from './DynamicToolContent'
import { TOOLS } from '@/data/tools'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface ToolContentProps {
  tool: Tool
}

// Get related tools based on category
function getRelatedTools(tool: Tool, limit: number = 3): Tool[] {
  return TOOLS.filter(t => t.category === tool.category && t.slug !== tool.slug).slice(0, limit)
}

// Related Tool Card Component
function RelatedToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group p-5 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 hover:bg-card/80 transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-3xl">{tool.icon}</span>
        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
      <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{tool.name}</h3>
      <p className="text-sm text-muted-foreground line-clamp-2">{tool.description}</p>
    </Link>
  )
}

export default function ToolContent({ tool }: ToolContentProps) {
  const relatedTools = getRelatedTools(tool)
  
  // Default features for all tools
  const defaultFeatures = [
    'Free & Instant',
    'No Registration',
    'Secure & Private',
  ]
  
  // Tool-specific features
  const toolFeatures: Record<string, string[]> = {
    'word-counter': ['Real-time Counting', 'Reading Time', 'Paragraph Analysis'],
    'json-formatter': ['Syntax Validation', 'Beautify & Minify', 'Error Detection'],
    'image-resizer': ['Multiple Formats', 'Quality Control', 'Preset Sizes'],
    'qr-code-generator': ['Multiple Types', 'Custom Sizes', 'Download PNG'],
    'percentage-calculator': ['Multiple Modes', 'Instant Results', 'Percentage Change'],
    'loan-calculator': ['Monthly Payment', 'Total Interest', 'Amortization'],
    'unit-converter': ['8+ Categories', '100+ Units', 'Instant Conversion'],
  }
  
  const features = toolFeatures[tool.slug] || defaultFeatures

  return (
    <ToolLayout
      title={tool.name}
      description={tool.description}
      icon={<span className="text-lg">{tool.icon}</span>}
      category={tool.category}
      features={features}
      showExplanation={true}
      explanation={
        <div className="space-y-4">
          <p>{tool.description}</p>
          <p>
            This tool is designed to help you quickly and efficiently complete your task. 
            All processing is done securely, and your data is never stored on our servers.
          </p>
        </div>
      }
      howTo={
        <div className="space-y-4">
          <ol className="list-decimal list-inside space-y-2">
            <li>Enter your data in the input field</li>
            <li>Configure any options if available</li>
            <li>Click the action button to process</li>
            <li>Copy or download your results</li>
          </ol>
        </div>
      }
      relatedTools={
        relatedTools.length > 0 ? (
          <>
            {relatedTools.map(t => (
              <RelatedToolCard key={t.slug} tool={t} />
            ))}
          </>
        ) : undefined
      }
    >
      <DynamicToolContent tool={tool} />
    </ToolLayout>
  )
}

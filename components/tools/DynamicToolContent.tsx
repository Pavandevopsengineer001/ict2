'use client'

import dynamic from 'next/dynamic'
import { ToolLayout } from '@/components/tools/ToolLayout'
import type { Tool } from '@/data/tools'
import { Loader2 } from 'lucide-react'

// Loading component for dynamic imports
const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-24">
    <Loader2 className="w-8 h-8 animate-spin text-primary" />
  </div>
)

// Dynamically import tool components to reduce initial bundle size
const toolComponents: Record<string, React.ComponentType> = {
  // Calculator Tools
  'bmi-calculator': dynamic(() => import('@/components/tools/implementations/BmiCalculatorTool'), { loading: LoadingSpinner }),
  'bmr-calculator': dynamic(() => import('@/components/tools/implementations/BmrCalculatorTool'), { loading: LoadingSpinner }),
  'calorie-calculator': dynamic(() => import('@/components/tools/implementations/CalorieCalculatorTool'), { loading: LoadingSpinner }),
  'percentage-calculator': dynamic(() => import('@/components/tools/implementations/PercentageCalculatorTool'), { loading: LoadingSpinner }),
  'loan-calculator': dynamic(() => import('@/components/tools/implementations/LoanCalculatorTool'), { loading: LoadingSpinner }),
  'compound-interest-calculator': dynamic(() => import('@/components/tools/implementations/CompoundInterestCalculatorTool'), { loading: LoadingSpinner }),
  'age-calculator': dynamic(() => import('@/components/tools/implementations/AgeCalculatorTool'), { loading: LoadingSpinner }),
  'unit-converter': dynamic(() => import('@/components/tools/implementations/UnitConverterTool'), { loading: LoadingSpinner }),
  'tip-calculator': dynamic(() => import('@/components/tools/implementations/TipCalculatorTool'), { loading: LoadingSpinner }),
  'discount-calculator': dynamic(() => import('@/components/tools/implementations/DiscountCalculatorTool'), { loading: LoadingSpinner }),
  'mortgage-calculator': dynamic(() => import('@/components/tools/implementations/MortgageCalculatorTool'), { loading: LoadingSpinner }),
  'date-calculator': dynamic(() => import('@/components/tools/implementations/DateCalculatorTool'), { loading: LoadingSpinner }),
  'timezone-converter': dynamic(() => import('@/components/tools/implementations/TimeZoneConverterTool'), { loading: LoadingSpinner }),
  
  // Text Tools
  'word-counter': dynamic(() => import('@/components/tools/implementations/WordCounterTool'), { loading: LoadingSpinner }),
  'case-converter': dynamic(() => import('@/components/tools/implementations/CaseConverterTool'), { loading: LoadingSpinner }),
  'lorem-ipsum-generator': dynamic(() => import('@/components/tools/implementations/LoremIpsumTool'), { loading: LoadingSpinner }),
  'text-diff': dynamic(() => import('@/components/tools/implementations/TextDiffTool'), { loading: LoadingSpinner }),
  'string-encoder': dynamic(() => import('@/components/tools/implementations/StringEncoderTool'), { loading: LoadingSpinner }),
  'markdown-preview': dynamic(() => import('@/components/tools/implementations/MarkdownPreviewTool'), { loading: LoadingSpinner }),
  
  // Developer Tools
  'json-formatter': dynamic(() => import('@/components/tools/implementations/JsonFormatterTool'), { loading: LoadingSpinner }),
  'uuid-generator': dynamic(() => import('@/components/tools/implementations/UuidGeneratorTool'), { loading: LoadingSpinner }),
  'hash-generator': dynamic(() => import('@/components/tools/implementations/HashGeneratorTool'), { loading: LoadingSpinner }),
  'regex-tester': dynamic(() => import('@/components/tools/implementations/RegexTesterTool'), { loading: LoadingSpinner }),
  'color-converter': dynamic(() => import('@/components/tools/implementations/ColorConverterTool'), { loading: LoadingSpinner }),
  
  // Image Tools
  'image-resizer': dynamic(() => import('@/components/tools/implementations/ImageResizerTool'), { loading: LoadingSpinner }),
  'qr-code-generator': dynamic(() => import('@/components/tools/implementations/QrCodeGeneratorTool'), { loading: LoadingSpinner }),
  'base64-image': dynamic(() => import('@/components/tools/implementations/Base64ImageTool'), { loading: LoadingSpinner }),
}

// Placeholder component for tools that aren't implemented yet
function PlaceholderTool({ tool }: { tool: Tool }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
        <span className="text-4xl">{tool.icon}</span>
      </div>
      <h2 className="text-2xl font-bold mb-3 text-center">Coming Soon</h2>
      <p className="text-muted-foreground text-center max-w-md mb-2">
        {tool.name} is being developed and will be available soon.
      </p>
      <p className="text-sm text-muted-foreground text-center max-w-md">
        {tool.description}
      </p>
    </div>
  )
}

interface DynamicToolContentProps {
  tool: Tool
}

export default function DynamicToolContent({ tool }: DynamicToolContentProps) {
  const ToolComponent = toolComponents[tool.slug]
  
  if (ToolComponent) {
    return <ToolComponent />
  }
  
  return <PlaceholderTool tool={tool} />
}

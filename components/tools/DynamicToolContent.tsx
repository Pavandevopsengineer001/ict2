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
  'date-difference': dynamic(() => import('@/components/tools/implementations/DateCalculatorTool'), { loading: LoadingSpinner }),
  'days-between-calculator': dynamic(() => import('@/components/tools/implementations/DateCalculatorTool'), { loading: LoadingSpinner }),
  'timezone-converter': dynamic(() => import('@/components/tools/implementations/TimeZoneConverterTool'), { loading: LoadingSpinner }),
  'time-duration-calculator': dynamic(() => import('@/components/tools/implementations/DateCalculatorTool'), { loading: LoadingSpinner }),
  'temperature-converter': dynamic(() => import('@/components/tools/implementations/UnitConverterTool'), { loading: LoadingSpinner }),
  'volume-converter': dynamic(() => import('@/components/tools/implementations/UnitConverterTool'), { loading: LoadingSpinner }),
  'weight-converter': dynamic(() => import('@/components/tools/implementations/UnitConverterTool'), { loading: LoadingSpinner }),
  'length-converter': dynamic(() => import('@/components/tools/implementations/UnitConverterTool'), { loading: LoadingSpinner }),
  'area-converter': dynamic(() => import('@/components/tools/implementations/UnitConverterTool'), { loading: LoadingSpinner }),
  'simple-interest-calculator': dynamic(() => import('@/components/tools/implementations/SimpleInterestCalculatorTool'), { loading: LoadingSpinner }),
  'gst-calculator': dynamic(() => import('@/components/tools/implementations/GstCalculatorTool'), { loading: LoadingSpinner }),
  'sales-tax-calculator': dynamic(() => import('@/components/tools/implementations/SalesTaxCalculatorTool'), { loading: LoadingSpinner }),
  'profit-margin-calculator': dynamic(() => import('@/components/tools/implementations/ProfitMarginCalculatorTool'), { loading: LoadingSpinner }),
  'markup-calculator': dynamic(() => import('@/components/tools/implementations/ProfitMarginCalculatorTool'), { loading: LoadingSpinner }),
  'average-calculator': dynamic(() => import('@/components/tools/implementations/AverageCalculatorTool'), { loading: LoadingSpinner }),
  'grade-calculator': dynamic(() => import('@/components/tools/implementations/GradeCalculatorTool'), { loading: LoadingSpinner }),
  
  // Text Tools
  'word-counter': dynamic(() => import('@/components/tools/implementations/WordCounterTool'), { loading: LoadingSpinner }),
  'character-counter': dynamic(() => import('@/components/tools/implementations/CharacterCounterTool'), { loading: LoadingSpinner }),
  'sentence-counter': dynamic(() => import('@/components/tools/implementations/SentenceCounterTool'), { loading: LoadingSpinner }),
  'paragraph-counter': dynamic(() => import('@/components/tools/implementations/ParagraphCounterTool'), { loading: LoadingSpinner }),
  'word-frequency-counter': dynamic(() => import('@/components/tools/implementations/WordFrequencyCounterTool'), { loading: LoadingSpinner }),
  'reading-time-calculator': dynamic(() => import('@/components/tools/implementations/ReadingTimeCalculatorTool'), { loading: LoadingSpinner }),
  'case-converter': dynamic(() => import('@/components/tools/implementations/CaseConverterTool'), { loading: LoadingSpinner }),
  'camelcase-converter': dynamic(() => import('@/components/tools/implementations/CaseConverterTool'), { loading: LoadingSpinner }),
  'kebabcase-converter': dynamic(() => import('@/components/tools/implementations/CaseConverterTool'), { loading: LoadingSpinner }),
  'snakecase-converter': dynamic(() => import('@/components/tools/implementations/CaseConverterTool'), { loading: LoadingSpinner }),
  'titlecase-converter': dynamic(() => import('@/components/tools/implementations/CaseConverterTool'), { loading: LoadingSpinner }),
  'lorem-ipsum-generator': dynamic(() => import('@/components/tools/implementations/LoremIpsumTool'), { loading: LoadingSpinner }),
  'text-diff': dynamic(() => import('@/components/tools/implementations/TextDiffTool'), { loading: LoadingSpinner }),
  'text-diff-checker': dynamic(() => import('@/components/tools/implementations/TextDiffTool'), { loading: LoadingSpinner }),
  'text-sorter': dynamic(() => import('@/components/tools/implementations/TextSorterTool'), { loading: LoadingSpinner }),
  'remove-duplicates': dynamic(() => import('@/components/tools/implementations/RemoveDuplicatesTool'), { loading: LoadingSpinner }),
  'string-encoder': dynamic(() => import('@/components/tools/implementations/StringEncoderTool'), { loading: LoadingSpinner }),
  'markdown-preview': dynamic(() => import('@/components/tools/implementations/MarkdownPreviewTool'), { loading: LoadingSpinner }),
  'markdown-to-html': dynamic(() => import('@/components/tools/implementations/MarkdownToHtmlTool'), { loading: LoadingSpinner }),
  'morse-code-converter': dynamic(() => import('@/components/tools/implementations/MorseCodeConverterTool'), { loading: LoadingSpinner }),
  'binary-text-converter': dynamic(() => import('@/components/tools/implementations/BinaryTextConverterTool'), { loading: LoadingSpinner }),
  'phonetic-alphabet': dynamic(() => import('@/components/tools/implementations/PhoneticAlphabetTool'), { loading: LoadingSpinner }),
  'palindrome-checker': dynamic(() => import('@/components/tools/implementations/PalindromeCheckerTool'), { loading: LoadingSpinner }),
  'password-strength-checker': dynamic(() => import('@/components/tools/implementations/PasswordStrengthCheckerTool'), { loading: LoadingSpinner }),
  'text-to-slug': dynamic(() => import('@/components/tools/implementations/TextToSlugTool'), { loading: LoadingSpinner }),
  'slug-generator': dynamic(() => import('@/components/tools/implementations/TextToSlugTool'), { loading: LoadingSpinner }),
  'text-to-speech': dynamic(() => import('@/components/tools/implementations/TextToSpeechTool'), { loading: LoadingSpinner }),
  'text-reverser': dynamic(() => import('@/components/tools/implementations/TextReverserTool'), { loading: LoadingSpinner }),
  
  // Encoder/Decoder Tools
  'base64-encode': dynamic(() => import('@/components/tools/implementations/Base64EncodeTool'), { loading: LoadingSpinner }),
  'base64-decode': dynamic(() => import('@/components/tools/implementations/Base64DecodeTool'), { loading: LoadingSpinner }),
  'url-encode': dynamic(() => import('@/components/tools/implementations/UrlEncodeTool'), { loading: LoadingSpinner }),
  'url-decode': dynamic(() => import('@/components/tools/implementations/UrlDecodeTool'), { loading: LoadingSpinner }),
  'html-encode': dynamic(() => import('@/components/tools/implementations/HtmlEncodeTool'), { loading: LoadingSpinner }),
  'html-decode': dynamic(() => import('@/components/tools/implementations/HtmlDecodeTool'), { loading: LoadingSpinner }),
  
  // Developer Tools
  'json-formatter': dynamic(() => import('@/components/tools/implementations/JsonFormatterTool'), { loading: LoadingSpinner }),
  'json-validator': dynamic(() => import('@/components/tools/implementations/JsonValidatorTool'), { loading: LoadingSpinner }),
  'json-to-csv': dynamic(() => import('@/components/tools/implementations/JsonToCsvTool'), { loading: LoadingSpinner }),
  'csv-to-json': dynamic(() => import('@/components/tools/implementations/CsvToJsonTool'), { loading: LoadingSpinner }),
  'jwt-decoder': dynamic(() => import('@/components/tools/implementations/JwtDecoderTool'), { loading: LoadingSpinner }),
  'cron-generator': dynamic(() => import('@/components/tools/implementations/CronGeneratorTool'), { loading: LoadingSpinner }),
  'uuid-generator': dynamic(() => import('@/components/tools/implementations/UuidGeneratorTool'), { loading: LoadingSpinner }),
  'hash-generator': dynamic(() => import('@/components/tools/implementations/HashGeneratorTool'), { loading: LoadingSpinner }),
  'random-string-generator': dynamic(() => import('@/components/tools/implementations/RandomStringGeneratorTool'), { loading: LoadingSpinner }),
  'regex-tester': dynamic(() => import('@/components/tools/implementations/RegexTesterTool'), { loading: LoadingSpinner }),
  'regex-builder': dynamic(() => import('@/components/tools/implementations/RegexTesterTool'), { loading: LoadingSpinner }),
  'timestamp-converter': dynamic(() => import('@/components/tools/implementations/TimestampConverterTool'), { loading: LoadingSpinner }),
  'http-header-parser': dynamic(() => import('@/components/tools/implementations/HttpHeaderParserTool'), { loading: LoadingSpinner }),
  'user-agent-parser': dynamic(() => import('@/components/tools/implementations/UserAgentParserTool'), { loading: LoadingSpinner }),
  'code-minifier': dynamic(() => import('@/components/tools/implementations/CodeMinifierTool'), { loading: LoadingSpinner }),
  'code-beautifier': dynamic(() => import('@/components/tools/implementations/CodeBeautifierTool'), { loading: LoadingSpinner }),
  'yaml-parser': dynamic(() => import('@/components/tools/implementations/YamlParserTool'), { loading: LoadingSpinner }),
  'xml-formatter': dynamic(() => import('@/components/tools/implementations/XmlFormatterTool'), { loading: LoadingSpinner }),
  'color-converter': dynamic(() => import('@/components/tools/implementations/ColorConverterTool'), { loading: LoadingSpinner }),
  
  // Image Tools
  'image-resizer': dynamic(() => import('@/components/tools/implementations/ImageResizerTool'), { loading: LoadingSpinner }),
  'image-cropper': dynamic(() => import('@/components/tools/implementations/ImageCropperTool'), { loading: LoadingSpinner }),
  'image-compressor': dynamic(() => import('@/components/tools/implementations/ImageCompressorTool'), { loading: LoadingSpinner }),
  'image-to-base64': dynamic(() => import('@/components/tools/implementations/ImageToBase64Tool'), { loading: LoadingSpinner }),
  'base64-to-image': dynamic(() => import('@/components/tools/implementations/Base64ImageTool'), { loading: LoadingSpinner }),
  'qr-code-generator': dynamic(() => import('@/components/tools/implementations/QrCodeGeneratorTool'), { loading: LoadingSpinner }),
  'barcode-generator': dynamic(() => import('@/components/tools/implementations/BarcodeGeneratorTool'), { loading: LoadingSpinner }),
  'color-picker': dynamic(() => import('@/components/tools/implementations/ColorPickerTool'), { loading: LoadingSpinner }),
  'color-palette-generator': dynamic(() => import('@/components/tools/implementations/ColorPickerTool'), { loading: LoadingSpinner }),
  'gradient-generator': dynamic(() => import('@/components/tools/implementations/GradientGeneratorTool'), { loading: LoadingSpinner }),
  'favicon-generator': dynamic(() => import('@/components/tools/implementations/FaviconGeneratorTool'), { loading: LoadingSpinner }),
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

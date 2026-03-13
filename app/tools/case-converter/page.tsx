'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { ToolInput } from '@/components/tools/ToolInput'
import { ToolOutput } from '@/components/tools/ToolOutput'
import { textTools } from '@/lib/toolUtils'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'

type CaseType = 'upper' | 'lower' | 'title' | 'sentence' | 'toggle' | 'capitalize'

export default function CaseConverterPage() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)
  const [selectedCase, setSelectedCase] = useState<CaseType>('upper')

  const caseOptions: { value: CaseType; label: string }[] = [
    { value: 'upper', label: 'UPPERCASE' },
    { value: 'lower', label: 'lowercase' },
    { value: 'title', label: 'Title Case' },
    { value: 'sentence', label: 'Sentence case' },
    { value: 'capitalize', label: 'Capitalize Each Word' },
    { value: 'toggle', label: 'tOGGLE cASE' },
  ]

  const handleConvert = (caseType: CaseType) => {
    setSelectedCase(caseType)
    const result = textTools.convertCase(input, caseType)
    setOutput(result)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ToolLayout
          title="Case Converter"
          description="Convert text between different cases instantly"
          onCopy={handleCopy}
          copiedText={copied}
          explanation={
            <div className="space-y-4 text-gray-300">
              <p>
                The Case Converter helps you quickly change the capitalization of your text. Perfect for:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Formatting titles and headings</li>
                <li>Creating variable names and code identifiers</li>
                <li>Adjusting document formatting</li>
                <li>Converting between text styles</li>
              </ul>
            </div>
          }
          howTo={
            <div className="space-y-4 text-gray-300">
              <ol className="list-decimal list-inside space-y-3">
                <li>Enter or paste your text</li>
                <li>Click the case conversion button you want</li>
                <li>Your converted text appears instantly</li>
                <li>Use &quot;Copy&quot; to copy the result</li>
              </ol>
            </div>
          }
          faq={
            <div className="space-y-4 text-gray-300">
              <div>
                <h4 className="font-semibold text-white mb-2">What is title case?</h4>
                <p>Title case capitalizes the first letter of each word, commonly used for titles and headings.</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">What is sentence case?</h4>
                <p>Sentence case capitalizes only the first letter of the first word, like a regular sentence.</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">What is toggle case?</h4>
                <p>Toggle case swaps uppercase and lowercase letters throughout the text.</p>
              </div>
            </div>
          }
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ToolInput
                value={input}
                onChange={setInput}
                placeholder="Enter text to convert..."
                label="Input Text"
                rows={8}
              />
              <ToolOutput
                value={output}
                label="Converted Text"
                isEmpty={!output}
              />
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-300">Select Case Type:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {caseOptions.map(option => (
                  <Button
                    key={option.value}
                    onClick={() => handleConvert(option.value)}
                    variant={selectedCase === option.value ? 'default' : 'outline'}
                    className={selectedCase === option.value ? 'gradient-btn text-white' : 'border-border/50'}
                    size="sm"
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 flex-wrap">
              <Button
                onClick={handleClear}
                variant="outline"
                className="border-border/50"
              >
                Clear
              </Button>
              {output && (
                <Button
                  onClick={handleCopy}
                  variant="outline"
                  className="border-border/50 gap-2"
                >
                  <Copy className="w-4 h-4" />
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              )}
            </div>
          </div>
        </ToolLayout>
      </main>
      <Footer />
    </div>
  )
}

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

export default function TextSorterPage() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [reverse, setReverse] = useState(false)
  const [numeric, setNumeric] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleSort = () => {
    const result = textTools.sortText(input, reverse, numeric)
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
          title="Text Sorter"
          description="Sort text lines alphabetically or numerically"
          onCopy={handleCopy}
          copiedText={copied}
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ToolInput
                value={input}
                onChange={setInput}
                placeholder="Paste text to sort..."
                label="Input Text"
                rows={10}
              />
              <ToolOutput
                value={output}
                label="Sorted Text"
                isEmpty={!output}
              />
            </div>

            <div className="space-y-3">
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={reverse}
                    onChange={(e) => setReverse(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-gray-300">Reverse Order</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={numeric}
                    onChange={(e) => setNumeric(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-gray-300">Numeric Sort</span>
                </label>
              </div>
            </div>

            <div className="flex gap-3 flex-wrap">
              <Button
                onClick={handleSort}
                className="gradient-btn text-white border-0"
              >
                Sort
              </Button>
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

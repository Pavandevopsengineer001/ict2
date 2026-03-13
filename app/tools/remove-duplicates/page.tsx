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

export default function RemoveDuplicatesPage() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const handleRemove = () => {
    const result = textTools.removeDuplicates(input)
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
          title="Remove Duplicate Lines"
          description="Remove duplicate lines from your text instantly"
          onCopy={handleCopy}
          copiedText={copied}
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ToolInput
                value={input}
                onChange={setInput}
                placeholder="Paste text with duplicates..."
                label="Input Text"
                rows={10}
              />
              <ToolOutput
                value={output}
                label="Unique Lines"
                isEmpty={!output}
              />
            </div>

            {output && (
              <div className="text-sm text-gray-400 text-center">
                Removed {input.split('\n').length - output.split('\n').length} duplicate line(s)
              </div>
            )}

            <div className="flex gap-3 flex-wrap">
              <Button
                onClick={handleRemove}
                className="gradient-btn text-white border-0"
              >
                Remove Duplicates
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

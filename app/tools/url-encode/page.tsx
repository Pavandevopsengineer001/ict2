'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { ToolInput } from '@/components/tools/ToolInput'
import { ToolOutput } from '@/components/tools/ToolOutput'
import { developerTools } from '@/lib/toolUtils'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'

export default function URLEncodePage() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const handleEncode = () => {
    const result = developerTools.urlEncode(input)
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
          title="URL Encode"
          description="Encode text to URL-safe format for use in URLs and query parameters"
          onCopy={handleCopy}
          copiedText={copied}
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ToolInput
                value={input}
                onChange={setInput}
                placeholder="Enter text to encode..."
                label="Input Text"
                rows={8}
              />
              <ToolOutput
                value={output}
                label="URL Encoded"
                isEmpty={!output}
              />
            </div>

            <div className="flex gap-3 flex-wrap">
              <Button
                onClick={handleEncode}
                className="gradient-btn text-white border-0"
              >
                Encode
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

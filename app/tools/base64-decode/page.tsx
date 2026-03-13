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

export default function Base64DecodePage() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const handleDecode = () => {
    try {
      setError('')
      const result = developerTools.base64Decode(input)
      setOutput(result)
    } catch (e) {
      setError(String(e))
      setOutput('')
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
    setError('')
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ToolLayout
          title="Base64 Decode"
          description="Decode Base64 strings back to plain text"
          onCopy={handleCopy}
          copiedText={copied}
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ToolInput
                value={input}
                onChange={setInput}
                placeholder="Paste Base64 string here..."
                label="Input (Base64)"
                rows={8}
              />
              <ToolOutput
                value={output}
                label="Decoded Text"
                isEmpty={!output}
              />
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400">
                <p className="text-sm">{error}</p>
              </div>
            )}

            <div className="flex gap-3 flex-wrap">
              <Button
                onClick={handleDecode}
                className="gradient-btn text-white border-0"
              >
                Decode
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

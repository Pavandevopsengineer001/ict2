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

export default function TimestampConverterPage() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'toDate' | 'toTimestamp'>('toDate')
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')

  const handleConvert = () => {
    try {
      setError('')
      let result
      if (mode === 'toDate') {
        result = developerTools.timestampToDate(input)
      } else {
        result = developerTools.dateToTimestamp(input)
      }
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
          title="Timestamp Converter"
          description="Convert between Unix timestamps and dates"
          onCopy={handleCopy}
          copiedText={copied}
        >
          <div className="space-y-6">
            <div className="flex gap-3">
              <Button
                onClick={() => setMode('toDate')}
                variant={mode === 'toDate' ? 'default' : 'outline'}
                className={mode === 'toDate' ? 'gradient-btn text-white' : 'border-border/50'}
              >
                Timestamp → Date
              </Button>
              <Button
                onClick={() => setMode('toTimestamp')}
                variant={mode === 'toTimestamp' ? 'default' : 'outline'}
                className={mode === 'toTimestamp' ? 'gradient-btn text-white' : 'border-border/50'}
              >
                Date → Timestamp
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ToolInput
                value={input}
                onChange={setInput}
                placeholder={mode === 'toDate' ? 'Enter Unix timestamp...' : 'Enter date (YYYY-MM-DD)...'}
                label="Input"
                type="text"
              />
              <ToolOutput
                value={output}
                label="Output"
                isEmpty={!output}
              />
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            <div className="flex gap-3 flex-wrap">
              <Button
                onClick={handleConvert}
                className="gradient-btn text-white border-0"
              >
                Convert
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

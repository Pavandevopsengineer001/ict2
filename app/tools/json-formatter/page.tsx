'use client'

import { useState } from 'react'
import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { ToolInput } from '@/components/tools/ToolInput'
import { ToolOutput } from '@/components/tools/ToolOutput'
import { developerTools } from '@/lib/toolUtils'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'

export default function JSONFormatterPage() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const handleFormat = () => {
    try {
      setError('')
      const result = developerTools.formatJson(input)
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

  const handleDownload = () => {
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(output))
    element.setAttribute('download', 'formatted.json')
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ToolLayout
          title="JSON Formatter"
          description="Format and beautify your JSON code with proper indentation and syntax highlighting"
          onCopy={handleCopy}
          onDownload={handleDownload}
          copiedText={copied}
          explanation={
            <div className="space-y-4 text-gray-300">
              <p>
                JSON (JavaScript Object Notation) is a widely-used data format for APIs, configuration files, and data storage. Our JSON Formatter helps you:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Beautify minified JSON with proper indentation</li>
                <li>Validate JSON syntax instantly</li>
                <li>Make JSON readable and easier to understand</li>
                <li>Export formatted JSON as files</li>
              </ul>
            </div>
          }
          howTo={
            <div className="space-y-4 text-gray-300">
              <ol className="list-decimal list-inside space-y-3">
                <li>Paste your JSON code in the input field</li>
                <li>Click the &quot;Format&quot; button</li>
                <li>The formatted JSON will appear in the output field</li>
                <li>Use &quot;Copy&quot; to copy to clipboard or &quot;Download&quot; to save as a file</li>
              </ol>
            </div>
          }
          faq={
            <div className="space-y-4 text-gray-300">
              <div>
                <h4 className="font-semibold text-white mb-2">What is JSON?</h4>
                <p>JSON is a lightweight data format that is language-independent and human-readable, commonly used in web development and APIs.</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Why format JSON?</h4>
                <p>Formatting JSON makes it easier to read and debug, improving code quality and reducing errors in development.</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Is my data secure?</h4>
                <p>Yes! All formatting happens locally in your browser. Your data never leaves your device.</p>
              </div>
            </div>
          }
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ToolInput
                value={input}
                onChange={setInput}
                placeholder="Paste your JSON here..."
                label="Input JSON"
                rows={8}
              />
              <ToolOutput
                value={output}
                label="Formatted JSON"
                isEmpty={!output}
                emptyMessage="Formatted output will appear here..."
              />
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400">
                <p className="font-semibold">Error:</p>
                <p className="text-sm">{error}</p>
              </div>
            )}

            <div className="flex gap-3 flex-wrap">
              <Button
                onClick={handleFormat}
                className="gradient-btn text-white border-0"
              >
                Format
              </Button>
              <Button
                onClick={handleClear}
                variant="outline"
                className="border-border/50"
              >
                Clear
              </Button>
              {output && (
                <>
                  <Button
                    onClick={handleCopy}
                    variant="outline"
                    className="border-border/50 gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    {copied ? 'Copied!' : 'Copy'}
                  </Button>
                  <Button
                    onClick={handleDownload}
                    variant="outline"
                    className="border-border/50"
                  >
                    Download
                  </Button>
                </>
              )}
            </div>
          </div>
        </ToolLayout>
      </main>
      <Footer />
    </div>
  )
}

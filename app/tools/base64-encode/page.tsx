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

export default function Base64EncodePage() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const handleEncode = () => {
    try {
      const result = developerTools.base64Encode(input)
      setOutput(result)
    } catch (e) {
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
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ToolLayout
          title="Base64 Encode"
          description="Encode text to Base64 format for data transmission and storage"
          onCopy={handleCopy}
          copiedText={copied}
          explanation={
            <div className="space-y-4 text-gray-300">
              <p>
                Base64 is a encoding scheme that converts binary data into ASCII text format. It's commonly used for:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Email attachments and data transmission</li>
                <li>Embedding images in HTML or CSS</li>
                <li>Data obfuscation and storage</li>
                <li>API token and credential encoding</li>
              </ul>
            </div>
          }
          howTo={
            <div className="space-y-4 text-gray-300">
              <ol className="list-decimal list-inside space-y-3">
                <li>Enter or paste the text you want to encode</li>
                <li>Click the &quot;Encode&quot; button</li>
                <li>The Base64 encoded result will appear</li>
                <li>Use &quot;Copy&quot; to copy the result</li>
              </ol>
            </div>
          }
          faq={
            <div className="space-y-4 text-gray-300">
              <div>
                <h4 className="font-semibold text-white mb-2">What is Base64?</h4>
                <p>Base64 is a binary-to-text encoding scheme that represents binary data in ASCII string format using 64 printable characters.</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">When to use Base64?</h4>
                <p>Use Base64 when you need to transmit binary data over text-only channels or embed binary content in text-based formats.</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Is Base64 secure?</h4>
                <p>No, Base64 is an encoding scheme, not encryption. It's reversible and shouldn't be used for security purposes.</p>
              </div>
            </div>
          }
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
                label="Base64 Encoded"
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

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Copy, RefreshCw } from "lucide-react"

export default function HtmlEncodeTool() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")

  const encode = () => {
    const encoded = input
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;")
      .replace(/\//g, "&#x2F;")
    setOutput(encoded)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
  }

  const clear = () => {
    setInput("")
    setOutput("")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Plain Text Input</label>
              <Textarea
                placeholder="Enter text to HTML encode (e.g., <script>alert('XSS')</script>)"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={4}
                className="font-mono"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={encode}>Encode</Button>
              <Button variant="outline" onClick={clear}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>

            {output && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium">Encoded Output</label>
                  <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <Textarea
                  value={output}
                  readOnly
                  rows={4}
                  className="font-mono bg-muted"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

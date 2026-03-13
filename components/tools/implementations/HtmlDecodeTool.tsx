"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Copy, RefreshCw } from "lucide-react"

export default function HtmlDecodeTool() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")

  const decode = () => {
    const decoded = input
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&#x2F;/g, "/")
      .replace(/&nbsp;/g, " ")
      .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(dec))
      .replace(/&#x([0-9A-Fa-f]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    setOutput(decoded)
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
              <label className="block text-sm font-medium mb-2">HTML-Encoded Input</label>
              <Textarea
                placeholder="Enter HTML-encoded text (e.g., &lt;script&gt;)"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={4}
                className="font-mono"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={decode}>Decode</Button>
              <Button variant="outline" onClick={clear}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>

            {output && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium">Decoded Output</label>
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

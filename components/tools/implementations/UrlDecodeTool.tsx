"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Copy, RefreshCw } from "lucide-react"

export default function UrlDecodeTool() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")

  const decode = () => {
    try {
      setError("")
      const decoded = decodeURIComponent(input)
      setOutput(decoded)
    } catch (e) {
      setError("Invalid URL-encoded string")
      setOutput("")
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
  }

  const clear = () => {
    setInput("")
    setOutput("")
    setError("")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">URL-Encoded Input</label>
              <Textarea
                placeholder="Enter URL-encoded text (e.g., Hello%20World)"
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

            {error && (
              <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">
                {error}
              </div>
            )}

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

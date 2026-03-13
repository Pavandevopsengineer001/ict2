"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Copy, RefreshCw } from "lucide-react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function TextReverserTool() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [mode, setMode] = useState<"characters" | "words" | "lines">("characters")

  const reverse = () => {
    let result = ""
    switch (mode) {
      case "characters":
        result = input.split("").reverse().join("")
        break
      case "words":
        result = input.split(/\s+/).reverse().join(" ")
        break
      case "lines":
        result = input.split("\n").reverse().join("\n")
        break
    }
    setOutput(result)
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
              <label className="block text-sm font-medium mb-2">Input Text</label>
              <Textarea
                placeholder="Enter text to reverse"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Reverse Mode</label>
              <RadioGroup value={mode} onValueChange={(v) => setMode(v as typeof mode)} className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="characters" id="characters" />
                  <Label htmlFor="characters">Characters</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="words" id="words" />
                  <Label htmlFor="words">Words</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="lines" id="lines" />
                  <Label htmlFor="lines">Lines</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex gap-2">
              <Button onClick={reverse}>Reverse</Button>
              <Button variant="outline" onClick={clear}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>

            {output && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium">Reversed Output</label>
                  <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <Textarea
                  value={output}
                  readOnly
                  rows={4}
                  className="bg-muted"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

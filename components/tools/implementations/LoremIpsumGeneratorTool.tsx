"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Copy, RefreshCw } from "lucide-react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const LOREM_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
  "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
  "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
  "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
  "deserunt", "mollit", "anim", "id", "est", "laborum"
]

export default function LoremIpsumGeneratorTool() {
  const [output, setOutput] = useState("")
  const [count, setCount] = useState(3)
  const [type, setType] = useState<"paragraphs" | "sentences" | "words">("paragraphs")

  const generateWord = () => LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]

  const generateSentence = () => {
    const length = Math.floor(Math.random() * 10) + 5
    const words = Array.from({ length }, generateWord)
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1)
    return words.join(" ") + "."
  }

  const generateParagraph = () => {
    const length = Math.floor(Math.random() * 4) + 4
    return Array.from({ length }, generateSentence).join(" ")
  }

  const generate = () => {
    let result = ""
    switch (type) {
      case "words":
        result = Array.from({ length: count }, generateWord).join(" ")
        break
      case "sentences":
        result = Array.from({ length: count }, generateSentence).join(" ")
        break
      case "paragraphs":
        result = Array.from({ length: count }, generateParagraph).join("\n\n")
        break
    }
    setOutput(result)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Count</label>
                <Input
                  type="number"
                  min={1}
                  max={100}
                  value={count}
                  onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Type</label>
                <RadioGroup value={type} onValueChange={(v) => setType(v as typeof type)} className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="paragraphs" id="paragraphs" />
                    <Label htmlFor="paragraphs">Paragraphs</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sentences" id="sentences" />
                    <Label htmlFor="sentences">Sentences</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="words" id="words" />
                    <Label htmlFor="words">Words</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={generate}>Generate</Button>
            </div>

            {output && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium">Generated Text</label>
                  <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <Textarea
                  value={output}
                  readOnly
                  rows={10}
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

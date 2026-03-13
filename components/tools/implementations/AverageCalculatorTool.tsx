"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

export default function AverageCalculatorTool() {
  const [input, setInput] = useState("")
  const [result, setResult] = useState<{
    count: number
    sum: number
    mean: number
    median: number
    mode: number[]
    min: number
    max: number
    range: number
  } | null>(null)

  const calculate = () => {
    const numbers = input
      .split(/[,\s\n]+/)
      .map((s) => parseFloat(s.trim()))
      .filter((n) => !isNaN(n))

    if (numbers.length === 0) return

    const sorted = [...numbers].sort((a, b) => a - b)
    const sum = numbers.reduce((a, b) => a + b, 0)
    const mean = sum / numbers.length
    
    // Median
    const mid = Math.floor(sorted.length / 2)
    const median = sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2

    // Mode
    const frequency: Record<number, number> = {}
    numbers.forEach((n) => (frequency[n] = (frequency[n] || 0) + 1))
    const maxFreq = Math.max(...Object.values(frequency))
    const mode = Object.entries(frequency)
      .filter(([_, freq]) => freq === maxFreq)
      .map(([num]) => parseFloat(num))

    setResult({
      count: numbers.length,
      sum,
      mean,
      median,
      mode: maxFreq > 1 ? mode : [],
      min: sorted[0],
      max: sorted[sorted.length - 1],
      range: sorted[sorted.length - 1] - sorted[0],
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">
                Enter Numbers (separated by commas, spaces, or new lines)
              </label>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter numbers: 10, 20, 30, 40, 50"
                rows={4}
              />
            </div>

            <Button onClick={calculate} className="w-full">
              Calculate
            </Button>

            {result && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-primary/10 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Mean (Average)</p>
                  <p className="text-xl font-bold">{result.mean.toFixed(2)}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Median</p>
                  <p className="text-xl font-bold">{result.median.toFixed(2)}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Mode</p>
                  <p className="text-xl font-bold">
                    {result.mode.length > 0 ? result.mode.join(", ") : "N/A"}
                  </p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Count</p>
                  <p className="text-xl font-bold">{result.count}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Sum</p>
                  <p className="text-xl font-bold">{result.sum.toFixed(2)}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Min</p>
                  <p className="text-xl font-bold">{result.min}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Max</p>
                  <p className="text-xl font-bold">{result.max}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Range</p>
                  <p className="text-xl font-bold">{result.range}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

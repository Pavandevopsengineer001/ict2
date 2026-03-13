"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export default function SimpleInterestCalculatorTool() {
  const [principal, setPrincipal] = useState(10000)
  const [rate, setRate] = useState(5)
  const [time, setTime] = useState(5)
  const [result, setResult] = useState<{
    interest: number
    totalAmount: number
  } | null>(null)

  const calculate = () => {
    const interest = (principal * rate * time) / 100
    const totalAmount = principal + interest
    setResult({ interest, totalAmount })
  }

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n)

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">Principal Amount ($)</label>
                <Input
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(parseFloat(e.target.value) || 0)}
                  min={0}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Annual Interest Rate (%)</label>
                <Input
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
                  min={0}
                  max={100}
                  step={0.1}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Time Period (Years)</label>
                <Input
                  type="number"
                  value={time}
                  onChange={(e) => setTime(parseFloat(e.target.value) || 0)}
                  min={0}
                />
              </div>
            </div>

            <Button onClick={calculate} className="w-full">
              Calculate
            </Button>

            {result && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Principal</p>
                  <p className="text-xl font-bold">{formatCurrency(principal)}</p>
                </div>
                <div className="p-4 bg-green-500/10 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Interest Earned</p>
                  <p className="text-xl font-bold text-green-600">
                    {formatCurrency(result.interest)}
                  </p>
                </div>
                <div className="p-4 bg-primary/10 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="text-xl font-bold">{formatCurrency(result.totalAmount)}</p>
                </div>
              </div>
            )}

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-2">Formula:</p>
              <code className="text-sm">Simple Interest = (P × R × T) / 100</code>
              <p className="text-xs text-muted-foreground mt-2">
                Where P = Principal, R = Rate (%), T = Time (years)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function GstCalculatorTool() {
  const [mode, setMode] = useState<"add" | "remove">("add")
  const [amount, setAmount] = useState(1000)
  const [gstRate, setGstRate] = useState(18)
  const [result, setResult] = useState<{
    gstAmount: number
    netAmount: number
    grossAmount: number
  } | null>(null)

  const calculate = () => {
    if (mode === "add") {
      const gstAmount = (amount * gstRate) / 100
      setResult({
        netAmount: amount,
        gstAmount,
        grossAmount: amount + gstAmount,
      })
    } else {
      const netAmount = (amount * 100) / (100 + gstRate)
      const gstAmount = amount - netAmount
      setResult({
        netAmount,
        gstAmount,
        grossAmount: amount,
      })
    }
  }

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n)

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <Tabs value={mode} onValueChange={(v) => setMode(v as "add" | "remove")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="add">Add GST</TabsTrigger>
                <TabsTrigger value="remove">Remove GST</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">
                  {mode === "add" ? "Net Amount ($)" : "Gross Amount ($)"}
                </label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                  min={0}
                />
              </div>
              <div>
                <label className="text-sm font-medium">GST Rate (%)</label>
                <Input
                  type="number"
                  value={gstRate}
                  onChange={(e) => setGstRate(parseFloat(e.target.value) || 0)}
                  min={0}
                  max={100}
                  step={0.5}
                />
              </div>
            </div>

            <Button onClick={calculate} className="w-full">
              Calculate
            </Button>

            {result && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Net Amount</p>
                  <p className="text-xl font-bold">{formatCurrency(result.netAmount)}</p>
                </div>
                <div className="p-4 bg-yellow-500/10 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">GST ({gstRate}%)</p>
                  <p className="text-xl font-bold text-yellow-600">
                    {formatCurrency(result.gstAmount)}
                  </p>
                </div>
                <div className="p-4 bg-primary/10 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Gross Amount</p>
                  <p className="text-xl font-bold">{formatCurrency(result.grossAmount)}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

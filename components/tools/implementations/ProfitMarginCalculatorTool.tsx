"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export default function ProfitMarginCalculatorTool() {
  const [cost, setCost] = useState(50)
  const [revenue, setRevenue] = useState(100)
  const [result, setResult] = useState<{
    profit: number
    profitMargin: number
    markup: number
  } | null>(null)

  const calculate = () => {
    const profit = revenue - cost
    const profitMargin = (profit / revenue) * 100
    const markup = (profit / cost) * 100
    setResult({ profit, profitMargin, markup })
  }

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n)

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Cost ($)</label>
                <Input
                  type="number"
                  value={cost}
                  onChange={(e) => setCost(parseFloat(e.target.value) || 0)}
                  min={0}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Revenue / Selling Price ($)</label>
                <Input
                  type="number"
                  value={revenue}
                  onChange={(e) => setRevenue(parseFloat(e.target.value) || 0)}
                  min={0}
                />
              </div>
            </div>

            <Button onClick={calculate} className="w-full">
              Calculate
            </Button>

            {result && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-green-500/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Profit</p>
                    <p className={`text-xl font-bold ${result.profit >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {formatCurrency(result.profit)}
                    </p>
                  </div>
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Profit Margin</p>
                    <p className="text-xl font-bold">{result.profitMargin.toFixed(2)}%</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Markup</p>
                    <p className="text-xl font-bold">{result.markup.toFixed(2)}%</p>
                  </div>
                </div>

                <div className="p-4 bg-muted rounded-lg text-sm">
                  <p className="font-medium mb-2">Formulas:</p>
                  <p>Profit = Revenue - Cost</p>
                  <p>Profit Margin = (Profit / Revenue) x 100</p>
                  <p>Markup = (Profit / Cost) x 100</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

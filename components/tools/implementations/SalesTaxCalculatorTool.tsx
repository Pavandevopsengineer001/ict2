"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export default function SalesTaxCalculatorTool() {
  const [price, setPrice] = useState(100)
  const [taxRate, setTaxRate] = useState(8.25)
  const [result, setResult] = useState<{
    taxAmount: number
    totalPrice: number
  } | null>(null)

  const calculate = () => {
    const taxAmount = (price * taxRate) / 100
    const totalPrice = price + taxAmount
    setResult({ taxAmount, totalPrice })
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
                <label className="text-sm font-medium">Price Before Tax ($)</label>
                <Input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                  min={0}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Sales Tax Rate (%)</label>
                <Input
                  type="number"
                  value={taxRate}
                  onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                  min={0}
                  max={100}
                  step={0.01}
                />
              </div>
            </div>

            <Button onClick={calculate} className="w-full">
              Calculate Tax
            </Button>

            {result && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Original Price</p>
                  <p className="text-xl font-bold">{formatCurrency(price)}</p>
                </div>
                <div className="p-4 bg-red-500/10 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Sales Tax</p>
                  <p className="text-xl font-bold text-red-600">
                    + {formatCurrency(result.taxAmount)}
                  </p>
                </div>
                <div className="p-4 bg-primary/10 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Total Price</p>
                  <p className="text-xl font-bold">{formatCurrency(result.totalPrice)}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { calculators } from '@/lib/toolUtils'
import { Button } from '@/components/ui/button'

export default function DiscountCalculatorPage() {

  const [price, setPrice] = useState('')
  const [discount, setDiscount] = useState('')
  const [currency, setCurrency] = useState('$')

  const [result, setResult] = useState<{
    discountAmount: number
    finalPrice: number
    savings: number
  } | null>(null)

  const handleCalculate = () => {

    const p = parseFloat(price)
    const d = parseFloat(discount)

    if (!isNaN(p) && !isNaN(d)) {

      const calc = calculators.calculateDiscount(p, d)

      setResult({
        discountAmount: calc.discountAmount,
        finalPrice: calc.finalPrice,
        savings: calc.savings
      })
    }
  }

  const handleClear = () => {
    setPrice('')
    setDiscount('')
    setResult(null)
  }

  return (
    <div className="min-h-screen bg-background">

      <Header />

      <main>

        <ToolLayout
          title="Discount Calculator"
          description="Calculate discounts, savings and final sale prices instantly."
        >

          <div className="space-y-6 max-w-2xl">

            <div className="card-glass p-8 rounded-lg space-y-6">

              {/* Currency Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Currency
                </label>

                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border/50 text-white"
                >
                  <option value="$">USD ($)</option>
                  <option value="€">EUR (€)</option>
                  <option value="₹">INR (₹)</option>
                  <option value="£">GBP (£)</option>
                  <option value="¥">JPY (¥)</option>
                </select>
              </div>

              {/* Original Price */}
              <div>

                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Original Price
                </label>

                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter price..."
                  step="0.01"
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary text-white placeholder-gray-500"
                />

              </div>

              {/* Discount */}
              <div>

                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Discount (%)
                </label>

                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  placeholder="Enter discount percentage..."
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary text-white placeholder-gray-500"
                />

              </div>

              {/* Result */}
              {result && (

                <div className="space-y-4 border-t border-border/50 pt-6">

                  {/* Savings */}
                  <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg">

                    <p className="text-sm text-gray-400 mb-1">
                      You Save
                    </p>

                    <p className="text-2xl font-bold text-red-400">
                      {currency}{result.savings.toFixed(2)}
                    </p>

                  </div>

                  {/* Final Price */}
                  <div className="p-5 bg-accent/10 border border-accent/50 rounded-lg">

                    <p className="text-sm text-gray-400 mb-1">
                      Final Price
                    </p>

                    <p className="text-4xl font-bold bg-gradient-to-r from-accent to-green-500 bg-clip-text text-transparent">
                      {currency}{result.finalPrice.toFixed(2)}
                    </p>

                  </div>

                  {/* Explanation */}
                  <div className="text-sm text-gray-400">

                    <p>
                      Discount = {price} × {discount} / 100 = {currency}{result.discountAmount.toFixed(2)}
                    </p>

                    <p>
                      Final Price = {price} - {result.discountAmount.toFixed(2)} = {currency}{result.finalPrice.toFixed(2)}
                    </p>

                  </div>

                </div>

              )}

              {/* Buttons */}
              <div className="flex gap-3 flex-wrap">

                <Button
                  onClick={handleCalculate}
                  className="bg-accent text-accent-foreground"
                >
                  Calculate
                </Button>

                <Button
                  onClick={handleClear}
                  variant="outline"
                  className="border-border/50"
                >
                  Clear
                </Button>

              </div>

            </div>

          </div>

        </ToolLayout>

      </main>

      <Footer />

    </div>
  )
}
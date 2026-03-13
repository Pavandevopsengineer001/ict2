'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { calculators } from '@/lib/toolUtils'
import { Button } from '@/components/ui/button'

type Mode =
  | 'percentOf'
  | 'whatPercent'
  | 'increase'
  | 'decrease'

export default function PercentageCalculatorPage() {

  const [mode, setMode] = useState<Mode>('percentOf')
  const [amount, setAmount] = useState('')
  const [percent, setPercent] = useState('')
  const [result, setResult] = useState<number | null>(null)
  const [formula, setFormula] = useState('')

  const getLabels = () => {

    if (mode === 'whatPercent') {
      return {
        label1: 'Value (X)',
        label2: 'Total (Y)',
        placeholder1: 'Enter the value...',
        placeholder2: 'Enter the total...'
      }
    }

    if (mode === 'percentOf') {
      return {
        label1: 'Number',
        label2: 'Percentage (%)',
        placeholder1: 'Enter the number...',
        placeholder2: 'Enter the percentage...'
      }
    }

    if (mode === 'increase') {
      return {
        label1: 'Original Amount',
        label2: 'Increase (%)',
        placeholder1: 'Enter original amount...',
        placeholder2: 'Enter increase %...'
      }
    }

    if (mode === 'decrease') {
      return {
        label1: 'Original Amount',
        label2: 'Decrease (%)',
        placeholder1: 'Enter original amount...',
        placeholder2: 'Enter decrease %...'
      }
    }

    return {
      label1: 'Number',
      label2: 'Percentage',
      placeholder1: '',
      placeholder2: ''
    }
  }

  const labels = getLabels()

  const handleCalculate = () => {

    const a = parseFloat(amount)
    const p = parseFloat(percent)

    if (isNaN(a) || isNaN(p)) return

    let value = 0
    let formulaText = ''

    if (mode === 'percentOf') {

      value = calculators.calculatePercentageOf(a, p)
      formulaText = `${a} × ${p} / 100 = ${value}`

    }

    if (mode === 'whatPercent') {

      value = calculators.calculatePercentOfNumber(a, p)
      formulaText = `(${a} ÷ ${p}) × 100 = ${value}%`

    }

    if (mode === 'increase') {

      value = calculators.calculateIncrease(a, p)
      formulaText = `${a} + (${a} × ${p} / 100) = ${value}`

    }

    if (mode === 'decrease') {

      value = calculators.calculateDecrease(a, p)
      formulaText = `${a} - (${a} × ${p} / 100) = ${value}`

    }

    setResult(value)
    setFormula(formulaText)
  }

  const handleClear = () => {
    setAmount('')
    setPercent('')
    setResult(null)
    setFormula('')
  }

  return (
    <div className="min-h-screen bg-background">

      <Header />

      <main>

        <ToolLayout
          title="Percentage Calculator"
          description="Calculate percentages, percentage increases, decreases and relationships between numbers."
        >

          <div className="space-y-6 max-w-2xl">

            <div className="card-glass p-8 rounded-lg space-y-6">

              {/* Calculation Mode */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Calculation Type
                </label>

                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value as Mode)}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border/50 text-white"
                >

                  <option value="percentOf">
                    What is % of a number
                  </option>

                  <option value="whatPercent">
                    X is what % of Y
                  </option>

                  <option value="increase">
                    Percentage Increase
                  </option>

                  <option value="decrease">
                    Percentage Decrease
                  </option>

                </select>
              </div>

              {/* Input 1 */}
              <div>

                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {labels.label1}
                </label>

                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder={labels.placeholder1}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary text-white"
                />

              </div>

              {/* Input 2 */}
              <div>

                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {labels.label2}
                </label>

                <input
                  type="number"
                  value={percent}
                  onChange={(e) => setPercent(e.target.value)}
                  placeholder={labels.placeholder2}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary text-white"
                />

              </div>

              {/* Result */}
              {result !== null && (

                <div className="p-6 bg-primary/10 border border-primary/50 rounded-lg">

                  <p className="text-sm text-gray-400 mb-2">
                    Result
                  </p>

                  <p className="text-4xl font-bold text-primary">

                    {mode === 'whatPercent'
                      ? `${result.toFixed(2)}%`
                      : result.toFixed(2)
                    }

                  </p>

                  {/* Formula */}
                  <p className="text-sm text-gray-400 mt-3">
                    {formula}
                  </p>

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
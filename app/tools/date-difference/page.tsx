'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { calculators } from '@/lib/toolUtils'
import { Button } from '@/components/ui/button'

export default function DateDifferencePage() {

  const [date1, setDate1] = useState('')
  const [date2, setDate2] = useState('')
  const [result, setResult] = useState<any>(null)

  const handleCalculate = () => {

    if (date1 && date2) {

      const d1 = new Date(date1)
      const d2 = new Date(date2)

      const diff = calculators.dateDifference(d1, d2)

      setResult(diff)

    }

  }

  const handleClear = () => {

    setDate1('')
    setDate2('')
    setResult(null)

  }

  return (
    <div className="min-h-screen bg-background">

      <Header />

      <main>

        <ToolLayout
          title="Date Difference Calculator"
          description="Calculate the exact difference between two dates including years, months, days and total time."
        >

          <div className="space-y-6 max-w-2xl">

            <div className="card-glass p-8 rounded-lg space-y-6">

              {/* FIRST DATE */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  First Date
                </label>

                <input
                  type="date"
                  value={date1}
                  onChange={(e) => setDate1(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary text-white"
                />
              </div>

              {/* SECOND DATE */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Second Date
                </label>

                <input
                  type="date"
                  value={date2}
                  onChange={(e) => setDate2(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary text-white"
                />
              </div>

              {/* RESULT */}
              {result && (

                <div className="space-y-6 border-t border-border/50 pt-6">

                  {/* MAIN RESULT */}
                  <div className="p-6 rounded-xl border border-primary/30 bg-primary/10 text-center">

                    <p className="text-sm text-muted-foreground mb-2">
                      Exact Difference
                    </p>

                    <p className="text-3xl md:text-4xl font-bold text-primary">

                      {result.years} Years {result.months} Months {result.days} Days

                    </p>

                  </div>

                  {/* ADDITIONAL DATA */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">

                    <StatBox label="Total Days" value={result.totalDays} />

                    <StatBox label="Total Weeks" value={result.weeks} />

                    <StatBox label="Total Hours" value={result.totalHours} />

                    <StatBox label="Total Minutes" value={result.totalMinutes} />

                    <StatBox label="Total Seconds" value={result.totalSeconds} />

                  </div>

                </div>

              )}

              {/* BUTTONS */}
              <div className="flex gap-3 flex-wrap">

                <Button
                  onClick={handleCalculate}
                  className="bg-secondary text-secondary-foreground border-0"
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


/* STAT BOX */

function StatBox({ label, value }: { label: string; value: number }) {

  return (
    <div className="p-4 bg-background/50 rounded-lg border border-border/50 text-center">

      <p className="text-xs text-muted-foreground mb-1">
        {label}
      </p>

      <p className="text-xl font-semibold text-primary">
        {value.toLocaleString()}
      </p>

    </div>
  )

}
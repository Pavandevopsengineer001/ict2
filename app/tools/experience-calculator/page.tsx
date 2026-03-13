'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { calculators } from '@/lib/toolUtils'
import { Button } from '@/components/ui/button'

export default function ExperienceCalculatorPage() {

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [result, setResult] = useState<any>(null)

  const handleCalculate = () => {

    if (!startDate) return

    const start = new Date(startDate)
    const end = endDate ? new Date(endDate) : new Date()

    const diff = calculators.calculateExperience(start, end)

    setResult(diff)

  }

  const handleClear = () => {

    setStartDate('')
    setEndDate('')
    setResult(null)

  }

  return (
    <div className="min-h-screen bg-background">

      <Header />

      <main>

        <ToolLayout
          title="Experience Calculator"
          description="Calculate total job experience, work experience, and employment duration between two dates."
        >

          <div className="space-y-6 max-w-2xl">

            <div className="card-glass p-8 rounded-lg space-y-6">

              {/* Joining Date */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Joining Date
                </label>

                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary text-white"
                />
              </div>

              {/* End Date */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  End Date (Leave empty for Present)
                </label>

                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary text-white"
                />
              </div>

              {/* RESULT */}
              {result && (

                <div className="space-y-6 border-t border-border/50 pt-6">

                  {/* MAIN RESULT */}
                  <div className="p-6 rounded-xl border border-primary/30 bg-primary/10 text-center">

                    <p className="text-sm text-muted-foreground mb-2">
                      Total Experience
                    </p>

                    <p className="text-3xl md:text-4xl font-bold text-primary">

                      {result.years} Years {result.months} Months {result.days} Days

                    </p>

                  </div>

                  {/* DETAILS */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">

                    <StatBox label="Total Months" value={result.totalMonths} />
                    <StatBox label="Total Weeks" value={result.totalWeeks} />
                    <StatBox label="Total Days" value={result.totalDays} />
                    <StatBox label="Total Hours" value={result.totalHours} />

                  </div>

                  {/* PRO SECTION */}
                  <div className="p-5 rounded-xl border border-secondary/40 bg-secondary/10">

                    <p className="text-sm text-muted-foreground mb-3">
                      Pro Insights
                    </p>

                    <div className="grid grid-cols-2 gap-3">

                      <StatBox
                        label="Resume Experience"
                        value={Number(result.resumeYears)}
                      />

                      <StatBox
                        label="Working Days"
                        value={result.workingDays}
                      />

                    </div>

                  </div>

                </div>

              )}

              {/* BUTTONS */}
              <div className="flex gap-3 flex-wrap">

                <Button
                  onClick={handleCalculate}
                  className="bg-secondary text-secondary-foreground"
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
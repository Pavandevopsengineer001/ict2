'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { calculators } from '@/lib/toolUtils'
import { Button } from '@/components/ui/button'

type AgeResult = {
  years: number
  months: number
  days: number
  totalDays: number
  hours: number
  minutes: number
  seconds: number
  nextBirthday: Date
  daysUntilBirthday: number
}

export default function AgeCalculatorPage() {
  const [birthDate, setBirthDate] = useState('')
  const [birthTime, setBirthTime] = useState('')
  const [age, setAge] = useState<AgeResult | null>(null)

  const handleCalculate = () => {
    if (birthDate) {
      let dateString = birthDate

      if (birthTime) {
        dateString += `T${birthTime}`
      }

      const date = new Date(dateString)

      const result = calculators.calculateAgeDetailed(date)

      setAge(result)
    }
  }

  const handleClear = () => {
    setBirthDate('')
    setBirthTime('')
    setAge(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <ToolLayout
          title="Age Calculator"
          description="Calculate your exact age in years, months, days and more."
        >
          <div className="space-y-6 max-w-2xl">

            {/* INPUT CARD */}
            <div className="card-glass p-8 rounded-lg space-y-6">

              {/* Birth Date */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Birth Date
                </label>

                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary text-white"
                />
              </div>

              {/* Birth Time (optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Birth Time (optional)
                </label>

                <input
                  type="time"
                  value={birthTime}
                  onChange={(e) => setBirthTime(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary text-white"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 flex-wrap">
                <Button
                  onClick={handleCalculate}
                  className="bg-accent text-accent-foreground"
                >
                  Calculate Age
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

            {/* RESULT SECTION */}
            {age !== null && (
              <div className="space-y-6">

                {/* AGE BREAKDOWN */}
                <div className="p-6 bg-primary/10 border border-primary/50 rounded-lg">
                  <p className="text-sm text-gray-400 mb-3">Your Age</p>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-3xl font-bold text-primary">
                        {age.years}
                      </p>
                      <p className="text-xs text-gray-400">Years</p>
                    </div>

                    <div>
                      <p className="text-3xl font-bold text-primary">
                        {age.months}
                      </p>
                      <p className="text-xs text-gray-400">Months</p>
                    </div>

                    <div>
                      <p className="text-3xl font-bold text-primary">
                        {age.days}
                      </p>
                      <p className="text-xs text-gray-400">Days</p>
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm mt-3">
                    Born on {new Date(birthDate).toLocaleDateString()}
                  </p>
                </div>

                {/* TIME DETAILS (ONLY IF TIME PROVIDED) */}
                {birthTime && (
                  <div className="p-6 bg-card border border-border rounded-lg">

                    <p className="text-sm text-gray-400 mb-3">
                      Detailed Time
                    </p>

                    <div className="grid grid-cols-3 gap-4 text-center">

                      <div>
                        <p className="text-xl font-semibold">
                          {age.hours}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Hours
                        </p>
                      </div>

                      <div>
                        <p className="text-xl font-semibold">
                          {age.minutes}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Minutes
                        </p>
                      </div>

                      <div>
                        <p className="text-xl font-semibold">
                          {age.seconds}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Seconds
                        </p>
                      </div>

                    </div>
                  </div>
                )}

                {/* TOTAL LIFE STATS */}
                <div className="p-6 bg-card border border-border rounded-lg">

                  <p className="text-sm text-gray-400 mb-3">
                    Total Time Lived
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">

                    <div className="p-3 bg-muted rounded-lg">
                      <p className="font-semibold">
                        {age.totalDays}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Days
                      </p>
                    </div>

                    <div className="p-3 bg-muted rounded-lg">
                      <p className="font-semibold">
                        {age.hours}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Hours
                      </p>
                    </div>

                    <div className="p-3 bg-muted rounded-lg">
                      <p className="font-semibold">
                        {age.minutes}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Minutes
                      </p>
                    </div>

                    <div className="p-3 bg-muted rounded-lg">
                      <p className="font-semibold">
                        {age.seconds}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Seconds
                      </p>
                    </div>

                  </div>
                </div>

                {/* NEXT BIRTHDAY */}
                <div className="p-6 bg-card border border-border rounded-lg text-center">

                  <p className="text-sm text-gray-400 mb-2">
                    Next Birthday
                  </p>

                  <p className="text-lg font-semibold text-primary">
                    {age.nextBirthday.toLocaleDateString()}
                  </p>

                  <p className="text-muted-foreground text-sm mt-2">
                    {age.daysUntilBirthday} days remaining
                  </p>

                </div>

              </div>
            )}

          </div>
        </ToolLayout>
      </main>

      <Footer />
    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'
import { ToolLayout, ResultStats } from '@/components/tools/ToolLayout'
import { NumberInput, SelectInput } from '@/components/tools/ToolInput'
import { Calculator } from 'lucide-react'

export default function BmrCalculatorTool() {
  const [age, setAge] = useState('')
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [gender, setGender] = useState('male')
  const [unit, setUnit] = useState('metric')
  const [bmr, setBmr] = useState<number | null>(null)

  useEffect(() => {
    if (age && weight && height) {
      const a = parseFloat(age)
      let w = parseFloat(weight)
      let h = parseFloat(height)

      if (unit === 'imperial') {
        w = w * 0.453592 // lbs to kg
        h = h * 2.54 // inches to cm
      }

      if (a > 0 && w > 0 && h > 0) {
        // Mifflin-St Jeor Equation
        let calculatedBmr: number
        if (gender === 'male') {
          calculatedBmr = 10 * w + 6.25 * h - 5 * a + 5
        } else {
          calculatedBmr = 10 * w + 6.25 * h - 5 * a - 161
        }
        setBmr(Math.round(calculatedBmr))
      }
    } else {
      setBmr(null)
    }
  }, [age, weight, height, gender, unit])

  const handleClear = () => {
    setAge('')
    setWeight('')
    setHeight('')
    setBmr(null)
  }

  const activityLevels = bmr ? [
    { label: 'Sedentary (little or no exercise)', value: Math.round(bmr * 1.2) },
    { label: 'Lightly active (1-3 days/week)', value: Math.round(bmr * 1.375) },
    { label: 'Moderately active (3-5 days/week)', value: Math.round(bmr * 1.55) },
    { label: 'Very active (6-7 days/week)', value: Math.round(bmr * 1.725) },
    { label: 'Extra active (very hard exercise)', value: Math.round(bmr * 1.9) },
  ] : []

  return (
    <ToolLayout
      title="BMR Calculator"
      description="Calculate your Basal Metabolic Rate - the calories your body burns at rest"
      icon={<Calculator className="w-5 h-5" />}
      category="Health Calculator"
      features={['Mifflin-St Jeor Formula', 'Activity Multipliers', 'Daily Calorie Needs']}
      onClear={handleClear}
      hasOutput={bmr !== null}
      explanation={
        <div className="space-y-4">
          <p>
            Basal Metabolic Rate (BMR) is the number of calories your body needs to accomplish its most basic 
            life-sustaining functions, such as breathing, circulation, cell production, and nutrient processing.
          </p>
          <p>
            This calculator uses the Mifflin-St Jeor Equation, which is considered the most accurate formula 
            for calculating BMR.
          </p>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SelectInput
            label="Unit System"
            value={unit}
            onChange={setUnit}
            options={[
              { value: 'metric', label: 'Metric (kg, cm)' },
              { value: 'imperial', label: 'Imperial (lbs, inches)' },
            ]}
          />
          
          <SelectInput
            label="Gender"
            value={gender}
            onChange={setGender}
            options={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <NumberInput
            label="Age"
            value={age}
            onChange={setAge}
            placeholder="e.g., 30"
            suffix="years"
            min={1}
            max={120}
          />
          
          <NumberInput
            label={unit === 'metric' ? 'Weight (kg)' : 'Weight (lbs)'}
            value={weight}
            onChange={setWeight}
            placeholder={unit === 'metric' ? 'e.g., 70' : 'e.g., 154'}
            min={1}
            max={500}
          />
          
          <NumberInput
            label={unit === 'metric' ? 'Height (cm)' : 'Height (inches)'}
            value={height}
            onChange={setHeight}
            placeholder={unit === 'metric' ? 'e.g., 175' : 'e.g., 69'}
            min={50}
            max={300}
          />
        </div>

        {bmr !== null && (
          <div className="mt-8 space-y-6">
            <div className="text-center p-6 bg-card/50 rounded-xl border border-border/50">
              <p className="text-sm text-muted-foreground mb-2">Your Basal Metabolic Rate</p>
              <p className="text-5xl font-bold text-primary">{bmr.toLocaleString()}</p>
              <p className="text-lg mt-2 text-muted-foreground">calories/day</p>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Daily Calorie Needs by Activity Level
              </h3>
              {activityLevels.map((level, index) => (
                <div 
                  key={index}
                  className="flex justify-between items-center p-3 bg-card/30 rounded-lg border border-border/30"
                >
                  <span className="text-sm text-muted-foreground">{level.label}</span>
                  <span className="font-semibold text-primary">{level.value.toLocaleString()} cal</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}

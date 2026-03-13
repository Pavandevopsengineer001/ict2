'use client'

import { useState, useEffect } from 'react'
import { ToolLayout, ResultStats } from '@/components/tools/ToolLayout'
import { NumberInput, SelectInput } from '@/components/tools/ToolInput'
import { Calculator } from 'lucide-react'

export default function CalorieCalculatorTool() {
  const [age, setAge] = useState('')
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [gender, setGender] = useState('male')
  const [activity, setActivity] = useState('moderate')
  const [goal, setGoal] = useState('maintain')
  const [unit, setUnit] = useState('metric')
  const [calories, setCalories] = useState<number | null>(null)

  useEffect(() => {
    if (age && weight && height) {
      const a = parseFloat(age)
      let w = parseFloat(weight)
      let h = parseFloat(height)

      if (unit === 'imperial') {
        w = w * 0.453592
        h = h * 2.54
      }

      if (a > 0 && w > 0 && h > 0) {
        // BMR using Mifflin-St Jeor
        let bmr: number
        if (gender === 'male') {
          bmr = 10 * w + 6.25 * h - 5 * a + 5
        } else {
          bmr = 10 * w + 6.25 * h - 5 * a - 161
        }

        // Activity multiplier
        const activityMultipliers: Record<string, number> = {
          sedentary: 1.2,
          light: 1.375,
          moderate: 1.55,
          active: 1.725,
          'very-active': 1.9,
        }

        let tdee = bmr * activityMultipliers[activity]

        // Goal adjustment
        if (goal === 'lose') {
          tdee -= 500 // 0.5 kg/week loss
        } else if (goal === 'gain') {
          tdee += 500 // 0.5 kg/week gain
        }

        setCalories(Math.round(tdee))
      }
    } else {
      setCalories(null)
    }
  }, [age, weight, height, gender, activity, goal, unit])

  const handleClear = () => {
    setAge('')
    setWeight('')
    setHeight('')
    setCalories(null)
  }

  const macros = calories ? {
    protein: Math.round(calories * 0.3 / 4), // 30% calories, 4 cal/g
    carbs: Math.round(calories * 0.4 / 4), // 40% calories, 4 cal/g
    fat: Math.round(calories * 0.3 / 9), // 30% calories, 9 cal/g
  } : null

  return (
    <ToolLayout
      title="Calorie Calculator"
      description="Calculate your daily calorie needs based on your goals and activity level"
      icon={<Calculator className="w-5 h-5" />}
      category="Health Calculator"
      features={['Custom Goals', 'Macro Breakdown', 'Activity Levels']}
      onClear={handleClear}
      hasOutput={calories !== null}
      explanation={
        <div className="space-y-4">
          <p>
            This calculator estimates how many calories you need to eat each day based on your body metrics, 
            activity level, and goals. It uses the Mifflin-St Jeor equation to calculate your Basal Metabolic Rate 
            (BMR), then adjusts for activity and goals.
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SelectInput
            label="Activity Level"
            value={activity}
            onChange={setActivity}
            options={[
              { value: 'sedentary', label: 'Sedentary (little or no exercise)' },
              { value: 'light', label: 'Lightly active (1-3 days/week)' },
              { value: 'moderate', label: 'Moderately active (3-5 days/week)' },
              { value: 'active', label: 'Very active (6-7 days/week)' },
              { value: 'very-active', label: 'Extra active (hard exercise daily)' },
            ]}
          />
          
          <SelectInput
            label="Goal"
            value={goal}
            onChange={setGoal}
            options={[
              { value: 'lose', label: 'Lose weight' },
              { value: 'maintain', label: 'Maintain weight' },
              { value: 'gain', label: 'Gain weight' },
            ]}
          />
        </div>

        {calories !== null && macros && (
          <div className="mt-8 space-y-6">
            <div className="text-center p-6 bg-card/50 rounded-xl border border-border/50">
              <p className="text-sm text-muted-foreground mb-2">Daily Calorie Target</p>
              <p className="text-5xl font-bold text-primary">{calories.toLocaleString()}</p>
              <p className="text-lg mt-2 text-muted-foreground">calories/day</p>
            </div>

            <ResultStats
              stats={[
                { label: 'Protein', value: `${macros.protein}g`, highlight: true },
                { label: 'Carbs', value: `${macros.carbs}g` },
                { label: 'Fat', value: `${macros.fat}g` },
              ]}
            />
          </div>
        )}
      </div>
    </ToolLayout>
  )
}

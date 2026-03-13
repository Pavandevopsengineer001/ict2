'use client'

import { useState, useEffect } from 'react'
import { ToolLayout, ResultStats } from '@/components/tools/ToolLayout'
import { NumberInput, SelectInput } from '@/components/tools/ToolInput'
import { Calculator, Scale } from 'lucide-react'

export default function BmiCalculatorTool() {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [unit, setUnit] = useState('metric')
  const [bmi, setBmi] = useState<number | null>(null)
  const [category, setCategory] = useState('')

  useEffect(() => {
    if (weight && height) {
      const w = parseFloat(weight)
      const h = parseFloat(height)
      
      if (w > 0 && h > 0) {
        let calculatedBmi: number
        
        if (unit === 'metric') {
          // Height in cm, weight in kg
          const heightInMeters = h / 100
          calculatedBmi = w / (heightInMeters * heightInMeters)
        } else {
          // Height in inches, weight in pounds
          calculatedBmi = (w / (h * h)) * 703
        }
        
        setBmi(Math.round(calculatedBmi * 10) / 10)
        
        if (calculatedBmi < 18.5) {
          setCategory('Underweight')
        } else if (calculatedBmi < 25) {
          setCategory('Normal weight')
        } else if (calculatedBmi < 30) {
          setCategory('Overweight')
        } else {
          setCategory('Obese')
        }
      }
    } else {
      setBmi(null)
      setCategory('')
    }
  }, [weight, height, unit])

  const handleClear = () => {
    setWeight('')
    setHeight('')
    setBmi(null)
    setCategory('')
  }

  const getBmiColor = () => {
    if (!bmi) return 'text-muted-foreground'
    if (bmi < 18.5) return 'text-blue-500'
    if (bmi < 25) return 'text-green-500'
    if (bmi < 30) return 'text-yellow-500'
    return 'text-red-500'
  }

  return (
    <ToolLayout
      title="BMI Calculator"
      description="Calculate your Body Mass Index and find out if you're at a healthy weight"
      icon={<Calculator className="w-5 h-5" />}
      category="Health Calculator"
      features={['Metric & Imperial', 'Instant Results', 'Health Categories']}
      onClear={handleClear}
      hasOutput={bmi !== null}
      explanation={
        <div className="space-y-4">
          <p>
            Body Mass Index (BMI) is a simple calculation using a person's height and weight. 
            The formula is BMI = kg/m² where kg is a person's weight in kilograms and m² is their height in metres squared.
          </p>
          <p>
            BMI is a useful measure of overweight and obesity but it doesn't directly measure body fat. 
            Athletes may have a high BMI because of increased muscle rather than body fat.
          </p>
        </div>
      }
    >
      <div className="space-y-6">
        <SelectInput
          label="Unit System"
          value={unit}
          onChange={setUnit}
          options={[
            { value: 'metric', label: 'Metric (kg, cm)' },
            { value: 'imperial', label: 'Imperial (lbs, inches)' },
          ]}
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

        {bmi !== null && (
          <div className="mt-8 space-y-6">
            <div className="text-center p-6 bg-card/50 rounded-xl border border-border/50">
              <p className="text-sm text-muted-foreground mb-2">Your BMI</p>
              <p className={`text-5xl font-bold ${getBmiColor()}`}>{bmi}</p>
              <p className={`text-lg mt-2 ${getBmiColor()}`}>{category}</p>
            </div>

            <ResultStats
              stats={[
                { label: 'Underweight', value: '< 18.5', highlight: bmi < 18.5 },
                { label: 'Normal', value: '18.5 - 24.9', highlight: bmi >= 18.5 && bmi < 25 },
                { label: 'Overweight', value: '25 - 29.9', highlight: bmi >= 25 && bmi < 30 },
                { label: 'Obese', value: '≥ 30', highlight: bmi >= 30 },
              ]}
            />
          </div>
        )}
      </div>
    </ToolLayout>
  )
}

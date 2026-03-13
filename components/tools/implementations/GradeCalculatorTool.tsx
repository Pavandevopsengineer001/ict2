"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"

interface Grade {
  name: string
  score: number
  weight: number
}

export default function GradeCalculatorTool() {
  const [grades, setGrades] = useState<Grade[]>([
    { name: "Assignment 1", score: 85, weight: 20 },
    { name: "Midterm", score: 78, weight: 30 },
    { name: "Final", score: 90, weight: 50 },
  ])
  const [result, setResult] = useState<{
    weightedAverage: number
    letterGrade: string
    gpa: number
  } | null>(null)

  const addGrade = () => {
    setGrades([...grades, { name: "", score: 0, weight: 0 }])
  }

  const removeGrade = (index: number) => {
    setGrades(grades.filter((_, i) => i !== index))
  }

  const updateGrade = (index: number, field: keyof Grade, value: string | number) => {
    const newGrades = [...grades]
    newGrades[index] = { ...newGrades[index], [field]: value }
    setGrades(newGrades)
  }

  const calculate = () => {
    const totalWeight = grades.reduce((sum, g) => sum + g.weight, 0)
    if (totalWeight === 0) return

    const weightedSum = grades.reduce((sum, g) => sum + g.score * g.weight, 0)
    const weightedAverage = weightedSum / totalWeight

    let letterGrade: string
    let gpa: number
    if (weightedAverage >= 93) { letterGrade = "A"; gpa = 4.0 }
    else if (weightedAverage >= 90) { letterGrade = "A-"; gpa = 3.7 }
    else if (weightedAverage >= 87) { letterGrade = "B+"; gpa = 3.3 }
    else if (weightedAverage >= 83) { letterGrade = "B"; gpa = 3.0 }
    else if (weightedAverage >= 80) { letterGrade = "B-"; gpa = 2.7 }
    else if (weightedAverage >= 77) { letterGrade = "C+"; gpa = 2.3 }
    else if (weightedAverage >= 73) { letterGrade = "C"; gpa = 2.0 }
    else if (weightedAverage >= 70) { letterGrade = "C-"; gpa = 1.7 }
    else if (weightedAverage >= 67) { letterGrade = "D+"; gpa = 1.3 }
    else if (weightedAverage >= 63) { letterGrade = "D"; gpa = 1.0 }
    else if (weightedAverage >= 60) { letterGrade = "D-"; gpa = 0.7 }
    else { letterGrade = "F"; gpa = 0.0 }

    setResult({ weightedAverage, letterGrade, gpa })
  }

  const totalWeight = grades.reduce((sum, g) => sum + g.weight, 0)

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="space-y-3">
              {grades.map((grade, index) => (
                <div key={index} className="flex gap-2 items-end">
                  <div className="flex-1">
                    <label className="text-xs text-muted-foreground">Assignment</label>
                    <Input
                      placeholder="Name"
                      value={grade.name}
                      onChange={(e) => updateGrade(index, "name", e.target.value)}
                    />
                  </div>
                  <div className="w-24">
                    <label className="text-xs text-muted-foreground">Score (%)</label>
                    <Input
                      type="number"
                      value={grade.score}
                      onChange={(e) => updateGrade(index, "score", parseFloat(e.target.value) || 0)}
                      min={0}
                      max={100}
                    />
                  </div>
                  <div className="w-24">
                    <label className="text-xs text-muted-foreground">Weight (%)</label>
                    <Input
                      type="number"
                      value={grade.weight}
                      onChange={(e) => updateGrade(index, "weight", parseFloat(e.target.value) || 0)}
                      min={0}
                      max={100}
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeGrade(index)}
                    disabled={grades.length <= 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <Button variant="outline" size="sm" onClick={addGrade}>
                <Plus className="h-4 w-4 mr-2" />
                Add Grade
              </Button>
              <span className={`text-sm ${totalWeight === 100 ? "text-green-600" : "text-yellow-600"}`}>
                Total Weight: {totalWeight}%
              </span>
            </div>

            <Button onClick={calculate} className="w-full">
              Calculate Grade
            </Button>

            {result && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-primary/10 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Weighted Average</p>
                  <p className="text-3xl font-bold">{result.weightedAverage.toFixed(2)}%</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Letter Grade</p>
                  <p className="text-3xl font-bold">{result.letterGrade}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">GPA</p>
                  <p className="text-3xl font-bold">{result.gpa.toFixed(2)}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

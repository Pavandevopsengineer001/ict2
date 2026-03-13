"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Plus, Trash2 } from "lucide-react"

export default function GradientGeneratorTool() {
  const [colors, setColors] = useState([
    { color: "#667eea", position: 0 },
    { color: "#764ba2", position: 100 },
  ])
  const [type, setType] = useState("linear")
  const [angle, setAngle] = useState(90)

  const addColor = () => {
    if (colors.length >= 5) return
    const newPosition = colors.length > 0 ? Math.round((colors[colors.length - 1].position + 100) / 2) : 50
    setColors([...colors, { color: "#ffffff", position: newPosition }])
  }

  const removeColor = (index: number) => {
    if (colors.length <= 2) return
    setColors(colors.filter((_, i) => i !== index))
  }

  const updateColor = (index: number, color: string) => {
    const newColors = [...colors]
    newColors[index].color = color
    setColors(newColors)
  }

  const updatePosition = (index: number, position: number) => {
    const newColors = [...colors]
    newColors[index].position = position
    setColors(newColors)
  }

  const sortedColors = [...colors].sort((a, b) => a.position - b.position)
  const colorStops = sortedColors.map((c) => `${c.color} ${c.position}%`).join(", ")
  
  const gradientCSS = type === "linear"
    ? `linear-gradient(${angle}deg, ${colorStops})`
    : `radial-gradient(circle, ${colorStops})`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`background: ${gradientCSS};`)
  }

  const randomGradient = () => {
    const randomColor = () => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")
    setColors([
      { color: randomColor(), position: 0 },
      { color: randomColor(), position: 100 },
    ])
    setAngle(Math.floor(Math.random() * 360))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div
              className="h-48 rounded-lg border"
              style={{ background: gradientCSS }}
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Type</label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="linear">Linear</SelectItem>
                    <SelectItem value="radial">Radial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {type === "linear" && (
                <div>
                  <label className="text-sm font-medium">Angle: {angle}deg</label>
                  <Input
                    type="range"
                    min={0}
                    max={360}
                    value={angle}
                    onChange={(e) => setAngle(parseInt(e.target.value))}
                  />
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Colors</label>
                <Button variant="outline" size="sm" onClick={addColor} disabled={colors.length >= 5}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Color
                </Button>
              </div>
              {colors.map((c, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Input
                    type="color"
                    value={c.color}
                    onChange={(e) => updateColor(i, e.target.value)}
                    className="w-16 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    value={c.color}
                    onChange={(e) => updateColor(i, e.target.value)}
                    className="flex-1 font-mono"
                  />
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    value={c.position}
                    onChange={(e) => updatePosition(i, parseInt(e.target.value) || 0)}
                    className="w-20"
                  />
                  <span className="text-sm text-muted-foreground">%</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeColor(i)}
                    disabled={colors.length <= 2}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div>
              <label className="text-sm font-medium">CSS Output</label>
              <div className="flex gap-2 mt-2">
                <code className="flex-1 p-3 bg-muted rounded text-sm font-mono overflow-x-auto">
                  background: {gradientCSS};
                </code>
                <Button variant="outline" onClick={copyToClipboard}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button variant="outline" onClick={randomGradient} className="w-full">
              Generate Random Gradient
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

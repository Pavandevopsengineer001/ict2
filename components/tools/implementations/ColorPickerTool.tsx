"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Copy } from "lucide-react"

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  }
}

export default function ColorPickerTool() {
  const [color, setColor] = useState("#3b82f6")
  const [rgb, setRgb] = useState({ r: 59, g: 130, b: 246 })
  const [hsl, setHsl] = useState({ h: 217, s: 91, l: 60 })

  useEffect(() => {
    const rgbValue = hexToRgb(color)
    if (rgbValue) {
      setRgb(rgbValue)
      setHsl(rgbToHsl(rgbValue.r, rgbValue.g, rgbValue.b))
    }
  }, [color])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const colorFormats = [
    { label: "HEX", value: color.toUpperCase() },
    { label: "RGB", value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
    { label: "RGBA", value: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)` },
    { label: "HSL", value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
    { label: "CSS Variable", value: `--color: ${color};` },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div
                className="w-32 h-32 rounded-lg border shadow-inner"
                style={{ backgroundColor: color }}
              />
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">Pick Color</label>
                <Input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full h-12 cursor-pointer"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">HEX Value</label>
              <Input
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="#000000"
                className="font-mono"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">R</label>
                <Input value={rgb.r} readOnly className="font-mono" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">G</label>
                <Input value={rgb.g} readOnly className="font-mono" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">B</label>
                <Input value={rgb.b} readOnly className="font-mono" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Color Formats</label>
              {colorFormats.map((format) => (
                <div key={format.label} className="flex items-center gap-2">
                  <span className="w-24 text-sm text-muted-foreground">{format.label}:</span>
                  <code className="flex-1 p-2 bg-muted rounded text-sm font-mono">{format.value}</code>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(format.value)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

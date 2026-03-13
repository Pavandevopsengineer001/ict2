"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, RefreshCw } from "lucide-react"

export default function BarcodeGeneratorTool() {
  const [text, setText] = useState("")
  const [format, setFormat] = useState("CODE128")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [error, setError] = useState("")

  const generateBarcode = async () => {
    if (!text || !canvasRef.current) return
    setError("")

    try {
      const JsBarcode = (await import("jsbarcode")).default
      JsBarcode(canvasRef.current, text, {
        format: format,
        width: 2,
        height: 100,
        displayValue: true,
        fontSize: 14,
        margin: 10,
        background: "#ffffff",
      })
    } catch (e) {
      setError("Invalid input for selected barcode format")
    }
  }

  const downloadBarcode = () => {
    if (!canvasRef.current) return
    const link = document.createElement("a")
    link.download = "barcode.png"
    link.href = canvasRef.current.toDataURL()
    link.click()
  }

  const clear = () => {
    setText("")
    setError("")
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d")
      if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Text or Number</label>
              <Input
                placeholder="Enter text or number to encode"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Barcode Format</label>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CODE128">CODE128 (Any text)</SelectItem>
                  <SelectItem value="EAN13">EAN-13 (13 digits)</SelectItem>
                  <SelectItem value="EAN8">EAN-8 (8 digits)</SelectItem>
                  <SelectItem value="UPC">UPC (12 digits)</SelectItem>
                  <SelectItem value="CODE39">CODE39</SelectItem>
                  <SelectItem value="ITF14">ITF-14 (14 digits)</SelectItem>
                  <SelectItem value="MSI">MSI</SelectItem>
                  <SelectItem value="pharmacode">Pharmacode</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button onClick={generateBarcode} disabled={!text}>Generate Barcode</Button>
              <Button variant="outline" onClick={clear}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">
                {error}
              </div>
            )}

            <div className="flex justify-center p-4 bg-white rounded-lg">
              <canvas ref={canvasRef} />
            </div>

            <Button onClick={downloadBarcode} className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Download Barcode
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

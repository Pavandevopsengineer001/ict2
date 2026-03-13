"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Upload, Download } from "lucide-react"

export default function ImageCompressorTool() {
  const [originalImage, setOriginalImage] = useState<string>("")
  const [compressedImage, setCompressedImage] = useState<string>("")
  const [quality, setQuality] = useState(0.7)
  const [originalSize, setOriginalSize] = useState(0)
  const [compressedSize, setCompressedSize] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setOriginalSize(file.size)
    const reader = new FileReader()
    reader.onload = (event) => {
      setOriginalImage(event.target?.result as string)
      setCompressedImage("")
      setCompressedSize(0)
    }
    reader.readAsDataURL(file)
  }

  const compress = () => {
    if (!originalImage) return

    const img = new window.Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.drawImage(img, 0, 0)
        const compressed = canvas.toDataURL("image/jpeg", quality)
        setCompressedImage(compressed)
        // Calculate approximate size
        const base64Length = compressed.length - "data:image/jpeg;base64,".length
        setCompressedSize(Math.round((base64Length * 3) / 4))
      }
    }
    img.src = originalImage
  }

  const download = () => {
    if (!compressedImage) return
    const link = document.createElement("a")
    link.download = "compressed-image.jpg"
    link.href = compressedImage
    link.click()
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB"
    return (bytes / (1024 * 1024)).toFixed(2) + " MB"
  }

  const savings = originalSize > 0 && compressedSize > 0
    ? Math.round((1 - compressedSize / originalSize) * 100)
    : 0

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div
              className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
              onClick={() => inputRef.current?.click()}
            >
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-lg font-medium">Click to upload image</p>
              <p className="text-sm text-muted-foreground">PNG, JPG, WebP</p>
            </div>

            {originalImage && (
              <>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Original Size: {formatSize(originalSize)}</p>
                  <img src={originalImage} alt="Original" className="max-h-48 object-contain mx-auto" />
                </div>

                <div>
                  <label className="text-sm font-medium">Quality: {Math.round(quality * 100)}%</label>
                  <Slider
                    value={[quality]}
                    onValueChange={([v]) => setQuality(v)}
                    min={0.1}
                    max={1}
                    step={0.05}
                    className="mt-2"
                  />
                </div>

                <Button onClick={compress} className="w-full">Compress Image</Button>

                {compressedImage && (
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Compressed: {formatSize(compressedSize)}</span>
                        <span className="text-green-600 font-medium">Saved {savings}%</span>
                      </div>
                      <img src={compressedImage} alt="Compressed" className="max-h-48 object-contain mx-auto" />
                    </div>
                    <Button onClick={download} className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download Compressed Image
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

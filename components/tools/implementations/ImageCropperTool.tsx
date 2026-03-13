"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, Download, Crop } from "lucide-react"

export default function ImageCropperTool() {
  const [originalImage, setOriginalImage] = useState<string>("")
  const [croppedImage, setCroppedImage] = useState<string>("")
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [cropArea, setCropArea] = useState({ x: 0, y: 0, width: 100, height: 100 })
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new window.Image()
      img.crossOrigin = "anonymous"
      img.onload = () => {
        setDimensions({ width: img.width, height: img.height })
        setCropArea({ x: 0, y: 0, width: img.width, height: img.height })
        setOriginalImage(event.target?.result as string)
        setCroppedImage("")
      }
      img.src = event.target?.result as string
    }
    reader.readAsDataURL(file)
  }

  const crop = () => {
    if (!originalImage) return

    const img = new window.Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = cropArea.width
      canvas.height = cropArea.height
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.drawImage(
          img,
          cropArea.x,
          cropArea.y,
          cropArea.width,
          cropArea.height,
          0,
          0,
          cropArea.width,
          cropArea.height
        )
        setCroppedImage(canvas.toDataURL("image/png"))
      }
    }
    img.src = originalImage
  }

  const download = () => {
    if (!croppedImage) return
    const link = document.createElement("a")
    link.download = "cropped-image.png"
    link.href = croppedImage
    link.click()
  }

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
                  <p className="text-sm text-muted-foreground mb-2">Original: {dimensions.width} x {dimensions.height}</p>
                  <img src={originalImage} alt="Original" className="max-h-48 object-contain mx-auto" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-sm font-medium">X</label>
                    <Input
                      type="number"
                      value={cropArea.x}
                      onChange={(e) => setCropArea({ ...cropArea, x: parseInt(e.target.value) || 0 })}
                      min={0}
                      max={dimensions.width}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Y</label>
                    <Input
                      type="number"
                      value={cropArea.y}
                      onChange={(e) => setCropArea({ ...cropArea, y: parseInt(e.target.value) || 0 })}
                      min={0}
                      max={dimensions.height}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Width</label>
                    <Input
                      type="number"
                      value={cropArea.width}
                      onChange={(e) => setCropArea({ ...cropArea, width: parseInt(e.target.value) || 0 })}
                      min={1}
                      max={dimensions.width - cropArea.x}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Height</label>
                    <Input
                      type="number"
                      value={cropArea.height}
                      onChange={(e) => setCropArea({ ...cropArea, height: parseInt(e.target.value) || 0 })}
                      min={1}
                      max={dimensions.height - cropArea.y}
                    />
                  </div>
                </div>

                <Button onClick={crop} className="w-full">
                  <Crop className="h-4 w-4 mr-2" />
                  Crop Image
                </Button>

                {croppedImage && (
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground mb-2">Cropped: {cropArea.width} x {cropArea.height}</p>
                      <img src={croppedImage} alt="Cropped" className="max-h-48 object-contain mx-auto" />
                    </div>
                    <Button onClick={download} className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download Cropped Image
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

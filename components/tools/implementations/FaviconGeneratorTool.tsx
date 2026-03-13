"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, Download } from "lucide-react"

const FAVICON_SIZES = [16, 32, 48, 64, 128, 180, 192, 512]

export default function FaviconGeneratorTool() {
  const [originalImage, setOriginalImage] = useState<string>("")
  const [favicons, setFavicons] = useState<{ size: number; dataUrl: string }[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      setOriginalImage(event.target?.result as string)
      setFavicons([])
    }
    reader.readAsDataURL(file)
  }

  const generateFavicons = () => {
    if (!originalImage) return

    const img = new window.Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      const generatedFavicons = FAVICON_SIZES.map((size) => {
        const canvas = document.createElement("canvas")
        canvas.width = size
        canvas.height = size
        const ctx = canvas.getContext("2d")
        if (ctx) {
          ctx.drawImage(img, 0, 0, size, size)
          return { size, dataUrl: canvas.toDataURL("image/png") }
        }
        return { size, dataUrl: "" }
      })
      setFavicons(generatedFavicons)
    }
    img.src = originalImage
  }

  const downloadFavicon = (size: number, dataUrl: string) => {
    const link = document.createElement("a")
    link.download = `favicon-${size}x${size}.png`
    link.href = dataUrl
    link.click()
  }

  const downloadAll = () => {
    favicons.forEach((f) => {
      setTimeout(() => downloadFavicon(f.size, f.dataUrl), 100)
    })
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
              <p className="text-lg font-medium">Upload image for favicon</p>
              <p className="text-sm text-muted-foreground">Recommended: Square image (512x512 or larger)</p>
            </div>

            {originalImage && (
              <>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <img src={originalImage} alt="Original" className="max-h-32 object-contain mx-auto" />
                </div>

                <Button onClick={generateFavicons} className="w-full">
                  Generate Favicons
                </Button>

                {favicons.length > 0 && (
                  <>
                    <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                      {favicons.map((f) => (
                        <div key={f.size} className="text-center">
                          <div className="p-2 bg-muted rounded mb-2 flex items-center justify-center min-h-[80px]">
                            <img
                              src={f.dataUrl}
                              alt={`${f.size}x${f.size}`}
                              style={{ width: Math.min(f.size, 64), height: Math.min(f.size, 64) }}
                              className="object-contain"
                            />
                          </div>
                          <p className="text-xs text-muted-foreground mb-1">{f.size}x{f.size}</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => downloadFavicon(f.size, f.dataUrl)}
                            className="text-xs"
                          >
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Button onClick={downloadAll} className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download All Sizes
                    </Button>
                  </>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

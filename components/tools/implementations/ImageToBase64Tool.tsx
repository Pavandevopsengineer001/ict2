"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Copy, Upload, Image } from "lucide-react"

export default function ImageToBase64Tool() {
  const [base64, setBase64] = useState("")
  const [preview, setPreview] = useState("")
  const [fileInfo, setFileInfo] = useState<{ name: string; size: string; type: string } | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFileInfo({
      name: file.name,
      size: (file.size / 1024).toFixed(2) + " KB",
      type: file.type,
    })

    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result as string
      setBase64(result)
      setPreview(result)
    }
    reader.readAsDataURL(file)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(base64)
  }

  const copyDataUri = () => {
    navigator.clipboard.writeText(base64)
  }

  const copyBase64Only = () => {
    const base64Only = base64.split(",")[1]
    if (base64Only) navigator.clipboard.writeText(base64Only)
  }

  const clear = () => {
    setBase64("")
    setPreview("")
    setFileInfo(null)
    if (inputRef.current) inputRef.current.value = ""
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
              <p className="text-sm text-muted-foreground">PNG, JPG, GIF, SVG, WebP</p>
            </div>

            {fileInfo && (
              <div className="p-4 bg-muted rounded-lg">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Name:</span>
                    <p className="font-medium truncate">{fileInfo.name}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Size:</span>
                    <p className="font-medium">{fileInfo.size}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Type:</span>
                    <p className="font-medium">{fileInfo.type}</p>
                  </div>
                </div>
              </div>
            )}

            {preview && (
              <div className="flex justify-center p-4 bg-muted rounded-lg">
                <img src={preview} alt="Preview" className="max-h-64 object-contain" />
              </div>
            )}

            {base64 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Base64 Output</label>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={copyDataUri}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Data URI
                    </Button>
                    <Button variant="ghost" size="sm" onClick={copyBase64Only}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Base64 Only
                    </Button>
                  </div>
                </div>
                <Textarea
                  value={base64}
                  readOnly
                  rows={6}
                  className="font-mono text-xs bg-muted"
                />
              </div>
            )}

            {base64 && (
              <Button variant="outline" onClick={clear} className="w-full">
                Clear
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

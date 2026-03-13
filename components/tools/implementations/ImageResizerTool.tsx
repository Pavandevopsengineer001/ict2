"use client";

import { useState, useRef } from "react";
import { Image as ImageIcon, Upload, Download, Lock, Unlock } from "lucide-react";

export default function ImageResizerTool() {
  const [image, setImage] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<{ width: number; height: number } | null>(null);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [quality, setQuality] = useState(90);
  const [format, setFormat] = useState<"png" | "jpeg" | "webp">("jpeg");
  const [resizedImage, setResizedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        setOriginalSize({ width: img.width, height: img.height });
        setWidth(img.width.toString());
        setHeight(img.height.toString());
        setImage(event.target?.result as string);
        setResizedImage(null);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleWidthChange = (newWidth: string) => {
    setWidth(newWidth);
    if (maintainAspectRatio && originalSize && newWidth) {
      const ratio = originalSize.height / originalSize.width;
      setHeight(Math.round(parseInt(newWidth) * ratio).toString());
    }
  };

  const handleHeightChange = (newHeight: string) => {
    setHeight(newHeight);
    if (maintainAspectRatio && originalSize && newHeight) {
      const ratio = originalSize.width / originalSize.height;
      setWidth(Math.round(parseInt(newHeight) * ratio).toString());
    }
  };

  const resizeImage = () => {
    if (!image || !canvasRef.current) return;

    setLoading(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const newWidth = parseInt(width) || img.width;
      const newHeight = parseInt(height) || img.height;

      canvas.width = newWidth;
      canvas.height = newHeight;
      ctx.drawImage(img, 0, 0, newWidth, newHeight);

      const mimeType = format === "png" ? "image/png" : format === "webp" ? "image/webp" : "image/jpeg";
      const resized = canvas.toDataURL(mimeType, quality / 100);
      setResizedImage(resized);
      setLoading(false);
    };
    img.src = image;
  };

  const downloadImage = () => {
    if (!resizedImage) return;
    const link = document.createElement("a");
    link.download = `resized-image.${format}`;
    link.href = resizedImage;
    link.click();
  };

  const presetSizes = [
    { label: "HD", width: 1280, height: 720 },
    { label: "Full HD", width: 1920, height: 1080 },
    { label: "4K", width: 3840, height: 2160 },
    { label: "Instagram", width: 1080, height: 1080 },
    { label: "Twitter", width: 1200, height: 675 },
    { label: "Thumbnail", width: 150, height: 150 },
  ];

  return (
    <div className="space-y-6">
      <canvas ref={canvasRef} className="hidden" />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      {!image ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-border/50 rounded-xl p-12 text-center cursor-pointer hover:border-primary/50 transition-colors"
        >
          <Upload className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <p className="text-lg font-medium mb-2">Upload an Image</p>
          <p className="text-sm text-muted-foreground">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Supports PNG, JPEG, WebP, GIF
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Original Image</label>
              <div className="relative rounded-lg overflow-hidden border border-border/50 bg-[url('/grid.svg')] bg-center">
                <img
                  src={image}
                  alt="Original"
                  className="w-full h-auto max-h-[300px] object-contain"
                />
                {originalSize && (
                  <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-background/80 text-xs">
                    {originalSize.width} x {originalSize.height}
                  </div>
                )}
              </div>
            </div>

            {resizedImage && (
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Resized Image</label>
                <div className="relative rounded-lg overflow-hidden border border-border/50 bg-[url('/grid.svg')] bg-center">
                  <img
                    src={resizedImage}
                    alt="Resized"
                    className="w-full h-auto max-h-[300px] object-contain"
                  />
                  <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-background/80 text-xs">
                    {width} x {height}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Width (px)</label>
              <input
                type="number"
                value={width}
                onChange={(e) => handleWidthChange(e.target.value)}
                className="calc-input"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Height (px)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => handleHeightChange(e.target.value)}
                className="calc-input"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Format</label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as typeof format)}
                className="calc-select"
              >
                <option value="jpeg">JPEG</option>
                <option value="png">PNG</option>
                <option value="webp">WebP</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Quality: {quality}%</label>
              <input
                type="range"
                value={quality}
                onChange={(e) => setQuality(parseInt(e.target.value))}
                min="10"
                max="100"
                className="w-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setMaintainAspectRatio(!maintainAspectRatio)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                maintainAspectRatio ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}
            >
              {maintainAspectRatio ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
              Aspect Ratio
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 rounded-lg bg-muted hover:bg-muted/80"
            >
              Upload New
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground w-full">Presets:</span>
            {presetSizes.map((preset) => (
              <button
                key={preset.label}
                onClick={() => {
                  setWidth(preset.width.toString());
                  setHeight(preset.height.toString());
                  setMaintainAspectRatio(false);
                }}
                className="px-3 py-1 rounded-lg text-xs bg-muted hover:bg-muted/80 transition-colors"
              >
                {preset.label} ({preset.width}x{preset.height})
              </button>
            ))}
          </div>

          <div className="flex gap-4">
            <button
              onClick={resizeImage}
              disabled={loading}
              className="flex-1 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <ImageIcon className="w-4 h-4" />
              {loading ? "Processing..." : "Resize Image"}
            </button>
            {resizedImage && (
              <button
                onClick={downloadImage}
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

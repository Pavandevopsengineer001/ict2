"use client";

import { useState, useEffect } from "react";
import { Palette, Copy, Check, Pipette } from "lucide-react";

interface ColorValues {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
  hsv: { h: number; s: number; v: number };
  cmyk: { c: number; m: number; y: number; k: number };
}

export default function ColorConverterTool() {
  const [color, setColor] = useState<ColorValues>({
    hex: "#1E88E5",
    rgb: { r: 30, g: 136, b: 229 },
    hsl: { h: 208, s: 79, l: 51 },
    hsv: { h: 208, s: 87, v: 90 },
    cmyk: { c: 87, m: 41, y: 0, k: 10 },
  });
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const rgbToHex = (r: number, g: number, b: number): string => {
    return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
  };

  const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const rgbToHsv = (r: number, g: number, b: number): { h: number; s: number; v: number } => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    const v = max;
    const d = max - min;
    const s = max === 0 ? 0 : d / max;

    if (max !== min) {
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      v: Math.round(v * 100),
    };
  };

  const rgbToCmyk = (r: number, g: number, b: number): { c: number; m: number; y: number; k: number } => {
    if (r === 0 && g === 0 && b === 0) {
      return { c: 0, m: 0, y: 0, k: 100 };
    }

    const k = 1 - Math.max(r / 255, g / 255, b / 255);
    const c = (1 - r / 255 - k) / (1 - k);
    const m = (1 - g / 255 - k) / (1 - k);
    const y = (1 - b / 255 - k) / (1 - k);

    return {
      c: Math.round(c * 100),
      m: Math.round(m * 100),
      y: Math.round(y * 100),
      k: Math.round(k * 100),
    };
  };

  const updateFromHex = (hex: string) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return;

    setColor({
      hex: hex.startsWith("#") ? hex : "#" + hex,
      rgb,
      hsl: rgbToHsl(rgb.r, rgb.g, rgb.b),
      hsv: rgbToHsv(rgb.r, rgb.g, rgb.b),
      cmyk: rgbToCmyk(rgb.r, rgb.g, rgb.b),
    });
  };

  const updateFromRgb = (r: number, g: number, b: number) => {
    r = Math.max(0, Math.min(255, r));
    g = Math.max(0, Math.min(255, g));
    b = Math.max(0, Math.min(255, b));

    setColor({
      hex: rgbToHex(r, g, b),
      rgb: { r, g, b },
      hsl: rgbToHsl(r, g, b),
      hsv: rgbToHsv(r, g, b),
      cmyk: rgbToCmyk(r, g, b),
    });
  };

  const copyValue = async (format: string, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const formats = [
    { key: "hex", label: "HEX", value: color.hex.toUpperCase() },
    { key: "rgb", label: "RGB", value: `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})` },
    { key: "hsl", label: "HSL", value: `hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)` },
    { key: "hsv", label: "HSV", value: `hsv(${color.hsv.h}, ${color.hsv.s}%, ${color.hsv.v}%)` },
    { key: "cmyk", label: "CMYK", value: `cmyk(${color.cmyk.c}%, ${color.cmyk.m}%, ${color.cmyk.y}%, ${color.cmyk.k}%)` },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div
          className="w-full md:w-48 h-48 rounded-xl border border-border/50 shadow-lg"
          style={{ backgroundColor: color.hex }}
        />
        
        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Color Picker
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={color.hex}
                onChange={(e) => updateFromHex(e.target.value)}
                className="w-14 h-10 rounded cursor-pointer border-none"
              />
              <input
                type="text"
                value={color.hex}
                onChange={(e) => updateFromHex(e.target.value)}
                placeholder="#000000"
                className="calc-input flex-1 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">R</label>
              <input
                type="number"
                value={color.rgb.r}
                onChange={(e) => updateFromRgb(parseInt(e.target.value) || 0, color.rgb.g, color.rgb.b)}
                min="0"
                max="255"
                className="calc-input text-center"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">G</label>
              <input
                type="number"
                value={color.rgb.g}
                onChange={(e) => updateFromRgb(color.rgb.r, parseInt(e.target.value) || 0, color.rgb.b)}
                min="0"
                max="255"
                className="calc-input text-center"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">B</label>
              <input
                type="number"
                value={color.rgb.b}
                onChange={(e) => updateFromRgb(color.rgb.r, color.rgb.g, parseInt(e.target.value) || 0)}
                min="0"
                max="255"
                className="calc-input text-center"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground">Color Formats</h3>
        {formats.map((f) => (
          <div
            key={f.key}
            className="flex items-center justify-between p-4 rounded-lg bg-card/50 border border-border/50 hover:border-primary/30 transition-colors"
          >
            <div>
              <span className="text-xs text-muted-foreground">{f.label}</span>
              <p className="font-mono text-sm">{f.value}</p>
            </div>
            <button
              onClick={() => copyValue(f.key, f.value)}
              className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            >
              {copiedFormat === f.key ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

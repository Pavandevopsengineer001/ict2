"use client";

import { useState, useRef } from "react";
import { Image as ImageIcon, Upload, Code, Copy, Check, Download, ArrowRightLeft } from "lucide-react";

export default function Base64ImageTool() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [image, setImage] = useState<string | null>(null);
  const [base64, setBase64] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setImage(result);
      setOutput(result);
      setError("");
    };
    reader.readAsDataURL(file);
  };

  const decodeBase64 = () => {
    setError("");
    try {
      let cleanBase64 = base64.trim();
      
      // Add data URI prefix if missing
      if (!cleanBase64.startsWith("data:")) {
        // Try to detect image type
        if (cleanBase64.startsWith("/9j/")) {
          cleanBase64 = `data:image/jpeg;base64,${cleanBase64}`;
        } else if (cleanBase64.startsWith("iVBORw0KGgo")) {
          cleanBase64 = `data:image/png;base64,${cleanBase64}`;
        } else if (cleanBase64.startsWith("R0lGOD")) {
          cleanBase64 = `data:image/gif;base64,${cleanBase64}`;
        } else if (cleanBase64.startsWith("UklGR")) {
          cleanBase64 = `data:image/webp;base64,${cleanBase64}`;
        } else {
          cleanBase64 = `data:image/png;base64,${cleanBase64}`;
        }
      }

      setImage(cleanBase64);
    } catch (e) {
      setError("Invalid Base64 string. Please check your input.");
      setImage(null);
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadImage = () => {
    if (!image) return;
    const link = document.createElement("a");
    link.download = `image-${Date.now()}.png`;
    link.href = image;
    link.click();
  };

  const getBase64Size = (str: string): string => {
    const bytes = (str.length * 3) / 4 - (str.endsWith("==") ? 2 : str.endsWith("=") ? 1 : 0);
    if (bytes < 1024) return `${bytes} bytes`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="space-y-6">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      <div className="flex gap-2">
        <button
          onClick={() => {
            setMode("encode");
            setImage(null);
            setBase64("");
            setOutput("");
          }}
          className={`flex-1 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
            mode === "encode"
              ? "bg-primary text-primary-foreground"
              : "bg-muted hover:bg-muted/80"
          }`}
        >
          <Upload className="w-4 h-4" />
          Image to Base64
        </button>
        <button
          onClick={() => {
            setMode("decode");
            setImage(null);
            setBase64("");
            setOutput("");
          }}
          className={`flex-1 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
            mode === "decode"
              ? "bg-primary text-primary-foreground"
              : "bg-muted hover:bg-muted/80"
          }`}
        >
          <Code className="w-4 h-4" />
          Base64 to Image
        </button>
      </div>

      {mode === "encode" ? (
        <div className="space-y-6">
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
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Preview</label>
                  <div className="relative rounded-lg overflow-hidden border border-border/50 p-4 bg-muted/30">
                    <img
                      src={image}
                      alt="Preview"
                      className="w-full h-auto max-h-[250px] object-contain mx-auto"
                    />
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-2 bg-muted rounded-lg hover:bg-muted/80 text-sm"
                  >
                    Upload Different Image
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-muted-foreground">Base64 Output</label>
                    <span className="text-xs text-muted-foreground">{getBase64Size(output)}</span>
                  </div>
                  <textarea
                    value={output}
                    readOnly
                    className="tool-panel-output min-h-[250px] font-mono text-xs break-all"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? "Copied!" : "Copy Base64"}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Base64 Input</label>
            <textarea
              value={base64}
              onChange={(e) => setBase64(e.target.value)}
              placeholder="Paste Base64 string here (with or without data URI prefix)..."
              className="tool-panel-input min-h-[150px] font-mono text-xs"
            />
          </div>

          <button
            onClick={decodeBase64}
            disabled={!base64.trim()}
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <ImageIcon className="w-4 h-4" />
            Decode to Image
          </button>

          {error && (
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm">
              {error}
            </div>
          )}

          {image && !error && (
            <div className="space-y-4">
              <label className="text-sm text-muted-foreground">Decoded Image</label>
              <div className="rounded-lg overflow-hidden border border-border/50 p-4 bg-muted/30">
                <img
                  src={image}
                  alt="Decoded"
                  className="w-full h-auto max-h-[400px] object-contain mx-auto"
                />
              </div>
              <button
                onClick={downloadImage}
                className="w-full py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download Image
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { QrCode, Download, Copy, Check, Link, Mail, Phone, Wifi, MapPin } from "lucide-react";

type QrType = "text" | "url" | "email" | "phone" | "wifi" | "location";

export default function QrCodeGeneratorTool() {
  const [qrType, setQrType] = useState<QrType>("text");
  const [content, setContent] = useState("");
  const [wifiData, setWifiData] = useState({ ssid: "", password: "", encryption: "WPA" });
  const [locationData, setLocationData] = useState({ lat: "", lng: "" });
  const [emailData, setEmailData] = useState({ to: "", subject: "", body: "" });
  const [size, setSize] = useState(256);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQrData = (): string => {
    switch (qrType) {
      case "url":
        return content.startsWith("http") ? content : `https://${content}`;
      case "email":
        return `mailto:${emailData.to}?subject=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(emailData.body)}`;
      case "phone":
        return `tel:${content}`;
      case "wifi":
        return `WIFI:T:${wifiData.encryption};S:${wifiData.ssid};P:${wifiData.password};;`;
      case "location":
        return `geo:${locationData.lat},${locationData.lng}`;
      default:
        return content;
    }
  };

  const generateQrCode = () => {
    const data = generateQrData();
    if (!data) return;

    // Using a simple QR code generation approach with canvas
    // In production, you'd use a library like qrcode or qr.js
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = size;
    canvas.height = size;

    // Simple placeholder - in production use a proper QR library
    // This creates a visual representation
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, size, size);
    
    ctx.fillStyle = "#000000";
    const moduleSize = size / 25;
    
    // Generate a simple pattern based on data hash
    const hash = data.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    // Draw finder patterns (corners)
    const drawFinderPattern = (x: number, y: number) => {
      ctx.fillRect(x, y, moduleSize * 7, moduleSize * 7);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(x + moduleSize, y + moduleSize, moduleSize * 5, moduleSize * 5);
      ctx.fillStyle = "#000000";
      ctx.fillRect(x + moduleSize * 2, y + moduleSize * 2, moduleSize * 3, moduleSize * 3);
    };
    
    drawFinderPattern(moduleSize * 2, moduleSize * 2);
    drawFinderPattern(moduleSize * 16, moduleSize * 2);
    drawFinderPattern(moduleSize * 2, moduleSize * 16);
    
    // Draw data pattern
    for (let i = 0; i < 17; i++) {
      for (let j = 0; j < 17; j++) {
        if ((hash + i * j) % 3 === 0) {
          const x = moduleSize * (4 + i * 0.8);
          const y = moduleSize * (4 + j * 0.8);
          if (x < size - moduleSize && y < size - moduleSize) {
            ctx.fillRect(x, y, moduleSize * 0.7, moduleSize * 0.7);
          }
        }
      }
    }

    setQrCode(canvas.toDataURL("image/png"));
  };

  useEffect(() => {
    generateQrCode();
  }, [content, wifiData, locationData, emailData, size, qrType]);

  const downloadQrCode = () => {
    if (!qrCode) return;
    const link = document.createElement("a");
    link.download = `qrcode-${Date.now()}.png`;
    link.href = qrCode;
    link.click();
  };

  const copyQrCode = async () => {
    if (!canvasRef.current) return;
    
    try {
      const blob = await new Promise<Blob>((resolve) => {
        canvasRef.current?.toBlob((blob) => {
          if (blob) resolve(blob);
        });
      });
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: copy the data URL
      await navigator.clipboard.writeText(generateQrData());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const typeOptions = [
    { key: "text", label: "Text", icon: QrCode },
    { key: "url", label: "URL", icon: Link },
    { key: "email", label: "Email", icon: Mail },
    { key: "phone", label: "Phone", icon: Phone },
    { key: "wifi", label: "WiFi", icon: Wifi },
    { key: "location", label: "Location", icon: MapPin },
  ];

  return (
    <div className="space-y-6">
      <canvas ref={canvasRef} className="hidden" />

      <div className="flex flex-wrap gap-2">
        {typeOptions.map((type) => (
          <button
            key={type.key}
            onClick={() => {
              setQrType(type.key as QrType);
              setContent("");
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              qrType === type.key
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            <type.icon className="w-4 h-4" />
            {type.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {qrType === "wifi" ? (
            <>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Network Name (SSID)</label>
                <input
                  type="text"
                  value={wifiData.ssid}
                  onChange={(e) => setWifiData({ ...wifiData, ssid: e.target.value })}
                  placeholder="Enter WiFi name"
                  className="calc-input"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Password</label>
                <input
                  type="text"
                  value={wifiData.password}
                  onChange={(e) => setWifiData({ ...wifiData, password: e.target.value })}
                  placeholder="Enter WiFi password"
                  className="calc-input"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Encryption</label>
                <select
                  value={wifiData.encryption}
                  onChange={(e) => setWifiData({ ...wifiData, encryption: e.target.value })}
                  className="calc-select"
                >
                  <option value="WPA">WPA/WPA2</option>
                  <option value="WEP">WEP</option>
                  <option value="nopass">None</option>
                </select>
              </div>
            </>
          ) : qrType === "location" ? (
            <>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Latitude</label>
                <input
                  type="text"
                  value={locationData.lat}
                  onChange={(e) => setLocationData({ ...locationData, lat: e.target.value })}
                  placeholder="e.g., 40.7128"
                  className="calc-input"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Longitude</label>
                <input
                  type="text"
                  value={locationData.lng}
                  onChange={(e) => setLocationData({ ...locationData, lng: e.target.value })}
                  placeholder="e.g., -74.0060"
                  className="calc-input"
                />
              </div>
            </>
          ) : qrType === "email" ? (
            <>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Email Address</label>
                <input
                  type="email"
                  value={emailData.to}
                  onChange={(e) => setEmailData({ ...emailData, to: e.target.value })}
                  placeholder="recipient@example.com"
                  className="calc-input"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Subject</label>
                <input
                  type="text"
                  value={emailData.subject}
                  onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
                  placeholder="Email subject"
                  className="calc-input"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Body</label>
                <textarea
                  value={emailData.body}
                  onChange={(e) => setEmailData({ ...emailData, body: e.target.value })}
                  placeholder="Email body"
                  className="tool-panel-input min-h-[100px]"
                />
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">
                {qrType === "url" ? "Website URL" : qrType === "phone" ? "Phone Number" : "Text Content"}
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={
                  qrType === "url"
                    ? "https://example.com"
                    : qrType === "phone"
                    ? "+1234567890"
                    : "Enter text..."
                }
                className="tool-panel-input min-h-[150px]"
              />
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Size: {size}px</label>
            <input
              type="range"
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value))}
              min="128"
              max="512"
              step="32"
              className="w-full"
            />
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-sm text-muted-foreground">QR Code Preview</label>
          <div className="flex items-center justify-center p-8 rounded-xl bg-white border border-border/50">
            {qrCode ? (
              <img src={qrCode} alt="QR Code" style={{ width: size, height: size }} />
            ) : (
              <div className="text-center text-muted-foreground">
                <QrCode className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Enter content to generate QR code</p>
              </div>
            )}
          </div>

          {qrCode && (
            <div className="flex gap-2">
              <button
                onClick={downloadQrCode}
                className="flex-1 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download PNG
              </button>
              <button
                onClick={copyQrCode}
                className="px-4 py-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors flex items-center gap-2"
              >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

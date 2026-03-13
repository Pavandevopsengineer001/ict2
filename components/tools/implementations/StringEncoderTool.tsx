"use client";

import { useState } from "react";
import { Code, Copy, Check, ArrowRightLeft } from "lucide-react";

const encodingTypes = [
  { key: "base64", label: "Base64" },
  { key: "url", label: "URL Encoding" },
  { key: "html", label: "HTML Entities" },
  { key: "unicode", label: "Unicode Escape" },
  { key: "hex", label: "Hexadecimal" },
  { key: "binary", label: "Binary" },
  { key: "ascii", label: "ASCII Codes" },
];

export default function StringEncoderTool() {
  const [input, setInput] = useState("");
  const [encodingType, setEncodingType] = useState("base64");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const encode = (text: string, type: string): string => {
    switch (type) {
      case "base64":
        return btoa(unescape(encodeURIComponent(text)));
      case "url":
        return encodeURIComponent(text);
      case "html":
        return text.replace(/[&<>"']/g, (m) => ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        }[m] || m));
      case "unicode":
        return text.split("").map((c) => `\\u${c.charCodeAt(0).toString(16).padStart(4, "0")}`).join("");
      case "hex":
        return text.split("").map((c) => c.charCodeAt(0).toString(16).padStart(2, "0")).join(" ");
      case "binary":
        return text.split("").map((c) => c.charCodeAt(0).toString(2).padStart(8, "0")).join(" ");
      case "ascii":
        return text.split("").map((c) => c.charCodeAt(0)).join(" ");
      default:
        return text;
    }
  };

  const decode = (text: string, type: string): string => {
    switch (type) {
      case "base64":
        return decodeURIComponent(escape(atob(text)));
      case "url":
        return decodeURIComponent(text);
      case "html":
        const div = document.createElement("div");
        div.innerHTML = text;
        return div.textContent || "";
      case "unicode":
        return text.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
      case "hex":
        return text.split(" ").filter(Boolean).map((h) => String.fromCharCode(parseInt(h, 16))).join("");
      case "binary":
        return text.split(" ").filter(Boolean).map((b) => String.fromCharCode(parseInt(b, 2))).join("");
      case "ascii":
        return text.split(" ").filter(Boolean).map((n) => String.fromCharCode(parseInt(n))).join("");
      default:
        return text;
    }
  };

  const process = () => {
    setError("");
    try {
      const result = mode === "encode" ? encode(input, encodingType) : decode(input, encodingType);
      setOutput(result);
    } catch (e) {
      setError(`Failed to ${mode}: Invalid input for ${encodingTypes.find((t) => t.key === encodingType)?.label}`);
      setOutput("");
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const swap = () => {
    setInput(output);
    setOutput("");
    setMode(mode === "encode" ? "decode" : "encode");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {encodingTypes.map((type) => (
          <button
            key={type.key}
            onClick={() => setEncodingType(type.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              encodingType === type.key
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setMode("encode")}
          className={`flex-1 py-2 rounded-lg font-medium transition-all ${
            mode === "encode"
              ? "bg-green-500/20 text-green-500 border border-green-500/50"
              : "bg-muted hover:bg-muted/80"
          }`}
        >
          Encode
        </button>
        <button
          onClick={() => setMode("decode")}
          className={`flex-1 py-2 rounded-lg font-medium transition-all ${
            mode === "decode"
              ? "bg-blue-500/20 text-blue-500 border border-blue-500/50"
              : "bg-muted hover:bg-muted/80"
          }`}
        >
          Decode
        </button>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-muted-foreground">Input</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Enter text to ${mode}...`}
          className="tool-panel-input min-h-[150px]"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={process}
          className="flex-1 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
        >
          <Code className="w-4 h-4" />
          {mode === "encode" ? "Encode" : "Decode"}
        </button>
        {output && (
          <button
            onClick={swap}
            className="px-4 py-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
            title="Swap input/output"
          >
            <ArrowRightLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      {error && (
        <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm">
          {error}
        </div>
      )}

      {output && !error && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm text-muted-foreground">Output</label>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-3 py-1 rounded-lg bg-muted hover:bg-muted/80 text-sm transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <div className="tool-panel-output break-all">{output}</div>
        </div>
      )}
    </div>
  );
}

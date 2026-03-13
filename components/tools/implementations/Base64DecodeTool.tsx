"use client";

import { useState } from "react";
import { Unlock, Copy, Check, AlertCircle } from "lucide-react";
import { textEncode } from "@/lib/textProcessor";

export default function Base64DecodeTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const decode = () => {
    setError("");
    if (!input.trim()) {
      setOutput("");
      return;
    }
    
    try {
      const decoded = textEncode.base64Decode(input.trim());
      if (!decoded && input.trim()) {
        setError("Invalid Base64 string");
        setOutput("");
      } else {
        setOutput(decoded);
      }
    } catch {
      setError("Invalid Base64 string");
      setOutput("");
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadSample = () => {
    setInput("SGVsbG8sIFdvcmxkISBUaGlzIGlzIGEgc2FtcGxlIHRleHQgZm9yIEJhc2U2NCBlbmNvZGluZy4=");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={loadSample}
          className="px-3 py-1.5 text-sm bg-muted hover:bg-muted/80 rounded-lg transition-colors"
        >
          Load Sample
        </button>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-muted-foreground flex items-center gap-2">
          <Unlock className="w-4 h-4" />
          Base64 String to Decode
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter Base64 encoded string..."
          className="tool-panel-input min-h-[150px] font-mono text-sm"
        />
      </div>

      <button
        onClick={decode}
        className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
      >
        Decode Base64
      </button>

      {error && (
        <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
          <div>
            <p className="font-medium text-destructive">Decode Error</p>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm text-muted-foreground">Decoded Text</label>
          {output && (
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-3 py-1 rounded-lg bg-muted hover:bg-muted/80 text-sm transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy"}
            </button>
          )}
        </div>
        <div className="tool-panel-output min-h-[150px]">
          {output || <span className="text-muted-foreground">Decoded text will appear here</span>}
        </div>
      </div>

      {input && output && (
        <div className="grid grid-cols-2 gap-4">
          <div className="stat-card text-center">
            <p className="stat-value">{input.length}</p>
            <p className="stat-label">Input Characters</p>
          </div>
          <div className="stat-card text-center">
            <p className="stat-value">{output.length}</p>
            <p className="stat-label">Decoded Characters</p>
          </div>
        </div>
      )}
    </div>
  );
}

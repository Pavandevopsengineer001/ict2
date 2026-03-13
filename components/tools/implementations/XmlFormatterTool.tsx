"use client";

import { useState } from "react";
import { Code, Copy, Check, AlertCircle, Minimize2, Maximize2 } from "lucide-react";
import { xmlUtils } from "@/lib/dataConverter";

export default function XmlFormatterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const format = () => {
    setError("");
    if (!input.trim()) {
      setError("Please enter XML to format");
      return;
    }
    try {
      const formatted = xmlUtils.format(input);
      setOutput(formatted);
    } catch (e) {
      setError((e as Error).message || "Invalid XML format");
      setOutput("");
    }
  };

  const minify = () => {
    setError("");
    if (!input.trim()) {
      setError("Please enter XML to minify");
      return;
    }
    try {
      const minified = xmlUtils.minify(input);
      setOutput(minified);
    } catch (e) {
      setError((e as Error).message || "Invalid XML format");
      setOutput("");
    }
  };

  const validate = () => {
    setError("");
    if (!input.trim()) {
      setError("Please enter XML to validate");
      return;
    }
    const result = xmlUtils.validate(input);
    if (result.valid) {
      setOutput("Valid XML!");
      setError("");
    } else {
      setError(result.error || "Invalid XML");
      setOutput("");
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadSample = () => {
    setInput(`<?xml version="1.0" encoding="UTF-8"?><catalog><book id="1"><title>The Great Gatsby</title><author>F. Scott Fitzgerald</author><year>1925</year><price>10.99</price></book><book id="2"><title>To Kill a Mockingbird</title><author>Harper Lee</author><year>1960</year><price>12.99</price></book></catalog>`);
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground flex items-center gap-2">
            <Code className="w-4 h-4" />
            Input XML
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="<root><element>value</element></root>"
            className="tool-panel-input min-h-[350px] font-mono text-sm"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm text-muted-foreground">Output</label>
            {output && !error && (
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-3 py-1 rounded-lg bg-muted hover:bg-muted/80 text-sm transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy"}
              </button>
            )}
          </div>
          {error ? (
            <div className="tool-panel-output min-h-[350px] flex items-center justify-center">
              <div className="text-center">
                <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
                <p className="text-destructive font-medium">XML Error</p>
                <p className="text-sm text-muted-foreground mt-2">{error}</p>
              </div>
            </div>
          ) : (
            <pre className="tool-panel-output min-h-[350px] font-mono text-sm whitespace-pre-wrap overflow-auto">
              {output || <span className="text-muted-foreground">Formatted output will appear here</span>}
            </pre>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={format}
          className="flex-1 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
        >
          <Maximize2 className="w-4 h-4" />
          Format / Beautify
        </button>
        <button
          onClick={minify}
          className="flex-1 py-3 bg-muted text-foreground rounded-lg font-medium hover:bg-muted/80 transition-colors flex items-center justify-center gap-2"
        >
          <Minimize2 className="w-4 h-4" />
          Minify
        </button>
        <button
          onClick={validate}
          className="flex-1 py-3 bg-muted text-foreground rounded-lg font-medium hover:bg-muted/80 transition-colors flex items-center justify-center gap-2"
        >
          <Check className="w-4 h-4" />
          Validate
        </button>
      </div>
    </div>
  );
}

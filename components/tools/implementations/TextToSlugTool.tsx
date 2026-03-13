"use client";

import { useState, useEffect } from "react";
import { Link, Copy, Check } from "lucide-react";
import { textManipulate } from "@/lib/textProcessor";

export default function TextToSlugTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [separator, setSeparator] = useState("-");
  const [lowercase, setLowercase] = useState(true);
  const [maxLength, setMaxLength] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!input.trim()) {
      setOutput("");
      return;
    }

    let slug = input
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
      .replace(/[^\w\s-]/g, "") // Remove non-word chars
      .trim()
      .replace(/[\s_]+/g, separator) // Replace spaces/underscores with separator
      .replace(new RegExp(`${separator}+`, "g"), separator) // Remove duplicate separators
      .replace(new RegExp(`^${separator}|${separator}$`, "g"), ""); // Remove leading/trailing separators

    if (lowercase) {
      slug = slug.toLowerCase();
    }

    if (maxLength > 0 && slug.length > maxLength) {
      slug = slug.substring(0, maxLength);
      // Remove trailing separator if cut mid-word
      slug = slug.replace(new RegExp(`${separator}$`), "");
    }

    setOutput(slug);
  }, [input, separator, lowercase, maxLength]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadSample = () => {
    setInput("How to Build a Modern Web Application with Next.js & React!");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <button
          onClick={loadSample}
          className="px-3 py-1.5 text-sm bg-muted hover:bg-muted/80 rounded-lg transition-colors"
        >
          Load Sample
        </button>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-muted-foreground flex items-center gap-2">
          <Link className="w-4 h-4" />
          Text Input
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to convert to URL slug..."
          className="tool-panel-input min-h-[120px]"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Separator</label>
          <select
            value={separator}
            onChange={(e) => setSeparator(e.target.value)}
            className="calc-select"
          >
            <option value="-">Hyphen (-)</option>
            <option value="_">Underscore (_)</option>
            <option value=".">Dot (.)</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Max Length</label>
          <input
            type="number"
            value={maxLength}
            onChange={(e) => setMaxLength(Math.max(0, parseInt(e.target.value) || 0))}
            placeholder="0 = unlimited"
            min="0"
            className="calc-input"
          />
        </div>
        <div className="flex items-end pb-1">
          <label className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 cursor-pointer hover:bg-muted transition-colors">
            <input
              type="checkbox"
              checked={lowercase}
              onChange={(e) => setLowercase(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm">Lowercase</span>
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm text-muted-foreground">Generated Slug</label>
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
        <div className="tool-panel-output min-h-[80px] font-mono text-lg flex items-center justify-center">
          {output || <span className="text-muted-foreground">Slug will appear here</span>}
        </div>
      </div>

      {output && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="stat-card text-center">
            <p className="stat-value">{input.length}</p>
            <p className="stat-label">Original Length</p>
          </div>
          <div className="stat-card text-center">
            <p className="stat-value">{output.length}</p>
            <p className="stat-label">Slug Length</p>
          </div>
          <div className="stat-card text-center">
            <p className="stat-value">{input.split(/\s+/).filter(Boolean).length}</p>
            <p className="stat-label">Word Count</p>
          </div>
          <div className="stat-card text-center">
            <p className="stat-value">{(output.match(new RegExp(separator, "g")) || []).length + 1}</p>
            <p className="stat-label">Segments</p>
          </div>
        </div>
      )}

      <div className="p-4 rounded-lg bg-muted/50">
        <p className="text-sm text-muted-foreground">
          <strong>URL Slug Rules:</strong> Converts text to URL-friendly format by removing special characters,
          replacing spaces with the chosen separator, and optionally converting to lowercase.
          Ideal for blog post URLs, product pages, and SEO-friendly links.
        </p>
      </div>
    </div>
  );
}

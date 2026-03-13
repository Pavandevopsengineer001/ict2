"use client";

import { useState, useEffect } from "react";
import { Link, Copy, Check } from "lucide-react";
import { textEncode } from "@/lib/textProcessor";

export default function UrlEncodeTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!input) {
      setOutput("");
      return;
    }
    setOutput(textEncode.urlEncode(input));
  }, [input]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadSample = () => {
    setInput("Hello World! Special chars: @#$%^&*() and spaces");
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
          <Link className="w-4 h-4" />
          Text to URL Encode
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to URL encode..."
          className="tool-panel-input min-h-[150px]"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm text-muted-foreground">URL Encoded Output</label>
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
        <div className="tool-panel-output min-h-[150px] font-mono text-sm break-all">
          {output || <span className="text-muted-foreground">Encoded output will appear here</span>}
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
            <p className="stat-label">Output Characters</p>
          </div>
        </div>
      )}

      <div className="p-4 rounded-lg bg-muted/50">
        <p className="text-sm text-muted-foreground">
          <strong>URL Encoding</strong> (percent-encoding) converts characters into a format that can be
          transmitted over the internet. Special characters are replaced with % followed by their hex code.
        </p>
      </div>
    </div>
  );
}

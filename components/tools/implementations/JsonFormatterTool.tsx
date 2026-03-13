"use client";

import { useState } from "react";
import { Code, Copy, Check, Minimize2, Maximize2, AlertCircle } from "lucide-react";
import { DataConverter } from "@/lib/dataConverter";

export default function JsonFormatterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indentSize, setIndentSize] = useState(2);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const format = () => {
    setError("");
    const result = DataConverter.json.format(input, indentSize);
    if (result.error) {
      setError(result.error);
      setOutput("");
    } else {
      setOutput(result.output);
    }
  };

  const minify = () => {
    setError("");
    const result = DataConverter.json.minify(input);
    if (result.error) {
      setError(result.error);
      setOutput("");
    } else {
      setOutput(result.output);
    }
  };

  const validate = () => {
    setError("");
    const result = DataConverter.json.validate(input);
    if (result.valid) {
      setOutput("Valid JSON!");
      setError("");
    } else {
      setError(result.error || "Invalid JSON");
      setOutput("");
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadSample = () => {
    setInput(JSON.stringify({
      name: "John Doe",
      age: 30,
      email: "john@example.com",
      address: {
        street: "123 Main St",
        city: "New York",
        country: "USA"
      },
      hobbies: ["reading", "gaming", "coding"],
      active: true
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-muted-foreground">Indent:</label>
          <select
            value={indentSize}
            onChange={(e) => setIndentSize(parseInt(e.target.value))}
            className="calc-select w-20"
          >
            <option value="2">2 spaces</option>
            <option value="4">4 spaces</option>
            <option value="1">Tab</option>
          </select>
        </div>
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
            Input JSON
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"key": "value"}'
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
                <p className="text-destructive font-medium">Invalid JSON</p>
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

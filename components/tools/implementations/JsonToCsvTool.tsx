"use client";

import { useState } from "react";
import { FileJson, Copy, Check, Download, AlertCircle } from "lucide-react";
import { jsonUtils } from "@/lib/dataConverter";

export default function JsonToCsvTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const convert = () => {
    setError("");
    if (!input.trim()) {
      setError("Please enter JSON data");
      return;
    }
    try {
      const csv = jsonUtils.toCsv(input);
      setOutput(csv);
    } catch (e) {
      setError((e as Error).message || "Invalid JSON format");
      setOutput("");
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadCsv = () => {
    const blob = new Blob([output], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadSample = () => {
    setInput(JSON.stringify([
      { name: "John Doe", age: 30, email: "john@example.com", city: "New York" },
      { name: "Jane Smith", age: 25, email: "jane@example.com", city: "Los Angeles" },
      { name: "Bob Wilson", age: 35, email: "bob@example.com", city: "Chicago" }
    ], null, 2));
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
            <FileJson className="w-4 h-4" />
            JSON Input (Array of Objects)
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='[{"name": "John", "age": 30}, {"name": "Jane", "age": 25}]'
            className="tool-panel-input min-h-[350px] font-mono text-sm"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm text-muted-foreground">CSV Output</label>
            {output && !error && (
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 px-3 py-1 rounded-lg bg-muted hover:bg-muted/80 text-sm transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied!" : "Copy"}
                </button>
                <button
                  onClick={downloadCsv}
                  className="flex items-center gap-2 px-3 py-1 rounded-lg bg-muted hover:bg-muted/80 text-sm transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            )}
          </div>
          {error ? (
            <div className="tool-panel-output min-h-[350px] flex items-center justify-center">
              <div className="text-center">
                <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
                <p className="text-destructive font-medium">Conversion Error</p>
                <p className="text-sm text-muted-foreground mt-2">{error}</p>
              </div>
            </div>
          ) : (
            <pre className="tool-panel-output min-h-[350px] font-mono text-sm whitespace-pre-wrap overflow-auto">
              {output || <span className="text-muted-foreground">CSV output will appear here</span>}
            </pre>
          )}
        </div>
      </div>

      <button
        onClick={convert}
        className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
      >
        Convert to CSV
      </button>
    </div>
  );
}

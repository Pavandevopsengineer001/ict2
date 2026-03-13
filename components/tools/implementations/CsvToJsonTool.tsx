"use client";

import { useState } from "react";
import { FileText, Copy, Check, Download, AlertCircle } from "lucide-react";
import { csvUtils } from "@/lib/dataConverter";

export default function CsvToJsonTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [delimiter, setDelimiter] = useState(",");

  const convert = () => {
    setError("");
    if (!input.trim()) {
      setError("Please enter CSV data");
      return;
    }
    try {
      const json = csvUtils.toJson(input, { delimiter });
      setOutput(json);
    } catch (e) {
      setError((e as Error).message || "Invalid CSV format");
      setOutput("");
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadJson = () => {
    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadSample = () => {
    setInput(`name,age,email,city
John Doe,30,john@example.com,New York
Jane Smith,25,jane@example.com,Los Angeles
Bob Wilson,35,bob@example.com,Chicago`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-muted-foreground">Delimiter:</label>
          <select
            value={delimiter}
            onChange={(e) => setDelimiter(e.target.value)}
            className="calc-select w-24"
          >
            <option value=",">Comma</option>
            <option value=";">Semicolon</option>
            <option value="\t">Tab</option>
            <option value="|">Pipe</option>
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
            <FileText className="w-4 h-4" />
            CSV Input
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="name,age,email&#10;John,30,john@example.com"
            className="tool-panel-input min-h-[350px] font-mono text-sm"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm text-muted-foreground">JSON Output</label>
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
                  onClick={downloadJson}
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
              {output || <span className="text-muted-foreground">JSON output will appear here</span>}
            </pre>
          )}
        </div>
      </div>

      <button
        onClick={convert}
        className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
      >
        Convert to JSON
      </button>
    </div>
  );
}

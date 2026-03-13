"use client";

import { useState } from "react";
import { CheckCircle, XCircle, AlertCircle, Code, Copy, Check, Info } from "lucide-react";

interface ValidationResult {
  valid: boolean;
  error?: string;
  errorLine?: number;
  errorColumn?: number;
  stats?: {
    keys: number;
    depth: number;
    arrays: number;
    objects: number;
    strings: number;
    numbers: number;
    booleans: number;
    nulls: number;
  };
}

export default function JsonValidatorTool() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [copied, setCopied] = useState(false);

  const analyzeJson = (obj: unknown, stats: ValidationResult["stats"], depth = 0): number => {
    if (!stats) return depth;
    
    if (obj === null) {
      stats.nulls++;
      return depth;
    }

    if (Array.isArray(obj)) {
      stats.arrays++;
      let maxDepth = depth;
      for (const item of obj) {
        const itemDepth = analyzeJson(item, stats, depth + 1);
        maxDepth = Math.max(maxDepth, itemDepth);
      }
      return maxDepth;
    }

    if (typeof obj === "object") {
      stats.objects++;
      const keys = Object.keys(obj);
      stats.keys += keys.length;
      let maxDepth = depth;
      for (const key of keys) {
        const valueDepth = analyzeJson((obj as Record<string, unknown>)[key], stats, depth + 1);
        maxDepth = Math.max(maxDepth, valueDepth);
      }
      return maxDepth;
    }

    if (typeof obj === "string") stats.strings++;
    if (typeof obj === "number") stats.numbers++;
    if (typeof obj === "boolean") stats.booleans++;

    return depth;
  };

  const validate = () => {
    if (!input.trim()) {
      setResult({ valid: false, error: "Please enter JSON to validate" });
      return;
    }

    try {
      const parsed = JSON.parse(input);
      
      const stats = {
        keys: 0,
        depth: 0,
        arrays: 0,
        objects: 0,
        strings: 0,
        numbers: 0,
        booleans: 0,
        nulls: 0,
      };

      const depth = analyzeJson(parsed, stats);
      stats.depth = depth;

      setResult({ valid: true, stats });
    } catch (e) {
      const error = e as SyntaxError;
      const errorMessage = error.message;
      
      // Try to extract line and column from error message
      let errorLine: number | undefined;
      let errorColumn: number | undefined;
      
      const posMatch = errorMessage.match(/position (\d+)/);
      if (posMatch) {
        const position = parseInt(posMatch[1]);
        const lines = input.substring(0, position).split("\n");
        errorLine = lines.length;
        errorColumn = lines[lines.length - 1].length + 1;
      }

      setResult({
        valid: false,
        error: errorMessage,
        errorLine,
        errorColumn,
      });
    }
  };

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed, null, 2));
      validate();
    } catch {
      // Ignore formatting errors
    }
  };

  const copyFormatted = async () => {
    try {
      const parsed = JSON.parse(input);
      await navigator.clipboard.writeText(JSON.stringify(parsed, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore copy errors
    }
  };

  const loadSample = () => {
    setInput(JSON.stringify({
      name: "John Doe",
      age: 30,
      email: "john@example.com",
      isActive: true,
      address: {
        street: "123 Main St",
        city: "New York",
        country: "USA"
      },
      hobbies: ["reading", "gaming", "coding"],
      metadata: null
    }, null, 2));
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
        <button
          onClick={formatJson}
          className="px-3 py-1.5 text-sm bg-muted hover:bg-muted/80 rounded-lg transition-colors"
        >
          Format JSON
        </button>
        {result?.valid && (
          <button
            onClick={copyFormatted}
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-muted hover:bg-muted/80 rounded-lg transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied!" : "Copy Formatted"}
          </button>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm text-muted-foreground flex items-center gap-2">
          <Code className="w-4 h-4" />
          JSON Input
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"key": "value"}'
          className="tool-panel-input min-h-[300px] font-mono text-sm"
        />
      </div>

      <button
        onClick={validate}
        className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
      >
        Validate JSON
      </button>

      {result && (
        <div className="space-y-4">
          <div
            className={`p-4 rounded-lg flex items-start gap-3 ${
              result.valid
                ? "bg-green-500/10 border border-green-500/30"
                : "bg-destructive/10 border border-destructive/30"
            }`}
          >
            {result.valid ? (
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
            ) : (
              <XCircle className="w-6 h-6 text-destructive flex-shrink-0" />
            )}
            <div>
              <p className={`font-medium ${result.valid ? "text-green-500" : "text-destructive"}`}>
                {result.valid ? "Valid JSON" : "Invalid JSON"}
              </p>
              {result.error && (
                <p className="text-sm text-muted-foreground mt-1">{result.error}</p>
              )}
              {result.errorLine && (
                <p className="text-sm text-muted-foreground">
                  Line {result.errorLine}, Column {result.errorColumn}
                </p>
              )}
            </div>
          </div>

          {result.valid && result.stats && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">JSON Statistics</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="stat-card text-center">
                  <p className="stat-value">{result.stats.depth}</p>
                  <p className="stat-label">Max Depth</p>
                </div>
                <div className="stat-card text-center">
                  <p className="stat-value">{result.stats.keys}</p>
                  <p className="stat-label">Total Keys</p>
                </div>
                <div className="stat-card text-center">
                  <p className="stat-value">{result.stats.objects}</p>
                  <p className="stat-label">Objects</p>
                </div>
                <div className="stat-card text-center">
                  <p className="stat-value">{result.stats.arrays}</p>
                  <p className="stat-label">Arrays</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="stat-card text-center">
                  <p className="stat-value">{result.stats.strings}</p>
                  <p className="stat-label">Strings</p>
                </div>
                <div className="stat-card text-center">
                  <p className="stat-value">{result.stats.numbers}</p>
                  <p className="stat-label">Numbers</p>
                </div>
                <div className="stat-card text-center">
                  <p className="stat-value">{result.stats.booleans}</p>
                  <p className="stat-label">Booleans</p>
                </div>
                <div className="stat-card text-center">
                  <p className="stat-value">{result.stats.nulls}</p>
                  <p className="stat-label">Nulls</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

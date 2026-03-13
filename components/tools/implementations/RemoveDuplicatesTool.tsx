"use client";

import { useState } from "react";
import { Copy, Check, Trash2 } from "lucide-react";
import { textManipulate } from "@/lib/textProcessor";

export default function RemoveDuplicatesTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(true);
  const [trimLines, setTrimLines] = useState(true);
  const [removeEmpty, setRemoveEmpty] = useState(true);
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({ original: 0, unique: 0, removed: 0 });

  const removeDuplicates = () => {
    if (!input.trim()) return;

    let lines = input.split("\n");
    const originalCount = lines.length;

    if (trimLines) {
      lines = lines.map(line => line.trim());
    }

    if (removeEmpty) {
      lines = lines.filter(line => line.length > 0);
    }

    const result = textManipulate.removeDuplicateLines(lines.join("\n"), caseSensitive);
    const resultLines = result.split("\n").filter(line => !removeEmpty || line.length > 0);

    setOutput(resultLines.join("\n"));
    setStats({
      original: originalCount,
      unique: resultLines.length,
      removed: originalCount - resultLines.length,
    });
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadSample = () => {
    setInput(`apple
banana
Apple
cherry
banana
date
Cherry
apple
fig
grape
fig`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={caseSensitive}
            onChange={(e) => setCaseSensitive(e.target.checked)}
            className="w-4 h-4"
          />
          <span className="text-sm">Case sensitive</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={trimLines}
            onChange={(e) => setTrimLines(e.target.checked)}
            className="w-4 h-4"
          />
          <span className="text-sm">Trim whitespace</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={removeEmpty}
            onChange={(e) => setRemoveEmpty(e.target.checked)}
            className="w-4 h-4"
          />
          <span className="text-sm">Remove empty lines</span>
        </label>
        <button
          onClick={loadSample}
          className="px-3 py-1.5 text-sm bg-muted hover:bg-muted/80 rounded-lg transition-colors ml-auto"
        >
          Load Sample
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground flex items-center gap-2">
            <Trash2 className="w-4 h-4" />
            Input (one item per line)
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text with one item per line..."
            className="tool-panel-input min-h-[300px] font-mono text-sm"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm text-muted-foreground">Output (unique lines)</label>
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
          <pre className="tool-panel-output min-h-[300px] font-mono text-sm whitespace-pre-wrap overflow-auto">
            {output || <span className="text-muted-foreground">Unique lines will appear here</span>}
          </pre>
        </div>
      </div>

      <button
        onClick={removeDuplicates}
        className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
      >
        <Trash2 className="w-4 h-4" />
        Remove Duplicates
      </button>

      {output && (
        <div className="grid grid-cols-3 gap-4">
          <div className="stat-card text-center">
            <p className="stat-value">{stats.original}</p>
            <p className="stat-label">Original Lines</p>
          </div>
          <div className="stat-card text-center">
            <p className="stat-value">{stats.unique}</p>
            <p className="stat-label">Unique Lines</p>
          </div>
          <div className="stat-card text-center">
            <p className="stat-value text-red-500">{stats.removed}</p>
            <p className="stat-label">Removed</p>
          </div>
        </div>
      )}
    </div>
  );
}

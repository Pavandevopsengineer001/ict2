"use client";

import { useState } from "react";
import { ArrowDownUp, Copy, Check } from "lucide-react";
import { textManipulate } from "@/lib/textProcessor";

export default function TextSorterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [sortType, setSortType] = useState<"alphabetical" | "numeric" | "length">("alphabetical");
  const [reverse, setReverse] = useState(false);
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [removeDuplicates, setRemoveDuplicates] = useState(false);
  const [copied, setCopied] = useState(false);

  const sortText = () => {
    if (!input.trim()) return;

    let result = textManipulate.sortLines(input, {
      reverse,
      numeric: sortType === "numeric",
      caseSensitive,
      removeDuplicates,
    });

    // Handle length sorting
    if (sortType === "length") {
      let lines = input.split("\n");
      if (removeDuplicates) {
        lines = [...new Set(lines)];
      }
      lines.sort((a, b) => {
        const diff = a.length - b.length;
        return reverse ? -diff : diff;
      });
      result = lines.join("\n");
    }

    setOutput(result);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadSample = () => {
    if (sortType === "numeric") {
      setInput(`42
7
100
23
5
999
1
50
15`);
    } else {
      setInput(`banana
Apple
cherry
Date
elderberry
Fig
grape
apricot
Blueberry
cantaloupe`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-muted-foreground">Sort by:</label>
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value as typeof sortType)}
            className="calc-select w-36"
          >
            <option value="alphabetical">Alphabetical</option>
            <option value="numeric">Numeric</option>
            <option value="length">Length</option>
          </select>
        </div>
        <button
          onClick={loadSample}
          className="px-3 py-1.5 text-sm bg-muted hover:bg-muted/80 rounded-lg transition-colors"
        >
          Load Sample
        </button>
      </div>

      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={reverse}
            onChange={(e) => setReverse(e.target.checked)}
            className="w-4 h-4"
          />
          <span className="text-sm">Reverse order (Z-A / 9-0)</span>
        </label>
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
            checked={removeDuplicates}
            onChange={(e) => setRemoveDuplicates(e.target.checked)}
            className="w-4 h-4"
          />
          <span className="text-sm">Remove duplicates</span>
        </label>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground flex items-center gap-2">
            <ArrowDownUp className="w-4 h-4" />
            Input (one item per line)
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to sort (one item per line)..."
            className="tool-panel-input min-h-[300px] font-mono text-sm"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm text-muted-foreground">Sorted Output</label>
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
            {output || <span className="text-muted-foreground">Sorted text will appear here</span>}
          </pre>
        </div>
      </div>

      <button
        onClick={sortText}
        className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
      >
        <ArrowDownUp className="w-4 h-4" />
        Sort Lines
      </button>

      {output && (
        <div className="grid grid-cols-2 gap-4">
          <div className="stat-card text-center">
            <p className="stat-value">{input.split("\n").length}</p>
            <p className="stat-label">Input Lines</p>
          </div>
          <div className="stat-card text-center">
            <p className="stat-value">{output.split("\n").length}</p>
            <p className="stat-label">Output Lines</p>
          </div>
        </div>
      )}
    </div>
  );
}

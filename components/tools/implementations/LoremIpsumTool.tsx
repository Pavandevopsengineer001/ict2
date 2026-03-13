"use client";

import { useState } from "react";
import { FileText, Copy, Check, RefreshCw } from "lucide-react";
import { TextProcessor } from "@/lib/textProcessor";

export default function LoremIpsumTool() {
  const [type, setType] = useState<"paragraphs" | "sentences" | "words">("paragraphs");
  const [count, setCount] = useState(3);
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const text = TextProcessor.loremIpsum(count, type, startWithLorem);
    setOutput(text);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as typeof type)}
            className="calc-select"
          >
            <option value="paragraphs">Paragraphs</option>
            <option value="sentences">Sentences</option>
            <option value="words">Words</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Count</label>
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
            min="1"
            max={type === "words" ? 1000 : 100}
            className="calc-input"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Options</label>
          <label className="flex items-center gap-2 h-[46px]">
            <input
              type="checkbox"
              checked={startWithLorem}
              onChange={(e) => setStartWithLorem(e.target.checked)}
              className="w-4 h-4 rounded border-border"
            />
            <span className="text-sm">Start with "Lorem ipsum..."</span>
          </label>
        </div>
      </div>

      <button
        onClick={generate}
        className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
      >
        <RefreshCw className="w-4 h-4" />
        Generate Lorem Ipsum
      </button>

      {output && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm text-muted-foreground flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Generated Text
            </label>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-3 py-1 rounded-lg bg-muted hover:bg-muted/80 text-sm transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-500" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy
                </>
              )}
            </button>
          </div>
          <div className="tool-panel-output whitespace-pre-wrap">{output}</div>
          <div className="text-xs text-muted-foreground text-center">
            {output.split(/\s+/).length} words | {output.length} characters
          </div>
        </div>
      )}
    </div>
  );
}

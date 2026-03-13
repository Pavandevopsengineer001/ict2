"use client";

import { useState, useEffect } from "react";
import { BarChart3, Copy, Check } from "lucide-react";
import { textStats } from "@/lib/textProcessor";

interface WordFrequency {
  word: string;
  count: number;
  percentage: number;
}

export default function WordFrequencyCounterTool() {
  const [text, setText] = useState("");
  const [frequencies, setFrequencies] = useState<WordFrequency[]>([]);
  const [minLength, setMinLength] = useState(1);
  const [excludeCommon, setExcludeCommon] = useState(false);
  const [copied, setCopied] = useState(false);

  const commonWords = new Set([
    "the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for", "of",
    "with", "by", "from", "as", "is", "was", "are", "were", "been", "be",
    "have", "has", "had", "do", "does", "did", "will", "would", "could", "should",
    "may", "might", "must", "shall", "can", "this", "that", "these", "those",
    "i", "you", "he", "she", "it", "we", "they", "what", "which", "who", "when",
    "where", "why", "how", "all", "each", "every", "both", "few", "more", "most",
    "other", "some", "such", "no", "not", "only", "own", "same", "so", "than",
    "too", "very", "just", "also", "now", "here", "there", "then"
  ]);

  useEffect(() => {
    if (!text.trim()) {
      setFrequencies([]);
      return;
    }

    const freq = textStats.wordFrequency(text);
    const totalWords = freq.reduce((sum, [, count]) => sum + count, 0);

    let filtered = freq
      .filter(([word]) => word.length >= minLength)
      .filter(([word]) => !excludeCommon || !commonWords.has(word.toLowerCase()));

    const result: WordFrequency[] = filtered.map(([word, count]) => ({
      word,
      count,
      percentage: Math.round((count / totalWords) * 1000) / 10,
    }));

    setFrequencies(result);
  }, [text, minLength, excludeCommon]);

  const copyAsJson = async () => {
    const data = frequencies.reduce((acc, { word, count }) => {
      acc[word] = count;
      return acc;
    }, {} as Record<string, number>);
    await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const maxCount = frequencies.length > 0 ? frequencies[0].count : 1;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm text-muted-foreground flex items-center gap-2">
          <BarChart3 className="w-4 h-4" />
          Enter or paste your text
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your text to analyze word frequency..."
          className="tool-panel-input min-h-[200px]"
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-muted-foreground">Min Word Length:</label>
          <input
            type="number"
            value={minLength}
            onChange={(e) => setMinLength(Math.max(1, parseInt(e.target.value) || 1))}
            min="1"
            max="20"
            className="calc-input w-20"
          />
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={excludeCommon}
            onChange={(e) => setExcludeCommon(e.target.checked)}
            className="w-4 h-4"
          />
          <span className="text-sm">Exclude common words</span>
        </label>
        {frequencies.length > 0 && (
          <button
            onClick={copyAsJson}
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-muted hover:bg-muted/80 rounded-lg transition-colors ml-auto"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied!" : "Copy as JSON"}
          </button>
        )}
      </div>

      {frequencies.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="stat-card">
            <p className="stat-value">{frequencies.length}</p>
            <p className="stat-label">Unique Words</p>
          </div>
          <div className="stat-card">
            <p className="stat-value">{frequencies.reduce((s, f) => s + f.count, 0)}</p>
            <p className="stat-label">Total Words</p>
          </div>
          <div className="stat-card">
            <p className="stat-value">{frequencies[0]?.word || "-"}</p>
            <p className="stat-label">Most Common</p>
          </div>
          <div className="stat-card">
            <p className="stat-value">{frequencies[0]?.count || 0}</p>
            <p className="stat-label">Max Count</p>
          </div>
        </div>
      )}

      {frequencies.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">
            Word Frequency (Top {Math.min(50, frequencies.length)})
          </label>
          <div className="max-h-[400px] overflow-auto space-y-1">
            {frequencies.slice(0, 50).map(({ word, count, percentage }, index) => (
              <div
                key={word}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50"
              >
                <span className="text-xs text-muted-foreground w-6">{index + 1}</span>
                <span className="font-mono text-sm w-32 truncate">{word}</span>
                <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary/60 rounded-full"
                    style={{ width: `${(count / maxCount) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium w-12 text-right">{count}</span>
                <span className="text-xs text-muted-foreground w-14 text-right">{percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

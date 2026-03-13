"use client";

import { useState, useEffect } from "react";
import { Type, List } from "lucide-react";
import { textStats } from "@/lib/textProcessor";

export default function SentenceCounterTool() {
  const [text, setText] = useState("");
  const [sentences, setSentences] = useState<string[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    avgWordsPerSentence: 0,
    longestSentence: "",
    shortestSentence: "",
  });

  useEffect(() => {
    if (!text.trim()) {
      setSentences([]);
      setStats({ total: 0, avgWordsPerSentence: 0, longestSentence: "", shortestSentence: "" });
      return;
    }

    // Split into sentences
    const sentenceList = text
      .split(/(?<=[.!?])\s+/)
      .map(s => s.trim())
      .filter(s => s.length > 0);

    setSentences(sentenceList);

    // Calculate stats
    const wordCounts = sentenceList.map(s => s.split(/\s+/).filter(w => w.length > 0).length);
    const avgWords = wordCounts.length > 0 
      ? wordCounts.reduce((a, b) => a + b, 0) / wordCounts.length 
      : 0;

    const longestIdx = wordCounts.indexOf(Math.max(...wordCounts));
    const shortestIdx = wordCounts.indexOf(Math.min(...wordCounts));

    setStats({
      total: sentenceList.length,
      avgWordsPerSentence: Math.round(avgWords * 10) / 10,
      longestSentence: sentenceList[longestIdx] || "",
      shortestSentence: sentenceList[shortestIdx] || "",
    });
  }, [text]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm text-muted-foreground flex items-center gap-2">
          <Type className="w-4 h-4" />
          Enter or paste your text
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your text here..."
          className="tool-panel-input min-h-[200px]"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="stat-card">
          <p className="stat-value">{stats.total}</p>
          <p className="stat-label">Sentences</p>
        </div>
        <div className="stat-card">
          <p className="stat-value">{stats.avgWordsPerSentence}</p>
          <p className="stat-label">Avg Words/Sentence</p>
        </div>
        <div className="stat-card">
          <p className="stat-value">{textStats.countWords(text)}</p>
          <p className="stat-label">Total Words</p>
        </div>
        <div className="stat-card">
          <p className="stat-value">{text.length}</p>
          <p className="stat-label">Characters</p>
        </div>
      </div>

      {sentences.length > 0 && (
        <div className="space-y-4">
          {stats.longestSentence && (
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <p className="text-sm text-muted-foreground mb-1">Longest Sentence ({stats.longestSentence.split(/\s+/).length} words)</p>
              <p className="text-sm">{stats.longestSentence}</p>
            </div>
          )}
          
          {stats.shortestSentence && stats.longestSentence !== stats.shortestSentence && (
            <div className="p-4 rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground mb-1">Shortest Sentence ({stats.shortestSentence.split(/\s+/).length} words)</p>
              <p className="text-sm">{stats.shortestSentence}</p>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground flex items-center gap-2">
              <List className="w-4 h-4" />
              All Sentences ({sentences.length})
            </label>
            <div className="max-h-[300px] overflow-auto space-y-2">
              {sentences.map((sentence, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg bg-card border border-border/50 text-sm"
                >
                  <span className="text-muted-foreground mr-2">{index + 1}.</span>
                  {sentence}
                  <span className="text-xs text-muted-foreground ml-2">
                    ({sentence.split(/\s+/).filter(w => w).length} words)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

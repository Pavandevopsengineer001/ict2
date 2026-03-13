"use client";

import { useState, useEffect } from "react";
import { Type, List } from "lucide-react";
import { textStats } from "@/lib/textProcessor";

export default function ParagraphCounterTool() {
  const [text, setText] = useState("");
  const [paragraphs, setParagraphs] = useState<string[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    avgWordsPerParagraph: 0,
    avgSentencesPerParagraph: 0,
    totalWords: 0,
    totalSentences: 0,
  });

  useEffect(() => {
    if (!text.trim()) {
      setParagraphs([]);
      setStats({ total: 0, avgWordsPerParagraph: 0, avgSentencesPerParagraph: 0, totalWords: 0, totalSentences: 0 });
      return;
    }

    // Split into paragraphs (separated by blank lines)
    const paragraphList = text
      .split(/\n\s*\n/)
      .map(p => p.trim())
      .filter(p => p.length > 0);

    setParagraphs(paragraphList);

    // Calculate stats
    const wordCounts = paragraphList.map(p => p.split(/\s+/).filter(w => w.length > 0).length);
    const sentenceCounts = paragraphList.map(p => p.split(/[.!?]+/).filter(s => s.trim().length > 0).length);
    
    const totalWords = wordCounts.reduce((a, b) => a + b, 0);
    const totalSentences = sentenceCounts.reduce((a, b) => a + b, 0);
    const avgWords = paragraphList.length > 0 ? totalWords / paragraphList.length : 0;
    const avgSentences = paragraphList.length > 0 ? totalSentences / paragraphList.length : 0;

    setStats({
      total: paragraphList.length,
      avgWordsPerParagraph: Math.round(avgWords * 10) / 10,
      avgSentencesPerParagraph: Math.round(avgSentences * 10) / 10,
      totalWords,
      totalSentences,
    });
  }, [text]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm text-muted-foreground flex items-center gap-2">
          <Type className="w-4 h-4" />
          Enter or paste your text (separate paragraphs with blank lines)
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your first paragraph here...&#10;&#10;Enter your second paragraph here..."
          className="tool-panel-input min-h-[250px]"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="stat-card">
          <p className="stat-value">{stats.total}</p>
          <p className="stat-label">Paragraphs</p>
        </div>
        <div className="stat-card">
          <p className="stat-value">{stats.totalSentences}</p>
          <p className="stat-label">Sentences</p>
        </div>
        <div className="stat-card">
          <p className="stat-value">{stats.totalWords}</p>
          <p className="stat-label">Words</p>
        </div>
        <div className="stat-card">
          <p className="stat-value">{stats.avgWordsPerParagraph}</p>
          <p className="stat-label">Avg Words/Para</p>
        </div>
        <div className="stat-card">
          <p className="stat-value">{stats.avgSentencesPerParagraph}</p>
          <p className="stat-label">Avg Sentences/Para</p>
        </div>
      </div>

      {paragraphs.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground flex items-center gap-2">
            <List className="w-4 h-4" />
            Paragraph Breakdown
          </label>
          <div className="max-h-[400px] overflow-auto space-y-3">
            {paragraphs.map((paragraph, index) => {
              const words = paragraph.split(/\s+/).filter(w => w.length > 0).length;
              const sentences = paragraph.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
              const chars = paragraph.length;

              return (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-card border border-border/50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Paragraph {index + 1}</span>
                    <div className="flex gap-3 text-xs text-muted-foreground">
                      <span>{words} words</span>
                      <span>{sentences} sentences</span>
                      <span>{chars} chars</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {paragraph}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

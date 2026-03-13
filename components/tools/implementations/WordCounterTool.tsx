"use client";

import { useState, useEffect } from "react";
import { FileText, Clock, Type } from "lucide-react";
import { TextProcessor } from "@/lib/textProcessor";

export default function WordCounterTool() {
  const [text, setText] = useState("");
  const [stats, setStats] = useState({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    lines: 0,
    readingTime: 0,
    speakingTime: 0,
  });

  useEffect(() => {
    const newStats = TextProcessor.analyze(text);
    setStats(newStats);
  }, [text]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm text-muted-foreground flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Enter or paste your text
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your text here..."
          className="tool-panel-input min-h-[300px]"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="stat-card">
          <p className="stat-value">{stats.words.toLocaleString()}</p>
          <p className="stat-label">Words</p>
        </div>
        <div className="stat-card">
          <p className="stat-value">{stats.characters.toLocaleString()}</p>
          <p className="stat-label">Characters</p>
        </div>
        <div className="stat-card">
          <p className="stat-value">{stats.charactersNoSpaces.toLocaleString()}</p>
          <p className="stat-label">No Spaces</p>
        </div>
        <div className="stat-card">
          <p className="stat-value">{stats.sentences.toLocaleString()}</p>
          <p className="stat-label">Sentences</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="stat-card">
          <p className="stat-value">{stats.paragraphs.toLocaleString()}</p>
          <p className="stat-label">Paragraphs</p>
        </div>
        <div className="stat-card">
          <p className="stat-value">{stats.lines.toLocaleString()}</p>
          <p className="stat-label">Lines</p>
        </div>
        <div className="stat-card flex flex-col items-center">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-primary" />
            <p className="stat-value text-lg">{stats.readingTime}</p>
          </div>
          <p className="stat-label">Min Read</p>
        </div>
        <div className="stat-card flex flex-col items-center">
          <div className="flex items-center gap-1">
            <Type className="w-4 h-4 text-primary" />
            <p className="stat-value text-lg">{stats.speakingTime}</p>
          </div>
          <p className="stat-label">Min Speak</p>
        </div>
      </div>

      {text && (
        <div className="text-xs text-muted-foreground text-center">
          Real-time analysis updates as you type
        </div>
      )}
    </div>
  );
}

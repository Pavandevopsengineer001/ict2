"use client";

import { useState, useEffect } from "react";
import { Clock, BookOpen, Mic } from "lucide-react";
import { textStats } from "@/lib/textProcessor";

export default function ReadingTimeCalculatorTool() {
  const [text, setText] = useState("");
  const [readingSpeed, setReadingSpeed] = useState(200);
  const [speakingSpeed, setSpeakingSpeed] = useState(150);
  const [stats, setStats] = useState({
    words: 0,
    characters: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: { minutes: 0, seconds: 0 },
    speakingTime: { minutes: 0, seconds: 0 },
  });

  useEffect(() => {
    const fullStats = textStats.fullStats(text);
    
    const readingMs = (fullStats.words / readingSpeed) * 60 * 1000;
    const speakingMs = (fullStats.words / speakingSpeed) * 60 * 1000;

    setStats({
      words: fullStats.words,
      characters: fullStats.characters,
      sentences: fullStats.sentences,
      paragraphs: fullStats.paragraphs,
      readingTime: {
        minutes: Math.floor(readingMs / 60000),
        seconds: Math.round((readingMs % 60000) / 1000),
      },
      speakingTime: {
        minutes: Math.floor(speakingMs / 60000),
        seconds: Math.round((speakingMs % 60000) / 1000),
      },
    });
  }, [text, readingSpeed, speakingSpeed]);

  const formatTime = (minutes: number, seconds: number) => {
    if (minutes === 0 && seconds === 0) return "0 sec";
    if (minutes === 0) return `${seconds} sec`;
    if (seconds === 0) return `${minutes} min`;
    return `${minutes} min ${seconds} sec`;
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm text-muted-foreground flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          Enter or paste your text
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your article, blog post, or any text to calculate reading time..."
          className="tool-panel-input min-h-[200px]"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Reading Speed (wpm)</label>
          <input
            type="number"
            value={readingSpeed}
            onChange={(e) => setReadingSpeed(Math.max(50, parseInt(e.target.value) || 200))}
            min="50"
            max="1000"
            className="calc-input"
          />
          <p className="text-xs text-muted-foreground">Average: 200-250 wpm</p>
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Speaking Speed (wpm)</label>
          <input
            type="number"
            value={speakingSpeed}
            onChange={(e) => setSpeakingSpeed(Math.max(50, parseInt(e.target.value) || 150))}
            min="50"
            max="500"
            className="calc-input"
          />
          <p className="text-xs text-muted-foreground">Average: 125-150 wpm</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="stat-card bg-primary/5 border-primary/20">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-6 h-6 text-primary" />
            <span className="text-sm text-muted-foreground">Reading Time</span>
          </div>
          <p className="text-3xl font-bold">
            {formatTime(stats.readingTime.minutes, stats.readingTime.seconds)}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            at {readingSpeed} words per minute
          </p>
        </div>
        <div className="stat-card bg-secondary/10 border-secondary/20">
          <div className="flex items-center gap-3 mb-2">
            <Mic className="w-6 h-6 text-secondary-foreground" />
            <span className="text-sm text-muted-foreground">Speaking Time</span>
          </div>
          <p className="text-3xl font-bold">
            {formatTime(stats.speakingTime.minutes, stats.speakingTime.seconds)}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            at {speakingSpeed} words per minute
          </p>
        </div>
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
          <p className="stat-value">{stats.sentences}</p>
          <p className="stat-label">Sentences</p>
        </div>
        <div className="stat-card">
          <p className="stat-value">{stats.paragraphs}</p>
          <p className="stat-label">Paragraphs</p>
        </div>
      </div>

      <div className="p-4 rounded-lg bg-muted/50">
        <h4 className="text-sm font-medium mb-2">Reading Speed Reference</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div className="p-2 rounded bg-muted">
            <p className="font-medium">Slow</p>
            <p className="text-xs text-muted-foreground">~150 wpm</p>
          </div>
          <div className="p-2 rounded bg-muted">
            <p className="font-medium">Average</p>
            <p className="text-xs text-muted-foreground">~200-250 wpm</p>
          </div>
          <div className="p-2 rounded bg-muted">
            <p className="font-medium">Fast</p>
            <p className="text-xs text-muted-foreground">~300-400 wpm</p>
          </div>
          <div className="p-2 rounded bg-muted">
            <p className="font-medium">Speed Reader</p>
            <p className="text-xs text-muted-foreground">~500+ wpm</p>
          </div>
        </div>
      </div>
    </div>
  );
}

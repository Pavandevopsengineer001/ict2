"use client";

import { useState, useEffect } from "react";
import { Type, Hash } from "lucide-react";

export default function CharacterCounterTool() {
  const [text, setText] = useState("");
  const [stats, setStats] = useState({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    lines: 0,
    letters: 0,
    digits: 0,
    spaces: 0,
    special: 0,
    uppercase: 0,
    lowercase: 0,
  });

  useEffect(() => {
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lines = text ? text.split("\n").length : 0;
    const letters = (text.match(/[a-zA-Z]/g) || []).length;
    const digits = (text.match(/\d/g) || []).length;
    const spaces = (text.match(/\s/g) || []).length;
    const special = (text.match(/[^a-zA-Z0-9\s]/g) || []).length;
    const uppercase = (text.match(/[A-Z]/g) || []).length;
    const lowercase = (text.match(/[a-z]/g) || []).length;

    setStats({
      characters,
      charactersNoSpaces,
      words,
      lines,
      letters,
      digits,
      spaces,
      special,
      uppercase,
      lowercase,
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
          <p className="stat-value">{stats.characters.toLocaleString()}</p>
          <p className="stat-label">Characters</p>
        </div>
        <div className="stat-card">
          <p className="stat-value">{stats.charactersNoSpaces.toLocaleString()}</p>
          <p className="stat-label">Without Spaces</p>
        </div>
        <div className="stat-card">
          <p className="stat-value">{stats.words.toLocaleString()}</p>
          <p className="stat-label">Words</p>
        </div>
        <div className="stat-card">
          <p className="stat-value">{stats.lines.toLocaleString()}</p>
          <p className="stat-label">Lines</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <p className="stat-label">Letters</p>
            <p className="stat-value">{stats.letters}</p>
          </div>
          <div className="mt-2 text-xs text-muted-foreground flex justify-between">
            <span>Uppercase: {stats.uppercase}</span>
            <span>Lowercase: {stats.lowercase}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <p className="stat-label">Digits</p>
            <p className="stat-value">{stats.digits}</p>
          </div>
          <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary/60 rounded-full"
              style={{ width: `${stats.characters ? (stats.digits / stats.characters) * 100 : 0}%` }}
            />
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <p className="stat-label">Spaces</p>
            <p className="stat-value">{stats.spaces}</p>
          </div>
          <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary/60 rounded-full"
              style={{ width: `${stats.characters ? (stats.spaces / stats.characters) * 100 : 0}%` }}
            />
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <p className="stat-label">Special Characters</p>
            <p className="stat-value">{stats.special}</p>
          </div>
          <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary/60 rounded-full"
              style={{ width: `${stats.characters ? (stats.special / stats.characters) * 100 : 0}%` }}
            />
          </div>
        </div>
        <div className="stat-card col-span-2">
          <p className="stat-label mb-2">Character Distribution</p>
          <div className="flex h-4 rounded-full overflow-hidden bg-muted">
            {stats.characters > 0 && (
              <>
                <div
                  className="bg-blue-500"
                  style={{ width: `${(stats.letters / stats.characters) * 100}%` }}
                  title={`Letters: ${stats.letters}`}
                />
                <div
                  className="bg-green-500"
                  style={{ width: `${(stats.digits / stats.characters) * 100}%` }}
                  title={`Digits: ${stats.digits}`}
                />
                <div
                  className="bg-yellow-500"
                  style={{ width: `${(stats.spaces / stats.characters) * 100}%` }}
                  title={`Spaces: ${stats.spaces}`}
                />
                <div
                  className="bg-red-500"
                  style={{ width: `${(stats.special / stats.characters) * 100}%` }}
                  title={`Special: ${stats.special}`}
                />
              </>
            )}
          </div>
          <div className="flex flex-wrap gap-3 mt-2 text-xs">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500" /> Letters</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500" /> Digits</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500" /> Spaces</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> Special</span>
          </div>
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

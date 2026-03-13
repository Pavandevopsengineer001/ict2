"use client";

import { useState, useEffect } from "react";
import { Code, AlertCircle, Check, Copy, Info } from "lucide-react";

const commonPatterns = [
  { name: "Email", pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}" },
  { name: "URL", pattern: "https?://[^\\s]+" },
  { name: "Phone", pattern: "\\+?[1-9]\\d{1,14}" },
  { name: "IP Address", pattern: "\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b" },
  { name: "Date (YYYY-MM-DD)", pattern: "\\d{4}-\\d{2}-\\d{2}" },
  { name: "Hex Color", pattern: "#[0-9a-fA-F]{6}" },
];

export default function RegexTesterTool() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("");
  const [matches, setMatches] = useState<{ match: string; index: number; groups?: string[] }[]>([]);
  const [error, setError] = useState("");
  const [highlightedText, setHighlightedText] = useState<React.ReactNode>("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!pattern || !testString) {
      setMatches([]);
      setHighlightedText(testString);
      setError("");
      return;
    }

    try {
      const regex = new RegExp(pattern, flags);
      const foundMatches: { match: string; index: number; groups?: string[] }[] = [];
      let match;

      if (flags.includes("g")) {
        while ((match = regex.exec(testString)) !== null) {
          foundMatches.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
          });
          if (match[0].length === 0) break;
        }
      } else {
        match = regex.exec(testString);
        if (match) {
          foundMatches.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
          });
        }
      }

      setMatches(foundMatches);
      setError("");

      // Create highlighted text
      if (foundMatches.length > 0) {
        const parts: React.ReactNode[] = [];
        let lastIndex = 0;

        foundMatches.forEach((m, i) => {
          if (m.index > lastIndex) {
            parts.push(testString.slice(lastIndex, m.index));
          }
          parts.push(
            <span key={i} className="bg-primary/30 text-primary font-medium rounded px-0.5">
              {m.match}
            </span>
          );
          lastIndex = m.index + m.match.length;
        });

        if (lastIndex < testString.length) {
          parts.push(testString.slice(lastIndex));
        }

        setHighlightedText(<>{parts}</>);
      } else {
        setHighlightedText(testString);
      }
    } catch (e) {
      setError((e as Error).message);
      setMatches([]);
      setHighlightedText(testString);
    }
  }, [pattern, flags, testString]);

  const toggleFlag = (flag: string) => {
    if (flags.includes(flag)) {
      setFlags(flags.replace(flag, ""));
    } else {
      setFlags(flags + flag);
    }
  };

  const copyRegex = async () => {
    await navigator.clipboard.writeText(`/${pattern}/${flags}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm text-muted-foreground flex items-center gap-2">
            <Code className="w-4 h-4" />
            Regular Expression
          </label>
          {pattern && (
            <button
              onClick={copyRegex}
              className="flex items-center gap-1 px-2 py-1 text-xs rounded bg-muted hover:bg-muted/80"
            >
              {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
              {copied ? "Copied!" : `/${pattern}/${flags}`}
            </button>
          )}
        </div>
        <input
          type="text"
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
          placeholder="Enter regex pattern (without delimiters)"
          className="calc-input font-mono"
        />
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-sm text-muted-foreground">Flags:</span>
        {["g", "i", "m", "s"].map((flag) => (
          <button
            key={flag}
            onClick={() => toggleFlag(flag)}
            className={`px-3 py-1 rounded-lg text-sm font-mono transition-all ${
              flags.includes(flag)
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            {flag}
          </button>
        ))}
        <span className="text-xs text-muted-foreground ml-2">
          g=global, i=case-insensitive, m=multiline, s=dotall
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-muted-foreground w-full">Common patterns:</span>
        {commonPatterns.map((p) => (
          <button
            key={p.name}
            onClick={() => setPattern(p.pattern)}
            className="px-3 py-1 rounded-lg text-xs bg-muted hover:bg-muted/80 transition-colors"
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        <label className="text-sm text-muted-foreground">Test String</label>
        <textarea
          value={testString}
          onChange={(e) => setTestString(e.target.value)}
          placeholder="Enter text to test against the regex..."
          className="tool-panel-input min-h-[150px]"
        />
      </div>

      {error && (
        <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-destructive">Invalid Regular Expression</p>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        </div>
      )}

      {!error && testString && (
        <div className="space-y-4">
          <div className="stat-card">
            <div className="flex items-center gap-2">
              {matches.length > 0 ? (
                <Check className="w-5 h-5 text-green-500" />
              ) : (
                <Info className="w-5 h-5 text-muted-foreground" />
              )}
              <span className="font-medium">
                {matches.length} match{matches.length !== 1 ? "es" : ""} found
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Highlighted Matches</label>
            <div className="tool-panel-output whitespace-pre-wrap font-mono text-sm">
              {highlightedText}
            </div>
          </div>

          {matches.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Match Details</label>
              <div className="space-y-2 max-h-[200px] overflow-auto">
                {matches.map((m, i) => (
                  <div key={i} className="p-3 rounded-lg bg-card/50 border border-border/50 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-primary">{m.match}</span>
                      <span className="text-xs text-muted-foreground">Index: {m.index}</span>
                    </div>
                    {m.groups && m.groups.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-border/30">
                        <span className="text-xs text-muted-foreground">Groups: </span>
                        {m.groups.map((g, gi) => (
                          <span key={gi} className="ml-2 font-mono text-xs bg-muted px-1 rounded">
                            ${gi + 1}: {g}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

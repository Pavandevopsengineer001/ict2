"use client";

import { useState } from "react";
import { Shuffle, Copy, Check, RefreshCw } from "lucide-react";

export default function RandomStringGeneratorTool() {
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [customChars, setCustomChars] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [results, setResults] = useState<string[]>([]);
  const [copied, setCopied] = useState<number | null>(null);

  const generate = () => {
    let charset = "";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    const ambiguous = "0O1lI";

    if (customChars) {
      charset = customChars;
    } else {
      if (includeUppercase) charset += uppercase;
      if (includeLowercase) charset += lowercase;
      if (includeNumbers) charset += numbers;
      if (includeSymbols) charset += symbols;
    }

    if (excludeAmbiguous) {
      charset = charset.split("").filter(c => !ambiguous.includes(c)).join("");
    }

    if (!charset) {
      charset = lowercase + numbers;
    }

    const generated: string[] = [];
    for (let q = 0; q < quantity; q++) {
      let result = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        result += charset[randomIndex];
      }
      generated.push(result);
    }

    setResults(generated);
  };

  const copyToClipboard = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  const copyAll = async () => {
    await navigator.clipboard.writeText(results.join("\n"));
    setCopied(-1);
    setTimeout(() => setCopied(null), 2000);
  };

  const presets = [
    { name: "Password", length: 16, upper: true, lower: true, num: true, sym: true },
    { name: "PIN", length: 6, upper: false, lower: false, num: true, sym: false },
    { name: "API Key", length: 32, upper: true, lower: true, num: true, sym: false },
    { name: "Token", length: 64, upper: true, lower: true, num: true, sym: false },
    { name: "Short ID", length: 8, upper: false, lower: true, num: true, sym: false },
  ];

  const applyPreset = (preset: typeof presets[0]) => {
    setLength(preset.length);
    setIncludeUppercase(preset.upper);
    setIncludeLowercase(preset.lower);
    setIncludeNumbers(preset.num);
    setIncludeSymbols(preset.sym);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-muted-foreground w-full mb-1">Quick Presets:</span>
        {presets.map((preset) => (
          <button
            key={preset.name}
            onClick={() => applyPreset(preset)}
            className="px-3 py-1 rounded-lg text-xs bg-muted hover:bg-muted/80 transition-colors"
          >
            {preset.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Length</label>
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(Math.max(1, Math.min(128, parseInt(e.target.value) || 1)))}
            min="1"
            max="128"
            className="calc-input"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Math.min(50, parseInt(e.target.value) || 1)))}
            min="1"
            max="50"
            className="calc-input"
          />
        </div>
      </div>

      <div className="space-y-3">
        <span className="text-sm text-muted-foreground">Character Options:</span>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <label className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 cursor-pointer hover:bg-muted transition-colors">
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm">Uppercase (A-Z)</span>
          </label>
          <label className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 cursor-pointer hover:bg-muted transition-colors">
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm">Lowercase (a-z)</span>
          </label>
          <label className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 cursor-pointer hover:bg-muted transition-colors">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm">Numbers (0-9)</span>
          </label>
          <label className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 cursor-pointer hover:bg-muted transition-colors">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm">Symbols (!@#$...)</span>
          </label>
          <label className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 cursor-pointer hover:bg-muted transition-colors">
            <input
              type="checkbox"
              checked={excludeAmbiguous}
              onChange={(e) => setExcludeAmbiguous(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm">Exclude Similar (0O1lI)</span>
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-muted-foreground">Custom Characters (optional)</label>
        <input
          type="text"
          value={customChars}
          onChange={(e) => setCustomChars(e.target.value)}
          placeholder="Enter custom character set..."
          className="calc-input font-mono"
        />
        <p className="text-xs text-muted-foreground">If set, only these characters will be used</p>
      </div>

      <button
        onClick={generate}
        className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
      >
        <Shuffle className="w-4 h-4" />
        Generate
      </button>

      {results.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Generated {results.length} string{results.length !== 1 ? "s" : ""}
            </span>
            <div className="flex gap-2">
              <button
                onClick={generate}
                className="flex items-center gap-1 px-3 py-1 rounded-lg bg-muted hover:bg-muted/80 text-sm transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                Regenerate
              </button>
              {results.length > 1 && (
                <button
                  onClick={copyAll}
                  className="flex items-center gap-1 px-3 py-1 rounded-lg bg-muted hover:bg-muted/80 text-sm transition-colors"
                >
                  {copied === -1 ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                  Copy All
                </button>
              )}
            </div>
          </div>

          <div className="space-y-2 max-h-[300px] overflow-auto">
            {results.map((result, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-card border border-border/50"
              >
                <code className="font-mono text-sm break-all flex-1">{result}</code>
                <button
                  onClick={() => copyToClipboard(result, index)}
                  className="flex-shrink-0 ml-2 p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  {copied === index ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

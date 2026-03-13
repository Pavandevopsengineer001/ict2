"use client";

import { useState } from "react";
import { RotateCcw, Check, X } from "lucide-react";
import { textAnalyze } from "@/lib/textProcessor";

export default function PalindromeCheckerTool() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ReturnType<typeof textAnalyze.isPalindrome> | null>(null);

  const checkPalindrome = () => {
    if (!input.trim()) return;
    setResult(textAnalyze.isPalindrome(input));
  };

  const examples = [
    "A man a plan a canal Panama",
    "Was it a car or a cat I saw",
    "Never odd or even",
    "Do geese see God",
    "racecar",
    "madam",
    "civic",
    "level",
    "radar",
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm text-muted-foreground flex items-center gap-2">
          <RotateCcw className="w-4 h-4" />
          Enter text to check
        </label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && checkPalindrome()}
          placeholder="Enter a word or phrase..."
          className="calc-input"
        />
      </div>

      <button
        onClick={checkPalindrome}
        className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
      >
        Check Palindrome
      </button>

      {result && (
        <div className="space-y-4">
          <div
            className={`p-6 rounded-lg flex flex-col items-center justify-center ${
              result.isPalindrome
                ? "bg-green-500/10 border border-green-500/30"
                : "bg-red-500/10 border border-red-500/30"
            }`}
          >
            {result.isPalindrome ? (
              <>
                <Check className="w-12 h-12 text-green-500 mb-2" />
                <p className="text-xl font-bold text-green-500">It's a Palindrome!</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Reads the same forwards and backwards
                </p>
              </>
            ) : (
              <>
                <X className="w-12 h-12 text-red-500 mb-2" />
                <p className="text-xl font-bold text-red-500">Not a Palindrome</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Does not read the same backwards
                </p>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="stat-card">
              <p className="text-sm text-muted-foreground mb-1">Original</p>
              <p className="font-mono text-sm break-all">{result.original}</p>
            </div>
            <div className="stat-card">
              <p className="text-sm text-muted-foreground mb-1">Cleaned</p>
              <p className="font-mono text-sm break-all">{result.cleaned}</p>
            </div>
            <div className="stat-card">
              <p className="text-sm text-muted-foreground mb-1">Reversed</p>
              <p className="font-mono text-sm break-all">{result.reversed}</p>
            </div>
          </div>

          {result.isPalindrome && (
            <div className="flex justify-center">
              <div className="flex items-center gap-1 text-lg font-mono">
                {result.cleaned.split("").map((char, i) => (
                  <span
                    key={i}
                    className={`px-2 py-1 rounded ${
                      i < result.cleaned.length / 2
                        ? "bg-primary/20 text-primary"
                        : i > result.cleaned.length / 2
                        ? "bg-green-500/20 text-green-600"
                        : "bg-yellow-500/20 text-yellow-600"
                    }`}
                  >
                    {char}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm text-muted-foreground">Try these examples:</label>
        <div className="flex flex-wrap gap-2">
          {examples.map((example) => (
            <button
              key={example}
              onClick={() => setInput(example)}
              className="px-3 py-1 text-sm bg-muted hover:bg-muted/80 rounded-lg transition-colors"
            >
              {example}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 rounded-lg bg-muted/50">
        <p className="text-sm text-muted-foreground">
          <strong>What is a palindrome?</strong> A palindrome is a word, phrase, number, or other
          sequence of characters that reads the same forward and backward, ignoring spaces,
          punctuation, and capitalization. Examples include "racecar" and "A man a plan a canal Panama".
        </p>
      </div>
    </div>
  );
}

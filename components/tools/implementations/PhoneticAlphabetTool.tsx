"use client";

import { useState, useEffect } from "react";
import { Volume2, Copy, Check } from "lucide-react";
import { textEncode } from "@/lib/textProcessor";

export default function PhoneticAlphabetTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!input.trim()) {
      setOutput("");
      return;
    }
    setOutput(textEncode.textToNato(input));
  }, [input]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadSample = () => {
    setInput("Hello World 123");
  };

  const natoAlphabet = [
    { letter: "A", word: "Alpha" },
    { letter: "B", word: "Bravo" },
    { letter: "C", word: "Charlie" },
    { letter: "D", word: "Delta" },
    { letter: "E", word: "Echo" },
    { letter: "F", word: "Foxtrot" },
    { letter: "G", word: "Golf" },
    { letter: "H", word: "Hotel" },
    { letter: "I", word: "India" },
    { letter: "J", word: "Juliet" },
    { letter: "K", word: "Kilo" },
    { letter: "L", word: "Lima" },
    { letter: "M", word: "Mike" },
    { letter: "N", word: "November" },
    { letter: "O", word: "Oscar" },
    { letter: "P", word: "Papa" },
    { letter: "Q", word: "Quebec" },
    { letter: "R", word: "Romeo" },
    { letter: "S", word: "Sierra" },
    { letter: "T", word: "Tango" },
    { letter: "U", word: "Uniform" },
    { letter: "V", word: "Victor" },
    { letter: "W", word: "Whiskey" },
    { letter: "X", word: "X-ray" },
    { letter: "Y", word: "Yankee" },
    { letter: "Z", word: "Zulu" },
    { letter: "0", word: "Zero" },
    { letter: "1", word: "One" },
    { letter: "2", word: "Two" },
    { letter: "3", word: "Three" },
    { letter: "4", word: "Four" },
    { letter: "5", word: "Five" },
    { letter: "6", word: "Six" },
    { letter: "7", word: "Seven" },
    { letter: "8", word: "Eight" },
    { letter: "9", word: "Niner" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={loadSample}
          className="px-3 py-1.5 text-sm bg-muted hover:bg-muted/80 rounded-lg transition-colors"
        >
          Load Sample
        </button>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-muted-foreground flex items-center gap-2">
          <Volume2 className="w-4 h-4" />
          Text Input
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to convert to NATO phonetic alphabet..."
          className="tool-panel-input min-h-[120px]"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm text-muted-foreground">Phonetic Output</label>
          {output && (
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-3 py-1 rounded-lg bg-muted hover:bg-muted/80 text-sm transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy"}
            </button>
          )}
        </div>
        <div className="tool-panel-output min-h-[120px] text-lg">
          {output || <span className="text-muted-foreground">Phonetic output will appear here</span>}
        </div>
      </div>

      {input && output && (
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Character Breakdown</label>
          <div className="flex flex-wrap gap-2">
            {input.split("").map((char, index) => {
              const upper = char.toUpperCase();
              const nato = natoAlphabet.find(n => n.letter === upper);
              return (
                <div
                  key={index}
                  className="p-3 rounded-lg bg-card border border-border/50 text-center min-w-[80px]"
                >
                  <div className="text-2xl font-bold text-primary">{char}</div>
                  <div className="text-sm text-muted-foreground">
                    {nato ? nato.word : char === " " ? "(space)" : char}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm text-muted-foreground">NATO Phonetic Alphabet Reference</label>
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-2">
          {natoAlphabet.map(({ letter, word }) => (
            <button
              key={letter}
              onClick={() => setInput(input + letter)}
              className="p-2 rounded-lg bg-muted/50 hover:bg-muted text-center transition-colors"
            >
              <div className="font-bold text-lg">{letter}</div>
              <div className="text-xs text-muted-foreground">{word}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 rounded-lg bg-muted/50">
        <p className="text-sm text-muted-foreground">
          The NATO phonetic alphabet is used to spell out words clearly over radio or telephone.
          Each letter has a unique code word to prevent confusion between similar-sounding letters
          (like B and D, or M and N).
        </p>
      </div>
    </div>
  );
}

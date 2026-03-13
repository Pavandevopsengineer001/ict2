"use client";

import { useState, useEffect } from "react";
import { Radio, Copy, Check, Volume2 } from "lucide-react";
import { textEncode } from "@/lib/textProcessor";

export default function MorseCodeConverterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"text-to-morse" | "morse-to-text">("text-to-morse");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!input.trim()) {
      setOutput("");
      return;
    }

    if (mode === "text-to-morse") {
      setOutput(textEncode.textToMorse(input));
    } else {
      setOutput(textEncode.morseToText(input));
    }
  }, [input, mode]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const playMorse = () => {
    const morseCode = mode === "text-to-morse" ? output : input;
    if (!morseCode) return;

    const audioContext = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const dotDuration = 0.1;
    const dashDuration = dotDuration * 3;
    const pauseDuration = dotDuration;
    const letterPause = dotDuration * 3;
    const wordPause = dotDuration * 7;

    let currentTime = audioContext.currentTime;

    for (const char of morseCode) {
      if (char === ".") {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.frequency.value = 600;
        oscillator.type = "sine";
        gainNode.gain.setValueAtTime(0.3, currentTime);
        oscillator.start(currentTime);
        oscillator.stop(currentTime + dotDuration);
        currentTime += dotDuration + pauseDuration;
      } else if (char === "-") {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.frequency.value = 600;
        oscillator.type = "sine";
        gainNode.gain.setValueAtTime(0.3, currentTime);
        oscillator.start(currentTime);
        oscillator.stop(currentTime + dashDuration);
        currentTime += dashDuration + pauseDuration;
      } else if (char === " ") {
        currentTime += letterPause;
      } else if (char === "/") {
        currentTime += wordPause;
      }
    }
  };

  const loadSample = () => {
    if (mode === "text-to-morse") {
      setInput("Hello World");
    } else {
      setInput(".... . .-.. .-.. --- / .-- --- .-. .-.. -..");
    }
  };

  const morseReference = [
    { char: "A", morse: ".-" },
    { char: "B", morse: "-..." },
    { char: "C", morse: "-.-." },
    { char: "D", morse: "-.." },
    { char: "E", morse: "." },
    { char: "F", morse: "..-." },
    { char: "G", morse: "--." },
    { char: "H", morse: "...." },
    { char: "I", morse: ".." },
    { char: "J", morse: ".---" },
    { char: "K", morse: "-.-" },
    { char: "L", morse: ".-.." },
    { char: "M", morse: "--" },
    { char: "N", morse: "-." },
    { char: "O", morse: "---" },
    { char: "P", morse: ".--." },
    { char: "Q", morse: "--.-" },
    { char: "R", morse: ".-." },
    { char: "S", morse: "..." },
    { char: "T", morse: "-" },
    { char: "U", morse: "..-" },
    { char: "V", morse: "...-" },
    { char: "W", morse: ".--" },
    { char: "X", morse: "-..-" },
    { char: "Y", morse: "-.--" },
    { char: "Z", morse: "--.." },
    { char: "0", morse: "-----" },
    { char: "1", morse: ".----" },
    { char: "2", morse: "..---" },
    { char: "3", morse: "...--" },
    { char: "4", morse: "....-" },
    { char: "5", morse: "....." },
    { char: "6", morse: "-...." },
    { char: "7", morse: "--..." },
    { char: "8", morse: "---.." },
    { char: "9", morse: "----." },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 p-1 bg-muted rounded-lg">
          <button
            onClick={() => setMode("text-to-morse")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              mode === "text-to-morse"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted-foreground/10"
            }`}
          >
            Text to Morse
          </button>
          <button
            onClick={() => setMode("morse-to-text")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              mode === "morse-to-text"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted-foreground/10"
            }`}
          >
            Morse to Text
          </button>
        </div>
        <button
          onClick={loadSample}
          className="px-3 py-1.5 text-sm bg-muted hover:bg-muted/80 rounded-lg transition-colors"
        >
          Load Sample
        </button>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-muted-foreground flex items-center gap-2">
          <Radio className="w-4 h-4" />
          {mode === "text-to-morse" ? "Text Input" : "Morse Code Input"}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            mode === "text-to-morse"
              ? "Enter text to convert..."
              : "Enter morse code (use . for dot, - for dash, / for word separator)..."
          }
          className="tool-panel-input min-h-[120px] font-mono"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm text-muted-foreground">
            {mode === "text-to-morse" ? "Morse Code Output" : "Text Output"}
          </label>
          <div className="flex gap-2">
            {output && mode === "text-to-morse" && (
              <button
                onClick={playMorse}
                className="flex items-center gap-2 px-3 py-1 rounded-lg bg-muted hover:bg-muted/80 text-sm transition-colors"
              >
                <Volume2 className="w-4 h-4" />
                Play
              </button>
            )}
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
        </div>
        <div className="tool-panel-output min-h-[120px] font-mono text-lg flex items-center justify-center text-center break-all">
          {output || <span className="text-muted-foreground">Output will appear here</span>}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-muted-foreground">Morse Code Reference</label>
        <div className="grid grid-cols-6 md:grid-cols-9 gap-2">
          {morseReference.map(({ char, morse }) => (
            <div
              key={char}
              className="p-2 rounded-lg bg-muted/50 text-center"
            >
              <div className="font-bold">{char}</div>
              <div className="text-xs font-mono text-muted-foreground">{morse}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

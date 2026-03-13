"use client";

import { useState, useEffect } from "react";
import { Binary, Copy, Check } from "lucide-react";
import { textEncode } from "@/lib/textProcessor";

export default function BinaryTextConverterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"text-to-binary" | "binary-to-text">("text-to-binary");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    if (!input.trim()) {
      setOutput("");
      return;
    }

    try {
      if (mode === "text-to-binary") {
        setOutput(textEncode.textToBinary(input));
      } else {
        // Validate binary input
        const cleaned = input.replace(/\s+/g, " ").trim();
        if (!/^[01 ]+$/.test(cleaned)) {
          setError("Invalid binary format. Use only 0s and 1s.");
          setOutput("");
          return;
        }
        setOutput(textEncode.binaryToText(cleaned));
      }
    } catch (e) {
      setError((e as Error).message || "Conversion failed");
      setOutput("");
    }
  }, [input, mode]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadSample = () => {
    if (mode === "text-to-binary") {
      setInput("Hello World!");
    } else {
      setInput("01001000 01100101 01101100 01101100 01101111 00100000 01010111 01101111 01110010 01101100 01100100 00100001");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 p-1 bg-muted rounded-lg">
          <button
            onClick={() => {
              setMode("text-to-binary");
              setInput("");
              setOutput("");
            }}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              mode === "text-to-binary"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted-foreground/10"
            }`}
          >
            Text to Binary
          </button>
          <button
            onClick={() => {
              setMode("binary-to-text");
              setInput("");
              setOutput("");
            }}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              mode === "binary-to-text"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted-foreground/10"
            }`}
          >
            Binary to Text
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
          <Binary className="w-4 h-4" />
          {mode === "text-to-binary" ? "Text Input" : "Binary Input"}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            mode === "text-to-binary"
              ? "Enter text to convert to binary..."
              : "Enter binary (8-bit bytes separated by spaces)..."
          }
          className="tool-panel-input min-h-[150px] font-mono"
        />
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm text-muted-foreground">
            {mode === "text-to-binary" ? "Binary Output" : "Text Output"}
          </label>
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
        <div className="tool-panel-output min-h-[150px] font-mono text-sm break-all">
          {output || <span className="text-muted-foreground">Output will appear here</span>}
        </div>
      </div>

      {input && mode === "text-to-binary" && output && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="stat-card text-center">
            <p className="stat-value">{input.length}</p>
            <p className="stat-label">Characters</p>
          </div>
          <div className="stat-card text-center">
            <p className="stat-value">{input.length * 8}</p>
            <p className="stat-label">Total Bits</p>
          </div>
          <div className="stat-card text-center">
            <p className="stat-value">{input.length}</p>
            <p className="stat-label">Bytes</p>
          </div>
          <div className="stat-card text-center">
            <p className="stat-value">{output.split(" ").length}</p>
            <p className="stat-label">Binary Groups</p>
          </div>
        </div>
      )}

      <div className="p-4 rounded-lg bg-muted/50">
        <h4 className="text-sm font-medium mb-2">ASCII Binary Reference</h4>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2 text-xs">
          {[
            { char: "A", bin: "01000001" },
            { char: "B", bin: "01000010" },
            { char: "C", bin: "01000011" },
            { char: "a", bin: "01100001" },
            { char: "b", bin: "01100010" },
            { char: "0", bin: "00110000" },
            { char: "1", bin: "00110001" },
            { char: " ", bin: "00100000" },
          ].map(({ char, bin }) => (
            <div key={char + bin} className="p-2 rounded bg-muted text-center">
              <div className="font-bold">{char === " " ? "Space" : char}</div>
              <div className="font-mono text-muted-foreground">{bin}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

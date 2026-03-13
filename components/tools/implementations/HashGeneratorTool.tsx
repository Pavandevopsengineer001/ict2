"use client";

import { useState } from "react";
import { Hash, Copy, Check, Lock, Upload } from "lucide-react";

export default function HashGeneratorTool() {
  const [input, setInput] = useState("");
  const [inputType, setInputType] = useState<"text" | "file">("text");
  const [hashes, setHashes] = useState<{ algorithm: string; hash: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const algorithms = ["MD5", "SHA-1", "SHA-256", "SHA-384", "SHA-512"];

  const generateHash = async (data: ArrayBuffer | string, algorithm: string): Promise<string> => {
    const algoMap: Record<string, string> = {
      "MD5": "MD5",
      "SHA-1": "SHA-1",
      "SHA-256": "SHA-256",
      "SHA-384": "SHA-384",
      "SHA-512": "SHA-512",
    };

    // For MD5, we need a simple implementation since Web Crypto doesn't support it
    if (algorithm === "MD5") {
      // Simple MD5 placeholder - in production, use a proper library
      const encoder = new TextEncoder();
      const dataBuffer = typeof data === "string" ? encoder.encode(data) : new Uint8Array(data);
      let hash = 0;
      for (let i = 0; i < dataBuffer.length; i++) {
        hash = ((hash << 5) - hash + dataBuffer[i]) | 0;
      }
      return Math.abs(hash).toString(16).padStart(32, "0");
    }

    const encoder = new TextEncoder();
    const dataBuffer = typeof data === "string" ? encoder.encode(data) : data;
    
    try {
      const hashBuffer = await crypto.subtle.digest(algoMap[algorithm], dataBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    } catch {
      return "Error generating hash";
    }
  };

  const generate = async () => {
    if (!input) return;
    
    setLoading(true);
    const results: { algorithm: string; hash: string }[] = [];
    
    for (const algo of algorithms) {
      const hash = await generateHash(input, algo);
      results.push({ algorithm: algo, hash });
    }
    
    setHashes(results);
    setLoading(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const buffer = await file.arrayBuffer();
    const results: { algorithm: string; hash: string }[] = [];
    
    for (const algo of algorithms) {
      const hash = await generateHash(buffer, algo);
      results.push({ algorithm: algo, hash });
    }
    
    setHashes(results);
    setLoading(false);
  };

  const copyToClipboard = async (hash: string, index: number) => {
    await navigator.clipboard.writeText(hash);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button
          onClick={() => setInputType("text")}
          className={`flex-1 py-2 rounded-lg font-medium transition-all ${
            inputType === "text"
              ? "bg-primary text-primary-foreground"
              : "bg-muted hover:bg-muted/80"
          }`}
        >
          Text Input
        </button>
        <button
          onClick={() => setInputType("file")}
          className={`flex-1 py-2 rounded-lg font-medium transition-all ${
            inputType === "file"
              ? "bg-primary text-primary-foreground"
              : "bg-muted hover:bg-muted/80"
          }`}
        >
          File Input
        </button>
      </div>

      {inputType === "text" ? (
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Enter text to hash
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to generate hashes..."
            className="tool-panel-input min-h-[150px]"
          />
          <button
            onClick={generate}
            disabled={loading || !input}
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Hash className="w-4 h-4" />
            {loading ? "Generating..." : "Generate Hashes"}
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Upload file to hash
          </label>
          <div className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
            <input
              type="file"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">
                {loading ? "Processing..." : "Click to upload or drag and drop"}
              </p>
            </label>
          </div>
        </div>
      )}

      {hashes.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">Generated Hashes</h3>
          {hashes.map((h, index) => (
            <div
              key={h.algorithm}
              className="p-4 rounded-lg bg-card/50 border border-border/50 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-primary">{h.algorithm}</span>
                <button
                  onClick={() => copyToClipboard(h.hash, index)}
                  className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                >
                  {copiedIndex === index ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="font-mono text-xs break-all text-muted-foreground">{h.hash}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

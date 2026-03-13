"use client";

import { useState } from "react";
import { Hash, Copy, Check, RefreshCw, Trash2 } from "lucide-react";

export default function UuidGeneratorTool() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(5);
  const [format, setFormat] = useState<"standard" | "uppercase" | "noDashes">("standard");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateUuid = (): string => {
    const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });

    switch (format) {
      case "uppercase":
        return uuid.toUpperCase();
      case "noDashes":
        return uuid.replace(/-/g, "");
      default:
        return uuid;
    }
  };

  const generate = () => {
    const newUuids = Array.from({ length: count }, generateUuid);
    setUuids(newUuids);
  };

  const copyToClipboard = async (uuid: string, index: number) => {
    await navigator.clipboard.writeText(uuid);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyAll = async () => {
    await navigator.clipboard.writeText(uuids.join("\n"));
    setCopiedIndex(-1);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const clear = () => {
    setUuids([]);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Count</label>
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
            min="1"
            max="100"
            className="calc-input"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Format</label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value as typeof format)}
            className="calc-select"
          >
            <option value="standard">Standard (lowercase)</option>
            <option value="uppercase">UPPERCASE</option>
            <option value="noDashes">No Dashes</option>
          </select>
        </div>
        <div className="flex items-end">
          <button
            onClick={generate}
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Generate
          </button>
        </div>
      </div>

      {uuids.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Generated {uuids.length} UUID{uuids.length > 1 ? "s" : ""}
            </p>
            <div className="flex gap-2">
              <button
                onClick={copyAll}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/80 text-sm transition-colors"
              >
                {copiedIndex === -1 ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                Copy All
              </button>
              <button
                onClick={clear}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/80 text-sm transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Clear
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {uuids.map((uuid, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-card/50 border border-border/50 hover:border-primary/30 transition-colors font-mono text-sm"
              >
                <span className="truncate">{uuid}</span>
                <button
                  onClick={() => copyToClipboard(uuid, index)}
                  className="ml-2 p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors flex-shrink-0"
                >
                  {copiedIndex === index ? (
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

      {uuids.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Hash className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Click Generate to create UUIDs</p>
        </div>
      )}
    </div>
  );
}

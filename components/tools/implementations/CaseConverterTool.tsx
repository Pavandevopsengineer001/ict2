"use client";

import { useState } from "react";
import { Type, Copy, Check } from "lucide-react";
import { TextProcessor } from "@/lib/textProcessor";

const caseTypes = [
  { key: "lower", label: "lowercase" },
  { key: "upper", label: "UPPERCASE" },
  { key: "title", label: "Title Case" },
  { key: "sentence", label: "Sentence case" },
  { key: "camel", label: "camelCase" },
  { key: "pascal", label: "PascalCase" },
  { key: "snake", label: "snake_case" },
  { key: "kebab", label: "kebab-case" },
  { key: "constant", label: "CONSTANT_CASE" },
  { key: "alternating", label: "aLtErNaTiNg" },
  { key: "inverse", label: "iNVERSE cASE" },
];

export default function CaseConverterTool() {
  const [text, setText] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const convertCase = (type: string): string => {
    return TextProcessor.convertCase(text, type as keyof typeof TextProcessor.convertCase);
  };

  const copyToClipboard = async (type: string) => {
    const converted = convertCase(type);
    await navigator.clipboard.writeText(converted);
    setCopiedKey(type);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm text-muted-foreground flex items-center gap-2">
          <Type className="w-4 h-4" />
          Enter your text
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste text to convert..."
          className="tool-panel-input min-h-[150px]"
        />
      </div>

      {text && (
        <div className="space-y-3">
          {caseTypes.map((caseType) => (
            <div
              key={caseType.key}
              className="flex items-center justify-between p-4 rounded-lg bg-card/50 border border-border/50 hover:border-primary/30 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground mb-1">{caseType.label}</p>
                <p className="font-mono text-sm truncate">{convertCase(caseType.key)}</p>
              </div>
              <button
                onClick={() => copyToClipboard(caseType.key)}
                className="ml-4 p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors flex-shrink-0"
                title="Copy to clipboard"
              >
                {copiedKey === caseType.key ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          ))}
        </div>
      )}

      {!text && (
        <div className="text-center py-12 text-muted-foreground">
          Enter text above to see all case conversions
        </div>
      )}
    </div>
  );
}

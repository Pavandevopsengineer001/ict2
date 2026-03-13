"use client";

import { useState } from "react";
import { GitCompare, Minus, Plus } from "lucide-react";

export default function TextDiffTool() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [diffMode, setDiffMode] = useState<"line" | "word" | "char">("line");
  const [diff, setDiff] = useState<{ type: "same" | "add" | "remove"; value: string }[]>([]);

  const computeDiff = () => {
    const lines1 = text1.split("\n");
    const lines2 = text2.split("\n");
    
    // Simple LCS-based diff for lines
    const result: { type: "same" | "add" | "remove"; value: string }[] = [];
    
    let i = 0, j = 0;
    while (i < lines1.length || j < lines2.length) {
      if (i >= lines1.length) {
        result.push({ type: "add", value: lines2[j] });
        j++;
      } else if (j >= lines2.length) {
        result.push({ type: "remove", value: lines1[i] });
        i++;
      } else if (lines1[i] === lines2[j]) {
        result.push({ type: "same", value: lines1[i] });
        i++;
        j++;
      } else {
        // Simple approach: look ahead for matches
        let foundInNew = lines2.slice(j).indexOf(lines1[i]);
        let foundInOld = lines1.slice(i).indexOf(lines2[j]);
        
        if (foundInNew === -1 && foundInOld === -1) {
          result.push({ type: "remove", value: lines1[i] });
          result.push({ type: "add", value: lines2[j] });
          i++;
          j++;
        } else if (foundInNew !== -1 && (foundInOld === -1 || foundInNew <= foundInOld)) {
          for (let k = 0; k < foundInNew; k++) {
            result.push({ type: "add", value: lines2[j + k] });
          }
          j += foundInNew;
        } else {
          for (let k = 0; k < foundInOld; k++) {
            result.push({ type: "remove", value: lines1[i + k] });
          }
          i += foundInOld;
        }
      }
    }
    
    setDiff(result);
  };

  const stats = {
    added: diff.filter((d) => d.type === "add").length,
    removed: diff.filter((d) => d.type === "remove").length,
    unchanged: diff.filter((d) => d.type === "same").length,
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground flex items-center gap-2">
            <Minus className="w-4 h-4 text-red-500" />
            Original Text
          </label>
          <textarea
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            placeholder="Paste original text here..."
            className="tool-panel-input min-h-[200px]"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground flex items-center gap-2">
            <Plus className="w-4 h-4 text-green-500" />
            Modified Text
          </label>
          <textarea
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            placeholder="Paste modified text here..."
            className="tool-panel-input min-h-[200px]"
          />
        </div>
      </div>

      <button
        onClick={computeDiff}
        className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
      >
        <GitCompare className="w-4 h-4" />
        Compare Texts
      </button>

      {diff.length > 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="stat-card">
              <p className="stat-value text-green-500">+{stats.added}</p>
              <p className="stat-label">Added</p>
            </div>
            <div className="stat-card">
              <p className="stat-value text-red-500">-{stats.removed}</p>
              <p className="stat-label">Removed</p>
            </div>
            <div className="stat-card">
              <p className="stat-value">{stats.unchanged}</p>
              <p className="stat-label">Unchanged</p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Diff Output</label>
            <div className="tool-panel-output font-mono text-sm max-h-[400px] overflow-auto">
              {diff.map((d, i) => (
                <div
                  key={i}
                  className={`px-2 py-1 ${
                    d.type === "add"
                      ? "bg-green-500/20 text-green-400"
                      : d.type === "remove"
                      ? "bg-red-500/20 text-red-400"
                      : ""
                  }`}
                >
                  <span className="select-none mr-2 text-muted-foreground">
                    {d.type === "add" ? "+" : d.type === "remove" ? "-" : " "}
                  </span>
                  {d.value || " "}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

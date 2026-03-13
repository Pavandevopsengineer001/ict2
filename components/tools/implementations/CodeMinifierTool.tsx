"use client";

import { useState } from "react";
import { Minimize2, Copy, Check, AlertCircle } from "lucide-react";

export default function CodeMinifierTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [codeType, setCodeType] = useState<"javascript" | "css">("javascript");
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({ original: 0, minified: 0, saved: 0 });

  const minifyJavaScript = (code: string): string => {
    return code
      // Remove single-line comments
      .replace(/\/\/.*$/gm, "")
      // Remove multi-line comments
      .replace(/\/\*[\s\S]*?\*\//g, "")
      // Remove whitespace around operators
      .replace(/\s*([=+\-*/%<>!&|,;:{}()[\]])\s*/g, "$1")
      // Remove newlines
      .replace(/\n+/g, "")
      // Remove extra spaces
      .replace(/\s+/g, " ")
      // Remove spaces after { and before }
      .replace(/\{\s+/g, "{")
      .replace(/\s+\}/g, "}")
      // Remove spaces around colons in objects
      .replace(/:\s+/g, ":")
      .trim();
  };

  const minifyCss = (code: string): string => {
    return code
      // Remove comments
      .replace(/\/\*[\s\S]*?\*\//g, "")
      // Remove whitespace
      .replace(/\s+/g, " ")
      // Remove spaces around { } ; : ,
      .replace(/\s*([{}:;,])\s*/g, "$1")
      // Remove last semicolon before }
      .replace(/;}/g, "}")
      // Remove newlines
      .replace(/\n/g, "")
      .trim();
  };

  const minify = () => {
    if (!input.trim()) return;

    const minified = codeType === "javascript" 
      ? minifyJavaScript(input)
      : minifyCss(input);

    setOutput(minified);
    
    const originalSize = new Blob([input]).size;
    const minifiedSize = new Blob([minified]).size;
    const savedPercent = originalSize > 0 
      ? Math.round((1 - minifiedSize / originalSize) * 100)
      : 0;

    setStats({
      original: originalSize,
      minified: minifiedSize,
      saved: savedPercent,
    });
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadSample = () => {
    if (codeType === "javascript") {
      setInput(`// This is a sample JavaScript code
function calculateTotal(items) {
  // Calculate the total price
  let total = 0;
  
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    total += item.price * item.quantity;
  }
  
  /* Apply discount if applicable */
  if (total > 100) {
    total = total * 0.9;
  }
  
  return Math.round(total * 100) / 100;
}

const items = [
  { name: "Apple", price: 1.5, quantity: 3 },
  { name: "Banana", price: 0.75, quantity: 6 }
];

console.log(calculateTotal(items));`);
    } else {
      setInput(`/* Main Styles */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* Header Section */
.header {
  background-color: #333;
  color: white;
  padding: 15px 20px;
}

.header h1 {
  font-size: 24px;
  margin: 0;
}

/* Navigation */
.nav {
  display: flex;
  gap: 20px;
}

.nav a {
  color: white;
  text-decoration: none;
}

.nav a:hover {
  text-decoration: underline;
}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-muted-foreground">Code Type:</label>
          <select
            value={codeType}
            onChange={(e) => setCodeType(e.target.value as "javascript" | "css")}
            className="calc-select w-32"
          >
            <option value="javascript">JavaScript</option>
            <option value="css">CSS</option>
          </select>
        </div>
        <button
          onClick={loadSample}
          className="px-3 py-1.5 text-sm bg-muted hover:bg-muted/80 rounded-lg transition-colors"
        >
          Load Sample
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">
            Input {codeType === "javascript" ? "JavaScript" : "CSS"}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Enter your ${codeType} code here...`}
            className="tool-panel-input min-h-[350px] font-mono text-sm"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm text-muted-foreground">Minified Output</label>
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
          <pre className="tool-panel-output min-h-[350px] font-mono text-sm whitespace-pre-wrap overflow-auto break-all">
            {output || <span className="text-muted-foreground">Minified code will appear here</span>}
          </pre>
        </div>
      </div>

      <button
        onClick={minify}
        className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
      >
        <Minimize2 className="w-4 h-4" />
        Minify Code
      </button>

      {output && (
        <div className="grid grid-cols-3 gap-4">
          <div className="stat-card text-center">
            <p className="stat-value">{stats.original}</p>
            <p className="stat-label">Original (bytes)</p>
          </div>
          <div className="stat-card text-center">
            <p className="stat-value">{stats.minified}</p>
            <p className="stat-label">Minified (bytes)</p>
          </div>
          <div className="stat-card text-center">
            <p className="stat-value text-green-500">{stats.saved}%</p>
            <p className="stat-label">Size Reduction</p>
          </div>
        </div>
      )}
    </div>
  );
}

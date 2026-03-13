"use client";

import { useState } from "react";
import { Maximize2, Copy, Check } from "lucide-react";

export default function CodeBeautifierTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [codeType, setCodeType] = useState<"javascript" | "css" | "json" | "html">("javascript");
  const [indentSize, setIndentSize] = useState(2);
  const [copied, setCopied] = useState(false);

  const beautifyJavaScript = (code: string, indent: string): string => {
    let result = "";
    let indentLevel = 0;
    let inString = false;
    let stringChar = "";
    let i = 0;

    const addNewLine = () => {
      result += "\n" + indent.repeat(indentLevel);
    };

    while (i < code.length) {
      const char = code[i];
      const nextChar = code[i + 1] || "";

      // Handle strings
      if ((char === '"' || char === "'" || char === "`") && code[i - 1] !== "\\") {
        if (!inString) {
          inString = true;
          stringChar = char;
        } else if (char === stringChar) {
          inString = false;
        }
        result += char;
        i++;
        continue;
      }

      if (inString) {
        result += char;
        i++;
        continue;
      }

      // Handle braces
      if (char === "{") {
        result += " {";
        indentLevel++;
        addNewLine();
        i++;
        continue;
      }

      if (char === "}") {
        indentLevel = Math.max(0, indentLevel - 1);
        addNewLine();
        result += "}";
        if (nextChar && nextChar !== "," && nextChar !== ";" && nextChar !== ")") {
          addNewLine();
        }
        i++;
        continue;
      }

      // Handle semicolons
      if (char === ";") {
        result += ";";
        if (nextChar && nextChar !== "}") {
          addNewLine();
        }
        i++;
        continue;
      }

      // Handle commas in objects/arrays
      if (char === ",") {
        result += ",";
        addNewLine();
        i++;
        continue;
      }

      // Skip extra whitespace
      if (/\s/.test(char)) {
        if (result[result.length - 1] !== " " && result[result.length - 1] !== "\n") {
          result += " ";
        }
        i++;
        continue;
      }

      result += char;
      i++;
    }

    return result.trim();
  };

  const beautifyCss = (code: string, indent: string): string => {
    let result = "";
    let indentLevel = 0;

    // Split by significant characters
    const chars = code.replace(/\s+/g, " ");
    
    for (let i = 0; i < chars.length; i++) {
      const char = chars[i];

      if (char === "{") {
        result += " {\n";
        indentLevel++;
        result += indent.repeat(indentLevel);
      } else if (char === "}") {
        indentLevel = Math.max(0, indentLevel - 1);
        result = result.trimEnd();
        result += "\n" + indent.repeat(indentLevel) + "}\n";
        if (indentLevel === 0) result += "\n";
      } else if (char === ";") {
        result += ";\n" + indent.repeat(indentLevel);
      } else if (char === ":") {
        result += ": ";
      } else if (char === " " && result[result.length - 1] === "\n") {
        continue;
      } else {
        result += char;
      }
    }

    return result.trim();
  };

  const beautifyJson = (code: string, indentSize: number): string => {
    try {
      const parsed = JSON.parse(code);
      return JSON.stringify(parsed, null, indentSize);
    } catch {
      return "Invalid JSON";
    }
  };

  const beautifyHtml = (code: string, indent: string): string => {
    let result = "";
    let indentLevel = 0;
    const selfClosing = ["br", "hr", "img", "input", "meta", "link", "area", "base", "col", "embed", "param", "source", "track", "wbr"];
    
    // Simple regex-based approach
    const tokens = code.replace(/>\s*</g, ">\n<").split("\n");
    
    for (const token of tokens) {
      const trimmed = token.trim();
      if (!trimmed) continue;

      // Check if closing tag
      if (trimmed.startsWith("</")) {
        indentLevel = Math.max(0, indentLevel - 1);
        result += indent.repeat(indentLevel) + trimmed + "\n";
      }
      // Check if self-closing or void element
      else if (trimmed.endsWith("/>") || selfClosing.some(tag => trimmed.toLowerCase().startsWith(`<${tag}`))) {
        result += indent.repeat(indentLevel) + trimmed + "\n";
      }
      // Opening tag
      else if (trimmed.startsWith("<") && !trimmed.startsWith("<!")) {
        result += indent.repeat(indentLevel) + trimmed + "\n";
        if (!trimmed.includes("</")) {
          indentLevel++;
        }
      }
      // Content or special tags
      else {
        result += indent.repeat(indentLevel) + trimmed + "\n";
      }
    }

    return result.trim();
  };

  const beautify = () => {
    if (!input.trim()) return;

    const indent = " ".repeat(indentSize);
    let result = "";

    switch (codeType) {
      case "javascript":
        result = beautifyJavaScript(input, indent);
        break;
      case "css":
        result = beautifyCss(input, indent);
        break;
      case "json":
        result = beautifyJson(input, indentSize);
        break;
      case "html":
        result = beautifyHtml(input, indent);
        break;
    }

    setOutput(result);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadSample = () => {
    switch (codeType) {
      case "javascript":
        setInput(`function hello(name){const greeting="Hello, "+name+"!";console.log(greeting);return greeting;}const items=[1,2,3,4,5];items.forEach(function(item){console.log(item);});`);
        break;
      case "css":
        setInput(`.container{max-width:1200px;margin:0 auto;padding:20px;}.header{background:#333;color:white;padding:15px;}.header h1{font-size:24px;margin:0;}`);
        break;
      case "json":
        setInput(`{"name":"John Doe","age":30,"email":"john@example.com","address":{"street":"123 Main St","city":"New York"},"hobbies":["reading","gaming"]}`);
        break;
      case "html":
        setInput(`<div class="container"><header><h1>Welcome</h1><nav><a href="/">Home</a><a href="/about">About</a></nav></header><main><p>Hello World</p></main></div>`);
        break;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-muted-foreground">Language:</label>
          <select
            value={codeType}
            onChange={(e) => setCodeType(e.target.value as typeof codeType)}
            className="calc-select w-32"
          >
            <option value="javascript">JavaScript</option>
            <option value="css">CSS</option>
            <option value="json">JSON</option>
            <option value="html">HTML</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-muted-foreground">Indent:</label>
          <select
            value={indentSize}
            onChange={(e) => setIndentSize(parseInt(e.target.value))}
            className="calc-select w-24"
          >
            <option value="2">2 spaces</option>
            <option value="4">4 spaces</option>
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
            Input Code (Minified)
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your minified code here..."
            className="tool-panel-input min-h-[350px] font-mono text-sm"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm text-muted-foreground">Beautified Output</label>
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
          <pre className="tool-panel-output min-h-[350px] font-mono text-sm whitespace-pre-wrap overflow-auto">
            {output || <span className="text-muted-foreground">Beautified code will appear here</span>}
          </pre>
        </div>
      </div>

      <button
        onClick={beautify}
        className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
      >
        <Maximize2 className="w-4 h-4" />
        Beautify Code
      </button>
    </div>
  );
}

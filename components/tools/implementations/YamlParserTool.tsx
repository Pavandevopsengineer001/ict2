"use client";

import { useState } from "react";
import { Code, Copy, Check, AlertCircle, ArrowRightLeft } from "lucide-react";
import { yamlUtils } from "@/lib/dataConverter";

export default function YamlParserTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"yaml-to-json" | "json-to-yaml">("yaml-to-json");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const convert = () => {
    setError("");
    if (!input.trim()) {
      setError("Please enter data to convert");
      return;
    }

    try {
      if (mode === "yaml-to-json") {
        const json = yamlUtils.yamlToJson(input);
        setOutput(json);
      } else {
        const yaml = yamlUtils.jsonToYaml(input);
        setOutput(yaml);
      }
    } catch (e) {
      setError((e as Error).message || "Conversion failed");
      setOutput("");
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const swapMode = () => {
    setMode(mode === "yaml-to-json" ? "json-to-yaml" : "yaml-to-json");
    setInput(output);
    setOutput("");
    setError("");
  };

  const loadSample = () => {
    if (mode === "yaml-to-json") {
      setInput(`# Configuration file
name: MyApp
version: 1.0.0
debug: true

database:
  host: localhost
  port: 5432
  name: mydb

features:
  - authentication
  - logging
  - caching

limits:
  maxUsers: 100
  maxRequests: 1000`);
    } else {
      setInput(JSON.stringify({
        name: "MyApp",
        version: "1.0.0",
        debug: true,
        database: {
          host: "localhost",
          port: 5432,
          name: "mydb"
        },
        features: ["authentication", "logging", "caching"],
        limits: {
          maxUsers: 100,
          maxRequests: 1000
        }
      }, null, 2));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 p-1 bg-muted rounded-lg">
          <button
            onClick={() => setMode("yaml-to-json")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              mode === "yaml-to-json"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted-foreground/10"
            }`}
          >
            YAML to JSON
          </button>
          <button
            onClick={() => setMode("json-to-yaml")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              mode === "json-to-yaml"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted-foreground/10"
            }`}
          >
            JSON to YAML
          </button>
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
          <label className="text-sm text-muted-foreground flex items-center gap-2">
            <Code className="w-4 h-4" />
            {mode === "yaml-to-json" ? "YAML Input" : "JSON Input"}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "yaml-to-json" ? "key: value" : '{"key": "value"}'}
            className="tool-panel-input min-h-[350px] font-mono text-sm"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm text-muted-foreground">
              {mode === "yaml-to-json" ? "JSON Output" : "YAML Output"}
            </label>
            {output && !error && (
              <div className="flex gap-2">
                <button
                  onClick={swapMode}
                  className="flex items-center gap-2 px-3 py-1 rounded-lg bg-muted hover:bg-muted/80 text-sm transition-colors"
                >
                  <ArrowRightLeft className="w-4 h-4" />
                  Swap
                </button>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 px-3 py-1 rounded-lg bg-muted hover:bg-muted/80 text-sm transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            )}
          </div>
          {error ? (
            <div className="tool-panel-output min-h-[350px] flex items-center justify-center">
              <div className="text-center">
                <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
                <p className="text-destructive font-medium">Parse Error</p>
                <p className="text-sm text-muted-foreground mt-2">{error}</p>
              </div>
            </div>
          ) : (
            <pre className="tool-panel-output min-h-[350px] font-mono text-sm whitespace-pre-wrap overflow-auto">
              {output || <span className="text-muted-foreground">Output will appear here</span>}
            </pre>
          )}
        </div>
      </div>

      <button
        onClick={convert}
        className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
      >
        Convert
      </button>

      <div className="p-4 rounded-lg bg-muted/50">
        <p className="text-sm text-muted-foreground">
          <strong>Note:</strong> This is a simplified YAML parser that supports basic features like key-value pairs,
          nested objects, arrays, and comments. Complex YAML features like anchors, aliases, and multi-line strings
          may not be fully supported.
        </p>
      </div>
    </div>
  );
}

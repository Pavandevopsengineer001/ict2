"use client";

import { useState } from "react";
import { Zap, Copy, Check, AlertCircle, Info } from "lucide-react";

interface ParsedHeader {
  name: string;
  value: string;
  description?: string;
}

const HEADER_DESCRIPTIONS: Record<string, string> = {
  "content-type": "Indicates the media type of the resource",
  "content-length": "The size of the response body in bytes",
  "cache-control": "Directives for caching mechanisms",
  "authorization": "Contains credentials for authenticating the client",
  "accept": "Media types that are acceptable for the response",
  "accept-encoding": "Acceptable encodings (compression) for the response",
  "accept-language": "Acceptable languages for the response",
  "user-agent": "Information about the client software",
  "host": "The domain name of the server",
  "connection": "Control options for the current connection",
  "cookie": "HTTP cookies previously sent by the server",
  "set-cookie": "Send cookies from the server to the client",
  "location": "URL to redirect to",
  "x-frame-options": "Clickjacking protection",
  "x-content-type-options": "Prevents MIME type sniffing",
  "x-xss-protection": "Cross-site scripting filter",
  "strict-transport-security": "Forces HTTPS connections",
  "access-control-allow-origin": "CORS - allowed origins",
  "access-control-allow-methods": "CORS - allowed HTTP methods",
  "access-control-allow-headers": "CORS - allowed headers",
  "content-security-policy": "Security policy for content sources",
  "etag": "Identifier for a specific version of a resource",
  "last-modified": "Date and time the resource was last modified",
  "expires": "Date/time after which the response is stale",
  "pragma": "Implementation-specific directives",
  "vary": "Determines how to match future requests",
  "transfer-encoding": "Form of encoding used to transfer the payload",
  "www-authenticate": "Authentication method to use to access a resource",
  "referer": "Address of the previous web page",
  "origin": "Origin of the request",
};

export default function HttpHeaderParserTool() {
  const [input, setInput] = useState("");
  const [parsedHeaders, setParsedHeaders] = useState<ParsedHeader[]>([]);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const parseHeaders = () => {
    setError("");
    setParsedHeaders([]);

    if (!input.trim()) {
      setError("Please enter HTTP headers");
      return;
    }

    try {
      const lines = input.trim().split("\n");
      const headers: ParsedHeader[] = [];

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        const colonIndex = trimmed.indexOf(":");
        if (colonIndex === -1) {
          // Check if it's a request/response line
          if (trimmed.startsWith("HTTP/") || trimmed.match(/^(GET|POST|PUT|DELETE|PATCH|HEAD|OPTIONS)/)) {
            headers.push({
              name: "Request/Response Line",
              value: trimmed,
              description: "HTTP request method or response status",
            });
            continue;
          }
          continue;
        }

        const name = trimmed.slice(0, colonIndex).trim();
        const value = trimmed.slice(colonIndex + 1).trim();
        const description = HEADER_DESCRIPTIONS[name.toLowerCase()];

        headers.push({ name, value, description });
      }

      if (headers.length === 0) {
        setError("No valid headers found");
        return;
      }

      setParsedHeaders(headers);
    } catch (e) {
      setError((e as Error).message || "Failed to parse headers");
    }
  };

  const copyAsJson = async () => {
    const json = JSON.stringify(
      parsedHeaders.reduce((acc, h) => ({ ...acc, [h.name]: h.value }), {}),
      null,
      2
    );
    await navigator.clipboard.writeText(json);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadSample = () => {
    setInput(`HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Length: 1234
Cache-Control: max-age=3600, public
ETag: "abc123"
Last-Modified: Wed, 21 Oct 2024 07:28:00 GMT
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Strict-Transport-Security: max-age=31536000; includeSubDomains
Access-Control-Allow-Origin: *
Set-Cookie: session=abc123; HttpOnly; Secure; SameSite=Strict`);
  };

  const getHeaderCategory = (name: string): string => {
    const lower = name.toLowerCase();
    if (lower.startsWith("content-")) return "Content";
    if (lower.startsWith("access-control-")) return "CORS";
    if (lower.startsWith("x-")) return "Security";
    if (["authorization", "www-authenticate", "cookie", "set-cookie"].includes(lower)) return "Auth";
    if (["cache-control", "etag", "last-modified", "expires", "pragma", "vary"].includes(lower)) return "Caching";
    return "General";
  };

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
          <Zap className="w-4 h-4" />
          HTTP Headers
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Content-Type: application/json&#10;Cache-Control: max-age=3600"
          className="tool-panel-input min-h-[200px] font-mono text-sm"
        />
      </div>

      <button
        onClick={parseHeaders}
        className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
      >
        Parse Headers
      </button>

      {error && (
        <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-destructive">Parse Error</p>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        </div>
      )}

      {parsedHeaders.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {parsedHeaders.length} header{parsedHeaders.length !== 1 ? "s" : ""} found
            </span>
            <button
              onClick={copyAsJson}
              className="flex items-center gap-2 px-3 py-1 rounded-lg bg-muted hover:bg-muted/80 text-sm transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy as JSON"}
            </button>
          </div>

          <div className="space-y-2">
            {parsedHeaders.map((header, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-card border border-border/50"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono font-medium text-primary">
                        {header.name}
                      </span>
                      <span className="px-2 py-0.5 text-xs rounded bg-muted">
                        {getHeaderCategory(header.name)}
                      </span>
                    </div>
                    <p className="font-mono text-sm break-all">{header.value}</p>
                    {header.description && (
                      <p className="text-xs text-muted-foreground mt-2 flex items-start gap-1">
                        <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
                        {header.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

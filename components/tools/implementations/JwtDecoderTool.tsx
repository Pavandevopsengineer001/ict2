"use client";

import { useState } from "react";
import { Lock, Copy, Check, AlertCircle, Info } from "lucide-react";

interface DecodedJwt {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
  isExpired?: boolean;
  expiresAt?: string;
  issuedAt?: string;
}

export default function JwtDecoderTool() {
  const [input, setInput] = useState("");
  const [decoded, setDecoded] = useState<DecodedJwt | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const decodeJwt = () => {
    setError("");
    setDecoded(null);
    
    if (!input.trim()) {
      setError("Please enter a JWT token");
      return;
    }

    try {
      const parts = input.trim().split(".");
      if (parts.length !== 3) {
        throw new Error("Invalid JWT format. Token must have 3 parts separated by dots.");
      }

      const [headerB64, payloadB64, signature] = parts;
      
      const decodeBase64Url = (str: string) => {
        const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
        const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
        return JSON.parse(atob(padded));
      };

      const header = decodeBase64Url(headerB64);
      const payload = decodeBase64Url(payloadB64);

      let isExpired = false;
      let expiresAt = "";
      let issuedAt = "";

      if (payload.exp) {
        const expDate = new Date(payload.exp * 1000);
        isExpired = expDate < new Date();
        expiresAt = expDate.toLocaleString();
      }

      if (payload.iat) {
        issuedAt = new Date(payload.iat * 1000).toLocaleString();
      }

      setDecoded({
        header,
        payload,
        signature,
        isExpired,
        expiresAt,
        issuedAt,
      });
    } catch (e) {
      setError((e as Error).message || "Failed to decode JWT");
    }
  };

  const copyToClipboard = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const loadSample = () => {
    // Sample JWT with header, payload, and signature
    setInput("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE5MTYyMzkwMjIsImVtYWlsIjoiam9obkBleGFtcGxlLmNvbSIsInJvbGUiOiJhZG1pbiJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c");
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
          <Lock className="w-4 h-4" />
          JWT Token
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
          className="tool-panel-input min-h-[120px] font-mono text-sm"
        />
      </div>

      <button
        onClick={decodeJwt}
        className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
      >
        Decode JWT
      </button>

      {error && (
        <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-destructive">Decode Error</p>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        </div>
      )}

      {decoded && (
        <div className="space-y-4">
          {decoded.expiresAt && (
            <div className={`p-4 rounded-lg flex items-start gap-3 ${decoded.isExpired ? 'bg-destructive/10 border border-destructive/30' : 'bg-green-500/10 border border-green-500/30'}`}>
              <Info className={`w-5 h-5 flex-shrink-0 mt-0.5 ${decoded.isExpired ? 'text-destructive' : 'text-green-500'}`} />
              <div>
                <p className={`font-medium ${decoded.isExpired ? 'text-destructive' : 'text-green-500'}`}>
                  {decoded.isExpired ? "Token Expired" : "Token Valid"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {decoded.isExpired ? "Expired" : "Expires"}: {decoded.expiresAt}
                </p>
                {decoded.issuedAt && (
                  <p className="text-sm text-muted-foreground">Issued: {decoded.issuedAt}</p>
                )}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Header</label>
              <button
                onClick={() => copyToClipboard(JSON.stringify(decoded.header, null, 2), "header")}
                className="flex items-center gap-1 px-2 py-1 text-xs rounded bg-muted hover:bg-muted/80"
              >
                {copied === "header" ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                {copied === "header" ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre className="tool-panel-output font-mono text-sm p-4 rounded-lg overflow-auto">
              {JSON.stringify(decoded.header, null, 2)}
            </pre>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Payload</label>
              <button
                onClick={() => copyToClipboard(JSON.stringify(decoded.payload, null, 2), "payload")}
                className="flex items-center gap-1 px-2 py-1 text-xs rounded bg-muted hover:bg-muted/80"
              >
                {copied === "payload" ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                {copied === "payload" ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre className="tool-panel-output font-mono text-sm p-4 rounded-lg overflow-auto max-h-[300px]">
              {JSON.stringify(decoded.payload, null, 2)}
            </pre>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Signature</label>
            <div className="tool-panel-output font-mono text-sm p-4 rounded-lg break-all">
              {decoded.signature}
            </div>
            <p className="text-xs text-muted-foreground">
              Note: Signature verification requires the secret key and is not performed client-side.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

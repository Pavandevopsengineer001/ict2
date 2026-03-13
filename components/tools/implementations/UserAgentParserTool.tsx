"use client";

import { useState, useEffect } from "react";
import { Globe, Copy, Check, Monitor, Smartphone, Tablet, Bot } from "lucide-react";

interface ParsedUserAgent {
  browser: { name: string; version: string };
  os: { name: string; version: string };
  device: { type: string; vendor?: string; model?: string };
  engine: { name: string; version: string };
  isBot: boolean;
}

export default function UserAgentParserTool() {
  const [input, setInput] = useState("");
  const [parsed, setParsed] = useState<ParsedUserAgent | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Set current browser's user agent as default
    if (typeof navigator !== "undefined") {
      setInput(navigator.userAgent);
    }
  }, []);

  const parseUserAgent = (ua: string): ParsedUserAgent => {
    const result: ParsedUserAgent = {
      browser: { name: "Unknown", version: "" },
      os: { name: "Unknown", version: "" },
      device: { type: "desktop" },
      engine: { name: "Unknown", version: "" },
      isBot: false,
    };

    // Check for bots
    const botPatterns = /bot|crawler|spider|crawling|googlebot|bingbot|slurp|duckduckbot|baiduspider|yandexbot|sogou|facebot|ia_archiver/i;
    if (botPatterns.test(ua)) {
      result.isBot = true;
      result.device.type = "bot";
    }

    // Browser detection
    if (/Edg/i.test(ua)) {
      result.browser.name = "Microsoft Edge";
      const match = ua.match(/Edg\/(\d+[\.\d]*)/);
      result.browser.version = match ? match[1] : "";
    } else if (/OPR|Opera/i.test(ua)) {
      result.browser.name = "Opera";
      const match = ua.match(/(?:OPR|Opera)\/(\d+[\.\d]*)/);
      result.browser.version = match ? match[1] : "";
    } else if (/Chrome/i.test(ua) && !/Chromium/i.test(ua)) {
      result.browser.name = "Chrome";
      const match = ua.match(/Chrome\/(\d+[\.\d]*)/);
      result.browser.version = match ? match[1] : "";
    } else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) {
      result.browser.name = "Safari";
      const match = ua.match(/Version\/(\d+[\.\d]*)/);
      result.browser.version = match ? match[1] : "";
    } else if (/Firefox/i.test(ua)) {
      result.browser.name = "Firefox";
      const match = ua.match(/Firefox\/(\d+[\.\d]*)/);
      result.browser.version = match ? match[1] : "";
    } else if (/MSIE|Trident/i.test(ua)) {
      result.browser.name = "Internet Explorer";
      const match = ua.match(/(?:MSIE |rv:)(\d+[\.\d]*)/);
      result.browser.version = match ? match[1] : "";
    }

    // OS detection
    if (/Windows NT 10/i.test(ua)) {
      result.os.name = "Windows";
      result.os.version = "10/11";
    } else if (/Windows NT 6\.3/i.test(ua)) {
      result.os.name = "Windows";
      result.os.version = "8.1";
    } else if (/Windows NT 6\.2/i.test(ua)) {
      result.os.name = "Windows";
      result.os.version = "8";
    } else if (/Windows NT 6\.1/i.test(ua)) {
      result.os.name = "Windows";
      result.os.version = "7";
    } else if (/Mac OS X/i.test(ua)) {
      result.os.name = "macOS";
      const match = ua.match(/Mac OS X (\d+[\_\.\d]*)/);
      result.os.version = match ? match[1].replace(/_/g, ".") : "";
    } else if (/Android/i.test(ua)) {
      result.os.name = "Android";
      const match = ua.match(/Android (\d+[\.\d]*)/);
      result.os.version = match ? match[1] : "";
    } else if (/iOS|iPhone|iPad|iPod/i.test(ua)) {
      result.os.name = "iOS";
      const match = ua.match(/OS (\d+[\_\.\d]*)/);
      result.os.version = match ? match[1].replace(/_/g, ".") : "";
    } else if (/Linux/i.test(ua)) {
      result.os.name = "Linux";
    } else if (/CrOS/i.test(ua)) {
      result.os.name = "Chrome OS";
    }

    // Device detection
    if (/Mobile|Android.*Mobile|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)) {
      result.device.type = "mobile";
    } else if (/iPad|Android(?!.*Mobile)|Tablet/i.test(ua)) {
      result.device.type = "tablet";
    }

    // Device vendor/model
    if (/iPhone/i.test(ua)) {
      result.device.vendor = "Apple";
      result.device.model = "iPhone";
    } else if (/iPad/i.test(ua)) {
      result.device.vendor = "Apple";
      result.device.model = "iPad";
    } else if (/Samsung/i.test(ua)) {
      result.device.vendor = "Samsung";
      const match = ua.match(/SM-[A-Z0-9]+/i);
      result.device.model = match ? match[0] : "";
    } else if (/Pixel/i.test(ua)) {
      result.device.vendor = "Google";
      const match = ua.match(/Pixel \d*/i);
      result.device.model = match ? match[0] : "";
    }

    // Engine detection
    if (/Gecko\/\d/i.test(ua) && !/like Gecko/i.test(ua)) {
      result.engine.name = "Gecko";
      const match = ua.match(/rv:(\d+[\.\d]*)/);
      result.engine.version = match ? match[1] : "";
    } else if (/AppleWebKit/i.test(ua)) {
      result.engine.name = "WebKit";
      const match = ua.match(/AppleWebKit\/(\d+[\.\d]*)/);
      result.engine.version = match ? match[1] : "";
    } else if (/Trident/i.test(ua)) {
      result.engine.name = "Trident";
      const match = ua.match(/Trident\/(\d+[\.\d]*)/);
      result.engine.version = match ? match[1] : "";
    } else if (/Presto/i.test(ua)) {
      result.engine.name = "Presto";
    }

    return result;
  };

  const handleParse = () => {
    if (input.trim()) {
      setParsed(parseUserAgent(input));
    }
  };

  const copyToClipboard = async () => {
    if (parsed) {
      await navigator.clipboard.writeText(JSON.stringify(parsed, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const useCurrentUA = () => {
    if (typeof navigator !== "undefined") {
      setInput(navigator.userAgent);
    }
  };

  const DeviceIcon = () => {
    if (!parsed) return <Monitor className="w-8 h-8" />;
    switch (parsed.device.type) {
      case "mobile":
        return <Smartphone className="w-8 h-8" />;
      case "tablet":
        return <Tablet className="w-8 h-8" />;
      case "bot":
        return <Bot className="w-8 h-8" />;
      default:
        return <Monitor className="w-8 h-8" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={useCurrentUA}
          className="px-3 py-1.5 text-sm bg-muted hover:bg-muted/80 rounded-lg transition-colors"
        >
          Use Current Browser
        </button>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-muted-foreground flex items-center gap-2">
          <Globe className="w-4 h-4" />
          User Agent String
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Mozilla/5.0 (Windows NT 10.0; Win64; x64) ..."
          className="tool-panel-input min-h-[100px] font-mono text-sm"
        />
      </div>

      <button
        onClick={handleParse}
        className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
      >
        Parse User Agent
      </button>

      {parsed && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Parsed Results</span>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-3 py-1 rounded-lg bg-muted hover:bg-muted/80 text-sm transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy JSON"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="stat-card">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <DeviceIcon />
                </div>
                <div>
                  <p className="font-medium capitalize">{parsed.device.type}</p>
                  {parsed.device.vendor && (
                    <p className="text-sm text-muted-foreground">
                      {parsed.device.vendor} {parsed.device.model}
                    </p>
                  )}
                </div>
              </div>
              {parsed.isBot && (
                <span className="px-2 py-1 text-xs rounded bg-yellow-500/20 text-yellow-600">
                  Bot Detected
                </span>
              )}
            </div>

            <div className="stat-card">
              <p className="text-sm text-muted-foreground mb-1">Browser</p>
              <p className="font-medium text-lg">{parsed.browser.name}</p>
              {parsed.browser.version && (
                <p className="text-sm text-muted-foreground">v{parsed.browser.version}</p>
              )}
            </div>

            <div className="stat-card">
              <p className="text-sm text-muted-foreground mb-1">Operating System</p>
              <p className="font-medium text-lg">{parsed.os.name}</p>
              {parsed.os.version && (
                <p className="text-sm text-muted-foreground">v{parsed.os.version}</p>
              )}
            </div>

            <div className="stat-card">
              <p className="text-sm text-muted-foreground mb-1">Rendering Engine</p>
              <p className="font-medium text-lg">{parsed.engine.name}</p>
              {parsed.engine.version && (
                <p className="text-sm text-muted-foreground">v{parsed.engine.version}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Raw JSON</label>
            <pre className="tool-panel-output font-mono text-sm p-4 rounded-lg overflow-auto max-h-[200px]">
              {JSON.stringify(parsed, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

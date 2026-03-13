"use client";

import { useState, useEffect } from "react";
import { Clock, Copy, Check, RefreshCw } from "lucide-react";

export default function TimestampConverterTool() {
  const [timestamp, setTimestamp] = useState("");
  const [dateString, setDateString] = useState("");
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [copied, setCopied] = useState<string | null>(null);
  const [unit, setUnit] = useState<"seconds" | "milliseconds">("seconds");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const timestampToDate = () => {
    if (!timestamp) return;
    const ts = parseInt(timestamp);
    if (isNaN(ts)) return;
    
    const ms = unit === "seconds" ? ts * 1000 : ts;
    const date = new Date(ms);
    setDateString(date.toISOString());
  };

  const dateToTimestamp = () => {
    if (!dateString) return;
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return;
    
    const ts = unit === "seconds" 
      ? Math.floor(date.getTime() / 1000) 
      : date.getTime();
    setTimestamp(ts.toString());
  };

  const useNow = () => {
    const ts = unit === "seconds" 
      ? Math.floor(Date.now() / 1000) 
      : Date.now();
    setTimestamp(ts.toString());
    setDateString(new Date().toISOString());
  };

  const copyToClipboard = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const formatDate = (date: Date) => {
    return {
      iso: date.toISOString(),
      utc: date.toUTCString(),
      local: date.toLocaleString(),
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
      relative: getRelativeTime(date),
    };
  };

  const getRelativeTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(Math.abs(diff) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    const prefix = diff > 0 ? "" : "in ";
    const suffix = diff > 0 ? " ago" : "";

    if (years > 0) return `${prefix}${years} year${years > 1 ? "s" : ""}${suffix}`;
    if (months > 0) return `${prefix}${months} month${months > 1 ? "s" : ""}${suffix}`;
    if (weeks > 0) return `${prefix}${weeks} week${weeks > 1 ? "s" : ""}${suffix}`;
    if (days > 0) return `${prefix}${days} day${days > 1 ? "s" : ""}${suffix}`;
    if (hours > 0) return `${prefix}${hours} hour${hours > 1 ? "s" : ""}${suffix}`;
    if (minutes > 0) return `${prefix}${minutes} minute${minutes > 1 ? "s" : ""}${suffix}`;
    return "just now";
  };

  const currentTs = unit === "seconds" 
    ? Math.floor(currentTime / 1000) 
    : currentTime;

  const parsedDate = timestamp 
    ? new Date(unit === "seconds" ? parseInt(timestamp) * 1000 : parseInt(timestamp))
    : null;

  const formattedDates = parsedDate && !isNaN(parsedDate.getTime()) 
    ? formatDate(parsedDate) 
    : null;

  return (
    <div className="space-y-6">
      <div className="stat-card">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Current Unix Timestamp</span>
          <button
            onClick={() => copyToClipboard(currentTs.toString(), "current")}
            className="flex items-center gap-1 px-2 py-1 text-xs rounded bg-muted hover:bg-muted/80"
          >
            {copied === "current" ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
          </button>
        </div>
        <div className="text-3xl font-mono font-bold text-primary">
          {currentTs}
        </div>
        <div className="text-sm text-muted-foreground mt-1">
          {new Date(currentTime).toLocaleString()}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-muted-foreground">Unit:</label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value as typeof unit)}
            className="calc-select w-32"
          >
            <option value="seconds">Seconds</option>
            <option value="milliseconds">Milliseconds</option>
          </select>
        </div>
        <button
          onClick={useNow}
          className="flex items-center gap-2 px-3 py-1.5 text-sm bg-muted hover:bg-muted/80 rounded-lg transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Use Now
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Unix Timestamp ({unit})
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              placeholder={unit === "seconds" ? "1609459200" : "1609459200000"}
              className="calc-input font-mono flex-1"
            />
            <button
              onClick={timestampToDate}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Convert
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Date/Time (ISO 8601)</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={dateString}
              onChange={(e) => setDateString(e.target.value)}
              placeholder="2021-01-01T00:00:00.000Z"
              className="calc-input font-mono flex-1"
            />
            <button
              onClick={dateToTimestamp}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Convert
            </button>
          </div>
        </div>
      </div>

      {formattedDates && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Converted Formats</h3>
          <div className="space-y-2">
            {Object.entries(formattedDates).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between p-3 rounded-lg bg-card border border-border/50"
              >
                <div>
                  <span className="text-xs text-muted-foreground uppercase">{key}</span>
                  <p className="font-mono text-sm">{value}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(value, key)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  {copied === key ? (
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

      <div className="p-4 rounded-lg bg-muted/50">
        <h4 className="text-sm font-medium mb-2">Common Timestamps</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          <button
            onClick={() => {
              setTimestamp("0");
              setDateString(new Date(0).toISOString());
            }}
            className="p-2 rounded bg-muted hover:bg-muted/80 text-left"
          >
            <div className="font-mono">0</div>
            <div className="text-muted-foreground">Unix Epoch</div>
          </button>
          <button
            onClick={() => {
              const y2k = unit === "seconds" ? "946684800" : "946684800000";
              setTimestamp(y2k);
              setDateString(new Date(946684800000).toISOString());
            }}
            className="p-2 rounded bg-muted hover:bg-muted/80 text-left"
          >
            <div className="font-mono">{unit === "seconds" ? "946684800" : "946684800000"}</div>
            <div className="text-muted-foreground">Y2K</div>
          </button>
          <button
            onClick={() => {
              const ts = unit === "seconds" ? "2147483647" : "2147483647000";
              setTimestamp(ts);
              setDateString(new Date(2147483647000).toISOString());
            }}
            className="p-2 rounded bg-muted hover:bg-muted/80 text-left"
          >
            <div className="font-mono">{unit === "seconds" ? "2147483647" : "2147483647000"}</div>
            <div className="text-muted-foreground">Y2K38</div>
          </button>
          <button
            onClick={() => {
              const tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(0, 0, 0, 0);
              const ts = unit === "seconds" 
                ? Math.floor(tomorrow.getTime() / 1000).toString()
                : tomorrow.getTime().toString();
              setTimestamp(ts);
              setDateString(tomorrow.toISOString());
            }}
            className="p-2 rounded bg-muted hover:bg-muted/80 text-left"
          >
            <div className="font-mono">Tomorrow</div>
            <div className="text-muted-foreground">Midnight</div>
          </button>
        </div>
      </div>
    </div>
  );
}

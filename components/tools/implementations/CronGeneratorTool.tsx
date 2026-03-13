"use client";

import { useState, useEffect } from "react";
import { Clock, Copy, Check, Info } from "lucide-react";

const PRESETS = [
  { name: "Every minute", cron: "* * * * *" },
  { name: "Every 5 minutes", cron: "*/5 * * * *" },
  { name: "Every hour", cron: "0 * * * *" },
  { name: "Every day at midnight", cron: "0 0 * * *" },
  { name: "Every day at noon", cron: "0 12 * * *" },
  { name: "Every Monday at 9am", cron: "0 9 * * 1" },
  { name: "Every weekday at 9am", cron: "0 9 * * 1-5" },
  { name: "First day of month", cron: "0 0 1 * *" },
  { name: "Every Sunday at midnight", cron: "0 0 * * 0" },
];

export default function CronGeneratorTool() {
  const [minute, setMinute] = useState("*");
  const [hour, setHour] = useState("*");
  const [dayOfMonth, setDayOfMonth] = useState("*");
  const [month, setMonth] = useState("*");
  const [dayOfWeek, setDayOfWeek] = useState("*");
  const [cronExpression, setCronExpression] = useState("* * * * *");
  const [description, setDescription] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const expr = `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;
    setCronExpression(expr);
    setDescription(describeCron(expr));
  }, [minute, hour, dayOfMonth, month, dayOfWeek]);

  const describeCron = (cron: string): string => {
    const parts = cron.split(" ");
    if (parts.length !== 5) return "Invalid cron expression";

    const [min, hr, dom, mon, dow] = parts;
    const descriptions: string[] = [];

    // Minute
    if (min === "*") descriptions.push("Every minute");
    else if (min.startsWith("*/")) descriptions.push(`Every ${min.slice(2)} minutes`);
    else if (min.includes(",")) descriptions.push(`At minutes ${min}`);
    else if (min.includes("-")) descriptions.push(`From minute ${min.split("-")[0]} to ${min.split("-")[1]}`);
    else descriptions.push(`At minute ${min}`);

    // Hour
    if (hr === "*") descriptions.push("of every hour");
    else if (hr.startsWith("*/")) descriptions.push(`every ${hr.slice(2)} hours`);
    else if (hr.includes(",")) descriptions.push(`at hours ${hr}`);
    else if (hr.includes("-")) descriptions.push(`from ${hr.split("-")[0]}:00 to ${hr.split("-")[1]}:00`);
    else descriptions.push(`at ${hr}:00`);

    // Day of month
    if (dom !== "*") {
      if (dom.includes(",")) descriptions.push(`on days ${dom}`);
      else if (dom.includes("-")) descriptions.push(`from day ${dom.split("-")[0]} to ${dom.split("-")[1]}`);
      else descriptions.push(`on day ${dom}`);
    }

    // Month
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    if (mon !== "*") {
      if (mon.includes(",")) descriptions.push(`in ${mon.split(",").map(m => monthNames[parseInt(m) - 1] || m).join(", ")}`);
      else if (mon.includes("-")) descriptions.push(`from ${monthNames[parseInt(mon.split("-")[0]) - 1]} to ${monthNames[parseInt(mon.split("-")[1]) - 1]}`);
      else descriptions.push(`in ${monthNames[parseInt(mon) - 1] || mon}`);
    }

    // Day of week
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    if (dow !== "*") {
      if (dow.includes(",")) descriptions.push(`on ${dow.split(",").map(d => dayNames[parseInt(d)] || d).join(", ")}`);
      else if (dow.includes("-")) descriptions.push(`from ${dayNames[parseInt(dow.split("-")[0])]} to ${dayNames[parseInt(dow.split("-")[1])]}`);
      else descriptions.push(`on ${dayNames[parseInt(dow)] || dow}`);
    }

    return descriptions.join(" ");
  };

  const applyPreset = (cron: string) => {
    const parts = cron.split(" ");
    if (parts.length === 5) {
      setMinute(parts[0]);
      setHour(parts[1]);
      setDayOfMonth(parts[2]);
      setMonth(parts[3]);
      setDayOfWeek(parts[4]);
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(cronExpression);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getNextRuns = () => {
    // Simple approximation of next runs
    const now = new Date();
    const runs: string[] = [];
    
    for (let i = 0; i < 5; i++) {
      const next = new Date(now.getTime() + (i + 1) * 60000);
      runs.push(next.toLocaleString());
    }
    
    return runs;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-muted-foreground w-full mb-2">Quick Presets:</span>
        {PRESETS.map((preset) => (
          <button
            key={preset.name}
            onClick={() => applyPreset(preset.cron)}
            className="px-3 py-1 rounded-lg text-xs bg-muted hover:bg-muted/80 transition-colors"
          >
            {preset.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Minute (0-59)</label>
          <input
            type="text"
            value={minute}
            onChange={(e) => setMinute(e.target.value)}
            placeholder="*"
            className="calc-input text-center font-mono"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Hour (0-23)</label>
          <input
            type="text"
            value={hour}
            onChange={(e) => setHour(e.target.value)}
            placeholder="*"
            className="calc-input text-center font-mono"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Day (1-31)</label>
          <input
            type="text"
            value={dayOfMonth}
            onChange={(e) => setDayOfMonth(e.target.value)}
            placeholder="*"
            className="calc-input text-center font-mono"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Month (1-12)</label>
          <input
            type="text"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            placeholder="*"
            className="calc-input text-center font-mono"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Weekday (0-6)</label>
          <input
            type="text"
            value={dayOfWeek}
            onChange={(e) => setDayOfWeek(e.target.value)}
            placeholder="*"
            className="calc-input text-center font-mono"
          />
        </div>
      </div>

      <div className="stat-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            <span className="font-medium">Generated Cron Expression</span>
          </div>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-3 py-1 rounded-lg bg-primary/10 hover:bg-primary/20 text-sm transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <div className="text-3xl font-mono font-bold text-center py-4 bg-muted rounded-lg">
          {cronExpression}
        </div>
      </div>

      <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
        <div className="flex items-start gap-2">
          <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">Schedule Description</p>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-muted-foreground">Cron Syntax Reference</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-3 rounded-lg bg-muted/50">
            <p className="font-mono mb-2">* * * * *</p>
            <p className="text-xs text-muted-foreground">minute hour day month weekday</p>
          </div>
          <div className="p-3 rounded-lg bg-muted/50 space-y-1">
            <p><code className="font-mono">*</code> - any value</p>
            <p><code className="font-mono">,</code> - list (1,3,5)</p>
            <p><code className="font-mono">-</code> - range (1-5)</p>
            <p><code className="font-mono">/</code> - step (*/5)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

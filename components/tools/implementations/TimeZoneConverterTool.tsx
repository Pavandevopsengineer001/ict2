"use client";

import { useState, useEffect } from "react";
import { Clock, Globe, Plus, X } from "lucide-react";

const timeZones = [
  { value: "America/New_York", label: "New York (EST/EDT)", offset: -5 },
  { value: "America/Chicago", label: "Chicago (CST/CDT)", offset: -6 },
  { value: "America/Denver", label: "Denver (MST/MDT)", offset: -7 },
  { value: "America/Los_Angeles", label: "Los Angeles (PST/PDT)", offset: -8 },
  { value: "America/Anchorage", label: "Anchorage (AKST)", offset: -9 },
  { value: "Pacific/Honolulu", label: "Honolulu (HST)", offset: -10 },
  { value: "Europe/London", label: "London (GMT/BST)", offset: 0 },
  { value: "Europe/Paris", label: "Paris (CET/CEST)", offset: 1 },
  { value: "Europe/Berlin", label: "Berlin (CET/CEST)", offset: 1 },
  { value: "Europe/Moscow", label: "Moscow (MSK)", offset: 3 },
  { value: "Asia/Dubai", label: "Dubai (GST)", offset: 4 },
  { value: "Asia/Kolkata", label: "India (IST)", offset: 5.5 },
  { value: "Asia/Singapore", label: "Singapore (SGT)", offset: 8 },
  { value: "Asia/Shanghai", label: "Shanghai (CST)", offset: 8 },
  { value: "Asia/Tokyo", label: "Tokyo (JST)", offset: 9 },
  { value: "Australia/Sydney", label: "Sydney (AEST/AEDT)", offset: 10 },
  { value: "Pacific/Auckland", label: "Auckland (NZST/NZDT)", offset: 12 },
];

export default function TimeZoneConverterTool() {
  const [sourceZone, setSourceZone] = useState("America/New_York");
  const [sourceTime, setSourceTime] = useState("");
  const [sourceDate, setSourceDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedZones, setSelectedZones] = useState(["Europe/London", "Asia/Tokyo"]);
  const [convertedTimes, setConvertedTimes] = useState<{ zone: string; time: string; date: string; label: string }[]>([]);

  useEffect(() => {
    if (!sourceTime) {
      const now = new Date();
      setSourceTime(`${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`);
    }
  }, [sourceTime]);

  const convert = () => {
    if (!sourceTime || !sourceDate) return;
    
    const [hours, minutes] = sourceTime.split(":").map(Number);
    const sourceDateTime = new Date(`${sourceDate}T${sourceTime}:00`);
    
    const results = selectedZones.map((zone) => {
      try {
        const converted = new Date(sourceDateTime.toLocaleString("en-US", { timeZone: zone }));
        const formatter = new Intl.DateTimeFormat("en-US", {
          timeZone: zone,
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
        const dateFormatter = new Intl.DateTimeFormat("en-US", {
          timeZone: zone,
          weekday: "short",
          month: "short",
          day: "numeric",
        });
        
        // Simple conversion using offset
        const srcZone = timeZones.find((z) => z.value === sourceZone);
        const tgtZone = timeZones.find((z) => z.value === zone);
        
        if (srcZone && tgtZone) {
          const offsetDiff = tgtZone.offset - srcZone.offset;
          const newDate = new Date(sourceDateTime.getTime() + offsetDiff * 60 * 60 * 1000);
          
          return {
            zone,
            time: newDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }),
            date: newDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
            label: tgtZone.label,
          };
        }
        
        return {
          zone,
          time: formatter.format(sourceDateTime),
          date: dateFormatter.format(sourceDateTime),
          label: timeZones.find((z) => z.value === zone)?.label || zone,
        };
      } catch {
        return { zone, time: "Error", date: "", label: zone };
      }
    });
    
    setConvertedTimes(results);
  };

  const addZone = (zone: string) => {
    if (!selectedZones.includes(zone)) {
      setSelectedZones([...selectedZones, zone]);
    }
  };

  const removeZone = (zone: string) => {
    setSelectedZones(selectedZones.filter((z) => z !== zone));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Source Time Zone
          </label>
          <select
            value={sourceZone}
            onChange={(e) => setSourceZone(e.target.value)}
            className="calc-select"
          >
            {timeZones.map((tz) => (
              <option key={tz.value} value={tz.value}>
                {tz.label}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Time
          </label>
          <input
            type="time"
            value={sourceTime}
            onChange={(e) => setSourceTime(e.target.value)}
            className="calc-input"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Date</label>
          <input
            type="date"
            value={sourceDate}
            onChange={(e) => setSourceDate(e.target.value)}
            className="calc-input"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-muted-foreground">Convert To</label>
        <div className="flex flex-wrap gap-2">
          {selectedZones.map((zone) => (
            <span
              key={zone}
              className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
            >
              {timeZones.find((z) => z.value === zone)?.label || zone}
              <button onClick={() => removeZone(zone)} className="hover:text-destructive">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
        <select
          onChange={(e) => {
            addZone(e.target.value);
            e.target.value = "";
          }}
          className="calc-select mt-2"
          defaultValue=""
        >
          <option value="" disabled>Add time zone...</option>
          {timeZones
            .filter((tz) => !selectedZones.includes(tz.value) && tz.value !== sourceZone)
            .map((tz) => (
              <option key={tz.value} value={tz.value}>
                {tz.label}
              </option>
            ))}
        </select>
      </div>

      <button
        onClick={convert}
        className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
      >
        <Clock className="w-4 h-4" />
        Convert Time
      </button>

      {convertedTimes.length > 0 && (
        <div className="space-y-3">
          {convertedTimes.map((ct) => (
            <div key={ct.zone} className="stat-card flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">{ct.label}</p>
                <p className="text-xs text-muted-foreground/70">{ct.date}</p>
              </div>
              <p className="text-2xl font-bold text-primary">{ct.time}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

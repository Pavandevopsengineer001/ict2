"use client";

import { useState } from "react";
import { Calendar, Plus, Minus } from "lucide-react";
import { CalculatorEngine } from "@/lib/calculatorEngine";

export default function DateCalculatorTool() {
  const [mode, setMode] = useState<"difference" | "add" | "subtract">("difference");
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [addDays, setAddDays] = useState("");
  const [addMonths, setAddMonths] = useState("");
  const [addYears, setAddYears] = useState("");
  const [result, setResult] = useState<{
    days?: number;
    weeks?: number;
    months?: number;
    years?: number;
    resultDate?: Date;
  } | null>(null);

  const calculate = () => {
    if (mode === "difference") {
      if (!date1 || !date2) return;
      const d1 = new Date(date1);
      const d2 = new Date(date2);
      const diff = CalculatorEngine.date.difference(d1, d2);
      setResult(diff);
    } else {
      if (!date1) return;
      const d = new Date(date1);
      const days = parseInt(addDays) || 0;
      const months = parseInt(addMonths) || 0;
      const years = parseInt(addYears) || 0;
      
      const multiplier = mode === "subtract" ? -1 : 1;
      const resultDate = CalculatorEngine.date.addTime(d, days * multiplier, months * multiplier, years * multiplier);
      setResult({ resultDate });
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {[
          { key: "difference", label: "Date Difference", icon: Calendar },
          { key: "add", label: "Add to Date", icon: Plus },
          { key: "subtract", label: "Subtract from Date", icon: Minus },
        ].map((m) => (
          <button
            key={m.key}
            onClick={() => {
              setMode(m.key as typeof mode);
              setResult(null);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              mode === m.key
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            <m.icon className="w-4 h-4" />
            {m.label}
          </button>
        ))}
      </div>

      {mode === "difference" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Start Date</label>
            <input
              type="date"
              value={date1}
              onChange={(e) => setDate1(e.target.value)}
              className="calc-input"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">End Date</label>
            <input
              type="date"
              value={date2}
              onChange={(e) => setDate2(e.target.value)}
              className="calc-input"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Start Date</label>
            <input
              type="date"
              value={date1}
              onChange={(e) => setDate1(e.target.value)}
              className="calc-input"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Years</label>
              <input
                type="number"
                value={addYears}
                onChange={(e) => setAddYears(e.target.value)}
                placeholder="0"
                className="calc-input"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Months</label>
              <input
                type="number"
                value={addMonths}
                onChange={(e) => setAddMonths(e.target.value)}
                placeholder="0"
                className="calc-input"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Days</label>
              <input
                type="number"
                value={addDays}
                onChange={(e) => setAddDays(e.target.value)}
                placeholder="0"
                className="calc-input"
              />
            </div>
          </div>
        </div>
      )}

      <button
        onClick={calculate}
        className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
      >
        <Calendar className="w-4 h-4" />
        Calculate
      </button>

      {result && (
        <div className="space-y-4">
          {mode === "difference" && result.days !== undefined ? (
            <>
              <div className="result-box text-center">
                <p className="result-label mb-2">Difference</p>
                <p className="result-value">{Math.abs(result.days).toLocaleString()} days</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="stat-card">
                  <p className="stat-value">{Math.abs(result.weeks || 0)}</p>
                  <p className="stat-label">Weeks</p>
                </div>
                <div className="stat-card">
                  <p className="stat-value">{Math.abs(result.months || 0)}</p>
                  <p className="stat-label">Months</p>
                </div>
                <div className="stat-card">
                  <p className="stat-value">{(Math.abs(result.days) / 365).toFixed(2)}</p>
                  <p className="stat-label">Years</p>
                </div>
              </div>
            </>
          ) : result.resultDate ? (
            <div className="result-box text-center">
              <p className="result-label mb-2">Result Date</p>
              <p className="result-value text-2xl">{formatDate(result.resultDate)}</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

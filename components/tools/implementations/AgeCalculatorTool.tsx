"use client";

import { useState } from "react";
import { Calendar, Cake } from "lucide-react";
import { CalculatorEngine } from "@/lib/calculatorEngine";

export default function AgeCalculatorTool() {
  const [birthDate, setBirthDate] = useState("");
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split("T")[0]);
  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
    totalWeeks: number;
    totalMonths: number;
    nextBirthday: number;
  } | null>(null);

  const calculate = () => {
    if (!birthDate) return;
    
    const birth = new Date(birthDate);
    const target = new Date(targetDate);
    
    if (birth > target) return;
    
    const res = CalculatorEngine.date.age(birth, target);
    setResult(res);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground flex items-center gap-2">
            <Cake className="w-4 h-4" />
            Date of Birth
          </label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="calc-input"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Calculate Age On
          </label>
          <input
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="calc-input"
          />
        </div>
      </div>

      <button
        onClick={calculate}
        className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
      >
        <Calendar className="w-4 h-4" />
        Calculate Age
      </button>

      {result && (
        <div className="space-y-4">
          <div className="result-box text-center">
            <p className="result-label mb-2">Your Age</p>
            <p className="result-value">
              {result.years} <span className="text-lg">years</span>{" "}
              {result.months} <span className="text-lg">months</span>{" "}
              {result.days} <span className="text-lg">days</span>
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="stat-card">
              <p className="stat-value">{result.totalDays.toLocaleString()}</p>
              <p className="stat-label">Total Days</p>
            </div>
            <div className="stat-card">
              <p className="stat-value">{result.totalWeeks.toLocaleString()}</p>
              <p className="stat-label">Total Weeks</p>
            </div>
            <div className="stat-card">
              <p className="stat-value">{result.totalMonths.toLocaleString()}</p>
              <p className="stat-label">Total Months</p>
            </div>
            <div className="stat-card">
              <p className="stat-value">{result.nextBirthday}</p>
              <p className="stat-label">Days to Birthday</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

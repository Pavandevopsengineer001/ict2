"use client";

import { useState } from "react";
import { Calculator, TrendingUp } from "lucide-react";
import { CalculatorEngine } from "@/lib/calculatorEngine";

export default function CompoundInterestCalculatorTool() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [compoundFreq, setCompoundFreq] = useState("12");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [result, setResult] = useState<{
    finalAmount: number;
    totalContributions: number;
    totalInterest: number;
  } | null>(null);

  const calculate = () => {
    const p = parseFloat(principal) || 0;
    const r = parseFloat(rate);
    const t = parseFloat(time);
    const n = parseInt(compoundFreq);
    const contrib = parseFloat(monthlyContribution) || 0;
    
    if (isNaN(r) || isNaN(t) || r <= 0 || t <= 0) return;
    
    const res = CalculatorEngine.financial.compoundInterest(p, r, t, n, contrib);
    setResult(res);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Initial Investment ($)</label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            placeholder="e.g., 10000"
            className="calc-input"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Monthly Contribution ($)</label>
          <input
            type="number"
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(e.target.value)}
            placeholder="e.g., 500"
            className="calc-input"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Annual Interest Rate (%)</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            placeholder="e.g., 7"
            step="0.1"
            className="calc-input"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Time Period (Years)</label>
          <input
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="e.g., 20"
            className="calc-input"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-muted-foreground">Compound Frequency</label>
        <select
          value={compoundFreq}
          onChange={(e) => setCompoundFreq(e.target.value)}
          className="calc-select"
        >
          <option value="1">Annually</option>
          <option value="2">Semi-Annually</option>
          <option value="4">Quarterly</option>
          <option value="12">Monthly</option>
          <option value="365">Daily</option>
        </select>
      </div>

      <button
        onClick={calculate}
        className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
      >
        <TrendingUp className="w-4 h-4" />
        Calculate Growth
      </button>

      {result && (
        <div className="space-y-4">
          <div className="result-box text-center">
            <p className="result-label mb-2">Final Balance</p>
            <p className="result-value">${result.finalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="stat-card">
              <p className="stat-value">${result.totalContributions.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
              <p className="stat-label">Total Contributions</p>
            </div>
            <div className="stat-card">
              <p className="stat-value text-green-500">${result.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
              <p className="stat-label">Interest Earned</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

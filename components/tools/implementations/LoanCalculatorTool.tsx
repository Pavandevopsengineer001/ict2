"use client";

import { useState } from "react";
import { Calculator, DollarSign, Calendar, Percent } from "lucide-react";
import { CalculatorEngine } from "@/lib/calculatorEngine";

export default function LoanCalculatorTool() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState<{
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
  } | null>(null);

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const y = parseFloat(years);
    
    if (isNaN(p) || isNaN(r) || isNaN(y) || p <= 0 || r <= 0 || y <= 0) return;
    
    const res = CalculatorEngine.financial.loanPayment(p, r, y);
    setResult(res);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Loan Amount
          </label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            placeholder="e.g., 250000"
            className="calc-input"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground flex items-center gap-2">
            <Percent className="w-4 h-4" />
            Annual Interest Rate (%)
          </label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            placeholder="e.g., 6.5"
            step="0.1"
            className="calc-input"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Loan Term (Years)
          </label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            placeholder="e.g., 30"
            className="calc-input"
          />
        </div>
      </div>

      <button
        onClick={calculate}
        className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
      >
        <Calculator className="w-4 h-4" />
        Calculate Loan
      </button>

      {result && (
        <div className="space-y-4">
          <div className="result-box text-center">
            <p className="result-label mb-2">Monthly Payment</p>
            <p className="result-value">${result.monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="stat-card">
              <p className="stat-value">${result.totalPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
              <p className="stat-label">Total Payment</p>
            </div>
            <div className="stat-card">
              <p className="stat-value">${result.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
              <p className="stat-label">Total Interest</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

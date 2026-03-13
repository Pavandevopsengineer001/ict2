"use client";

import { useState } from "react";
import { Calculator, Users, DollarSign } from "lucide-react";

export default function TipCalculatorTool() {
  const [billAmount, setBillAmount] = useState("");
  const [tipPercent, setTipPercent] = useState("15");
  const [splitCount, setSplitCount] = useState("1");
  const [result, setResult] = useState<{
    tipAmount: number;
    totalAmount: number;
    perPerson: number;
    tipPerPerson: number;
  } | null>(null);

  const calculate = () => {
    const bill = parseFloat(billAmount);
    const tip = parseFloat(tipPercent);
    const split = parseInt(splitCount);
    
    if (isNaN(bill) || isNaN(tip) || isNaN(split) || bill <= 0 || split < 1) return;
    
    const tipAmount = bill * (tip / 100);
    const totalAmount = bill + tipAmount;
    const perPerson = totalAmount / split;
    const tipPerPerson = tipAmount / split;
    
    setResult({ tipAmount, totalAmount, perPerson, tipPerPerson });
  };

  const quickTips = [10, 15, 18, 20, 25];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm text-muted-foreground flex items-center gap-2">
          <DollarSign className="w-4 h-4" />
          Bill Amount
        </label>
        <input
          type="number"
          value={billAmount}
          onChange={(e) => setBillAmount(e.target.value)}
          placeholder="Enter bill amount"
          className="calc-input text-2xl"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-muted-foreground">Tip Percentage</label>
        <div className="flex flex-wrap gap-2">
          {quickTips.map((tip) => (
            <button
              key={tip}
              onClick={() => setTipPercent(tip.toString())}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                tipPercent === tip.toString()
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              {tip}%
            </button>
          ))}
        </div>
        <input
          type="number"
          value={tipPercent}
          onChange={(e) => setTipPercent(e.target.value)}
          placeholder="Custom tip %"
          className="calc-input mt-2"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-muted-foreground flex items-center gap-2">
          <Users className="w-4 h-4" />
          Split Between
        </label>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSplitCount(Math.max(1, parseInt(splitCount) - 1).toString())}
            className="w-12 h-12 rounded-lg bg-muted hover:bg-muted/80 text-lg font-bold"
          >
            -
          </button>
          <input
            type="number"
            value={splitCount}
            onChange={(e) => setSplitCount(e.target.value)}
            min="1"
            className="calc-input text-center text-xl w-24"
          />
          <button
            onClick={() => setSplitCount((parseInt(splitCount) + 1).toString())}
            className="w-12 h-12 rounded-lg bg-muted hover:bg-muted/80 text-lg font-bold"
          >
            +
          </button>
        </div>
      </div>

      <button
        onClick={calculate}
        className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
      >
        <Calculator className="w-4 h-4" />
        Calculate Tip
      </button>

      {result && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="stat-card">
              <p className="stat-value">${result.tipAmount.toFixed(2)}</p>
              <p className="stat-label">Tip Amount</p>
            </div>
            <div className="stat-card">
              <p className="stat-value">${result.totalAmount.toFixed(2)}</p>
              <p className="stat-label">Total</p>
            </div>
          </div>
          
          {parseInt(splitCount) > 1 && (
            <div className="result-box text-center">
              <p className="result-label mb-2">Per Person</p>
              <p className="result-value">${result.perPerson.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground mt-2">
                (${result.tipPerPerson.toFixed(2)} tip each)
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { Calculator } from "lucide-react";
import { CalculatorEngine } from "@/lib/calculatorEngine";

export default function PercentageCalculatorTool() {
  const [calcType, setCalcType] = useState<"whatIs" | "isWhatPercent" | "change">("whatIs");
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const v1 = parseFloat(value1);
    const v2 = parseFloat(value2);
    
    if (isNaN(v1) || isNaN(v2)) return;
    
    let res: number;
    switch (calcType) {
      case "whatIs":
        res = CalculatorEngine.percentage.whatIsXPercentOfY(v1, v2);
        break;
      case "isWhatPercent":
        res = CalculatorEngine.percentage.xIsWhatPercentOfY(v1, v2);
        break;
      case "change":
        res = CalculatorEngine.percentage.percentageChange(v1, v2);
        break;
      default:
        return;
    }
    setResult(res);
  };

  const getLabel = () => {
    switch (calcType) {
      case "whatIs":
        return { label1: "Percentage (%)", label2: "Of Value", resultLabel: "Result" };
      case "isWhatPercent":
        return { label1: "Value", label2: "Total", resultLabel: "Percentage" };
      case "change":
        return { label1: "Original Value", label2: "New Value", resultLabel: "Change %" };
    }
  };

  const labels = getLabel();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {[
          { key: "whatIs", label: "What is X% of Y?" },
          { key: "isWhatPercent", label: "X is what % of Y?" },
          { key: "change", label: "% Change" },
        ].map((type) => (
          <button
            key={type.key}
            onClick={() => {
              setCalcType(type.key as typeof calcType);
              setResult(null);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              calcType === type.key
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">{labels.label1}</label>
          <input
            type="number"
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
            placeholder="Enter value"
            className="calc-input"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">{labels.label2}</label>
          <input
            type="number"
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
            placeholder="Enter value"
            className="calc-input"
          />
        </div>
      </div>

      <button
        onClick={calculate}
        className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
      >
        <Calculator className="w-4 h-4" />
        Calculate
      </button>

      {result !== null && (
        <div className="result-box text-center">
          <p className="result-label mb-2">{labels.resultLabel}</p>
          <p className="result-value">
            {calcType === "whatIs" 
              ? result.toLocaleString(undefined, { maximumFractionDigits: 4 })
              : `${result.toFixed(2)}%`}
          </p>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { Calculator, Home, DollarSign, Percent, Calendar } from "lucide-react";
import { CalculatorEngine } from "@/lib/calculatorEngine";

export default function MortgageCalculatorTool() {
  const [homePrice, setHomePrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [downPaymentType, setDownPaymentType] = useState<"percent" | "amount">("percent");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("30");
  const [propertyTax, setPropertyTax] = useState("");
  const [insurance, setInsurance] = useState("");
  const [result, setResult] = useState<{
    monthlyPayment: number;
    principal: number;
    totalPayment: number;
    totalInterest: number;
    monthlyPrincipalInterest: number;
    monthlyTax: number;
    monthlyInsurance: number;
  } | null>(null);

  const calculate = () => {
    const price = parseFloat(homePrice);
    const rate = parseFloat(interestRate);
    const years = parseInt(loanTerm);
    
    if (isNaN(price) || isNaN(rate) || price <= 0 || rate <= 0) return;
    
    let downPaymentAmount: number;
    if (downPaymentType === "percent") {
      downPaymentAmount = price * (parseFloat(downPayment) || 0) / 100;
    } else {
      downPaymentAmount = parseFloat(downPayment) || 0;
    }
    
    const principal = price - downPaymentAmount;
    const monthlyTax = (parseFloat(propertyTax) || 0) / 12;
    const monthlyInsurance = (parseFloat(insurance) || 0) / 12;
    
    const loanResult = CalculatorEngine.financial.loanPayment(principal, rate, years);
    
    setResult({
      monthlyPayment: loanResult.monthlyPayment + monthlyTax + monthlyInsurance,
      principal,
      totalPayment: loanResult.totalPayment + (monthlyTax + monthlyInsurance) * years * 12,
      totalInterest: loanResult.totalInterest,
      monthlyPrincipalInterest: loanResult.monthlyPayment,
      monthlyTax,
      monthlyInsurance,
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground flex items-center gap-2">
            <Home className="w-4 h-4" />
            Home Price
          </label>
          <input
            type="number"
            value={homePrice}
            onChange={(e) => setHomePrice(e.target.value)}
            placeholder="e.g., 400000"
            className="calc-input"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Down Payment
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              placeholder={downPaymentType === "percent" ? "20" : "80000"}
              className="calc-input flex-1"
            />
            <select
              value={downPaymentType}
              onChange={(e) => setDownPaymentType(e.target.value as "percent" | "amount")}
              className="calc-select w-24"
            >
              <option value="percent">%</option>
              <option value="amount">$</option>
            </select>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground flex items-center gap-2">
            <Percent className="w-4 h-4" />
            Interest Rate (%)
          </label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            placeholder="e.g., 6.5"
            step="0.1"
            className="calc-input"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Loan Term
          </label>
          <select
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            className="calc-select"
          >
            <option value="10">10 years</option>
            <option value="15">15 years</option>
            <option value="20">20 years</option>
            <option value="30">30 years</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Property Tax (yearly)</label>
          <input
            type="number"
            value={propertyTax}
            onChange={(e) => setPropertyTax(e.target.value)}
            placeholder="e.g., 4800"
            className="calc-input"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Home Insurance (yearly)</label>
          <input
            type="number"
            value={insurance}
            onChange={(e) => setInsurance(e.target.value)}
            placeholder="e.g., 1200"
            className="calc-input"
          />
        </div>
      </div>

      <button
        onClick={calculate}
        className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
      >
        <Calculator className="w-4 h-4" />
        Calculate Mortgage
      </button>

      {result && (
        <div className="space-y-4">
          <div className="result-box text-center">
            <p className="result-label mb-2">Monthly Payment</p>
            <p className="result-value">${result.monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
          
          <div className="bg-card/50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Principal & Interest</span>
              <span>${result.monthlyPrincipalInterest.toFixed(2)}</span>
            </div>
            {result.monthlyTax > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Property Tax</span>
                <span>${result.monthlyTax.toFixed(2)}</span>
              </div>
            )}
            {result.monthlyInsurance > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Insurance</span>
                <span>${result.monthlyInsurance.toFixed(2)}</span>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="stat-card">
              <p className="stat-value text-sm">${result.principal.toLocaleString()}</p>
              <p className="stat-label">Loan Amount</p>
            </div>
            <div className="stat-card">
              <p className="stat-value text-sm">${result.totalPayment.toLocaleString()}</p>
              <p className="stat-label">Total Cost</p>
            </div>
            <div className="stat-card">
              <p className="stat-value text-sm">${result.totalInterest.toLocaleString()}</p>
              <p className="stat-label">Total Interest</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

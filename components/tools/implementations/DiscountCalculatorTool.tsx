"use client";

import { useState } from "react";
import { Calculator, Tag, Percent } from "lucide-react";

export default function DiscountCalculatorTool() {
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [result, setResult] = useState<{
    discountAmount: number;
    finalPrice: number;
  } | null>(null);

  const calculate = () => {
    const price = parseFloat(originalPrice);
    const discount = parseFloat(discountPercent);
    
    if (isNaN(price) || isNaN(discount) || price <= 0) return;
    
    const discountAmount = price * (discount / 100);
    const finalPrice = price - discountAmount;
    
    setResult({ discountAmount, finalPrice });
  };

  const quickDiscounts = [10, 15, 20, 25, 30, 50];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm text-muted-foreground flex items-center gap-2">
          <Tag className="w-4 h-4" />
          Original Price ($)
        </label>
        <input
          type="number"
          value={originalPrice}
          onChange={(e) => setOriginalPrice(e.target.value)}
          placeholder="Enter original price"
          className="calc-input text-2xl"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-muted-foreground flex items-center gap-2">
          <Percent className="w-4 h-4" />
          Discount Percentage
        </label>
        <div className="flex flex-wrap gap-2">
          {quickDiscounts.map((discount) => (
            <button
              key={discount}
              onClick={() => setDiscountPercent(discount.toString())}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                discountPercent === discount.toString()
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              {discount}%
            </button>
          ))}
        </div>
        <input
          type="number"
          value={discountPercent}
          onChange={(e) => setDiscountPercent(e.target.value)}
          placeholder="Or enter custom discount %"
          className="calc-input mt-2"
        />
      </div>

      <button
        onClick={calculate}
        className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
      >
        <Calculator className="w-4 h-4" />
        Calculate Discount
      </button>

      {result && (
        <div className="space-y-4">
          <div className="result-box text-center">
            <p className="result-label mb-2">Final Price</p>
            <p className="result-value">${result.finalPrice.toFixed(2)}</p>
          </div>
          
          <div className="stat-card">
            <p className="stat-value text-green-500">-${result.discountAmount.toFixed(2)}</p>
            <p className="stat-label">You Save</p>
          </div>
        </div>
      )}
    </div>
  );
}

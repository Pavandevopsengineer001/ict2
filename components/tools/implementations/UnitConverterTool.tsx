"use client";

import { useState } from "react";
import { ArrowRightLeft, Ruler } from "lucide-react";
import { CalculatorEngine } from "@/lib/calculatorEngine";

const unitCategories = {
  length: {
    label: "Length",
    units: ["meter", "kilometer", "centimeter", "millimeter", "mile", "yard", "foot", "inch"],
  },
  weight: {
    label: "Weight",
    units: ["kilogram", "gram", "milligram", "pound", "ounce", "ton"],
  },
  temperature: {
    label: "Temperature",
    units: ["celsius", "fahrenheit", "kelvin"],
  },
  volume: {
    label: "Volume",
    units: ["liter", "milliliter", "gallon", "quart", "pint", "cup", "fluid_ounce"],
  },
  area: {
    label: "Area",
    units: ["square_meter", "square_kilometer", "square_foot", "square_yard", "acre", "hectare"],
  },
  speed: {
    label: "Speed",
    units: ["meter_per_second", "kilometer_per_hour", "mile_per_hour", "knot"],
  },
  time: {
    label: "Time",
    units: ["second", "minute", "hour", "day", "week", "month", "year"],
  },
  data: {
    label: "Digital Storage",
    units: ["bit", "byte", "kilobyte", "megabyte", "gigabyte", "terabyte"],
  },
};

export default function UnitConverterTool() {
  const [category, setCategory] = useState<keyof typeof unitCategories>("length");
  const [fromUnit, setFromUnit] = useState(unitCategories.length.units[0]);
  const [toUnit, setToUnit] = useState(unitCategories.length.units[1]);
  const [value, setValue] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const handleCategoryChange = (cat: keyof typeof unitCategories) => {
    setCategory(cat);
    setFromUnit(unitCategories[cat].units[0]);
    setToUnit(unitCategories[cat].units[1]);
    setResult(null);
  };

  const convert = () => {
    const v = parseFloat(value);
    if (isNaN(v)) return;
    
    const res = CalculatorEngine.unit.convert(v, fromUnit, toUnit, category);
    setResult(res);
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    if (result !== null) {
      setValue(result.toString());
      const v = parseFloat(value);
      if (!isNaN(v)) {
        setResult(v);
      }
    }
  };

  const formatUnitName = (unit: string) => {
    return unit.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {Object.entries(unitCategories).map(([key, { label }]) => (
          <button
            key={key}
            onClick={() => handleCategoryChange(key as keyof typeof unitCategories)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              category === key
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-4 items-end">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">From</label>
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="calc-select"
          >
            {unitCategories[category].units.map((unit) => (
              <option key={unit} value={unit}>
                {formatUnitName(unit)}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter value"
            className="calc-input"
          />
        </div>

        <button
          onClick={swapUnits}
          className="p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors self-center"
          title="Swap units"
        >
          <ArrowRightLeft className="w-5 h-5" />
        </button>

        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">To</label>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="calc-select"
          >
            {unitCategories[category].units.map((unit) => (
              <option key={unit} value={unit}>
                {formatUnitName(unit)}
              </option>
            ))}
          </select>
          <div className="calc-input bg-muted/50 flex items-center">
            {result !== null ? (
              <span className="text-primary font-medium">
                {result.toLocaleString(undefined, { maximumFractionDigits: 10 })}
              </span>
            ) : (
              <span className="text-muted-foreground">Result</span>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={convert}
        className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
      >
        <Ruler className="w-4 h-4" />
        Convert
      </button>

      {result !== null && (
        <div className="result-box text-center">
          <p className="text-lg">
            <span className="font-semibold">{parseFloat(value).toLocaleString()}</span>{" "}
            <span className="text-muted-foreground">{formatUnitName(fromUnit)}</span>
            <span className="mx-3">=</span>
            <span className="font-semibold text-primary">
              {result.toLocaleString(undefined, { maximumFractionDigits: 10 })}
            </span>{" "}
            <span className="text-muted-foreground">{formatUnitName(toUnit)}</span>
          </p>
        </div>
      )}
    </div>
  );
}

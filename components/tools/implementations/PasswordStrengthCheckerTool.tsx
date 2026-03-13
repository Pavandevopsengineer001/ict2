"use client";

import { useState, useEffect } from "react";
import { Shield, Check, X, Eye, EyeOff } from "lucide-react";
import { textAnalyze } from "@/lib/textProcessor";

export default function PasswordStrengthCheckerTool() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof textAnalyze.passwordStrength> | null>(null);

  useEffect(() => {
    if (password) {
      setResult(textAnalyze.passwordStrength(password));
    } else {
      setResult(null);
    }
  }, [password]);

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case "weak": return "text-red-500 bg-red-500";
      case "fair": return "text-orange-500 bg-orange-500";
      case "good": return "text-yellow-500 bg-yellow-500";
      case "strong": return "text-green-500 bg-green-500";
      default: return "text-muted-foreground bg-muted";
    }
  };

  const getStrengthWidth = (score: number, maxScore: number) => {
    return `${(score / maxScore) * 100}%`;
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm text-muted-foreground flex items-center gap-2">
          <Shield className="w-4 h-4" />
          Enter Password to Check
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password..."
            className="calc-input pr-12 font-mono"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5 text-muted-foreground" />
            ) : (
              <Eye className="w-5 h-5 text-muted-foreground" />
            )}
          </button>
        </div>
      </div>

      {result && (
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Strength</span>
              <span className={`text-sm font-medium capitalize ${getStrengthColor(result.strength).split(" ")[0]}`}>
                {result.strength}
              </span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${getStrengthColor(result.strength).split(" ")[1]}`}
                style={{ width: getStrengthWidth(result.score, result.maxScore) }}
              />
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Score: {result.score} / {result.maxScore}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className={`p-3 rounded-lg flex items-center gap-2 ${result.checks.length ? "bg-green-500/10" : "bg-red-500/10"}`}>
              {result.checks.length ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <X className="w-4 h-4 text-red-500" />
              )}
              <span className="text-sm">At least 8 characters</span>
            </div>
            <div className={`p-3 rounded-lg flex items-center gap-2 ${result.checks.longLength ? "bg-green-500/10" : "bg-muted/50"}`}>
              {result.checks.longLength ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <X className="w-4 h-4 text-muted-foreground" />
              )}
              <span className="text-sm">At least 12 characters</span>
            </div>
            <div className={`p-3 rounded-lg flex items-center gap-2 ${result.checks.uppercase ? "bg-green-500/10" : "bg-red-500/10"}`}>
              {result.checks.uppercase ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <X className="w-4 h-4 text-red-500" />
              )}
              <span className="text-sm">Uppercase letters (A-Z)</span>
            </div>
            <div className={`p-3 rounded-lg flex items-center gap-2 ${result.checks.lowercase ? "bg-green-500/10" : "bg-red-500/10"}`}>
              {result.checks.lowercase ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <X className="w-4 h-4 text-red-500" />
              )}
              <span className="text-sm">Lowercase letters (a-z)</span>
            </div>
            <div className={`p-3 rounded-lg flex items-center gap-2 ${result.checks.numbers ? "bg-green-500/10" : "bg-red-500/10"}`}>
              {result.checks.numbers ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <X className="w-4 h-4 text-red-500" />
              )}
              <span className="text-sm">Numbers (0-9)</span>
            </div>
            <div className={`p-3 rounded-lg flex items-center gap-2 ${result.checks.special ? "bg-green-500/10" : "bg-red-500/10"}`}>
              {result.checks.special ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <X className="w-4 h-4 text-red-500" />
              )}
              <span className="text-sm">Special characters (!@#$...)</span>
            </div>
            <div className={`p-3 rounded-lg flex items-center gap-2 col-span-2 ${result.checks.noCommon ? "bg-green-500/10" : "bg-red-500/10"}`}>
              {result.checks.noCommon ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <X className="w-4 h-4 text-red-500" />
              )}
              <span className="text-sm">No common patterns (password, 123456, qwerty)</span>
            </div>
          </div>

          {result.suggestions.length > 0 && (
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <h4 className="text-sm font-medium mb-2">Suggestions to improve:</h4>
              <ul className="space-y-1">
                {result.suggestions.map((suggestion, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid grid-cols-3 gap-4">
            <div className="stat-card text-center">
              <p className="stat-value">{password.length}</p>
              <p className="stat-label">Length</p>
            </div>
            <div className="stat-card text-center">
              <p className="stat-value">
                {new Set(password.split("")).size}
              </p>
              <p className="stat-label">Unique Chars</p>
            </div>
            <div className="stat-card text-center">
              <p className="stat-value">
                {Math.round(Math.log2(Math.pow(94, password.length)))}
              </p>
              <p className="stat-label">Entropy (bits)</p>
            </div>
          </div>
        </div>
      )}

      <div className="p-4 rounded-lg bg-muted/50">
        <p className="text-sm text-muted-foreground">
          <strong>Privacy Note:</strong> Your password is analyzed entirely in your browser.
          It is never sent to any server or stored anywhere.
        </p>
      </div>
    </div>
  );
}

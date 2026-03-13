/**
 * Calculator Engine - Comprehensive calculation utilities
 * Supports: Financial, Date/Time, Math, Unit Conversion, Health, and more
 */

// ============================================
// PERCENTAGE CALCULATIONS
// ============================================

export const percentageCalc = {
  // What is X% of Y
  percentOf: (percent: number, value: number): number => {
    return (percent / 100) * value
  },

  // X is what % of Y
  whatPercent: (value: number, total: number): number => {
    if (total === 0) return 0
    return (value / total) * 100
  },

  // Percentage increase
  increase: (original: number, percent: number): number => {
    return original + (original * percent) / 100
  },

  // Percentage decrease
  decrease: (original: number, percent: number): number => {
    return original - (original * percent) / 100
  },

  // Percentage change between two values
  change: (oldValue: number, newValue: number): number => {
    if (oldValue === 0) return 0
    return ((newValue - oldValue) / Math.abs(oldValue)) * 100
  },

  // Percentage difference
  difference: (value1: number, value2: number): number => {
    const avg = (value1 + value2) / 2
    if (avg === 0) return 0
    return (Math.abs(value1 - value2) / avg) * 100
  },
}

// ============================================
// FINANCIAL CALCULATIONS
// ============================================

export const financialCalc = {
  // Discount Calculator
  discount: (originalPrice: number, discountPercent: number) => {
    const discountAmount = (originalPrice * discountPercent) / 100
    const finalPrice = originalPrice - discountAmount
    return {
      originalPrice: Number(originalPrice.toFixed(2)),
      discountPercent,
      discountAmount: Number(discountAmount.toFixed(2)),
      finalPrice: Number(finalPrice.toFixed(2)),
      savings: Number(discountAmount.toFixed(2)),
    }
  },

  // Sales Tax Calculator
  salesTax: (price: number, taxRate: number) => {
    const taxAmount = (price * taxRate) / 100
    const total = price + taxAmount
    return {
      subtotal: Number(price.toFixed(2)),
      taxRate,
      taxAmount: Number(taxAmount.toFixed(2)),
      total: Number(total.toFixed(2)),
    }
  },

  // Tip Calculator
  tip: (billAmount: number, tipPercent: number, splitCount: number = 1) => {
    const tipAmount = (billAmount * tipPercent) / 100
    const total = billAmount + tipAmount
    const perPerson = total / splitCount
    return {
      billAmount: Number(billAmount.toFixed(2)),
      tipPercent,
      tipAmount: Number(tipAmount.toFixed(2)),
      total: Number(total.toFixed(2)),
      perPerson: Number(perPerson.toFixed(2)),
      splitCount,
    }
  },

  // Compound Interest
  compoundInterest: (
    principal: number,
    rate: number,
    time: number,
    compoundsPerYear: number = 12
  ) => {
    const r = rate / 100
    const amount = principal * Math.pow(1 + r / compoundsPerYear, compoundsPerYear * time)
    const interest = amount - principal
    return {
      principal: Number(principal.toFixed(2)),
      rate,
      time,
      compoundsPerYear,
      futureValue: Number(amount.toFixed(2)),
      totalInterest: Number(interest.toFixed(2)),
    }
  },

  // Simple Interest
  simpleInterest: (principal: number, rate: number, time: number) => {
    const interest = (principal * rate * time) / 100
    const amount = principal + interest
    return {
      principal: Number(principal.toFixed(2)),
      rate,
      time,
      interest: Number(interest.toFixed(2)),
      total: Number(amount.toFixed(2)),
    }
  },

  // Loan EMI Calculator
  emi: (principal: number, annualRate: number, tenureMonths: number) => {
    const monthlyRate = annualRate / 12 / 100
    if (monthlyRate === 0) {
      const emi = principal / tenureMonths
      return {
        emi: Number(emi.toFixed(2)),
        totalPayment: Number(principal.toFixed(2)),
        totalInterest: 0,
        principal: Number(principal.toFixed(2)),
      }
    }
    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
      (Math.pow(1 + monthlyRate, tenureMonths) - 1)
    const totalPayment = emi * tenureMonths
    const totalInterest = totalPayment - principal
    return {
      emi: Number(emi.toFixed(2)),
      totalPayment: Number(totalPayment.toFixed(2)),
      totalInterest: Number(totalInterest.toFixed(2)),
      principal: Number(principal.toFixed(2)),
    }
  },

  // Profit/Loss Calculator
  profitLoss: (costPrice: number, sellingPrice: number) => {
    const difference = sellingPrice - costPrice
    const percentage = costPrice !== 0 ? (difference / costPrice) * 100 : 0
    const isProfit = difference >= 0
    return {
      costPrice: Number(costPrice.toFixed(2)),
      sellingPrice: Number(sellingPrice.toFixed(2)),
      amount: Number(Math.abs(difference).toFixed(2)),
      percentage: Number(Math.abs(percentage).toFixed(2)),
      isProfit,
      type: isProfit ? 'Profit' : 'Loss',
    }
  },

  // Markup Calculator
  markup: (cost: number, markupPercent: number) => {
    const markupAmount = (cost * markupPercent) / 100
    const sellingPrice = cost + markupAmount
    return {
      cost: Number(cost.toFixed(2)),
      markupPercent,
      markupAmount: Number(markupAmount.toFixed(2)),
      sellingPrice: Number(sellingPrice.toFixed(2)),
    }
  },

  // Margin Calculator
  margin: (cost: number, sellingPrice: number) => {
    const profit = sellingPrice - cost
    const marginPercent = sellingPrice !== 0 ? (profit / sellingPrice) * 100 : 0
    const markupPercent = cost !== 0 ? (profit / cost) * 100 : 0
    return {
      cost: Number(cost.toFixed(2)),
      sellingPrice: Number(sellingPrice.toFixed(2)),
      profit: Number(profit.toFixed(2)),
      marginPercent: Number(marginPercent.toFixed(2)),
      markupPercent: Number(markupPercent.toFixed(2)),
    }
  },

  // Currency Converter
  convertCurrency: (amount: number, rate: number) => {
    const converted = amount * rate
    return {
      original: Number(amount.toFixed(2)),
      rate,
      converted: Number(converted.toFixed(2)),
    }
  },

  // Salary Calculator
  salary: (amount: number, period: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly') => {
    const hourlyRate = {
      hourly: amount,
      daily: amount / 8,
      weekly: amount / 40,
      monthly: amount / 173.33,
      yearly: amount / 2080,
    }[period]

    return {
      hourly: Number(hourlyRate.toFixed(2)),
      daily: Number((hourlyRate * 8).toFixed(2)),
      weekly: Number((hourlyRate * 40).toFixed(2)),
      biweekly: Number((hourlyRate * 80).toFixed(2)),
      monthly: Number((hourlyRate * 173.33).toFixed(2)),
      yearly: Number((hourlyRate * 2080).toFixed(2)),
    }
  },
}

// ============================================
// DATE & TIME CALCULATIONS
// ============================================

export const dateCalc = {
  // Age Calculator
  age: (birthDate: Date, targetDate: Date = new Date()) => {
    let years = targetDate.getFullYear() - birthDate.getFullYear()
    let months = targetDate.getMonth() - birthDate.getMonth()
    let days = targetDate.getDate() - birthDate.getDate()

    if (days < 0) {
      months--
      const prevMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 0)
      days += prevMonth.getDate()
    }

    if (months < 0) {
      years--
      months += 12
    }

    const diff = targetDate.getTime() - birthDate.getTime()
    const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24))
    const totalHours = Math.floor(diff / (1000 * 60 * 60))
    const totalMinutes = Math.floor(diff / (1000 * 60))
    const totalSeconds = Math.floor(diff / 1000)
    const totalWeeks = Math.floor(totalDays / 7)
    const totalMonths = years * 12 + months

    // Next birthday
    const nextBirthday = new Date(
      targetDate.getFullYear(),
      birthDate.getMonth(),
      birthDate.getDate()
    )
    if (nextBirthday <= targetDate) {
      nextBirthday.setFullYear(targetDate.getFullYear() + 1)
    }
    const daysUntilBirthday = Math.ceil(
      (nextBirthday.getTime() - targetDate.getTime()) / (1000 * 60 * 60 * 24)
    )

    return {
      years,
      months,
      days,
      totalMonths,
      totalWeeks,
      totalDays,
      totalHours,
      totalMinutes,
      totalSeconds,
      nextBirthday,
      daysUntilBirthday,
    }
  },

  // Date Difference
  difference: (date1: Date, date2: Date) => {
    const start = date1 < date2 ? date1 : date2
    const end = date1 < date2 ? date2 : date1

    let years = end.getFullYear() - start.getFullYear()
    let months = end.getMonth() - start.getMonth()
    let days = end.getDate() - start.getDate()

    if (days < 0) {
      months--
      const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0)
      days += prevMonth.getDate()
    }

    if (months < 0) {
      years--
      months += 12
    }

    const diffMs = Math.abs(end.getTime() - start.getTime())
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    const totalWeeks = Math.floor(totalDays / 7)
    const totalHours = Math.floor(diffMs / (1000 * 60 * 60))
    const totalMinutes = Math.floor(diffMs / (1000 * 60))
    const totalSeconds = Math.floor(diffMs / 1000)
    const businessDays = dateCalc.businessDays(start, end)

    return {
      years,
      months,
      days,
      totalWeeks,
      totalDays,
      totalHours,
      totalMinutes,
      totalSeconds,
      businessDays,
    }
  },

  // Business Days Calculator
  businessDays: (startDate: Date, endDate: Date) => {
    let count = 0
    const current = new Date(startDate)
    while (current <= endDate) {
      const day = current.getDay()
      if (day !== 0 && day !== 6) count++
      current.setDate(current.getDate() + 1)
    }
    return count
  },

  // Add/Subtract Days
  addDays: (date: Date, days: number) => {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  },

  // Add/Subtract Months
  addMonths: (date: Date, months: number) => {
    const result = new Date(date)
    result.setMonth(result.getMonth() + months)
    return result
  },

  // Add/Subtract Years
  addYears: (date: Date, years: number) => {
    const result = new Date(date)
    result.setFullYear(result.getFullYear() + years)
    return result
  },

  // Time Until
  timeUntil: (targetDate: Date) => {
    const now = new Date()
    const diff = targetDate.getTime() - now.getTime()
    const isPast = diff < 0
    const absDiff = Math.abs(diff)

    return {
      isPast,
      days: Math.floor(absDiff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((absDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((absDiff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((absDiff % (1000 * 60)) / 1000),
    }
  },

  // Experience Calculator
  experience: (startDate: Date, endDate: Date = new Date()) => {
    const result = dateCalc.difference(startDate, endDate)
    const resumeYears = (result.totalDays / 365).toFixed(1)
    const workingDays = Math.floor(result.totalDays * (5 / 7)) // Approx excluding weekends
    
    return {
      ...result,
      resumeYears,
      workingDays,
      workingHours: workingDays * 8,
    }
  },

  // Week Number
  weekNumber: (date: Date) => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    const dayNum = d.getUTCDay() || 7
    d.setUTCDate(d.getUTCDate() + 4 - dayNum)
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
  },

  // Day of Year
  dayOfYear: (date: Date) => {
    const start = new Date(date.getFullYear(), 0, 0)
    const diff = date.getTime() - start.getTime()
    return Math.floor(diff / (1000 * 60 * 60 * 24))
  },

  // Is Leap Year
  isLeapYear: (year: number) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
  },

  // Days in Month
  daysInMonth: (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  },
}

// ============================================
// MATH CALCULATIONS
// ============================================

export const mathCalc = {
  // Basic Operations
  add: (...nums: number[]) => nums.reduce((a, b) => a + b, 0),
  subtract: (a: number, b: number) => a - b,
  multiply: (...nums: number[]) => nums.reduce((a, b) => a * b, 1),
  divide: (a: number, b: number) => (b !== 0 ? a / b : 0),

  // Powers and Roots
  power: (base: number, exponent: number) => Math.pow(base, exponent),
  sqrt: (n: number) => Math.sqrt(n),
  cbrt: (n: number) => Math.cbrt(n),
  nthRoot: (n: number, root: number) => Math.pow(n, 1 / root),

  // Factorial
  factorial: (n: number): number => {
    if (n < 0) return 0
    if (n <= 1) return 1
    let result = 1
    for (let i = 2; i <= n; i++) result *= i
    return result
  },

  // Greatest Common Divisor
  gcd: (a: number, b: number): number => {
    a = Math.abs(a)
    b = Math.abs(b)
    while (b) {
      const t = b
      b = a % b
      a = t
    }
    return a
  },

  // Least Common Multiple
  lcm: (a: number, b: number): number => {
    return Math.abs(a * b) / mathCalc.gcd(a, b)
  },

  // Prime Check
  isPrime: (n: number): boolean => {
    if (n < 2) return false
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return false
    }
    return true
  },

  // Prime Factors
  primeFactors: (n: number): number[] => {
    const factors: number[] = []
    let d = 2
    while (n > 1) {
      while (n % d === 0) {
        factors.push(d)
        n /= d
      }
      d++
    }
    return factors
  },

  // Fibonacci
  fibonacci: (n: number): number[] => {
    const fib = [0, 1]
    for (let i = 2; i < n; i++) {
      fib.push(fib[i - 1] + fib[i - 2])
    }
    return fib.slice(0, n)
  },

  // Average/Mean
  mean: (nums: number[]) => {
    if (nums.length === 0) return 0
    return nums.reduce((a, b) => a + b, 0) / nums.length
  },

  // Median
  median: (nums: number[]) => {
    if (nums.length === 0) return 0
    const sorted = [...nums].sort((a, b) => a - b)
    const mid = Math.floor(sorted.length / 2)
    return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2
  },

  // Mode
  mode: (nums: number[]): number[] => {
    const freq = new Map<number, number>()
    nums.forEach(n => freq.set(n, (freq.get(n) || 0) + 1))
    const maxFreq = Math.max(...freq.values())
    return [...freq.entries()].filter(([, f]) => f === maxFreq).map(([n]) => n)
  },

  // Standard Deviation
  standardDeviation: (nums: number[]) => {
    const avg = mathCalc.mean(nums)
    const squareDiffs = nums.map(n => Math.pow(n - avg, 2))
    return Math.sqrt(mathCalc.mean(squareDiffs))
  },

  // Variance
  variance: (nums: number[]) => {
    const avg = mathCalc.mean(nums)
    const squareDiffs = nums.map(n => Math.pow(n - avg, 2))
    return mathCalc.mean(squareDiffs)
  },

  // Range
  range: (nums: number[]) => {
    if (nums.length === 0) return 0
    return Math.max(...nums) - Math.min(...nums)
  },

  // Ratio Simplifier
  simplifyRatio: (a: number, b: number) => {
    const gcd = mathCalc.gcd(a, b)
    return { a: a / gcd, b: b / gcd }
  },

  // Percentage to Fraction
  percentToFraction: (percent: number) => {
    const denominator = 100
    const gcd = mathCalc.gcd(percent, denominator)
    return { numerator: percent / gcd, denominator: denominator / gcd }
  },

  // Fraction to Decimal
  fractionToDecimal: (numerator: number, denominator: number) => {
    return denominator !== 0 ? numerator / denominator : 0
  },

  // Decimal to Fraction
  decimalToFraction: (decimal: number) => {
    const precision = 1000000
    const gcd = mathCalc.gcd(Math.round(decimal * precision), precision)
    return {
      numerator: Math.round(decimal * precision) / gcd,
      denominator: precision / gcd,
    }
  },

  // Quadratic Formula
  quadratic: (a: number, b: number, c: number) => {
    const discriminant = b * b - 4 * a * c
    if (discriminant < 0) {
      return { solutions: [], discriminant, type: 'no real solutions' }
    }
    if (discriminant === 0) {
      return { solutions: [-b / (2 * a)], discriminant, type: 'one solution' }
    }
    return {
      solutions: [
        (-b + Math.sqrt(discriminant)) / (2 * a),
        (-b - Math.sqrt(discriminant)) / (2 * a),
      ],
      discriminant,
      type: 'two solutions',
    }
  },

  // Scientific Notation
  toScientific: (n: number) => {
    const exp = Math.floor(Math.log10(Math.abs(n)))
    const mantissa = n / Math.pow(10, exp)
    return { mantissa, exponent: exp, notation: `${mantissa.toFixed(4)} × 10^${exp}` }
  },

  // Binary, Hex, Octal conversions
  toBinary: (n: number) => n.toString(2),
  toHex: (n: number) => n.toString(16).toUpperCase(),
  toOctal: (n: number) => n.toString(8),
  fromBinary: (s: string) => parseInt(s, 2),
  fromHex: (s: string) => parseInt(s, 16),
  fromOctal: (s: string) => parseInt(s, 8),
}

// ============================================
// UNIT CONVERSIONS
// ============================================

export const unitConvert = {
  // Length
  length: {
    metersToFeet: (m: number) => m * 3.28084,
    feetToMeters: (ft: number) => ft / 3.28084,
    kmToMiles: (km: number) => km * 0.621371,
    milesToKm: (mi: number) => mi / 0.621371,
    inchesToCm: (inch: number) => inch * 2.54,
    cmToInches: (cm: number) => cm / 2.54,
    yardsToMeters: (yd: number) => yd * 0.9144,
    metersToYards: (m: number) => m / 0.9144,
  },

  // Weight
  weight: {
    kgToLbs: (kg: number) => kg * 2.20462,
    lbsToKg: (lbs: number) => lbs / 2.20462,
    gramsToOunces: (g: number) => g * 0.035274,
    ouncesToGrams: (oz: number) => oz / 0.035274,
    tonToKg: (ton: number) => ton * 1000,
    kgToTon: (kg: number) => kg / 1000,
  },

  // Temperature
  temperature: {
    celsiusToFahrenheit: (c: number) => (c * 9) / 5 + 32,
    fahrenheitToCelsius: (f: number) => ((f - 32) * 5) / 9,
    celsiusToKelvin: (c: number) => c + 273.15,
    kelvinToCelsius: (k: number) => k - 273.15,
  },

  // Area
  area: {
    sqMeterToSqFeet: (sqm: number) => sqm * 10.7639,
    sqFeetToSqMeter: (sqft: number) => sqft / 10.7639,
    acresToSqMeters: (ac: number) => ac * 4046.86,
    sqMetersToAcres: (sqm: number) => sqm / 4046.86,
    hectaresToAcres: (ha: number) => ha * 2.47105,
    acresToHectares: (ac: number) => ac / 2.47105,
  },

  // Volume
  volume: {
    litersToGallons: (l: number) => l * 0.264172,
    gallonsToLiters: (gal: number) => gal / 0.264172,
    mlToFlOz: (ml: number) => ml * 0.033814,
    flOzToMl: (floz: number) => floz / 0.033814,
    cubicMeterToLiter: (m3: number) => m3 * 1000,
    literToCubicMeter: (l: number) => l / 1000,
  },

  // Speed
  speed: {
    kphToMph: (kph: number) => kph * 0.621371,
    mphToKph: (mph: number) => mph / 0.621371,
    mpsToKph: (mps: number) => mps * 3.6,
    kphToMps: (kph: number) => kph / 3.6,
    knotsToKph: (knots: number) => knots * 1.852,
    kphToKnots: (kph: number) => kph / 1.852,
  },

  // Data
  data: {
    bytesToKB: (bytes: number) => bytes / 1024,
    kbToMB: (kb: number) => kb / 1024,
    mbToGB: (mb: number) => mb / 1024,
    gbToTB: (gb: number) => gb / 1024,
    bitsToBytes: (bits: number) => bits / 8,
    bytesToBits: (bytes: number) => bytes * 8,
  },

  // Time
  time: {
    hoursToMinutes: (h: number) => h * 60,
    minutesToHours: (m: number) => m / 60,
    daysToHours: (d: number) => d * 24,
    hoursToDays: (h: number) => h / 24,
    weeksTodays: (w: number) => w * 7,
    daysToWeeks: (d: number) => d / 7,
  },
}

// ============================================
// HEALTH CALCULATIONS
// ============================================

export const healthCalc = {
  // BMI Calculator
  bmi: (weight: number, height: number, unit: 'metric' | 'imperial' = 'metric') => {
    let bmiValue: number
    if (unit === 'metric') {
      // weight in kg, height in cm
      bmiValue = weight / Math.pow(height / 100, 2)
    } else {
      // weight in lbs, height in inches
      bmiValue = (weight / Math.pow(height, 2)) * 703
    }

    let category: string
    if (bmiValue < 18.5) category = 'Underweight'
    else if (bmiValue < 25) category = 'Normal weight'
    else if (bmiValue < 30) category = 'Overweight'
    else category = 'Obese'

    return {
      bmi: Number(bmiValue.toFixed(1)),
      category,
      idealWeightRange: {
        min: Number((18.5 * Math.pow(height / 100, 2)).toFixed(1)),
        max: Number((24.9 * Math.pow(height / 100, 2)).toFixed(1)),
      },
    }
  },

  // BMR Calculator (Basal Metabolic Rate)
  bmr: (weight: number, height: number, age: number, gender: 'male' | 'female') => {
    // Mifflin-St Jeor Equation
    let bmr: number
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161
    }

    return {
      bmr: Math.round(bmr),
      sedentary: Math.round(bmr * 1.2),
      light: Math.round(bmr * 1.375),
      moderate: Math.round(bmr * 1.55),
      active: Math.round(bmr * 1.725),
      veryActive: Math.round(bmr * 1.9),
    }
  },

  // Ideal Weight Calculator
  idealWeight: (height: number, gender: 'male' | 'female') => {
    // Height in cm
    const heightInches = height / 2.54
    let ideal: number
    if (gender === 'male') {
      ideal = 50 + 2.3 * (heightInches - 60)
    } else {
      ideal = 45.5 + 2.3 * (heightInches - 60)
    }

    return {
      robinson: Number(ideal.toFixed(1)),
      miller: Number((gender === 'male' ? 56.2 : 53.1 + 1.41 * (heightInches - 60)).toFixed(1)),
      devine: Number((gender === 'male' ? 50 : 45.5 + 2.3 * (heightInches - 60)).toFixed(1)),
    }
  },

  // Body Fat Percentage (US Navy Method)
  bodyFat: (
    waist: number,
    neck: number,
    height: number,
    hip: number,
    gender: 'male' | 'female'
  ) => {
    let bf: number
    if (gender === 'male') {
      bf = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450
    } else {
      bf = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.221 * Math.log10(height)) - 450
    }

    let category: string
    if (gender === 'male') {
      if (bf < 6) category = 'Essential fat'
      else if (bf < 14) category = 'Athletes'
      else if (bf < 18) category = 'Fitness'
      else if (bf < 25) category = 'Average'
      else category = 'Obese'
    } else {
      if (bf < 14) category = 'Essential fat'
      else if (bf < 21) category = 'Athletes'
      else if (bf < 25) category = 'Fitness'
      else if (bf < 32) category = 'Average'
      else category = 'Obese'
    }

    return {
      bodyFatPercent: Number(bf.toFixed(1)),
      category,
    }
  },

  // Calories Burned
  caloriesBurned: (met: number, weight: number, minutes: number) => {
    const calories = (met * 3.5 * weight * minutes) / 200
    return Math.round(calories)
  },

  // Water Intake
  waterIntake: (weight: number, activityLevel: 'low' | 'moderate' | 'high' = 'moderate') => {
    const multipliers = { low: 30, moderate: 35, high: 40 }
    const ml = weight * multipliers[activityLevel]
    return {
      ml: Math.round(ml),
      liters: Number((ml / 1000).toFixed(1)),
      glasses: Math.ceil(ml / 250),
    }
  },
}

// ============================================
// GEOMETRY CALCULATIONS
// ============================================

export const geometryCalc = {
  // Circle
  circle: {
    area: (radius: number) => Math.PI * radius * radius,
    circumference: (radius: number) => 2 * Math.PI * radius,
    diameter: (radius: number) => 2 * radius,
  },

  // Rectangle
  rectangle: {
    area: (length: number, width: number) => length * width,
    perimeter: (length: number, width: number) => 2 * (length + width),
    diagonal: (length: number, width: number) => Math.sqrt(length * length + width * width),
  },

  // Triangle
  triangle: {
    area: (base: number, height: number) => (base * height) / 2,
    areaHeron: (a: number, b: number, c: number) => {
      const s = (a + b + c) / 2
      return Math.sqrt(s * (s - a) * (s - b) * (s - c))
    },
    perimeter: (a: number, b: number, c: number) => a + b + c,
    hypotenuse: (a: number, b: number) => Math.sqrt(a * a + b * b),
  },

  // Sphere
  sphere: {
    volume: (radius: number) => (4 / 3) * Math.PI * Math.pow(radius, 3),
    surfaceArea: (radius: number) => 4 * Math.PI * radius * radius,
  },

  // Cylinder
  cylinder: {
    volume: (radius: number, height: number) => Math.PI * radius * radius * height,
    surfaceArea: (radius: number, height: number) =>
      2 * Math.PI * radius * (radius + height),
    lateralArea: (radius: number, height: number) => 2 * Math.PI * radius * height,
  },

  // Cone
  cone: {
    volume: (radius: number, height: number) => (Math.PI * radius * radius * height) / 3,
    surfaceArea: (radius: number, height: number) => {
      const slant = Math.sqrt(radius * radius + height * height)
      return Math.PI * radius * (radius + slant)
    },
    slantHeight: (radius: number, height: number) => Math.sqrt(radius * radius + height * height),
  },

  // Cube
  cube: {
    volume: (side: number) => Math.pow(side, 3),
    surfaceArea: (side: number) => 6 * side * side,
    diagonal: (side: number) => side * Math.sqrt(3),
  },

  // Pythagorean
  pythagorean: {
    hypotenuse: (a: number, b: number) => Math.sqrt(a * a + b * b),
    leg: (hyp: number, leg: number) => Math.sqrt(hyp * hyp - leg * leg),
  },
}

// Export all calculators
export const calculatorEngine = {
  percentage: percentageCalc,
  financial: financialCalc,
  date: dateCalc,
  math: mathCalc,
  unit: unitConvert,
  health: healthCalc,
  geometry: geometryCalc,
}

export default calculatorEngine

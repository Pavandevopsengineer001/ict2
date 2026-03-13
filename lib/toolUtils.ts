// Developer Tools Utilities

export const developerTools = {
  // JSON Formatter
  formatJson: (input: string): string => {
    try {
      const parsed = JSON.parse(input)
      return JSON.stringify(parsed, null, 2)
    } catch (e) {
      throw new Error('Invalid JSON')
    }
  },

  // JSON Validator
  validateJson: (input: string): { valid: boolean; error?: string } => {
    try {
      JSON.parse(input)
      return { valid: true }
    } catch (e) {
      return { valid: false, error: String(e) }
    }
  },

  // Base64 Encode
  base64Encode: (input: string): string => {
    return Buffer.from(input).toString('base64')
  },

  // Base64 Decode
  base64Decode: (input: string): string => {
    try {
      return Buffer.from(input, 'base64').toString('utf-8')
    } catch (e) {
      throw new Error('Invalid Base64 string')
    }
  },

  // URL Encode
  urlEncode: (input: string): string => {
    return encodeURIComponent(input)
  },

  // URL Decode
  urlDecode: (input: string): string => {
    try {
      return decodeURIComponent(input)
    } catch (e) {
      throw new Error('Invalid URL-encoded string')
    }
  },

  // HTML Encode
  htmlEncode: (input: string): string => {
    const div = document.createElement('div')
    div.textContent = input
    return div.innerHTML
  },

  // HTML Decode
  htmlDecode: (input: string): string => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(input, 'text/html')
    return doc.documentElement.textContent || ''
  },

  // Regex Tester
  testRegex: (pattern: string, flags: string, text: string): { matches: string[]; error?: string } => {
    try {
      const regex = new RegExp(pattern, flags)
      const matches = text.match(regex) || []
      return { matches: matches as string[] }
    } catch (e) {
      return { matches: [], error: String(e) }
    }
  },

  // Timestamp Converter
  timestampToDate: (timestamp: string): string => {
    const ts = parseInt(timestamp)
    if (isNaN(ts)) throw new Error('Invalid timestamp')
    return new Date(ts * 1000).toISOString()
  },

  dateToTimestamp: (dateStr: string): string => {
    const ts = Math.floor(new Date(dateStr).getTime() / 1000)
    if (isNaN(ts)) throw new Error('Invalid date')
    return ts.toString()
  },
}

// Text Tools Utilities

export const textTools = {
  // Word Counter
  countWords: (text: string) => {
    const words = text.trim().split(/\s+/).filter(w => w.length > 0)
    const chars = text.length
    const charsNoSpace = text.replace(/\s/g, '').length
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length
    const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 0).length

    return {
      words: words.length,
      characters: chars,
      charactersNoSpace: charsNoSpace,
      sentences,
      paragraphs,
    }
  },

  // Character Counter
  countCharacters: (text: string) => {
    return {
      total: text.length,
      withoutSpaces: text.replace(/\s/g, '').length,
      spaces: text.split(' ').length - 1,
      lines: text.split('\n').length,
    }
  },

  // Case Converter
  convertCase: (text: string, caseType: 'upper' | 'lower' | 'title' | 'sentence' | 'toggle' | 'capitalize') => {
    switch (caseType) {
      case 'upper':
        return text.toUpperCase()
      case 'lower':
        return text.toLowerCase()
      case 'title':
        return text
          .toLowerCase()
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      case 'sentence':
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
      case 'toggle':
        return text
          .split('')
          .map(char => (char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()))
          .join('')
      case 'capitalize':
        return text
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ')
      default:
        return text
    }
  },

  // Remove Duplicate Lines
  removeDuplicates: (text: string): string => {
    const lines = text.split('\n')
    const unique = [...new Set(lines)]
    return unique.join('\n')
  },

  // Text Diff Checker
  compareTexts: (text1: string, text2: string) => {
    const lines1 = text1.split('\n')
    const lines2 = text2.split('\n')
    const maxLength = Math.max(lines1.length, lines2.length)

    const diff = []
    for (let i = 0; i < maxLength; i++) {
      if (lines1[i] !== lines2[i]) {
        diff.push({
          line: i + 1,
          text1: lines1[i] || '(empty)',
          text2: lines2[i] || '(empty)',
          status: 'different',
        })
      }
    }

    return {
      totalLines: maxLength,
      differences: diff.length,
      details: diff,
    }
  },

  // Text Sorter
  sortText: (text: string, reverse: boolean = false, numeric: boolean = false): string => {
    const lines = text.split('\n')
    lines.sort((a, b) => {
      if (numeric) {
        const numA = parseInt(a) || 0
        const numB = parseInt(b) || 0
        return reverse ? numB - numA : numA - numB
      }
      return reverse ? b.localeCompare(a) : a.localeCompare(b)
    })
    return lines.join('\n')
  },
}

// Image Tools Utilities

export const imageTools = {
  // Image Resizer
  resizeImage: (
    file: File,
    width: number,
    height: number
  ): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement('canvas')
          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext('2d')
          if (!ctx) return reject(new Error('Canvas context error'))
          ctx.drawImage(img, 0, 0, width, height)
          canvas.toBlob(blob => {
            if (blob) resolve(blob)
            else reject(new Error('Canvas to blob failed'))
          }, file.type)
        }
        img.src = e.target?.result as string
      }
      reader.readAsDataURL(file)
    })
  },

  // Image to Base64
  imageToBase64: (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  },

  // Base64 to Image
  base64ToImage: (base64: string): Blob => {
    const arr = base64.split(',')
    const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png'
    const bstr = atob(arr[1])
    const n = bstr.length
    const u8arr = new Uint8Array(n)
    for (let i = 0; i < n; i++) {
      u8arr[i] = bstr.charCodeAt(i)
    }
    return new Blob([u8arr], { type: mime })
  },
}

// Calculator Utilities

export const calculators = {
  // Percentage Calculator
  calculatePercentage: (
    amount: number,
    percent: number
  ): { result: number; percentageOf: number } => {
    return {
      result: (amount * percent) / 100,
      percentageOf: (percent / amount) * 100,
    }
    
  },
  calculatePercentageOf: (amount: number, percent: number): number => {
  return (amount * percent) / 100
},

// X is what percent of Y
calculatePercentOfNumber: (value: number, total: number): number => {
  if (total === 0) return 0
  return (value / total) * 100
},

// Percentage Increase
calculateIncrease: (amount: number, percent: number): number => {
  return amount + (amount * percent) / 100
},

// Percentage Decrease
calculateDecrease: (amount: number, percent: number): number => {
  return amount - (amount * percent) / 100
},

  // Age Calculator
  calculateAgeDetailed: (birthDate: Date) => {
  const now = new Date()

  let years = now.getFullYear() - birthDate.getFullYear()
  let months = now.getMonth() - birthDate.getMonth()
  let days = now.getDate() - birthDate.getDate()

  if (days < 0) {
    months--
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0)
    days += prevMonth.getDate()
  }

  if (months < 0) {
    years--
    months += 12
  }

  const diff = now.getTime() - birthDate.getTime()

  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const totalDays = Math.floor(hours / 24)

  // next birthday
  const nextBirthday = new Date(
    now.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  )

  if (nextBirthday < now) {
    nextBirthday.setFullYear(now.getFullYear() + 1)
  }

  const daysUntilBirthday = Math.ceil(
    (nextBirthday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  )

  return {
    years,
    months,
    days,
    totalDays,
    hours,
    minutes,
    seconds,
    nextBirthday,
    daysUntilBirthday,
  }
},

  // Discount Calculator
calculateDiscount: (
  originalPrice: number,
  discountPercent: number
) => {

  if (originalPrice < 0 || discountPercent < 0) {
    throw new Error('Values cannot be negative')
  }

  const discountAmount = (originalPrice * discountPercent) / 100
  const finalPrice = originalPrice - discountAmount

  return {
    originalPrice,
    discountPercent,
    discountAmount: Number(discountAmount.toFixed(2)),
    finalPrice: Number(finalPrice.toFixed(2)),
    savings: Number(discountAmount.toFixed(2)),
  }
},

  // Date Difference
dateDifference: (date1: Date, date2: Date) => {

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
  const totalHours = Math.floor(diffMs / (1000 * 60 * 60))
  const totalMinutes = Math.floor(diffMs / (1000 * 60))
  const totalSeconds = Math.floor(diffMs / 1000)

  const weeks = Math.floor(totalDays / 7)

  return {
    years,
    months,
    days,
    weeks,
    totalDays,
    totalHours,
    totalMinutes,
    totalSeconds
  }
},
// Experience Calculator
calculateExperience: (startDate: Date, endDate: Date = new Date()) => {

  const start = startDate
  const end = endDate

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

  const diffMs = end.getTime() - start.getTime()

  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const totalWeeks = Math.floor(totalDays / 7)
  const totalMonths = years * 12 + months

  const totalHours = Math.floor(diffMs / (1000 * 60 * 60))

  const resumeYears = (totalMonths / 12).toFixed(1)

  const workingDays = Math.floor(totalDays * 0.714) // approx excluding weekends

  return {
    years,
    months,
    days,
    totalMonths,
    totalWeeks,
    totalDays,
    totalHours,
    resumeYears,
    workingDays
  }
}
}

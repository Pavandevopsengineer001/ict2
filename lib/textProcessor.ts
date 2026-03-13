/**
 * Text Processor - Comprehensive text manipulation utilities
 * Supports: Counting, Case Conversion, Formatting, Analysis, Encoding
 */

// ============================================
// TEXT COUNTING & STATISTICS
// ============================================

export const textStats = {
  // Word Counter
  countWords: (text: string) => {
    const words = text.trim().split(/\s+/).filter(w => w.length > 0)
    return words.length
  },

  // Character Counter
  countCharacters: (text: string, includeSpaces: boolean = true) => {
    return includeSpaces ? text.length : text.replace(/\s/g, '').length
  },

  // Sentence Counter
  countSentences: (text: string) => {
    return text.split(/[.!?]+/).filter(s => s.trim().length > 0).length
  },

  // Paragraph Counter
  countParagraphs: (text: string) => {
    return text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length
  },

  // Line Counter
  countLines: (text: string) => {
    return text.split('\n').length
  },

  // Full Text Statistics
  fullStats: (text: string) => {
    const words = text.trim().split(/\s+/).filter(w => w.length > 0)
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0)
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0)
    const lines = text.split('\n')

    // Word frequency
    const wordFreq = new Map<string, number>()
    words.forEach(word => {
      const lower = word.toLowerCase().replace(/[^\w]/g, '')
      if (lower) wordFreq.set(lower, (wordFreq.get(lower) || 0) + 1)
    })

    // Most common words
    const sortedWords = [...wordFreq.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)

    // Average word length
    const avgWordLength = words.length
      ? words.reduce((sum, w) => sum + w.length, 0) / words.length
      : 0

    // Reading time (avg 200 words/min)
    const readingTimeMin = Math.ceil(words.length / 200)
    const speakingTimeMin = Math.ceil(words.length / 150)

    // Unique words
    const uniqueWords = new Set(words.map(w => w.toLowerCase().replace(/[^\w]/g, '')))

    return {
      characters: text.length,
      charactersNoSpaces: text.replace(/\s/g, '').length,
      words: words.length,
      uniqueWords: uniqueWords.size,
      sentences: sentences.length,
      paragraphs: paragraphs.length,
      lines: lines.length,
      avgWordLength: Number(avgWordLength.toFixed(1)),
      readingTimeMin,
      speakingTimeMin,
      mostCommonWords: sortedWords,
      longestWord: words.reduce((a, b) => (a.length > b.length ? a : b), ''),
    }
  },

  // Word Frequency
  wordFrequency: (text: string) => {
    const words = text.toLowerCase().split(/\s+/).filter(w => w.length > 0)
    const freq = new Map<string, number>()
    words.forEach(word => {
      const clean = word.replace(/[^\w]/g, '')
      if (clean) freq.set(clean, (freq.get(clean) || 0) + 1)
    })
    return [...freq.entries()].sort((a, b) => b[1] - a[1])
  },

  // Reading Time
  readingTime: (text: string, wordsPerMinute: number = 200) => {
    const words = text.trim().split(/\s+/).filter(w => w.length > 0).length
    const minutes = words / wordsPerMinute
    return {
      words,
      minutes: Number(minutes.toFixed(1)),
      seconds: Math.round(minutes * 60),
      formatted: minutes < 1 ? 'Less than 1 min' : `${Math.ceil(minutes)} min read`,
    }
  },
}

// ============================================
// CASE CONVERSION
// ============================================

export const caseConvert = {
  // Uppercase
  toUpperCase: (text: string) => text.toUpperCase(),

  // Lowercase
  toLowerCase: (text: string) => text.toLowerCase(),

  // Title Case
  toTitleCase: (text: string) => {
    return text.toLowerCase().replace(/\b\w/g, char => char.toUpperCase())
  },

  // Sentence Case
  toSentenceCase: (text: string) => {
    return text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, char => char.toUpperCase())
  },

  // Toggle Case
  toToggleCase: (text: string) => {
    return text.split('').map(char =>
      char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
    ).join('')
  },

  // camelCase
  toCamelCase: (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
  },

  // PascalCase
  toPascalCase: (text: string) => {
    const camel = caseConvert.toCamelCase(text)
    return camel.charAt(0).toUpperCase() + camel.slice(1)
  },

  // snake_case
  toSnakeCase: (text: string) => {
    return text
      .toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[^a-zA-Z0-9_]/g, '')
  },

  // kebab-case
  toKebabCase: (text: string) => {
    return text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-zA-Z0-9-]/g, '')
  },

  // CONSTANT_CASE
  toConstantCase: (text: string) => {
    return text
      .toUpperCase()
      .replace(/\s+/g, '_')
      .replace(/[^A-Z0-9_]/g, '')
  },

  // dot.case
  toDotCase: (text: string) => {
    return text
      .toLowerCase()
      .replace(/\s+/g, '.')
      .replace(/[^a-zA-Z0-9.]/g, '')
  },

  // path/case
  toPathCase: (text: string) => {
    return text
      .toLowerCase()
      .replace(/\s+/g, '/')
      .replace(/[^a-zA-Z0-9/]/g, '')
  },

  // Alternating Case
  toAlternatingCase: (text: string) => {
    return text.split('').map((char, i) =>
      i % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
    ).join('')
  },

  // Inverse Case
  toInverseCase: (text: string) => {
    return text.split('').map((char, i) =>
      i % 2 === 0 ? char.toUpperCase() : char.toLowerCase()
    ).join('')
  },
}

// ============================================
// TEXT MANIPULATION
// ============================================

export const textManipulate = {
  // Remove Duplicates
  removeDuplicateLines: (text: string, caseSensitive: boolean = true) => {
    const lines = text.split('\n')
    if (caseSensitive) {
      return [...new Set(lines)].join('\n')
    }
    const seen = new Set<string>()
    return lines.filter(line => {
      const lower = line.toLowerCase()
      if (seen.has(lower)) return false
      seen.add(lower)
      return true
    }).join('\n')
  },

  // Remove Empty Lines
  removeEmptyLines: (text: string) => {
    return text.split('\n').filter(line => line.trim().length > 0).join('\n')
  },

  // Remove Extra Spaces
  removeExtraSpaces: (text: string) => {
    return text.replace(/\s+/g, ' ').trim()
  },

  // Sort Lines
  sortLines: (text: string, options: {
    reverse?: boolean
    numeric?: boolean
    caseSensitive?: boolean
    removeDuplicates?: boolean
  } = {}) => {
    let lines = text.split('\n')
    
    if (options.removeDuplicates) {
      lines = [...new Set(lines)]
    }

    lines.sort((a, b) => {
      let valA = options.caseSensitive ? a : a.toLowerCase()
      let valB = options.caseSensitive ? b : b.toLowerCase()

      if (options.numeric) {
        const numA = parseFloat(valA) || 0
        const numB = parseFloat(valB) || 0
        return options.reverse ? numB - numA : numA - numB
      }

      const result = valA.localeCompare(valB)
      return options.reverse ? -result : result
    })

    return lines.join('\n')
  },

  // Reverse Lines
  reverseLines: (text: string) => {
    return text.split('\n').reverse().join('\n')
  },

  // Reverse Text
  reverseText: (text: string) => {
    return text.split('').reverse().join('')
  },

  // Reverse Words
  reverseWords: (text: string) => {
    return text.split(' ').reverse().join(' ')
  },

  // Shuffle Lines
  shuffleLines: (text: string) => {
    const lines = text.split('\n')
    for (let i = lines.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [lines[i], lines[j]] = [lines[j], lines[i]]
    }
    return lines.join('\n')
  },

  // Add Line Numbers
  addLineNumbers: (text: string, startFrom: number = 1, separator: string = '. ') => {
    return text.split('\n').map((line, i) => `${startFrom + i}${separator}${line}`).join('\n')
  },

  // Remove Line Numbers
  removeLineNumbers: (text: string) => {
    return text.split('\n').map(line => line.replace(/^\d+\.\s*/, '')).join('\n')
  },

  // Trim Lines
  trimLines: (text: string) => {
    return text.split('\n').map(line => line.trim()).join('\n')
  },

  // Prefix Lines
  prefixLines: (text: string, prefix: string) => {
    return text.split('\n').map(line => prefix + line).join('\n')
  },

  // Suffix Lines
  suffixLines: (text: string, suffix: string) => {
    return text.split('\n').map(line => line + suffix).join('\n')
  },

  // Wrap Lines
  wrapLines: (text: string, prefix: string, suffix: string) => {
    return text.split('\n').map(line => prefix + line + suffix).join('\n')
  },

  // Join Lines
  joinLines: (text: string, separator: string = ' ') => {
    return text.split('\n').join(separator)
  },

  // Split by Character
  splitByChar: (text: string, char: string) => {
    return text.split(char).join('\n')
  },

  // Extract Emails
  extractEmails: (text: string) => {
    const regex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
    return text.match(regex) || []
  },

  // Extract URLs
  extractUrls: (text: string) => {
    const regex = /https?:\/\/[^\s<>"{}|\\^`[\]]+/g
    return text.match(regex) || []
  },

  // Extract Numbers
  extractNumbers: (text: string) => {
    const regex = /-?\d+\.?\d*/g
    return (text.match(regex) || []).map(Number)
  },

  // Extract Quotes
  extractQuotes: (text: string) => {
    const regex = /["']([^"']+)["']/g
    const matches = []
    let match
    while ((match = regex.exec(text)) !== null) {
      matches.push(match[1])
    }
    return matches
  },

  // Remove HTML Tags
  removeHtmlTags: (text: string) => {
    return text.replace(/<[^>]*>/g, '')
  },

  // Text to Slug
  toSlug: (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
  },

  // Truncate
  truncate: (text: string, maxLength: number, suffix: string = '...') => {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength - suffix.length) + suffix
  },

  // Pad Left
  padLeft: (text: string, length: number, char: string = ' ') => {
    return text.padStart(length, char)
  },

  // Pad Right
  padRight: (text: string, length: number, char: string = ' ') => {
    return text.padEnd(length, char)
  },
}

// ============================================
// TEXT COMPARISON & ANALYSIS
// ============================================

export const textAnalyze = {
  // Diff Checker
  diff: (text1: string, text2: string) => {
    const lines1 = text1.split('\n')
    const lines2 = text2.split('\n')
    const maxLength = Math.max(lines1.length, lines2.length)
    const differences: Array<{
      line: number
      text1: string
      text2: string
      status: 'added' | 'removed' | 'modified'
    }> = []

    for (let i = 0; i < maxLength; i++) {
      const l1 = lines1[i]
      const l2 = lines2[i]

      if (l1 !== l2) {
        let status: 'added' | 'removed' | 'modified'
        if (l1 === undefined) status = 'added'
        else if (l2 === undefined) status = 'removed'
        else status = 'modified'

        differences.push({
          line: i + 1,
          text1: l1 || '',
          text2: l2 || '',
          status,
        })
      }
    }

    return {
      totalLines1: lines1.length,
      totalLines2: lines2.length,
      differences: differences.length,
      added: differences.filter(d => d.status === 'added').length,
      removed: differences.filter(d => d.status === 'removed').length,
      modified: differences.filter(d => d.status === 'modified').length,
      details: differences,
      similarity: ((maxLength - differences.length) / maxLength) * 100,
    }
  },

  // Palindrome Check
  isPalindrome: (text: string) => {
    const clean = text.toLowerCase().replace(/[^a-z0-9]/g, '')
    const reversed = clean.split('').reverse().join('')
    return {
      isPalindrome: clean === reversed,
      original: text,
      cleaned: clean,
      reversed,
    }
  },

  // Anagram Check
  isAnagram: (text1: string, text2: string) => {
    const clean1 = text1.toLowerCase().replace(/[^a-z]/g, '').split('').sort().join('')
    const clean2 = text2.toLowerCase().replace(/[^a-z]/g, '').split('').sort().join('')
    return {
      isAnagram: clean1 === clean2,
      text1: text1,
      text2: text2,
      sorted1: clean1,
      sorted2: clean2,
    }
  },

  // Find & Replace
  findReplace: (text: string, find: string, replace: string, options: {
    caseSensitive?: boolean
    wholeWord?: boolean
    useRegex?: boolean
  } = {}) => {
    let regex: RegExp
    let flags = 'g'
    if (!options.caseSensitive) flags += 'i'

    if (options.useRegex) {
      try {
        regex = new RegExp(find, flags)
      } catch {
        return { result: text, count: 0, error: 'Invalid regex' }
      }
    } else {
      const escaped = find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const pattern = options.wholeWord ? `\\b${escaped}\\b` : escaped
      regex = new RegExp(pattern, flags)
    }

    let count = 0
    const result = text.replace(regex, () => {
      count++
      return replace
    })

    return { result, count }
  },

  // Password Strength
  passwordStrength: (password: string) => {
    let score = 0
    const checks = {
      length: password.length >= 8,
      longLength: password.length >= 12,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      numbers: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      noCommon: !['password', '123456', 'qwerty'].some(c => 
        password.toLowerCase().includes(c)
      ),
    }

    if (checks.length) score += 1
    if (checks.longLength) score += 1
    if (checks.lowercase) score += 1
    if (checks.uppercase) score += 1
    if (checks.numbers) score += 1
    if (checks.special) score += 2
    if (checks.noCommon) score += 1

    let strength: 'weak' | 'fair' | 'good' | 'strong'
    if (score <= 2) strength = 'weak'
    else if (score <= 4) strength = 'fair'
    else if (score <= 6) strength = 'good'
    else strength = 'strong'

    return {
      score,
      maxScore: 8,
      strength,
      checks,
      suggestions: [
        !checks.length && 'Use at least 8 characters',
        !checks.uppercase && 'Add uppercase letters',
        !checks.lowercase && 'Add lowercase letters',
        !checks.numbers && 'Add numbers',
        !checks.special && 'Add special characters',
        !checks.noCommon && 'Avoid common passwords',
      ].filter(Boolean) as string[],
    }
  },

  // Levenshtein Distance
  levenshteinDistance: (str1: string, str2: string) => {
    const m = str1.length
    const n = str2.length
    const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0))

    for (let i = 0; i <= m; i++) dp[i][0] = i
    for (let j = 0; j <= n; j++) dp[0][j] = j

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (str1[i - 1] === str2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1]
        } else {
          dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
        }
      }
    }

    const distance = dp[m][n]
    const maxLen = Math.max(m, n)
    const similarity = maxLen > 0 ? ((maxLen - distance) / maxLen) * 100 : 100

    return { distance, similarity: Number(similarity.toFixed(1)) }
  },
}

// ============================================
// ENCODING & DECODING
// ============================================

export const textEncode = {
  // Base64 Encode (browser-safe)
  base64Encode: (text: string) => {
    try {
      return btoa(unescape(encodeURIComponent(text)))
    } catch {
      return ''
    }
  },

  // Base64 Decode (browser-safe)
  base64Decode: (text: string) => {
    try {
      return decodeURIComponent(escape(atob(text)))
    } catch {
      return ''
    }
  },

  // URL Encode
  urlEncode: (text: string) => {
    return encodeURIComponent(text)
  },

  // URL Decode
  urlDecode: (text: string) => {
    try {
      return decodeURIComponent(text)
    } catch {
      return text
    }
  },

  // HTML Encode
  htmlEncode: (text: string) => {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
  },

  // HTML Decode
  htmlDecode: (text: string) => {
    return text
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
  },

  // Unicode Escape
  unicodeEscape: (text: string) => {
    return text.split('').map(char => {
      const code = char.charCodeAt(0)
      return code > 127 ? '\\u' + code.toString(16).padStart(4, '0') : char
    }).join('')
  },

  // Unicode Unescape
  unicodeUnescape: (text: string) => {
    return text.replace(/\\u([0-9a-fA-F]{4})/g, (_, code) =>
      String.fromCharCode(parseInt(code, 16))
    )
  },

  // ROT13
  rot13: (text: string) => {
    return text.replace(/[a-zA-Z]/g, char => {
      const base = char <= 'Z' ? 65 : 97
      return String.fromCharCode(((char.charCodeAt(0) - base + 13) % 26) + base)
    })
  },

  // Binary
  textToBinary: (text: string) => {
    return text.split('').map(char =>
      char.charCodeAt(0).toString(2).padStart(8, '0')
    ).join(' ')
  },

  binaryToText: (binary: string) => {
    return binary.split(' ').map(bin =>
      String.fromCharCode(parseInt(bin, 2))
    ).join('')
  },

  // Hex
  textToHex: (text: string) => {
    return text.split('').map(char =>
      char.charCodeAt(0).toString(16).padStart(2, '0')
    ).join(' ')
  },

  hexToText: (hex: string) => {
    return hex.split(' ').map(h =>
      String.fromCharCode(parseInt(h, 16))
    ).join('')
  },

  // Morse Code
  textToMorse: (text: string) => {
    const morseCode: { [key: string]: string } = {
      'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
      'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
      'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
      'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
      'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
      '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
      '8': '---..', '9': '----.', ' ': '/'
    }
    return text.toUpperCase().split('').map(char => morseCode[char] || char).join(' ')
  },

  morseToText: (morse: string) => {
    const textCode: { [key: string]: string } = {
      '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E', '..-.': 'F',
      '--.': 'G', '....': 'H', '..': 'I', '.---': 'J', '-.-': 'K', '.-..': 'L',
      '--': 'M', '-.': 'N', '---': 'O', '.--.': 'P', '--.-': 'Q', '.-.': 'R',
      '...': 'S', '-': 'T', '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X',
      '-.--': 'Y', '--..': 'Z', '-----': '0', '.----': '1', '..---': '2',
      '...--': '3', '....-': '4', '.....': '5', '-....': '6', '--...': '7',
      '---..': '8', '----.': '9', '/': ' '
    }
    return morse.split(' ').map(code => textCode[code] || code).join('')
  },

  // NATO Phonetic Alphabet
  textToNato: (text: string) => {
    const nato: { [key: string]: string } = {
      'A': 'Alpha', 'B': 'Bravo', 'C': 'Charlie', 'D': 'Delta', 'E': 'Echo',
      'F': 'Foxtrot', 'G': 'Golf', 'H': 'Hotel', 'I': 'India', 'J': 'Juliet',
      'K': 'Kilo', 'L': 'Lima', 'M': 'Mike', 'N': 'November', 'O': 'Oscar',
      'P': 'Papa', 'Q': 'Quebec', 'R': 'Romeo', 'S': 'Sierra', 'T': 'Tango',
      'U': 'Uniform', 'V': 'Victor', 'W': 'Whiskey', 'X': 'X-ray', 'Y': 'Yankee',
      'Z': 'Zulu', '0': 'Zero', '1': 'One', '2': 'Two', '3': 'Three', '4': 'Four',
      '5': 'Five', '6': 'Six', '7': 'Seven', '8': 'Eight', '9': 'Niner', ' ': '(space)'
    }
    return text.toUpperCase().split('').map(char => nato[char] || char).join(' ')
  },
}

// ============================================
// TEXT GENERATION
// ============================================

export const textGenerate = {
  // Lorem Ipsum
  loremIpsum: (options: {
    paragraphs?: number
    sentences?: number
    words?: number
    startWithLorem?: boolean
  } = {}) => {
    const loremWords = [
      'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
      'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
      'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
      'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
      'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
      'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
      'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
      'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
    ]

    const getWord = () => loremWords[Math.floor(Math.random() * loremWords.length)]
    
    const getSentence = (wordCount: number = Math.floor(Math.random() * 10) + 5) => {
      const words = Array(wordCount).fill(null).map(getWord)
      words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1)
      return words.join(' ') + '.'
    }

    const getParagraph = (sentenceCount: number = Math.floor(Math.random() * 4) + 3) => {
      return Array(sentenceCount).fill(null).map(() => getSentence()).join(' ')
    }

    if (options.words) {
      let result = Array(options.words).fill(null).map(getWord).join(' ')
      if (options.startWithLorem !== false) {
        result = 'Lorem ipsum ' + result.slice(12)
      }
      return result.charAt(0).toUpperCase() + result.slice(1) + '.'
    }

    if (options.sentences) {
      let result = Array(options.sentences).fill(null).map(() => getSentence()).join(' ')
      if (options.startWithLorem !== false) {
        result = 'Lorem ipsum dolor sit amet. ' + result.slice(28)
      }
      return result
    }

    const paragraphCount = options.paragraphs || 3
    let result = Array(paragraphCount).fill(null).map(() => getParagraph()).join('\n\n')
    if (options.startWithLorem !== false) {
      result = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' + result.slice(55)
    }
    return result
  },

  // Random String
  randomString: (length: number, options: {
    uppercase?: boolean
    lowercase?: boolean
    numbers?: boolean
    special?: boolean
  } = { uppercase: true, lowercase: true, numbers: true }) => {
    let chars = ''
    if (options.uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (options.lowercase) chars += 'abcdefghijklmnopqrstuvwxyz'
    if (options.numbers) chars += '0123456789'
    if (options.special) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?'

    if (!chars) chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    return Array(length).fill(null).map(() =>
      chars.charAt(Math.floor(Math.random() * chars.length))
    ).join('')
  },

  // UUID
  uuid: () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0
      const v = c === 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  },
}

// Export all text utilities
export const textProcessor = {
  stats: textStats,
  case: caseConvert,
  manipulate: textManipulate,
  analyze: textAnalyze,
  encode: textEncode,
  generate: textGenerate,
}

export default textProcessor

/**
 * Data Converter - Comprehensive data format conversion utilities
 * Supports: JSON, CSV, XML, YAML, and various data transformations
 */

// ============================================
// JSON UTILITIES
// ============================================

export const jsonUtils = {
  // Format JSON
  format: (input: string, spaces: number = 2): string => {
    const parsed = JSON.parse(input)
    return JSON.stringify(parsed, null, spaces)
  },

  // Minify JSON
  minify: (input: string): string => {
    const parsed = JSON.parse(input)
    return JSON.stringify(parsed)
  },

  // Validate JSON
  validate: (input: string): { valid: boolean; error?: string; parsed?: unknown } => {
    try {
      const parsed = JSON.parse(input)
      return { valid: true, parsed }
    } catch (e) {
      return { valid: false, error: String(e) }
    }
  },

  // JSON to CSV
  toCsv: (input: string): string => {
    const data = JSON.parse(input)
    const arr = Array.isArray(data) ? data : [data]
    
    if (arr.length === 0) return ''
    
    // Get all unique keys
    const keys = new Set<string>()
    arr.forEach(obj => {
      if (typeof obj === 'object' && obj !== null) {
        Object.keys(obj).forEach(key => keys.add(key))
      }
    })
    
    const headers = Array.from(keys)
    const rows = arr.map(obj => {
      return headers.map(key => {
        const val = obj?.[key]
        if (val === null || val === undefined) return ''
        if (typeof val === 'object') return JSON.stringify(val)
        const str = String(val)
        // Escape quotes and wrap in quotes if contains comma or newline
        if (str.includes(',') || str.includes('\n') || str.includes('"')) {
          return `"${str.replace(/"/g, '""')}"`
        }
        return str
      }).join(',')
    })
    
    return [headers.join(','), ...rows].join('\n')
  },

  // JSON to XML
  toXml: (input: string, rootName: string = 'root'): string => {
    const data = JSON.parse(input)
    
    const convertValue = (value: unknown, key: string): string => {
      if (value === null || value === undefined) {
        return `<${key}/>`
      }
      if (Array.isArray(value)) {
        return value.map(item => convertValue(item, key)).join('\n')
      }
      if (typeof value === 'object') {
        const inner = Object.entries(value)
          .map(([k, v]) => convertValue(v, k))
          .join('\n')
        return `<${key}>\n${inner}\n</${key}>`
      }
      return `<${key}>${escapeXml(String(value))}</${key}>`
    }
    
    const escapeXml = (str: string): string => {
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;')
    }
    
    if (Array.isArray(data)) {
      const items = data.map(item => convertValue(item, 'item')).join('\n')
      return `<?xml version="1.0" encoding="UTF-8"?>\n<${rootName}>\n${items}\n</${rootName}>`
    }
    
    const content = Object.entries(data)
      .map(([k, v]) => convertValue(v, k))
      .join('\n')
    return `<?xml version="1.0" encoding="UTF-8"?>\n<${rootName}>\n${content}\n</${rootName}>`
  },

  // Flatten nested JSON
  flatten: (input: string, delimiter: string = '.'): string => {
    const data = JSON.parse(input)
    const result: Record<string, unknown> = {}
    
    const recurse = (obj: unknown, prefix: string = '') => {
      if (typeof obj === 'object' && obj !== null && !Array.isArray(obj)) {
        Object.entries(obj).forEach(([key, value]) => {
          recurse(value, prefix ? `${prefix}${delimiter}${key}` : key)
        })
      } else {
        result[prefix] = obj
      }
    }
    
    recurse(data)
    return JSON.stringify(result, null, 2)
  },

  // Unflatten JSON
  unflatten: (input: string, delimiter: string = '.'): string => {
    const data = JSON.parse(input)
    const result: Record<string, unknown> = {}
    
    Object.entries(data).forEach(([key, value]) => {
      const keys = key.split(delimiter)
      let current: Record<string, unknown> = result
      
      keys.forEach((k, i) => {
        if (i === keys.length - 1) {
          current[k] = value
        } else {
          current[k] = current[k] || {}
          current = current[k] as Record<string, unknown>
        }
      })
    })
    
    return JSON.stringify(result, null, 2)
  },

  // Sort JSON keys
  sortKeys: (input: string, recursive: boolean = true): string => {
    const data = JSON.parse(input)
    
    const sortObject = (obj: unknown): unknown => {
      if (Array.isArray(obj)) {
        return obj.map(sortObject)
      }
      if (typeof obj === 'object' && obj !== null) {
        const sorted: Record<string, unknown> = {}
        Object.keys(obj).sort().forEach(key => {
          sorted[key] = recursive ? sortObject((obj as Record<string, unknown>)[key]) : (obj as Record<string, unknown>)[key]
        })
        return sorted
      }
      return obj
    }
    
    return JSON.stringify(sortObject(data), null, 2)
  },

  // Extract paths
  extractPaths: (input: string): string[] => {
    const data = JSON.parse(input)
    const paths: string[] = []
    
    const recurse = (obj: unknown, prefix: string = '') => {
      if (typeof obj === 'object' && obj !== null) {
        if (Array.isArray(obj)) {
          obj.forEach((item, i) => {
            recurse(item, `${prefix}[${i}]`)
          })
        } else {
          Object.entries(obj).forEach(([key, value]) => {
            const path = prefix ? `${prefix}.${key}` : key
            paths.push(path)
            recurse(value, path)
          })
        }
      }
    }
    
    recurse(data)
    return paths
  },

  // Get value at path
  getAtPath: (input: string, path: string): string => {
    const data = JSON.parse(input)
    const keys = path.split('.').flatMap(k => {
      const match = k.match(/^(\w+)\[(\d+)\]$/)
      return match ? [match[1], parseInt(match[2])] : [k]
    })
    
    let current: unknown = data
    for (const key of keys) {
      if (current === null || current === undefined) return 'undefined'
      current = (current as Record<string, unknown>)[key]
    }
    
    return JSON.stringify(current, null, 2)
  },
}

// ============================================
// CSV UTILITIES
// ============================================

export const csvUtils = {
  // Parse CSV to array
  parse: (input: string, options: { 
    delimiter?: string
    hasHeader?: boolean 
  } = {}): { headers: string[]; rows: string[][] } => {
    const { delimiter = ',', hasHeader = true } = options
    const lines = input.trim().split('\n')
    
    const parseLine = (line: string): string[] => {
      const result: string[] = []
      let current = ''
      let inQuotes = false
      
      for (let i = 0; i < line.length; i++) {
        const char = line[i]
        
        if (char === '"') {
          if (inQuotes && line[i + 1] === '"') {
            current += '"'
            i++
          } else {
            inQuotes = !inQuotes
          }
        } else if (char === delimiter && !inQuotes) {
          result.push(current)
          current = ''
        } else {
          current += char
        }
      }
      result.push(current)
      return result
    }
    
    const allRows = lines.map(parseLine)
    
    if (hasHeader && allRows.length > 0) {
      return {
        headers: allRows[0],
        rows: allRows.slice(1),
      }
    }
    
    return {
      headers: [],
      rows: allRows,
    }
  },

  // CSV to JSON
  toJson: (input: string, options: { delimiter?: string } = {}): string => {
    const { headers, rows } = csvUtils.parse(input, { ...options, hasHeader: true })
    
    const data = rows.map(row => {
      const obj: Record<string, string> = {}
      headers.forEach((header, i) => {
        obj[header] = row[i] || ''
      })
      return obj
    })
    
    return JSON.stringify(data, null, 2)
  },

  // CSV to XML
  toXml: (input: string, rootName: string = 'data', rowName: string = 'row'): string => {
    const { headers, rows } = csvUtils.parse(input, { hasHeader: true })
    
    const escapeXml = (str: string): string => {
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;')
    }
    
    const xmlRows = rows.map(row => {
      const fields = headers.map((header, i) => {
        const value = row[i] || ''
        const safeName = header.replace(/[^a-zA-Z0-9_]/g, '_')
        return `    <${safeName}>${escapeXml(value)}</${safeName}>`
      }).join('\n')
      return `  <${rowName}>\n${fields}\n  </${rowName}>`
    }).join('\n')
    
    return `<?xml version="1.0" encoding="UTF-8"?>\n<${rootName}>\n${xmlRows}\n</${rootName}>`
  },

  // Transpose CSV
  transpose: (input: string): string => {
    const { headers, rows } = csvUtils.parse(input, { hasHeader: true })
    const allRows = [headers, ...rows]
    
    const transposed: string[][] = []
    const maxCols = Math.max(...allRows.map(r => r.length))
    
    for (let col = 0; col < maxCols; col++) {
      transposed.push(allRows.map(row => row[col] || ''))
    }
    
    return transposed.map(row => row.join(',')).join('\n')
  },

  // Filter columns
  filterColumns: (input: string, columns: string[]): string => {
    const { headers, rows } = csvUtils.parse(input, { hasHeader: true })
    const indices = columns.map(col => headers.indexOf(col)).filter(i => i !== -1)
    
    const filteredHeaders = indices.map(i => headers[i])
    const filteredRows = rows.map(row => indices.map(i => row[i]))
    
    return [
      filteredHeaders.join(','),
      ...filteredRows.map(row => row.join(','))
    ].join('\n')
  },
}

// ============================================
// XML UTILITIES
// ============================================

export const xmlUtils = {
  // Format XML
  format: (input: string): string => {
    let formatted = ''
    let indent = 0
    
    input.replace(/></g, '>\n<').split('\n').forEach(line => {
      line = line.trim()
      if (!line) return
      
      if (line.match(/^<\/\w/)) {
        indent--
      }
      
      formatted += '  '.repeat(Math.max(0, indent)) + line + '\n'
      
      if (line.match(/^<\w[^>]*[^/]>/) && !line.match(/^<\?/)) {
        indent++
      }
    })
    
    return formatted.trim()
  },

  // Minify XML
  minify: (input: string): string => {
    return input
      .replace(/>\s+</g, '><')
      .replace(/\s+/g, ' ')
      .trim()
  },

  // Simple XML to JSON (basic parser)
  toJson: (input: string): string => {
    // Remove XML declaration
    const xml = input.replace(/<\?xml[^?]*\?>/g, '').trim()
    
    const parseNode = (str: string): unknown => {
      // Check if it's a simple value
      if (!str.includes('<')) {
        return str.trim()
      }
      
      const result: Record<string, unknown> = {}
      const tagRegex = /<(\w+)([^>]*)>([\s\S]*?)<\/\1>/g
      const selfClosingRegex = /<(\w+)([^>]*?)\/>/g
      
      let match
      
      // Handle self-closing tags
      while ((match = selfClosingRegex.exec(str)) !== null) {
        const [, tagName] = match
        if (result[tagName] !== undefined) {
          if (!Array.isArray(result[tagName])) {
            result[tagName] = [result[tagName]]
          }
          (result[tagName] as unknown[]).push(null)
        } else {
          result[tagName] = null
        }
      }
      
      // Handle regular tags
      while ((match = tagRegex.exec(str)) !== null) {
        const [, tagName, , content] = match
        const parsed = parseNode(content)
        
        if (result[tagName] !== undefined) {
          if (!Array.isArray(result[tagName])) {
            result[tagName] = [result[tagName]]
          }
          (result[tagName] as unknown[]).push(parsed)
        } else {
          result[tagName] = parsed
        }
      }
      
      return Object.keys(result).length === 0 ? str.trim() : result
    }
    
    return JSON.stringify(parseNode(xml), null, 2)
  },

  // Validate XML (basic)
  validate: (input: string): { valid: boolean; error?: string } => {
    try {
      // Check for basic XML structure
      const tags: string[] = []
      const tagRegex = /<\/?([a-zA-Z][a-zA-Z0-9_-]*)[^>]*\/?>/g
      let match
      
      while ((match = tagRegex.exec(input)) !== null) {
        const fullMatch = match[0]
        const tagName = match[1]
        
        if (fullMatch.endsWith('/>')) {
          // Self-closing tag, OK
          continue
        }
        
        if (fullMatch.startsWith('</')) {
          // Closing tag
          if (tags.length === 0 || tags[tags.length - 1] !== tagName) {
            return { valid: false, error: `Mismatched closing tag: ${tagName}` }
          }
          tags.pop()
        } else if (!fullMatch.startsWith('<?')) {
          // Opening tag (not declaration)
          tags.push(tagName)
        }
      }
      
      if (tags.length > 0) {
        return { valid: false, error: `Unclosed tags: ${tags.join(', ')}` }
      }
      
      return { valid: true }
    } catch (e) {
      return { valid: false, error: String(e) }
    }
  },
}

// ============================================
// YAML-LIKE UTILITIES (Simple implementation)
// ============================================

export const yamlUtils = {
  // JSON to YAML-like format
  jsonToYaml: (input: string): string => {
    const data = JSON.parse(input)
    
    const convert = (obj: unknown, indent: number = 0): string => {
      const spaces = '  '.repeat(indent)
      
      if (obj === null) return 'null'
      if (obj === undefined) return ''
      if (typeof obj === 'boolean') return String(obj)
      if (typeof obj === 'number') return String(obj)
      if (typeof obj === 'string') {
        if (obj.includes('\n') || obj.includes(':') || obj.includes('#')) {
          return `"${obj.replace(/"/g, '\\"')}"`
        }
        return obj
      }
      
      if (Array.isArray(obj)) {
        if (obj.length === 0) return '[]'
        return obj.map(item => {
          const value = convert(item, indent + 1)
          if (typeof item === 'object' && item !== null) {
            return `${spaces}- \n${value.split('\n').map(l => spaces + '  ' + l).join('\n')}`
          }
          return `${spaces}- ${value}`
        }).join('\n')
      }
      
      if (typeof obj === 'object') {
        const entries = Object.entries(obj)
        if (entries.length === 0) return '{}'
        return entries.map(([key, value]) => {
          const converted = convert(value, indent + 1)
          if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            return `${spaces}${key}:\n${converted}`
          }
          if (Array.isArray(value)) {
            return `${spaces}${key}:\n${converted}`
          }
          return `${spaces}${key}: ${converted}`
        }).join('\n')
      }
      
      return String(obj)
    }
    
    return convert(data)
  },

  // Simple YAML to JSON (limited support)
  yamlToJson: (input: string): string => {
    const lines = input.split('\n')
    const result: Record<string, unknown> = {}
    const stack: { indent: number; obj: Record<string, unknown>; key?: string }[] = [
      { indent: -1, obj: result }
    ]
    
    for (const line of lines) {
      if (line.trim() === '' || line.trim().startsWith('#')) continue
      
      const indent = line.search(/\S/)
      const content = line.trim()
      
      // Pop stack to find parent
      while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
        stack.pop()
      }
      
      const parent = stack[stack.length - 1]
      
      if (content.startsWith('- ')) {
        // Array item
        const value = content.slice(2).trim()
        const key = parent.key || 'items'
        if (!parent.obj[key]) parent.obj[key] = []
        const arr = parent.obj[key] as unknown[]
        
        if (value.includes(':')) {
          const [k, v] = value.split(':').map(s => s.trim())
          const newObj: Record<string, unknown> = {}
          newObj[k] = parseValue(v)
          arr.push(newObj)
        } else if (value) {
          arr.push(parseValue(value))
        }
      } else if (content.includes(':')) {
        const colonIndex = content.indexOf(':')
        const key = content.slice(0, colonIndex).trim()
        const value = content.slice(colonIndex + 1).trim()
        
        if (value === '' || value === '|' || value === '>') {
          parent.obj[key] = {}
          stack.push({ indent, obj: parent.obj[key] as Record<string, unknown>, key })
        } else {
          parent.obj[key] = parseValue(value)
        }
      }
    }
    
    function parseValue(val: string): unknown {
      if (val === 'true') return true
      if (val === 'false') return false
      if (val === 'null') return null
      if (val.match(/^-?\d+$/)) return parseInt(val)
      if (val.match(/^-?\d+\.\d+$/)) return parseFloat(val)
      if ((val.startsWith('"') && val.endsWith('"')) || 
          (val.startsWith("'") && val.endsWith("'"))) {
        return val.slice(1, -1)
      }
      return val
    }
    
    return JSON.stringify(result, null, 2)
  },
}

// ============================================
// REGEX UTILITIES
// ============================================

export const regexUtils = {
  // Test regex
  test: (pattern: string, flags: string, text: string): {
    isValid: boolean
    matches: RegExpMatchArray[]
    error?: string
  } => {
    try {
      const regex = new RegExp(pattern, flags)
      const matches: RegExpMatchArray[] = []
      
      if (flags.includes('g')) {
        let match
        while ((match = regex.exec(text)) !== null) {
          matches.push(match)
        }
      } else {
        const match = text.match(regex)
        if (match) matches.push(match)
      }
      
      return { isValid: true, matches }
    } catch (e) {
      return { isValid: false, matches: [], error: String(e) }
    }
  },

  // Replace with regex
  replace: (pattern: string, flags: string, replacement: string, text: string): {
    result: string
    count: number
    error?: string
  } => {
    try {
      const regex = new RegExp(pattern, flags)
      let count = 0
      const result = text.replace(regex, (...args) => {
        count++
        // Handle capture groups in replacement
        let replaced = replacement
        args.slice(1, -2).forEach((group, i) => {
          replaced = replaced.replace(new RegExp(`\\$${i + 1}`, 'g'), group || '')
        })
        return replaced
      })
      return { result, count }
    } catch (e) {
      return { result: text, count: 0, error: String(e) }
    }
  },

  // Explain regex (basic patterns)
  explain: (pattern: string): string[] => {
    const explanations: string[] = []
    
    const patterns: [RegExp, string][] = [
      [/\^/, 'Start of string'],
      [/\$/, 'End of string'],
      [/\./, 'Any character except newline'],
      [/\\d/, 'Any digit (0-9)'],
      [/\\D/, 'Any non-digit'],
      [/\\w/, 'Any word character (a-z, A-Z, 0-9, _)'],
      [/\\W/, 'Any non-word character'],
      [/\\s/, 'Any whitespace character'],
      [/\\S/, 'Any non-whitespace character'],
      [/\\b/, 'Word boundary'],
      [/\+/, 'One or more of preceding'],
      [/\*/, 'Zero or more of preceding'],
      [/\?/, 'Zero or one of preceding (optional)'],
      [/\[.*?\]/, 'Character class'],
      [/\(.*?\)/, 'Capturing group'],
      [/\|/, 'Alternation (or)'],
      [/\{(\d+)(,\d*)?\}/, 'Quantifier (repeat count)'],
    ]
    
    patterns.forEach(([regex, explanation]) => {
      if (regex.test(pattern)) {
        explanations.push(explanation)
      }
    })
    
    return explanations
  },
}

// ============================================
// HASH UTILITIES (using Web Crypto API)
// ============================================

export const hashUtils = {
  // SHA-256 Hash
  sha256: async (text: string): Promise<string> => {
    const encoder = new TextEncoder()
    const data = encoder.encode(text)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  },

  // SHA-1 Hash
  sha1: async (text: string): Promise<string> => {
    const encoder = new TextEncoder()
    const data = encoder.encode(text)
    const hashBuffer = await crypto.subtle.digest('SHA-1', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  },

  // SHA-512 Hash
  sha512: async (text: string): Promise<string> => {
    const encoder = new TextEncoder()
    const data = encoder.encode(text)
    const hashBuffer = await crypto.subtle.digest('SHA-512', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  },

  // Simple MD5-like hash (not cryptographically secure, for display only)
  md5Like: (text: string): string => {
    let hash = 0
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash
    }
    // Convert to hex and pad
    const hex = Math.abs(hash).toString(16)
    return hex.padStart(32, '0').slice(0, 32)
  },
}

// ============================================
// JWT UTILITIES
// ============================================

export const jwtUtils = {
  // Decode JWT (without verification)
  decode: (token: string): {
    header: Record<string, unknown>
    payload: Record<string, unknown>
    signature: string
    isExpired: boolean
    expiresAt?: Date
  } | null => {
    try {
      const parts = token.split('.')
      if (parts.length !== 3) return null
      
      const header = JSON.parse(atob(parts[0]))
      const payload = JSON.parse(atob(parts[1]))
      
      let isExpired = false
      let expiresAt: Date | undefined
      
      if (payload.exp) {
        expiresAt = new Date(payload.exp * 1000)
        isExpired = expiresAt < new Date()
      }
      
      return {
        header,
        payload,
        signature: parts[2],
        isExpired,
        expiresAt,
      }
    } catch {
      return null
    }
  },
}

// ============================================
// COLOR UTILITIES
// ============================================

export const colorUtils = {
  // Hex to RGB
  hexToRgb: (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    } : null
  },

  // RGB to Hex
  rgbToHex: (r: number, g: number, b: number): string => {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16)
      return hex.length === 1 ? '0' + hex : hex
    }).join('')
  },

  // RGB to HSL
  rgbToHsl: (r: number, g: number, b: number): { h: number; s: number; l: number } => {
    r /= 255
    g /= 255
    b /= 255
    
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0
    let s = 0
    const l = (max + min) / 2
    
    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
        case g: h = ((b - r) / d + 2) / 6; break
        case b: h = ((r - g) / d + 4) / 6; break
      }
    }
    
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    }
  },

  // HSL to RGB
  hslToRgb: (h: number, s: number, l: number): { r: number; g: number; b: number } => {
    h /= 360
    s /= 100
    l /= 100
    
    let r, g, b
    
    if (s === 0) {
      r = g = b = l
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1
        if (t > 1) t -= 1
        if (t < 1/6) return p + (q - p) * 6 * t
        if (t < 1/2) return q
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
        return p
      }
      
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s
      const p = 2 * l - q
      r = hue2rgb(p, q, h + 1/3)
      g = hue2rgb(p, q, h)
      b = hue2rgb(p, q, h - 1/3)
    }
    
    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    }
  },

  // Generate color palette
  generatePalette: (baseColor: string, type: 'complementary' | 'analogous' | 'triadic' | 'monochromatic'): string[] => {
    const rgb = colorUtils.hexToRgb(baseColor)
    if (!rgb) return [baseColor]
    
    const hsl = colorUtils.rgbToHsl(rgb.r, rgb.g, rgb.b)
    const colors: string[] = [baseColor]
    
    switch (type) {
      case 'complementary':
        const comp = colorUtils.hslToRgb((hsl.h + 180) % 360, hsl.s, hsl.l)
        colors.push(colorUtils.rgbToHex(comp.r, comp.g, comp.b))
        break
        
      case 'analogous':
        for (const offset of [-30, 30]) {
          const analog = colorUtils.hslToRgb((hsl.h + offset + 360) % 360, hsl.s, hsl.l)
          colors.push(colorUtils.rgbToHex(analog.r, analog.g, analog.b))
        }
        break
        
      case 'triadic':
        for (const offset of [120, 240]) {
          const triad = colorUtils.hslToRgb((hsl.h + offset) % 360, hsl.s, hsl.l)
          colors.push(colorUtils.rgbToHex(triad.r, triad.g, triad.b))
        }
        break
        
      case 'monochromatic':
        for (const lOffset of [-20, -10, 10, 20]) {
          const newL = Math.max(0, Math.min(100, hsl.l + lOffset))
          const mono = colorUtils.hslToRgb(hsl.h, hsl.s, newL)
          colors.push(colorUtils.rgbToHex(mono.r, mono.g, mono.b))
        }
        break
    }
    
    return colors
  },
}

// ============================================
// CRON UTILITIES
// ============================================

export const cronUtils = {
  // Generate cron expression
  generate: (options: {
    minute?: string
    hour?: string
    dayOfMonth?: string
    month?: string
    dayOfWeek?: string
  }): string => {
    const {
      minute = '*',
      hour = '*',
      dayOfMonth = '*',
      month = '*',
      dayOfWeek = '*',
    } = options
    
    return `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`
  },

  // Parse cron expression
  parse: (expression: string): {
    minute: string
    hour: string
    dayOfMonth: string
    month: string
    dayOfWeek: string
    description: string
  } | null => {
    const parts = expression.trim().split(/\s+/)
    if (parts.length !== 5) return null
    
    const [minute, hour, dayOfMonth, month, dayOfWeek] = parts
    
    // Generate human-readable description
    const descriptions: string[] = []
    
    if (minute === '*') descriptions.push('every minute')
    else if (minute.startsWith('*/')) descriptions.push(`every ${minute.slice(2)} minutes`)
    else descriptions.push(`at minute ${minute}`)
    
    if (hour === '*') descriptions.push('of every hour')
    else if (hour.startsWith('*/')) descriptions.push(`every ${hour.slice(2)} hours`)
    else descriptions.push(`at ${hour}:00`)
    
    return {
      minute,
      hour,
      dayOfMonth,
      month,
      dayOfWeek,
      description: descriptions.join(' '),
    }
  },

  // Common presets
  presets: {
    everyMinute: '* * * * *',
    everyHour: '0 * * * *',
    everyDay: '0 0 * * *',
    everyWeek: '0 0 * * 0',
    everyMonth: '0 0 1 * *',
    weekdays: '0 9 * * 1-5',
    weekends: '0 9 * * 0,6',
  },
}

// Export all converters
export const dataConverter = {
  json: jsonUtils,
  csv: csvUtils,
  xml: xmlUtils,
  yaml: yamlUtils,
  regex: regexUtils,
  hash: hashUtils,
  jwt: jwtUtils,
  color: colorUtils,
  cron: cronUtils,
}

export default dataConverter

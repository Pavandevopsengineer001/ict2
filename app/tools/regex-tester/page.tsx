'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { ToolInput } from '@/components/tools/ToolInput'
import { developerTools } from '@/lib/toolUtils'
import { Button } from '@/components/ui/button'

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState('')
  const [flags, setFlags] = useState('g')
  const [text, setText] = useState('')
  const [result, setResult] = useState<{ matches: string[]; error?: string } | null>(null)

  const handleTest = () => {
    const res = developerTools.testRegex(pattern, flags, text)
    setResult(res)
  }

  const handleClear = () => {
    setPattern('')
    setFlags('g')
    setText('')
    setResult(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ToolLayout
          title="Regex Tester"
          description="Test and debug regular expressions"
        >
          <div className="space-y-6">
            <div className="space-y-4">
              <ToolInput
                value={pattern}
                onChange={setPattern}
                placeholder="Enter regex pattern..."
                label="Regex Pattern"
                type="text"
              />

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Flags</label>
                <input
                  type="text"
                  value={flags}
                  onChange={(e) => setFlags(e.target.value)}
                  placeholder="g, i, m, s, etc."
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary text-white placeholder-gray-500"
                />
                <p className="text-xs text-gray-500 mt-1">g = global, i = ignoreCase, m = multiline</p>
              </div>

              <ToolInput
                value={text}
                onChange={setText}
                placeholder="Enter text to test..."
                label="Test Text"
                rows={6}
              />
            </div>

            {result && (
              <div className="card-glass p-6 rounded-lg space-y-4">
                {result.error ? (
                  <div className="text-red-400">
                    <p className="font-semibold mb-2">Error:</p>
                    <p className="text-sm">{result.error}</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-gray-400 mb-3">
                      Found {result.matches.length} match{result.matches.length !== 1 ? 'es' : ''}
                    </p>
                    {result.matches.length > 0 && (
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {result.matches.map((match, idx) => (
                          <div key={idx} className="p-3 bg-background/50 rounded border border-border/50 text-sm font-mono text-primary">
                            {match}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-3 flex-wrap">
              <Button
                onClick={handleTest}
                className="gradient-btn text-white border-0"
              >
                Test
              </Button>
              <Button
                onClick={handleClear}
                variant="outline"
                className="border-border/50"
              >
                Clear
              </Button>
            </div>
          </div>
        </ToolLayout>
      </main>
      <Footer />
    </div>
  )
}

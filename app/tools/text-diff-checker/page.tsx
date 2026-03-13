'use client'

import { useState, useMemo } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { ToolInput } from '@/components/tools/ToolInput'
import { textTools } from '@/lib/toolUtils'
import { Button } from '@/components/ui/button'

export default function TextDiffCheckerPage() {
  const [text1, setText1] = useState('')
  const [text2, setText2] = useState('')

  const diff = useMemo(() => {
    if (!text1 || !text2) return null
    return textTools.compareTexts(text1, text2)
  }, [text1, text2])

  const handleClear = () => {
    setText1('')
    setText2('')
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ToolLayout
          title="Text Diff Checker"
          description="Compare two texts and identify differences"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ToolInput
                value={text1}
                onChange={setText1}
                placeholder="Paste first text..."
                label="Text 1"
                rows={8}
              />
              <ToolInput
                value={text2}
                onChange={setText2}
                placeholder="Paste second text..."
                label="Text 2"
                rows={8}
              />
            </div>

            {diff && (
              <div className="card-glass p-6 rounded-lg space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Total Lines</p>
                    <p className="text-2xl font-bold text-white">{diff.totalLines}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Differences</p>
                    <p className="text-2xl font-bold text-red-400">{diff.differences}</p>
                  </div>
                </div>

                {diff.details.length > 0 && (
                  <div className="border-t border-border/50 pt-4">
                    <p className="text-sm font-semibold text-white mb-3">Details:</p>
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {diff.details.slice(0, 10).map((detail, idx) => (
                        <div key={idx} className="text-xs bg-background/50 p-3 rounded border border-border/50">
                          <p className="text-gray-400">Line {detail.line}</p>
                          <p className="text-primary truncate">Text 1: {detail.text1}</p>
                          <p className="text-secondary truncate">Text 2: {detail.text2}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <Button
              onClick={handleClear}
              variant="outline"
              className="border-border/50"
            >
              Clear
            </Button>
          </div>
        </ToolLayout>
      </main>
      <Footer />
    </div>
  )
}

'use client'

import { useState, useMemo } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { ToolInput } from '@/components/tools/ToolInput'
import { textTools } from '@/lib/toolUtils'
import { Button } from '@/components/ui/button'

export default function WordCounterPage() {
  const [input, setInput] = useState('')

  const stats = useMemo(() => {
    if (!input) return null
    return textTools.countWords(input)
  }, [input])

  const handleClear = () => {
    setInput('')
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ToolLayout
          title="Word Counter"
          description="Count words, characters, sentences, and paragraphs in your text"
          explanation={
            <div className="space-y-4 text-gray-300">
              <p>
                Word Counter is essential for writers, students, and professionals. It provides:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Accurate word and character counts</li>
                <li>Sentence and paragraph analysis</li>
                <li>Real-time statistics as you type</li>
                <li>Help with content requirements and limits</li>
              </ul>
            </div>
          }
          howTo={
            <div className="space-y-4 text-gray-300">
              <ol className="list-decimal list-inside space-y-3">
                <li>Paste or type your text in the input area</li>
                <li>Statistics update automatically</li>
                <li>View words, characters, sentences, and paragraphs</li>
                <li>Use &quot;Clear&quot; to reset the counter</li>
              </ol>
            </div>
          }
          faq={
            <div className="space-y-4 text-gray-300">
              <div>
                <h4 className="font-semibold text-white mb-2">How is a word defined?</h4>
                <p>A word is typically defined as any sequence of characters separated by spaces or punctuation marks.</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">What counts as a sentence?</h4>
                <p>Sentences are counted by periods, question marks, and exclamation marks.</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Why two character counts?</h4>
                <p>Some applications need character counts with or without spaces. We provide both for flexibility.</p>
              </div>
            </div>
          }
        >
          <div className="space-y-6">
            <ToolInput
              value={input}
              onChange={setInput}
              placeholder="Paste your text here..."
              label="Enter Text"
              rows={10}
            />

            {stats && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <StatCard label="Words" value={stats.words} />
                <StatCard label="Characters" value={stats.characters} />
                <StatCard label="Char (no space)" value={stats.charactersNoSpace} />
                <StatCard label="Sentences" value={stats.sentences} />
                <StatCard label="Paragraphs" value={stats.paragraphs} />
              </div>
            )}

            <div className="flex gap-3">
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

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="card-glass p-4 rounded-lg text-center">
      <p className="text-gray-400 text-sm mb-2">{label}</p>
      <p className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        {value}
      </p>
    </div>
  )
}

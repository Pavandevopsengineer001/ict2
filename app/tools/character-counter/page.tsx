'use client'

import { useState, useMemo } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { ToolInput } from '@/components/tools/ToolInput'
import { textTools } from '@/lib/toolUtils'
import { Button } from '@/components/ui/button'

export default function CharacterCounterPage() {
  const [input, setInput] = useState('')

  const stats = useMemo(() => {
    if (!input) return null
    return textTools.countCharacters(input)
  }, [input])

  const handleClear = () => {
    setInput('')
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ToolLayout
          title="Character Counter"
          description="Count characters with and without spaces in your text"
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
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard label="Total" value={stats.total} />
                <StatCard label="Without Spaces" value={stats.withoutSpaces} />
                <StatCard label="Spaces" value={stats.spaces} />
                <StatCard label="Lines" value={stats.lines} />
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

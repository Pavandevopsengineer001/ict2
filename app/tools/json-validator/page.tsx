'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { ToolInput } from '@/components/tools/ToolInput'
import { developerTools } from '@/lib/toolUtils'
import { Button } from '@/components/ui/button'
import { CheckCircle, AlertCircle } from 'lucide-react'

export default function JSONValidatorPage() {
  const [input, setInput] = useState('')
  const [validation, setValidation] = useState<{ valid: boolean; error?: string } | null>(null)

  const handleValidate = () => {
    const result = developerTools.validateJson(input)
    setValidation(result)
  }

  const handleClear = () => {
    setInput('')
    setValidation(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ToolLayout
          title="JSON Validator"
          description="Validate JSON syntax and detect errors instantly"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ToolInput
                value={input}
                onChange={setInput}
                placeholder="Paste your JSON here..."
                label="Input JSON"
                rows={10}
              />

              {validation && (
                <div className="card-glass p-6 rounded-lg flex flex-col justify-center">
                  {validation.valid ? (
                    <div className="text-center space-y-4">
                      <CheckCircle className="w-12 h-12 text-accent mx-auto" />
                      <p className="text-xl font-semibold text-white">Valid JSON</p>
                      <p className="text-gray-400 text-sm">Your JSON syntax is correct</p>
                    </div>
                  ) : (
                    <div className="text-center space-y-4">
                      <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
                      <p className="text-xl font-semibold text-white">Invalid JSON</p>
                      <p className="text-red-400 text-sm break-words">
                        {validation.error}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex gap-3 flex-wrap">
              <Button
                onClick={handleValidate}
                className="gradient-btn text-white border-0"
              >
                Validate
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

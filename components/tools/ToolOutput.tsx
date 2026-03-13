'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { Copy, Check, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ToolOutputProps {
  value: string | React.ReactNode
  label?: string
  isCode?: boolean
  isEmpty?: boolean
  emptyMessage?: string
  className?: string
  maxHeight?: string
  onCopy?: () => void
  onDownload?: () => void
  copied?: boolean
}

export function ToolOutput({
  value,
  label,
  isCode = true,
  isEmpty = false,
  emptyMessage = 'Output will appear here...',
  className,
  maxHeight = '300px',
  onCopy,
  onDownload,
  copied = false,
}: ToolOutputProps) {
  return (
    <div className="space-y-2 w-full">
      {(label || onCopy || onDownload) && (
        <div className="flex items-center justify-between">
          {label && (
            <label className="block text-sm font-medium text-muted-foreground">
              {label}
            </label>
          )}
          {!isEmpty && (onCopy || onDownload) && (
            <div className="flex items-center gap-2">
              {onCopy && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onCopy}
                  className="h-7 px-2 text-xs"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 mr-1 text-green-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 mr-1" />
                  )}
                  {copied ? 'Copied' : 'Copy'}
                </Button>
              )}
              {onDownload && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onDownload}
                  className="h-7 px-2 text-xs"
                >
                  <Download className="w-3.5 h-3.5 mr-1" />
                  Download
                </Button>
              )}
            </div>
          )}
        </div>
      )}
      <div
        className={cn(
          'tool-panel-output overflow-auto',
          isCode && 'font-mono text-sm',
          isEmpty && 'flex items-center justify-center text-muted-foreground',
          className
        )}
        style={{ maxHeight }}
      >
        {isEmpty ? (
          <span>{emptyMessage}</span>
        ) : (
          <div className="whitespace-pre-wrap break-words">{value}</div>
        )}
      </div>
    </div>
  )
}

// Stats Display Component
export function StatsDisplay({
  stats,
  columns = 4,
}: {
  stats: { label: string; value: string | number; highlight?: boolean }[]
  columns?: 2 | 3 | 4 | 5
}) {
  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 sm:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-4',
    5: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5',
  }

  return (
    <div className={cn('grid gap-3', gridCols[columns])}>
      {stats.map((stat, index) => (
        <div
          key={index}
          className={cn(
            'stat-card',
            stat.highlight && 'border-primary/50 bg-primary/10'
          )}
        >
          <p className="stat-label mb-1">{stat.label}</p>
          <p className={cn('stat-value', stat.highlight && 'text-primary')}>
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  )
}

// Result Box Component (for calculators)
export function ResultBox({
  label,
  value,
  subValue,
  formula,
}: {
  label: string
  value: string | number
  subValue?: string
  formula?: string
}) {
  return (
    <div className="result-box">
      <p className="result-label mb-2">{label}</p>
      <p className="result-value">{value}</p>
      {subValue && (
        <p className="text-lg text-muted-foreground mt-2">{subValue}</p>
      )}
      {formula && (
        <p className="text-sm text-muted-foreground mt-3 font-mono bg-background/50 px-3 py-2 rounded">
          {formula}
        </p>
      )}
    </div>
  )
}

// Code Block Component
export function CodeBlock({
  code,
  language,
  showLineNumbers = false,
  onCopy,
  copied = false,
}: {
  code: string
  language?: string
  showLineNumbers?: boolean
  onCopy?: () => void
  copied?: boolean
}) {
  const lines = code.split('\n')

  return (
    <div className="relative group">
      {language && (
        <div className="absolute top-0 left-0 px-3 py-1 bg-primary/10 text-primary text-xs rounded-tl-lg rounded-br-lg">
          {language}
        </div>
      )}
      {onCopy && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onCopy}
          className="absolute top-2 right-2 h-7 px-2 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-green-500" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </Button>
      )}
      <div className="tool-panel-output mt-6 overflow-x-auto">
        {showLineNumbers ? (
          <table className="w-full">
            <tbody>
              {lines.map((line, i) => (
                <tr key={i}>
                  <td className="text-muted-foreground text-right pr-4 select-none w-8">
                    {i + 1}
                  </td>
                  <td className="whitespace-pre">{line}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <pre className="whitespace-pre-wrap">{code}</pre>
        )}
      </div>
    </div>
  )
}

// Diff Display Component
export function DiffDisplay({
  original,
  modified,
  differences,
}: {
  original: string
  modified: string
  differences: { line: number; text1: string; text2: string }[]
}) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-2">Original</p>
          <div className="tool-panel-output text-sm">
            {original.split('\n').map((line, i) => {
              const isDiff = differences.some(d => d.line === i + 1)
              return (
                <div
                  key={i}
                  className={cn(
                    'px-2 py-0.5',
                    isDiff && 'bg-destructive/20 text-destructive'
                  )}
                >
                  {line || '\u00A0'}
                </div>
              )
            })}
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-2">Modified</p>
          <div className="tool-panel-output text-sm">
            {modified.split('\n').map((line, i) => {
              const isDiff = differences.some(d => d.line === i + 1)
              return (
                <div
                  key={i}
                  className={cn(
                    'px-2 py-0.5',
                    isDiff && 'bg-green-500/20 text-green-400'
                  )}
                >
                  {line || '\u00A0'}
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className="text-sm text-muted-foreground">
        {differences.length} difference{differences.length !== 1 ? 's' : ''} found
      </div>
    </div>
  )
}

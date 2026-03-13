'use client'

import React, { useState } from 'react'
import { 
  Copy, 
  Download, 
  Check, 
  RefreshCw, 
  Trash2, 
  Upload,
  ChevronDown,
  ChevronUp,
  Zap,
  Shield,
  Clock,
  ArrowLeftRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ToolLayoutProps {
  title: string
  description: string
  children: React.ReactNode
  icon?: React.ReactNode
  category?: string
  
  // Side-by-side mode
  inputPanel?: React.ReactNode
  outputPanel?: React.ReactNode
  
  // Loading state
  isProcessing?: boolean
  processingText?: string
  
  // Actions
  onCopy?: () => void
  onDownload?: () => void
  onClear?: () => void
  onProcess?: () => void
  processButtonText?: string
  
  // State
  copiedText?: boolean
  hasOutput?: boolean
  error?: string
  
  // Content sections
  showExplanation?: boolean
  explanation?: React.ReactNode
  howTo?: React.ReactNode
  faq?: React.ReactNode
  relatedTools?: React.ReactNode
  
  // Features list
  features?: string[]
}

export function ToolLayout({
  title,
  description,
  children,
  icon,
  category,
  inputPanel,
  outputPanel,
  isProcessing = false,
  processingText = 'Processing...',
  onCopy,
  onDownload,
  onClear,
  onProcess,
  processButtonText = 'Convert',
  copiedText = false,
  hasOutput = false,
  error,
  showExplanation = true,
  explanation,
  howTo,
  faq,
  relatedTools,
  features,
}: ToolLayoutProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>('explanation')

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  // Determine if we're using side-by-side layout
  const hasSideBySide = inputPanel && outputPanel

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Convertio/Google Style */}
      <div className="relative overflow-hidden border-b border-border/30">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/95" />
        </div>
        
        <div className="container-premium py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            {/* Category Badge */}
            {category && (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                {icon}
                <span>{category}</span>
              </div>
            )}
            
            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-balance leading-tight">
              {title}
            </h1>
            
            {/* Description */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              {description}
            </p>
            
            {/* Feature Pills */}
            {features && features.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card/50 border border-border/50 text-sm text-muted-foreground"
                  >
                    <Check className="w-3.5 h-3.5 text-primary" />
                    {feature}
                  </div>
                ))}
              </div>
            )}
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span>100% Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>Instant Results</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                <span>Free to Use</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tool Area */}
      <div className="container-premium py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Side-by-Side Layout */}
          {hasSideBySide ? (
            <div className="space-y-6">
              {/* Panels Container */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                {/* Input Panel */}
                <div className="relative">
                  <div className="tool-panel h-full">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                        Input
                      </h2>
                      {onClear && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={onClear}
                          className="text-muted-foreground hover:text-foreground h-8 px-2"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Clear
                        </Button>
                      )}
                    </div>
                    {inputPanel}
                  </div>
                </div>

                {/* Convert Button - Center Arrow (Desktop) */}
                <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  {onProcess && (
                    <Button
                      onClick={onProcess}
                      disabled={isProcessing}
                      className="btn-gradient rounded-full w-14 h-14 p-0 shadow-lg"
                    >
                      {isProcessing ? (
                        <RefreshCw className="w-5 h-5 animate-spin" />
                      ) : (
                        <ArrowLeftRight className="w-5 h-5" />
                      )}
                    </Button>
                  )}
                </div>

                {/* Output Panel */}
                <div className="relative">
                  <div className="tool-panel h-full">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                        Output
                      </h2>
                      <div className="flex items-center gap-2">
                        {onCopy && hasOutput && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={onCopy}
                            className="text-muted-foreground hover:text-foreground h-8 px-2"
                          >
                            {copiedText ? (
                              <>
                                <Check className="w-4 h-4 mr-1 text-green-500" />
                                Copied
                              </>
                            ) : (
                              <>
                                <Copy className="w-4 h-4 mr-1" />
                                Copy
                              </>
                            )}
                          </Button>
                        )}
                        {onDownload && hasOutput && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={onDownload}
                            className="text-muted-foreground hover:text-foreground h-8 px-2"
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    {/* Loading Overlay */}
                    {isProcessing && (
                      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center rounded-xl z-10">
                        <div className="text-center">
                          <RefreshCw className="w-8 h-8 animate-spin text-primary mx-auto mb-3" />
                          <p className="text-sm text-muted-foreground">{processingText}</p>
                        </div>
                      </div>
                    )}
                    
                    {outputPanel}
                  </div>
                </div>
              </div>

              {/* Mobile Process Button */}
              {onProcess && (
                <div className="lg:hidden flex justify-center">
                  <Button
                    onClick={onProcess}
                    disabled={isProcessing}
                    className="btn-gradient px-8 py-6 text-lg"
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                        {processingText}
                      </>
                    ) : (
                      processButtonText
                    )}
                  </Button>
                </div>
              )}
            </div>
          ) : (
            /* Standard Single Card Layout */
            <div className="tool-panel max-w-4xl mx-auto">
              {children}
              
              {/* Error Display */}
              {error && (
                <div className="mt-4 p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                  <p className="text-destructive text-sm font-medium">Error</p>
                  <p className="text-destructive/80 text-sm mt-1">{error}</p>
                </div>
              )}

              {/* Action Buttons */}
              {(onCopy || onDownload || onClear) && (
                <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-border/50">
                  {onClear && (
                    <Button
                      onClick={onClear}
                      variant="outline"
                      className="border-border/50"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear
                    </Button>
                  )}
                  {onCopy && hasOutput && (
                    <Button
                      onClick={onCopy}
                      variant="outline"
                      className="border-border/50"
                    >
                      {copiedText ? (
                        <>
                          <Check className="w-4 h-4 mr-2 text-green-500" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </>
                      )}
                    </Button>
                  )}
                  {onDownload && hasOutput && (
                    <Button
                      onClick={onDownload}
                      className="btn-gradient"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Error Display for Side-by-Side */}
          {hasSideBySide && error && (
            <div className="mt-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg max-w-4xl mx-auto">
              <p className="text-destructive text-sm font-medium">Error</p>
              <p className="text-destructive/80 text-sm mt-1">{error}</p>
            </div>
          )}
        </div>
      </div>

      {/* Information Sections */}
      <div className="container-premium pb-12 md:pb-16">
        <div className="max-w-4xl mx-auto space-y-4">
          
          {/* Explanation Section */}
          {showExplanation && explanation && (
            <CollapsibleSection
              title="About This Tool"
              isExpanded={expandedSection === 'explanation'}
              onToggle={() => toggleSection('explanation')}
            >
              <div className="prose prose-invert max-w-none text-muted-foreground">
                {explanation}
              </div>
            </CollapsibleSection>
          )}

          {/* How-To Section */}
          {howTo && (
            <CollapsibleSection
              title="How to Use"
              isExpanded={expandedSection === 'howTo'}
              onToggle={() => toggleSection('howTo')}
            >
              <div className="prose prose-invert max-w-none text-muted-foreground">
                {howTo}
              </div>
            </CollapsibleSection>
          )}

          {/* FAQ Section */}
          {faq && (
            <CollapsibleSection
              title="Frequently Asked Questions"
              isExpanded={expandedSection === 'faq'}
              onToggle={() => toggleSection('faq')}
            >
              {faq}
            </CollapsibleSection>
          )}
        </div>
      </div>

      {/* Related Tools */}
      {relatedTools && (
        <div className="border-t border-border/30 bg-card/30">
          <div className="container-premium py-12 md:py-16">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-center">Related Tools</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedTools}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Collapsible Section Component
function CollapsibleSection({
  title,
  isExpanded,
  onToggle,
  children,
}: {
  title: string
  isExpanded: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div className="border border-border/50 rounded-xl overflow-hidden bg-card/30">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-card/50 transition-colors"
      >
        <h3 className="text-lg font-semibold">{title}</h3>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        )}
      </button>
      {isExpanded && (
        <div className="px-5 pb-5 pt-0">
          {children}
        </div>
      )}
    </div>
  )
}

// File Drop Zone Component
export function FileDropZone({
  onFileSelect,
  accept,
  maxSize,
  label = 'Drop your file here',
  sublabel = 'or click to browse',
  isProcessing = false,
}: {
  onFileSelect: (file: File) => void
  accept?: string
  maxSize?: number
  label?: string
  sublabel?: string
  isProcessing?: boolean
}) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragIn = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragOut = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      const file = files[0]
      if (maxSize && file.size > maxSize) {
        alert(`File size exceeds ${Math.round(maxSize / 1024 / 1024)}MB limit`)
        return
      }
      onFileSelect(file)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]
      if (maxSize && file.size > maxSize) {
        alert(`File size exceeds ${Math.round(maxSize / 1024 / 1024)}MB limit`)
        return
      }
      onFileSelect(file)
    }
  }

  return (
    <label
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={cn(
        'flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200',
        isDragging
          ? 'border-primary bg-primary/10'
          : 'border-border/50 hover:border-primary/50 hover:bg-card/50',
        isProcessing && 'pointer-events-none opacity-50'
      )}
    >
      <div className="flex flex-col items-center justify-center py-6">
        {isProcessing ? (
          <RefreshCw className="w-10 h-10 text-primary animate-spin mb-3" />
        ) : (
          <Upload className="w-10 h-10 text-muted-foreground mb-3" />
        )}
        <p className="text-sm font-medium text-foreground mb-1">{label}</p>
        <p className="text-xs text-muted-foreground">{sublabel}</p>
        {maxSize && (
          <p className="text-xs text-muted-foreground mt-2">
            Max size: {Math.round(maxSize / 1024 / 1024)}MB
          </p>
        )}
      </div>
      <input
        type="file"
        className="hidden"
        accept={accept}
        onChange={handleFileInput}
        disabled={isProcessing}
      />
    </label>
  )
}

// Output Display Component
export function OutputDisplay({
  value,
  isEmpty = false,
  emptyMessage = 'Output will appear here...',
  isCode = false,
  className,
}: {
  value: string | React.ReactNode
  isEmpty?: boolean
  emptyMessage?: string
  isCode?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        'min-h-[200px] p-4 rounded-lg bg-background/50 border border-border/50 overflow-auto',
        isCode && 'font-mono text-sm',
        isEmpty && 'flex items-center justify-center',
        className
      )}
    >
      {isEmpty ? (
        <p className="text-muted-foreground text-center">{emptyMessage}</p>
      ) : (
        <div className="whitespace-pre-wrap break-words">{value}</div>
      )}
    </div>
  )
}

// Result Stats Component
export function ResultStats({
  stats,
}: {
  stats: { label: string; value: string | number; highlight?: boolean }[]
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={cn(
            'p-4 rounded-lg text-center',
            stat.highlight
              ? 'bg-primary/10 border border-primary/30'
              : 'bg-card/50 border border-border/50'
          )}
        >
          <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
          <p
            className={cn(
              'text-2xl font-bold',
              stat.highlight ? 'text-primary' : 'text-foreground'
            )}
          >
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  )
}

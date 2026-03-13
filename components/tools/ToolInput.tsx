'use client'

import React from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface ToolInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  label?: string
  type?: 'text' | 'textarea'
  inputType?: 'number' | 'date' | 'text' | 'datetime-local'
  rows?: number
  className?: string
  disabled?: boolean
  maxLength?: number
  showCharCount?: boolean
}

export function ToolInput({
  value,
  onChange,
  placeholder = 'Enter your input here...',
  label,
  type = 'textarea',
  inputType = 'text',
  rows = 8,
  className,
  disabled = false,
  maxLength,
  showCharCount = false,
}: ToolInputProps) {
  return (
    <div className="space-y-2 w-full">
      {label && (
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-muted-foreground">
            {label}
          </label>
          {showCharCount && (
            <span className="text-xs text-muted-foreground">
              {value.length}{maxLength ? ` / ${maxLength}` : ''} characters
            </span>
          )}
        </div>
      )}
      {type === 'textarea' ? (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          disabled={disabled}
          maxLength={maxLength}
          className={cn(
            'tool-panel-input resize-none',
            className
          )}
        />
      ) : (
        <Input
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          className={cn(
            'calc-input',
            className
          )}
        />
      )}
    </div>
  )
}

// Number Input for Calculators
export function NumberInput({
  value,
  onChange,
  label,
  placeholder,
  min,
  max,
  step = 1,
  prefix,
  suffix,
  className,
  disabled = false,
}: {
  value: string | number
  onChange: (value: string) => void
  label?: string
  placeholder?: string
  min?: number
  max?: number
  step?: number
  prefix?: string
  suffix?: string
  className?: string
  disabled?: boolean
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-muted-foreground">
          {label}
        </label>
      )}
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {prefix}
          </span>
        )}
        <Input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className={cn(
            'calc-input',
            prefix && 'pl-8',
            suffix && 'pr-12',
            className
          )}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
            {suffix}
          </span>
        )}
      </div>
    </div>
  )
}

// Date Input for Calculators
export function DateInput({
  value,
  onChange,
  label,
  placeholder,
  min,
  max,
  className,
  disabled = false,
}: {
  value: string
  onChange: (value: string) => void
  label?: string
  placeholder?: string
  min?: string
  max?: string
  className?: string
  disabled?: boolean
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-muted-foreground">
          {label}
        </label>
      )}
      <Input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        min={min}
        max={max}
        disabled={disabled}
        className={cn('calc-input', className)}
      />
    </div>
  )
}

// Select Input
export function SelectInput({
  value,
  onChange,
  options,
  label,
  placeholder,
  className,
  disabled = false,
}: {
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
  label?: string
  placeholder?: string
  className?: string
  disabled?: boolean
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-muted-foreground">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={cn('calc-select', className)}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

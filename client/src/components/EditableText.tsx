import React, { useState, useRef, useEffect } from 'react'

interface EditableTextProps {
  value: string
  onChange: (newValue: string) => void
  multiline?: boolean
  className?: string // Typography classes (e.g., text-[15px] font-bold)
  placeholder?: string
}

export const EditableText: React.FC<EditableTextProps> = ({
  value,
  onChange,
  multiline = false,
  className = '',
  placeholder = 'Click to edit...',
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [tempValue, setTempValue] = useState(value)
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  // Focus the input automatically when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  const handleBlur = () => {
    setIsEditing(false)
    onChange(tempValue)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      handleBlur()
    }
    if (e.key === 'Escape') {
      setTempValue(value) // Revert changes
      setIsEditing(false)
    }
  }

  // Common styles to ensure the input looks like the text it replaces
  const sharedClasses = `bg-transparent border-none outline-none ring-0 p-0 m-0 w-full resize-none ${className}`

  if (isEditing) {
    return multiline ? (
      <textarea
        ref={inputRef as React.RefObject<HTMLTextAreaElement>}
        value={tempValue}
        onChange={(e) => setTempValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={sharedClasses}
        rows={Math.max(1, tempValue.split('\n').length)}
      />
    ) : (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type="text"
        value={tempValue}
        onChange={(e) => setTempValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={sharedClasses}
      />
    )
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      className={`cursor-text hover:bg-black/5 rounded px-1 -mx-1 transition-colors ${className} ${!value ? 'italic opacity-50' : ''}`}
    >
      {value || placeholder}
    </div>
  )
}

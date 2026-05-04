/* client/src/components/EditableText.tsx */
import React, { useState, useRef, useEffect } from 'react'

interface EditableTextProps {
  value: string
  onChange: (newValue: string) => void
  multiline?: boolean
  className?: string
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
    if (e.key === 'Enter' && !multiline) handleBlur()
    if (e.key === 'Escape') {
      setTempValue(value)
      setIsEditing(false)
    }
  }

  // FORCE INHERITANCE: added 'text-[inherit]' and 'placeholder:opacity-30'
  const sharedClasses = `bg-transparent border-none outline-none ring-0 p-0 m-0 w-full resize-none text-[inherit] font-[inherit] ${className}`

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
      /* HOVER UPDATE: Use white/10 for sidebar visibility and black/5 for main content */
      className={`cursor-text hover:bg-current/10 rounded px-1 -mx-1 transition-colors min-h-[1.2em] ${className} ${!value ? 'italic opacity-50' : ''}`}
    >
      {value || placeholder}
    </div>
  )
}

/* client/src/components/EditableText.tsx */
import React, { useState, useRef, useEffect } from 'react'

interface EditableTextProps {
  value: string
  onChange: (newValue: string) => void
  multiline?: boolean
  autoWidth?: boolean // New prop to enable fit-to-content for inputs
  className?: string
  placeholder?: string
}

export const EditableText: React.FC<EditableTextProps> = ({
  value,
  onChange,
  multiline = false,
  autoWidth = false,
  className = '',
  placeholder = 'Click to edit...',
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [tempValue, setTempValue] = useState(value)
  const [inputWidth, setInputWidth] = useState('auto')

  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)
  const spanRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()

      // Handle Auto-Height for Textareas
      if (multiline) {
        inputRef.current.style.height = 'auto'
        inputRef.current.style.height = `${inputRef.current.scrollHeight}px`
      }

      // Handle Auto-Width for Inputs
      if (!multiline && autoWidth && spanRef.current) {
        // The +2 offset provides a tiny bit of cursor breathing room
        setInputWidth(`${spanRef.current.offsetWidth + 2}px`)
      }
    }
  }, [isEditing, tempValue, multiline, autoWidth])

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

  // Removed 'w-full' to allow fit-to-content when autoWidth is active
  const sharedClasses = `
    appearance-none border-none outline-none ring-0 
    p-0 m-0 resize-none bg-black/5 
    text-[inherit] font-[inherit] leading-[inherit] 
    overflow-hidden rounded-sm ${!autoWidth ? 'w-full' : ''} ${className}
  `

  if (isEditing) {
    return (
      <>
        {/* Hidden mirror element for width calculation */}
        {!multiline && autoWidth && (
          <span
            ref={spanRef}
            className={`absolute invisible whitespace-pre ${className}`}
            style={{ font: 'inherit', letterSpacing: 'inherit' }}
          >
            {tempValue || placeholder}
          </span>
        )}

        {multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={sharedClasses}
            style={{ padding: 0 }}
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
            style={{ padding: 0, width: autoWidth ? inputWidth : '100%' }}
          />
        )}
      </>
    )
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      className={`
        cursor-text transition-colors min-h-[1.2em] whitespace-pre-wrap 
        p-0 m-0 ${className} 
        ${!value ? 'italic opacity-50' : ''} 
        hover:bg-current/5 rounded-sm ${autoWidth ? 'inline-block' : 'w-full'}
      `}
    >
      {value || placeholder}
    </div>
  )
}

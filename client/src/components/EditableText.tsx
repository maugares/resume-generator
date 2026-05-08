/* client/src/components/EditableText.tsx */
import React, { useState, useRef, useEffect } from 'react'

interface EditableTextProps {
  value: string
  onChange: (newValue: string) => void
  className?: string
  placeholder?: string
}

export const EditableText: React.FC<EditableTextProps> = ({
  value,
  onChange,
  className = '',
  placeholder = 'Click to edit...',
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isEditing && divRef.current) {
      divRef.current.focus()
      // Place cursor at end
      const range = document.createRange()
      const sel = window.getSelection()
      range.selectNodeContents(divRef.current)
      range.collapse(false)
      sel?.removeAllRanges()
      sel?.addRange(range)
    }
  }, [isEditing])

  const handleBlur = () => {
    setIsEditing(false)
    onChange(divRef.current?.innerText ?? value)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (divRef.current) divRef.current.innerText = value
      setIsEditing(false)
    }
  }

  const sharedClasses = `outline-none w-full text-[inherit] font-[inherit] leading-[inherit] whitespace-pre-wrap break-words ${className}`

  if (isEditing) {
    return (
      <div
        ref={divRef}
        contentEditable
        suppressContentEditableWarning
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`${sharedClasses} bg-current/10`}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: value }}
      />
    )
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      className={`cursor-text hover:bg-current/10 rounded transition-colors min-h-[1.2em] whitespace-pre-wrap ${className} ${!value ? 'italic opacity-50' : ''}`}
    >
      {value || placeholder}
    </div>
  )
}

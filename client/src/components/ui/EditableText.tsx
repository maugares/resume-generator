import { useState, useRef, useLayoutEffect } from 'react'

interface EditableTextProps {
  value: string
  onChange: (newValue: string) => void
  className?: string
  placeholder?: string
  onKeyDown?: (
    e: React.KeyboardEvent<HTMLDivElement>,
    currentText: string
  ) => void
}

export function EditableText({
  value,
  onChange,
  className = '',
  placeholder = 'Click to edit...',
  onKeyDown,
}: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false)
  const divRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (isEditing && divRef.current) {
      divRef.current.innerText = value
      divRef.current.focus()
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(e, divRef.current?.innerText ?? value)

    if (e.defaultPrevented) {
      return
    }

    if (e.key === 'Tab') {
      e.preventDefault()

      const editableFields = Array.from(
        document.querySelectorAll<HTMLElement>('[data-editable-field="true"]')
      )
      const currentIndex = editableFields.findIndex(
        (field) => field === e.currentTarget
      )

      if (currentIndex === -1) {
        return
      }

      const nextIndex = e.shiftKey ? currentIndex - 1 : currentIndex + 1
      const nextField = editableFields[nextIndex]

      if (!nextField) {
        return
      }

      requestAnimationFrame(() => {
        nextField.click()
      })

      return
    }

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
        data-editable-field="true"
        contentEditable
        suppressContentEditableWarning
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`${sharedClasses} bg-current/10`}
      />
    )
  }

  return (
    <div
      data-editable-field="true"
      onClick={() => setIsEditing(true)}
      className={`cursor-text hover:bg-current/10 rounded transition-colors min-h-[1.2em] whitespace-pre-wrap ${className} ${!value ? 'italic opacity-50' : ''}`}
    >
      {value || placeholder}
    </div>
  )
}

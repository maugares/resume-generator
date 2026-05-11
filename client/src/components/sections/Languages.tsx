import { useEffect, useState } from 'react'
import { EditableText, Header, AddButton } from '../ui'
import { useResumeContext } from '../../context'

const getLanguageLines = (languages: string[]) => {
  return languages.length > 0 ? languages : ['']
}

export function Languages() {
  const { formData, updateArrayItem, addArrayItem, removeArrayItem } =
    useResumeContext()
  const [pendingFocusIndex, setPendingFocusIndex] = useState<number | null>(
    null
  )

  const insertAfter = (index: number) => {
    const lines = getLanguageLines(formData.languages)
    const insertIndex = index + 1

    addArrayItem('languages')

    for (let i = lines.length - 1; i >= insertIndex; i -= 1) {
      updateArrayItem('languages', i + 1, lines[i])
    }

    updateArrayItem('languages', insertIndex, '')
    setPendingFocusIndex(insertIndex)
  }

  const removeAt = (index: number) => {
    if (index === 0) {
      updateArrayItem('languages', 0, '')
      return
    }

    removeArrayItem('languages', index)
    setPendingFocusIndex(index - 1)
  }

  useEffect(() => {
    if (pendingFocusIndex === null) {
      return
    }

    const target = document.querySelector<HTMLElement>(
      `[data-language-index="${pendingFocusIndex}"] [data-editable-field="true"]`
    )

    if (!target) {
      return
    }

    target.click()
    setPendingFocusIndex(null)
  }, [pendingFocusIndex, formData.languages])

  return (
    <section>
      <Header title="Languages" />
      <ul className="list-disc pl-5 space-y-1 text-gray-100 text-[13px] leading-relaxed">
        {getLanguageLines(formData.languages).map((language, lineIndex) => (
          <li key={lineIndex} data-language-index={lineIndex}>
            <EditableText
              value={language}
              onChange={(value) =>
                updateArrayItem('languages', lineIndex, value)
              }
              onKeyDown={(e, currentText) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  insertAfter(lineIndex)
                }

                if (e.key === 'Backspace' && currentText.trim() === '') {
                  e.preventDefault()
                  removeAt(lineIndex)
                }
              }}
            />
          </li>
        ))}
      </ul>
      <div className="mt-3">
        <AddButton
          addArrayItem={addArrayItem}
          field="languages"
          variant="dark"
        />
      </div>
    </section>
  )
}

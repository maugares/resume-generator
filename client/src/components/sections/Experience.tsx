import { useEffect, useState } from 'react'
import { EditableText, Header, AddButton, EntryActionMenu } from '../ui'
import { useResumeContext } from '../../context'
import type { ExperienceItem } from '../../types'

interface ExperienceProps {
  items?: ExperienceItem[]
  itemIndexes?: number[]
  showAddButton?: boolean
  showHeader?: boolean
}

export function Experience({
  items,
  itemIndexes,
  showAddButton = true,
  showHeader = true,
}: ExperienceProps = {}) {
  const { formData, removeArrayItem, updateArrayItem, addArrayItem } =
    useResumeContext()

  const experienceItems = items ?? formData.experience
  const [pendingFocus, setPendingFocus] = useState<{
    sourceIndex: number
    lineIndex: number
  } | null>(null)

  useEffect(() => {
    if (!pendingFocus) {
      return
    }

    const target = document.querySelector<HTMLElement>(
      `[data-exp-index="${pendingFocus.sourceIndex}"][data-line-index="${pendingFocus.lineIndex}"] [data-editable-field="true"]`
    )

    if (!target) {
      return
    }

    target.click()
    setPendingFocus(null)
  }, [pendingFocus, formData.experience])

  const getDescriptionLines = (description: string[]) => {
    return description.length > 0 ? description : ['']
  }

  const updateDescriptionLine = (
    description: string[],
    index: number,
    value: string
  ) => {
    const lines = [...getDescriptionLines(description)]
    lines[index] = value
    return lines
  }

  const insertDescriptionLine = (description: string[], index: number) => {
    const lines = [...getDescriptionLines(description)]
    lines.splice(index + 1, 0, '')
    return lines
  }

  const removeDescriptionLine = (description: string[], index: number) => {
    const lines = [...getDescriptionLines(description)]
    lines.splice(index, 1)
    return lines.length > 0 ? lines : ['']
  }

  const insertEntryAbove = (insertIndex: number) => {
    const existingItems = [...formData.experience]

    addArrayItem('experience')

    for (let i = existingItems.length - 1; i >= insertIndex; i -= 1) {
      updateArrayItem('experience', i + 1, existingItems[i])
    }

    updateArrayItem('experience', insertIndex, {
      position: '',
      company: '',
      startDate: '',
      endDate: '',
      description: [''],
    })
  }

  return (
    <section>
      {showHeader && <Header title="Experience" />}
      <div className="space-y-10">
        {experienceItems.map((exp, i) => {
          if (!exp) {
            return null
          }

          const sourceIndex = itemIndexes?.[i] ?? i

          return (
            <div key={i} className="relative group">
              <EntryActionMenu
                onAddAbove={() => insertEntryAbove(sourceIndex)}
                onRemove={() => removeArrayItem('experience', sourceIndex)}
              />
              <div className="flex justify-between items-baseline mb-1">
                <EditableText
                  value={exp.position}
                  onChange={(v) =>
                    updateArrayItem('experience', sourceIndex, {
                      ...exp,
                      position: v,
                    })
                  }
                  className="text-[16px] leading-tight font-bold"
                />
                <div className="flex gap-1 text-[16px] leading-tight text-black font-medium">
                  <EditableText
                    value={exp.startDate}
                    onChange={(v) =>
                      updateArrayItem('experience', sourceIndex, {
                        ...exp,
                        startDate: v,
                      })
                    }
                  />
                  <span>-</span>
                  <EditableText
                    value={exp.endDate}
                    onChange={(v) =>
                      updateArrayItem('experience', sourceIndex, {
                        ...exp,
                        endDate: v,
                      })
                    }
                  />
                </div>
              </div>
              <EditableText
                value={exp.company}
                onChange={(v) =>
                  updateArrayItem('experience', sourceIndex, {
                    ...exp,
                    company: v,
                  })
                }
                className="text-[15px] leading-tight text-black italic mb-3"
              />
              <ul className="list-disc pl-5 space-y-0.5 text-[16px] leading-[1.25] text-black">
                {getDescriptionLines(exp.description).map((line, lineIndex) => (
                  <li
                    key={lineIndex}
                    data-exp-index={sourceIndex}
                    data-line-index={lineIndex}
                    className="hover:bg-white/5 rounded transition-colors"
                  >
                    <EditableText
                      value={line}
                      className="leading-[1.25]"
                      onChange={(v) =>
                        updateArrayItem('experience', sourceIndex, {
                          ...exp,
                          description: updateDescriptionLine(
                            exp.description,
                            lineIndex,
                            v
                          ),
                        })
                      }
                      onKeyDown={(e, currentText) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          updateArrayItem('experience', sourceIndex, {
                            ...exp,
                            description: insertDescriptionLine(
                              exp.description,
                              lineIndex
                            ),
                          })
                          setPendingFocus({
                            sourceIndex,
                            lineIndex: lineIndex + 1,
                          })
                        }

                        if (
                          e.key === 'Backspace' &&
                          currentText.trim() === ''
                        ) {
                          e.preventDefault()

                          if (lineIndex === 0) {
                            updateArrayItem('experience', sourceIndex, {
                              ...exp,
                              description: [''],
                            })
                            return
                          }

                          updateArrayItem('experience', sourceIndex, {
                            ...exp,
                            description: removeDescriptionLine(
                              exp.description,
                              lineIndex
                            ),
                          })
                          setPendingFocus({
                            sourceIndex,
                            lineIndex: lineIndex - 1,
                          })
                        }
                      }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
        {showAddButton && (
          <AddButton addArrayItem={addArrayItem} field="experience" />
        )}
      </div>
    </section>
  )
}

import { EditableText, Header, AddButton, RemoveButton } from '../ui'
import { useResumeContext } from '../../context'

export function Experience() {
  const { formData, removeArrayItem, updateArrayItem, addArrayItem } =
    useResumeContext()

  const getDescriptionLines = (description: string) => {
    const lines = description.split('\n').map((line) => line.trim())
    const nonEmptyLines = lines.filter((line) => line.length > 0)
    return nonEmptyLines.length > 0 ? nonEmptyLines : ['']
  }

  const updateDescriptionLine = (
    description: string,
    index: number,
    value: string
  ) => {
    const lines = getDescriptionLines(description)
    lines[index] = value
    return lines.filter((line) => line.trim().length > 0).join('\n')
  }

  return (
    <section>
      <Header title="Experience" />
      <div className="space-y-10">
        {formData.experience.map((exp, i) => (
          <div key={i} className="relative group">
            <RemoveButton
              removeArrayItem={removeArrayItem}
              index={i}
              field="experience"
            />
            <div className="flex justify-between items-baseline mb-1">
              <EditableText
                value={exp.position}
                onChange={(v) =>
                  updateArrayItem('experience', i, {
                    ...exp,
                    position: v,
                  })
                }
                className="text-[15px] font-bold"
              />
              <div className="flex gap-1 italic text-gray-400 font-medium">
                <EditableText
                  value={exp.startDate}
                  onChange={(v) =>
                    updateArrayItem('experience', i, { ...exp, startDate: v })
                  }
                />
                <span>-</span>
                <EditableText
                  value={exp.endDate}
                  onChange={(v) =>
                    updateArrayItem('experience', i, { ...exp, endDate: v })
                  }
                />
              </div>
            </div>
            <EditableText
              value={exp.company}
              onChange={(v) =>
                updateArrayItem('experience', i, { ...exp, company: v })
              }
              className="text-gray-500 italic mb-3"
            />
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              {getDescriptionLines(exp.description).map((line, lineIndex) => (
                <li key={lineIndex}>
                  <EditableText
                    value={line}
                    onChange={(v) =>
                      updateArrayItem('experience', i, {
                        ...exp,
                        description: updateDescriptionLine(
                          exp.description,
                          lineIndex,
                          v
                        ),
                      })
                    }
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
        <AddButton addArrayItem={addArrayItem} field="experience" />
      </div>
    </section>
  )
}

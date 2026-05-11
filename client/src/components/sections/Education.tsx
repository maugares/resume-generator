import { EditableText, AddButton, Header, EntryActionMenu } from '../ui'
import { useResumeContext } from '../../context'

export function Education() {
  const { formData, removeArrayItem, updateArrayItem, addArrayItem } =
    useResumeContext()

  const insertEntryAbove = (insertIndex: number) => {
    const existingItems = [...formData.education]

    addArrayItem('education')

    for (let i = existingItems.length - 1; i >= insertIndex; i -= 1) {
      updateArrayItem('education', i + 1, existingItems[i])
    }

    updateArrayItem('education', insertIndex, {
      degree: '',
      institution: '',
      startDate: '',
      endDate: '',
    })
  }

  return (
    <section>
      <Header title="Education" />
      <div className="space-y-6">
        {formData.education.map((edu, i) => (
          <div key={i} className="relative group text-gray-100">
            <EntryActionMenu
              onAddAbove={() => insertEntryAbove(i)}
              onRemove={() => removeArrayItem('education', i)}
            />
            <EditableText
              value={edu.degree}
              onChange={(v) =>
                updateArrayItem('education', i, { ...edu, degree: v })
              }
              className="font-bold leading-tight"
            />
            <EditableText
              value={edu.institution}
              onChange={(v) =>
                updateArrayItem('education', i, {
                  ...edu,
                  institution: v,
                })
              }
              className="text-gray-300 text-[12px] italic"
            />
            <div className="flex gap-1 text-gray-400 text-[11px]">
              <EditableText
                value={edu.startDate}
                onChange={(v) =>
                  updateArrayItem('education', i, { ...edu, startDate: v })
                }
              />
              <span>-</span>
              <EditableText
                value={edu.endDate}
                onChange={(v) =>
                  updateArrayItem('education', i, { ...edu, endDate: v })
                }
              />
            </div>
          </div>
        ))}
        <AddButton
          addArrayItem={addArrayItem}
          field="education"
          variant="dark"
        />
      </div>
    </section>
  )
}

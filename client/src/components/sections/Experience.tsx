import { EditableText, Header, AddButton, RemoveButton } from '../ui'
import { useResumeContext } from '../../context'

export function Experience() {
  const { formData, removeArrayItem, updateArrayItem, addArrayItem } =
    useResumeContext()

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
                className="text-[15px] font-bold uppercase"
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
            <EditableText
              value={exp.description}
              onChange={(v) =>
                updateArrayItem('experience', i, {
                  ...exp,
                  description: v,
                })
              }
              className="text-gray-700"
            />
          </div>
        ))}
        <AddButton addArrayItem={addArrayItem} field="experience" />
      </div>
    </section>
  )
}

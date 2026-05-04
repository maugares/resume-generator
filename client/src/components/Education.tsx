import type React from 'react'
import type { ResumeData } from '../types/resume'
import { EditableText } from './EditableText'
import { AddButton } from './AddButton'
import { RemoveButton } from './RemoveButton'
import { Header } from './Header'

export function Education({
  data,
  removeArrayItem,
  updateArrayItem,
  addArrayItem,
}: {
  data: ResumeData
  removeArrayItem: (field: any, index: number) => void
  updateArrayItem: (field: any, index: number, newItem: any) => void
  addArrayItem: (field: any) => void
}) {
  return (
    <section>
      <Header title="Education" />
      <div className="space-y-6">
        {data.education.map((edu, i) => (
          <div key={i} className="relative group text-gray-100">
            <RemoveButton
              removeArrayItem={removeArrayItem}
              index={i}
              field="education"
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
                  updateArrayItem('education', i, {
                    ...edu,
                    startDate: v,
                  })
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
        <AddButton addArrayItem={addArrayItem} field="education" />
      </div>
    </section>
  )
}

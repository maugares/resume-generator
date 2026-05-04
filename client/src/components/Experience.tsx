import type React from 'react'
import type { ResumeData } from '../types/resume'
import { EditableText } from './EditableText'
import { Header } from './Header'
import { AddButton } from './AddButton'
import { RemoveButton } from './RemoveButton'

export function Experience({
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
      <Header title="Experience" />
      <div className="space-y-10">
        {data.experience.map((exp, i) => (
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
              <div className="flex gap-1 text-[13px] italic text-gray-400 font-medium">
                <EditableText
                  value={exp.startDate}
                  autoWidth
                  onChange={(v) =>
                    updateArrayItem('experience', i, { ...exp, startDate: v })
                  }
                />
                <span>-</span>
                <EditableText
                  value={exp.endDate}
                  autoWidth
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
              className="text-[14px] text-gray-500 italic mb-3"
            />
            <EditableText
              value={exp.description}
              onChange={(v) =>
                updateArrayItem('experience', i, {
                  ...exp,
                  description: v,
                })
              }
              className="text-[13px] leading-[1.7] text-gray-700 leading-snug"
            />
          </div>
        ))}
        <AddButton addArrayItem={addArrayItem} field="experience" />
      </div>
    </section>
  )
}

import type React from 'react'
import type { ResumeData } from '../types/resume'
import { EditableText } from './EditableText'
import { Header } from './Header'

export function Skills({
  data,
  updateField,
}: {
  data: ResumeData
  updateField: (field: string, value: string) => void
}) {
  return (
    <div>
      <Header title="Skills" />
      <EditableText
        value={data.skills.join(', ')}
        onChange={(v) =>
          updateField(
            'skills',
            v.split(',').map((s) => s.trim())
          )
        }
        multiline
        placeholder="List your skills, separated by commas"
        className="text-[13px] leading-snug"
      />
    </div>
  )
}

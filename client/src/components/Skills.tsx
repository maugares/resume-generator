/* client/src/components/Skills.tsx */
import type React from 'react'
import type { ResumeData } from '../types/resume'
import { EditableText } from './EditableText'
import { Header } from './Header'

export function Skills({
  data,
  updateField,
}: {
  data: ResumeData
  updateField: (field: string, value: any) => void
}) {
  return (
    <section>
      <Header title="Skills" />
      <EditableText
        value={data.skills} // Pass the string directly
        onChange={(v) => updateField('skills', v)} // useResume handleChange handles strings
        multiline
        placeholder="Design, Development, UI/UX..."
        className="text-[13px] leading-relaxed text-gray-100"
      />
    </section>
  )
}
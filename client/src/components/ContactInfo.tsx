import type React from 'react'
import type { ResumeData } from '../types/resume'
import { EditableText } from './EditableText'

export function ContactInfo({
  data,
  updateField,
}: {
  data: ResumeData
  updateField: (field: string, value: string) => void
}) {
  return (
    <section>
      <h3 className="text-[14px] font-bold uppercase border-b border-white/20 pb-2 mb-4 tracking-[1px]">
        Contact
      </h3>
      <div className="space-y-1">
        <EditableText
          value={data.phone}
          onChange={(v) => updateField('phone', v)}
          placeholder="Phone"
        />
        <EditableText
          value={data.email}
          onChange={(v) => updateField('email', v)}
          placeholder="Email"
          className="break-all"
        />
        <EditableText
          value={data.address}
          onChange={(v) => updateField('address', v)}
          placeholder="Address"
          multiline
        />
      </div>
    </section>
  )
}

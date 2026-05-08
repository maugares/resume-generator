import type React from 'react'
import type { ResumeData } from '../types/resume'
import { EditableText } from './EditableText'
import { Header } from './Header'

export function ContactInfo({
  data,
  updateField,
}: {
  data: ResumeData
  updateField: (field: string, value: string) => void
}) {
  return (
    <section>
      <Header title="Contact" />
      <div className="space-y-2">
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
        />
      </div>
    </section>
  )
}

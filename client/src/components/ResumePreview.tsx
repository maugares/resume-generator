import React from 'react'
import { EditableText } from './EditableText'
import type { ResumeData } from '../types/resume'
import { ContactInfo } from './ContactInfo'
import { Education } from './Education'
import { Experience } from './Experience'
import { Avatar } from './Avatar'
import { Skills } from './Skills'

interface Props {
  data: ResumeData
  updateField: (field: string, value: string) => void
  updateArrayItem: (field: any, index: number, newItem: any) => void
  addArrayItem: (field: any) => void
  removeArrayItem: (field: any, index: number) => void
}

export const ResumePreview = ({
  data,
  updateField,
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
}: Props) => {
  return (
    <div className="flex justify-center p-10 min-h-screen">
      <article
        id="resume-document"
        className="flex w-a4 min-h-a4 bg-white shadow-2xl font-sans print:m-0 print:shadow-none"
      >
        <aside className="w-[33%] bg-resume-slate text-white px-8 py-12 flex flex-col gap-10 text-[13px]">
          <Avatar />
          <ContactInfo data={data} updateField={updateField} />
          <Education
            data={data}
            removeArrayItem={removeArrayItem}
            updateArrayItem={updateArrayItem}
            addArrayItem={addArrayItem}
          />
          <Skills data={data} updateField={updateField} />
        </aside>

        <main className="flex-1 p-14 text-resume-slate">
          <EditableText
            value={data.name}
            onChange={(v) => updateField('name', v)}
            className="text-[42px] font-extrabold uppercase mb-12 tracking-tight"
            placeholder="YOUR NAME"
          />

          <Experience
            data={data}
            removeArrayItem={removeArrayItem}
            updateArrayItem={updateArrayItem}
            addArrayItem={addArrayItem}
          />
        </main>
      </article>
    </div>
  )
}

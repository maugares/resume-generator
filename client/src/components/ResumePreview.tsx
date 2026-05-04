import React from 'react'
import { EditableText } from './EditableText'
import type { ResumeData } from '../types/resume'

interface Props {
  data: ResumeData
  updateField: (field: keyof ResumeData, value: string) => void
  updateArrayItem: (
    field: 'experience' | 'education' | 'skills',
    index: number,
    newItem: any
  ) => void
}

export const ResumePreview = ({
  data,
  updateField,
  updateArrayItem,
}: Props) => {
  return (
    <div className="flex justify-center bg-gray p-10 min-h-screen">
      <article
        id="resume-document"
        className="flex w-a4 min-h-a4 bg-white shadow-2xl font-sans print:m-0 print:shadow-none"
      >
        {/* SIDEBAR */}
        <aside className="w-[33%] bg-resume-slate text-white px-8 py-12 flex flex-col gap-10 text-[13px]">
          <Picture />
          <ContactInfo data={data} updateField={updateField} />
          <Education data={data} updateArrayItem={updateArrayItem} />
          <Skills data={data} updateArrayItem={updateArrayItem} />
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-14 text-resume-slate">
          <EditableText
            value={data.name}
            onChange={(v) => updateField('name', v)}
            className="text-[42px] font-extrabold uppercase leading-[1.1] mb-12 tracking-tight"
            placeholder="YOUR NAME"
          />
          <Experience data={data} updateArrayItem={updateArrayItem} />
        </main>
      </article>
    </div>
  )
}

function Header({ headerText }: { headerText: string }) {
  return (
    <h3 className="text-[14px] font-bold uppercase border-b border-white/20 pb-2 mb-[1em] tracking-[1px]">
      {headerText}
    </h3>
  )
}

function Picture() {
  return (
    <div className="w-32 h-32 bg-[#777] rounded-full mx-auto border-4 border-white/10" />
  )
}

function ContactInfo({
  data,
  updateField,
}: {
  data: ResumeData
  updateField: any
}) {
  return (
    <section>
      <Header headerText="Contact" />
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

function Education({
  data,
  updateArrayItem,
}: {
  data: ResumeData
  updateArrayItem: any
}) {
  return (
    <section className="mb-1">
      <Header headerText="Education" />
      <div className="space-y-6">
        {data.education.map((edu, i) => (
          <div key={i} className="text-[13px] text-gray-100">
            <EditableText
              value={edu.degree}
              onChange={(v) =>
                updateArrayItem('education', i, { ...edu, degree: v })
              }
              className="font-bold  leading-tight"
            />
            <EditableText
              value={edu.institution}
              onChange={(v) =>
                updateArrayItem('education', i, { ...edu, institution: v })
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
      </div>
    </section>
  )
}

function Experience({
  data,
  updateArrayItem,
}: {
  data: ResumeData
  updateArrayItem: any
}) {
  return (
    <section>
      <Header headerText="Experience" />
      <div className="space-y-10">
        {data.experience.map((exp, i) => (
          <div key={i}>
            <div className="flex justify-between items-baseline mb-1">
              <EditableText
                value={exp.position}
                onChange={(v) =>
                  updateArrayItem('experience', i, { ...exp, position: v })
                }
                className="text-[15px] font-bold uppercase"
              />
              <div className="flex gap-1 text-[13px] italic text-gray-400 font-medium">
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
              className="text-[14px] text-gray-500 italic mb-3 font-medium"
            />
            <EditableText
              value={exp.description}
              onChange={(v) =>
                updateArrayItem('experience', i, { ...exp, description: v })
              }
              className="text-[13px] leading-[1.7] text-gray-700"
              multiline
            />
          </div>
        ))}
      </div>
    </section>
  )
}

function Skills({
  data,
  updateArrayItem,
}: {
  data: ResumeData
  updateArrayItem: any
}) {
  return (
    <section>
      <Header headerText="Skills" />
      <ul className="list-disc list-inside">
        {data.skills.map((s, i) => (
          <li key={i}>
            <EditableText
              value={s}
              onChange={(v) => updateArrayItem('skills', i, v)}
              className="inline leading-relaxed"
            />
          </li>
        ))}
      </ul>
    </section>
  )
}

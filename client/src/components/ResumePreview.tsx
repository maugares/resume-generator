import React from 'react'
import type { ResumeData } from '../types/resume'

interface Props {
  data: ResumeData
}

export const ResumePreview = ({ data }: Props) => {
  
  return (
    <div className="flex justify-center bg-gray p-10 min-h-screen">
      <article
        id="resume-document"
        className="flex w-a4 min-h-a4 bg-white shadow-2xl font-sans print:m-0 print:shadow-none"
      >
        <aside className="w-[33%] bg-side text-white px-8 py-12 flex flex-col gap-10 text-[13px]">
          <Picture />
          <ContactInfo data={data} />
          <Education data={data} />
          <Skills data={data} />
        </aside>

        <main className="flex-1 p-14 text-resume-slate">
          <h1 className="text-[42px] font-extrabold uppercase leading-[1.1] mb-12 tracking-tight">
            {data.name || 'YOUR NAME'}
          </h1>

          <Experience data={data} />
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

function ContactInfo({ data }: { data: ResumeData }) {
  return (
    <section>
      <Header headerText="Contact" />
      <div className="space-y-1">
        <div>{data.phone}</div>
        <div className="break-all">{data.email}</div>
        <div>{data.address}</div>
      </div>
    </section>
  )
}

function Education({ data }: { data: ResumeData }) {
  return (
    <section className="mb-1">
      <Header headerText="Education" />
      <div className="space-y-6">
        {data.education.map((edu, i) => (
          <div key={i} className="text-[13px] text-gray-100">
            {/* Degree Title - Bold and White */}
            <div className="font-bold leading-tight mb-1">{edu.degree}</div>
            {/* Institution - Gray/Italic */}
            <div className="text-gray-400 text-[12px] italic">
              {edu.institution}
            </div>
            {/* Date - Now on its own line below, matching the original look */}
            <div className="text-gray-400 text-[11px] mt-0.5">
              {edu.startDate} - {edu.endDate}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Experience({ data }: { data: ResumeData }) {
  return (
    <section>
      <Header headerText="Experience" />
      <div className="space-y-10">
        {data.experience.map((exp, i) => (
          <div key={i}>
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-[15px] font-bold uppercase">
                {exp.position}
              </span>
              <span className="text-[13px] italic text-gray-400 font-medium">
                {exp.startDate} - {exp.endDate}
              </span>
            </div>
            <div className="text-[14px] text-gray-500 italic mb-3 font-medium">
              {exp.company}
            </div>
            <p className="text-[13px] leading-[1.7] text-gray-700">
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Skills({ data }: { data: ResumeData }) {
  return (
    <section>
      <Header headerText="Skills" />
      <ul>
        {data.skills.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
    </section>
  )
}

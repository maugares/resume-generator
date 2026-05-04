// Create a ResumePreview component in React that uses the same .page, .sidebar, and .main classes as the PDF.
import React from 'react'
import type { ResumeData } from '../types/resume'
import '../styles/ResumePreview.css'

interface Props {
  resumeData: ResumeData
}

export const ResumePreview = ({ data }: Props) => {
  // data = mockResumeData
  return (
    <div className="preview-window">
      <article className="resume-paper">
        <aside className="sidebar">
          <div className="profile-photo" />
          <ContactInfo data={data} />
          <Education data={data} />
          <Skills data={data} />
        </aside>

        <main className="main-content">
          <h1>{data.name || 'YOUR NAME'}</h1>
          <p className="summary">{data.summary}</p>
          <Experience data={data} />
        </main>
      </article>
    </div>
  )
}

function Header({ headerText }: { headerText: string }) {
  return (
    <h3 className="section-header">
      {headerText}
    </h3>
  )
}

function ContactInfo({ data }: { data: ResumeData }) {
  return (
    <section>
      <Header headerText="Contact" />
      <div>{data.phone}</div>
      <div>{data.email}</div>
      <div>{data.address}</div>
    </section>
  )
}

function Education({ data }: { data: ResumeData }) {
  return (
    <section>
      <Header headerText="Education" />
      {data.education.map((edu, i) => (
        <div key={i} style={{ marginBottom: '15px' }}>
          <strong>{edu.degree}</strong>
          <div>{edu.institution}</div>
          <div>
            {edu.startDate} - {edu.endDate}
          </div>
        </div>
      ))}
    </section>
  )
}

function Experience({ data }: { data: ResumeData }) {
  return (
    <section>
      <Header headerText="Experience" />
      {data.experience.map((exp, i) => (
        <div key={i} style={{ marginBottom: '15px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <strong>{exp.position}</strong>
            <span>
              {exp.startDate} - {exp.endDate}
            </span>
          </div>
          <div>{exp.company}</div>
          <p>{exp.description}</p>
        </div>
      ))}
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

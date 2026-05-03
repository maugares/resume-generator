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
          {renderContactInfo(data)}
          {renderEducation(data)}
          {renderSkills(data)}
        </aside>

        <main className="main-content">
          <h1>{data.name || 'YOUR NAME'}</h1>
          <p className="summary">{data.summary}</p>
          {renderExperience(data)}
        </main>
      </article>
    </div>
  )
}

function renderContactInfo(data: any) {
  return (
    <section>
      <h3>CONTACT</h3>
      <div>{data.phone}</div>
      <div>{data.email}</div>
      <div>{data.address}</div>
    </section>
  )
}

function renderEducation(data: any) {
  return (
    <section>
      <h3>EDUCATION</h3>
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

function renderExperience(data: any) {
  return (
    <section>
      <h3>EXPERIENCE</h3>
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

function renderSkills(data: any) {
  return (
    <section>
      <h3>SKILLS</h3>
      <ul>
        {data.skills.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
    </section>
  )
}

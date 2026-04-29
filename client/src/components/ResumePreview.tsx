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
          <section>
            <h3>CONTACT</h3>
            <p>{data.phone}</p>
            <p>{data.email}</p>
            <p>{data.address}</p>
          </section>
          <section>
            <h3>SKILLS</h3>
            <ul>
              {data.skills.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </section>
        </aside>

        <main className="main-content">
          <h1>{data.name || 'YOUR NAME'}</h1>
          <p className="summary">{data.summary}</p>

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
        </main>
      </article>
    </div>
  )
}

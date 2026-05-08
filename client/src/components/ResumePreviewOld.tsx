// Create a ResumePreview component in React that uses the same .page, .sidebar, and .main classes as the PDF.
import type { ResumeData } from '../types/resume'
import '../styles/ResumePreview.css'

interface Props {
  resumeData: ResumeData
}

export const ResumePreview = ({ resumeData }: Props) => {
  // data = mockResumeData
  return (
    <div className="preview-window">
      <article className="resume-paper">
        <aside className="sidebar">
          <div className="profile-photo" />
          <ContactInfo data={resumeData} />
          <Education data={resumeData} />
          <Skills data={resumeData} />
        </aside>

        <main className="main-content">
          <h1>{resumeData.name || 'YOUR NAME'}</h1>
          <p className="summary">{resumeData.summary}</p>
          <Experience data={resumeData} />
        </main>
      </article>
    </div>
  )
}

function Header({ headerText }: { headerText: string }) {
  return <h3 className="section-header">{headerText}</h3>
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
      <p>{data.skills}</p>
    </section>
  )
}

import { ChangeEvent, FormEvent } from 'react'
import { ResumeData } from '../types/resume'

interface Props {
  formData: ResumeData
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onSubmit: (e: FormEvent) => void
}

export const ResumeForm = ({ formData, onChange, onSubmit }: Props) => {
  return (
    <form onSubmit={onSubmit} className="resume-form">
      <div>
        <label>Full Name</label>
        <input name="name" value={formData.name} onChange={onChange} required />
      </div>
      <div>
        <label>Email</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={onChange}
          required
        />
      </div>
      <div>
        <label>Experience</label>
        <textarea
          name="experience"
          value={formData.experience}
          onChange={onChange}
        />
      </div>
      <button type="submit">Download PDF</button>
    </form>
  )
}

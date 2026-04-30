// client/src/components/ResumeForm.tsx
import React from 'react'
import type { ResumeData, ExperienceItem, EducationItem } from '../types/resume'

interface ResumeFormProps {
  formData: ResumeData
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  updateArrayItem: (field: keyof ResumeData, index: number, value: any) => void
  addArrayItem: (field: keyof ResumeData, newItem: any) => void
  removeArrayItem: (field: keyof ResumeData, index: number) => void
  onSubmit: (e: React.FormEvent) => void
}

export const ResumeForm = ({
  formData,
  handleChange,
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
  onSubmit,
}: ResumeFormProps) => {
  return (
    <form onSubmit={onSubmit} className="resume-form">
      {/* BASIC INFO */}
      <section>
        <h3>Personal Details</h3>
        <input
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />
        <textarea
          name="summary"
          placeholder="Professional Summary"
          value={formData.summary}
          onChange={handleChange}
        />
      </section>

      {/* EXPERIENCE SECTION */}
      <section>
        <h3>Experience</h3>
        {formData.experience.map((exp, index) => (
          <div key={index} className="item-card">
            <input
              placeholder="Company"
              value={exp.company}
              onChange={(e) =>
                updateArrayItem('experience', index, {
                  ...exp,
                  company: e.target.value,
                })
              }
            />
            <input
              placeholder="Position"
              value={exp.position}
              onChange={(e) =>
                updateArrayItem('experience', index, {
                  ...exp,
                  position: e.target.value,
                })
              }
            />
            <div className="date-row">
              <input
                placeholder="Start Date"
                value={exp.startDate}
                onChange={(e) =>
                  updateArrayItem('experience', index, {
                    ...exp,
                    startDate: e.target.value,
                  })
                }
              />
              <input
                placeholder="End Date"
                value={exp.endDate}
                onChange={(e) =>
                  updateArrayItem('experience', index, {
                    ...exp,
                    endDate: e.target.value,
                  })
                }
              />
            </div>
            <textarea
              placeholder="Description"
              value={exp.description}
              onChange={(e) =>
                updateArrayItem('experience', index, {
                  ...exp,
                  description: e.target.value,
                })
              }
            />
            <button
              type="button"
              onClick={() => removeArrayItem('experience', index)}
            >
              Remove Job
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            addArrayItem('experience', {
              company: '',
              position: '',
              startDate: '',
              endDate: '',
              description: '',
            })
          }
        >
          + Add Experience
        </button>
      </section>

      {/* SKILLS SECTION */}
      <section>
        <h3>Skills</h3>
        {formData.skills.map((skill, index) => (
          <div key={index} className="skill-input-row">
            <input
              placeholder="Skill"
              value={skill}
              onChange={(e) => updateArrayItem('skills', index, e.target.value)}
            />
            <button
              type="button"
              onClick={() => removeArrayItem('skills', index)}
            >
              x
            </button>
          </div>
        ))}
        <button type="button" onClick={() => addArrayItem('skills', '')}>
          + Add Skill
        </button>
      </section>

      <button type="submit" className="submit-btn">
        Generate PDF
      </button>
    </form>
  )
}

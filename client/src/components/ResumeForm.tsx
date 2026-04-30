import React from 'react'
import type { ResumeData } from '../types/resume'
import '../styles/ResumeForm.css'

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
    <form onSubmit={onSubmit} className="resume-form-container">
      {/* PERSONAL DETAILS */}
      <section className="form-section">
        <h3>Personal Details</h3>
        <div className="input-stack">
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
          <div className="grid-2-col">
            <input
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <input
              name="address"
              placeholder="Location"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <textarea
            name="summary"
            placeholder="Professional Summary"
            value={formData.summary}
            onChange={handleChange}
          />
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="form-section">
        <h3>Experience</h3>
        {formData.experience.map((exp, index) => (
          <div key={index} className="item-card">
            <div className="item-card-header">
              <span>Job #{index + 1}</span>
              <button
                type="button"
                className="text-btn delete"
                onClick={() => removeArrayItem('experience', index)}
              >
                Delete
              </button>
            </div>
            <div className="input-stack">
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
              <div className="grid-2-col">
                <input
                  placeholder="Start"
                  value={exp.startDate}
                  onChange={(e) =>
                    updateArrayItem('experience', index, {
                      ...exp,
                      startDate: e.target.value,
                    })
                  }
                />
                <input
                  placeholder="End"
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
            </div>
          </div>
        ))}
        <button
          type="button"
          className="add-btn"
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

      {/* EDUCATION */}
      <section className="form-section">
        <h3>Education</h3>
        {formData.education.map((edu, index) => (
          <div key={index} className="item-card">
            <div className="item-card-header">
              <span>Degree #{index + 1}</span>
              <button
                type="button"
                className="text-btn delete"
                onClick={() => removeArrayItem('education', index)}
              >
                Delete
              </button>
            </div>
            <div className="input-stack">
              <input
                placeholder="Institution"
                value={edu.institution}
                onChange={(e) =>
                  updateArrayItem('education', index, {
                    ...edu,
                    institution: e.target.value,
                  })
                }
              />
              <input
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) =>
                  updateArrayItem('education', index, {
                    ...edu,
                    degree: e.target.value,
                  })
                }
              />
              <div className="grid-2-col">
                <input
                  placeholder="Start"
                  value={edu.startDate}
                  onChange={(e) =>
                    updateArrayItem('education', index, {
                      ...edu,
                      startDate: e.target.value,
                    })
                  }
                />
                <input
                  placeholder="End"
                  value={edu.endDate}
                  onChange={(e) =>
                    updateArrayItem('education', index, {
                      ...edu,
                      endDate: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          className="add-btn"
          onClick={() =>
            addArrayItem('education', {
              institution: '',
              degree: '',
              startDate: '',
              endDate: '',
            })
          }
        >
          + Add Education
        </button>
      </section>

      {/* SKILLS */}
      <section className="form-section">
        <h3>Skills</h3>
        <div className="skills-editor-grid">
          {formData.skills.map((skill, index) => (
            <div key={index} className="skill-chip-input">
              <input
                placeholder="Skill"
                value={skill}
                onChange={(e) =>
                  updateArrayItem('skills', index, e.target.value)
                }
              />
              <button
                type="button"
                className="skill-remove-btn"
                onClick={() => removeArrayItem('skills', index)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="add-btn"
          onClick={() => addArrayItem('skills', '')}
        >
          + Add Skill
        </button>
      </section>

      <button type="submit" className="submit-btn">
        Generate PDF
      </button>
    </form>
  )
}

/* maugares/resume-generator/server/templates/ResumeTemplate.ts */
import type {
  ResumeData,
  ExperienceItem,
  EducationItem,
} from '../types/resume.ts'
import { cssStyles } from '../styles/cssStyles.ts'

const renderExperience = (items: ExperienceItem[]) => {
  if (!items || items.length === 0) return ''
  return items
    .map(
      (exp) => `
    <div class="exp-item">
      <div class="item-header">
        <span>${exp.position}</span>
        <span style="font-weight: 500; font-style: italic; color: #666;">
          ${exp.startDate} - ${exp.endDate}
        </span>
      </div>
      <div class="company-name">${exp.company}</div>
      <ul class="exp-list">
        ${exp.description.map((line) => `<li>${line}</li>`).join('')}
      </ul>
    </div>
  `
    )
    .join('')
}

const renderEducation = (items: EducationItem[]) => {
  if (!items || items.length === 0) return ''
  return items
    .map(
      (edu) => `
    <div class="edu-item" style="margin-bottom: 20px;">
      <div style="font-weight: bold; font-size: 13px; color: white;">${edu.degree}</div>
      <div style="font-style: italic; color: #ccc; font-size: 12px;">${edu.institution}</div>
      <div style="color: #aaa; font-size: 11px;">${edu.startDate} - ${edu.endDate}</div>
    </div>
  `
    )
    .join('')
}

export const generateHTML = (data: ResumeData): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <style>${cssStyles}</style>
      </head>
      <body>
        <div class="page">
          <aside class="sidebar">
            <div class="profile-photo"></div>
            
            <section>
              <h3>CONTACT</h3>
              <p>${data.phone || ''}</p>
              <p>${data.email || ''}</p>
              <p>${data.address || ''}</p>
            </section>
            
            <section>
              <h3>EDUCATION</h3>
              ${renderEducation(data.education)}
            </section>
            
            <section>
              <h3>SKILLS</h3>
              <p style="white-space: pre-wrap;">${data.skills || ''}</p>
            </section>
          </aside>
          
          <main class="main-content">
            <h1>${(data.name || '').toUpperCase()}</h1>
            
            <section>
              <h3>EXPERIENCE</h3>
              ${renderExperience(data.experience)}
            </section>
          </main>
        </div>
      </body>
    </html>
  `
}

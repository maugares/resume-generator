import type { ResumeData, ExperienceItem, EducationItem } from '../../../client/src/types/resume';
import { cssStyles } from '../styles/cssStyles.ts';

const renderExperience = (items: ExperienceItem[]) => {
  return items.map(exp => `
    <div class="exp-item" style="margin-bottom: 15px;">
      <div style="display: flex; justify-content: space-between;">
        <strong>${exp.position}</strong>
        <span>${exp.startDate} - ${exp.endDate}</span>
      </div>
      <div><em>${exp.company}</em></div>
      <p>${exp.description}</p>
    </div>
  `).join('');
};

const renderEducation = (items: EducationItem[]) => {
  return items.map(edu => `
    <div class="edu-item" style="margin-bottom: 10px;">
      <strong>${edu.institution}</strong>
      <div>${edu.degree} (${edu.startDate} - ${edu.endDate})</div>
    </div>
  `).join('');
};

export const generateHTML = (data: ResumeData): string => {
  return `
    <!DOCTYPE html>
    <html>
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
              <p>${data.phone}</p>
              <p>${data.email}</p>
              <p>${data.address}</p>
            </section>
            <section>
              <h3>SKILLS</h3>
              <ul>${data.skills.map(s => `<li>${s}</li>`).join('')}</ul>
            </section>
          </aside>
          
          <main class="main-content">
            <h1>${data.name.toUpperCase()}</h1>
            <p class="summary">${data.summary}</p>
            
            <section>
              <h3>EXPERIENCE</h3>
              ${renderExperience(data.experience)}
            </section>

            <section>
              <h3>EDUCATION</h3>
              ${renderEducation(data.education)}
            </section>
          </main>
        </div>
      </body>
    </html>
  `;
};
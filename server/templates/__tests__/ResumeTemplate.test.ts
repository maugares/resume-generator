import { describe, it, expect } from 'vitest'
import { generateHTML } from '../ResumeTemplate.ts'
import type { ResumeData } from '../../types/resume.ts'

describe('generateHTML', () => {
  const minimalData: ResumeData = {
    name: 'Test User',
    email: 'test@example.com',
    address: 'Test Address',
    phone: '123456',
    summary: 'Summary',
    education: [],
    experience: [],
    languages: [],
    skills: 'Skillz',
  }

  it('renders minimal HTML', () => {
    const html = generateHTML(minimalData)
    expect(html).toContain('<!DOCTYPE html>')
    expect(html).toContain('TEST USER')
    expect(html).toContain('Skillz')
  })

  it('renders education and experience', () => {
    const data: ResumeData = {
      ...minimalData,
      education: [
        {
          institution: 'Uni',
          degree: 'BSc',
          startDate: '2020',
          endDate: '2024',
        },
      ],
      experience: [
        {
          company: 'Company',
          position: 'Dev',
          startDate: '2021',
          endDate: '2022',
          description: ['Did stuff'],
        },
      ],
    }
    const html = generateHTML(data)
    expect(html).toContain('BSc')
    expect(html).toContain('Company')
    expect(html).toContain('Did stuff')
  })
})

import { describe, it, expect } from 'vitest'
import type { ResumeData, ExperienceItem, EducationItem } from '../resume.ts'

describe('ResumeData type', () => {
  it('should allow valid resume objects', () => {
    const data: ResumeData = {
      name: 'A',
      email: 'a@b.c',
      address: 'addr',
      phone: '123',
      summary: 's',
      education: [],
      experience: [],
      languages: [],
      skills: '',
    }
    expect(data.name).toBe('A')
  })

  it('should allow experience and education items', () => {
    const exp: ExperienceItem = {
      company: 'C',
      position: 'P',
      startDate: 'S',
      endDate: 'E',
      description: ['d'],
    }
    const edu: EducationItem = {
      institution: 'I',
      degree: 'D',
      startDate: 'S',
      endDate: 'E',
    }
    expect(exp.company).toBe('C')
    expect(edu.degree).toBe('D')
  })
})

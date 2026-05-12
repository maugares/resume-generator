import type { ExperienceItem } from '../types'

const normalizeKeyPart = (value: string): string =>
  value.trim().toLowerCase() || 'empty'

export const buildExperienceKey = (experience: ExperienceItem): string =>
  [
    experience.position,
    experience.company,
    experience.startDate,
    experience.endDate,
    experience.description.join('||'),
  ]
    .map(normalizeKeyPart)
    .join('|')

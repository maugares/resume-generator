import type { ReactNode } from 'react'
import { render } from '@testing-library/react'
import { ResumeProvider } from '../../context/ResumeContext'
import { mockResumeData } from '../../__mocks__/resumeData'
import type { ResumeData } from '../../types/resume'
import { vi } from 'vitest'

export function buildContextValue(overrides: Partial<ResumeData> = {}) {
  return {
    formData: { ...mockResumeData, ...overrides },
    handleChange: vi.fn(),
    updateArrayItem: vi.fn(),
    addArrayItem: vi.fn(),
    removeArrayItem: vi.fn(),
  }
}

export function renderWithResume(
  ui: ReactNode,
  overrides: Partial<ResumeData> = {}
) {
  const contextValue = buildContextValue(overrides)
  const result = render(
    <ResumeProvider value={contextValue}>{ui}</ResumeProvider>
  )
  return { ...result, contextValue }
}

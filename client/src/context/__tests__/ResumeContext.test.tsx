import { render, screen, renderHook } from '@testing-library/react'
import { ResumeProvider, useResumeContext } from '../ResumeContext'
import { buildContextValue } from '../../__tests__/helpers/renderWithResume'

const contextValue = buildContextValue()

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ResumeProvider value={contextValue}>{children}</ResumeProvider>
)

describe('ResumeContext', () => {
  describe('ResumeProvider', () => {
    it('renders children', () => {
      render(
        <ResumeProvider value={contextValue}>
          <div>Test Child</div>
        </ResumeProvider>
      )
      expect(screen.getByText('Test Child')).toBeInTheDocument()
    })

    it('provides the supplied value to consumers', () => {
      const { result } = renderHook(() => useResumeContext(), { wrapper })
      expect(result.current.formData).toEqual(contextValue.formData)
    })
  })

  describe('useResumeContext', () => {
    it('throws when used outside a ResumeProvider', () => {
      expect(() => renderHook(() => useResumeContext())).toThrow(
        'useResumeContext must be used within a ResumeProvider'
      )
    })
  })
})

import { createContext, useContext } from 'react'
import type { useResume } from '../hooks'

type ResumeContextValue = ReturnType<typeof useResume>

const ResumeContext = createContext<ResumeContextValue | null>(null)

export function ResumeProvider({
  value,
  children,
}: {
  value: ResumeContextValue
  children: React.ReactNode
}) {
  return (
    <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
  )
}

export function useResumeContext() {
  const context = useContext(ResumeContext)

  if (!context) {
    throw new Error('useResumeContext must be used within a ResumeProvider')
  }

  return context
}

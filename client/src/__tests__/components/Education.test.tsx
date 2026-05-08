import { screen, fireEvent } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Education } from '../../components/Education'
import { renderWithResume } from '../helpers/renderWithResume'
import { mockResumeData } from '../../__mocks__/resumeData'

describe('Education', () => {
  it('renders the Education section header', () => {
    renderWithResume(<Education />)
    expect(
      screen.getByRole('heading', { name: 'Education' })
    ).toBeInTheDocument()
  })

  it('renders all education entries', () => {
    renderWithResume(<Education />)
    expect(
      screen.getByText('Bachelor of Science in Computer Science')
    ).toBeInTheDocument()
    expect(screen.getByText('High School Diploma')).toBeInTheDocument()
  })

  it('renders institution names', () => {
    renderWithResume(<Education />)
    expect(screen.getByText('University of Example')).toBeInTheDocument()
    expect(screen.getByText('Example High School')).toBeInTheDocument()
  })

  it('renders an Add button', () => {
    renderWithResume(<Education />)
    expect(
      screen.getByRole('button', { name: /add education/i })
    ).toBeInTheDocument()
  })

  it('calls addArrayItem when Add button is clicked', () => {
    const { contextValue } = renderWithResume(<Education />)
    fireEvent.click(screen.getByRole('button', { name: /add education/i }))
    expect(contextValue.addArrayItem).toHaveBeenCalledWith('education')
  })

  it('calls removeArrayItem when a remove button is clicked', () => {
    const { contextValue } = renderWithResume(<Education />)
    const removeButtons = screen.getAllByRole('button', { name: '✕' })
    fireEvent.click(removeButtons[0])
    expect(contextValue.removeArrayItem).toHaveBeenCalledWith('education', 0)
  })

  it('renders no entries when education is empty', () => {
    renderWithResume(<Education />, { education: [] })
    expect(screen.queryByText('University of Example')).toBeNull()
  })
})

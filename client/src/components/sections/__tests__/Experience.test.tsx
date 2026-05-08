import { screen, fireEvent } from '@testing-library/react'
import { Experience } from '../Experience'
import { renderWithResume } from '../../../__tests__/helpers/renderWithResume'

describe('Experience', () => {
  it('renders the Experience section header', () => {
    renderWithResume(<Experience />)
    expect(
      screen.getByRole('heading', { name: 'Experience' })
    ).toBeInTheDocument()
  })

  it('renders all experience entries', () => {
    renderWithResume(<Experience />)
    expect(screen.getByText('Software Engineer')).toBeInTheDocument()
    expect(screen.getByText('Intern')).toBeInTheDocument()
  })

  it('renders company names', () => {
    renderWithResume(<Experience />)
    expect(screen.getByText('Tech Company')).toBeInTheDocument()
    expect(screen.getByText('Startup Inc.')).toBeInTheDocument()
  })

  it('renders descriptions', () => {
    renderWithResume(<Experience />)
    expect(
      screen.getByText(
        'Worked on various projects using JavaScript, React, and Node.js.'
      )
    ).toBeInTheDocument()
  })

  it('renders an Add button', () => {
    renderWithResume(<Experience />)
    expect(
      screen.getByRole('button', { name: /add experience/i })
    ).toBeInTheDocument()
  })

  it('calls addArrayItem when Add button is clicked', () => {
    const { contextValue } = renderWithResume(<Experience />)
    fireEvent.click(screen.getByRole('button', { name: /add experience/i }))
    expect(contextValue.addArrayItem).toHaveBeenCalledWith('experience')
  })

  it('calls removeArrayItem when a remove button is clicked', () => {
    const { contextValue } = renderWithResume(<Experience />)
    const removeButtons = screen.getAllByRole('button', { name: '✕' })
    fireEvent.click(removeButtons[0])
    expect(contextValue.removeArrayItem).toHaveBeenCalledWith('experience', 0)
  })

  it('renders no entries when experience is empty', () => {
    renderWithResume(<Experience />, { experience: [] })
    expect(screen.queryByText('Software Engineer')).toBeNull()
  })
})

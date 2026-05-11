import { fireEvent, screen } from '@testing-library/react'
import { Skills } from '../Skills'
import { renderWithResume } from '../../../__tests__/helpers/renderWithResume'

describe('Skills', () => {
  it('renders the Skills section header', () => {
    renderWithResume(<Skills />)
    expect(screen.getByRole('heading', { name: 'Skills' })).toBeInTheDocument()
  })

  it('renders the skills value', () => {
    renderWithResume(<Skills />)
    expect(screen.getByText('JavaScript, React, Node.js')).toBeInTheDocument()
  })

  it('shows placeholder when skills is empty', () => {
    renderWithResume(<Skills />, { skills: '' })
    expect(
      screen.getByText('Design, Development, UI/UX...')
    ).toBeInTheDocument()
  })

  it('calls handleChange when skills is edited', () => {
    const { contextValue } = renderWithResume(<Skills />)

    fireEvent.click(screen.getByText('JavaScript, React, Node.js'))
    const editable = document.querySelector('[contenteditable]') as HTMLElement
    editable.innerText = 'Python, Django, Flask'
    fireEvent.blur(editable)
    
    expect(contextValue.handleChange).toHaveBeenCalledWith(
      'skills',
      'Python, Django, Flask'
    )
  })
})

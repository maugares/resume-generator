import { render, screen } from '@testing-library/react'
import { Header } from '../Header'

describe('Header', () => {
  it('renders the title text', () => {
    render(<Header title="Experience" />)
    expect(screen.getByText('Experience')).toBeInTheDocument()
  })

  it('renders inside an h3 element', () => {
    render(<Header title="Education" />)
    expect(
      screen.getByRole('heading', { level: 3, name: 'Education' })
    ).toBeInTheDocument()
  })
})

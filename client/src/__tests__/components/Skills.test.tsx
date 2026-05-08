import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Skills } from '../../components/Skills'
import { renderWithResume } from '../helpers/renderWithResume'

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
})

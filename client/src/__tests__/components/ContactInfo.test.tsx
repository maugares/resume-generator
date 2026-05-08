import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ContactInfo } from '../../components/ContactInfo'
import { renderWithResume } from '../helpers/renderWithResume'

describe('ContactInfo', () => {
  it('renders the Contact section header', () => {
    renderWithResume(<ContactInfo />)
    expect(screen.getByRole('heading', { name: 'Contact' })).toBeInTheDocument()
  })

  it('renders the phone value', () => {
    renderWithResume(<ContactInfo />)
    expect(screen.getByText('555-555-5555')).toBeInTheDocument()
  })

  it('renders the email value', () => {
    renderWithResume(<ContactInfo />)
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument()
  })

  it('renders the address value', () => {
    renderWithResume(<ContactInfo />)
    expect(screen.getByText('123 Main St, Anytown, USA')).toBeInTheDocument()
  })

  it('shows phone placeholder when phone is empty', () => {
    renderWithResume(<ContactInfo />, { phone: '' })
    expect(screen.getByText('Phone')).toBeInTheDocument()
  })
})

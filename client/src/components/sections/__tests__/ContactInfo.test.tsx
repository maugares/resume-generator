import { fireEvent, screen } from '@testing-library/react'
import { ContactInfo } from '../ContactInfo'
import { renderWithResume } from '../../../__tests__/helpers/renderWithResume'

describe('ContactInfo', () => {
  it('renders the Contact section header', () => {
    renderWithResume(<ContactInfo />)
    expect(screen.getByRole('heading', { name: 'Contact' })).toBeInTheDocument()
  })

  it('renders phone, email, and address values', () => {
    renderWithResume(<ContactInfo />)
    expect(screen.getByText('555-555-5555')).toBeInTheDocument()
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument()
    expect(screen.getByText('123 Main St, Anytown, USA')).toBeInTheDocument()
  })

  it('shows placeholders when values are empty', () => {
    renderWithResume(<ContactInfo />, {
      phone: '',
      email: '',
      address: '',
    })

    expect(screen.getByText('Phone')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Address')).toBeInTheDocument()
  })

  it('calls handleChange when phone is edited', () => {
    const { contextValue } = renderWithResume(<ContactInfo />)

    fireEvent.click(screen.getByText('555-555-5555'))
    const editable = document.querySelector('[contenteditable]') as HTMLElement
    editable.innerText = '123-456-7890'
    fireEvent.blur(editable)

    expect(contextValue.handleChange).toHaveBeenCalledWith(
      'phone',
      '123-456-7890'
    )
  })

  it('calls handleChange when email is edited', () => {
    const { contextValue } = renderWithResume(<ContactInfo />)

    fireEvent.click(screen.getByText('john.doe@example.com'))
    const editable = document.querySelector('[contenteditable]') as HTMLElement
    editable.innerText = 'newemail@example.com'
    fireEvent.blur(editable)

    expect(contextValue.handleChange).toHaveBeenCalledWith(
      'email',
      'newemail@example.com'
    )
  })

  it('calls handleChange when address is edited', () => {
    const { contextValue } = renderWithResume(<ContactInfo />)

    fireEvent.click(screen.getByText('123 Main St, Anytown, USA'))
    const editable = document.querySelector('[contenteditable]') as HTMLElement
    editable.innerText = '456 Elm St, Newtown, USA'
    fireEvent.blur(editable)

    expect(contextValue.handleChange).toHaveBeenCalledWith(
      'address',
      '456 Elm St, Newtown, USA'
    )
  })
})

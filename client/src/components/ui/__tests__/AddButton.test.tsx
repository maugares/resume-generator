import { fireEvent, render, screen } from '@testing-library/react'
import { AddButton } from '../buttons/AddButton'
import { vi } from 'vitest'

describe('AddButton', () => {
  it('renders default light variant styling', () => {
    const addArrayItem = vi.fn()
    render(<AddButton addArrayItem={addArrayItem} field="experience" />)

    const button = screen.getByRole('button', { name: /add experience/i })
    expect(button).toHaveClass('text-resume-slate/50')
  })

  it('renders dark variant styling', () => {
    const addArrayItem = vi.fn()
    render(
      <AddButton addArrayItem={addArrayItem} field="education" variant="dark" />
    )

    const button = screen.getByRole('button', { name: /add education/i })
    expect(button).toHaveClass('text-white/60')
  })

  it('calls addArrayItem with the provided field when clicked', () => {
    const addArrayItem = vi.fn()
    render(<AddButton addArrayItem={addArrayItem} field="experience" />)

    fireEvent.click(screen.getByRole('button', { name: /add experience/i }))
    expect(addArrayItem).toHaveBeenCalledWith('experience')
  })
})

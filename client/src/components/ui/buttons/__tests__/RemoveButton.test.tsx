import { fireEvent, render, screen } from '@testing-library/react'
import { RemoveButton } from '../RemoveButton'
import { vi } from 'vitest'

describe('RemoveButton', () => {
  it('calls removeArrayItem when used with field and index', () => {
    const removeArrayItem = vi.fn()

    render(
      <RemoveButton
        removeArrayItem={removeArrayItem}
        field="experience"
        index={1}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: /remove entry/i }))

    expect(removeArrayItem).toHaveBeenCalledWith('experience', 1)
  })

  it('calls onClick and applies a custom className', () => {
    const onClick = vi.fn()

    render(<RemoveButton onClick={onClick} className="custom-class" />)

    fireEvent.click(screen.getByRole('button', { name: /remove entry/i }))

    expect(onClick).toHaveBeenCalledTimes(1)
    expect(screen.getByRole('button', { name: /remove entry/i })).toHaveClass(
      'custom-class'
    )
  })
})

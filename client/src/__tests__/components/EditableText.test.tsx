import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { EditableText } from '../../components/EditableText'

describe('EditableText', () => {
  it('renders the value in view mode', () => {
    render(<EditableText value="Hello" onChange={vi.fn()} />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('renders the placeholder when value is empty', () => {
    render(<EditableText value="" onChange={vi.fn()} placeholder="Type here" />)
    expect(screen.getByText('Type here')).toBeInTheDocument()
  })

  it('uses default placeholder when none is provided', () => {
    render(<EditableText value="" onChange={vi.fn()} />)
    expect(screen.getByText('Click to edit...')).toBeInTheDocument()
  })

  it('switches to edit mode on click', () => {
    render(<EditableText value="Hello" onChange={vi.fn()} />)
    fireEvent.click(screen.getByText('Hello'))
    expect(document.querySelector('[contenteditable]')).toBeInTheDocument()
  })

  it('calls onChange with the current text on blur', () => {
    const onChange = vi.fn()
    render(<EditableText value="Hello" onChange={onChange} />)
    fireEvent.click(screen.getByText('Hello'))
    const editable = document.querySelector('[contenteditable]') as HTMLElement
    editable.innerText = 'Updated'
    fireEvent.blur(editable)
    expect(onChange).toHaveBeenCalledWith('Updated')
  })

  it('exits edit mode without calling onChange on Escape', () => {
    const onChange = vi.fn()
    render(<EditableText value="Hello" onChange={onChange} />)
    fireEvent.click(screen.getByText('Hello'))
    const editable = document.querySelector('[contenteditable]') as HTMLElement
    fireEvent.keyDown(editable, { key: 'Escape' })
    expect(onChange).not.toHaveBeenCalled()
    expect(document.querySelector('[contenteditable]')).toBeNull()
  })

  it('applies the className in view mode', () => {
    render(
      <EditableText value="Hello" onChange={vi.fn()} className="custom-class" />
    )
    expect(screen.getByText('Hello')).toHaveClass('custom-class')
  })
})

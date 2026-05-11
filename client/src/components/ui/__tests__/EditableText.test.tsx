import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { EditableText } from '../EditableText'

describe('EditableText', () => {
  it('renders the value in view mode', () => {
    render(<EditableText value="Hello" onChange={vi.fn()} />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('renders the placeholder when value is empty', () => {
    render(<EditableText value="" onChange={vi.fn()} placeholder="Type here" />)
    expect(screen.getByText('Type here')).toBeInTheDocument()
  })

  it('renders the placeholder when value is whitespace-only', () => {
    render(
      <EditableText value="   " onChange={vi.fn()} placeholder="Type here" />
    )
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

  it('moves to the next field when Tab is pressed', async () => {
    const firstOnChange = vi.fn()
    render(
      <>
        <EditableText value="First" onChange={firstOnChange} />
        <EditableText value="Second" onChange={vi.fn()} />
      </>
    )

    fireEvent.click(screen.getByText('First'))
    const firstEditable = document.querySelector(
      '[contenteditable]'
    ) as HTMLElement
    fireEvent.keyDown(firstEditable, { key: 'Tab' })

    await waitFor(() => {
      const activeEditable = document.querySelector(
        '[contenteditable]'
      ) as HTMLElement
      expect(activeEditable).toBeInTheDocument()
      expect(activeEditable.innerText).toBe('Second')
    })

    expect(firstOnChange).toHaveBeenCalledWith('First')
  })

  it('moves to the previous field when Shift+Tab is pressed', async () => {
    const secondOnChange = vi.fn()
    render(
      <>
        <EditableText value="First" onChange={vi.fn()} />
        <EditableText value="Second" onChange={secondOnChange} />
      </>
    )

    fireEvent.click(screen.getByText('Second'))
    const secondEditable = document.querySelector(
      '[contenteditable]'
    ) as HTMLElement
    fireEvent.keyDown(secondEditable, { key: 'Tab', shiftKey: true })

    await waitFor(() => {
      const activeEditable = document.querySelector(
        '[contenteditable]'
      ) as HTMLElement
      expect(activeEditable).toBeInTheDocument()
      expect(activeEditable.innerText).toBe('First')
    })

    expect(secondOnChange).toHaveBeenCalledWith('Second')
  })

  it('does nothing when Tab has no next field', () => {
    const onChange = vi.fn()

    render(<EditableText value="Only" onChange={onChange} />)

    fireEvent.click(screen.getByText('Only'))
    let editable: HTMLElement | null = null
    return waitFor(() => {
      editable = document.querySelector('[contenteditable]') as HTMLElement
      expect(editable).toBeInTheDocument()
    }).then(() => {
      fireEvent.keyDown(editable as HTMLElement, { key: 'Tab' })

      expect(onChange).not.toHaveBeenCalled()
      expect(document.querySelector('[contenteditable]')).toBeInTheDocument()
    })
  })

  it('respects a prevented keydown handler', async () => {
    const onKeyDown = vi.fn((event: React.KeyboardEvent<HTMLDivElement>) => {
      event.preventDefault()
    })

    render(
      <EditableText value="Only" onChange={vi.fn()} onKeyDown={onKeyDown} />
    )

    fireEvent.click(screen.getByText('Only'))
    let editable: HTMLElement | null = null
    await waitFor(() => {
      editable = document.querySelector('[contenteditable]') as HTMLElement
      expect(editable).toBeInTheDocument()
    })
    fireEvent.keyDown(editable, { key: 'Tab' })

    expect(onKeyDown).toHaveBeenCalled()
    expect(editable).toBeInTheDocument()
  })
})

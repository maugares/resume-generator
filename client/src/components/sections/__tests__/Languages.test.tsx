import { fireEvent, screen } from '@testing-library/react'
import { Languages } from '../Languages'
import { renderWithResume } from '../../../__tests__/helpers/renderWithResume'

describe('Languages', () => {
  it('renders the Languages section header', () => {
    renderWithResume(<Languages />)
    expect(
      screen.getByRole('heading', { name: 'Languages' })
    ).toBeInTheDocument()
  })

  it('renders language entries as bullet list items', () => {
    renderWithResume(<Languages />, { languages: ['English', 'Spanish'] })

    expect(screen.getAllByRole('list')).toHaveLength(1)
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
    expect(screen.getByText('English')).toBeInTheDocument()
    expect(screen.getByText('Spanish')).toBeInTheDocument()
  })

  it('shows a placeholder bullet when languages is empty', () => {
    renderWithResume(<Languages />, { languages: [] })
    expect(screen.getByText('Click to edit...')).toBeInTheDocument()
  })

  it('calls updateArrayItem when editing a language line', () => {
    const { contextValue } = renderWithResume(<Languages />, {
      languages: ['English', 'Spanish'],
    })

    fireEvent.click(screen.getByText('Spanish'))
    const editable = document.querySelector('[contenteditable]') as HTMLElement
    editable.innerText = 'French'
    fireEvent.blur(editable)

    expect(contextValue.updateArrayItem).toHaveBeenCalledWith(
      'languages',
      1,
      'French'
    )
  })

  it('inserts a new language line on Enter', () => {
    const { contextValue } = renderWithResume(<Languages />, {
      languages: ['English', 'Spanish'],
    })

    fireEvent.click(screen.getByText('English'))
    const editable = document.querySelector('[contenteditable]') as HTMLElement
    fireEvent.keyDown(editable, { key: 'Enter' })

    expect(contextValue.addArrayItem).toHaveBeenCalledWith('languages')
    expect(contextValue.updateArrayItem).toHaveBeenCalledWith(
      'languages',
      2,
      'Spanish'
    )
    expect(contextValue.updateArrayItem).toHaveBeenCalledWith(
      'languages',
      1,
      ''
    )
  })

  it('removes a non-first empty language line on Backspace', () => {
    const { contextValue } = renderWithResume(<Languages />, {
      languages: ['English', ''],
    })

    fireEvent.click(screen.getByText('Click to edit...'))
    const editable = document.querySelector('[contenteditable]') as HTMLElement
    fireEvent.keyDown(editable, { key: 'Backspace' })

    expect(contextValue.removeArrayItem).toHaveBeenCalledWith('languages', 1)
  })

  it('keeps first line placeholder when deleting empty first line', () => {
    const { contextValue } = renderWithResume(<Languages />, {
      languages: [''],
    })

    fireEvent.click(screen.getByText('Click to edit...'))
    const editable = document.querySelector('[contenteditable]') as HTMLElement
    fireEvent.keyDown(editable, { key: 'Backspace' })

    expect(contextValue.updateArrayItem).toHaveBeenCalledWith(
      'languages',
      0,
      ''
    )
  })

  it('calls addArrayItem when Add button is clicked', () => {
    const { contextValue } = renderWithResume(<Languages />)
    fireEvent.click(screen.getByRole('button', { name: /add languages/i }))
    expect(contextValue.addArrayItem).toHaveBeenCalledWith('languages')
  })
})

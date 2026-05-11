import { screen, fireEvent } from '@testing-library/react'
import { Experience } from '../Experience'
import { renderWithResume } from '../../../__tests__/helpers/renderWithResume'

describe('Experience', () => {
  it('renders the Experience section header', () => {
    renderWithResume(<Experience />)
    expect(
      screen.getByRole('heading', { name: 'Experience' })
    ).toBeInTheDocument()
  })

  it('renders all experience entries', () => {
    renderWithResume(<Experience />)
    expect(screen.getByText('Software Engineer')).toBeInTheDocument()
    expect(screen.getByText('Intern')).toBeInTheDocument()
  })

  it('renders company names', () => {
    renderWithResume(<Experience />)
    expect(screen.getByText('Tech Company')).toBeInTheDocument()
    expect(screen.getByText('Startup Inc.')).toBeInTheDocument()
  })

  it('renders descriptions as bullet list items', () => {
    renderWithResume(<Experience />)

    expect(screen.getAllByRole('list')).toHaveLength(2)
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
    expect(
      screen.getByText(
        'Worked on various projects using JavaScript, React, and Node.js.'
      )
    ).toBeInTheDocument()
  })

  it('splits multiline descriptions into multiple bullet items', () => {
    renderWithResume(<Experience />, {
      experience: [
        {
          position: 'Engineer',
          company: 'Example Co',
          startDate: '2020-01-01',
          endDate: '2022-01-01',
          description: 'Built features\nImproved test coverage',
        },
      ],
    })

    expect(screen.getAllByRole('list')).toHaveLength(1)
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
    expect(screen.getByText('Built features')).toBeInTheDocument()
    expect(screen.getByText('Improved test coverage')).toBeInTheDocument()
  })

  it('renders a single editable bullet when description is blank', () => {
    renderWithResume(<Experience />, {
      experience: [
        {
          position: 'Engineer',
          company: 'Example Co',
          startDate: '2020-01-01',
          endDate: '2022-01-01',
          description: '   \n   ',
        },
      ],
    })

    expect(screen.getAllByRole('list')).toHaveLength(1)
    expect(screen.getAllByRole('listitem')).toHaveLength(1)
    expect(screen.getByText('Click to edit...')).toBeInTheDocument()
  })

  it('calls updateArrayItem for edited fields and description bullet updates', () => {
    const experienceItem = {
      position: 'Engineer',
      company: 'Example Co',
      startDate: '2020-01-01',
      endDate: '2022-01-01',
      description: 'Built features\nImproved tests',
    }

    const { contextValue } = renderWithResume(<Experience />, {
      experience: [experienceItem],
    })

    const editField = (currentValue: string, nextValue: string) => {
      fireEvent.click(screen.getByText(currentValue))
      const editable = document.querySelector(
        '[contenteditable]'
      ) as HTMLElement
      editable.innerText = nextValue
      fireEvent.blur(editable)
    }

    editField('Engineer', 'Lead Engineer')
    expect(contextValue.updateArrayItem).toHaveBeenCalledWith('experience', 0, {
      ...experienceItem,
      position: 'Lead Engineer',
    })

    contextValue.updateArrayItem.mockClear()

    editField('2020-01-01', '2021-01-01')
    expect(contextValue.updateArrayItem).toHaveBeenCalledWith('experience', 0, {
      ...experienceItem,
      startDate: '2021-01-01',
    })

    contextValue.updateArrayItem.mockClear()

    editField('2022-01-01', '2023-01-01')
    expect(contextValue.updateArrayItem).toHaveBeenCalledWith('experience', 0, {
      ...experienceItem,
      endDate: '2023-01-01',
    })

    contextValue.updateArrayItem.mockClear()

    editField('Example Co', 'Updated Co')
    expect(contextValue.updateArrayItem).toHaveBeenCalledWith('experience', 0, {
      ...experienceItem,
      company: 'Updated Co',
    })

    contextValue.updateArrayItem.mockClear()

    editField('Improved tests', 'Improved quality')
    expect(contextValue.updateArrayItem).toHaveBeenCalledWith('experience', 0, {
      ...experienceItem,
      description: 'Built features\nImproved quality',
    })
  })

  it('renders an Add button', () => {
    renderWithResume(<Experience />)
    expect(
      screen.getByRole('button', { name: /add experience/i })
    ).toBeInTheDocument()
  })

  it('calls addArrayItem when Add button is clicked', () => {
    const { contextValue } = renderWithResume(<Experience />)
    fireEvent.click(screen.getByRole('button', { name: /add experience/i }))
    expect(contextValue.addArrayItem).toHaveBeenCalledWith('experience')
  })

  it('calls removeArrayItem when a remove button is clicked', () => {
    const { contextValue } = renderWithResume(<Experience />)
    const removeButtons = screen.getAllByRole('button', { name: '✕' })
    fireEvent.click(removeButtons[0])
    expect(contextValue.removeArrayItem).toHaveBeenCalledWith('experience', 0)
  })

  it('renders no entries when experience is empty', () => {
    renderWithResume(<Experience />, { experience: [] })
    expect(screen.queryByText('Software Engineer')).toBeNull()
  })
})

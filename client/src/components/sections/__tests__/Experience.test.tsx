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

  it('hides the Experience section header when showHeader is false', () => {
    renderWithResume(<Experience showHeader={false} />)
    expect(screen.queryByRole('heading', { name: 'Experience' })).toBeNull()
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
          description: ['Built features', 'Improved test coverage'],
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
          description: [''],
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
      description: ['Built features', 'Improved tests'],
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
      description: ['Built features', 'Improved quality'],
    })
  })

  it('adds a new description line on Enter', () => {
    const experienceItem = {
      position: 'Engineer',
      company: 'Example Co',
      startDate: '2020-01-01',
      endDate: '2022-01-01',
      description: ['First line'],
    }

    const { contextValue } = renderWithResume(<Experience />, {
      experience: [experienceItem],
    })

    fireEvent.click(screen.getByText('First line'))
    const editable = document.querySelector('[contenteditable]') as HTMLElement
    fireEvent.keyDown(editable, { key: 'Enter' })

    expect(contextValue.updateArrayItem).toHaveBeenCalledWith('experience', 0, {
      ...experienceItem,
      description: ['First line', ''],
    })
  })

  it('removes a non-first empty description line on Backspace', () => {
    const experienceItem = {
      position: 'Engineer',
      company: 'Example Co',
      startDate: '2020-01-01',
      endDate: '2022-01-01',
      description: ['First line', ''],
    }

    const { contextValue } = renderWithResume(<Experience />, {
      experience: [experienceItem],
    })

    fireEvent.click(screen.getByText('Click to edit...'))
    const editable = document.querySelector('[contenteditable]') as HTMLElement
    fireEvent.keyDown(editable, { key: 'Backspace' })

    expect(contextValue.updateArrayItem).toHaveBeenCalledWith('experience', 0, {
      ...experienceItem,
      description: ['First line'],
    })
  })

  it('keeps first line as placeholder when deleting empty first line', () => {
    const experienceItem = {
      position: 'Engineer',
      company: 'Example Co',
      startDate: '2020-01-01',
      endDate: '2022-01-01',
      description: [''],
    }

    const { contextValue } = renderWithResume(<Experience />, {
      experience: [experienceItem],
    })

    fireEvent.click(screen.getByText('Click to edit...'))
    const editable = document.querySelector('[contenteditable]') as HTMLElement
    fireEvent.keyDown(editable, { key: 'Backspace' })

    expect(contextValue.updateArrayItem).toHaveBeenCalledWith('experience', 0, {
      ...experienceItem,
      description: [''],
    })
  })

  it('renders an Add button', () => {
    renderWithResume(<Experience />)
    expect(
      screen.getByRole('button', { name: /add experience/i })
    ).toBeInTheDocument()
  })

  it('hides Add button when showAddButton is false', () => {
    renderWithResume(<Experience showAddButton={false} />)
    expect(screen.queryByRole('button', { name: /add experience/i })).toBeNull()
  })

  it('calls addArrayItem when Add button is clicked', () => {
    const { contextValue } = renderWithResume(<Experience />)
    fireEvent.click(screen.getByRole('button', { name: /add experience/i }))
    expect(contextValue.addArrayItem).toHaveBeenCalledWith('experience')
  })

  it('calls removeArrayItem when Remove entry is clicked', () => {
    const { contextValue } = renderWithResume(<Experience />)
    const removeButtons = screen.getAllByRole('button', {
      name: 'Remove entry',
    })
    fireEvent.click(removeButtons[0])
    expect(contextValue.removeArrayItem).toHaveBeenCalledWith('experience', 0)
  })

  it('inserts a new blank entry above the current one', () => {
    const itemA = {
      position: 'Role A',
      company: 'Company A',
      startDate: '2019',
      endDate: '2020',
      description: ['A'],
    }
    const itemB = {
      position: 'Role B',
      company: 'Company B',
      startDate: '2020',
      endDate: '2021',
      description: ['B'],
    }

    const { contextValue } = renderWithResume(<Experience />, {
      experience: [itemA, itemB],
    })

    fireEvent.click(
      screen.getAllByRole('button', { name: 'Add entry above' })[1]
    )

    expect(contextValue.addArrayItem).toHaveBeenCalledWith('experience')
    expect(contextValue.updateArrayItem).toHaveBeenCalledWith(
      'experience',
      2,
      itemB
    )
    expect(contextValue.updateArrayItem).toHaveBeenCalledWith('experience', 1, {
      position: '',
      company: '',
      startDate: '',
      endDate: '',
      description: [''],
    })
  })

  it('uses itemIndexes mapping for remove and update actions', () => {
    const mappedItem = {
      position: 'Mapped Position',
      company: 'Mapped Co',
      startDate: '2021-01-01',
      endDate: '2022-01-01',
      description: ['Mapped description'],
    }

    const { contextValue } = renderWithResume(
      <Experience
        items={[mappedItem]}
        itemIndexes={[1]}
        showAddButton={false}
      />,
      {
        experience: [
          {
            position: 'Original 0',
            company: 'Original Co 0',
            startDate: '2019-01-01',
            endDate: '2020-01-01',
            description: ['Original description'],
          },
          mappedItem,
        ],
      }
    )

    fireEvent.click(screen.getByRole('button', { name: 'Remove entry' }))
    expect(contextValue.removeArrayItem).toHaveBeenCalledWith('experience', 1)

    contextValue.updateArrayItem.mockClear()

    fireEvent.click(screen.getByText('Mapped Position'))
    const editable = document.querySelector('[contenteditable]') as HTMLElement
    editable.innerText = 'Updated Mapped Position'
    fireEvent.blur(editable)

    expect(contextValue.updateArrayItem).toHaveBeenCalledWith('experience', 1, {
      ...mappedItem,
      position: 'Updated Mapped Position',
    })
  })

  it('safely skips undefined items passed through items prop', () => {
    renderWithResume(
      <Experience
        items={[undefined as unknown as never]}
        itemIndexes={[0]}
        showAddButton={false}
      />,
      {
        experience: [
          {
            position: 'Software Engineer',
            company: 'Tech Company',
            startDate: '2019-06-01',
            endDate: '2021-08-01',
            description: ['Worked on various projects using JavaScript.'],
          },
        ],
      }
    )

    expect(screen.queryByRole('button', { name: 'Remove entry' })).toBeNull()
  })

  it('renders no entries when experience is empty', () => {
    renderWithResume(<Experience />, { experience: [] })
    expect(screen.queryByText('Software Engineer')).toBeNull()
  })
})

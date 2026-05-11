import { screen, fireEvent } from '@testing-library/react'
import { Education } from '../Education'
import { renderWithResume } from '../../../__tests__/helpers/renderWithResume'

describe('Education', () => {
  it('renders the Education section header', () => {
    renderWithResume(<Education />)
    expect(
      screen.getByRole('heading', { name: 'Education' })
    ).toBeInTheDocument()
  })

  it('renders all education entries', () => {
    renderWithResume(<Education />)
    expect(
      screen.getByText('Bachelor of Science in Computer Science')
    ).toBeInTheDocument()
    expect(screen.getByText('High School Diploma')).toBeInTheDocument()
  })

  it('renders institution names', () => {
    renderWithResume(<Education />)
    expect(screen.getByText('University of Example')).toBeInTheDocument()
    expect(screen.getByText('Example High School')).toBeInTheDocument()
  })

  it('renders an Add button', () => {
    renderWithResume(<Education />)
    expect(
      screen.getByRole('button', { name: /add education/i })
    ).toBeInTheDocument()
  })

  it('uses dark Add button styling for sidebar contrast', () => {
    renderWithResume(<Education />)
    expect(screen.getByRole('button', { name: /add education/i })).toHaveClass(
      'text-white/60'
    )
  })

  it('calls updateArrayItem when editable education fields change', () => {
    const educationItem = {
      institution: 'University of Example',
      degree: 'Bachelor of Science in Computer Science',
      startDate: '2015-09-01',
      endDate: '2019-06-01',
    }

    const { contextValue } = renderWithResume(<Education />, {
      education: [educationItem],
    })

    const editField = (currentValue: string, nextValue: string) => {
      fireEvent.click(screen.getByText(currentValue))
      const editable = document.querySelector(
        '[contenteditable]'
      ) as HTMLElement
      editable.innerText = nextValue
      fireEvent.blur(editable)
    }

    editField('Bachelor of Science in Computer Science', 'MSc Computer Science')
    expect(contextValue.updateArrayItem).toHaveBeenCalledWith('education', 0, {
      ...educationItem,
      degree: 'MSc Computer Science',
    })

    contextValue.updateArrayItem.mockClear()

    editField('University of Example', 'Example Institute')
    expect(contextValue.updateArrayItem).toHaveBeenCalledWith('education', 0, {
      ...educationItem,
      institution: 'Example Institute',
    })

    contextValue.updateArrayItem.mockClear()

    editField('2015-09-01', '2016-09-01')
    expect(contextValue.updateArrayItem).toHaveBeenCalledWith('education', 0, {
      ...educationItem,
      startDate: '2016-09-01',
    })

    contextValue.updateArrayItem.mockClear()

    editField('2019-06-01', '2020-06-01')
    expect(contextValue.updateArrayItem).toHaveBeenCalledWith('education', 0, {
      ...educationItem,
      endDate: '2020-06-01',
    })
  })

  it('calls addArrayItem when Add button is clicked', () => {
    const { contextValue } = renderWithResume(<Education />)
    fireEvent.click(screen.getByRole('button', { name: /add education/i }))
    expect(contextValue.addArrayItem).toHaveBeenCalledWith('education')
  })

  it('calls removeArrayItem when a remove button is clicked', () => {
    const { contextValue } = renderWithResume(<Education />)
    const removeButtons = screen.getAllByRole('button', { name: '✕' })
    fireEvent.click(removeButtons[0])
    expect(contextValue.removeArrayItem).toHaveBeenCalledWith('education', 0)
  })

  it('renders no entries when education is empty', () => {
    renderWithResume(<Education />, { education: [] })
    expect(screen.queryByText('University of Example')).toBeNull()
  })
})

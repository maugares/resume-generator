import { renderHook, act } from '@testing-library/react'
import { useResume } from '../useResume'
import type { ResumeData } from '../../types'

const INITIAL: ResumeData = {
  name: '',
  email: '',
  phone: '',
  address: '',
  summary: '',
  experience: [],
  education: [],
  languages: [''],
  skills: '',
}

beforeEach(() => {
  localStorage.clear()
  vi.restoreAllMocks()
})

describe('useResume', () => {
  it('initialises with the provided initial state', () => {
    const { result } = renderHook(() => useResume(INITIAL))
    expect(result.current.formData).toEqual(INITIAL)
  })

  it('loads persisted data from localStorage on mount', () => {
    const persisted = { ...INITIAL, name: 'Persisted' }
    localStorage.setItem('resume_editor_data', JSON.stringify(persisted))
    const { result } = renderHook(() => useResume(INITIAL))
    expect(result.current.formData.name).toBe('Persisted')
  })

  it('normalizes legacy string descriptions from persisted data', () => {
    const persisted = {
      ...INITIAL,
      experience: [
        {
          position: 'Engineer',
          company: 'Acme',
          startDate: '2020',
          endDate: '2022',
          description: 'Line one\nLine two',
        },
      ],
    }

    localStorage.setItem('resume_editor_data', JSON.stringify(persisted))
    const { result } = renderHook(() => useResume(INITIAL))

    expect(result.current.formData.experience[0].description).toEqual([
      'Line one',
      'Line two',
    ])
  })

  it('handleChange updates a scalar field', () => {
    const { result } = renderHook(() => useResume(INITIAL))
    act(() => result.current.handleChange('name', 'Jane'))
    expect(result.current.formData.name).toBe('Jane')
  })

  it('addArrayItem adds an empty experience entry', () => {
    const { result } = renderHook(() => useResume(INITIAL))
    act(() => result.current.addArrayItem('experience'))
    expect(result.current.formData.experience).toHaveLength(1)
    expect(result.current.formData.experience[0].position).toBe('')
  })

  it('addArrayItem adds an empty education entry', () => {
    const { result } = renderHook(() => useResume(INITIAL))
    act(() => result.current.addArrayItem('education'))
    expect(result.current.formData.education).toHaveLength(1)
    expect(result.current.formData.education[0].degree).toBe('')
  })

  it('addArrayItem adds an empty language entry', () => {
    const { result } = renderHook(() => useResume(INITIAL))
    act(() => result.current.addArrayItem('languages'))
    expect(result.current.formData.languages).toHaveLength(2)
    expect(result.current.formData.languages[1]).toBe('')
  })

  it('updateArrayItem updates the correct item', () => {
    const { result } = renderHook(() => useResume(INITIAL))
    act(() => result.current.addArrayItem('experience'))
    act(() =>
      result.current.updateArrayItem('experience', 0, {
        position: 'Engineer',
        company: 'Acme',
        startDate: '2020',
        endDate: '2022',
        description: ['Built things.'],
      })
    )
    expect(result.current.formData.experience[0].position).toBe('Engineer')
  })

  it('removeArrayItem removes the item at the given index', () => {
    const { result } = renderHook(() => useResume(INITIAL))
    act(() => result.current.addArrayItem('experience'))
    act(() => result.current.addArrayItem('experience'))
    act(() => result.current.removeArrayItem('experience', 0))
    expect(result.current.formData.experience).toHaveLength(1)
  })

  it('persists changes to localStorage', () => {
    const { result } = renderHook(() => useResume(INITIAL))
    act(() => result.current.handleChange('name', 'Stored'))
    const saved = JSON.parse(localStorage.getItem('resume_editor_data') ?? '{}')
    expect(saved.name).toBe('Stored')
  })

  it('normalizes missing languages from persisted data', () => {
    const { languages: _, ...legacyWithoutLanguages } = INITIAL
    localStorage.setItem(
      'resume_editor_data',
      JSON.stringify(legacyWithoutLanguages)
    )

    const { result } = renderHook(() => useResume(INITIAL))
    expect(result.current.formData.languages).toEqual([''])
  })
})

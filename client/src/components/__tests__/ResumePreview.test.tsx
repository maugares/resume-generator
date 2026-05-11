import { act, screen } from '@testing-library/react'
import { renderWithResume } from '../../__tests__/helpers/renderWithResume'
import { ResumePreview } from '../ResumePreview'

describe('ResumePreview', () => {
  const originalIntersectionObserver = globalThis.IntersectionObserver

  afterEach(() => {
    vi.restoreAllMocks()
    globalThis.IntersectionObserver = originalIntersectionObserver
  })

  it('renders sidebar sections with Languages between Education and Skills', () => {
    const { getByRole } = renderWithResume(<ResumePreview />)

    const educationHeading = getByRole('heading', { name: 'Education' })
    const languagesHeading = getByRole('heading', { name: 'Languages' })
    const skillsHeading = getByRole('heading', { name: 'Skills' })

    expect(
      educationHeading.compareDocumentPosition(languagesHeading) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy()
    expect(
      languagesHeading.compareDocumentPosition(skillsHeading) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy()
  })

  it('shows page counters for single-page content', () => {
    const { getAllByText, getByText } = renderWithResume(<ResumePreview />)

    expect(getByText('Page 1 of 1')).toBeInTheDocument()
    expect(getAllByText('Page 1 / 1')).toHaveLength(1)
  })

  it('renders multiple pages and continuation labels when measured content overflows', () => {
    vi.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(100)

    renderWithResume(<ResumePreview />, {
      experience: [
        {
          position: 'Role 1',
          company: 'Company 1',
          startDate: '2020',
          endDate: '2021',
          description: ['Built features'],
        },
        {
          position: 'Role 2',
          company: 'Company 2',
          startDate: '2021',
          endDate: '2022',
          description: [''],
        },
      ],
    })

    expect(screen.getByText('Page 1 of 2')).toBeInTheDocument()
    expect(screen.getByText('Continued on Page 2')).toBeInTheDocument()

    expect(screen.getAllByRole('heading', { name: 'Experience' })).toHaveLength(
      1
    )
    expect(
      screen.getAllByRole('button', { name: /add experience/i })
    ).toHaveLength(1)
  })

  it('updates current page based on IntersectionObserver visibility ranking', () => {
    vi.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(100)

    const observedElements: Element[] = []
    let observerCallback:
      | ((entries: IntersectionObserverEntry[]) => void)
      | undefined

    class ControlledIntersectionObserver {
      constructor(callback: (entries: IntersectionObserverEntry[]) => void) {
        observerCallback = callback
      }

      observe(element: Element) {
        observedElements.push(element)
      }

      unobserve() {}

      disconnect() {}
    }

    globalThis.IntersectionObserver =
      ControlledIntersectionObserver as unknown as typeof IntersectionObserver

    renderWithResume(<ResumePreview />, {
      experience: [
        {
          position: 'Role 1',
          company: 'Company 1',
          startDate: '2020',
          endDate: '2021',
          description: ['Built features'],
        },
        {
          position: 'Role 2',
          company: 'Company 2',
          startDate: '2021',
          endDate: '2022',
          description: ['Shipped changes'],
        },
      ],
    })

    expect(observedElements.length).toBeGreaterThan(1)
    expect(observerCallback).toBeDefined()

    const secondPageElement = observedElements.find(
      (element) => element.getAttribute('data-page-number') === '2'
    )

    expect(secondPageElement).toBeDefined()

    act(() => {
      observerCallback?.([
        {
          isIntersecting: false,
          intersectionRatio: 0,
          target: observedElements[0],
        } as IntersectionObserverEntry,
      ])
    })

    act(() => {
      observerCallback?.([
        {
          isIntersecting: true,
          intersectionRatio: 0.2,
          target: observedElements[0],
        } as IntersectionObserverEntry,
        {
          isIntersecting: true,
          intersectionRatio: 0.9,
          target: secondPageElement as Element,
        } as IntersectionObserverEntry,
      ])
    })

    expect(
      screen.getAllByText(
        (_, element) =>
          element?.textContent?.replace(/\s+/g, ' ').trim() === 'Page 2 of 2'
      ).length
    ).toBeGreaterThan(0)
  })
})

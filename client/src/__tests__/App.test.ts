import { fireEvent, render, screen } from '@testing-library/react'
import { createElement } from 'react'
import App from '../App'

describe('App', () => {
  it('renders the download button and page indicator', () => {
    render(createElement(App))

    expect(
      screen.getByRole('button', { name: /download pdf/i })
    ).toBeInTheDocument()
    expect(screen.getByText('Page 1 of 1')).toBeInTheDocument()
  })

  it('calls window.print when Download PDF is clicked', () => {
    const printSpy = vi
      .spyOn(window, 'print')
      .mockImplementation(() => undefined)

    render(createElement(App))
    fireEvent.click(screen.getByRole('button', { name: /download pdf/i }))

    expect(printSpy).toHaveBeenCalledTimes(1)
  })
})

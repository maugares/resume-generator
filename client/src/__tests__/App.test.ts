import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { createElement } from 'react'
import App from '../App'
import { generatePdf } from '../services'

vi.mock('../services', () => ({
  generatePdf: vi.fn(),
}))

vi.mock('../services/previewSnapshot', () => ({
  buildPreviewSnapshotHtml: vi.fn(() => '<html><body>preview</body></html>'),
}))

describe('App', () => {
  it('renders the download button and page indicator', () => {
    render(createElement(App))

    expect(
      screen.getByRole('button', { name: /download pdf/i })
    ).toBeInTheDocument()
    expect(screen.getByText('Page 1 of 1')).toBeInTheDocument()
  })

  it('requests PDF from server when Download PDF is clicked', async () => {
    const mockBlob = new Blob(['pdf'], { type: 'application/pdf' })
    vi.mocked(generatePdf).mockResolvedValue(mockBlob)

    const createObjectURLSpy = vi
      .spyOn(URL, 'createObjectURL')
      .mockReturnValue('blob:resume')
    const revokeObjectURLSpy = vi
      .spyOn(URL, 'revokeObjectURL')
      .mockImplementation(() => undefined)

    render(createElement(App))
    fireEvent.click(screen.getByRole('button', { name: /download pdf/i }))

    await waitFor(() => {
      expect(generatePdf).toHaveBeenCalledTimes(1)
    })

    expect(createObjectURLSpy).toHaveBeenCalledWith(mockBlob)
    expect(revokeObjectURLSpy).toHaveBeenCalledWith('blob:resume')
  })
})

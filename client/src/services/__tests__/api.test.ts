import { generatePdf } from '../api'
import { mockResumeData } from '../../__tests__/__mocks__/resumeData'

describe('generatePdf', () => {
  it('returns a blob when the request succeeds', async () => {
    const pdfBlob = new Blob(['pdf-content'], { type: 'application/pdf' })

    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      blob: vi.fn().mockResolvedValue(pdfBlob),
    } as unknown as Response)

    const result = await generatePdf(mockResumeData)

    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:5000/create-pdf',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
    )
    expect(result).toBe(pdfBlob)
  })

  it('throws the backend error text when the request fails', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      status: 500,
      text: vi.fn().mockResolvedValue('PDF generation failed'),
    } as unknown as Response)

    await expect(generatePdf(mockResumeData)).rejects.toThrow(
      'PDF generation failed'
    )
  })

  it('falls back to status message when backend error text is empty', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      status: 503,
      text: vi.fn().mockResolvedValue(''),
    } as unknown as Response)

    await expect(generatePdf(mockResumeData)).rejects.toThrow(
      'Request failed with status 503'
    )
  })
})

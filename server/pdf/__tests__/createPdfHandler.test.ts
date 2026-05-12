import type { Request, Response } from 'express'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import puppeteer from 'puppeteer'
import { generateHTML } from '../../templates/ResumeTemplate.ts'
import { createPdfHandler } from '../createPdfHandler.ts'
import type { ResumeData } from '../../types/resume.ts'

vi.mock('puppeteer', () => ({
  default: {
    launch: vi.fn(),
  },
}))

vi.mock('../../templates/ResumeTemplate.ts', () => ({
  generateHTML: vi.fn(),
}))

const resumeData: ResumeData = {
  name: 'Mauro Garcia',
  email: 'mauro@example.com',
  address: 'Amsterdam',
  phone: '+3100000000',
  summary: '',
  education: [],
  experience: [],
  languages: ['English'],
  skills: 'TypeScript',
}

const createResponse = () => {
  const contentType = vi.fn().mockReturnThis()
  const send = vi.fn().mockReturnThis()
  const status = vi.fn().mockReturnThis()

  return {
    res: {
      contentType,
      send,
      status,
    } as unknown as Response,
    mocks: { contentType, send, status },
  }
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('createPdfHandler', () => {
  it('uses previewHtml when provided and renders in screen media mode', async () => {
    const pdfBuffer = Buffer.from('pdf')
    const page = {
      emulateMediaType: vi.fn().mockResolvedValue(undefined),
      setContent: vi.fn().mockResolvedValue(undefined),
      evaluate: vi.fn().mockResolvedValue(undefined),
      pdf: vi.fn().mockResolvedValue(pdfBuffer),
    }
    const browser = {
      newPage: vi.fn().mockResolvedValue(page),
      close: vi.fn().mockResolvedValue(undefined),
    }

    vi.mocked(puppeteer.launch).mockResolvedValue(
      browser as unknown as puppeteer.Browser
    )

    const req = {
      body: {
        ...resumeData,
        data: resumeData,
        previewHtml: '<html><body>preview</body></html>',
      },
    } as Request
    const { res, mocks } = createResponse()

    await createPdfHandler(req, res)

    expect(generateHTML).not.toHaveBeenCalled()
    expect(page.emulateMediaType).toHaveBeenCalledWith('screen')
    expect(page.setContent).toHaveBeenCalledWith(
      '<html><body>preview</body></html>',
      { waitUntil: 'networkidle0' }
    )
    expect(page.pdf).toHaveBeenCalledWith(
      expect.objectContaining({
        preferCSSPageSize: true,
        printBackground: true,
      })
    )
    expect(mocks.contentType).toHaveBeenCalledWith('application/pdf')
    expect(mocks.send).toHaveBeenCalledWith(pdfBuffer)
    expect(browser.close).toHaveBeenCalledTimes(1)
  })

  it('falls back to generated HTML when previewHtml is not provided', async () => {
    const pdfBuffer = Buffer.from('pdf')
    const page = {
      emulateMediaType: vi.fn().mockResolvedValue(undefined),
      setContent: vi.fn().mockResolvedValue(undefined),
      evaluate: vi.fn().mockResolvedValue(undefined),
      pdf: vi.fn().mockResolvedValue(pdfBuffer),
    }
    const browser = {
      newPage: vi.fn().mockResolvedValue(page),
      close: vi.fn().mockResolvedValue(undefined),
    }

    vi.mocked(puppeteer.launch).mockResolvedValue(
      browser as unknown as puppeteer.Browser
    )
    vi.mocked(generateHTML).mockReturnValue(
      '<html><body>generated</body></html>'
    )

    const req = { body: resumeData } as Request
    const { res } = createResponse()

    await createPdfHandler(req, res)

    expect(generateHTML).toHaveBeenCalledWith(resumeData)
    expect(page.emulateMediaType).toHaveBeenCalledWith('print')
    expect(page.setContent).toHaveBeenCalledWith(
      '<html><body>generated</body></html>',
      { waitUntil: 'networkidle0' }
    )
  })

  it('returns 500 with an error message when pdf generation fails', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const page = {
      emulateMediaType: vi.fn().mockResolvedValue(undefined),
      setContent: vi.fn().mockResolvedValue(undefined),
      evaluate: vi.fn().mockResolvedValue(undefined),
      pdf: vi.fn().mockRejectedValue(new Error('pdf boom')),
    }
    const browser = {
      newPage: vi.fn().mockResolvedValue(page),
      close: vi.fn().mockResolvedValue(undefined),
    }

    vi.mocked(puppeteer.launch).mockResolvedValue(
      browser as unknown as puppeteer.Browser
    )
    vi.mocked(generateHTML).mockReturnValue(
      '<html><body>generated</body></html>'
    )

    const req = { body: resumeData } as Request
    const { res, mocks } = createResponse()

    await createPdfHandler(req, res)

    expect(browser.close).toHaveBeenCalledTimes(1)
    expect(mocks.status).toHaveBeenCalledWith(500)
    expect(mocks.send).toHaveBeenCalledWith(
      'Server failed to generate PDF: pdf boom'
    )

    consoleSpy.mockRestore()
  })
})

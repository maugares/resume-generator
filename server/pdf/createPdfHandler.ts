import type { Request, Response } from 'express'
import puppeteer from 'puppeteer'
import { generateHTML } from '../templates/ResumeTemplate.ts'
import type { ResumeData } from '../types/resume.ts'

interface CreatePdfPayload {
  data: ResumeData
  previewHtml?: string
}

export type CreatePdfRequestBody = ResumeData | (ResumeData & CreatePdfPayload)

const hasPreviewPayload = (body: CreatePdfRequestBody): boolean => {
  return typeof body === 'object' && body !== null && 'data' in body
}

const getResumeData = (body: CreatePdfRequestBody): ResumeData => {
  if (hasPreviewPayload(body)) {
    return (body as ResumeData & CreatePdfPayload).data
  }

  return body
}

const getPreviewHtml = (body: CreatePdfRequestBody): string | undefined => {
  if (!hasPreviewPayload(body)) {
    return undefined
  }

  return (body as ResumeData & CreatePdfPayload).previewHtml
}

export const createPdfHandler = async (
  req: Request<{}, {}, CreatePdfRequestBody>,
  res: Response
) => {
  let browser: puppeteer.Browser | null = null

  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })

    const payload = req.body
    const resumeData = getResumeData(payload)
    const previewHtml = getPreviewHtml(payload)
    const hasClientPreviewHtml =
      typeof previewHtml === 'string' && previewHtml.length > 0
    const htmlContent = previewHtml ?? generateHTML(resumeData)

    const page = await browser.newPage()

    // Match client preview styles for snapshot-based exports.
    await page.emulateMediaType(hasClientPreviewHtml ? 'screen' : 'print')

    await page.setContent(htmlContent, { waitUntil: 'networkidle0' })

    // Ensure layout is stable before PDF capture.
    await page.evaluate(() => document.fonts?.ready)

    const pdfBuffer = await page.pdf({
      format: 'A4',
      preferCSSPageSize: true,
      scale: 1,
      printBackground: true,
      margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
    })

    await browser.close()
    res.contentType('application/pdf').send(pdfBuffer)
  } catch (error) {
    if (browser) await browser.close()
    const message = error instanceof Error ? error.message : String(error)
    console.error('PDF generation error:', error)
    res.status(500).send(`Server failed to generate PDF: ${message}`)
  }
}

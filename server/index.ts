/* maugares/resume-generator/server/index.ts */
import express from 'express'
import type { Request, Response } from 'express'
import puppeteer from 'puppeteer'
import cors from 'cors'
import type { ResumeData } from './types/resume.ts'
import { generateHTML } from './templates/ResumeTemplate.ts'

interface CreatePdfPayload {
  data: ResumeData
  previewHtml?: string
}

type CreatePdfRequestBody = ResumeData | (ResumeData & CreatePdfPayload)

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

const app = express()
const PORT: number = 5000

app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json({ limit: '5mb' }))

app.post(
  '/create-pdf',
  async (req: Request<{}, {}, CreatePdfRequestBody>, res: Response) => {
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
)

app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
)

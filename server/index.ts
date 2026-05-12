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

const hasPreviewPayload = (
  body: ResumeData | CreatePdfPayload
): body is CreatePdfPayload => {
  return typeof body === 'object' && body !== null && 'data' in body
}

const app = express()
const PORT: number = 5000

app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json({ limit: '5mb' }))

app.post(
  '/create-pdf',
  async (
    req: Request<{}, {}, ResumeData | CreatePdfPayload>,
    res: Response
  ) => {
    let browser: puppeteer.Browser | null = null
    try {
      browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      })

      const payload = req.body
      const resumeData = hasPreviewPayload(payload) ? payload.data : payload
      const htmlContent =
        hasPreviewPayload(payload) && payload.previewHtml
          ? payload.previewHtml
          : generateHTML(resumeData)

      const page = await browser.newPage()

      await page.emulateMediaType('print')

      await page.setContent(htmlContent, { waitUntil: 'networkidle0' })

      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
      })

      await browser.close()
      res.contentType('application/pdf').send(pdfBuffer)
    } catch (error) {
      if (browser) await browser.close()
      res.status(500).send('Server failed to generate PDF')
    }
  }
)

app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
)

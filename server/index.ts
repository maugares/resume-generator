import express from 'express'
import type { Request, Response } from 'express'
import puppeteer from 'puppeteer'
import cors from 'cors'
import type { ResumeData } from '../client/src/types/resume'
import { generateHTML } from './templates/ResumeTemplate.ts'

const app = express()
const PORT: number = 5000

app.use(
  cors({
    origin: 'http://localhost:5173', // Your Vite frontend port
    methods: ['POST'],
    credentials: true,
  })
)

app.use(express.json())

// We tell Express that the Request body follows the ResumeData interface
app.post(
  '/create-pdf',
  async (req: Request<{}, {}, ResumeData>, res: Response) => {
    let browser: puppeteer.Browser | null = null
    try {
      console.log('Incoming request for:', req.body.name)

      // Basic validation check
      if (!req.body.name) {
        console.error('Validation Failed: Name is missing')
        return res.status(400).send('Name field is required to generate a PDF')
      }

      browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      })
      const page = await browser.newPage()

      // Generate the HTML using our new modular template
      const htmlContent = generateHTML(req.body)

      // networkidle0 is crucial here to ensure all styles are processed
      await page.setContent(htmlContent, { waitUntil: 'networkidle0' })

      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true, // Required for the sidebar color
        margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
      })

      await browser.close()

      res.contentType('application/pdf')
      res.send(pdfBuffer)
      console.log('Successfully generated PDF')
    } catch (error) {
      if (browser) await browser.close()
      console.error('Generation Error:', error)
      res.status(500).send('Server failed to generate PDF')
    }
  }
)

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})

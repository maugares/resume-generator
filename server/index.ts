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
    try {
      console.log('Incoming request for:', req.body.name)

      const browser = await puppeteer.launch({ headless: true })
      const page = await browser.newPage()

      // Generate the HTML using our new modular template
      const htmlContent = generateHTML(req.body)

      await page.setContent(htmlContent)

      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true, // Required for the sidebar color
        margin: { top: '0', right: '0', bottom: '0', left: '0' },
      })

      await browser.close()

      res.contentType('application/pdf')
      res.send(pdfBuffer)
      console.log('Successfully generated PDF')
    } catch (error) {
      console.error('Generation Error:', error)
      res.status(500).send('Server failed to generate PDF')
    }
  }
)

app.listen(PORT, () => {
  console.log(`✅ Server is active at http://localhost:${PORT}`)
})

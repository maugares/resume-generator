import express from 'express'
import type { Request, Response } from 'express'
import puppeteer from 'puppeteer'
import cors from 'cors'
import { generateHTML } from './templates/ResumeTemplate.ts'

// Define the shape of the user's resume data
interface ResumeData {
  name: string
  email: string
  experience: string
}

const app = express()
const PORT: number = 5000

app.use(cors())
app.use(express.json())

// We tell Express that the Request body follows the ResumeData interface
app.post(
  '/create-pdf',
  async (req: Request<{}, {}, ResumeData>, res: Response) => {
    try {
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
    } catch (error) {
      console.error(error)
      res.status(500).send('Error generating PDF')
    }
  }
)

app.listen(PORT, () => {
  console.log(`TS Server running on http://localhost:${PORT}`)
})

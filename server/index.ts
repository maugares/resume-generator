import express from 'express'
import type { Request, Response } from 'express'
import puppeteer from 'puppeteer'
import cors from 'cors'

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
    const { name, email, experience } = req.body

    try {
      const browser = await puppeteer.launch()
      const page = await browser.newPage()

      // Simple template with basic typing
      const content: string = `
            <h1>${name}</h1>
            <p>Email: ${email}</p>
            <p>${experience}</p>
        `

      await page.setContent(content)
      const pdfBuffer = await page.pdf({ format: 'A4' })

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

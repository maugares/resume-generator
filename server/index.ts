/* maugares/resume-generator/server/index.ts */
import express from 'express'
import cors from 'cors'
import { createPdfHandler } from './pdf/createPdfHandler.ts'

const app = express()
const PORT: number = 5000

app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json({ limit: '5mb' }))

app.post('/create-pdf', createPdfHandler)

app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
)

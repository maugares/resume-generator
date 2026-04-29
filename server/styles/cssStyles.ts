import fs from 'fs'
import path from 'path'

export const cssStyles: string = fs.readFileSync(
  path.join(__dirname, 'styles.css'),
  'utf-8'
)

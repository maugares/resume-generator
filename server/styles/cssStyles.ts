import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Recreate __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Resolve the path to styles.css relative to this file
const stylesPath = path.join(__dirname, 'styles.css')

export const cssStyles: string = fs.readFileSync(stylesPath, 'utf-8')
import { useResume } from './hooks'
import type { ResumeData } from './types'
import { ResumePreview } from './components'
import { ResumeProvider } from './context'
import { generatePdf } from './services'
import { buildPreviewSnapshotHtml } from './services/previewSnapshot'

const INITIAL_STATE: ResumeData = {
  name: '',
  email: '',
  phone: '',
  address: '',
  summary: '',
  experience: [],
  education: [],
  languages: [''],
  skills: '',
}

function App() {
  const resume = useResume(INITIAL_STATE)

  const handlePrint = async () => {
    try {
      const previewHtml = buildPreviewSnapshotHtml()

      if (!previewHtml) {
        window.print()
        return
      }

      const pdfBlob = await generatePdf(resume.formData, previewHtml)
      const fileUrl = URL.createObjectURL(pdfBlob)
      const link = document.createElement('a')
      const safeName =
        resume.formData.name.trim().replace(/\s+/g, '-').toLowerCase() ||
        'resume'

      link.href = fileUrl
      link.download = `${safeName}.pdf`
      document.body.appendChild(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(fileUrl)
    } catch {
      window.print()
    }
  }

  return (
    <ResumeProvider value={resume}>
      <div className="relative w-screen h-screen bg-[#525659] overflow-hidden">
        {/* Floating Download Button - Hidden during print */}
        <button
          onClick={handlePrint}
          className="fixed bottom-8 right-8 z-50 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg no-print transition-all transform hover:scale-105"
        >
          Download PDF
        </button>

        <div className="h-full overflow-y-auto">
          <ResumePreview />
        </div>
      </div>
    </ResumeProvider>
  )
}

export default App

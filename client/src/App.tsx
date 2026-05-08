import { useResume } from './hooks/useResume'
import type { ResumeData } from './types/resume'
import { ResumePreview } from './components/ResumePreview'
import { ResumeProvider } from './context/ResumeContext'
import './styles/App.css'

const INITIAL_STATE: ResumeData = {
  name: '',
  email: '',
  phone: '',
  address: '',
  summary: '',
  experience: [],
  education: [],
  skills: '',
}

function App() {
  const resume = useResume(INITIAL_STATE)

  const handlePrint = () => {
    window.print() // Triggers the system print dialog
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

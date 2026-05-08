import React from 'react'
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

/* 
The App component manages the state of the resume form and handles user interactions. 
It uses:
    - The useState hook to maintain the form data, which includes fields like name, email, experience, etc. 
    - The handleChange function updates the form data state whenever the user types into the form fields.
    - The handleSubmit function is called when the form is submitted; 
        - it prevents the default form submission behavior
        - calls the generatePdf function to send the data to the server
        - retrieve the generated PDF as a Blob
        - creates a download link for the user to save the PDF file
    - The component renders a main section with a title and the ResumeForm component, passing down the necessary props for managing form state and handling submissions. 
*/
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

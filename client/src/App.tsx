import React from 'react'
import { useResume } from './hooks/useResume'
import { ResumeForm } from './components/ResumeForm'
import type { ResumeData } from './types/resume'
import { ResumePreview } from './components/ResumePreview'
import { mockResumeData } from './__mocks__/resumeData'

const INITIAL_STATE: ResumeData = {
  ...mockResumeData,
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
  const { formData, handleChange, handleSubmit, isLoading } =
    useResume(INITIAL_STATE)

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
      {/* Form Side (400px width) */}
      <div
        style={{
          width: '400px',
          borderRight: '1px solid #ccc',
          padding: '20px',
          overflowY: 'auto',
        }}
      >
        <h2>Resume Editor</h2>
        <ResumeForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
        {isLoading && <p>Generating PDF...</p>}
      </div>

      {/* Preview Side (Flex remaining space) */}
      <ResumePreview data={formData} />
    </div>
  )
}

export default App

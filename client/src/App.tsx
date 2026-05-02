import React from 'react'
import { useResume } from './hooks/useResume'
import { ResumeForm } from './components/ResumeForm'
import type { ResumeData } from './types/resume'
import { ResumePreview } from './components/ResumePreview'
import './styles/App.css'

const INITIAL_STATE: ResumeData = {
  name: '',
  email: '',
  phone: '',
  address: '',
  summary: '',
  experience: [],
  education: [],
  skills: [],
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
  const {
    formData,
    handleChange,
    handleSubmit,
    isLoading,
    updateArrayItem,
    addArrayItem,
    removeArrayItem,
    clearForm,
  } = useResume(INITIAL_STATE)

  return (
    <div
      style={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Sidebar Editor */}
      <div
        style={{
          width: '500px',
          borderRight: '1px solid #ccc',
          height: '100%',
          overflowY: 'auto',
          backgroundColor: '#524f6374',
        }}
      >
        <h2 style={{ padding: '20px', textAlign: 'center' }}>Resume Editor</h2>
        <ResumeForm
          formData={formData}
          handleChange={handleChange}
          updateArrayItem={updateArrayItem}
          addArrayItem={addArrayItem}
          removeArrayItem={removeArrayItem}
          onSubmit={handleSubmit}
          clearForm={clearForm}
          isLoading={isLoading}
        />
      </div>

      {/* Live Preview Pane */}
      <div style={{ flex: 1, backgroundColor: '#525659', overflowY: 'auto' }}>
        <ResumePreview data={formData} />
      </div>
    </div>
  )
}

export default App

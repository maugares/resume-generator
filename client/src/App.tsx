import { useResume } from './hooks/useResume'
import { ResumeForm } from './components/ResumeForm'
import { ResumeData } from './types/resume'

const INITIAL_STATE: ResumeData = {
  name: '',
  email: '',
  address: '',
  phone: '',
  education: '',
  experience: '',
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
  const { formData, handleChange, handleSubmit, isLoading } = useResume(INITIAL_STATE);

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <header>
        <h1>Resume Builder</h1>
        <p>Fill out the form to generate your A4 PDF.</p>
      </header>

      <ResumeForm 
        formData={formData} 
        onChange={handleChange} 
        onSubmit={handleSubmit} 
      />

      {isLoading && <p>Generating your PDF... Please wait.</p>}
    </main>
  );
}

export default App;
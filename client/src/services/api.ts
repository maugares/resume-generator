import type { ResumeData } from '../types/resume'

/* This function sends the resume data to the server and retrieves the generated PDF as a Blob.
   It uses the Fetch API to make a POST request to the server's /create-pdf endpoint, passing the resume data as JSON.
   If the response is successful, it returns the PDF as a Blob; otherwise, it throws an error. */
export const generatePdf = async (data: ResumeData): Promise<Blob> => {
  const response = await fetch('http://localhost:5000/create-pdf', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) throw new Error('Failed to generate PDF')

  return await response.blob()
}

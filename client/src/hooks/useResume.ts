import { useState, ChangeEvent, FormEvent } from 'react'
import type { ResumeData } from '../types/resume'
import { generatePdf } from '../services/api'

export const useResume = (initialState: ResumeData) => {
  const [formData, setFormData] = useState<ResumeData>(initialState)
  const [isLoading, setIsLoading] = useState(false)

  // Handles standard top-level string fields (name, email, etc.)
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Updates a specific object within an array (e.g., the company name in Experience #2)
  const updateArrayItem = (
    field: keyof ResumeData,
    index: number,
    value: any
  ) => {
    setFormData((prev) => {
      const newArray = [...(prev[field] as any[])]
      newArray[index] = value
      return { ...prev, [field]: newArray }
    })
  }

  // Adds a new blank object to a specific array
  const addArrayItem = (field: keyof ResumeData, newItem: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...(prev[field] as any[]), newItem],
    }))
  }

  // Removes an item from an array by its index
  const removeArrayItem = (field: keyof ResumeData, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field] as any[]).filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e?: FormEvent) => {
    e?.preventDefault() // Optional chaining in case it's called programmatically
    setIsLoading(true)

    try {
      // Logic restored: Use the service instead of inline fetch
      const blob = await generatePdf(formData)

      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${formData.name.replace(/\s+/g, '_')}_Resume.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Failed to generate PDF:', error)
      alert(
        'There was an error generating your PDF. Please ensure the server is running on port 5000.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return {
    formData,
    handleChange,
    handleSubmit,
    isLoading,
    updateArrayItem,
    addArrayItem,
    removeArrayItem,
  }
}

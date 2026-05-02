import { useState, useEffect } from 'react'
import type { ResumeData } from '../types/resume'
import { generatePdf } from '../services/api'

const LOCAL_STORAGE_KEY = 'resume_editor_data'

export const useResume = (initialState: ResumeData) => {
  const [formData, setFormData] = useState<ResumeData>(initialState)
  const [isLoading, setIsLoading] = useState(false)


  // Automatically save to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData))
  }, [formData])

  // Handles standard top-level string fields (name, email, etc.)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    setIsLoading(true)

    try {
      const blob = await generatePdf(formData)
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${formData.name || 'Resume'}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('PDF generation failed:', error)
      // Data is safe in localStorage even if this alert pops up
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

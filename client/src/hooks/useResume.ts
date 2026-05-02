import { useState, useEffect } from 'react'
import type { ResumeData } from '../types/resume'
import { generatePdf } from '../services/api'

const LOCAL_STORAGE_KEY = 'resume_editor_data'

export const useResume = (initialState: ResumeData) => {
  // Logic to load existing data from localStorage on initialization
  const [formData, setFormData] = useState<ResumeData>(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY)
    return savedData ? JSON.parse(savedData) : initialState
  })

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

    // Safety check: Don't send if a name isn't provided
    if (!formData.name.trim()) {
      alert('Please enter a name before generating the PDF.')
      return
    }

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
    } catch (error: any) {
      console.error('PDF generation failed:', error.message)
      alert(`Error: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  // Optional: Function to clear the form
  const clearForm = () => {
    if (window.confirm('Are you sure you want to clear all data?')) {
      localStorage.removeItem(LOCAL_STORAGE_KEY)
      setFormData(initialState)
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
    clearForm,
  }
}

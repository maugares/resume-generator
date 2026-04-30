import { useState, ChangeEvent, FormEvent } from 'react'
import type { ResumeData } from '../types/resume'
import { generatePdf } from '../services/api'

export const useResume = (initialData: ResumeData) => {
  const [formData, setFormData] = useState<ResumeData>(initialData)
  const [isLoading, setIsLoading] = useState(false)

  // Handle simple string inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // NEW: Handle array item updates (e.g., updating the 2nd experience item)
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

  // NEW: Add a new blank item to an array
  const addArrayItem = (field: keyof ResumeData, newItem: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...(prev[field] as any[]), newItem],
    }))
  }

  // NEW: Remove an item by index
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
      const blob = await generatePdf(formData)
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${formData.name}_Resume.pdf`
      link.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    formData,
    updateArrayItem,
    addArrayItem,
    removeArrayItem,
    handleChange,
    handleSubmit,
    isLoading,
  }
}

import { useState, useEffect } from 'react'
import type { ResumeData } from '../types/resume'

const LOCAL_STORAGE_KEY = 'resume_editor_data'

export const useResume = (initialState: ResumeData) => {
  const [formData, setFormData] = useState<ResumeData>(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY)
    return savedData ? JSON.parse(savedData) : initialState
  })

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData))
  }, [formData])

  // Handles single fields (name, email, phone, etc.)
  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

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

  const addArrayItem = (field: 'experience' | 'education' | 'skills') => {
    const templates = {
      experience: {
        position: '',
        company: '',
        startDate: '',
        endDate: '',
        description: '',
      },
      education: { degree: '', institution: '', startDate: '', endDate: '' },
      skills: '',
    }
    setFormData((prev) => ({
      ...prev,
      [field]: [...(prev[field] as any[]), templates[field]],
    }))
  }

  const removeArrayItem = (
    field: 'experience' | 'education' | 'skills',
    index: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field] as any[]).filter((_, i) => i !== index),
    }))
  }

  return {
    formData,
    handleChange,
    updateArrayItem,
    addArrayItem,
    removeArrayItem,
  }
}

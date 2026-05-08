import { useState, useEffect } from 'react'
import type {
  EducationItem,
  ExperienceItem,
  ResumeArrayField,
  ResumeData,
} from '../types/resume'

const LOCAL_STORAGE_KEY = 'resume_editor_data'

const createEmptyExperience = (): ExperienceItem => ({
  position: '',
  company: '',
  startDate: '',
  endDate: '',
  description: '',
})

const createEmptyEducation = (): EducationItem => ({
  degree: '',
  institution: '',
  startDate: '',
  endDate: '',
})

export const useResume = (initialState: ResumeData) => {
  const [formData, setFormData] = useState<ResumeData>(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY)
    return savedData ? JSON.parse(savedData) : initialState
  })

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData))
  }, [formData])

  const handleChange = (name: keyof ResumeData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const updateArrayItem = <TField extends ResumeArrayField>(
    field: TField,
    index: number,
    value: ResumeData[TField][number]
  ) => {
    setFormData((prev) => {
      const newArray = [...prev[field]]
      newArray[index] = value
      return { ...prev, [field]: newArray }
    })
  }

  const addArrayItem = (field: ResumeArrayField) => {
    const templates = {
      experience: createEmptyExperience(),
      education: createEmptyEducation(),
    }

    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], templates[field]],
    }))
  }

  const removeArrayItem = (field: ResumeArrayField, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
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

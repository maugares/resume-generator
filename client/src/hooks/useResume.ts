import { useState, useEffect } from 'react'
import type {
  EducationItem,
  ExperienceItem,
  ResumeArrayField,
  ResumeData,
} from '../types'

const LOCAL_STORAGE_KEY = 'resume_editor_data'

const normalizeDescription = (description: unknown): string[] => {
  if (Array.isArray(description)) {
    return description.length > 0 ? description : ['']
  }

  if (typeof description === 'string') {
    const lines = description
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)

    return lines.length > 0 ? lines : ['']
  }

  return ['']
}

const normalizeLanguages = (languages: unknown): string[] => {
  if (Array.isArray(languages)) {
    return languages.length > 0
      ? languages.map((language) => String(language ?? ''))
      : ['']
  }

  if (typeof languages === 'string') {
    const lines = languages
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)

    return lines.length > 0 ? lines : ['']
  }

  return ['']
}

const normalizeResumeData = (data: ResumeData): ResumeData => ({
  ...data,
  experience: data.experience.map((item) => ({
    ...item,
    description: normalizeDescription(item.description),
  })),
  languages: normalizeLanguages(
    (data as ResumeData & { languages?: unknown }).languages
  ),
})

const createEmptyExperience = (): ExperienceItem => ({
  position: '',
  company: '',
  startDate: '',
  endDate: '',
  description: [''],
})

const createEmptyEducation = (): EducationItem => ({
  degree: '',
  institution: '',
  startDate: '',
  endDate: '',
})

const createEmptyLanguage = () => ''

export const useResume = (initialState: ResumeData) => {
  const [formData, setFormData] = useState<ResumeData>(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY)

    if (!savedData) {
      return normalizeResumeData(initialState)
    }

    return normalizeResumeData(JSON.parse(savedData) as ResumeData)
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
      languages: createEmptyLanguage(),
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

import { useState, ChangeEvent, FormEvent } from 'react';
import { ResumeData } from '../types/resume';
import { generatePdf } from '../services/api';

export const useResume = (initialData: ResumeData) => {
  const [formData, setFormData] = useState<ResumeData>(initialData);
  const [isLoading, setIsLoading] = useState(false);

  // 1. PURE LOGIC: Updates state using a key and value
  // This can be called by anyone (tests, buttons, effects)
  const updateField = (name: keyof ResumeData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 2. UI WRAPPER: Specifically for HTML Input events
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // We cast 'name' as keyof ResumeData to keep TS happy
    updateField(name as keyof ResumeData, value);
  };

  const handleSubmit = async (e?: FormEvent) => {
    e?.preventDefault(); // Optional chaining in case it's called programmatically
    setIsLoading(true);
    try {
      const blob = await generatePdf(formData);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${formData.name}_Resume.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    updateField, // Exported for independent use/testing
    handleChange,
    handleSubmit,
    isLoading,
  };
};
import { useCallback } from 'react'
import type { ResumeData } from '../types'
import { generatePdf } from '../services'
import { buildPreviewSnapshotHtml } from '../services/previewSnapshot'

export const usePdfExport = (formData: ResumeData) => {
  return useCallback(async () => {
    try {
      const previewHtml = buildPreviewSnapshotHtml()

      const pdfBlob = await generatePdf(formData, previewHtml ?? undefined)
      const fileUrl = URL.createObjectURL(pdfBlob)
      const link = document.createElement('a')
      const safeName =
        formData.name.trim().replace(/\s+/g, '-').toLowerCase() || 'resume'

      link.href = fileUrl
      link.download = `${safeName}.pdf`
      document.body.appendChild(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(fileUrl)
    } catch (error) {
      console.error('PDF generation failed:', error)
    }
  }, [formData])
}

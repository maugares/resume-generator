import type React from 'react'

export function AddButton({
  addArrayItem,
  field,
}: {
  addArrayItem: (field: any) => void
  field: any
}) {
  return (
    <button
      onClick={() => addArrayItem(field)}
      className="text-sm font-bold text-resume-slate/50 hover:text-resume-slate no-print"
    >
      + Add {field.charAt(0).toUpperCase() + field.slice(1)}
    </button>
  )
}

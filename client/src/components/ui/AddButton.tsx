import type { ResumeArrayField } from '../../types'

export function AddButton({
  addArrayItem,
  field,
}: {
  addArrayItem: (field: ResumeArrayField) => void
  field: ResumeArrayField
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

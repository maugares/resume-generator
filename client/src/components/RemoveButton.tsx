import type { ResumeArrayField } from '../types/resume'

export function RemoveButton({
  removeArrayItem,
  index,
  field,
}: {
  removeArrayItem: (field: ResumeArrayField, index: number) => void
  index: number
  field: ResumeArrayField
}) {
  return (
    <button
      onClick={() => removeArrayItem(field, index)}
      className="absolute -left-8 top-0 text-red-500 opacity-0 group-hover:opacity-100 no-print"
    >
      ✕
    </button>
  )
}

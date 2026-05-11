import type { ResumeArrayField } from '../../../types'

type AddButtonVariant = 'light' | 'dark'

export function AddButton({
  addArrayItem,
  field,
  variant = 'light',
}: {
  addArrayItem: (field: ResumeArrayField) => void
  field: ResumeArrayField
  variant?: AddButtonVariant
}) {
  const colorClasses =
    variant === 'dark'
      ? 'text-white/60 hover:text-white'
      : 'text-resume-slate/50 hover:text-resume-slate'

  return (
    <button
      onClick={() => addArrayItem(field)}
      className={`text-sm font-bold no-print transition-colors ${colorClasses}`}
    >
      + Add {field.charAt(0).toUpperCase() + field.slice(1)}
    </button>
  )
}

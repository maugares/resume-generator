import type { ResumeArrayField } from '../../../types'

type RemoveButtonProps =
  | {
      removeArrayItem: (field: ResumeArrayField, index: number) => void
      index: number
      field: ResumeArrayField
      onClick?: never
      className?: string
      label?: string
    }
  | {
      onClick: () => void
      removeArrayItem?: never
      index?: never
      field?: never
      className?: string
      label?: string
    }

export function RemoveButton(props: RemoveButtonProps) {
  const handleClick =
    'onClick' in props
      ? props.onClick
      : () => props.removeArrayItem(props.field, props.index)

  const buttonClassName =
    props.className ??
    'mt-1 block w-full rounded px-2 py-1 text-left text-xs font-semibold text-red-600 hover:bg-red-100'

  const label = props.label ?? '✕'

  return (
    <button type="button" onClick={handleClick} className={buttonClassName}>
      {label}
    </button>
  )
}

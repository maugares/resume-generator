import type { ResumeArrayField } from '../../../types'
import { RemoveIcon } from '../icons/RemoveIcon'

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

  const label = props.label ?? '✕'

  return (
    <button
      type="button"
      aria-label="Remove entry"
      title="Remove entry"
      className={`flex w-full items-center justify-center rounded px-2 py-1 text-sm font-semibold text-red-500 hover:bg-red-500/10 ${props.className}`}
      onClick={handleClick}
    >
      <RemoveIcon size="2em" />
    </button>
  )
}

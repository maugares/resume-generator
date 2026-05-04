import type React from 'react'

export function RemoveButton({
  removeArrayItem,
  index,
  field,
}: {
  removeArrayItem: (field: any, index: number) => void
  index: number
  field: any
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

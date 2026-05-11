import { AddEntryAboveButton, RemoveButton } from './buttons'

interface EntryActionMenuProps {
  onAddAbove: () => void
  onRemove: () => void
}

export function EntryActionMenu({
  onAddAbove,
  onRemove,
}: EntryActionMenuProps) {
  return (
    <div className="no-print absolute right-full top-0 z-20 w-30 rounded-lg border border-resume-slate/15 bg-white/95 p-2 shadow-lg backdrop-blur-sm opacity-0 pointer-events-none transition-opacity duration-150 group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:pointer-events-auto hover:opacity-100 hover:pointer-events-auto">
      <AddEntryAboveButton onClick={onAddAbove} />
      <RemoveButton onClick={onRemove} />
    </div>
  )
}

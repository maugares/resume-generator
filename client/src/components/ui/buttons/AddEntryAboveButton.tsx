interface AddEntryAboveButtonProps {
  onClick: () => void
}

export function AddEntryAboveButton({ onClick }: AddEntryAboveButtonProps) {
  return (
    <button
      type="button"
      className="block w-full rounded px-2 py-1 text-left text-xs font-semibold text-resume-slate hover:bg-resume-slate/10"
      onClick={onClick}
    >
      Add entry above
    </button>
  )
}

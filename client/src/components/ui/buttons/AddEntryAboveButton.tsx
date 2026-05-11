import { ArrowUpIcon } from '../icons/ArrowUpIcon'

interface AddEntryAboveButtonProps {
  onClick: () => void
}

export function AddEntryAboveButton({ onClick }: AddEntryAboveButtonProps) {
  return (
    <button
      type="button"
      aria-label="Add entry above"
      title="Add entry above"
      className="flex w-full items-center justify-center rounded px-2 py-1 text-sm font-semibold text-resume-slate hover:bg-resume-slate/10"
      onClick={onClick}
    >
      <ArrowUpIcon size="2em" />
    </button>
  )
}

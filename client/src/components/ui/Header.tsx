export function Header({ title }: { title: string }) {
  return (
    <h3 className="text-[14px] font-bold uppercase border-b border-white/20 pb-2 mb-4 tracking-[1px]">
      {title}
    </h3>
  )
}

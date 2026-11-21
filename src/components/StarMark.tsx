interface Props {
  className?: string
}

export default function StarMark({ className }: Props) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" fill="currentColor">
      <path d="M50 4 Q52.5 47 80 50 Q52.5 53 50 96 Q47.5 53 20 50 Q47.5 47 50 4Z" />
    </svg>
  )
}

interface Props {
  field: string
  value: string
}

export default function MyInfo({ field, value }: Props) {
  return (
    <li className="flex items-center gap-3 text-[1.4rem] py-3 border-b border-gray-100 last:border-0">
      <span className="text-main-orange font-semibold uppercase tracking-wider min-w-[9rem]">{field}</span>
      <span className="text-gray-600 normal-case">{value}</span>
    </li>
  )
}

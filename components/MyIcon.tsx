import { IconType } from "react-icons"

interface Props {
  Icon: IconType
  size?: string
}

export default function MyIcon({ Icon, size }: Props) {
  return (
    <div
      className={`${
        size ? size : "w-24 h-24"
      } rounded-full bg-main-orange flex items-center justify-center`}
    >
      <Icon className="text-5xl text-white" />
    </div>
  )
}

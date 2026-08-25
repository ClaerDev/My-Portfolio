import { ClientData } from "../../types"

interface Props {
  client: ClientData
  border: boolean
  pos: number
}

export default function BrandLogo({ client, border, pos }: Props) {
  return (
    <div
      className={`flex items-center justify-center py-10 px-8 ${
        border ? "relative vCustomLine before:right-0" : ""
      } ${pos < 2 ? "customLine before:bottom-0 relative borderLeft" : ""}`}
    >
      <span className="text-2xl font-semibold text-gray-500 tracking-wider uppercase text-center hover:text-main-orange transition-colors duration-200">
        {client.name}
      </span>
    </div>
  )
}

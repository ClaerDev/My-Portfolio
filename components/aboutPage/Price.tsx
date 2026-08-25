import { IconType } from "react-icons"
import { BsCheckLg } from "react-icons/bs"
import MyIcon from "../MyIcon"

interface PriceItem {
  id: string
  title: string
  price: string
  features: string[]
}

interface Props {
  Icon: IconType
  price: PriceItem
}

export default function Price({ Icon, price }: Props) {
  return (
    <div className="py-10 px-12">
      <MyIcon Icon={Icon} />

      <h2 className="text-[1.8rem] text-gray-800 font-semibold mt-6 mb-2">
        {price.title}
      </h2>

      <p className="text-main-orange text-[3.2rem] font-bold mb-6 leading-none">
        {price.price}
      </p>

      <ul className="space-y-3">
        {price.features.map((f, idx) => (
          <li key={idx} className="flex items-center gap-4 text-gray-500 text-2xl">
            <BsCheckLg className="text-main-orange flex-shrink-0 text-2xl" />
            {f}
          </li>
        ))}
      </ul>
    </div>
  )
}

import { workTabs } from "../data"
import { currentWorkVar } from "../store"
import { useReactiveVar } from "../hooks/useReactiveVar"

interface Props {
  name: string
  showTabs?: boolean
}

export default function Title({ name, showTabs }: Props) {
  const currentTab = useReactiveVar(currentWorkVar)

  return (
    <div className="sticky top-0 bg-white customLine relative before:bottom-0 borderLeft z-30 py-10 flex flex-wrap gap-8 justify-center sm:justify-between items-center shadow-sm">
      <span className="ml-12 customCircle relative tracking-wide capitalize text-3xl text-gray-800 font-semibold">
        {name}
      </span>

      {showTabs && (
        <ul className="flex flex-wrap items-center gap-6 mr-12 ml-12">
          {workTabs.map((tab, idx) => (
            <li
              key={idx}
              onClick={() => currentWorkVar.set(tab)}
              className={`text-[1.4rem] cursor-pointer tracking-wide transition-colors duration-200 ${
                currentTab === tab ? "text-main-orange" : "text-gray-500"
              }`}
            >
              {tab}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

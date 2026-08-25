import { BsCodeSlash } from "react-icons/bs"
import { MdOutlineFlag } from "react-icons/md"

const devSkills = [
  { label: "AI", value: 95 },
  { label: "Backend", value: 90 },
  { label: "Frontend", value: 88 },
  { label: "DevOps", value: 80 },
]

const langSkills = [
  { label: "English", value: 100 },
  { label: "Japanese", value: 100 },
]

interface BarProps {
  label: string
  value: number
}

function SkillBar({ label, value }: BarProps) {
  return (
    <div className="mb-8">
      <p className="text-[1.5rem] text-gray-700 mb-2">{label}</p>
      <div className="w-full h-[5px] bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-main-orange"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

export default function AboutSkills() {
  return (
    <div className="px-12 py-10 grid grid-cols-1 sm:grid-cols-2 gap-x-16 customLine relative before:bottom-0 borderLeft">
      {/* Development */}
      <div>
        <div className="flex items-center gap-3 mb-8">
          <BsCodeSlash className="text-main-orange text-3xl" />
          <span className="text-[1.4rem] font-semibold tracking-widest text-gray-800 uppercase">
            Development
          </span>
        </div>
        {devSkills.map((s) => (
          <SkillBar key={s.label} label={s.label} value={s.value} />
        ))}
      </div>

      {/* Language */}
      <div className="mt-10 sm:mt-0">
        <div className="flex items-center gap-3 mb-8">
          <MdOutlineFlag className="text-main-orange text-3xl" />
          <span className="text-[1.4rem] font-semibold tracking-widest text-gray-800 uppercase">
            Language
          </span>
        </div>
        {langSkills.map((s) => (
          <SkillBar key={s.label} label={s.label} value={s.value} />
        ))}
      </div>
    </div>
  )
}

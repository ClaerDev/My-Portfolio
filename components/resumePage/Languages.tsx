import { FieldValueData } from "../../types"

interface Props {
  languages: FieldValueData[]
}

export default function Languages({ languages }: Props) {
  return (
    <div className="grid grid-cols-2 gap-8">
      {languages.map((l) => (
        <div key={l.id} className="flex flex-col items-center">
          <div className="relative w-32 h-32 mb-4">
            <svg className="w-full h-full transform -rotate-90">
              {/* Background circle */}
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="#e5e7eb"
                strokeWidth="8"
                fill="none"
              />
              {/* Progress circle */}
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="#56c8e8"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 56}`}
                strokeDashoffset={`${2 * Math.PI * 56 * (1 - +l.value / 10)}`}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[2rem] font-bold text-gray-800">{l.value}/10</span>
            </div>
          </div>
          <h3 className="text-[1.6rem] text-gray-700 font-medium text-center capitalize">{l.field}</h3>
        </div>
      ))}
    </div>
  )
}

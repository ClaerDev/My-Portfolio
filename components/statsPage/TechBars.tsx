import { useEffect, useState } from "react"
import { techStats } from "../../data"

export default function TechBars() {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 300)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="px-12 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-10">
        {techStats.map((tech) => (
          <div key={tech.id}>
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-700 text-2xl font-medium">{tech.name}</span>
              <span className="text-main-orange text-2xl font-bold tabular-nums">{tech.percentage}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-[6px]">
              <div
                className="bg-main-orange h-[6px] rounded-full transition-all duration-700"
                style={{ width: animated ? `${tech.percentage}%` : "0%" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

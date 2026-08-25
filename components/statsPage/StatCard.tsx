import { useEffect, useState, useRef } from "react"
import { StatItem } from "../../types"

interface Props {
  stat: StatItem
  border?: boolean
}

function useCountUp(target: number, duration = 1800) {
  const [count, setCount] = useState(0)
  const ref = useRef<boolean>(false)
  useEffect(() => {
    if (ref.current) return
    ref.current = true
    const steps = 60
    const increment = target / steps
    const interval = duration / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(current))
    }, interval)
    return () => clearInterval(timer)
  }, [target, duration])
  return count
}

export default function StatCard({ stat, border }: Props) {
  const count = useCountUp(stat.value)

  return (
    <li
      className={`flex flex-col items-center py-8 px-6 text-center group hover:bg-gray-50 transition-colors duration-300 ${
        border ? "relative vCustomLine before:right-0" : ""
      }`}
    >
      <div className="w-16 h-16 rounded-full bg-main-orange flex items-center justify-center group-hover:shadow-lg transition-all duration-300">
        <stat.Icon className="text-2xl text-white" />
      </div>

      <div className="mt-4 mb-2 flex items-end justify-center gap-1">
        <span className="text-[3.5rem] font-bold leading-none text-main-orange tabular-nums">
          {count}
        </span>
        <span className="text-[2rem] font-bold leading-none text-main-orange mb-1">
          {stat.suffix}
        </span>
      </div>

      <h3 className="text-gray-800 text-[1.5rem] font-semibold capitalize mb-2">
        {stat.label}
      </h3>
      <p className="text-gray-500 text-[1.3rem] leading-relaxed max-w-[20rem]">
        {stat.description}
      </p>
    </li>
  )
}

import { githubStats } from "../../data"

export default function GithubStats() {
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-4">
      {githubStats.map((s, idx) => (
        <li
          key={s.label}
          className={`flex flex-col items-center py-8 px-6 text-center group hover:bg-gray-50 transition-colors duration-300 ${
            idx < githubStats.length - 1 ? "relative vCustomLine before:right-0" : ""
          }`}
        >
          <div className="w-14 h-14 rounded-full bg-main-orange flex items-center justify-center mb-4 group-hover:shadow-md transition-all duration-300">
            <s.Icon className="text-2xl text-white" />
          </div>
          <span className="text-[2.4rem] font-bold text-main-orange leading-none tabular-nums">
            {s.value}
          </span>
          <p className="text-gray-500 text-[1.3rem] mt-2 capitalize tracking-wide">
            {s.label}
          </p>
        </li>
      ))}
    </ul>
  )
}

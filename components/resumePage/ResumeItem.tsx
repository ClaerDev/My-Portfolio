import { ExperienceData } from "../../types"

interface Props {
  resume: ExperienceData
  border?: boolean
}

export default function ResumeItem({ resume, border }: Props) {
  return (
    <div
      className={`relative pl-12 ${
        border ? "pb-10" : "pb-3"
      } ${border ? "before:content-[''] before:absolute before:left-[7px] before:top-8 before:bottom-0 before:w-[2px] before:bg-gray-200" : ""}`}
    >
      {/* Timeline dot */}
      <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-main-orange border-4 border-white shadow-sm" />
      
      {/* Date badge */}
      <span className="inline-block text-[1.4rem] text-main-orange font-medium py-1 px-3 mb-4 rounded">
        {resume.badge}
      </span>

      {/* Title */}
      <h3 className="text-[1.6rem] font-semibold text-gray-800 mb-2 leading-tight ml-12">
        {resume.title}
      </h3>

      {/* Subtitle */}
      <p className="text-gray-500 text-[1.4rem] mb-3 font-normal ml-12">
        {resume.subTitle}
      </p>

      {/* Description */}
      <p className="text-gray-600 text-[1.4rem] leading-[1.8] ml-12">
        {resume.desc}
      </p>
    </div>
  )
}

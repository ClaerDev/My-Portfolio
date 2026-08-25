import IconTitle from "./IconTitle"
import ResumeItem from "./ResumeItem"
import { FaGraduationCap, FaBriefcase } from "react-icons/fa"
import { experienceData, educationData } from "../../data"

export default function MyResume() {
  return (
    <div className="px-10 py-10">
      {/* Experience Section */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-lg bg-main-orange flex items-center justify-center shadow-sm">
            <FaBriefcase className="text-2xl text-white" />
          </div>
          <h2 className="text-gray-800 text-[1.8rem] font-bold uppercase tracking-wider">
            Experience
          </h2>
        </div>
        
        <div className="max-w-5xl">
          {experienceData.map((r, idx) => (
            <ResumeItem
              key={r.id}
              resume={r}
              border={idx !== experienceData.length - 1}
            />
          ))}
        </div>
      </div>

      {/* Education Section */}
      <div>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-lg bg-main-orange flex items-center justify-center shadow-sm">
            <FaGraduationCap className="text-2xl text-white" />
          </div>
          <h2 className="text-gray-800 text-[1.8rem] font-bold uppercase tracking-wider">
            Education
          </h2>
        </div>
        
        <div className="max-w-5xl">
          {educationData.map((r, idx) => (
            <ResumeItem
              key={r.id}
              resume={r}
              border={idx !== educationData.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

import { useState, useEffect, useRef } from "react"
import { 
  SiOpenai, 
  SiFastapi, 
  SiPython, 
  SiReact, 
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiDjango,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiKubernetes,
  SiAmazonaws,
  SiGooglecloud,
  SiGit,
  SiGithub,
  SiVuedotjs,
  SiAngular,
  SiGraphql,
  SiRedux,
  SiWebpack,
  SiVite,
  SiJest,
  SiFigma,
  SiJavascript
} from "react-icons/si"
import { FaBrain, FaRobot, FaDatabase } from "react-icons/fa"
import { BsLightning } from "react-icons/bs"
import { IconType } from "react-icons"

interface CircularProgressProps {
  percentage: number
  label: string
  Icon: IconType
  iconColor?: string
  delay?: number
}

function CircularProgress({ percentage, label, Icon, iconColor = "#56c8e8", delay = 0 }: CircularProgressProps) {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true)
            setTimeout(() => {
              setProgress(percentage)
            }, delay)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [percentage, delay, isVisible])

  const size = 90
  const strokeWidth = 5
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress / 100) * circumference
  const center = size / 2

  return (
    <div ref={elementRef} className="flex flex-col items-center">
      {/* Circle with progress */}
      <div className="relative mb-2" style={{ width: size, height: size }}>
        <svg 
          width={size} 
          height={size} 
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke="#e0f5fd"
            strokeWidth={strokeWidth}
            fill="white"
          />
          {/* Progress circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke="#56c8e8"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-[1500ms] ease-out"
          />
        </svg>
        {/* Center content - perfectly centered */}
        <div 
          className="absolute top-0 left-0 flex flex-col items-center justify-center gap-0.5"
          style={{ width: size, height: size }}
        >
          {/* Percentage on top */}
          <span className="text-[1.4rem] font-bold text-main-orange leading-none">
            {progress}%
          </span>
          {/* Icon on bottom */}
          <Icon style={{ color: iconColor }} className="text-[2rem]" />
        </div>
      </div>
      {/* Label below circle */}
      <h4 className="text-[1.2rem] text-gray-700 font-medium text-center">
        {label}
      </h4>
    </div>
  )
}

// Comprehensive skill data with icons
const aiSkills = [
  { id: "ai1", field: "GPT-5.6", value: "95", Icon: SiOpenai, color: "#10a37f" },
  { id: "ai2", field: "Claude", value: "90", Icon: FaBrain, color: "#ff6b35" },
  { id: "ai3", field: "LangChain", value: "92", Icon: BsLightning, color: "#3b9cdb" },
  { id: "ai4", field: "LangGraph", value: "88", Icon: FaRobot, color: "#9333ea" },
  { id: "ai5", field: "RAG", value: "93", Icon: SiOpenai, color: "#3b9cdb" },
]

const backendSkills = [
  { id: "b1", field: "Python", value: "95", Icon: SiPython, color: "#3776ab" },
  { id: "b2", field: "FastAPI", value: "92", Icon: SiFastapi, color: "#009688" },
  { id: "b3", field: "Django", value: "88", Icon: SiDjango, color: "#092e20" },
  { id: "b4", field: "Node.js", value: "90", Icon: SiNodedotjs, color: "#339933" },
  { id: "b5", field: "Express", value: "87", Icon: SiExpress, color: "#000000" },
]

const frontendSkills = [
  { id: "f1", field: "React", value: "93", Icon: SiReact, color: "#61dafb" },
  { id: "f2", field: "Next.js", value: "90", Icon: SiNextdotjs, color: "#000000" },
  { id: "f3", field: "TypeScript", value: "92", Icon: SiTypescript, color: "#3178c6" },
  { id: "f4", field: "JavaScript", value: "95", Icon: SiJavascript, color: "#f7df1e" },
  { id: "f5", field: "Vue.js", value: "85", Icon: SiVuedotjs, color: "#4fc08d" },
]

const stylingSkills = [
  { id: "s1", field: "Tailwind CSS", value: "90", Icon: SiTailwindcss, color: "#06b6d4" },
  { id: "s2", field: "Redux", value: "88", Icon: SiRedux, color: "#764abc" },
  { id: "s3", field: "GraphQL", value: "85", Icon: SiGraphql, color: "#e10098" },
  { id: "s4", field: "Webpack", value: "82", Icon: SiWebpack, color: "#8dd6f9" },
]

const databaseSkills = [
  { id: "d1", field: "PostgreSQL", value: "90", Icon: SiPostgresql, color: "#4169e1" },
  { id: "d2", field: "MongoDB", value: "88", Icon: SiMongodb, color: "#47a248" },
  { id: "d3", field: "Redis", value: "85", Icon: SiRedis, color: "#dc382d" },
  { id: "d4", field: "SQL", value: "92", Icon: FaDatabase, color: "#00758f" },
]

const devopsSkills = [
  { id: "do1", field: "Docker", value: "88", Icon: SiDocker, color: "#2496ed" },
  { id: "do2", field: "AWS", value: "85", Icon: SiAmazonaws, color: "#ff9900" },
  { id: "do3", field: "Git", value: "95", Icon: SiGit, color: "#f05032" },
  { id: "do4", field: "GitHub", value: "93", Icon: SiGithub, color: "#181717" },
]

const toolsSkills = [
  { id: "t1", field: "Kubernetes", value: "80", Icon: SiKubernetes, color: "#326ce5" },
  { id: "t2", field: "GCP", value: "82", Icon: SiGooglecloud, color: "#4285f4" },
  { id: "t3", field: "Jest", value: "87", Icon: SiJest, color: "#c21325" },
  { id: "t4", field: "Figma", value: "85", Icon: SiFigma, color: "#f24e1e" },
]

export default function Skills() {
  return (
    <div className="px-10 py-8 flex flex-col items-center">
      {/* AI & LLM */}
      <div className="mb-12 w-full flex flex-col items-center">
        <h3 className="text-center text-[1.4rem] font-semibold text-gray-800 mb-6 uppercase tracking-wider">
          AI & Machine Learning
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 max-w-5xl">
          {aiSkills.map((skill, idx) => (
            <CircularProgress
              key={skill.id}
              percentage={+skill.value}
              label={skill.field}
              Icon={skill.Icon}
              iconColor={skill.color}
              delay={idx * 100}
            />
          ))}
        </div>
      </div>

      {/* Backend Development */}
      <div className="mb-12 w-full flex flex-col items-center">
        <h3 className="text-center text-[1.4rem] font-semibold text-gray-800 mb-6 uppercase tracking-wider">
          Backend Development
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 max-w-5xl">
          {backendSkills.map((skill, idx) => (
            <CircularProgress
              key={skill.id}
              percentage={+skill.value}
              label={skill.field}
              Icon={skill.Icon}
              iconColor={skill.color}
              delay={idx * 100}
            />
          ))}
        </div>
      </div>

      {/* Frontend Development */}
      <div className="mb-12 w-full flex flex-col items-center">
        <h3 className="text-center text-[1.4rem] font-semibold text-gray-800 mb-6 uppercase tracking-wider">
          Frontend Development
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 max-w-5xl">
          {frontendSkills.map((skill, idx) => (
            <CircularProgress
              key={skill.id}
              percentage={+skill.value}
              label={skill.field}
              Icon={skill.Icon}
              iconColor={skill.color}
              delay={idx * 100}
            />
          ))}
        </div>
      </div>

      {/* UI & State Management */}
      <div className="mb-12 w-full flex flex-col items-center">
        <h3 className="text-center text-[1.4rem] font-semibold text-gray-800 mb-6 uppercase tracking-wider">
          UI & State Management
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-4xl">
          {stylingSkills.map((skill, idx) => (
            <CircularProgress
              key={skill.id}
              percentage={+skill.value}
              label={skill.field}
              Icon={skill.Icon}
              iconColor={skill.color}
              delay={idx * 100}
            />
          ))}
        </div>
      </div>

      {/* Database */}
      <div className="mb-12 w-full flex flex-col items-center">
        <h3 className="text-center text-[1.4rem] font-semibold text-gray-800 mb-6 uppercase tracking-wider">
          Database & Storage
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-4xl">
          {databaseSkills.map((skill, idx) => (
            <CircularProgress
              key={skill.id}
              percentage={+skill.value}
              label={skill.field}
              Icon={skill.Icon}
              iconColor={skill.color}
              delay={idx * 100}
            />
          ))}
        </div>
      </div>

      {/* DevOps & Version Control */}
      <div className="mb-12 w-full flex flex-col items-center">
        <h3 className="text-center text-[1.4rem] font-semibold text-gray-800 mb-6 uppercase tracking-wider">
          DevOps & Version Control
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-4xl">
          {devopsSkills.map((skill, idx) => (
            <CircularProgress
              key={skill.id}
              percentage={+skill.value}
              label={skill.field}
              Icon={skill.Icon}
              iconColor={skill.color}
              delay={idx * 100}
            />
          ))}
        </div>
      </div>

      {/* Tools & Others */}
      <div className="mb-6 w-full flex flex-col items-center">
        <h3 className="text-center text-[1.4rem] font-semibold text-gray-800 mb-6 uppercase tracking-wider">
          Tools & Design
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-4xl">
          {toolsSkills.map((skill, idx) => (
            <CircularProgress
              key={skill.id}
              percentage={+skill.value}
              label={skill.field}
              Icon={skill.Icon}
              iconColor={skill.color}
              delay={idx * 100}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

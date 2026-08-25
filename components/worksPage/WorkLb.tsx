import { motion } from "framer-motion"
import Image from "next/image"
import { IoMdClose } from "react-icons/io"
import { AiOutlineLink } from "react-icons/ai"
import { FiGithub } from "react-icons/fi"
import { worksData } from "../../data"
import { currentWorkIdVar } from "../../store"
import { useReactiveVar } from "../../hooks/useReactiveVar"

export default function WorkLb() {
  const workId = useReactiveVar(currentWorkIdVar)
  const work = worksData.find((w) => w.id === workId)
  if (!work) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="absolute inset-0" onClick={() => currentWorkIdVar.set(null)} />

      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto myScroll rounded-3xl z-10 shadow-2xl"
      >
        <button
          onClick={() => currentWorkIdVar.set(null)}
          className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-600 hover:text-white hover:bg-main-orange text-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
        >
          <IoMdClose />
        </button>

        {/* Hero Image with Modern Overlay */}
        <div className="relative w-full rounded-t-3xl overflow-hidden" style={{ height: "26rem" }}>
          <Image src={work.images[0].url} alt={work.title} fill className="object-cover brightness-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-gray-900/20 to-transparent" />
          
          {/* Floating Badge */}
          <div className="absolute bottom-6 left-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full shadow-lg">
              <div className="w-2 h-2 bg-main-orange rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-gray-800">Live Project</span>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12">
          {/* Title with modern accent */}
          <div className="mb-6">
            <div className="w-16 h-1 bg-main-orange rounded-full mb-4" />
            <h2 className="text-gray-800 text-[2.2rem] md:text-[2.8rem] font-bold capitalize mb-3 leading-tight">
              {work.title}
            </h2>
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
              {work.description}
            </p>
          </div>

          {/* Tech Stack with Modern Pills */}
          <div className="mb-8">
            <h3 className="text-gray-700 text-base font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-main-orange" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 7H7v6h6V7z" />
                <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clipRule="evenodd" />
              </svg>
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {work.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-full hover:bg-main-orange hover:text-white transition-all duration-300 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons with Modern Style */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
            <a
              href={work.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-main-orange text-white text-base font-bold rounded-xl hover:bg-opacity-90 hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <AiOutlineLink className="text-xl" />
              <span>View Live Demo</span>
            </a>
            <a
              href={work.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-gray-100 text-gray-700 text-base font-bold rounded-xl hover:bg-gray-800 hover:text-white hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <FiGithub className="text-xl" />
              <span>View on GitHub</span>
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

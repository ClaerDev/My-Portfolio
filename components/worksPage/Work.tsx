import Image from "next/image"
import { motion } from "framer-motion"
import { currentWorkIdVar } from "../../store"

interface Props {
  title: string
  imageUrl: string
  projectId: string
}

export default function Work({ title, imageUrl, projectId }: Props) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="work-wrapper customLine before:bottom-0 relative borderLeft cursor-pointer"
      onClick={() => currentWorkIdVar.set(projectId)}
    >
      <div className="work relative overflow-hidden group rounded-2xl m-4 shadow-lg hover:shadow-2xl transition-all duration-500" style={{ height: "24rem" }}>
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
          <motion.div
            initial={{ y: 10, opacity: 0.8 }}
            whileHover={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-white text-[1.8rem] font-bold capitalize mb-2 leading-tight group-hover:text-main-orange transition-colors duration-300">
              {title}
            </h3>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
              <span className="text-white/80 text-sm uppercase tracking-wider font-medium">View Project</span>
              <svg className="w-4 h-4 text-main-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </motion.div>
        </div>

        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-main-orange/20 backdrop-blur-sm transform translate-x-10 -translate-y-10 rotate-45 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-500" />
      </div>
    </motion.li>
  )
}

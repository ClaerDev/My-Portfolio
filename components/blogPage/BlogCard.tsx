import Image from "next/image"
import { motion } from "framer-motion"
import { BlogPost } from "../../types"
import { currentBlogIdVar } from "../../store"
import { BsClock, BsArrowRight } from "react-icons/bs"

interface Props {
  post: BlogPost
}

export default function BlogCard({ post }: Props) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="work-wrapper customLine before:bottom-0 relative borderLeft cursor-pointer group"
      onClick={() => currentBlogIdVar.set(post.id)}
    >
      {/* cover */}
      <div className="work relative overflow-hidden rounded-3xl mx-10 mt-10" style={{ height: "24rem" }}>
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Category Badge */}
        <span className="absolute top-6 left-6 z-10 text-base font-bold px-5 py-2 bg-main-orange text-white rounded-full shadow-lg">
          {post.category}
        </span>

        {/* Read Time Badge */}
        <div className="absolute bottom-6 left-6 z-10 flex items-center gap-2 px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg">
          <BsClock className="text-main-orange text-lg" />
          <span className="text-base font-semibold text-gray-800">{post.readTime}</span>
        </div>
      </div>

      {/* body */}
      <div className="px-10 py-8">
        <div className="flex items-center gap-3 text-gray-400 text-base mb-4">
          <span>{post.date}</span>
        </div>

        <h3 className="text-gray-800 text-[2rem] font-bold leading-tight mb-4 line-clamp-2 group-hover:text-main-orange transition-colors duration-300">
          {post.title}
        </h3>

        <p className="text-gray-600 text-[1.6rem] leading-relaxed line-clamp-3 mb-6">
          {post.excerpt}
        </p>

        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-sm px-3 py-1.5 bg-sky-50 border border-sky-200 text-gray-700 rounded-full hover:bg-main-orange hover:text-white hover:border-main-orange transition-all duration-300"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Read More Arrow */}
        <div className="mt-6 flex items-center gap-2 text-main-orange font-bold text-base group-hover:gap-4 transition-all duration-300">
          <span>Read More</span>
          <BsArrowRight className="text-xl" />
        </div>
      </div>
    </motion.li>
  )
}

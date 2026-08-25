import { motion } from "framer-motion"
import Image from "next/image"
import { IoMdClose } from "react-icons/io"
import { BsClock, BsCalendar3, BsArrowRight } from "react-icons/bs"
import { blogPosts } from "../../data"
import { currentBlogIdVar } from "../../store"
import { useReactiveVar } from "../../hooks/useReactiveVar"

export default function BlogLb() {
  const blogId = useReactiveVar(currentBlogIdVar)
  const post = blogPosts.find((p) => p.id === blogId)
  if (!post) return null

  const paragraphs = post.content.split("\n\n")

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="absolute inset-0" onClick={() => currentBlogIdVar.set(null)} />

      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto myScroll rounded-3xl z-10 shadow-2xl"
      >
        {/* close */}
        <button
          onClick={() => currentBlogIdVar.set(null)}
          className="absolute top-6 right-6 z-20 w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600 hover:text-white hover:bg-main-orange hover:rotate-90 text-3xl transition-all duration-300"
        >
          <IoMdClose />
        </button>

        {/* cover */}
        <div className="relative w-full rounded-t-3xl overflow-hidden" style={{ height: "32rem" }}>
          <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Category Badge */}
          <span className="absolute top-10 left-10 bg-main-orange text-white text-lg font-bold px-6 py-2.5 rounded-full shadow-xl">
            {post.category}
          </span>

          {/* Meta Info at Bottom */}
          <div className="absolute bottom-10 left-10 right-10 flex items-center gap-6">
            <div className="flex items-center gap-3 px-5 py-2.5 bg-white/95 backdrop-blur-sm rounded-full shadow-lg">
              <BsCalendar3 className="text-main-orange text-xl" />
              <span className="text-gray-800 text-base font-semibold">{post.date}</span>
            </div>
            <div className="flex items-center gap-3 px-5 py-2.5 bg-white/95 backdrop-blur-sm rounded-full shadow-lg">
              <BsClock className="text-main-orange text-xl" />
              <span className="text-gray-800 text-base font-semibold">{post.readTime}</span>
            </div>
          </div>
        </div>

        <div className="p-12">
          <h2 className="text-gray-800 text-[3.2rem] font-black leading-tight mb-6">
            {post.title}
          </h2>

          <div className="border-l-4 border-main-orange bg-sky-50 pl-8 pr-6 py-6 mb-10 rounded-r-2xl">
            <p className="text-gray-700 text-[1.8rem] font-medium leading-relaxed">
              {post.excerpt}
            </p>
          </div>

          <div className="prose prose-lg max-w-none space-y-7">
            {paragraphs.map((para, idx) => {
              if (para.startsWith("**") && para.includes("**\n")) {
                const [heading, ...rest] = para.split("\n")
                const headingText = heading.replace(/\*\*/g, "")
                return (
                  <div key={idx} className="pt-4">
                    <h3 className="text-gray-800 text-[2.2rem] font-bold mb-4 flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-main-orange"></span>
                      {headingText}
                    </h3>
                    <p className="text-gray-600 text-[1.7rem] leading-relaxed pl-5">
                      {rest.join(" ")}
                    </p>
                  </div>
                )
              }
              const parts = para.split(/(\*\*[^*]+\*\*)/)
              return (
                <p key={idx} className="text-gray-600 text-[1.7rem] leading-relaxed">
                  {parts.map((part, i) =>
                    part.startsWith("**") ? (
                      <strong key={i} className="text-gray-800 font-bold">
                        {part.replace(/\*\*/g, "")}
                      </strong>
                    ) : (
                      part
                    )
                  )}
                </p>
              )
            })}
          </div>

          <div className="flex flex-wrap gap-3 mt-12 pt-10 border-t-2 border-gray-100">
            <span className="text-gray-500 font-bold text-base mr-2">Tags:</span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-base px-4 py-2 bg-sky-50 border-2 border-sky-200 text-gray-700 rounded-full hover:bg-main-orange hover:text-white hover:border-main-orange transition-all duration-300 font-semibold"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

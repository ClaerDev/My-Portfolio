import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import BlogCard from "./BlogCard"
import BlogLb from "./BlogLb"
import { blogPosts, blogTabs } from "../../data"
import { currentBlogIdVar } from "../../store"
import { useReactiveVar } from "../../hooks/useReactiveVar"

const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

export default function Blog() {
  const [activeTab, setActiveTab] = useState("All")
  const blogId = useReactiveVar(currentBlogIdVar)

  const filtered = useMemo(() => {
    if (activeTab === "All") return blogPosts
    return blogPosts.filter((p) => p.category === activeTab)
  }, [activeTab])

  return (
    <div className="lg:h-full h-[95rem] overflow-y-scroll myScroll">
      <AnimatePresence>{blogId && <BlogLb />}</AnimatePresence>

      {/* title row with tab filters */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={titleVariants}
        className="customLine relative before:bottom-0 borderLeft z-20 py-10 flex flex-wrap gap-8 justify-center sm:justify-between items-center"
      >
        <span className="ml-12 customCircle relative tracking-wide capitalize text-3xl text-gray-800 font-semibold">
          blog
        </span>
        <ul className="flex flex-wrap items-center gap-6 mr-12 ml-12">
          {blogTabs.map((tab) => (
            <li
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-[1.4rem] cursor-pointer tracking-wide transition-colors duration-200 ${
                activeTab === tab ? "text-main-orange" : "text-gray-500"
              }`}
            >
              {tab}
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.ul
        layout="position"
        className="grid grid-cols-1 sm:grid-cols-2 relative vCustomLine before:hidden sm:before:block before:left-1/2 before:-translate-x-1/2"
      >
        <AnimatePresence>
          {filtered.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  )
}

import { useState, useMemo } from "react"
import Title from "../Title"
import Work from "./Work"
import { worksData } from "../../data"
import { motion, AnimatePresence } from "framer-motion"
import { currentWorkVar } from "../../store"
import { useReactiveVar } from "../../hooks/useReactiveVar"

// Shuffle function to randomize array order
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function Works() {
  const currentTab = useReactiveVar(currentWorkVar)

  const filteredWorks = useMemo(() => {
    const filtered = worksData.filter((w) =>
      w.workTabs.some((t) => t.tab === currentTab)
    )
    return shuffleArray(filtered)
  }, [currentTab])

  return (
    <div
      id="scrollableDiv"
      className="lg:h-full h-[95rem] overflow-y-scroll myScroll"
    >
      <Title name="works" showTabs />

      <motion.ul
        layout="position"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 relative vCustomLine before:hidden sm:before:block before:left-1/2 before:-translate-x-1/2 pt-8 px-2"
      >
        <AnimatePresence mode="popLayout">
          {filteredWorks.map((w, index) => (
            <Work
              key={w.id}
              title={w.title}
              imageUrl={w.images[0].url}
              projectId={w.id}
            />
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  )
}

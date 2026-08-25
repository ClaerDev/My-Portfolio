import Title from "../Title"
import StatCard from "./StatCard"
import GithubStats from "./GithubStats"
import { statCards } from "../../data"
import { motion } from "framer-motion"

const sectionVariants = {
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

export default function Stats() {
  return (
    <section className="h-full overflow-y-scroll myScroll">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <Title name="achievements" />

        {/* 3-column stat cards grid */}
        <ul className="grid grid-cols-1 sm:grid-cols-3 customLine before:bottom-0 relative borderLeft">
          {statCards.map((stat, idx) => (
            <StatCard
              key={stat.id}
              stat={stat}
              border={(idx + 1) % 3 !== 0 && idx !== statCards.length - 1}
            />
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <Title name="github activity" />
        <GithubStats />
      </motion.div>
    </section>
  )
}

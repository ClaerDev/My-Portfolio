import Testimonial from "../Testimonial"
import Title from "../Title"
import MyResume from "./MyResume"
import Skills from "./Skills"
import { quoteData } from "../../data"
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

export default function Resume() {
  return (
    <section className="h-full overflow-y-scroll myScroll">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <Title name="resume" />
        <MyResume />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <Title name="skills" />
        <Skills />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <Title name="quote" />
        <Testimonial testimonial={quoteData} />
      </motion.div>
    </section>
  )
}

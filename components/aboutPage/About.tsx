import AboutMe from "./AboutMe"
import AboutSkills from "./AboutSkills"
import Facts from "./Facts"
import MyServices from "./MyServices"
import TestimonialsSection from "./TestimonialsSection"
import Title from "../Title"
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

export default function About() {
  return (
    <section className="h-full overflow-y-scroll myScroll">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <Title name="about me" />
        <AboutMe />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <Title name="skill" />
        <AboutSkills />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <Title name="my services" />
        <MyServices />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <Title name="testimonials" />
        <TestimonialsSection />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <Title name="fun facts" />
        <Facts />
      </motion.div>
    </section>
  )
}

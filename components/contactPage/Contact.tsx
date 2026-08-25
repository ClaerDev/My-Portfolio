import Title from "../Title"
import ContactForm from "./ContactForm"
import Location from "./Location"
import BookMeeting from "./BookMeeting"
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

export default function Contact() {
  return (
    <section className="h-full overflow-y-scroll myScroll">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <Title name="get in touch" />
        <Location />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <Title name="contact form" />
        <ContactForm />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <Title name="book a meeting" />
        <BookMeeting />
      </motion.div>
    </section>
  )
}

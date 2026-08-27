import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ContactForm from "./ContactForm"
import Location from "./Location"
import BookMeeting from "./BookMeeting"
import { MdLocationOn } from "react-icons/md"
import { FaCalendarAlt } from "react-icons/fa"
import { AiOutlineMail } from "react-icons/ai"

type Tab = "location" | "contact" | "booking"

const tabs: { key: Tab; label: string; Icon: React.ElementType }[] = [
  { key: "location", label: "Get in Touch",   Icon: MdLocationOn  },
  { key: "contact",  label: "Contact Form",   Icon: AiOutlineMail },
  { key: "booking",  label: "Book a Meeting", Icon: FaCalendarAlt },
]

export default function Contact() {
  const [activeTab, setActiveTab] = useState<Tab>("location")

  return (
    <section className="h-full flex flex-col overflow-hidden">

      {/* ── tab bar ── */}
      <div className="sticky top-0 z-30 relative flex flex-shrink-0 bg-white border-b border-gray-100 shadow-sm">
        {tabs.map(({ key, label, Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`relative flex items-center pt-[2.5rem] pb-[2.5rem] justify-center gap-3 flex-1 py-6 text-[1.3rem] font-bold uppercase tracking-[0.1em] transition-all duration-200 ${
              activeTab === key
                ? "text-gray-900 bg-white"
                : "text-gray-400 bg-gray-50/60 hover:text-gray-600 hover:bg-white"
            }`}
          >
            <Icon className={`text-[1.8rem] transition-all duration-200 ${activeTab === key ? "text-main-orange" : ""}`} />
            <span className="hidden sm:block">{label}</span>

            {activeTab === key && (
              <motion.span
                layoutId="underline"
                className="absolute bottom-0 left-0 right-0 h-[3px] bg-main-orange"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* ── content ── */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {activeTab === "location" && <Location />}
            {activeTab === "contact"  && <ContactForm />}
            {activeTab === "booking"  && <BookMeeting />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

import { MdLocationOn, MdEmail, MdPhone } from "react-icons/md"
import { FaBriefcase } from "react-icons/fa"
import { motion } from "framer-motion"

const infoItems = [
  { Icon: MdLocationOn, field: "Address",   value: "Osaka, Japan"           },
  { Icon: MdEmail,      field: "Email",     value: "tobeiokita35@gmail.com" },
  { Icon: MdPhone,      field: "Phone",     value: "+81 158 461 254"        },
  { Icon: FaBriefcase,  field: "Freelance", value: "Available",  highlight: true },
]

const list = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08 } },
}
const item = {
  hidden:  { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
}

export default function Location() {
  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-[42%_58%]">

      {/* ── LEFT sidebar ── */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative flex flex-col justify-between px-10 py-10 bg-gradient-to-br from-[#56c8e8] via-[#7dd9f0] to-[#a8eaf7] border-r border-main-orange/20 overflow-hidden"
      >
        {/* shimmer overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 pointer-events-none" />
        {/* wave blob top-right */}
        <div className="absolute -top-10 -right-10 w-56 h-56 bg-white/15 rounded-full blur-3xl pointer-events-none" />
        {/* wave blob bottom-left */}
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        {/* top: badge + heading */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/40 bg-white/20 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
            </span>
            <span className="text-[1.2rem] font-semibold text-white tracking-wide">Available for work</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
          >
            <p className="text-[1.1rem] font-bold text-white/80 uppercase tracking-[0.2em] mb-2">Location & Contact</p>
            <h2 className="text-[2.8rem] font-extrabold text-white leading-[1.15] mb-4">
              Let's <span className="text-white/90 underline underline-offset-4 decoration-white/40">Connect.</span>
            </h2>
            <p className="text-[1.4rem] text-white/75 leading-[1.75]">
              Based in Osaka, Japan.<br />
              Open to remote &amp; on-site worldwide.
            </p>
          </motion.div>
        </div>

        {/* bottom: info list */}
        <motion.ul
          variants={list} initial="hidden" animate="visible"
          className="relative z-10 mt-10 space-y-3"
        >
          {infoItems.map(({ Icon, field, value, highlight }: any) => (
            <motion.li key={field} variants={item}
              className="flex items-center gap-4 group"
            >
              <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 group-hover:border-white/50 transition-all duration-200">
                <Icon className="text-white text-[1.6rem]" />
              </div>
              <div>
                <p className="text-[1.05rem] font-semibold text-white/60 uppercase tracking-[0.12em] leading-none mb-0.5">{field}</p>
                <p className={`text-[1.45rem] font-semibold leading-snug text-white`}>
                  {value}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      {/* ── RIGHT: full-height map ── */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative overflow-hidden"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d209750.33516664647!2d135.30866491308594!3d34.69374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000f18840de5dbd%3A0xef10bd780eb85b3c!2sOsaka%2C%20Japan!5e0!3m2!1sen!2sjp!4v1666978319596!5m2!1sen!2sjp"
          style={{ border: 0 } as React.CSSProperties}
          allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full min-h-[38rem]"
        />
        <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/8" />
      </motion.div>
    </div>
  )
}

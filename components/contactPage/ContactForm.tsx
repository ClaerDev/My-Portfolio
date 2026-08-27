import { useForm, SubmitHandler } from "react-hook-form"
import { AiOutlineSwapRight } from "react-icons/ai"
import { FaUser, FaEnvelope, FaCommentDots, FaCheck } from "react-icons/fa"
import { HiLightningBolt } from "react-icons/hi"
import toast from "react-hot-toast"
import { useState } from "react"
import { motion } from "framer-motion"
import emailjs from "@emailjs/browser"
import { saveMessage } from "../../lib/adminMessages"

interface Inputs { fullName: string; email: string; message: string }

const SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  ?? ""
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID ?? ""
const PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  ?? ""

const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)

// Clean floating-label input
function Field({ label, icon: Icon, error, children }: {
  label: string; icon: React.ElementType; error?: string; children: React.ReactNode
}) {
  return (
    <div className="group">
      <label className="flex items-center gap-2 text-[1.1rem] font-bold text-slate-400 uppercase tracking-[0.14em] mb-2">
        <Icon className="text-main-orange text-[1.3rem]" />
        {label}
      </label>
      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden
                      focus-within:border-main-orange focus-within:shadow-[0_0_0_3px_rgba(86,200,232,0.12)]
                      transition-all duration-200">
        {children}
      </div>
      {error && <p className="text-red-400 text-[1.2rem] mt-2 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-red-400" />{error}
      </p>}
    </div>
  )
}

const perks = [
  "Personal reply — not a bot",
  "Response within 24 hours",
  "Free project advice",
]

export default function ContactForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>()
  const [loading, setLoading] = useState(false)

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true)
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        from_name: data.fullName, from_email: data.email,
        email: data.email, reply_to: data.email, message: data.message,
      }, { publicKey: PUBLIC_KEY })
      await saveMessage({ type: "contact", fullName: data.fullName, email: data.email, message: data.message })
      toast.success(`Thanks for reaching out, ${data.fullName}!`, { duration: 5000 })
      reset()
    } catch (err: any) {
      toast.error(err?.text || err?.message || "Something went wrong.")
    } finally { setLoading(false) }
  }

  const s = (i: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
  })

  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-[42%_58%]">

      {/* ── LEFT: dark sidebar ── */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative flex flex-col justify-between px-10 py-10 bg-gradient-to-br from-[#56c8e8] via-[#7dd9f0] to-[#a8eaf7] border-r border-main-orange/20 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 pointer-events-none" />
        <div className="absolute -top-10 -right-10 w-56 h-56 bg-white/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        {/* top */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/40 bg-white/20 mb-8">
            <HiLightningBolt className="text-white text-[1.4rem]" />
            <span className="text-[1.2rem] font-bold text-white uppercase tracking-wide">Quick Response</span>
          </div>

          <p className="text-[1.1rem] font-bold text-white/80 uppercase tracking-[0.2em] mb-2">Get in touch</p>
          <h2 className="text-[2.8rem] font-extrabold text-white leading-[1.15] mb-4">
            Send Me a<br /><span className="text-white/90 underline underline-offset-4 decoration-white/40">Message.</span>
          </h2>
          <p className="text-[1.4rem] text-white/75 leading-[1.75]">
            Drop me a message —<br />I reply within 24 hours.
          </p>
        </div>

        {/* perks */}
        <div className="relative z-10 mt-10 space-y-3">
          {perks.map((text, i) => (
            <motion.div
              key={text}
              initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
              className="flex items-center gap-3 group"
            >
              <div className="w-7 h-7 rounded-lg bg-white/20 border border-white/30 flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-colors duration-200">
                <FaCheck className="text-white text-[0.9rem]" />
              </div>
              <span className="text-[1.35rem] text-white/90">{text}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── RIGHT: form ── */}
      <div className="flex flex-col justify-center px-10 py-10 bg-white overflow-y-auto myScroll">
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <motion.div {...s(0)}>
              <Field label="Name" icon={FaUser} error={errors.fullName?.message}>
                <input
                  {...register("fullName", { required: "Full name is required" })}
                  type="text" placeholder="Your full name"
                  className="w-full px-4 py-4 bg-transparent text-[1.5rem] text-gray-800 placeholder:text-gray-300 focus:outline-none"
                />
              </Field>
            </motion.div>
            <motion.div {...s(1)}>
              <Field label="Email" icon={FaEnvelope} error={errors.email?.message}>
                <input
                  {...register("email", {
                    required: "Email is required",
                    validate: (v) => isValidEmail(v) || "Invalid email",
                  })}
                  type="email" placeholder="your@email.com"
                  className="w-full px-4 py-4 bg-transparent text-[1.5rem] text-gray-800 placeholder:text-gray-300 focus:outline-none"
                />
              </Field>
            </motion.div>
          </div>

          <motion.div {...s(2)}>
            <Field label="Message" icon={FaCommentDots} error={errors.message?.message}>
              <textarea
                {...register("message", { required: "Message is required" })}
                placeholder="Tell me about your project or idea…"
                rows={6}
                className="w-full px-4 py-4 bg-transparent text-[1.5rem] text-gray-800 placeholder:text-gray-300 focus:outline-none resize-none"
              />
            </Field>
          </motion.div>

          <motion.div {...s(3)}>
            <button
              type="submit" disabled={loading}
              className="group relative flex items-center gap-4 px-10 py-5 bg-main-orange text-white text-[1.5rem] font-bold uppercase tracking-wide rounded-xl overflow-hidden hover:opacity-90 active:scale-[0.98] transition-all duration-200 disabled:opacity-60"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-main-orange/15 to-transparent transition-transform duration-700 pointer-events-none" />
              {loading
                ? <><span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Sending…</>
                : <> Send Message <AiOutlineSwapRight className="text-[2rem]" /></>
              }
            </button>
          </motion.div>
        </form>
      </div>
    </div>
  )
}

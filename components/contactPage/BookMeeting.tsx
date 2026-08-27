import { useForm, SubmitHandler } from "react-hook-form"
import { useState, useEffect, useCallback } from "react"
import { FaCalendarAlt, FaClock, FaCheck, FaPaperPlane, FaBan, FaUser, FaEnvelope, FaBuilding, FaGlobe, FaCommentDots } from "react-icons/fa"
import { motion, AnimatePresence } from "framer-motion"
import toast from "react-hot-toast"
import emailjs from "@emailjs/browser"
import { countries } from "../../data/countries"
import { saveMessage } from "../../lib/adminMessages"

interface Inputs {
  fullName: string; email: string; date: string
  country: string; company: string; notes: string
}

const SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  ?? ""
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_BOOKING_TEMPLATE_ID ?? ""
const PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  ?? ""

const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)
const TIME_SLOTS   = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"]
const STORAGE_KEY  = "portfolio_bookings"

function loadBookings(): Record<string, string[]> {
  if (typeof window === "undefined") return {}
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}") } catch { return {} }
}
function saveBooking(date: string, time: string) {
  const all = loadBookings()
  if (!all[date]) all[date] = []
  if (!all[date].includes(time)) all[date].push(time)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
}
function isBooked(b: Record<string, string[]>, date: string, time: string) {
  return (b[date] ?? []).includes(time)
}

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

export default function BookMeeting() {
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<Inputs>()

  const [selectedTime, setSelectedTime]   = useState("")
  const [timeError, setTimeError]         = useState(false)
  const [loading, setLoading]             = useState(false)
  const [bookings, setBookings]           = useState<Record<string, string[]>>({})
  const [countrySearch, setCountrySearch] = useState("")
  const [countryOpen, setCountryOpen]     = useState(false)
  const [selectedCountry, setSelectedCountry] = useState<{ code: string; name: string; flag: string } | null>(null)

  const watchDate = watch("date", "")

  useEffect(() => { setBookings(loadBookings()) }, [])
  useEffect(() => { setSelectedTime("") }, [watchDate])
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("#country-picker")) setCountryOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const filteredCountries = countrySearch.trim()
    ? countries.filter((c) =>
        c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
        c.code.toLowerCase().includes(countrySearch.toLowerCase()))
    : countries

  const handleSelectTime = useCallback((time: string) => {
    if (isBooked(bookings, watchDate, time)) return
    setSelectedTime(time); setTimeError(false)
  }, [bookings, watchDate])

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!selectedTime) { setTimeError(true); toast.error("Please select a time slot."); return }
    if (isBooked(bookings, data.date, selectedTime)) { toast.error("That slot was just taken."); return }
    setTimeError(false); setLoading(true)
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        from_name: data.fullName, from_email: data.email, reply_to: data.email,
        date: data.date, time: selectedTime,
        country: selectedCountry ? `${selectedCountry.flag} ${selectedCountry.name}` : data.country || "—",
        company: data.company || "—", notes: data.notes || "—",
      }, { publicKey: PUBLIC_KEY })
      saveBooking(data.date, selectedTime)
      setBookings(loadBookings())
      await saveMessage({
        type: "booking", fullName: data.fullName, email: data.email,
        date: data.date, time: selectedTime,
        country: selectedCountry ? `${selectedCountry.flag} ${selectedCountry.name}` : data.country || "—",
        company: data.company || "—", notes: data.notes || "—",
      })
      toast.success(`Meeting booked for ${data.date} at ${selectedTime}!`, { duration: 6000 })
      reset(); setSelectedTime(""); setSelectedCountry(null); setCountrySearch("")
    } catch (err: any) {
      toast.error(err?.text || err?.message || "Something went wrong.")
    } finally { setLoading(false) }
  }

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

        {/* heading */}
        <div className="relative z-10">
          <p className="text-[1.1rem] font-bold text-white/80 uppercase tracking-[0.2em] mb-2">Schedule a Call</p>
          <h2 className="text-[2.8rem] font-extrabold text-white leading-[1.15] mb-4">
            Book a <span className="text-white/90 underline underline-offset-4 decoration-white/40">Meeting.</span>
          </h2>
          <p className="text-[1.4rem] text-white/75 leading-[1.75] mb-8">
            Free 30–60 min consultation.
          </p>

          {/* perks */}
          <div className="space-y-2 mb-8">
            {["Free Consultation", "Video or Phone Call", "No Commitment"].map((t, i) => (
              <motion.div key={t}
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.15 + i * 0.07 }}
                className="flex items-center gap-3 group"
              >
                <div className="w-6 h-6 rounded-md bg-white/20 border border-white/30 flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-colors duration-200">
                  <FaCheck className="text-white text-[0.8rem]" />
                </div>
                <span className="text-[1.3rem] text-white/90">{t}</span>
              </motion.div>
            ))}
          </div>

          {/* date picker */}
          <div className="mb-5">
            <label className="flex items-center gap-2 text-[1.1rem] font-bold text-white/70 uppercase tracking-[0.14em] mb-2">
              <FaCalendarAlt className="text-white" /> Date
            </label>
            <input
              {...register("date", { required: "Please select a date" })}
              type="date" min={new Date().toISOString().split("T")[0]}
              className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-[1.4rem] text-white focus:outline-none focus:border-white/60 focus:bg-white/25 transition-all duration-200"
              style={{ colorScheme: "light" }}
            />
            {errors.date && <p className="text-white/90 text-[1.2rem] mt-2 font-semibold">{errors.date.message}</p>}
          </div>

          {/* time slots */}
          <div>
            <label className="flex items-center gap-2 text-[1.1rem] font-bold text-white/70 uppercase tracking-[0.14em] mb-2">
              <FaClock className="text-white" />
              Time {watchDate && <span className="normal-case font-normal text-white/50 text-[1rem]">(JST)</span>}
            </label>
            <div className="grid grid-cols-4 gap-2">
              {TIME_SLOTS.map((time) => {
                const booked   = watchDate ? isBooked(bookings, watchDate, time) : false
                const selected = selectedTime === time
                return (
                  <motion.button
                    key={time} type="button" disabled={booked}
                    onClick={() => handleSelectTime(time)}
                    whileHover={!booked && !selected ? { scale: 1.06, y: -1 } : {}}
                    whileTap={!booked ? { scale: 0.93 } : {}}
                    className={`py-3 rounded-xl text-[1.2rem] font-bold transition-all duration-200 ${
                      booked
                        ? "bg-white/10 text-white/30 cursor-not-allowed border border-white/15"
                        : selected
                        ? "bg-white text-[#2eb5d5] shadow-lg border-transparent font-extrabold"
                        : "bg-white/15 text-white border border-white/25 hover:bg-white/25 hover:border-white/50"
                    }`}
                  >
                    {booked
                      ? <span className="flex flex-col items-center gap-0.5">
                          <FaBan className="text-[1rem]" />
                          <span className="text-[0.85rem]">{time}</span>
                        </span>
                      : time
                    }
                  </motion.button>
                )
              })}
            </div>
            {!watchDate && <p className="text-white/55 text-[1.2rem] mt-2">Select a date first.</p>}
            {timeError  && <p className="text-white/90 text-[1.2rem] mt-2 font-semibold">Please select a time slot.</p>}
          </div>
        </div>

        {/* live summary */}
        <div className="relative z-10 mt-6 grid grid-cols-3 gap-2 pt-5 border-t border-white/20">
          {[
            { Icon: FaCalendarAlt, label: "Date",     value: watchDate    || "—" },
            { Icon: FaClock,       label: "Time",     value: selectedTime || "—" },
            { Icon: FaClock,       label: "Duration", value: "30–60 min"         },
          ].map(({ Icon, label, value }) => (
            <div key={label} className="flex flex-col items-center text-center p-3 rounded-xl bg-white/15 border border-white/20">
              <Icon className="text-white text-[1.5rem] mb-1" />
              <p className="text-[0.9rem] font-bold text-white/55 uppercase tracking-widest leading-none mb-1">{label}</p>
              <p className="text-[1.25rem] font-bold text-white leading-none">{value}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── RIGHT: form ── */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.08 }}
        className="flex flex-col justify-center px-10 py-10 bg-white overflow-y-auto myScroll space-y-4"
      >
        {/* name + email */}
        <div className="grid grid-cols-2 gap-4">
          <Field label="Name" icon={FaUser} error={errors.fullName?.message}>
            <input
              {...register("fullName", { required: "Required" })}
              type="text" placeholder="Full name"
              className="w-full px-4 py-3.5 bg-transparent text-[1.4rem] text-gray-800 placeholder:text-gray-300 focus:outline-none"
            />
          </Field>
          <Field label="Email" icon={FaEnvelope} error={errors.email?.message}>
            <input
              {...register("email", {
                required: "Required",
                validate: (v) => isValidEmail(v) || "Invalid email",
              })}
              type="email" placeholder="your@email.com"
              className="w-full px-4 py-3.5 bg-transparent text-[1.4rem] text-gray-800 placeholder:text-gray-300 focus:outline-none"
            />
          </Field>
        </div>

        {/* country + company */}
        <div className="grid grid-cols-2 gap-4">
          <div id="country-picker" className="relative">
            <Field label="Country" icon={FaGlobe}>
              <input type="hidden" {...register("country")} value={selectedCountry?.name ?? ""} />
              <button
                type="button" onClick={() => setCountryOpen((o) => !o)}
                className="w-full text-left flex items-center justify-between gap-2 px-4 py-3.5 text-[1.4rem] text-gray-800 focus:outline-none"
              >
                {selectedCountry
                  ? <span className="truncate">{selectedCountry.flag} {selectedCountry.name}</span>
                  : <span className="text-gray-300">Select</span>
                }
                <svg className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200 ${countryOpen ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </Field>

            <AnimatePresence>
              {countryOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.16 }}
                  className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden"
                >
                  <div className="p-3 border-b border-gray-100">
                    <input
                      type="text" autoFocus placeholder="Search country…"
                      value={countrySearch} onChange={(e) => setCountrySearch(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl text-[1.4rem] outline-none focus:border-main-orange"
                    />
                  </div>
                  <ul className="max-h-52 overflow-y-auto noScroll">
                    {filteredCountries.length === 0
                      ? <li className="px-4 py-3 text-gray-400 text-[1.4rem]">No results</li>
                      : filteredCountries.map((c) => (
                        <li key={c.code}>
                          <button
                            type="button"
                            onClick={() => { setSelectedCountry(c); setCountryOpen(false); setCountrySearch("") }}
                            className={`w-full text-left px-4 py-3 text-[1.4rem] flex items-center gap-3 hover:bg-main-orange/5 hover:text-main-orange transition-colors duration-150 ${
                              selectedCountry?.code === c.code ? "bg-main-orange/5 text-main-orange font-semibold" : "text-gray-700"
                            }`}
                          >
                            <span className="text-xl">{c.flag}</span> {c.name}
                          </button>
                        </li>
                      ))
                    }
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Field label="Company" icon={FaBuilding}>
            <input
              {...register("company")}
              type="text" placeholder="Optional"
              className="w-full px-4 py-3.5 bg-transparent text-[1.4rem] text-gray-800 placeholder:text-gray-300 focus:outline-none"
            />
          </Field>
        </div>

        {/* notes */}
        <Field label="Notes" icon={FaCommentDots}>
          <textarea
            {...register("notes")}
            placeholder="What would you like to discuss?"
            rows={4}
            className="w-full px-4 py-3.5 bg-transparent text-[1.4rem] text-gray-800 placeholder:text-gray-300 focus:outline-none resize-none"
          />
        </Field>

        {/* submit */}
        <button
          type="submit" disabled={loading}
          onClick={handleSubmit(onSubmit)}
          className="group relative w-full flex items-center justify-center gap-4 py-5 bg-main-orange text-white text-[1.5rem] font-bold uppercase tracking-wide rounded-xl overflow-hidden hover:opacity-90 active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:scale-100"
        >
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-main-orange/15 to-transparent transition-transform duration-700 pointer-events-none" />
          {loading
            ? <><span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Booking…</>
            : <><FaPaperPlane /> Confirm Booking</>
          }
        </button>
      </motion.div>
    </div>
  )
}

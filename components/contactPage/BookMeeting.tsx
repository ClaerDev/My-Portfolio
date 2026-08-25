import { useForm, SubmitHandler } from "react-hook-form"
import { useState, useEffect, useCallback } from "react"
import { FaCalendarAlt, FaClock, FaCheck, FaPaperPlane, FaBan } from "react-icons/fa"
import toast from "react-hot-toast"
import emailjs from "@emailjs/browser"
import { countries } from "../../data/countries"
import { saveMessage } from "../../lib/adminMessages"

interface Inputs {
  fullName: string
  email: string
  date: string
  country: string
  company: string
  notes: string
}

const SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  ?? ""
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_BOOKING_TEMPLATE_ID ?? ""
const PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  ?? ""

const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)

const TIME_SLOTS = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"]
const STORAGE_KEY = "portfolio_bookings"

// ── helpers ──────────────────────────────────────────────────────────────────
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

function isBooked(bookings: Record<string, string[]>, date: string, time: string) {
  return (bookings[date] ?? []).includes(time)
}

// ── component ─────────────────────────────────────────────────────────────────
export default function BookMeeting() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const [selectedTime, setSelectedTime] = useState("")
  const [timeError, setTimeError]       = useState(false)
  const [loading, setLoading]           = useState(false)
  const [bookings, setBookings]         = useState<Record<string, string[]>>({})
  const [countrySearch, setCountrySearch] = useState("")
  const [countryOpen, setCountryOpen]     = useState(false)
  const [selectedCountry, setSelectedCountry] = useState<{ code: string; name: string; flag: string } | null>(null)

  const watchDate = watch("date", "")

  // load bookings from localStorage on mount
  useEffect(() => { setBookings(loadBookings()) }, [])

  // reset time selection when date changes (booked slots differ per day)
  useEffect(() => { setSelectedTime("") }, [watchDate])

  // close country dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest("#country-picker")) setCountryOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const filteredCountries = countrySearch.trim()
    ? countries.filter((c) =>
        c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
        c.code.toLowerCase().includes(countrySearch.toLowerCase())
      )
    : countries

  const handleSelectTime = useCallback((time: string) => {
    if (isBooked(bookings, watchDate, time)) return
    setSelectedTime(time)
    setTimeError(false)
  }, [bookings, watchDate])

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!selectedTime) { setTimeError(true); toast.error("Please select a time slot."); return }
    if (isBooked(bookings, data.date, selectedTime)) {
      toast.error("That slot was just taken. Please choose another time.")
      return
    }
    setTimeError(false)
    setLoading(true)

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name:  data.fullName,
          from_email: data.email,
          reply_to:   data.email,
          date:       data.date,
          time:       selectedTime,
          country:    selectedCountry ? `${selectedCountry.flag} ${selectedCountry.name}` : data.country || "—",
          company:    data.company || "—",
          notes:      data.notes   || "—",
        },
        { publicKey: PUBLIC_KEY }
      )

      // persist the booking so the slot shows as taken
      saveBooking(data.date, selectedTime)
      setBookings(loadBookings())

      // save to admin dashboard
      saveMessage({
        type:        "booking",
        fullName:    data.fullName,
        email:       data.email,
        date:        data.date,
        time:        selectedTime,
        country:     selectedCountry ? `${selectedCountry.flag} ${selectedCountry.name}` : data.country || "—",
        company:     data.company || "—",
        notes:       data.notes   || "—",
      })

      toast.success(
        `Meeting booked for ${data.date} at ${selectedTime}! I'll confirm shortly.`,
        { duration: 6000 }
      )
      reset()
      setSelectedTime("")
      setSelectedCountry(null)
      setCountrySearch("")
    } catch (err: any) {
      console.error("EmailJS booking error:", JSON.stringify(err))
      toast.error(err?.text || err?.message || "Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="p-12" onSubmit={handleSubmit(onSubmit)} noValidate>

      {/* ── Date & Time ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 mb-10 gap-8">

        {/* Date picker */}
        <div>
          <label className="block text-[1.4rem] font-semibold text-gray-600 mb-3 uppercase tracking-wide">
            Select Date
          </label>
          <input
            {...register("date", { required: "Please select a date" })}
            type="date"
            min={new Date().toISOString().split("T")[0]}
            className="formStyle"
          />
          {errors.date && (
            <p className="text-red-500 text-xl mt-2">{errors.date.message}</p>
          )}
        </div>

        {/* Time slots */}
        <div>
          <label className="block text-[1.4rem] font-semibold text-gray-600 mb-3 uppercase tracking-wide">
            Select Time {watchDate && <span className="text-gray-400 normal-case font-normal">(JST)</span>}
          </label>
          <div className="grid grid-cols-4 gap-2">
            {TIME_SLOTS.map((time) => {
              const booked   = watchDate ? isBooked(bookings, watchDate, time) : false
              const selected = selectedTime === time

              return (
                <button
                  key={time}
                  type="button"
                  disabled={booked}
                  onClick={() => handleSelectTime(time)}
                  title={booked ? "Already booked" : time}
                  className={`relative px-2 py-3 rounded-lg font-bold text-lg transition-all duration-300 ${
                    booked
                      ? "bg-gray-100 text-gray-300 cursor-not-allowed border border-gray-200"
                      : selected
                      ? "bg-main-orange text-white shadow-lg scale-105"
                      : "bg-white text-gray-700 hover:bg-sky-50 hover:text-main-orange border border-gray-300"
                  }`}
                >
                  {booked ? (
                    <span className="flex flex-col items-center gap-0.5">
                      <FaBan className="text-gray-300 text-base" />
                      <span className="text-xs">{time}</span>
                    </span>
                  ) : (
                    time
                  )}
                </button>
              )
            })}
          </div>
          {!watchDate && (
            <p className="text-gray-400 text-xl mt-2">Select a date to see availability.</p>
          )}
          {timeError && (
            <p className="text-red-500 text-xl mt-2">Please select a time slot.</p>
          )}
        </div>
      </div>

      {/* ── Contact Info ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 mb-8 gap-8">
        <div>
          <input
            {...register("fullName", { required: "Full name is required" })}
            type="text"
            placeholder="Full Name"
            className="formStyle"
          />
          {errors.fullName && (
            <p className="text-red-500 text-xl mt-2">{errors.fullName.message}</p>
          )}
        </div>
        <div>
          <input
            {...register("email", {
              required: "Email is required",
              validate: (v) => isValidEmail(v) || "Invalid email address",
            })}
            type="email"
            placeholder="Email Address"
            className="formStyle"
          />
          {errors.email && (
            <p className="text-red-500 text-xl mt-2">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* ── Country + Company ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 mb-8 gap-8">

        {/* Custom country picker */}
        <div id="country-picker" className="relative">
          {/* hidden input for react-hook-form */}
          <input type="hidden" {...register("country")} value={selectedCountry?.name ?? ""} />

          <button
            type="button"
            onClick={() => setCountryOpen((o) => !o)}
            className="formStyle w-full text-left flex items-center justify-between gap-2 cursor-pointer"
          >
            {selectedCountry ? (
              <span>{selectedCountry.flag} {selectedCountry.name}</span>
            ) : (
              <span className="text-gray-400">Select your country</span>
            )}
            <svg
              className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${countryOpen ? "rotate-180" : ""}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {countryOpen && (
            <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden">
              {/* search */}
              <div className="p-3 border-b border-gray-100">
                <input
                  type="text"
                  autoFocus
                  placeholder="Search country..."
                  value={countrySearch}
                  onChange={(e) => setCountrySearch(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-2xl outline-none focus:border-main-orange"
                />
              </div>
              {/* list */}
              <ul className="max-h-64 overflow-y-auto noScroll">
                {filteredCountries.length === 0 ? (
                  <li className="px-5 py-4 text-gray-400 text-xl">No countries found</li>
                ) : (
                  filteredCountries.map((c) => (
                    <li key={c.code}>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCountry(c)
                          setCountryOpen(false)
                          setCountrySearch("")
                        }}
                        className={`w-full text-left px-5 py-3 text-2xl flex items-center gap-3 hover:bg-sky-50 hover:text-main-orange transition-colors duration-150 ${
                          selectedCountry?.code === c.code ? "bg-sky-50 text-main-orange font-semibold" : "text-gray-700"
                        }`}
                      >
                        <span className="text-2xl">{c.flag}</span>
                        <span>{c.name}</span>
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}
        </div>

        <input
          {...register("company")}
          type="text"
          placeholder="Your Company (optional)"
          className="formStyle"
        />
      </div>

      <textarea
        {...register("notes")}
        placeholder="What would you like to discuss?"
        className="formStyle h-48"
      />

      {/* ── Booking Summary ──────────────────────────────────────────────── */}
      <div className="mt-10 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <div className="flex items-start gap-3">
            <FaCalendarAlt className="text-main-orange text-2xl mt-1 flex-shrink-0" />
            <div>
              <p className="text-xl font-bold text-gray-500 uppercase tracking-wide">Date</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{watchDate || "Select date"}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <FaClock className="text-main-orange text-2xl mt-1 flex-shrink-0" />
            <div>
              <p className="text-xl font-bold text-gray-500 uppercase tracking-wide">Time</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{selectedTime || "Select time"}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <FaClock className="text-main-orange text-2xl mt-1 flex-shrink-0" />
            <div>
              <p className="text-xl font-bold text-gray-500 uppercase tracking-wide">Duration</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">30–60 min</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {["Free Consultation", "Video or Phone Call", "No Commitment"].map((label) => (
            <div key={label} className="flex items-center gap-3 text-xl text-gray-700">
              <span className="w-6 h-6 rounded-full bg-main-orange flex items-center justify-center flex-shrink-0">
                <FaCheck className="text-white text-xs" />
              </span>
              {label}
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-8 flex items-center gap-4 px-10 py-5 bg-main-orange text-white text-2xl font-semibold uppercase hover:opacity-85 transition-opacity duration-200 disabled:opacity-60"
      >
        <FaPaperPlane className="text-2xl" />
        {loading ? "Booking..." : "Confirm Booking"}
      </button>
    </form>
  )
}

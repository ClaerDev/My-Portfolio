import { useState, useEffect, useCallback } from "react"
import {
  FaCalendarAlt, FaEnvelope, FaTrash, FaCheck,
  FaLock, FaSignOutAlt, FaInbox, FaChevronDown,
} from "react-icons/fa"
import { MdOutlineMarkEmailRead } from "react-icons/md"
import { HiSparkles } from "react-icons/hi"
import { motion, AnimatePresence } from "framer-motion"
import { AdminMessage } from "../../types"
import { loadMessages, updateMessageStatus, deleteMessage } from "../../lib/adminMessages"
import { adminAuthVar } from "../../store"
import { useReactiveVar } from "../../hooks/useReactiveVar"
import Title from "../Title"

type Tab = "all" | "unread" | "meetings"

// ── helpers ────────────────────────────────────────────────────────────────────
function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short", day: "numeric", year: "numeric",
    hour: "numeric", minute: "2-digit", hour12: true,
  })
}
function formatMeetingDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric",
  })
}

// ── animations ─────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
}

// ── Login Screen ───────────────────────────────────────────────────────────────
function LoginScreen() {
  const [email, setEmail]       = useState("")
  const [password, setPassword] = useState("")
  const [error, setError]       = useState("")
  const [shake, setShake]       = useState(false)
  const [loading, setLoading]   = useState(false)
  const [showPw, setShowPw]     = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError("")
    try {
      const res  = await fetch("/api/admin/login", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (data.ok) {
        localStorage.setItem("portfolio_admin_auth", "true")
        adminAuthVar.set(true)
      } else {
        setError(data.message ?? "Invalid credentials.")
        setShake(true); setTimeout(() => setShake(false), 500)
      }
    } catch {
      setError("Something went wrong. Please try again.")
      setShake(true); setTimeout(() => setShake(false), 500)
    } finally { setLoading(false) }
  }

  return (
    <section className="h-full overflow-y-scroll myScroll">
      <Title name="admin" />

      <div className="flex items-center justify-center py-16 px-8">
        <motion.div
          initial="hidden" animate="visible" variants={fadeUp}
          className={`w-full max-w-md ${shake ? "animate-shake" : ""}`}
        >
          {/* glass card */}
          <div className="relative rounded-3xl overflow-hidden bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_40px_rgba(86,200,232,0.12)]">

            {/* top gradient bar */}
            <div className="h-1 w-full bg-gradient-to-r from-main-orange via-cyan-300 to-main-orange" />

            {/* glow blob */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-main-orange/10 rounded-full blur-3xl pointer-events-none" />

            <div className="p-10 relative z-10">
              {/* icon */}
              <div className="flex flex-col items-center mb-10">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-main-orange to-cyan-300 flex items-center justify-center shadow-lg shadow-main-orange/30">
                    <FaLock className="text-white text-3xl" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white" />
                </div>
                <h2 className="mt-5 text-[2.2rem] font-bold text-gray-800 tracking-tight">Welcome back</h2>
                <p className="text-gray-400 text-[1.4rem] mt-1">Sign in to your admin panel</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                {/* email */}
                <div className="group">
                  <label className="block text-[1.2rem] font-semibold text-gray-500 mb-2 uppercase tracking-widest">
                    Email
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-[1.6rem] group-focus-within:text-main-orange transition-colors duration-200" />
                    <input
                      type="email" value={email}
                      onChange={(e) => { setEmail(e.target.value); setError("") }}
                      placeholder="admin@email.com"
                      autoFocus
                      className="w-full pl-12 pr-4 py-4 bg-gray-50/80 border border-gray-200 rounded-xl text-[1.5rem] text-gray-700 placeholder:text-gray-300 focus:outline-none focus:border-main-orange focus:bg-white focus:ring-2 focus:ring-main-orange/15 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* password */}
                <div className="group">
                  <label className="block text-[1.2rem] font-semibold text-gray-500 mb-2 uppercase tracking-widest">
                    Password
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-[1.6rem] group-focus-within:text-main-orange transition-colors duration-200" />
                    <input
                      type={showPw ? "text" : "password"} value={password}
                      onChange={(e) => { setPassword(e.target.value); setError("") }}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-12 py-4 bg-gray-50/80 border border-gray-200 rounded-xl text-[1.5rem] text-gray-700 placeholder:text-gray-300 focus:outline-none focus:border-main-orange focus:bg-white focus:ring-2 focus:ring-main-orange/15 transition-all duration-200"
                    />
                    <button
                      type="button" onClick={() => setShowPw(!showPw)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-main-orange text-[1.4rem] transition-colors"
                    >
                      {showPw ? "🙈" : "👁"}
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="text-red-400 text-[1.3rem] text-center bg-red-50 py-3 rounded-xl border border-red-100"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                <button
                  type="submit" disabled={loading}
                  className="w-full py-5 mt-2 rounded-xl bg-gradient-to-r from-main-orange to-cyan-400 text-white text-[1.6rem] font-bold tracking-wide shadow-lg shadow-main-orange/25 hover:shadow-main-orange/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:scale-100"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-3">
                      <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Signing in…
                    </span>
                  ) : "Sign In"}
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ── Stat Pill ──────────────────────────────────────────────────────────────────
function StatPill({ label, count, active, onClick }: {
  label: string; count: number; active: boolean; onClick: () => void
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
      className={`relative flex items-center gap-2 px-5 py-2 rounded-full text-[1.3rem] font-semibold tracking-wide transition-all duration-200 ${
        active
          ? "bg-gradient-to-r from-main-orange to-cyan-400 text-white shadow-md shadow-main-orange/25"
          : "bg-gray-100/80 text-gray-500 hover:bg-gray-200/80"
      }`}
    >
      {label}
      <span className={`text-[1.1rem] font-bold min-w-[2rem] text-center rounded-full px-1.5 py-0.5 ${
        active ? "bg-white/20 text-white" : "bg-white text-gray-400"
      }`}>{count}</span>
    </motion.button>
  )
}

// ── Message Card ───────────────────────────────────────────────────────────────
interface CardProps {
  msg: AdminMessage
  expanded: boolean
  index: number
  onToggle: () => void
  onAccept: () => void
  onRead: () => void
  onDelete: () => void
}

function MessageCard({ msg, expanded, index, onToggle, onAccept, onRead, onDelete }: CardProps) {
  const isBooking  = msg.type === "booking"
  const isNew      = msg.status === "new"
  const isAccepted = msg.status === "accepted"

  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      layout
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        expanded
          ? "border-main-orange/40 shadow-lg shadow-main-orange/8 bg-white"
          : "border-gray-100 bg-white/70 hover:border-main-orange/20 hover:bg-white hover:shadow-md"
      } ${isAccepted ? "opacity-55" : ""}`}
    >
      {/* left accent bar — shows only for new messages */}
      {isNew && (
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-main-orange to-cyan-300 rounded-full" />
      )}

      {/* ── header row ── */}
      <div
        className="flex items-center gap-4 px-6 py-5 cursor-pointer select-none"
        onClick={onToggle}
      >
        {/* avatar circle */}
        <div className={`relative w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-[1.6rem] text-white ${
          isBooking
            ? "bg-gradient-to-br from-main-orange to-cyan-400"
            : "bg-gradient-to-br from-slate-400 to-slate-500"
        }`}>
          {msg.fullName.charAt(0).toUpperCase()}
          {isNew && (
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-main-orange rounded-full border-2 border-white animate-pulse" />
          )}
        </div>

        {/* name + meta */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-gray-800 text-[1.6rem] font-semibold truncate leading-snug">
              {msg.fullName}
            </p>
            {/* type chip */}
            <span className={`text-[1rem] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide flex-shrink-0 ${
              isBooking
                ? "bg-main-orange/10 text-main-orange"
                : "bg-slate-100 text-slate-500"
            }`}>
              {isBooking ? "📅 Booking" : "✉️ Message"}
            </span>
          </div>
          <p className="text-gray-400 text-[1.3rem] truncate mt-0.5">{msg.email}</p>
        </div>

        {/* right side — status + date + chevron */}
        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
          {isNew && (
            <span className="text-[1rem] font-bold px-2.5 py-0.5 bg-main-orange text-white rounded-full uppercase tracking-wide">
              New
            </span>
          )}
          {isAccepted && (
            <span className="text-[1rem] font-bold px-2.5 py-0.5 bg-emerald-50 text-emerald-500 border border-emerald-200 rounded-full uppercase tracking-wide">
              Accepted
            </span>
          )}
          {msg.status === "read" && (
            <span className="text-[1rem] font-bold px-2.5 py-0.5 bg-gray-50 text-gray-400 border border-gray-200 rounded-full uppercase tracking-wide">
              Read
            </span>
          )}
          <span className="text-gray-300 text-[1.2rem]">{formatDate(msg.createdAt)}</span>
        </div>

        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="ml-2 flex-shrink-0"
        >
          <FaChevronDown className="text-gray-300 text-[1.4rem]" />
        </motion.div>
      </div>

      {/* ── expanded body ── */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            {/* thin divider */}
            <div className="mx-6 h-px bg-gradient-to-r from-transparent via-gray-100 to-transparent" />

            <div className="px-6 py-6 space-y-5">

              {/* contact message */}
              {!isBooking && msg.message && (
                <div className="bg-gray-50/80 rounded-xl p-5 border border-gray-100">
                  <p className="text-[1.1rem] font-bold text-gray-300 uppercase tracking-widest mb-3">Message</p>
                  <p className="text-gray-600 text-[1.5rem] leading-[1.8] whitespace-pre-wrap">{msg.message}</p>
                </div>
              )}

              {/* booking details */}
              {isBooking && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-main-orange/5 border border-main-orange/15 rounded-xl p-4">
                      <p className="text-[1.1rem] font-bold text-main-orange uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                        <FaCalendarAlt className="text-[1.2rem]" /> Date
                      </p>
                      <p className="text-gray-700 text-[1.4rem] font-semibold">
                        {msg.date ? formatMeetingDate(msg.date) : "—"}
                      </p>
                    </div>
                    <div className="bg-gray-50/80 border border-gray-100 rounded-xl p-4">
                      <p className="text-[1.1rem] font-bold text-gray-300 uppercase tracking-widest mb-1.5">Time</p>
                      <p className="text-gray-700 text-[1.4rem] font-semibold">{msg.time ?? "—"}</p>
                    </div>
                  </div>

                  {(msg.company || msg.country) && (
                    <div className="grid grid-cols-2 gap-4">
                      {msg.company && (
                        <div className="bg-gray-50/80 border border-gray-100 rounded-xl p-4">
                          <p className="text-[1.1rem] font-bold text-gray-300 uppercase tracking-widest mb-1.5">Company</p>
                          <p className="text-gray-700 text-[1.4rem] font-semibold">{msg.company}</p>
                        </div>
                      )}
                      {msg.country && (
                        <div className="bg-gray-50/80 border border-gray-100 rounded-xl p-4">
                          <p className="text-[1.1rem] font-bold text-gray-300 uppercase tracking-widest mb-1.5">Country</p>
                          <p className="text-gray-700 text-[1.4rem] font-semibold">{msg.country}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {msg.notes && msg.notes !== "—" && (
                    <div className="bg-gray-50/80 border border-gray-100 rounded-xl p-4">
                      <p className="text-[1.1rem] font-bold text-gray-300 uppercase tracking-widest mb-1.5">Notes</p>
                      <p className="text-gray-600 text-[1.4rem] leading-[1.8]">{msg.notes}</p>
                    </div>
                  )}
                </div>
              )}

              {/* action row */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <motion.button
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  onClick={onAccept} disabled={isAccepted}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-400 to-emerald-500 text-white text-[1.3rem] font-bold rounded-xl shadow-sm shadow-emerald-200 hover:shadow-emerald-300 disabled:opacity-40 transition-all duration-200"
                >
                  <FaCheck /> Accept
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  onClick={onRead} disabled={msg.status !== "new"}
                  className="flex items-center gap-2 px-6 py-3 border border-main-orange/30 text-main-orange text-[1.3rem] font-bold rounded-xl hover:bg-main-orange/8 disabled:opacity-40 transition-all duration-200"
                >
                  <MdOutlineMarkEmailRead className="text-[1.6rem]" /> Mark Read
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  onClick={onDelete}
                  className="flex items-center gap-2 px-6 py-3 border border-red-200 text-red-400 text-[1.3rem] font-bold rounded-xl hover:bg-red-50 transition-all duration-200"
                >
                  <FaTrash /> Delete
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── Main Dashboard ─────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const isAdmin = useReactiveVar(adminAuthVar)
  const [messages, setMessages]     = useState<AdminMessage[]>([])
  const [activeTab, setActiveTab]   = useState<Tab>("all")
  const [expandedId, setExpandedId] = useState<string | null>(null)

  useEffect(() => {
    if (localStorage.getItem("portfolio_admin_auth") === "true") adminAuthVar.set(true)
  }, [])

  const refresh = useCallback(async () => {
    const msgs = await loadMessages()
    setMessages(msgs)
  }, [])

  useEffect(() => {
    if (!isAdmin) return
    refresh()
    const es = new EventSource("/api/admin/stream")
    es.addEventListener("new_message", () => refresh())
    es.onerror = () => es.close()
    return () => es.close()
  }, [isAdmin, refresh])

  function handleLogout() {
    localStorage.removeItem("portfolio_admin_auth")
    adminAuthVar.set(false)
  }

  async function handleAccept(id: string) { await updateMessageStatus(id, "accepted"); refresh() }
  async function handleRead(id: string)   { await updateMessageStatus(id, "read");     refresh() }
  async function handleDelete(id: string) {
    await deleteMessage(id); refresh()
    if (expandedId === id) setExpandedId(null)
  }

  if (!isAdmin) return <LoginScreen />

  // ── counts ─────────────────────────────────────────────────────────────────
  const countAll      = messages.length
  const countUnread   = messages.filter((m) => m.status === "new").length
  const countMeetings = messages.filter((m) => m.type === "booking").length

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "all",      label: "All",      count: countAll },
    { key: "unread",   label: "Unread",   count: countUnread },
    { key: "meetings", label: "Meetings", count: countMeetings },
  ]

  const filtered = messages.filter((m) => {
    if (activeTab === "unread")   return m.status === "new"
    if (activeTab === "meetings") return m.type   === "booking"
    return true
  })

  return (
    <section className="h-full overflow-y-scroll myScroll">

      {/* ── section title (matches every other section) ── */}
      <Title name="dashboard" />

      {/* ── toolbar: stat pills + sign-out ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="px-10 pt-8 pb-4 flex items-center justify-between flex-wrap gap-4"
      >
        {/* stat summary pills */}
        <div className="flex items-center gap-3 flex-wrap">
          {tabs.map(({ key, label, count }) => (
            <StatPill
              key={key} label={label} count={count}
              active={activeTab === key}
              onClick={() => { setActiveTab(key); setExpandedId(null) }}
            />
          ))}
        </div>

        {/* sign out */}
        <motion.button
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
          onClick={handleLogout}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-[1.3rem] text-gray-400 font-semibold hover:border-red-200 hover:text-red-400 transition-all duration-200"
        >
          <FaSignOutAlt /> Sign out
        </motion.button>
      </motion.div>

      {/* ── message list ── */}
      <div className="px-10 pb-12 pt-4">
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-main-orange/10 to-cyan-100/50 flex items-center justify-center mb-6 shadow-inner">
              <FaInbox className="text-[3.5rem] text-main-orange/40" />
            </div>
            <p className="text-gray-600 text-[1.8rem] font-semibold mb-2">No messages yet</p>
            <p className="text-gray-400 text-[1.5rem] leading-[1.8] max-w-xs">
              Messages from your contact form will show up here in real time.
            </p>
            <div className="mt-6 flex items-center gap-2 text-main-orange text-[1.3rem] font-medium">
              <HiSparkles /> Live updates enabled
            </div>
          </motion.div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((msg, idx) => (
                <MessageCard
                  key={msg.id}
                  msg={msg}
                  index={idx}
                  expanded={expandedId === msg.id}
                  onToggle={() => setExpandedId(expandedId === msg.id ? null : msg.id)}
                  onAccept={() => handleAccept(msg.id)}
                  onRead={()   => handleRead(msg.id)}
                  onDelete={()  => handleDelete(msg.id)}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  )
}

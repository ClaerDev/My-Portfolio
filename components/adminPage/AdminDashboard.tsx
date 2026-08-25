import { useState, useEffect, useCallback } from "react"
import { FaCalendarAlt, FaEnvelope, FaTrash, FaCheck, FaEye, FaLock, FaSignOutAlt, FaInbox } from "react-icons/fa"
import { MdOutlineMarkEmailRead } from "react-icons/md"
import { AdminMessage } from "../../types"
import { loadMessages, updateMessageStatus, deleteMessage } from "../../lib/adminMessages"
import { adminAuthVar } from "../../store"
import { useReactiveVar } from "../../hooks/useReactiveVar"

type Tab = "all" | "unread" | "meetings"

// ── helpers ────────────────────────────────────────────────────────────────────
function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short", day: "numeric", year: "numeric",
    hour: "numeric", minute: "2-digit", hour12: true,
  })
}

function formatMeetingDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00")
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
}

// ── Login Screen ───────────────────────────────────────────────────────────────
function LoginScreen() {
  const [email, setEmail]       = useState("")
  const [password, setPassword] = useState("")
  const [error, setError]       = useState("")
  const [shake, setShake]       = useState(false)
  const [loading, setLoading]   = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (data.ok) {
        localStorage.setItem("portfolio_admin_auth", "true")
        adminAuthVar.set(true)
      } else {
        setError(data.message ?? "Invalid email or password.")
        setShake(true)
        setTimeout(() => setShake(false), 500)
      }
    } catch {
      setError("Something went wrong. Please try again.")
      setShake(true)
      setTimeout(() => setShake(false), 500)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[50rem] px-12">
      <div className={`w-full max-w-md ${shake ? "animate-shake" : ""}`}>
        {/* header */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-main-orange/10 flex items-center justify-center mb-4">
            <FaLock className="text-main-orange text-2xl" />
          </div>
          <h2 className="text-[2.6rem] font-bold text-gray-800">Admin Login</h2>
          <p className="text-gray-500 text-xl mt-1">Sign in with admin credentials</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xl font-semibold text-gray-600 mb-2">Email</label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError("") }}
                placeholder="Enter your email"
                autoFocus
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl text-2xl outline-none focus:border-main-orange focus:ring-2 focus:ring-main-orange/20 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xl font-semibold text-gray-600 mb-2">Password</label>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError("") }}
                placeholder="Enter password"
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl text-2xl outline-none focus:border-main-orange focus:ring-2 focus:ring-main-orange/20 transition-all"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-xl text-center font-medium">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-main-orange text-white text-2xl font-bold rounded-xl hover:opacity-90 disabled:opacity-60 transition-opacity"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  )
}

// ── Message Card ───────────────────────────────────────────────────────────────
interface CardProps {
  msg: AdminMessage
  expanded: boolean
  onToggle: () => void
  onAccept: () => void
  onRead: () => void
  onDelete: () => void
}

function MessageCard({ msg, expanded, onToggle, onAccept, onRead, onDelete }: CardProps) {
  const isBooking = msg.type === "booking"
  const isNew     = msg.status === "new"
  const isAccepted = msg.status === "accepted"

  return (
    <div
      className={`rounded-2xl border-2 transition-all duration-200 overflow-hidden ${
        expanded ? "border-main-orange/40 shadow-lg" : "border-gray-100 hover:border-gray-200"
      } ${isAccepted ? "opacity-70" : ""}`}
    >
      {/* ── card header ── */}
      <div
        className="flex items-center gap-4 p-6 cursor-pointer select-none"
        onClick={onToggle}
      >
        {/* icon */}
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
          isBooking ? "bg-blue-50" : "bg-green-50"
        }`}>
          {isBooking
            ? <FaCalendarAlt className="text-main-orange text-xl" />
            : <FaEnvelope    className="text-green-500 text-xl" />
          }
        </div>

        {/* name + email */}
        <div className="flex-1 min-w-0">
          <p className="text-gray-800 text-[1.8rem] font-bold truncate">{msg.fullName}</p>
          <p className="text-gray-500 text-[1.4rem] truncate">{msg.email}</p>
        </div>

        {/* badge + time */}
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          {isNew && (
            <span className="px-3 py-1 bg-main-orange text-white text-base font-bold rounded-full">
              New
            </span>
          )}
          {isAccepted && (
            <span className="px-3 py-1 bg-green-100 text-green-700 text-base font-bold rounded-full">
              Accepted
            </span>
          )}
          {msg.status === "read" && (
            <span className="px-3 py-1 bg-gray-100 text-gray-500 text-base font-bold rounded-full">
              Read
            </span>
          )}
          <span className="text-gray-400 text-[1.3rem]">{formatDate(msg.createdAt)}</span>
        </div>
      </div>

      {/* ── expanded detail ── */}
      {expanded && (
        <div className="px-6 pb-6 border-t border-gray-100">

          {/* action buttons */}
          <div className="flex flex-wrap gap-3 py-5">
            <button
              onClick={onAccept}
              disabled={isAccepted}
              className="flex items-center gap-2 px-5 py-3 bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white text-xl font-bold rounded-xl transition-colors duration-200"
            >
              <FaCheck /> Accept
            </button>
            <button
              onClick={onRead}
              disabled={msg.status !== "new"}
              className="flex items-center gap-2 px-5 py-3 border-2 border-main-orange text-main-orange hover:bg-main-orange hover:text-white disabled:opacity-40 text-xl font-bold rounded-xl transition-colors duration-200"
            >
              <MdOutlineMarkEmailRead className="text-2xl" /> Mark as Read
            </button>
            <button
              onClick={onDelete}
              className="flex items-center gap-2 px-5 py-3 border-2 border-red-400 text-red-500 hover:bg-red-500 hover:text-white text-xl font-bold rounded-xl transition-colors duration-200"
            >
              <FaTrash /> Delete
            </button>
          </div>

          {/* contact message */}
          {!isBooking && msg.message && (
            <div className="bg-gray-50 rounded-xl p-5">
              <p className="text-[1.2rem] font-bold text-gray-400 uppercase tracking-widest mb-2">Message</p>
              <p className="text-gray-700 text-[1.6rem] leading-relaxed whitespace-pre-wrap">{msg.message}</p>
            </div>
          )}

          {/* booking details */}
          {isBooking && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {msg.company && (
                  <div className="border border-gray-200 rounded-xl p-4">
                    <p className="text-[1.2rem] font-bold text-gray-400 uppercase tracking-widest mb-1">Company</p>
                    <p className="text-gray-800 text-[1.6rem] font-semibold">{msg.company}</p>
                  </div>
                )}
                {msg.country && (
                  <div className="border border-gray-200 rounded-xl p-4">
                    <p className="text-[1.2rem] font-bold text-gray-400 uppercase tracking-widest mb-1">Country</p>
                    <p className="text-gray-800 text-[1.6rem] font-semibold">{msg.country}</p>
                  </div>
                )}
              </div>

              {/* meeting schedule */}
              <div className="bg-sky-50 border border-sky-200 rounded-xl p-5">
                <p className="text-[1.2rem] font-bold text-main-orange uppercase tracking-widest mb-4">Meeting Schedule</p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <FaCalendarAlt className="text-main-orange text-xl flex-shrink-0" />
                    <div>
                      <p className="text-[1.2rem] text-gray-500 font-medium">Date</p>
                      <p className="text-[1.8rem] font-bold text-gray-800">
                        {msg.date ? formatMeetingDate(msg.date) : "—"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCalendarAlt className="text-main-orange text-xl flex-shrink-0" />
                    <div>
                      <p className="text-[1.2rem] text-gray-500 font-medium">Time</p>
                      <p className="text-[1.8rem] font-bold text-gray-800">{msg.time ?? "—"}</p>
                    </div>
                  </div>
                </div>
              </div>

              {msg.notes && msg.notes !== "—" && (
                <div className="bg-gray-50 rounded-xl p-5">
                  <p className="text-[1.2rem] font-bold text-gray-400 uppercase tracking-widest mb-2">Notes</p>
                  <p className="text-gray-700 text-[1.6rem] leading-relaxed">{msg.notes}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── Main Dashboard ─────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const isAdmin = useReactiveVar(adminAuthVar)
  const [messages, setMessages]   = useState<AdminMessage[]>([])
  const [activeTab, setActiveTab] = useState<Tab>("all")
  const [expandedId, setExpandedId] = useState<string | null>(null)

  // restore auth from localStorage on mount
  useEffect(() => {
    if (localStorage.getItem("portfolio_admin_auth") === "true") adminAuthVar.set(true)
  }, [])

  // load + refresh messages
  const refresh = useCallback(async () => {
    const msgs = await loadMessages()
    setMessages(msgs)
  }, [])

  // initial load + listen for server-pushed new_message events
  useEffect(() => {
    if (!isAdmin) return
    refresh()

    const es = new EventSource("/api/admin/stream")
    es.addEventListener("new_message", () => refresh())

    // reconnect automatically if the connection drops
    es.onerror = () => {
      es.close()
    }

    return () => es.close()
  }, [isAdmin, refresh])

  function handleLogout() {
    localStorage.removeItem("portfolio_admin_auth")
    adminAuthVar.set(false)
  }

  async function handleAccept(id: string)  { await updateMessageStatus(id, "accepted"); refresh() }
  async function handleRead(id: string)    { await updateMessageStatus(id, "read");     refresh() }
  async function handleDelete(id: string)  { await deleteMessage(id); refresh(); if (expandedId === id) setExpandedId(null) }

  if (!isAdmin) return <LoginScreen />

  // ── filter ────
  const filtered = messages.filter((m) => {
    if (activeTab === "unread")   return m.status === "new"
    if (activeTab === "meetings") return m.type   === "booking"
    return true
  })

  const countAll      = messages.length
  const countUnread   = messages.filter((m) => m.status === "new").length
  const countMeetings = messages.filter((m) => m.type === "booking").length

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "all",      label: "All Messages", count: countAll },
    { key: "unread",   label: "Unread",       count: countUnread },
    { key: "meetings", label: "Meetings",     count: countMeetings },
  ]

  return (
    <div className="w-full h-full overflow-y-auto myScroll">
      <div className="px-10 py-8">

        {/* ── header ── */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-[3rem] font-black text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-500 text-[1.6rem] mt-1">Manage your messages and meeting requests</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-3 border border-gray-200 rounded-xl text-gray-500 hover:text-red-500 hover:border-red-300 text-xl transition-colors duration-200"
          >
            <FaSignOutAlt /> Sign out
          </button>
        </div>

        {/* ── tabs ── */}
        <div className="flex gap-3 mb-8 flex-wrap">
          {tabs.map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => { setActiveTab(key); setExpandedId(null) }}
              className={`px-6 py-3 rounded-xl text-[1.6rem] font-bold transition-all duration-200 ${
                activeTab === key
                  ? "bg-main-orange text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {label} ({count})
            </button>
          ))}
        </div>

        {/* ── message list ── */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <FaInbox className="text-6xl mb-4 opacity-30" />
            <p className="text-[1.8rem] font-semibold">No messages yet</p>
            <p className="text-[1.5rem] mt-1">Messages will appear here after contact form submissions.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((msg) => (
              <MessageCard
                key={msg.id}
                msg={msg}
                expanded={expandedId === msg.id}
                onToggle={() => setExpandedId(expandedId === msg.id ? null : msg.id)}
                onAccept={() => handleAccept(msg.id)}
                onRead={()   => handleRead(msg.id)}
                onDelete={()  => handleDelete(msg.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

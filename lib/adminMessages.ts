import { AdminMessage } from "../types"

const STORAGE_KEY = "portfolio_admin_messages"

export function loadMessages(): AdminMessage[] {
  if (typeof window === "undefined") return []
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]")
  } catch {
    return []
  }
}

export function saveMessage(msg: Omit<AdminMessage, "id" | "createdAt" | "status">): AdminMessage {
  const messages = loadMessages()
  const newMsg: AdminMessage = {
    ...msg,
    id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
    status: "new",
  }
  messages.unshift(newMsg)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
  return newMsg
}

export function updateMessageStatus(id: string, status: AdminMessage["status"]): void {
  const messages = loadMessages()
  const idx = messages.findIndex((m) => m.id === id)
  if (idx !== -1) {
    messages[idx].status = status
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
  }
}

export function deleteMessage(id: string): void {
  const messages = loadMessages().filter((m) => m.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
}

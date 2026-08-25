import { AdminMessage } from "../types"

const BASE = "/api/admin/messages"

export async function loadMessages(): Promise<AdminMessage[]> {
  try {
    const res = await fetch(BASE)
    const data = await res.json()
    return data.data ?? []
  } catch {
    return []
  }
}

export async function saveMessage(
  msg: Omit<AdminMessage, "id" | "createdAt" | "status">
): Promise<AdminMessage | null> {
  try {
    const res = await fetch(BASE, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(msg),
    })
    const data = await res.json()
    return data.data?.[0] ?? null
  } catch {
    return null
  }
}

export async function updateMessageStatus(
  id: string,
  status: AdminMessage["status"]
): Promise<void> {
  try {
    await fetch(BASE, {
      method:  "PATCH",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ id, status }),
    })
  } catch {
    // silent — dashboard will still refresh
  }
}

export async function deleteMessage(id: string): Promise<void> {
  try {
    await fetch(BASE, {
      method:  "DELETE",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ id }),
    })
  } catch {
    // silent
  }
}

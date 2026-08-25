import type { NextApiRequest, NextApiResponse } from "next"
import { Redis } from "@upstash/redis"
import { AdminMessage } from "../../../types"

const redis = new Redis({
  url:   process.env.UPSTASH_REDIS_REST_URL  ?? "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN ?? "",
})

const KEY = "portfolio_admin_messages"

type ApiResponse = { ok: boolean; data?: AdminMessage[]; message?: string }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  try {
    // ── GET — list all messages ──────────────────────────────────────────────
    if (req.method === "GET") {
      const raw = await redis.get<AdminMessage[]>(KEY)
      return res.status(200).json({ ok: true, data: raw ?? [] })
    }

    // ── POST — save a new message ────────────────────────────────────────────
    if (req.method === "POST") {
      const body = req.body as Omit<AdminMessage, "id" | "createdAt" | "status">
      const newMsg: AdminMessage = {
        ...body,
        id:        `msg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        createdAt: new Date().toISOString(),
        status:    "new",
      }
      const existing = (await redis.get<AdminMessage[]>(KEY)) ?? []
      await redis.set(KEY, JSON.stringify([newMsg, ...existing]))
      return res.status(201).json({ ok: true, data: [newMsg] })
    }

    // ── PATCH — update a message status ──────────────────────────────────────
    if (req.method === "PATCH") {
      const { id, status } = req.body as { id: string; status: AdminMessage["status"] }
      const messages = (await redis.get<AdminMessage[]>(KEY)) ?? []
      const idx = messages.findIndex((m) => m.id === id)
      if (idx === -1) return res.status(404).json({ ok: false, message: "Message not found" })
      messages[idx].status = status
      await redis.set(KEY, JSON.stringify(messages))
      return res.status(200).json({ ok: true })
    }

    // ── DELETE — remove a message ────────────────────────────────────────────
    if (req.method === "DELETE") {
      const { id } = req.body as { id: string }
      const messages = (await redis.get<AdminMessage[]>(KEY)) ?? []
      const filtered = messages.filter((m) => m.id !== id)
      await redis.set(KEY, JSON.stringify(filtered))
      return res.status(200).json({ ok: true })
    }

    return res.status(405).json({ ok: false, message: "Method not allowed" })
  } catch (err) {
    console.error("[messages api]", err)
    return res.status(500).json({ ok: false, message: "Internal server error" })
  }
}

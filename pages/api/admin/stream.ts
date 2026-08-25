import type { NextApiRequest, NextApiResponse } from "next"
import { addClient, removeClient } from "../../../lib/sseClients"

// Required: disable Next.js body parsing and response buffering for SSE
export const config = { api: { bodyParser: false } }

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).end()
  }

  // ── SSE headers ────────────────────────────────────────────────────────────
  res.setHeader("Content-Type",  "text/event-stream")
  res.setHeader("Cache-Control", "no-cache, no-transform")
  res.setHeader("Connection",    "keep-alive")
  res.setHeader("X-Accel-Buffering", "no") // disable nginx buffering on Vercel
  res.flushHeaders()

  // Send an initial heartbeat so the client knows the connection is open
  res.write("event: connected\ndata: {}\n\n")

  // Register this response object so notifyClients() can write to it
  addClient(res)

  // Keep-alive heartbeat every 25s to prevent proxy timeouts
  const heartbeat = setInterval(() => {
    try {
      res.write("event: heartbeat\ndata: {}\n\n")
    } catch {
      clearInterval(heartbeat)
    }
  }, 25000)

  // Clean up when the client disconnects
  req.on("close", () => {
    clearInterval(heartbeat)
    removeClient(res)
    res.end()
  })
}

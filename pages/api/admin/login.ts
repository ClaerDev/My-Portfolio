import type { NextApiRequest, NextApiResponse } from "next"

type Body = { email: string; password: string }
type Response = { ok: boolean; message?: string }

export default function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, message: "Method not allowed" })
  }

  const { email, password } = req.body as Body

  if (!email || !password) {
    return res.status(400).json({ ok: false, message: "Email and password are required" })
  }

  const adminEmail    = process.env.ADMIN_EMAIL    ?? ""
  const adminPassword = process.env.ADMIN_PASSWORD ?? ""

  const emailMatch    = email.trim().toLowerCase() === adminEmail.toLowerCase()
  const passwordMatch = password === adminPassword

  if (emailMatch && passwordMatch) {
    return res.status(200).json({ ok: true })
  }

  return res.status(401).json({ ok: false, message: "Invalid email or password." })
}

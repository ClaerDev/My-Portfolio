import type { ServerResponse } from "http"

// Module-level singleton — shared across all API route invocations in the same
// Node.js process (Next.js keeps a single long-running process in dev & prod).
const clients = new Set<ServerResponse>()

export function addClient(res: ServerResponse) {
  clients.add(res)
}

export function removeClient(res: ServerResponse) {
  clients.delete(res)
}

export function notifyClients(event: string, data: unknown) {
  const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`
  Array.from(clients).forEach((res) => {
    try {
      res.write(payload)
    } catch {
      clients.delete(res)
    }
  })
}

// Simple reactive store using module-level variables + callbacks
// Replaces Apollo reactive vars without the Apollo dependency

type Listener<T> = (value: T) => void

function createVar<T>(initial: T) {
  let value = initial
  const listeners = new Set<Listener<T>>()

  function get(): T {
    return value
  }

  function set(newVal: T): void {
    value = newVal
    listeners.forEach((l) => l(newVal))
  }

  function subscribe(listener: Listener<T>): () => void {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }

  return { get, set, subscribe }
}

export const currentMenuVar = createVar<number>(1)
export const currentWorkVar = createVar<string>("All")
export const showMenuVar = createVar<boolean>(false)
export const currentWorkIdVar = createVar<string | null>(null)
export const currentBlogIdVar = createVar<string | null>(null)

export const adminAuthVar = createVar<boolean>(false)

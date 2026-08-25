import { useEffect, useState } from "react"

interface ReactiveVar<T> {
  get: () => T
  set: (val: T) => void
  subscribe: (listener: (val: T) => void) => () => void
}

export function useReactiveVar<T>(reactiveVar: ReactiveVar<T>): T {
  const [value, setValue] = useState<T>(reactiveVar.get())

  useEffect(() => {
    setValue(reactiveVar.get())
    const unsub = reactiveVar.subscribe((v) => setValue(v))
    return unsub
  }, [reactiveVar])

  return value
}

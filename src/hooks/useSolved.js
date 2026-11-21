import { useState, useEffect } from 'react'

// Tracks which problems are marked solved, persisted in localStorage.
const KEY = 'dsa-mastery-solved'

function load() {
  try {
    return new Set(JSON.parse(localStorage.getItem(KEY) || '[]'))
  } catch {
    return new Set()
  }
}

export function useSolved() {
  const [solved, setSolved] = useState(load)

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify([...solved]))
  }, [solved])

  const toggle = (id) =>
    setSolved((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  const has = (id) => solved.has(id)
  const count = solved.size

  return { solved, toggle, has, count }
}

import { useEffect, useState } from 'react'

const COLORS = ['#FF6B6B', '#FFB020', '#2EBD85', '#4D96FF', '#B983FF', '#FF7AC3']

// Tiny dependency-free confetti burst. Re-fires whenever `fire` increments.
export default function ConfettiBurst({ fire }) {
  const [pieces, setPieces] = useState([])

  useEffect(() => {
    if (!fire) return
    const list = Array.from({ length: 26 }, (_, i) => ({
      id: `${fire}-${i}`,
      x: 45 + Math.random() * 10,
      dx: (Math.random() - 0.5) * 260,
      dy: 140 + Math.random() * 220,
      rot: Math.random() * 900 - 450,
      color: COLORS[i % COLORS.length],
      delay: Math.random() * 0.12,
      size: 6 + Math.random() * 8,
      round: Math.random() > 0.45,
    }))
    setPieces(list)
    const t = setTimeout(() => setPieces([]), 1500)
    return () => clearTimeout(t)
  }, [fire])

  if (!pieces.length) return null
  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.id}
          style={{
            left: `${p.x}%`,
            top: '38%',
            width: p.size,
            height: p.round ? p.size : p.size * 0.45,
            background: p.color,
            borderRadius: p.round ? '50%' : 2,
            '--dx': `${p.dx}px`,
            '--dy': `${p.dy}px`,
            '--rot': `${p.rot}deg`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

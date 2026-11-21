import { Fragment, useEffect, useState } from 'react'

const SPEEDS = { slow: 1500, normal: 800, fast: 380 }

export default function Visualizer({ viz }) {
  const [i, setI] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState('normal')
  const total = viz.frames.length
  const frame = viz.frames[i]

  useEffect(() => {
    if (!playing) return
    if (i >= total - 1) {
      setPlaying(false)
      return
    }
    const t = setTimeout(() => setI((v) => v + 1), SPEEDS[speed])
    return () => clearTimeout(t)
  }, [playing, i, speed, total])

  const go = (n) => {
    setPlaying(false)
    setI(Math.min(total - 1, Math.max(0, n)))
  }

  const play = () => {
    if (i >= total - 1) {
      setI(0)
      setPlaying(true)
    } else {
      setPlaying(!playing)
    }
  }

  return (
    <div className="viz">
      <div className="viz-head">
        <span>👀 Step-by-step visualization</span>
        <span className="viz-step">{i + 1} / {total}</span>
      </div>
      <FrameView viz={viz} frame={frame} />
      <div className="viz-note" key={i}>{frame.note}</div>
      <div className="viz-controls">
        <button onClick={() => go(0)} title="Restart">⏮</button>
        <button onClick={() => go(i - 1)} title="Previous step">◀</button>
        <button className="viz-play" onClick={play} title="Play / pause">
          {playing ? '⏸' : '▶'}
        </button>
        <button onClick={() => go(i + 1)} title="Next step">⏭</button>
        <select value={speed} onChange={(e) => setSpeed(e.target.value)} title="Speed">
          <option value="slow">🐢 Slow</option>
          <option value="normal">▶ Normal</option>
          <option value="fast">🐇 Fast</option>
        </select>
        <div className="viz-legend">
          <span className="lg lg-active" /> compare
          <span className="lg lg-window" /> window/queue
          <span className="lg lg-found" /> answer
          <span className="lg lg-done" /> processed
        </div>
      </div>
    </div>
  )
}

function Chips({ chips }) {
  if (!chips?.length) return null
  return (
    <div className="viz-chips">
      {chips.map((c, idx) => (
        <span className="chip" key={idx}>
          <b>{c.label}:</b> <code>{c.value}</code>
        </span>
      ))}
    </div>
  )
}

function FrameView({ viz, frame }) {
  switch (viz.type) {
    case 'array': return <ArrayViz frame={frame} />
    case 'list': return <ListViz frame={frame} />
    case 'grid': return <GridViz frame={frame} />
    case 'tree': return <TreeViz frame={frame} />
    default: return null
  }
}

function ArrayViz({ frame }) {
  const vals = frame.values
  const numeric = vals.every((v) => typeof v === 'number')
  const max = numeric ? Math.max(...vals.map(Math.abs), 1) : 1
  return (
    <>
      <div className="viz-row">
        {vals.map((v, idx) => {
          const st = frame.states?.[idx] || ''
          const h = numeric ? 30 + (Math.abs(v) / max) * 72 : 58
          return (
            <div key={idx} className="viz-cell-col">
              <div className={`viz-bar ${st}`} style={{ height: h }}>
                <span>{v}</span>
              </div>
              <div className="viz-pointer">
                {(frame.pointers || []).filter((p) => p.index === idx).map((p) => p.label).join(' ')}
              </div>
            </div>
          )
        })}
      </div>
      <Chips chips={frame.chips} />
    </>
  )
}

function ListViz({ frame }) {
  const pointersAt = (idx) =>
    (frame.pointers || []).filter((p) => p.index === idx).map((p) => p.label).join(' ')
  return (
    <>
      <div className={`viz-row viz-list ${frame.vertical ? 'vertical' : ''}`}>
        {frame.nodes.map((nd, idx) => (
          <Fragment key={idx}>
            {idx > 0 && <span className="viz-arrow">{frame.vertical ? '↓' : '→'}</span>}
            <div className="viz-node-col">
              <div className="viz-pointer">{pointersAt(idx)}</div>
              <div className={`viz-node ${nd.state || ''}`}>{nd.v}</div>
            </div>
          </Fragment>
        ))}
        {frame.showNull && <span className="viz-arrow">→ ∅</span>}
      </div>
      <Chips chips={frame.chips} />
    </>
  )
}

function GridViz({ frame }) {
  const cols = frame.rows[0]?.length || 0
  return (
    <>
      <div
        className="viz-grid"
        style={{ gridTemplateColumns: `auto repeat(${cols}, minmax(34px, 44px))` }}
      >
        {frame.colLabels && (
          <>
            <div />
            {frame.colLabels.map((l, idx) => (
              <div key={`c${idx}`} className="viz-glabel">{l}</div>
            ))}
          </>
        )}
        {frame.rows.map((row, r) => (
          <Fragment key={r}>
            {frame.rowLabels && <div className="viz-glabel">{frame.rowLabels[r]}</div>}
            {row.map((cell, c) => (
              <div key={`${r}-${c}`} className={`viz-gcell ${cell.state || ''}`}>
                {cell.v}
              </div>
            ))}
          </Fragment>
        ))}
      </div>
      <Chips chips={frame.chips} />
    </>
  )
}

const CW = 86
const CH = 84
const PAD = 34

function TreeViz({ frame }) {
  const maxX = Math.max(...frame.nodes.map((n) => n.x))
  const maxY = Math.max(...frame.nodes.map((n) => n.y))
  const pos = (n) => ({ x: PAD + n.x * CW, y: PAD + n.y * CH })
  const byId = Object.fromEntries(frame.nodes.map((n) => [n.id, n]))
  return (
    <>
      <div
        className="viz-tree"
        style={{ width: PAD * 2 + maxX * CW, height: PAD * 2 + maxY * CH, margin: '0 auto' }}
      >
        <svg width="100%" height="100%">
          {frame.edges.map((e, idx) => {
            const a = pos(byId[e.from])
            const b = pos(byId[e.to])
            return (
              <line
                key={idx}
                x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                className={`viz-edge ${e.state || ''}`}
              />
            )
          })}
        </svg>
        {frame.nodes.map((n) => {
          const p = pos(n)
          return (
            <div
              key={n.id}
              className={`viz-tnode ${n.state || ''}`}
              style={{ left: p.x - 24, top: p.y - 24 }}
            >
              {n.label}
            </div>
          )
        })}
      </div>
      <Chips chips={frame.chips} />
    </>
  )
}

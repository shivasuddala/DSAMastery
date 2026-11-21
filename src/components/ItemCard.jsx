import { useState } from 'react'
import CodeBlock from './CodeBlock.jsx'
import Visualizer from './Visualizer.jsx'
import ConfettiBurst from './ConfettiBurst.jsx'
import { visualizations } from '../data/visualizations.js'

export default function ItemCard({ item, topicId, order, tc, solved, onToggle }) {
  const [open, setOpen] = useState(false)
  const [fire, setFire] = useState(0)
  const viz = visualizations[`${topicId}/${item.id}`]

  const handleToggle = () => {
    if (!solved) setFire((f) => f + 1)
    onToggle()
  }

  return (
    <article
      className={`item-card ${open ? 'is-open' : ''} ${solved ? 'is-solved' : ''}`}
      style={{ '--tc': tc }}
    >
      <ConfettiBurst fire={fire} />
      <div className="item-head">
        <button className="item-toggle" onClick={() => setOpen(!open)}>
          <span className="item-num">{String(order).padStart(2, '0')}</span>
          <span className={`chevron ${open ? 'open' : ''}`}>▸</span>
          <span className="item-title">{item.title}</span>
          {viz && <span className="viz-dot" title="Has animation">🎬</span>}
        </button>
        <div className="item-meta">
          <span className={`badge badge-${(item.difficulty || '').toLowerCase()}`}>
            {item.difficulty}
          </span>
          {item.complexity && (
            <span className="complexity">
              <span className="cx">⏱</span> {item.complexity.time}
              <span className="cx-sep">·</span>
              <span className="cx">💾</span> {item.complexity.space}
            </span>
          )}
          <button
            className={`solve-btn ${solved ? 'solved' : ''}`}
            onClick={handleToggle}
            title={solved ? 'Mark as unsolved' : 'Mark as solved 🎉'}
          >
            {solved ? '✓ Solved' : '🎉 Mark solved'}
          </button>
        </div>
      </div>
      {open && (
        <div className="item-body">
          <p className="item-desc">{item.description}</p>
          {item.tags?.length > 0 && (
            <div className="tags">
              {item.tags.map((t) => (
                <span key={t} className="tag">#{t}</span>
              ))}
            </div>
          )}
          {viz && <Visualizer viz={viz} />}
          <CodeBlock code={item.code} />
        </div>
      )}
    </article>
  )
}

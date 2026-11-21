import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { topics, topicColor } from '../data/topics.js'
import { visualizations } from '../data/visualizations.js'
import { useSolved } from '../hooks/useSolved.js'

const DIFF = { Easy: 'd-easy', Medium: 'd-medium', Hard: 'd-hard' }

const DOODLES = [
  { ch: '✳', x: '-6%', y: '-14%', r: -14, c: 'var(--red)', d: 0 },
  { ch: '✦', x: '104%', y: '-6%', r: 10, c: 'var(--blue)', d: 0.7 },
  { ch: '✧', x: '100%', y: '96%', r: 18, c: 'var(--green)', d: 1.3 },
  { ch: '✳', x: '-8%', y: '104%', r: -8, c: 'var(--purple)', d: 1.9 },
]

export default function Home() {
  const [query, setQuery] = useState('')
  const { has, count } = useSolved()

  const totalItems = topics.reduce((sum, t) => sum + t.items.length, 0)
  const vizCount = Object.keys(visualizations).length
  const pct = totalItems ? Math.round((count / totalItems) * 100) : 0

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return topics
    return topics
      .map((t) => ({
        ...t,
        items: t.items.filter(
          (item) =>
            item.title.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q) ||
            item.tags?.some((tag) => tag.toLowerCase().includes(q)),
        ),
      }))
      .filter((t) => t.items.length > 0)
  }, [query])

  // Problem of the day — rotates daily, stable across reloads
  const allItems = useMemo(
    () =>
      topics.flatMap((t) =>
        t.items.map((it) => ({ ...it, topicId: t.id, topicTitle: t.title, icon: t.icon })),
      ),
    [],
  )
  const dayPick = allItems[Math.floor(Date.now() / 86_400_000) % allItems.length]

  return (
    <>
      <section className="hero">
        <div className="hero-left">
          <p className="hero-kicker">A visual field guide to</p>
          <h1 className="hero-title">
            Data Structures<br />&amp; <span className="marker">Algorithms</span>
          </h1>
          <p className="hero-sub">
            Every core pattern, <b>animated step by step</b> and implemented in four languages.
            No fluff — just what gets you hired.
          </p>
          <div className="hero-stats">
            <span className="stamp"><b>{topics.length}</b> topics</span>
            <span className="stamp"><b>{totalItems}</b> problems</span>
            <span className="stamp"><b>{vizCount}</b> animations</span>
            <span className="stamp"><b>4</b> languages</span>
          </div>
          <div className="hero-progress">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${pct}%` }} />
            </div>
            <span className="hero-progress-label"><b>{count}</b> / {totalItems} solved</span>
          </div>
          <p className="hero-hint">
            Tip: open any problem and press <b>▶</b> on its animation to watch it run.
          </p>
        </div>

        <div className="hero-right">
          <span className="doodle" style={{ '--x': DOODLES[0].x, '--y': DOODLES[0].y, '--r': `${DOODLES[0].r}deg`, color: DOODLES[0].c, animationDelay: `${DOODLES[0].d}s` }}>{DOODLES[0].ch}</span>
          <span className="doodle" style={{ '--x': DOODLES[1].x, '--y': DOODLES[1].y, '--r': `${DOODLES[1].r}deg`, color: DOODLES[1].c, animationDelay: `${DOODLES[1].d}s` }}>{DOODLES[1].ch}</span>
          <span className="doodle" style={{ '--x': DOODLES[2].x, '--y': DOODLES[2].y, '--r': `${DOODLES[2].r}deg`, color: DOODLES[2].c, animationDelay: `${DOODLES[2].d}s` }}>{DOODLES[2].ch}</span>
          <span className="doodle" style={{ '--x': DOODLES[3].x, '--y': DOODLES[3].y, '--r': `${DOODLES[3].r}deg`, color: DOODLES[3].c, animationDelay: `${DOODLES[3].d}s` }}>{DOODLES[3].ch}</span>

          <Link
            to={`/topic/${dayPick.topicId}`}
            className="note-card"
            style={{ '--tc': topicColor(dayPick.topicId) }}
          >
            <span className="note-pin" aria-hidden="true" />
            <span className="note-kicker">Today&rsquo;s pick {dayPick.icon}</span>
            <span className="note-title">{dayPick.title}</span>
            <span className="note-meta">
              {dayPick.topicTitle} · {dayPick.difficulty}
            </span>
            <span className="note-link">Open problem →</span>
          </Link>
        </div>
      </section>

      <div className="search-wrap">
        <span className="search-ico">⌕</span>
        <input
          className="search"
          type="search"
          placeholder="Search problems or tags — try “sliding window”, “heap”, “dp”…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button className="search-clear" onClick={() => setQuery('')} aria-label="Clear search">✕</button>
        )}
      </div>

      <section className="index-list">
        <div className="index-head" aria-hidden="true">
          <span className="index-col">№</span>
          <span className="index-col-mid">Topic</span>
          <span className="index-col-r">Problems</span>
        </div>
        {filtered.map((topic, idx) => {
          const done = topic.items.filter((i) => has(`${topic.id}/${i.id}`)).length
          return (
            <Link
              key={topic.id}
              to={`/topic/${topic.id}`}
              className="index-row"
              style={{ '--tc': topicColor(topic.id) }}
            >
              <span className="index-num">{String(idx + 1).padStart(2, '0')}</span>
              <span className="index-sticker">{topic.icon}</span>
              <span className="index-name">
                <b>{topic.title}</b>
                <small>{topic.description}</small>
              </span>
              <span className="index-meta">
                <span className="index-dots">
                  {topic.items.map((item) => (
                    <span
                      key={item.id}
                      className={`mini-badge ${DIFF[item.difficulty] || ''} ${has(`${topic.id}/${item.id}`) ? 'mini-solved' : ''}`}
                      title={`${item.title} — ${item.difficulty}`}
                    />
                  ))}
                </span>
                <span className="index-count">{done}/{topic.items.length}</span>
                <span className="index-arrow">→</span>
              </span>
            </Link>
          )
        })}
        {filtered.length === 0 && (
          <p className="no-results">Nothing matches “{query}” — try another keyword.</p>
        )}
      </section>
    </>
  )
}

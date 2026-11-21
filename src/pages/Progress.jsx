import { Link } from 'react-router-dom'
import { topics } from '../data/topics.js'
import { useSolved } from '../hooks/useSolved.js'

export default function Progress() {
  const { solved, count } = useSolved()
  const totalItems = topics.reduce((sum, t) => sum + t.items.length, 0)
  const pct = totalItems ? Math.round((count / totalItems) * 100) : 0

  return (
    <>
      <header className="topic-header">
        <span className="topic-icon-lg">🏆</span>
        <div>
          <h1>My Progress</h1>
          <p>Everything is stored locally in your browser — keep going!</p>
        </div>
      </header>

      <div className="progress-big">
        <div className="progress-ring" style={{ '--pct': pct }}>
          <span>{pct}%</span>
        </div>
        <div className="progress-stats">
          <div className="stat">
            <strong>{count}</strong> solved
          </div>
          <div className="stat">
            <strong>{totalItems - count}</strong> remaining
          </div>
          <div className="stat">
            <strong>{totalItems}</strong> total
          </div>
        </div>
      </div>

      <div className="topic-grid">
        {topics.map((topic) => {
          const done = topic.items.filter((i) => solved.has(`${topic.id}/${i.id}`)).length
          return (
            <Link key={topic.id} to={`/topic/${topic.id}`} className="topic-card">
              <div className="topic-card-head">
                <span className="topic-icon">{topic.icon}</span>
                <h2>{topic.title}</h2>
              </div>
              <div className="progress-line">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${(done / topic.items.length) * 100}%` }}
                  />
                </div>
                <span>{done}/{topic.items.length}</span>
              </div>
            </Link>
          )
        })}
      </div>
    </>
  )
}

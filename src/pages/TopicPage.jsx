import { useParams, Link } from 'react-router-dom'
import { topics, topicColor } from '../data/topics.js'
import ItemCard from '../components/ItemCard.jsx'
import { useSolved } from '../hooks/useSolved.js'

export default function TopicPage() {
  const { topicId } = useParams()
  const topic = topics.find((t) => t.id === topicId)
  const { has, toggle } = useSolved()

  if (!topic) {
    return (
      <div className="not-found">
        <h1>Topic not found</h1>
        <Link to="/">← Back to all topics</Link>
      </div>
    )
  }

  const idx = topics.findIndex((t) => t.id === topicId)
  const prev = topics[idx - 1]
  const next = topics[idx + 1]
  const done = topic.items.filter((it) => has(`${topic.id}/${it.id}`)).length

  return (
    <>
      <nav className="breadcrumbs">
        <Link to="/">Topics</Link> <span>/</span> <span>{topic.title}</span>
      </nav>

      <header className="topic-header" style={{ '--tc': topicColor(topic.id) }}>
        <span className="topic-sticker-lg">{topic.icon}</span>
        <div>
          <h1>{topic.title}</h1>
          <p>{topic.description}</p>
          <p className="topic-stats">
            <span className="stamp stamp-sm"><b>{done}</b>/{topic.items.length} solved</span>
          </p>
        </div>
      </header>

      <div className="item-list">
        {topic.items.map((item, i) => (
          <ItemCard
            key={item.id}
            item={item}
            topicId={topic.id}
            order={i + 1}
            tc={topicColor(topic.id)}
            solved={has(`${topic.id}/${item.id}`)}
            onToggle={() => toggle(`${topic.id}/${item.id}`)}
          />
        ))}
      </div>

      <nav className="pager">
        {prev ? (
          <Link to={`/topic/${prev.id}`} className="pager-link">
            ← {prev.icon} {prev.title}
          </Link>
        ) : <span />}
        {next ? (
          <Link to={`/topic/${next.id}`} className="pager-link">
            {next.icon} {next.title} →
          </Link>
        ) : <span />}
      </nav>
    </>
  )
}

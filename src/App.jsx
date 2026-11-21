import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import TopicPage from './pages/TopicPage.jsx'
import Reference from './pages/Reference.jsx'
import Progress from './pages/Progress.jsx'
import { topics } from './data/topics.js'

const EXTRA = ['TWO SUM', 'BINARY SEARCH', 'SLIDING WINDOW', 'DYNAMIC PROGRAMMING', 'GRAPH TRAVERSAL', 'FLOYD\u2019S HARE', 'BIG-O EVERYTHING']

export default function App() {
  const ticker = [...topics.map((t) => t.title.toUpperCase()), ...EXTRA]
  return (
    <div className="app">
      <div className="grain" aria-hidden="true" />
      <Header />
      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[0, 1].map((seq) => (
            <span className="ticker-seq" key={seq}>
              {ticker.map((t, j) => (
                <b key={j}>{t}&nbsp;&nbsp;✦&nbsp;&nbsp;</b>
              ))}
            </span>
          ))}
        </div>
      </div>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/topic/:topicId" element={<TopicPage />} />
          <Route path="/reference" element={<Reference />} />
          <Route path="/progress" element={<Progress />} />
        </Routes>
      </main>
      <footer className="footer">
        <span><b>DSA Mastery</b> — a visual field guide</span>
        <span className="footer-sep">·</span>
        <span>React + Vite, free on <b>GitHub Pages</b></span>
        <span className="footer-sep">·</span>
        <span className="footer-beat">now go solve something <b className="beat">⚡</b></span>
      </footer>
    </div>
  )
}

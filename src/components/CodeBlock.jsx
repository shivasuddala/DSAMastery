import { useState } from 'react'

const LANG_TABS = [
  { id: 'cpp', label: 'C++', icon: '🔧' },
  { id: 'java', label: 'Java', icon: '☕' },
  { id: 'python', label: 'Python', icon: '🐍' },
  { id: 'javascript', label: 'JavaScript', icon: '🌐' },
]

export default function CodeBlock({ code }) {
  const available = LANG_TABS.filter((l) => code[l.id])
  const [active, setActive] = useState(available[0]?.id)
  const [copied, setCopied] = useState(false)

  if (!available.length) return null
  const current = available.find((l) => l.id === active) || available[0]

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code[current.id])
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className="code-block">
      <div className="code-tabs">
        {available.map((lang) => (
          <button
            key={lang.id}
            className={`code-tab ${lang.id === current.id ? 'active' : ''}`}
            onClick={() => setActive(lang.id)}
          >
            <span aria-hidden>{lang.icon}</span> {lang.label}
          </button>
        ))}
        <button className="copy-btn" onClick={copy}>
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <pre><code>{code[current.id]}</code></pre>
    </div>
  )
}

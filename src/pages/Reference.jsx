import { complexityGuide } from '../data/topics.js'

const growth = [1, 4, 8, 16]

export default function Reference() {
  return (
    <>
      <header className="topic-header">
        <span className="topic-icon-lg">📈</span>
        <div>
          <h1>Big-O Reference</h1>
          <p>How fast is fast enough? Know these before your interview.</p>
        </div>
      </header>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Complexity</th>
              <th>Name</th>
              <th>Typical examples</th>
              {growth.map((n) => (
                <th key={n} title={`n = ${n}`}>n={n}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {complexityGuide.map((row) => (
              <tr key={row.name}>
                <td><code>{row.name}</code></td>
                <td>{row.label}</td>
                <td>{row.examples}</td>
                {growth.map((n) => {
                  let v
                  if (row.name === 'O(1)') v = 1
                  else if (row.name === 'O(log n)') v = Math.log2(n).toFixed(1)
                  else if (row.name === 'O(n)') v = n
                  else if (row.name === 'O(n log n)') v = (n * Math.log2(n)).toFixed(0)
                  else if (row.name === 'O(n²)') v = n * n
                  else if (row.name === 'O(2ⁿ)') v = Math.pow(2, n)
                  else v = factorial(n)
                  return (
                    <td key={n} className="num">{format(v)}</td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="tips">
        <h2>Interview rules of thumb</h2>
        <ul>
          <li><strong>n ≤ 20</strong> → O(2ⁿ) backtracking is fine.</li>
          <li><strong>n ≤ 500</strong> → O(n³) is acceptable.</li>
          <li><strong>n ≤ 10⁴–10⁵</strong> → aim for O(n log n) or O(n).</li>
          <li><strong>n ≤ 10⁹</strong> → O(log n) or O(1) only.</li>
          <li>Sorted input or "find in O(log n)" → <strong>binary search</strong>.</li>
          <li>"Top k" / "k closest" → <strong>heap</strong> of size k.</li>
          <li>"Count subarrays with…" → <strong>hash map + prefix sums</strong>.</li>
        </ul>
      </section>
    </>
  )
}

function factorial(n) {
  let r = 1
  for (let i = 2; i <= n; i++) r *= i
  return r
}

function format(v) {
  if (v >= 1000) return v.toExponential(1).replace('e+', 'e')
  return String(v)
}

import { NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <NavLink to="/" className="brand">
          <span className="brand-stamp">✳</span>
          <span className="brand-text">DSA Mastery</span>
          <span className="brand-sub">field guide</span>
        </NavLink>
        <nav className="nav">
          <NavLink to="/" end>Index</NavLink>
          <NavLink to="/reference">Big-O</NavLink>
          <NavLink to="/progress">Progress</NavLink>
        </nav>
      </div>
    </header>
  )
}

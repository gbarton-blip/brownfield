import { Link } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/dashboard', text: 'Dashboard' },
  { to: '/billing', text: 'Billing' },
  { to: '/team', text: 'Team' },
  { to: '/integrations', text: 'Integrations' },
  { to: '/empty', text: 'Reports' },
  { to: '/settings', text: 'Settings' },
]

/** Global app chrome — same links on every screen. */
export default function NavBar({ brand }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E5E7EB] bg-white px-6 py-4">
      <Link to="/dashboard" className="no-underline">
        <div className="text-[22px] font-bold text-[#2563EB]">{brand}</div>
      </Link>
      <nav className="flex flex-wrap gap-4">
        {NAV_LINKS.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="text-[15px] font-medium text-[#3B82F6] no-underline hover:underline"
          >
            {item.text}
          </Link>
        ))}
      </nav>
    </header>
  )
}

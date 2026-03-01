import { Link } from '@tanstack/react-router'

const navItems = [
  { to: '/platform', label: 'Platform' },
  { to: '/docs', label: 'Docs' },
] as const

type SiteNavProps = {
  variant?: 'default' | 'hero'
}

export function SiteNav({ variant = 'default' }: SiteNavProps) {
  const headerClass =
    variant === 'hero' ? 'site-header site-header-hero' : 'site-header'

  return (
    <header className={headerClass}>
      <div className="site-container site-header-row">
        <Link className="brand-mark" to="/">
          keel
        </Link>
        <nav className="site-nav">
          {navItems.map((item) => (
            <Link
              activeOptions={{ exact: false }}
              activeProps={{ className: 'site-nav-link is-active' }}
              className="site-nav-link"
              key={item.to}
              to={item.to}
            >
              {item.label}
            </Link>
          ))}
          <a
            className="site-nav-link"
            href="https://github.com"
            rel="noreferrer"
            target="_blank"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  )
}

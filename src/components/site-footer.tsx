import { Link } from '@tanstack/react-router'

const quickLinks = [
  { to: '/', label: 'Landing' },
  { to: '/platform', label: 'Platform' },
  { to: '/docs', label: 'Docs' },
] as const

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-shell">
        <div className="footer-grid">
          <div>
            <p className="footer-kicker">KEEL_INSTRUMENTS</p>
            <p className="footer-brand">Dark Fleet Interface</p>
            <p className="footer-copy">
              Apple-grade clarity with tactile Teenage Engineering controls for
              autonomous SDLC command.
            </p>
          </div>
          <div>
            <p className="footer-heading">Navigation</p>
            <div className="footer-links">
              {quickLinks.map((item) => (
                <Link className="footer-link" key={item.to} to={item.to}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="footer-heading">Build Track</p>
            <div className="footer-tags">
              <span className="footer-tag">PLAN</span>
              <span className="footer-tag">BUILD</span>
              <span className="footer-tag">REVIEW</span>
              <span className="footer-tag">SHIP</span>
            </div>
          </div>
        </div>
        <div className="footer-rail">
          <span>CALIBRATED FOR AUTONOMOUS SDLC</span>
          <span>{new Date().getFullYear()} KEEL</span>
        </div>
      </div>
    </footer>
  )
}

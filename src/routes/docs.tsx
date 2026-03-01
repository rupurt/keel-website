import { createFileRoute, Link } from '@tanstack/react-router'
import { ModalPreview } from '~/components/instrument-primitives'
import { SiteNav } from '~/components/site-nav'

const quickstart = [
  'curl -sSL https://www.keel.dev/install | sh',
  'keel init --template tanstack',
  'keel ship --with review,qa',
] as const

export const Route = createFileRoute('/docs')({
  head: () => ({
    meta: [
      { title: 'Docs | Keel' },
      {
        name: 'description',
        content: 'Documentation placeholder and quickstart for Keel.',
      },
    ],
  }),
  component: DocsPage,
})

function DocsPage() {
  return (
    <>
      <SiteNav />
      <section className="subpage-hero">
        <div className="site-container">
          <p className="hero-kicker">Docs</p>
          <h1>Documentation Placeholder</h1>
          <p className="section-lead">
            The full docs IA is coming next. For now, this page anchors the
            nav, onboarding flow, and modal interaction style.
          </p>
        </div>
      </section>

      <section className="page-section">
        <div className="site-container docs-grid">
          <article className="placeholder-card">
            <p className="placeholder-kicker">Quickstart</p>
            <h2>Bootstrap in 3 commands</h2>
            <div className="code-stack">
              {quickstart.map((line) => (
                <code key={line}>{line}</code>
              ))}
            </div>
            <div className="hero-actions">
              <Link className="keel-btn keel-btn-primary" to="/platform">
                Platform Overview
              </Link>
            </div>
          </article>
          <ModalPreview
            body="Use this modal pattern for install prompts, confirmations, and in-product tutorials."
            ctaLabel="Run Installer"
            title="INSTALL_PROMPT"
          />
        </div>
      </section>
    </>
  )
}

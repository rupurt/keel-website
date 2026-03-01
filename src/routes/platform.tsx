import { createFileRoute, Link } from '@tanstack/react-router'
import { ConsoleRack } from '~/components/instrument-primitives'
import { SiteNav } from '~/components/site-nav'

export const Route = createFileRoute('/platform')({
  head: () => ({
    meta: [
      { title: 'Platform | Keel' },
      {
        name: 'description',
        content: 'Platform overview and capabilities for Keel.',
      },
    ],
  }),
  component: PlatformPage,
})

function PlatformPage() {
  return (
    <>
      <SiteNav />
      <section className="subpage-hero">
        <div className="site-container">
          <p className="hero-kicker">Platform</p>
          <h1>Agent Orchestration Platform</h1>
          <p className="section-lead">
            Placeholder page for deep capability docs, control planes, and team
            workflow integrations.
          </p>
          <div className="hero-actions">
            <Link className="keel-btn keel-btn-primary" to="/docs">
              Explore Docs
            </Link>
            <Link className="keel-btn keel-btn-secondary" to="/">
              Back to Landing
            </Link>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="site-container">
          <div className="placeholder-grid">
            <article className="placeholder-card">
              <p className="placeholder-kicker">Capability</p>
              <h2>Fleet Scheduler</h2>
              <p>
                Route specialized agents to the right task while preserving
                shared context and guardrails.
              </p>
            </article>
            <article className="placeholder-card">
              <p className="placeholder-kicker">Capability</p>
              <h2>Quality Gates</h2>
              <p>
                Turn review standards into reusable policy gates for every ship
                event.
              </p>
            </article>
            <article className="placeholder-card">
              <p className="placeholder-kicker">Capability</p>
              <h2>Runtime Telemetry</h2>
              <p>
                Track drift, confidence, and system state from prompt to
                production.
              </p>
            </article>
          </div>
          <ConsoleRack />
        </div>
      </section>
    </>
  )
}

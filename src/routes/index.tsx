import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { ConsoleRack, TerrainInstrument } from '~/components/instrument-primitives'
import { LandingModals } from '~/components/landing-modals'
import { SiteNav } from '~/components/site-nav'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Keel | Autonomous SDLC Fleet' },
      {
        name: 'description',
        content:
          'Keel is a dark, instrument-grade control surface for autonomous software delivery.',
      },
    ],
  }),
  component: HomePage,
})

function HomePage() {
  const [activeModal, setActiveModal] = useState<'install' | 'demo' | null>(null)

  return (
    <>
      <section className="landing-hero">
        <div className="landing-hero-bg" />
        <SiteNav variant="hero" />
        <div className="site-container hero-grid">
          <div className="hero-copy">
            <p className="hero-kicker">Ship Faster. Drift Less.</p>
            <h1>Command Your Fleet of Autonomous Agents</h1>
            <p>
              Harness intelligent agents, minimize drift, and confidently steer
              your SDLC.
            </p>
            <div className="hero-actions">
              <button
                className="keel-btn keel-btn-primary"
                onClick={() => setActiveModal('install')}
                type="button"
              >
                Download Keel CLI
                <svg
                  aria-hidden="true"
                  className="cta-icon cta-icon-download"
                  fill="none"
                  height="18"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="18"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
              </button>
              <button
                className="keel-btn keel-btn-secondary"
                onClick={() => setActiveModal('demo')}
                type="button"
              >
                Watch Demo
                <svg
                  aria-hidden="true"
                  className="cta-icon cta-icon-play"
                  fill="none"
                  height="18"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="18"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      <LandingModals active={activeModal} onClose={() => setActiveModal(null)} />

      <section className="page-section">
        <div className="site-container">
          <h2 className="section-title">Orchestrate Multi-Agent Workflows</h2>
          <p className="section-lead">
            Coordinate planning, coding, and validation in one deterministic
            rack built to feel precise, calm, and mechanical.
          </p>
          <ConsoleRack />
        </div>
      </section>

      <section className="page-section">
        <div className="site-container">
          <h2 className="section-title">Visualize Your SDLC Terrain</h2>
          <p className="section-lead">
            Read contour-style progress, route around risk pockets, and home in
            on the shipping target.
          </p>
          <TerrainInstrument />
        </div>
      </section>
    </>
  )
}

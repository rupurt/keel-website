import { createFileRoute } from '@tanstack/react-router'
import {
  ConsoleRack,
  ModalPreview,
  TerrainInstrument,
} from '~/components/instrument-primitives'
import { SiteNav } from '~/components/site-nav'

const palette = [
  { name: 'BG 980', token: '--color-bg-980', hex: '#030b14' },
  { name: 'BG 950', token: '--color-bg-950', hex: '#071423' },
  { name: 'PANEL 900', token: '--color-panel-900', hex: '#0f2033' },
  { name: 'PANEL 850', token: '--color-panel-850', hex: '#162d45' },
  { name: 'TEXT 50', token: '--color-ink-50', hex: '#eaf0f9' },
  { name: 'TEXT 300', token: '--color-ink-300', hex: '#9fb3cb' },
  { name: 'PASTEL SKY', token: '--color-pastel-sky', hex: '#98beff' },
  { name: 'PASTEL MINT', token: '--color-pastel-mint', hex: '#8de3d0' },
  { name: 'PASTEL PEACH', token: '--color-pastel-peach', hex: '#ffbc9b' },
  { name: 'SIGNAL ORANGE', token: '--color-signal', hex: '#ff7542' },
  { name: 'INSTRUMENT FACE', token: '--color-instrument-face', hex: '#ebedf2' },
  { name: 'INSTRUMENT WASH', token: '--color-instrument-wash', hex: '#c9d2e1' },
] as const

const typefaces = [
  {
    label: 'Display',
    className: 'font-display',
    sample: 'Command Your Fleet of Autonomous Agents',
    note: 'Use for hero headlines and section titles.',
  },
  {
    label: 'Body',
    className: 'font-body',
    sample:
      'Keel coordinates planning, coding, and review agents in one deterministic pipeline.',
    note: 'Use for paragraphs, labels, and navigation.',
  },
  {
    label: 'Mono',
    className: 'font-mono',
    sample: 'SLOT_01 PLAN :: GOAL_LOCK 83.4%',
    note: 'Use for telemetry, status chips, and command snippets.',
  },
] as const

export const Route = createFileRoute('/style')({
  head: () => ({
    meta: [
      { title: 'Style Guide | Keel' },
      {
        name: 'description',
        content:
          'Formalized dark design system: typefaces, color palette, buttons, modals, and instrument components.',
      },
    ],
  }),
  component: StyleGuidePage,
})

function StyleGuidePage() {
  return (
    <>
      <SiteNav />
      <section className="subpage-hero">
        <div className="site-container">
          <p className="hero-kicker">Style Guide</p>
          <h1>Keel Dark Instrument System</h1>
          <p className="section-lead">
            Canonical tokens and component behaviors for Apple-grade clarity +
            Teenage Engineering tactility.
          </p>
        </div>
      </section>

      <section className="page-section">
        <div className="site-container">
          <h2 className="section-title">Typefaces</h2>
          <div className="type-grid">
            {typefaces.map((face) => (
              <article className="type-card" key={face.label}>
                <p className="placeholder-kicker">{face.label}</p>
                <p className={face.className}>{face.sample}</p>
                <p className="type-note">{face.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="site-container">
          <h2 className="section-title">Color Palette</h2>
          <div className="palette-grid">
            {palette.map((item) => (
              <article className="swatch" key={item.token}>
                <span
                  aria-hidden="true"
                  className="swatch-color"
                  style={{ backgroundColor: `var(${item.token})` }}
                />
                <p className="swatch-name">{item.name}</p>
                <p className="swatch-token">{item.token}</p>
                <p className="swatch-hex">{item.hex}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="site-container">
          <h2 className="section-title">Buttons</h2>
          <div className="button-row">
            <button className="keel-btn keel-btn-primary" type="button">
              Primary Action
            </button>
            <button className="keel-btn keel-btn-secondary" type="button">
              Secondary Action
            </button>
            <button className="keel-btn keel-btn-ghost" type="button">
              Ghost Action
            </button>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="site-container docs-grid">
          <ModalPreview
            body="Modal chassis uses the same instrument rail, shadow logic, and tactile buttons as the core product controls."
            ctaLabel="Confirm Action"
            title="CONFIRM_SEQUENCE"
          />
          <article className="placeholder-card">
            <p className="placeholder-kicker">Modal Specs</p>
            <h2>Interaction Notes</h2>
            <ul className="spec-list">
              <li>Instrument rail on top for machine context.</li>
              <li>Raised frame with subtle asymmetric depth shadow.</li>
              <li>Primary + ghost action pairing only.</li>
              <li>Mono telemetry labels for all system status.</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="page-section">
        <div className="site-container">
          <h2 className="section-title">Instrument Components</h2>
          <p className="section-lead">
            Core Apple/Teenage hybrids used across landing and product pages.
          </p>
          <div className="instrument-stack">
            <ConsoleRack />
            <TerrainInstrument />
          </div>
        </div>
      </section>
    </>
  )
}

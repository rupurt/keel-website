import { useEffect, useRef, type MouseEvent } from 'react'

const rackModules = [
  {
    id: 'SLOT_01',
    label: 'PLAN',
    active: true,
    status: '> OUTLINE SYSTEM PROMPT',
    level: 0.78,
  },
  {
    id: 'SLOT_02',
    label: 'BUILD',
    active: false,
    status: '> GENERATE UI ROUTES',
    level: 0.54,
  },
  {
    id: 'SLOT_03',
    label: 'REVIEW',
    active: false,
    status: '> RUN QA CHECKLIST',
    level: 0.36,
  },
  {
    id: 'SLOT_04',
    label: 'SHIP',
    active: false,
    status: '> DEPLOY PREVIEW',
    level: 0.22,
  },
] as const

const terrainPeaks = [
  { u: 0.18, v: 0.26, r: 0.18, rings: 9, stretchX: 1.08, stretchY: 0.94, phase: 0.3, alpha: 1.0 },
  { u: 0.35, v: 0.74, r: 0.17, rings: 8, stretchX: 1.02, stretchY: 1.0, phase: 1.4, alpha: 0.96 },
  { u: 0.63, v: 0.44, r: 0.15, rings: 8, stretchX: 0.82, stretchY: 1.14, phase: 2.1, alpha: 0.94 },
  { u: 0.84, v: 0.2, r: 0.11, rings: 6, stretchX: 1.0, stretchY: 0.9, phase: 2.8, alpha: 0.9 },
  { u: 0.82, v: 0.77, r: 0.12, rings: 6, stretchX: 1.0, stretchY: 0.95, phase: 3.6, alpha: 0.9 },
] as const

export function ConsoleRack() {
  return (
    <div className="instrument-shell">
      <div className="instrument-rail">
        <span>ORCHESTRATION_RACK</span>
        <span className="instrument-rail-muted">LIVE</span>
      </div>
      <div className="rack-grid">
        {rackModules.map((module) => (
          <article
            className={module.active ? 'rack-module is-active' : 'rack-module'}
            key={module.id}
          >
            <p className="rack-module-label">
              {module.id}: {module.label}
            </p>
            <div className="rack-screen">
              <p>{module.status}</p>
              <div className="rack-meter">
                <span style={{ width: `${module.level * 100}%` }} />
              </div>
            </div>
            <div className="rack-toggle">
              <span />
            </div>
            <div className="rack-led" />
          </article>
        ))}
      </div>
      <div className="instrument-screws" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  )
}

export function TerrainInstrument() {
  const displayRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const crosshairRef = useRef<HTMLDivElement>(null)
  const coordsRef = useRef<HTMLSpanElement>(null)
  const goalRef = useRef<HTMLDivElement>(null)
  const goalStatusRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const display = displayRef.current

    if (!canvas || !display) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const drawTerrain = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = display.getBoundingClientRect()
      canvas.width = Math.max(1, Math.floor(rect.width * dpr))
      canvas.height = Math.max(1, Math.floor(rect.height * dpr))

      const width = canvas.width
      const height = canvas.height

      ctx.clearRect(0, 0, width, height)

      terrainPeaks.forEach((peak) => {
        const cx = peak.u * width
        const cy = peak.v * height
        const baseRadius = peak.r * Math.min(width, height)

        for (let ring = 1; ring <= peak.rings; ring += 1) {
          const frac = ring / peak.rings
          const radius = frac * baseRadius
          const segments = 110
          ctx.beginPath()

          for (let segment = 0; segment <= segments; segment += 1) {
            const angle = (segment / segments) * Math.PI * 2
            const wobble = 1
              + 0.12 * Math.sin(angle * 3 + peak.phase)
              + 0.06 * Math.cos(angle * 5 + peak.phase * 0.7)
              + 0.04 * Math.sin(angle * 7 + peak.phase * 1.2)
            const x = cx + Math.cos(angle) * radius * peak.stretchX * wobble
            const y = cy + Math.sin(angle) * radius * peak.stretchY * wobble

            if (segment === 0) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
          }

          ctx.closePath()
          const alpha = Math.max(0.16, (0.54 - frac * 0.34) * peak.alpha)
          ctx.strokeStyle = `rgba(87, 94, 129, ${alpha.toFixed(3)})`
          ctx.lineWidth = Math.max(0.9 * dpr, (1.45 - frac * 0.5) * dpr)
          ctx.stroke()
        }
      })
    }

    const observer = new ResizeObserver(drawTerrain)
    observer.observe(display)
    window.addEventListener('resize', drawTerrain)
    drawTerrain()

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', drawTerrain)
    }
  }, [])

  const onPointerMove = (event: MouseEvent<HTMLDivElement>) => {
    const display = displayRef.current
    const crosshair = crosshairRef.current
    const coords = coordsRef.current
    const goal = goalRef.current
    const goalStatus = goalStatusRef.current

    if (!display || !crosshair || !coords || !goal || !goalStatus) return

    const rect = display.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    crosshair.style.left = `${x - 20}px`
    crosshair.style.top = `${y - 20}px`
    coords.innerText = `CURSOR_POS: ${((x / rect.width) * 100).toFixed(3)} // ${((y / rect.height) * 100).toFixed(3)}`

    const goalRect = goal.getBoundingClientRect()
    const goalX = goalRect.left - rect.left + goalRect.width / 2
    const goalY = goalRect.top - rect.top + goalRect.height / 2
    const distance = Math.hypot(goalX - x, goalY - y)
    const maxDistance = Math.hypot(rect.width, rect.height)
    const lock = Math.max(0, 100 - (distance / maxDistance) * 100)
    goalStatus.innerText = `GOAL_LOCK: ${lock.toFixed(1)}%`
  }

  const onPointerLeave = () => {
    if (coordsRef.current) {
      coordsRef.current.innerText = 'CURSOR_POS: 00.000 // 00.000'
    }
    if (goalStatusRef.current) {
      goalStatusRef.current.innerText = 'GOAL_LOCK: 00.0%'
    }
  }

  return (
    <div className="instrument-shell map-shell">
      <div className="instrument-rail">
        <span>SDLC_TERRAIN_MAP</span>
        <span className="instrument-rail-muted">PASTEL SIGNAL</span>
      </div>
      <div
        className="map-display"
        onMouseLeave={onPointerLeave}
        onMouseMove={onPointerMove}
        ref={displayRef}
      >
        <div className="map-grid" />
        <canvas className="map-contours-canvas" ref={canvasRef} />
        <svg
          aria-hidden="true"
          className="map-route"
          preserveAspectRatio="none"
          viewBox="0 0 1000 520"
        >
          <path
            className="route-ghost"
            d="M84 430 L204 386 L324 336 L452 286 L590 248 L730 218 L872 164"
          />
          <path
            className="route-path"
            d="M84 430 L204 386 L324 336 L452 286 L590 248 L730 218 L872 164"
          />
          <circle className="route-ping" r="5">
            <animateMotion
              dur="7.5s"
              path="M84 430 L204 386 L324 336 L452 286 L590 248 L730 218 L872 164"
              repeatCount="indefinite"
            />
          </circle>
        </svg>

        <div className="map-crosshair" ref={crosshairRef} />
        <div className="map-bearing" style={{ transform: 'rotate(-15deg)' }} />
        <div
          className="map-bearing map-bearing-secondary"
          style={{ transform: 'rotate(8deg)' }}
        />

        <div
          className="map-epic"
          style={{ height: '180px', left: '20%', top: '15%', width: '180px' }}
        >
          <span className="map-label" style={{ top: '-15px' }}>
            ZONE: AUTH
          </span>
        </div>
        <div
          className="map-epic"
          style={{
            animationDelay: '-5s',
            bottom: '20%',
            height: '220px',
            right: '15%',
            width: '220px',
          }}
        >
          <span className="map-label" style={{ top: '-15px' }}>
            ZONE: CORE
          </span>
        </div>
        <div
          className="map-hazard"
          style={{ height: '110px', left: '41%', top: '57%', width: '110px' }}
        >
          <span className="map-label" style={{ top: '-15px' }}>
            RISK: DRIFT
          </span>
        </div>
        <div
          className="map-hazard"
          style={{ height: '86px', right: '28%', top: '30%', width: '86px' }}
        >
          <span className="map-label" style={{ top: '-15px' }}>
            RISK: LATENCY
          </span>
        </div>
        <div className="map-waypoint" style={{ bottom: '17%', left: '8%' }}>
          <span className="map-label" style={{ left: '-16px', top: '-15px' }}>
            START: BACKLOG
          </span>
        </div>
        <div className="map-waypoint" style={{ bottom: '35%', left: '35%' }}>
          <span className="map-label" style={{ left: '-6px', top: '-15px' }}>
            WP_02
          </span>
        </div>
        <div className="map-waypoint" style={{ bottom: '50%', left: '59%' }}>
          <span className="map-label" style={{ left: '-6px', top: '-15px' }}>
            WP_03
          </span>
        </div>
        <div className="map-goal" ref={goalRef} style={{ right: '11%', top: '18%' }}>
          <span className="map-label" style={{ left: '-36px', top: '-15px' }}>
            TARGET: TREASURE
          </span>
        </div>
        <span className="map-label map-status" ref={goalStatusRef}>
          GOAL_LOCK: 00.0%
        </span>
        <span className="map-label map-coords" ref={coordsRef}>
          CURSOR_POS: 00.000 // 00.000
        </span>
      </div>

      <div className="instrument-screws" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  )
}

type ModalPreviewProps = {
  title: string
  body: string
  ctaLabel: string
}

export function ModalPreview({ title, body, ctaLabel }: ModalPreviewProps) {
  return (
    <div className="modal-preview">
      <div className="modal-preview-frame">
        <div className="instrument-rail">
          <span>{title}</span>
          <span className="instrument-rail-muted">MODAL</span>
        </div>
        <div className="modal-preview-body">
          <p>{body}</p>
          <div className="modal-preview-actions">
            <button className="keel-btn keel-btn-primary" type="button">
              {ctaLabel}
            </button>
            <button className="keel-btn keel-btn-ghost" type="button">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

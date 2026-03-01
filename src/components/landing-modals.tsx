import { useEffect, useState } from 'react'

type ModalType = 'install' | 'demo' | null

type LandingModalsProps = {
  active: ModalType
  onClose: () => void
}

const installCommand = 'curl -sSL https://www.keel.dev/install | sh'

export function LandingModals({ active, onClose }: LandingModalsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!active) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [active, onClose])

  useEffect(() => {
    setIsOpen(false)
    setCopied(false)
    if (!active) return
    const frame = window.requestAnimationFrame(() => {
      setIsOpen(true)
    })
    return () => {
      window.cancelAnimationFrame(frame)
    }
  }, [active])

  if (!active) return null

  const isInstall = active === 'install'

  const onCopyCommand = async () => {
    try {
      await navigator.clipboard.writeText(installCommand)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1400)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div
      aria-hidden={!active}
      className="keel-modal-overlay"
      onClick={onClose}
      role="presentation"
    >
      <section
        aria-labelledby="keel-modal-title"
        aria-modal="true"
        className={isOpen ? 'keel-modal-panel is-open' : 'keel-modal-panel'}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <button
          aria-label="Close modal"
          className="keel-modal-close"
          onClick={onClose}
          type="button"
        >
          <svg
            aria-hidden="true"
            fill="none"
            height="20"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            viewBox="0 0 24 24"
            width="20"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="instrument-rail">
          <span id="keel-modal-title">{isInstall ? 'Install' : 'Demo'}</span>
        </div>

        <div className="keel-modal-body">
          {isInstall ? (
            <div className="modal-command-stack">
              <div className={copied ? 'modal-command-row is-copied' : 'modal-command-row'}>
                <code>{installCommand}</code>
                <button
                  aria-label="Copy install command"
                  className={copied ? 'modal-copy-btn is-copied' : 'modal-copy-btn'}
                  onClick={onCopyCommand}
                  type="button"
                >
                  <svg
                    aria-hidden="true"
                    fill="none"
                    height="16"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="16"
                  >
                    <rect height="13" rx="2" ry="2" width="13" x="9" y="9" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="modal-demo-frame">
                <div aria-hidden="true" className="modal-demo-play">
                  <svg
                    aria-hidden="true"
                    fill="none"
                    viewBox="0 0 24 24"
                    width="96"
                  >
                    <path
                      d="M8 5.14v14a1 1 0 0 0 1.5.87l11-7a1 1 0 0 0 0-1.74l-11-7A1 1 0 0 0 8 5.14z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

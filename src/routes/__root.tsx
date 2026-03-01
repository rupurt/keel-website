import {
  Link,
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from '@tanstack/react-router'
import { SiteFooter } from '~/components/site-footer'
import appCss from '~/styles/global.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Keel' },
      {
        name: 'description',
        content: 'Keel website',
      },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
    ],
  }),
  component: RootLayout,
  notFoundComponent: RootNotFound,
})

function RootLayout() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="app-shell">
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
        <Scripts />
      </body>
    </html>
  )
}

function RootNotFound() {
  return (
    <div className="site-container" style={{ padding: '6rem 0' }}>
      <p className="hero-kicker">404</p>
      <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '0.8rem' }}>
        Page Not Found
      </h1>
      <p className="section-lead" style={{ marginTop: 0 }}>
        The route you requested does not exist.
      </p>
      <div className="hero-actions" style={{ marginTop: '1.2rem' }}>
        <Link className="keel-btn keel-btn-primary" to="/">
          Back to Landing
        </Link>
      </div>
    </div>
  )
}

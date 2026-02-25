import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from '@tanstack/react-router'
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
})

function RootLayout() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-surface-950 text-surface-100 antialiased flex flex-col">
        <main className="flex-1">
          <Outlet />
        </main>
        <footer className="border-t border-surface-800 py-8 text-sm text-surface-500">
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-6">
            <p>
              &copy; {new Date().getFullYear()} Keel. All rights reserved.
            </p>
          </div>
        </footer>
        <Scripts />
      </body>
    </html>
  )
}

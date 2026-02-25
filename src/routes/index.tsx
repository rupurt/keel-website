import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <h1 className="text-5xl font-bold tracking-tight text-white mb-4">
        Keel
      </h1>
      <p className="text-xl text-surface-400 max-w-2xl">
        Coming soon.
      </p>
    </div>
  )
}

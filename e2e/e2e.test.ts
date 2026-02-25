import { expect, test } from '@playwright/test'
import { ChildProcessWithoutNullStreams, spawn } from 'node:child_process'
import { setTimeout as delay } from 'node:timers/promises'

function getRandomPort() {
  const min = 10_000
  const max = 65_535

  return Math.floor(Math.random() * (max - min + 1)) + min
}

const parsedPort = process.env.E2E_PORT
  ? Number.parseInt(process.env.E2E_PORT, 10)
  : Number.NaN
const testPort = Number.isFinite(parsedPort) ? parsedPort : getRandomPort()
const baseUrl = process.env.E2E_BASE_URL ?? `http://localhost:${testPort}`
const shouldStartServer =
  process.env.E2E_START_SERVER !== 'false' && baseUrl.includes('localhost')

let serverProcess: ChildProcessWithoutNullStreams | undefined

async function waitForServer(url: string, timeoutMs = 20000) {
  const start = Date.now()

  while (Date.now() - start < timeoutMs) {
    try {
      const response = await fetch(url, { method: 'GET' })
      if (response.ok) return
    } catch {
      // Ignore and retry.
    }

    await delay(250)
  }

  throw new Error(`Server not ready after ${timeoutMs}ms: ${url}`)
}

function startServer() {
  const url = new URL(baseUrl)
  const port = url.port || String(testPort)

  serverProcess = spawn('npm', ['run', 'dev', '--', '--port', port, '--strictPort'], {
    stdio: 'inherit',
    env: { ...process.env, BROWSER: 'none' },
  })

  serverProcess.on('exit', (code) => {
    if (code && code !== 0) {
      console.error(`Vite dev server exited with code ${code}`)
    }
  })
}

async function stopServer() {
  if (!serverProcess) return

  serverProcess.kill('SIGTERM')
  await new Promise((resolve) => serverProcess.on('exit', resolve))
}

test.beforeAll(async () => {
  if (shouldStartServer) {
    startServer()
  }

  await waitForServer(baseUrl)
}, { timeout: 60000 })

test.afterAll(async () => {
  await stopServer()
}, { timeout: 60000 })

test('home page shows keel content', { timeout: 30000 }, async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 })
  await page.goto(baseUrl, { waitUntil: 'networkidle' })

  await expect(page).toHaveTitle('Keel')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Keel')
  await expect(page.getByText('Coming soon.')).toBeVisible()
})

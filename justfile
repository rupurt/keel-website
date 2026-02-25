set shell := ["bash", "-euo", "pipefail", "-c"]

# Show available just recipes
help:
  @just --list --unsorted

# Install dependencies and browser runtime assets
setup:
  npm install
  npx playwright install chromium

# Install package dependencies only
install:
  npm install

# Run TypeScript type checking without emitting build artifacts
check:
  npx tsc --noEmit

# Run end-to-end test suite
test:
  npm run test:e2e

# Lint the codebase using oxlint
lint:
  npx oxlint --deny-warnings --react-plugin --import-plugin

# Format the codebase (using oxlint fix for now)
format:
  npx oxlint --fix --react-plugin --import-plugin

# Start Vite dev server on port 3000
dev:
  npx vite dev --port 3000

# Build production client/server bundles
build:
  npx vite build

# Preview production build using Vite's preview server
preview:
  npx vite preview --port 3000

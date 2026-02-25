# Keel Website

This is the repository for the Keel website.

## Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) (React + TanStack Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Toolchain**: [Nix](https://nixos.org), [Node.js](https://nodejs.org), [Just](https://github.com/casey/just)
- **Deployment**: [Cloudflare Pages](https://pages.cloudflare.com)

## Development

1.  Enter the Nix development shell:
    ```bash
    nix develop
    ```
2.  Set up the project:
    ```bash
    just setup
    ```
3.  Start the development server:
    ```bash
    just dev
    ```

## Scripts

- `just setup`: Install dependencies and browser runtime assets.
- `just dev`: Start the development server.
- `just build`: Build for production.
- `just check`: Run type checking.
- `just lint`: Lint the codebase.
- `just test`: Run e2e tests.

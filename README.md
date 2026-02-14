# lottie128

A bun monorepo.

## Structure

```
├── apps/          # Applications
├── packages/      # Shared packages
└── package.json   # Root workspace configuration
```

## Getting Started

Install dependencies:

```bash
bun install
```

Run development servers:

```bash
bun run dev
```

Build all packages and apps:

```bash
bun run build
```

## Workspaces

This monorepo uses bun workspaces. Add new packages to `packages/` and apps to `apps/`.

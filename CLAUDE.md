# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **bun monorepo** for lottie128, structured with workspaces for `apps/*` and `packages/*`. Currently contains one React web application.

## Common Commands

### Development
```bash
bun install          # Install all dependencies
bun run dev          # Start all app dev servers
bun run build        # Build all packages and apps
bun test             # Run all tests
```

### Web App (apps/web)
```bash
cd apps/web
bun run dev          # Start Vite dev server
bun run build        # Build for production (TypeScript check + Vite build)
bun run lint         # Run ESLint
bun run preview      # Preview production build
```

### Adding shadcn/ui Components
```bash
cd apps/web
bunx shadcn@latest add <component-name>
```

## Architecture

### Monorepo Structure
- **apps/web**: Main React application using Vite 8 beta
- **packages/**: Shared packages (currently empty)
- Uses bun workspaces for dependency management

### Web App Tech Stack
- **Framework**: React 19.2.0 with React Compiler enabled
- **Build Tool**: Vite 8 (beta)
- **Routing**: React Router 7.13.0 with createBrowserRouter
- **Styling**: TailwindCSS 4.1.18 with @tailwindcss/vite plugin
- **UI Components**: shadcn/ui (New York style, neutral base color)
- **Animation**: GSAP
- **TypeScript**: Strict mode enabled with comprehensive linting rules

### Path Aliases
The web app uses `@/*` to reference `src/*`:
```typescript
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
```

Configured in:
- `vite.config.ts`: Vite resolver
- `tsconfig.app.json`: TypeScript paths
- `components.json`: shadcn aliases

### Router Architecture
Routes use React Router's data router pattern (`createBrowserRouter`):
- Route definitions: `src/routes/index.tsx`
- Layout wrapper: `src/components/layouts/root-layout.tsx`
- Route components: `src/routes/<route-name>/index.tsx`

To add a new route:
1. Create `src/routes/<route-name>/index.tsx`
2. Add route config in `src/routes/index.tsx`

### Component Structure
- `src/components/ui/`: shadcn/ui components
- `src/components/layouts/`: Layout components
- `src/lib/`: Utility functions (e.g., `cn` for class merging)
- `src/routes/`: Route-specific components

## Code Conventions

- **TypeScript**: All new code should use TypeScript
- **Styling**: Use Tailwind utility classes; use `cn()` from `@/lib/utils` for conditional classes
- **Components**: Functional components with hooks
- **Imports**: Use `@/*` path alias for src imports

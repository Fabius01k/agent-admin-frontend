# Project Overview

## Important details
Разговаривай на русском языке

**agent-frontend-2** is a React + TypeScript + Vite frontend application. It is set up as a minimal SPA (Single Page Application) with Redux Toolkit for state management.

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 19 |
| **Build Tool** | Vite 7 |
| **Language** | TypeScript 5.9 |
| **State Management** | Redux Toolkit 2.11 |
| **Routing** | React Router 7 |
| **Styling** | Sass (SCSS) |
| **Linting** | ESLint 9 + typescript-eslint |
| **Package Manager** | pnpm |

## Project Structure

```
agent-frontend-2/
├── src/
│   ├── main.tsx              # Application entry point
│   ├── index.css             # Global styles
│   ├── assets/               # Static assets (images, etc.)
│   └── store/                # Redux store configuration
│       ├── store.ts          # Main store configuration
│       └── features/         # Redux slices (feature modules)
│           ├── auth-slice/   # Authentication feature
│           │   ├── auth-types.ts    # TypeScript interfaces
│           │   ├── auth-api.ts      # API calls
│           │   ├── auth-thunks.ts   # Async thunks
│           │   └── auth-slice.ts    # Redux slice
│           └── actors-slice/        # (Empty - placeholder for actors feature)
├── public/                   # Static public assets
├── plan/                     # Project planning documents
├── index.html               # HTML entry point
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript root config
├── tsconfig.app.json        # TypeScript app config
├── eslint.config.js         # ESLint configuration
└── package.json             # Dependencies & scripts
```

## Building and Running

### Development Server
```bash
pnpm dev
```
Starts Vite development server with Hot Module Replacement (HMR).

### Production Build
```bash
pnpm build
```
Type-checks and builds the production bundle.

### Preview Production Build
```bash
pnpm preview
```
Serves the production build locally for testing.

### Linting
```bash
pnpm lint
```
Runs ESLint on the codebase.

## Development Conventions

### TypeScript
- **Strict mode** enabled (`strict: true`)
- **verbatimModuleSyntax** enabled — use `import type` for type-only imports
- **Bundler module resolution** (`moduleResolution: "bundler"`)
- No emit in dev mode (`noEmit: true`)
- React JSX (`jsx: "react-jsx"`)

### Code Style
- ESLint with recommended TypeScript and React Hooks rules
- React Refresh plugin for Vite HMR compatibility
- Browser globals enabled

### State Management (Redux Toolkit)
Slices follow a modular structure:
- `*-types.ts` — TypeScript interfaces
- `*-api.ts` — API layer (fetch calls)
- `*-thunks.ts` — Async thunks with error handling
- `*-slice.ts` — Redux slice with reducers and extraReducers

### File Naming
- Use kebab-case for file names (e.g., `auth-slice.ts`, `auth-types.ts`)
- Feature folders named `*-slice` under `src/store/features/`

## Notes

- The project uses **pnpm** as the package manager (see `pnpm-lock.yaml`)
- `App.tsx` is referenced in `main.tsx` but not yet created
- `actors-slice/` folder exists but is empty (placeholder for future feature)
- The `plan/` directory contains project planning documents (e.g., `actor.pdf`)

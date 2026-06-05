# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Classy Glam Closet is a React 19 e-commerce SPA for plus-size fashion, exported from Google AI Studio. It uses Vite for the client build and an Express server (`server.ts`) for both development and production. The app features a product catalog, size calculator, AI-powered stylist (via Gemini API), shopping cart, and checkout flow.

## Common Commands

- **Develop:** `npm run dev` — Runs `tsx server.ts`, which starts the Express server with Vite middleware on port 3000.
- **Build:** `npm run build` — Runs `vite build` for the client and `esbuild` to bundle `server.ts` into `dist/server.cjs`.
- **Production:** `npm start` — Runs `node dist/server.cjs` (requires `npm run build` first).
- **Lint / Type-check:** `npm run lint` — Runs `tsc --noEmit`.
- **Clean:** `npm run clean` — Removes `dist` and `server.js`.

There is no test runner configured in this project.

## Architecture & Key Patterns

### Client
- **Entry:** `src/main.tsx` renders `App.tsx` inside `StrictMode`.
- **Routing:** Simple tab-based routing via `activeTab` state in `App.tsx` (`home`, `catalog`, `size-guide`, `stylist`, `checkout`). No React Router is used.
- **State Management:** All global state (cart items, active tab, product detail modal, checkout metadata, user profile size) lives in `App.tsx` and is passed down as props. There is no external state library.
- **Data:** Product catalog data is hardcoded in `src/types.ts` as `PRODUCTS_DATA`.
- **Styling:** Tailwind CSS v4. Theme colors and fonts are defined in `src/index.css` inside an `@theme` block:
  - `brand-pink`: `#E85AA6`
  - `brand-gold`: `#D4A017`
  - `brand-black`: `#111111`
  - `brand-blush`: `#F9EEF4`
- **Path Alias:** `@/` resolves to the repository root (`/`).

### Server
- **File:** `server.ts` is the single backend entry point.
- **Dev mode:** Creates a Vite dev server in middleware mode to serve the SPA.
- **Production mode:** Serves static files from the `dist/` folder.
- **API:** `POST /api/stylist` proxies to the Google Gemini API (`gemini-3.5-flash`) with a detailed system instruction for fashion styling. It reads `GEMINI_API_KEY` from environment variables. If the key is missing or placeholder, it returns a graceful fallback message.

### Environment Variables
- `GEMINI_API_KEY` must be set in `.env.local` (or `.env`) for the AI stylist to function. `dotenv` is loaded in `server.ts`.

## Important Implementation Details

- **HMR guard in Vite config:** `vite.config.ts` checks `DISABLE_HMR`. When `true`, it disables HMR and file watching to prevent flickering during agent edits. Do not remove this logic.
- **Manual Markdown Rendering:** The `AIStylist` component does not use a markdown library. It manually parses newline-delimited strings into headings, lists, and bold text. If editing the stylist response format, ensure the parser in `AIStylist.tsx` remains compatible.
- **Size Calculator Integration:** When a user calculates their size in `SizeCalculator`, `App.tsx` stores it in `userProfileSize`. This value auto-populates the size selector in the product detail modal.

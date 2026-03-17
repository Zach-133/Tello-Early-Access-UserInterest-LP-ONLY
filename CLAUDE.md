# CLAUDE.md — Draft Tello Early Access Landing Page

## Purpose
This folder is a **working draft** for the redesigned Tello Early Access landing page.

- The current live landing page lives in `C:\Users\Admin\Downloads\Claude Code Files\Tello-Early-Access`
- The full original landing page (preserved) lives in `C:\Users\Admin\Downloads\Claude Code Files\Full features webpage`
- **Do NOT commit anything in this folder to GitHub** until the user explicitly approves the final design
- **Do NOT touch the live project** (`Tello-Early-Access`) while drafting here

---

## Goal
Replace the current landing page (which is too long and feature-heavy) with a shorter, more focused early access page. The current page will be repurposed as a "showcase/features" page in the future.

---

## Dev Server
```bash
npm run dev      # → http://localhost:8082
```

**Screenshots:**
```bash
node "C:\Users\Admin\Downloads\Claude Code Files\Tello-Early-Access\screenshot.mjs" http://localhost:8082
```

---

## Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.
- **Do not commit to GitHub** — this is a draft only.

---

## Project Context
**Tello** is an AI-powered mock interview web app for early access users. Users log in, configure an interview, conduct a live voice interview with an AI agent (ElevenLabs), and receive a detailed scored results page.

**Live domain:** tello.zach13.com
**Stack:** React 18 + Vite + TypeScript + Tailwind CSS + shadcn/ui
**Phase:** Phase 4 — Early Access preparation (as of March 2026)

---

## Design System (same as main project)
**Fonts:** DM Serif Display (headings, `font-serif`) + Inter (body)

**Color tokens** (never raw Tailwind palette):
| Token | Role |
|-------|------|
| `primary` | Deep brown — main brand |
| `coral` / `coral-dark` / `coral-light` | CTA, accents |
| `teal` / `teal-light` | Secondary accent |
| `gold` / `gold-light` | Achievements |
| `success` / `success-light` | Positive states |
| `secondary` | Warm muted beige |
| `muted` / `muted-foreground` | Subdued text/surfaces |
| `background` | Warm cream |
| `card` | Slightly lighter cream |

**Shadows:** `shadow-soft` · `shadow-medium` · `shadow-strong` · `shadow-coral` · `shadow-card`
**Gradients:** `gradient-hero` · `gradient-warm` · `gradient-coral` · `gradient-card`
**Button variants:** `coral` · `coral-outline` · `hero` · `teal` · `default` · `outline` · `secondary` · `ghost`
**Animations:** `animate-float` · `animate-pulse-soft` · `animate-slide-up` · `animate-fade-in`

**Hard rules:**
- Never use default Tailwind blue/indigo as primary
- Never use `shadow-md`
- Never use `transition-all`
- Only animate `transform` and `opacity`

---

## Brand Assets
- Logo: `brand_assets/tello_logo.jpg` + `public/tello_logo.jpg`
- Favicon: `public/tello_icon.svg`
- Hero: `src/assets/hero-illustration.png`
- Avatars: `src/assets/avatar-beginner.png`, `avatar-medium.png`, `avatar-hard.png`

---

## Workflow
1. Draft and iterate here on localhost:8082
2. Screenshot after every change, inspect visually, fix issues
3. Present to user for review
4. Only once user approves → copy final result back to `Tello-Early-Access` and commit

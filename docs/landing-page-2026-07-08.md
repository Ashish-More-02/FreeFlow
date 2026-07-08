# FreeFlow Landing Page — 2026-07-08

A dedicated marketing landing page, built with guidance from the installed
`frontend-design` and `ui-ux-pro-max` skills.

## Design direction
- **Concept ("the flow"):** grounded in the product name — FreeFlow. The signature is
  a slowly **drifting gradient** (indigo → rose → violet) used behind the hero, in the
  "free flow" wordmark, and on feature/CTA accents. Chosen over a generic red-on-black so
  the page reads as *this* product, not a template.
- **Palette:** cinema-dark base (`#07070f`) + play-red/rose→purple accent gradient.
- **Type:** `Righteous` (display / wordmark / hero) paired with `Poppins` (body + the rest
  of the app now uses Poppins too, for consistency). Loaded via Google Fonts in
  `index.css`.
- **Pattern:** video-first hero + **bento** feature grid (per the ui-ux-pro-max design
  system output for "entertainment / video / bold").

## What's on the page (`Components/Landing.js`)
1. Transparent nav (wordmark, Features/Categories/Log in, "Start watching").
2. **Hero** — big Righteous headline with animated gradient "free flow" text, two CTAs
   (Start watching → `/home`, Create account → `/signup`), and a floating collage of
   gradient video cards.
3. **Category marquee** — continuously flowing row of real category chips.
4. **Bento feature grid** — six tiles describing the app's *actual* features (search with
   arrow-key nav, trending feed, real YouTube categories, watch page + comments, persisted
   dark mode, account/settings). Copy is honest — no invented stats.
5. **CTA band** on the flow gradient → "Enter FreeFlow".
6. Footer.

## Motion & accessibility
- Animations in `index.css`: `ff-flow` (drifting gradient), `ff-float` (hero cards),
  `ff-marquee` (category row), `ff-reveal` (scroll-in via IntersectionObserver).
- **`prefers-reduced-motion`** disables all of them.
- Focus-visible rings on every CTA; semantic headings; alt text on the logo; the hero
  collage is `hidden lg:block` so mobile stays clean.

## Routing change (important)
For the landing page to be the real entry point, the router was restructured
(`App.js`):

| Path | Before | After |
|------|--------|-------|
| `/` | app video feed | **Landing page** |
| `/home` | — | app video feed (was `/`) |
| `/watch`, `/results`, `/settings` | under `/` layout | under a **pathless `AppLayout`** route |

`AppLayout` (header + sidebar + `<Outlet/>`) was extracted so the app pages share the
shell while the landing/login/signup pages render standalone.

Internal "home" links were repointed to `/home`: Heading logo, Sidebar (Home + Trending),
the "All" category chip, and the post-login redirect. Auth-page logos and post-logout go
to `/` (the landing).

## Skills installed
`.agents/skills/frontend-design` and `.agents/skills/ui-ux-pro-max` (git-ignored). The
ui-ux-pro-max scripts were reviewed before running (pure-stdlib Python, no network) and
used only to generate design-system recommendations to stdout — nothing persisted.

## Verification
- `npx eslint src` → **0 errors, 0 warnings**.
- `react-scripts build` → **Compiled successfully**.
- Not viewed in a live browser (no headless env); the landing is presentational (no API
  calls), and the pathless-layout + absolute-children router pattern is standard for
  React Router v7.

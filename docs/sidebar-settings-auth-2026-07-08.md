# Functional Sidebar, Settings Page & Auth/Data-Management — 2026-07-08

Made the app functional end-to-end: no more mock sidebar data, a real Settings page,
persistent login, and correct user display / redirection.

---

## ⚠️ Important constraint: personalized YouTube data needs OAuth
This app authenticates against its **own MongoDB backend (email + password)**, not
Google OAuth. The YouTube Data API only exposes a *user's personal* subscriptions,
history, watch-later, and playlists through an **OAuth** access token. With only an API
key we **cannot** fetch the logged-in user's real subscriptions/history.

So the old mock sections ("Subscriptions: Harsharit Singh…", "History", "Playlists",
"Watch Later", …) had no real backing and were removed. What we *can* make real with
just the API key is the **video categories** list — so the sidebar now uses that.

To get real subscriptions later, the app would need Google OAuth (sign in with Google)
and the `youtube.readonly` scope; that's a larger auth change, noted as future work.

---

## Sidebar — now real & fully clickable (`Components/Sidebar.js`)
- Rewritten from static `<li>` text into functional navigation.
- **Primary nav:** Home, Trending (→ `/`), and Settings (→ `/settings`) as real router links.
- **Explore:** fetches **real YouTube video categories** via `videoCategories.list`
  (`YOUTUBE_CATEGORIES_API`), keeps only `assignable` ones, and renders each as a button
  that runs a real search (`getSearchVideoResults` → `/results`).
- Graceful fallback: if the categories API is unavailable (quota/key), it falls back to a
  curated list (Music, Gaming, Movies, Live, News, Sports, Cooking, Education) — still
  fully clickable and searchable.
- Icons via `react-icons/md`; closes the drawer on mobile after navigation.

## Settings page (`Components/Settings.js`, route `/settings`)
- Added as a child of the main layout, so it shows within the Heading + Sidebar shell.
- **Account:** avatar, name, derived **@handle** (from email), email, and a **Logout**
  button. When logged out it shows a prompt + Login link instead.
- **Appearance:** a real dark-mode toggle switch wired to redux.

## Auth & data management
- **UserSlice** now hydrates from `localStorage` on startup and persists on
  `setUser` / clears on `logout` — the session survives a page refresh.
- **Login** (`Components/Login.js`): redirects to `/` if already authenticated; removed a
  stray `console.log`; still dispatches `setUser` and navigates home on success.
- **Signup** (`Components/SignUpForm.js`): on success now redirects to `/login`
  (the backend signup route doesn't return a session, so auto-login isn't possible).
- **Heading** avatar now links to `/settings` (showing the user's name) when logged in,
  and `/login` otherwise.

## Theme state moved into Redux (`appConfigSlice`)
- `darkMode` moved from `App.js` local state into redux, persisted to `localStorage`
  (`toggleDarkMode` / `setDarkMode`). Now controllable from both the Heading button and
  the Settings page, and remembered across reloads.
- **App.js** refactored: the router is built once at **module scope** (previously rebuilt
  on every theme toggle, which remounted every page and dropped route state). A small
  `AppContent` component inside `<Provider>` reads `darkMode` and applies the `dark` class.
- `Heading`/`Body` no longer receive the old `darkmode`/`isMenuOpen` props.

## New / changed files
| File | Change |
| --- | --- |
| `Components/Sidebar.js` | Rewritten: real categories + functional nav |
| `Components/Settings.js` | **New** settings page |
| `Redux/Slices/UserSlice.js` | localStorage persistence |
| `Redux/Slices/appConfigSlice.js` | `darkMode` state + persistence |
| `Utils/Constants.js` | `YOUTUBE_CATEGORIES_API` |
| `App.js` | Module-scope router, redux theme, `/settings` route |
| `Components/Heading.js` | Redux darkMode, avatar → settings/login |
| `Components/Body.js` | Dropped unused props |
| `Components/Login.js` | Redirect-if-authenticated, cleanup |
| `Components/SignUpForm.js` | Redirect to `/login` on success |

## Verification
- `npx eslint src` → **0 errors, 0 warnings**.
- `react-scripts build` → **Compiled successfully** (no import/runtime resolution errors).
- Not exercised live end-to-end (needs API key + MongoDB running and two dev servers);
  logic verified by build + review.

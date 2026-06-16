# AGENTS.md — property-web-app

Brief map for AI agents. Optimized for maintenance and future backend wiring.

## Stack

- **Next.js 16** (App Router), **React 19**, **Tailwind CSS 4**
- Icons: `lucide-react`, `react-icons`
- Data today: **static JSON imports** (no CMS/API for page content yet)
- Theme: client `ThemeContext` + `useThemeStyles()` (`src/app/components/context/`)

## Top-level routes

| Route | Page entry | Components | Data |
|-------|------------|------------|------|
| `/developers` | `(public)/developers/page.js` | `(public)/home/components/` Hero + Section2–12 | `(public)/data/developers-new/*.json` |
| `/completed-projects` | `(public)/completed-projects/page.js` | `(public)/completed-projects/components/` Section1–8 + Hero | `(public)/data/complete-projects/*.json` |
| `/home` | `(public)/home/page.js` | `src/app/components/home/*` | `(public)/data/homeData.json` |
| `/project` | `(public)/project/page.js` | `src/app/components/single-project/*` | `(public)/data/Project/*.json` |
| `/developer` | `(public)/developer/page.js` | `src/app/components/developer/*` | `(public)/data/developerData.json` |
| API | `src/app/api/admin/login/route.js` | — | admin only stub |

Legacy / backup / test: `developerData.json`, `ProjectData.json`, `Data2/`, `testing/`, `single-project-backup/`, `completed-projectsss/` — prefer `developers-new` + `complete-projects` for active pages.

## Developers page architecture (main active work)

```
developers/page.js
  └─ imports hero.json + section2.json … section12.json
  └─ passes `data` prop into each SectionN
```

- **One JSON file per section** — shape is section-specific; always read JSON before assuming field paths (nested keys common: e.g. `knownIssues.items`, `leadership.leaders`).
- **Section components** live in `(public)/home/components/Section{N}.js` + `Hero.js`, `ExpertSection.js`.
- **Do not change JSON copy** unless user asks; UI-only refactors are normal.

## Completed-projects page

- Mirror pattern: `completed-projects/components/Section{N}.js` + JSON under `complete-projects/`.
- Some sections forked from developers sections (e.g. Section2) — check which folder you edit.

## Shared UI conventions

- **Brand gold:** `#B68A35` (also `GOLD`, `GOLD_BORDER` in themeStyles)
- **Dark mode:** inline `style` from `useThemeStyles()`; light mode mostly Tailwind
- **Cards:** `cardBg`, `cardBorder`, `sectionBg`, `bodyColor`, `subtextColor` computed per section
- **Dynamic icons:** return **component**, not JSX (`const Icon = getX(); return <Icon />`). Never `<item.icon />` if icon is lowercase variable.
- **ExpertSection:** reused footer CTA block inside many sections

## Mobile vs desktop policy (developers sections)

- Mobile-only layout/typography changes unless user says otherwise
- Shared patterns documented in `current.md` — apply consistently when touching sections
- Section header image: **hardcoded** `/projects/cm-projects.webp` (mobile + desktop) for Section3–11; ignore `heroImage` in JSON for headers

## Theme / hydration

- `ThemeContext`: read `localStorage` in `useEffect` after mount — **never** in `useState` initializer (causes Navbar hydration mismatch)

## Future backend integration (when added)

Replace static imports with fetch; keep contracts stable:

1. **Page-level loader** — `developers/page.js` (and similar) should fetch `{ hero, sections: { s2…s12 } }` or parallel endpoints
2. **Section components** — keep `data` prop interface; map API response to same JSON shape
3. **Slug routing** — `/developers/[slug]` will need dynamic params; JSON filenames become API ids
4. **Auth** — only `api/admin/login` exists today; CMS at `(public)/cms/admin/page.js`
5. **Images** — header asset path may move to CDN; update one constant/pattern not per-section strings
6. **Real-time fields** — Section11 reviews/ratings marked as placeholders in JSON; backend fills these

Suggested env vars (not wired yet): `NEXT_PUBLIC_API_URL`, server-side fetch in RSC pages.

## File touch guide

| Task | Where |
|------|--------|
| Developer section UI | `(public)/home/components/Section*.js` |
| Developer content | `(public)/data/developers-new/section*.json` |
| Completed project UI | `(public)/completed-projects/components/` |
| Completed project content | `(public)/data/complete-projects/` |
| Global nav/theme | `src/app/components/Navbar.js`, `context/ThemeContext.js` |
| Reusable section header | `src/app/components/home-page-common/SectionBgTextHeader.js` |

## Commands

```bash
npm run dev    # local
npm run build  # production check
npm run lint
```

## Agent rules

- Minimize diff scope; match existing section patterns before inventing new ones
- Don't commit unless user asks
- Don't edit `.next/` or generated artifacts
- After JSON shape changes, grep section component for old keys
- Prefer `Read` on target Section + its JSON together before editing

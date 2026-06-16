# current.md — active UI conventions (developers `home/components`)

Shared changes applied across Section2–11 (and partially `completed-projects/components`). Section-specific one-offs are **not** listed here.

## Scope

- **Mobile-first** styling for developers sections; desktop layout mostly preserved
- **JSON content unchanged** — UI/presentation only

## Section header (mobile + desktop)

- Image: hardcoded **`/projects/cm-projects.webp`** (ignore `data.heroImage` in section JSON)
- Mobile: `min-h-[285px]`, smoke gradient overlay, no image border/padding
- Mobile H2: `32px`, `leading-none`; line2 gold `#B68A35`
- Description: `14px`, **`leading-[17px]`** (mobile + desktop header)
- Gold divider: `h-px w-20 bg-[#B68A35]` under description (mobile)
- Desktop: separate header block (`hidden md:flex`); same image hardcoded

## Border radius

- Mobile: `rounded` (not `rounded-xl` / `rounded-2xl`)
- Desktop: `lg:rounded-xl` or `lg:rounded-2xl` as before

## Typography

| Element | Mobile rule |
|---------|----------------|
| H2 (header) | `32px`, `leading-none` |
| Header description | `14px`, `leading-[17px]` |
| Tab labels | `10px`, `leading-tight`, centered where cramped |
| Accordion / tab body / list text | `13px`, **`leading-normal`** (not `leading-none`) |
| Desktop body | often `lg:text-xs lg:leading-relaxed` layered on top |

## MobileNoteBox (disclaimers, footnotes, source notes)

Copy pattern from Section2–11: local component per file (not shared module yet).

- **With title:** icon + uppercase gold title row → vertical gold line + body
- **No title:** row = icon column (icon + centered vertical gold line) + text
- Used for footer disclaimers on **mobile only**; desktop keeps prior inline Info layout

## Tabs (mobile)

- Pill/bar container: `rounded`, gold active fill
- Labels compact (`10px`); icons optional per section

## FAQ accordions (Section12 + completed-projects Section8)

- **One card per question** — not a single box with `divide-y` lines
- Each: `rounded-2xl`, border, shadow, `space-y-2 sm:space-y-3` between cards
- Answer below button; top border when open

## Theme / hydration fix

- `ThemeContext.js`: theme from `localStorage` only in **`useEffect`**, default `"dark"` on first render — fixes Navbar icon SSR mismatch

## Dynamic icons (bug pattern to avoid)

- Helpers must return **icon component**, not pre-rendered JSX
- Use `const Icon = getIcon(name); return <Icon />`
- Capitalize when destructuring: `const Icon = category.icon; <Icon />`

## JSON nesting (bug pattern to avoid)

- Verify array paths in JSON before `.map()` — data often nested (`items`, `leaders`, etc.)

## Not in this doc

- Section10 Key Metrics card grid / Pipeline header (mobile-only custom layouts)
- Section8 status-tab grid / financial tab icons
- Section5 accordion-specific layout
- Per-section bug fixes (Known Issues path, leadership path, etc.)

When adding a new section or editing an old one on developers page, match the patterns above before adding section-specific UI.

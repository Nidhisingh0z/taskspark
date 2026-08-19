# TaskSpark — Project Structure

**Day 2 deliverable.** This is the authoritative folder structure for the rest of the build (Days 3–10). Nothing here should need to change unless a real technical blocker is discovered.

---

## Final Structure

```
taskspark/
├── index.html              # The entire UI — single page, all states live here
├── style.css                # All styling — layout, colors, responsive rules, animations
├── script.js                 # All frontend logic — fetch calls, DOM rendering, state handling
├── api/
│   └── extract.js            # The one serverless function — receives text, calls Claude, returns JSON
├── docs/                     # All planning & design documentation (this file included)
│   ├── PRD.md (or .docx)     # Day 1 — product requirements
│   ├── IMPLEMENTATION-BLUEPRINT.md   # Day 1 — day-by-day build plan (source of truth for Days 2–10)
│   ├── PITCH-DECK.pptx       # Day 1 — presentation
│   ├── ARCHITECTURE.md       # Day 2 — system design (this deliverable set)
│   ├── SCHEMA.md             # Day 2 — data design (no-DB rationale)
│   ├── API.md                # Day 2 — endpoint contract
│   ├── UI-WIREFRAMES.md      # Day 2 — user flow & wireframes
│   ├── PROJECT-STRUCTURE.md  # Day 2 — this file
│   └── PROJECT-LOG.md        # Ongoing — running log of daily progress (started today)
├── .env.local                 # Local-only secret: ANTHROPIC_API_KEY (never committed)
├── .gitignore                 # Excludes node_modules/ and .env.local from version control
├── package.json               # Dependencies: @anthropic-ai/sdk, dotenv
├── vercel.json                 # Only added if default Vercel routing needs adjusting (Day 9)
└── README.md                   # Project overview, live link, how to run locally (finalized Day 10)
```

---

## Responsibility of Each Major Folder/File

| Path | Responsibility | Built/Updated On |
|---|---|---|
| `index.html` | Defines the structure of every UI state (empty, loading, results, error) described in `UI-WIREFRAMES.md` | Day 3, refined Day 7 |
| `style.css` | All visual design — must implement the wireframes and the "polished, judge-ready" bar from the PRD | Day 3, refined Day 7 |
| `script.js` | Owns all client-side logic: reading the textarea, calling `/api/extract`, rendering results, managing state transitions from the state diagram in `UI-WIREFRAMES.md` | Day 3 (fake data), Day 5 (real integration), Day 7 (polish) |
| `api/extract.js` | Owns all server-side logic: request validation, the Claude prompt, calling the Anthropic API, defensive JSON parsing, and every error case defined in `API.md` | Day 4, refined Day 6 |
| `docs/` | Single home for every planning artifact — keeps design decisions discoverable by any future AI conversation or human collaborator without digging through code | Days 1–2, updated as needed |
| `.env.local` | Holds the real `ANTHROPIC_API_KEY` for local testing only — never touches GitHub | Day 2 (created), used through Day 9 |
| `.gitignore` | Prevents `.env.local` and `node_modules/` from ever being committed — the single most important file for API key security | Day 2 |
| `package.json` | Declares the two runtime dependencies (`@anthropic-ai/sdk`, `dotenv`) — kept intentionally minimal | Day 2 |
| `vercel.json` | Only created if Vercel's zero-config defaults don't correctly route `/api/extract` in production | Day 9, only if needed |
| `README.md` | The first thing a judge or visitor reads on GitHub — problem, features, tech stack, live link, local setup instructions | Drafted Day 2 (stub), finalized Day 10 |

---

## Why This Structure Was Chosen

1. **Flat and shallow.** No nested `src/`, `components/`, `utils/` folders — with one HTML file, one CSS file, one JS file, and one API function, deep nesting would only add navigation overhead for no organizational benefit.
2. **Mirrors the architecture exactly.** The two real runtime pieces (`index.html`/`script.js`/`style.css` as the frontend, `api/extract.js` as the backend) map 1:1 to the two boxes in the component diagram in `ARCHITECTURE.md` — nothing is hidden or split across unexpected files.
3. **Docs live with the code, not separately.** Putting `docs/` inside the same repo (rather than a separate repo or external doc tool) means anyone reviewing the project — a judge, a future contributor, or a fresh AI conversation on Day 3 — has full context in one place.
4. **No placeholder folders for unbuilt features.** There is no empty `auth/`, `db/`, or `models/` folder — consistent with the PRD's locked v1.0 scope. Nothing exists in the structure that doesn't map to a real, planned piece of work.

---

## Where Future Code Will Live (Days 3–9 Preview)

| Day | What gets added/changed |
|---|---|
| Day 3 | `index.html`, `style.css` fully built; `script.js` gets temporary fake-data rendering |
| Day 4 | `api/extract.js` fully built and directly tested (not yet wired to frontend) |
| Day 5 | `script.js` rewritten to call the real `/api/extract` endpoint |
| Day 6 | `api/extract.js` prompt refined; no new files |
| Day 7 | `style.css` and `script.js` polished; no new files |
| Day 8 | Bug fixes only, wherever needed; temporary test files (if any) removed |
| Day 9 | `vercel.json` added only if required; environment variable configured in the Vercel dashboard (not a file) |
| Day 10 | `README.md` finalized; `docs/PROJECT-LOG.md` completed |

No day introduces a new top-level folder — the structure set today is final.

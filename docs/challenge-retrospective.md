# TaskSpark — Challenge Retrospective

**AB Talks 60-Day Claude AI Challenge — 10-Day Capstone**
**Project:** TaskSpark — Messy text in. Clear tasks out.
**Timeline:** 10 days, ~1 hour/day
**Final result:** v1.0.0, live at https://taskspark-six.vercel.app

---

## The Journey, Day by Day

### Day 1 — Requirements
The project started as an open question, narrowed through a guided interview into a specific idea: an AI tool that reads messy pasted text — emails, notes, chat — and pulls out the actual tasks and due dates hiding inside it. The scope was locked immediately and firmly: plain text in, structured tasks out, no accounts, no database, no saved history. That single decision — refusing to build a database "just in case" — turned out to be the most important architectural choice of the entire project, and it held for all 10 days without a single exception.

### Day 2 — System Design
The GitHub repo was created, the local project scaffolded, and the full system was designed on paper before a line of real code was written: architecture diagram, data schema (and the written justification for having none), the API contract for a single `POST /api/extract` endpoint, and wireframes for all five UI states the app would ever need — Empty, Loading, Results, No-Tasks-Found, and Error.

### Day 3 — Setup & Foundation, and the First Real Pivot
This was the day of the project's biggest decision: switching the AI provider from Anthropic Claude to Google Gemini, at the builder's explicit request, to avoid using paid credits despite Claude's free trial being available. This was flagged clearly and repeatedly as a possible eligibility question for the "Claude AI Challenge" itself — a genuinely uncomfortable but important thing to name honestly rather than gloss over. It was also the day of the project's first real debugging lesson: a `type nul >` command that's valid in `cmd.exe` but silently misbehaves in PowerShell caused `index.html`, `style.css`, `script.js`, and the entire `api/` folder to simply not exist on disk, despite appearing to have been created on Day 2. The fix — `New-Item` instead of `type nul >`, plus a habit of always verifying the working directory before file operations — became a standing rule for the rest of the build.

### Day 4 — Core UI Build
The full interface was built across all five states, wired to temporary fake data so the visual design could be verified before any real AI logic existed. A disciplined call was made here: don't deploy a version that doesn't actually work yet, even though it "looked done." A stray `files.zip` that got accidentally committed was also caught and cleaned up, with `.gitignore` updated to prevent a repeat.

### Day 5 — Real AI Integration
The real extraction prompt was engineered in `api/extract.js`: a system prompt with explicit rules plus three few-shot examples, structured JSON output enforced via Gemini's `responseMimeType` setting, and defensive parsing to handle cases where the model wraps its JSON in markdown fences. All three PRD sample cases passed exactly on the first real test.

### Day 6 — MVP Complete & First Deploy
TaskSpark went live for the first time. This day included a genuinely tricky production bug: the app worked perfectly locally but failed in production with "GEMINI_API_KEY is not configured" — even though the Vercel dashboard appeared to show the key saved. The real cause was that the environment variable hadn't actually persisted on the first save attempt, something only visible by checking the main Environment Variables list page rather than trusting the "saved" confirmation. This is a subtle, easy-to-miss class of bug, and catching it was a real debugging win.

### Day 7 — Product Refinement & UX
Two milestones: first, hardening the extraction prompt against vague scheduling language ("whenever you get a chance"), small talk, and multi-task date-splitting — verified against three new tricky test cases. Second, a full senior-level UX pass that added ARIA live regions, visible keyboard focus states, a button loading spinner, consistent SVG icons (replacing inconsistent emoji), a live character counter, staggered task-card animations, and `prefers-reduced-motion` support.

### Day 8 — Testing, Debugging & Production Optimization
A full QA/Security/Performance review surfaced real risks that hadn't been visible before: a crash risk from malformed request bodies, no defense against malformed AI output rendering "undefined" in the UI, no offline detection, no rate limiting (a real threat to a free-tier API quota), and a color-contrast failure against WCAG AA. All were fixed in one pass: a top-level crash safety net, an in-memory rate limiter, output sanitization, `navigator.onLine`-based offline detection with a proper in-app message (verified carefully after an initial DevTools test accidentally triggered a full page reload instead), and a darkened, accessible color palette. Deployment hit a transient `vercel --prod: fetch failed` error, resolved by confirming the Vercel CLI session was still valid and simply retrying.

### Day 9 — Launch & Production Readiness
The final release-readiness pass: a genuinely empty `README.md` (a real gap, caught honestly rather than assumed fine) was rewritten into a complete project overview; an MIT `LICENSE` and a custom SVG favicon were added; Open Graph and Twitter card metadata were added for proper social link previews; and the GitHub repository's About section was completed with a description, live link, and eight relevant topics. A full walkthrough on the live production site confirmed everything — normal extraction, empty-input validation, and no-tasks detection — matched what had been verified locally.

### Day 10 — Final Review, Portfolio & Graduation
The capstone's last day: a full multi-perspective review (engineering, product, design, recruiting, open-source maintenance), the four planning documents you're reading alongside this one, portfolio-ready descriptions and talking points, an official v1.0.0 release, and the graduation artifacts marking the end of the AB Talks 60-Day Claude AI Challenge.

---

## Major Technical Decisions & Pivots

1. **No database, ever** — the single decision that shaped everything else. Made on Day 1, never revisited, and directly responsible for how fast and simple the rest of the build could stay.
2. **Anthropic Claude → Google Gemini** — a real, consequential pivot made on Day 3 for cost reasons, documented honestly (including its possible eligibility implications) rather than hidden.
3. **Skip deploying incomplete work** — the Day 4 decision not to ship a fake-data version, even though it was visually complete, set a quality bar that held for the rest of the project.
4. **Fix real bugs before adding polish** — Day 8's full QA pass happened *before* the launch-readiness pass on Day 9, not after, which meant Day 9's polish work was applied to an already-hardened app.

## Challenges Solved & Key Debugging Moments

- The Day 3 PowerShell-vs-cmd file-creation mystery (files silently failing to exist)
- The Day 6 "environment variable said saved but wasn't" production bug
- The Day 8 offline-detection test that initially triggered a full browser-level error page instead of the in-app one, resolved by testing the actual user flow more precisely
- The Day 9 file-download path confusion (files landing in unexpected folders), solved with a consistent verify-before-commit habit

## Skills Demonstrated

Requirements gathering and scope discipline · system design and architecture documentation · prompt engineering (few-shot examples, structured JSON output, defensive parsing) · full frontend state-machine design · serverless backend development · production debugging (environment configuration, silent shell failures) · accessibility engineering (ARIA, focus management, contrast) · security hardening (rate limiting, input sanitization, crash safety) · deployment and CI-adjacent workflows (Vercel, GitHub) · technical documentation and portfolio communication.

## Final Project Summary

TaskSpark is a small, honest, well-scoped application that does one thing — extracting tasks and due dates from messy text — and does it reliably, accessibly, and securely, without ever pretending to be more than it is. Its real value as a capstone isn't its feature count; it's the discipline behind it: a scope that never crept, bugs that were found and actually fixed rather than worked around, and decisions (like the AI provider change) that were made transparently even when they complicated the "official" story.

## Lessons Learned

1. **A tightly scoped v1.0 is a feature, not a limitation.** Ten days of consistent progress were only possible because Day 1's "no accounts, no database" decision was never renegotiated.
2. **"It looks saved" is not the same as "it is saved."** The Day 6 environment variable bug is a small, specific lesson that generalizes well beyond this project.
3. **Testing the real user flow matters more than testing the mechanism.** The Day 8 offline-detection retry (typing text *before* going offline, rather than reloading while offline) is exactly this lesson in miniature.
4. **Naming an uncomfortable decision honestly (Day 3's provider swap) is better than quietly working around it.** It made the documentation trustworthy, which matters more for a portfolio piece than a clean origin story would have.

---

## A Farewell, From Your AI Pair Programmer

We started this ten days ago with a blank repo and a rough idea about messy notes and missing deadlines. Since then we've debugged a PowerShell quirk that made files vanish, chased down an environment variable that lied about being saved, watched a Chrome dinosaur show up when we meant to test something much smaller, and shipped a real, working, publicly accessible application that does something genuinely useful.

What I want you to take from this isn't the code — it's the pattern underneath it. You made a real architectural call on Day 1 and held the line on it for ten straight days. You caught your own empty README instead of letting it slide. You tested the actual user experience, not just the theory of it, even when that meant redoing a test you thought you'd already finished. That's not "AI Challenge" behavior — that's just good engineering, and you did it yourself, with me as a second pair of hands rather than the one steering.

The 60-Day Challenge doesn't end your relationship with this project or with building things — it's just the end of the structured part. TaskSpark is live, it's yours, and the `future-scope.md` sitting next to this file is a real, honest map of where it could go next, whenever you're ready to pick it back up.

Congratulations on shipping something real. Go build the next thing.

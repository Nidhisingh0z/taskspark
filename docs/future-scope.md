# TaskSpark — Future Scope

This document outlines realistic next steps for TaskSpark beyond v1.0.0, grounded in the actual architecture (stateless, no database, single serverless function, Google Gemini) and the gaps identified in the Day 10 release review.

---

## Next 3 Months: Make v1.0 More Useful, Without Breaking Its Simplicity

The goal here is to add value to a single session, without yet introducing accounts or a database.

1. **Copy-to-clipboard and export options** — the most requested feature by any real user, and the clearest gap identified in the Day 10 review. Add a "Copy all tasks" button, and a "Copy as Markdown checklist" option (`- [ ] Task — Due: date`), so extracted tasks can be pasted directly into Notion, a to-do app, or an email.
2. **"Add to Google Calendar" links** — for tasks with a detected due date, generate a pre-filled Google Calendar event link (no API/auth needed — Google Calendar supports this via URL parameters). This turns a passive list into an actionable one, still with zero backend state.
3. **Dark mode** — a `prefers-color-scheme` media query and a manual toggle, using CSS custom properties (the app already uses CSS variables for its palette, so this is a low-risk, well-scoped addition).
4. **Improve date normalization** — currently due dates are returned as natural-language strings ("Friday", "next week"). Adding a lightweight client-side date parser (e.g., a small library, or a second Gemini pass) to also return an ISO date where confidently inferable would make the calendar-export feature above meaningfully better.
5. **Basic automated testing** — the Day 10 review flagged the lack of tests as the most significant engineering gap. Start with a small suite of API contract tests against `api/extract.js` (mocking the Gemini call) to lock in the current behavior before adding new features.

## Next 6 Months: Introduce Optional Persistence, Carefully

This is the point where TaskSpark's "no database" design gets its first real test — the goal is to add persistence as an *opt-in* layer, not a requirement, so the core stateless experience still works for anyone who doesn't want an account.

1. **Optional "Save this session" via a share link** — generate a short-lived, unguessable URL (e.g., using a free-tier key-value store like Vercel KV or Upstash Redis) that lets someone revisit their last extraction without a full account system. This is a much smaller step than full auth and tests the waters for real persistence.
2. **Browser-local history (no backend at all)** — as a zero-infrastructure alternative to the above, store the last 5–10 extractions in the browser's `localStorage`, so a user can look back at recent sessions on the same device without TaskSpark ever needing a database.
3. **Multi-language input support** — Gemini already supports many languages; the main work is verifying and refining the system prompt against non-English input, and confirming the UI (character counts, RTL languages) holds up.
4. **Usage analytics (privacy-respecting)** — lightweight, aggregate-only tracking (e.g., how many extractions per day, no personal data) to understand real usage patterns before investing further, using a free-tier privacy-focused tool.

## Next 12 Months: Decide If TaskSpark Becomes a Real Product or Stays a Portfolio Piece

This is a genuine fork in the road, and it's worth naming honestly rather than assuming growth is the only valid outcome.

**If the goal is a real product:**
1. **Full accounts + a real database** (e.g., Supabase or Firebase, both already noted as acceptable free-tier options in this project's own constraints) — enabling saved task lists, recurring extraction sources (e.g., connect an inbox), and team/shared use.
2. **A proper task-management layer** — check off completed tasks, edit extracted tasks, reorder, snooze due dates — moving from "one-shot extraction tool" to "lightweight task manager."
3. **Integrations** — Slack, email forwarding, or browser extension ("select text on any page → extract tasks") to capture messy text closer to where it originates, rather than requiring copy-paste into a web app.
4. **Revisit the AI provider decision** — the original plan was Anthropic Claude; Gemini was chosen Day 3 for cost reasons. At this stage of investment, it's worth revisiting model choice based on real extraction accuracy data gathered from usage, not just cost.

**If the goal is to keep it a polished portfolio piece:**
1. Focus entirely on the "3 Months" list above (export, dark mode, tests) — these make the project *demonstrably* more complete for interviews and code review, without the ongoing maintenance burden of a real backend and user base.
2. Write a short case study (separate from `challenge-retrospective.md`) specifically framed for a portfolio site or LinkedIn — "the problem, the constraint, the decision, the result" — using the real Day 3 Gemini-vs-Claude pivot as a genuine example of engineering judgment under a real-world constraint.

Both paths are legitimate. The important thing is choosing deliberately rather than drifting — which is exactly the discipline this project already showed by keeping v1.0's scope tightly locked for 9 straight days.

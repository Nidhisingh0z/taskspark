# TaskSpark — 30-Day Growth Plan

A realistic, one-milestone-per-day roadmap taking TaskSpark from its current v1.0.0 (stateless extraction tool) toward a genuinely more complete product — built on the same stack (vanilla JS, Node serverless function, Google Gemini, Vercel, no database until Week 3) and using the same daily rhythm (~1 hour/day) that got the capstone done.

Each day builds on the previous one. Use `daily-build-prompt.md` alongside this file — just update the day number each time.

---

## Week 1: Make v1.0 Actually Useful for Repeated Real Use

- **Day 1:** Add a "Copy to clipboard" button for individual tasks and a "Copy all" button for the full list. No backend changes needed.
- **Day 2:** Add a "Copy as Markdown checklist" export format (`- [ ] Task — Due: date`), as a second option next to plain-text copy.
- **Day 3:** Build "Add to Google Calendar" links for tasks with a detected due date, using Google's URL-based event creation (no OAuth needed).
- **Day 4:** Improve `renderTasks` so tasks without a clear date but with an implied urgency ("ASAP") get a visually distinct pill style from tasks with an actual date.
- **Day 5:** Add a small "Try an example" button that pre-fills the textarea with a sample messy email, lowering the barrier for new visitors to see the app work immediately.
- **Day 6:** Write and wire up a basic automated test suite for `api/extract.js` (mocking the Gemini call), locking in current behavior before further backend changes.
- **Day 7:** Review week 1 end-to-end: re-run the full 5-state regression pass, fix anything broken, and write a short `WEEK1-SUMMARY.md`.

## Week 2: Polish, Accessibility, and Reach

- **Day 8:** Implement dark mode using `prefers-color-scheme` plus a manual toggle, built on the existing CSS custom-property system.
- **Day 9:** Add a "recent extraction" feature using `localStorage` only (no backend) — store the last 5 extractions client-side so a refresh doesn't lose everything.
- **Day 10:** Audit and improve mobile responsiveness specifically on very small screens (under 360px width) and very large text sizes (accessibility zoom).
- **Day 11:** Add basic internationalization testing — try the extraction prompt against non-English input (e.g., Spanish, Hindi) and note what breaks.
- **Day 12:** Add a lightweight, privacy-respecting analytics integration (aggregate counts only) to understand real usage patterns.
- **Day 13:** Run a full Lighthouse audit (Performance, Accessibility, Best Practices, SEO) and fix whatever scores below 90.
- **Day 14:** Review week 2 end-to-end, update the README with any new features, write `WEEK2-SUMMARY.md`.

## Week 3: Introduce Careful, Optional Persistence

- **Day 15:** Design the data model for optional session persistence (what a "saved extraction" record needs) without committing to full user accounts yet.
- **Day 16:** Set up a free-tier key-value store (Vercel KV or Upstash Redis) and get a basic write/read working from a new serverless function.
- **Day 17:** Build a "Save this session" button that generates a short, unguessable share link for a specific extraction.
- **Day 18:** Build the corresponding "view a shared extraction" page/route that reads from the store using that link.
- **Day 19:** Add expiration to shared links (e.g., 30 days) to keep storage usage bounded on the free tier.
- **Day 20:** Test the full save/share/view flow end-to-end, including what happens when a link has expired.
- **Day 21:** Review week 3 end-to-end, update documentation to describe the new optional persistence layer, write `WEEK3-SUMMARY.md`.

## Week 4: Decide the Product's Direction and Act on It

- **Day 22:** Revisit `future-scope.md`'s two paths (real product vs. polished portfolio piece) with three weeks of real progress behind you, and make a deliberate choice.
- **Day 23 (If "real product"):** Design a minimal accounts system (e.g., magic-link email auth via a free-tier provider) as a plan, without building it yet — scope it properly first.
- **Day 23 (If "portfolio piece"):** Write a dedicated case-study page or post specifically for a portfolio site, using the Day 3 Claude-to-Gemini pivot as your core "engineering judgment under constraint" example.
- **Day 24:** (Product path) Begin implementing basic auth. (Portfolio path) Record a short demo video walking through the app and its architecture.
- **Day 25:** (Product path) Wire saved extractions to a real user account instead of an anonymous share link. (Portfolio path) Polish the demo video and write accompanying notes.
- **Day 26:** (Product path) Add basic task editing (mark complete, edit text) for signed-in users. (Portfolio path) Update your resume/LinkedIn with the finished 30-day work.
- **Day 27:** Full regression pass across everything built in the last 30 days — all original 5 states plus every new feature.
- **Day 28:** Security and performance review of everything added since v1.0.0 — treat it exactly like the original Day 8 review.
- **Day 29:** Update all documentation (README, architecture notes, this plan) to reflect the actual final state, not the plan.
- **Day 30:** Tag and release **v2.0.0**, and write a short retrospective on what changed between v1.0.0 and v2.0.0 and why.

---

**A note on pacing:** if any single day's milestone doesn't fit in ~1 hour, it's fine to split it across two days rather than rush it — the discipline that made the original 10-day capstone work was steady, honest progress, not speed.

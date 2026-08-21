# TaskSpark — Project Log

Running log of daily progress for the AB Talks 60-Day Claude AI Challenge capstone.

**Repo:** https://github.com/Nidhisingh0z/taskspark
**Live site:** https://taskspark-six.vercel.app

---

## Day 1 — Requirements
- Discovered the project idea: an AI-powered tool that extracts tasks + due dates from messy pasted text.
- Locked v1.0 scope: plain text input only, no accounts, no database, no saved history.
- Deliverables: PRD, Implementation Blueprint (Days 2–10), Pitch Deck.
- Status: ✅ Complete.

## Day 2 — System Design
- Created GitHub repository, cloned locally, set up initial project structure.
- Designed full system architecture, data schema rationale, API contract, UI wireframes, and project structure.
- Status: ✅ Complete.

## Day 3 — Project Setup & Foundation
- Verified/configured development environment. AI provider changed from Anthropic Claude to Google Gemini.
- Fixed a file-creation issue (PowerShell/cmd mismatch). Built and verified a minimal end-to-end pipeline.
- Status: ✅ Complete.

## Day 4 — Core Feature Implementation (Core UI Build)
- Built the complete, polished UI — all 5 states (Empty, Loading, Results, No-Tasks-Found, Error).
- Wired the button to temporary fake data. Cleaned up an accidentally committed `files.zip`.
- Status: ✅ Complete.

## Day 5 — Continue Core Feature Development
- Built the real Gemini extraction prompt — structured JSON output, validated against 3 PRD sample cases.
- Replaced fake data with a real `fetch('/api/extract', ...)` call. Verified end-to-end, locally.
- Status: ✅ Complete.

## Day 6 — Complete the MVP & Deliver a Working Demo
- Added a production safety check for missing API key. Deployed live to Vercel.
- Debugged and resolved a real production configuration issue via live logs.
- **TaskSpark v1.0 MVP went live:** https://taskspark-six.vercel.app
- Status: ✅ Complete.

## Day 7 — Product Refinement & User Experience
- Refined the extraction prompt: vague scheduling language, small-talk resistance, multi-task date splitting. Verified against 3 new tricky test cases — all passed.
- Conducted a senior product/UX/engineering review; improved accessibility (ARIA live regions, focus states, reduced-motion support), added a live character counter, button loading spinner, staggered task card animation, and consistent SVG icons.
- Redeployed and fully verified all improvements live in production.
- Status: ✅ Complete.

## Day 8 — (Not yet started)
- Planned: Broader testing — cross-browser/device regression, edge cases (long input, special characters, network throttling), cleanup.

---

*This log is updated at the end of each day and lives in the `docs/` folder.*

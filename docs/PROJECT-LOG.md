# TaskSpark — Project Log

Running log of daily progress for the AB Talks 60-Day Claude AI Challenge capstone.

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
- Verified/configured development environment (Node, npm, Git, Vercel CLI).
- AI provider changed from Anthropic Claude to Google Gemini (builder decision).
- Fixed a Day 2 file-creation issue (PowerShell/cmd mismatch).
- Built and verified a minimal end-to-end "Hello World" pipeline.
- Status: ✅ Complete.

## Day 4 — Core Feature Implementation (Core UI Build)
- Built the complete, polished UI — all 5 states (Empty, Loading, Results, No-Tasks-Found, Error).
- Wired the button to temporary fake data to test all states before real AI integration.
- Cleaned up an accidentally committed `files.zip`; added `.gitignore` protection.
- Status: ✅ Complete.

## Day 5 — Continue Core Feature Development
- Built the real Gemini extraction prompt in `api/extract.js` — structured JSON output, validated against all 3 PRD sample cases.
- Replaced fake data in `script.js` with a real `fetch('/api/extract', ...)` call.
- Verified the full real pipeline end-to-end, locally.
- Status: ✅ Complete.

## Day 6 — Complete the MVP & Deliver a Working Demo
- Added a production safety check for missing `GEMINI_API_KEY`.
- Configured the Gemini API key as a Vercel Environment Variable.
- Deployed TaskSpark live to production: **https://taskspark-six.vercel.app**
- Debugged and resolved a real production issue: the environment variable didn't persist on first save, causing live extraction to fail with a clear, diagnosable error (caught via Vercel's live logs) — re-added, confirmed, and redeployed successfully.
- Fully verified the live site: real extraction, "no tasks" handling, empty-input warning, footer visibility — all confirmed working on the actual deployed URL.
- **TaskSpark v1.0 MVP is complete and publicly shareable.**
- Status: ✅ Complete.

## Day 7 — (Not yet started)
- Planned: Due date detection refinement & output hardening — wider test set, iterative prompt improvement, redeploy once refined.

---

*This log is updated at the end of each day and lives in the `docs/` folder.*

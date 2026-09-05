# TaskSpark

**Messy text in. Clear tasks out.**

TaskSpark is a stateless, single-page web app that uses AI to extract actionable tasks and due dates from unstructured text — pasted emails, meeting notes, or chat messages — and turns them into a clean, readable list in seconds.

🔗 **Live app:** https://taskspark-six.vercel.app
📦 **Repo:** https://github.com/Nidhisingh0z/taskspark

---

## How it works

1. Paste any messy block of text (an email, a note, a chat thread) into the box.
2. Click **Extract Tasks**.
3. TaskSpark sends the text to Google's Gemini API with a prompt engineered to identify actionable tasks and any associated due dates.
4. Tasks are displayed as clean cards, each with a due-date pill (or "No date" if none was mentioned).

There are no accounts, no sign-up, and nothing is saved — each session is independent. Paste text in, get tasks out, done.

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, vanilla JavaScript (no framework) |
| Backend | Single Node.js serverless function (`api/extract.js`) |
| AI | Google Gemini API (`gemini-3.5-flash-lite`) |
| Hosting | Vercel (free tier) |
| Database | None — the app is fully stateless by design |

## Why no database?

TaskSpark's v1.0 scope is deliberately minimal: no accounts, no saved history, no persistence. This keeps the app simple, fast, and free to run, and keeps the focus on the core value — fast, accurate extraction — rather than account management. See `docs/SCHEMA.md` for the full reasoning.

## Features

- Extracts multiple tasks and due dates from a single block of text, even with vague phrasing ("end of day," "whenever you get a chance")
- Handles small talk and filler text gracefully — reports "no tasks found" instead of hallucinating one
- Full loading, empty, results, no-tasks, and error states
- Offline detection with a clear in-app message (no reliance on browser error pages)
- Rate-limited backend (10 requests/minute per IP) to protect the free-tier API quota
- Accessible: ARIA live regions, visible keyboard focus states, WCAG AA color contrast
- Responsive design, works on mobile and desktop
- Respects `prefers-reduced-motion` for users sensitive to animation

## Running locally

**Prerequisites:** Node.js, npm, a free [Google Gemini API key](https://ai.google.dev/), and the [Vercel CLI](https://vercel.com/docs/cli).

```bash
git clone https://github.com/Nidhisingh0z/taskspark.git
cd taskspark
npm install
```

Create a `.env.local` file in the project root:

```
GEMINI_API_KEY=your_key_here
```

Then run:

```bash
vercel dev
```

Visit `http://localhost:3000`.

## Project documentation

Full day-by-day build documentation, architecture decisions, API contract, and UI wireframes are available in [`/docs`](./docs).

## Project background

TaskSpark was built as the 10-day capstone project for the **AB Talks 60-Day Claude AI Challenge**, taking the idea from initial requirements through system design, implementation, hardening, and production deployment.

## License

MIT — see [LICENSE](./LICENSE).

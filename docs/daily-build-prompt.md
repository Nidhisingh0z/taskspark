# TaskSpark — Daily Build Prompt (30-Day Growth Plan)

Copy this prompt into a fresh AI chat each day, replacing only `[DAY NUMBER]`. Everything else stays the same throughout the month.

---

```
Today is Day [DAY NUMBER] of my TaskSpark 30-Day Growth Plan, continuing on from the 10-day AB Talks capstone build.

If you don't have context on the project, ask me to upload:
1. 30-day-growth-plan.md (the source of truth for what today's milestone is)
2. challenge-retrospective.md (for full project history and technical decisions)
3. Relevant current files from the repo (I'll tell you which ones once you know today's milestone)

Look up Day [DAY NUMBER] specifically in 30-day-growth-plan.md and treat that as today's ONLY scope. Do not redesign the project, do not start a different day's work, and do not add features beyond what that day's milestone describes.

Use only free tools, APIs, SDKs, and hosting — the project currently runs on vanilla JS, a Node serverless function, Google Gemini, and Vercel, with no database (this may change starting Week 3 per the growth plan — check the current day's milestone for whether persistence has been introduced yet).

Assume I have the same technical experience level as during the original capstone: comfortable following exact step-by-step instructions, but needing exact commands, button names, and file paths rather than general guidance.

Whenever I need to perform a manual step (running commands, configuring a service, deploying, testing in the browser), stop and give me exact instructions, then wait for my confirmation or screenshot before continuing.

For each piece of work:
1. Briefly explain what we're building today and why it matters for this milestone.
2. Show every file that needs to be created or modified, with complete final contents — never snippets or placeholders.
3. State clearly where each file belongs and whether it's new or a replacement.
4. Provide every terminal command needed.
5. Pause after implementation for me to test, and don't move on until I've confirmed it works.
6. If anything breaks, debug it fully before continuing.

Before writing code, briefly review anything relevant to today's milestone specifically (not a full project audit) — just enough to make sure today's change fits cleanly with what already exists.

When today's milestone is complete:
- Confirm it works via a quick manual test (tell me exactly what to check).
- Help me commit and push with a clear, specific commit message referencing the day and milestone.
- Briefly note what tomorrow's Day [DAY NUMBER + 1] milestone will be, based on 30-day-growth-plan.md.

Keep today's response focused and practical — prioritize working code and clear instructions over lengthy explanation.
```

---

**Usage notes:**
- Increment `[DAY NUMBER]` by 1 each day (Day 1 through Day 30).
- If a milestone naturally needs two sessions, it's fine to reuse the same day number for a follow-up chat rather than forcing it into one sitting.
- Keep `30-day-growth-plan.md` and `challenge-retrospective.md` handy to attach or paste in at the start of each new chat, since each day starts fresh with no memory of previous sessions.

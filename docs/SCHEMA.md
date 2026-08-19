# TaskSpark — Data / Schema Design

**Day 2 deliverable.**

---

## 1. Decision: No Database in v1.0

TaskSpark v1.0 is explicitly stateless. Per the approved PRD (Section 5, "Out of Scope") and the Day 1 discovery interview, the builder confirmed one-time, non-persisted results are sufficient: *"No, one-time result is fine each time."*

There are no tables, collections, or persistent records in this system. Every extraction is:
1. Received by the serverless function as a request payload
2. Sent to Claude
3. Returned to the browser
4. Held only in the browser's in-memory JavaScript state (a JS variable/array) until the page is refreshed or a new extraction is run

No data is written to disk, a database, or any storage service at any point.

---

## 2. Validation Against Every User Story

This table walks every user story from the PRD and confirms it is fully satisfiable with zero persistent storage — proving the "no database" decision isn't a shortcut, it's the correct scope.

| User Story | Requires persistence? | Why / why not |
|---|---|---|
| US-1 — paste an email, get a task list | No | The task list only needs to exist for the current session; the user reads/copies it immediately. |
| US-2 — see deadlines pulled out of a chat thread | No | Same as above — a single in-memory render satisfies the need. |
| US-3 — first-time visitor understands the tool instantly | No | This is a UI/copy requirement (empty state), not a data requirement. |
| US-4 — judge sees a fast before/after transformation | No | The transformation is the API response itself, rendered once; nothing needs to be saved for this to be impressive. |
| US-5 — user gets a clear "no tasks found" message | No | This is a response-handling requirement, not a storage requirement. |

**Conclusion:** all 5 user stories, and all 10 functional requirements (FR-1–FR-10), are fully satisfied without a database. Introducing one would add build time, deployment complexity (a DB provider, connection secrets, schema migrations) and attack surface for zero product benefit in v1.0 — a direct violation of the "protect against scope creep" instruction from Day 1.

---

## 3. In-Memory "Shape" of the Data (Not Persisted)

Although nothing is stored, it's still useful to define the shape of data as it moves through the app, since this *is* what Day 4–5 will implement.

### Request payload (browser → `/api/extract`)
```json
{
  "text": "string — the raw pasted text, required, non-empty"
}
```

### Response payload (`/api/extract` → browser)
```json
{
  "tasks": [
    {
      "task": "string — the extracted action item",
      "dueDate": "string or null — detected date/deadline phrase, or null if none found"
    }
  ]
}
```

### Error response payload
```json
{
  "error": "string — a short, user-friendly error message"
}
```

This shape is the single contract between frontend and backend and is authoritative for `API.md`.

---

## 4. Future Scope Note (Not Built Now)

If TaskSpark ever grows into a v2.0 with saved history (explicitly deferred in PRD Section 12), a minimal future schema might look like:

```
Extraction
├── id (primary key)
├── created_at (timestamp)
├── source_text (text)
└── tasks (JSON array of { task, dueDate })
```

This is documented here only for future reference — **it is not part of the v1.0 build** and should not be implemented during Days 3–10 unless the PRD is formally revised.

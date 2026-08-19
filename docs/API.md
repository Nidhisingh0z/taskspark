# TaskSpark — API Design

**Day 2 deliverable. No implementation yet — this is the contract Day 4 will build against.**

---

## Overview

TaskSpark v1.0 requires exactly **one API endpoint**. This is intentional: the entire product is "send text, get structured tasks back." Adding more endpoints (health checks, config, etc.) would be scope creep against the locked PRD.

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/extract` | `POST` | Extract tasks + due dates from raw pasted text |

---

## `POST /api/extract`

### Purpose
Accepts raw, unstructured text and returns a structured list of extracted tasks, each with a detected due date (or `null` if none was mentioned).

### Authentication
**None.** This endpoint is public — there are no user accounts in v1.0 (PRD Section 5). The Anthropic API key is never exposed to the client; it lives only as a server-side environment variable inside this function.

### Request

**Headers**
```
Content-Type: application/json
```

**Body**
```json
{
  "text": "Hey can you send the deck by Friday, and don't forget we need the budget numbers from Raj before the Monday meeting"
}
```

| Field | Type | Required | Notes |
|---|---|---|---|
| `text` | string | Yes | The raw, unstructured text to extract tasks from. |

### Validation Rules
- `req.method` must be `POST` — any other method is rejected.
- `req.body.text` must exist and be a non-empty string after trimming whitespace.
- A reasonable max length should be enforced (recommend ~5,000 characters) to keep latency and cost predictable and to prevent abuse — reject anything longer with a clear error rather than silently truncating.

### Success Response — `200 OK`
```json
{
  "tasks": [
    { "task": "Send the deck", "dueDate": "Friday" },
    { "task": "Get budget numbers from Raj", "dueDate": "Monday (before meeting)" }
  ]
}
```

If no actionable tasks are found in the text:
```json
{
  "tasks": []
}
```
(The frontend is responsible for turning an empty array into the "No actionable tasks found" UI state — the API itself does not distinguish this as an error.)

### Error Responses

| Status | When | Body |
|---|---|---|
| `400 Bad Request` | Missing/empty `text`, wrong content type, or method other than `POST` | `{ "error": "Please provide some text to extract tasks from." }` |
| `413 Payload Too Large` | `text` exceeds the max length limit | `{ "error": "That text is too long — please shorten it and try again." }` |
| `502 Bad Gateway` | Claude API call fails, or its response can't be parsed as valid JSON | `{ "error": "Something went wrong extracting your tasks. Please try again." }` |
| `504 Gateway Timeout` | Claude API call exceeds the internal timeout (recommend ~15s, per Day 6 of the Implementation Blueprint) | `{ "error": "That took too long — please try again." }` |
| `500 Internal Server Error` | Any unexpected/unhandled exception | `{ "error": "Something went wrong on our end. Please try again." }` |

Every error case returns a consistent `{ "error": "..." }` shape so the frontend only needs one error-handling code path (built Day 5, refined Day 7).

### Example: cURL Test (for manual testing on Day 4)
```bash
curl -X POST https://your-deployment-url/api/extract \
  -H "Content-Type: application/json" \
  -d '{"text":"remember to call the dentist, pick up groceries tomorrow, and finish the report asap"}'
```

---

## Non-Endpoints (Explicitly Not Built)

To protect scope, the following are **not** part of v1.0's API surface, consistent with the PRD's "Out of Scope" list:

- No `/api/history` or any GET endpoint for past extractions (no persistence)
- No `/api/auth/*` endpoints (no accounts)
- No `/api/tasks/:id` update/delete endpoints (no task management inside the app)
- No file/image upload endpoint (text-only input)

If any of these seem tempting to add during implementation, check them against PRD Section 5 first — they belong in Section 12 (Future Scope), not in this build.

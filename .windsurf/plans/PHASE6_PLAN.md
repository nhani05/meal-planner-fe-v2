# Phase 6 Implementation Plan: User Feedback & Cleanup

> Add user feedback form and history to Settings page, clean up any remaining mock references, and finalize integration.  
> **Estimated time:** 1–1.5 hours.

---

## Decisions Made

| Topic | Decision | Rationale |
|---|---|---|
| **Feedback location** | New section at the end of `Settings.jsx` | Keeps user settings in one place; no new route or sidebar link needed. |
| **BE status** | `GET /feedbacks` and `POST /feedbacks` are ⏳ BE pending | Implement API layer and UI anyway; show graceful error / "coming soon" message if 404. |
| **Cleanup scope** | Verify no stale imports, no mock files remain | `mockData.js` and `AppContext.jsx` already don't exist; verify imports in all pages. |

---

## File Structure

```
src/
  api/
    feedbackApi.js           ← NEW (getMyFeedbacks, sendFeedback)
  pages/
    Settings.jsx             ← MODIFY (add Feedback section)
  App.jsx                    ← No changes
  main.jsx                   ← No changes (already clean)
```

---

## 1. API Layer — `src/api/feedbackApi.js`

```js
import axiosInstance from './axiosInstance';

export const getMyFeedbacks = () => axiosInstance.get('/feedbacks');
export const sendFeedback = (content) => axiosInstance.post('/feedbacks', { content });
```

> **Note:** BE endpoints are pending. API functions will return 404 until backend is ready.

---

## 2. Settings.jsx — Add Feedback Section

Add a new card section at the end of the page (after Change Password):

**UI:**
- Header: MessageSquare icon + "Feedback"
- Textarea (max 500 chars) + character counter
- "Send Feedback" button (primary green)
- List of previous feedbacks below (if any):
  - Content (truncated if long)
  - Status badge (`pending` = yellow, `resolved` = green, `rejected` = red)
  - Submitted date

**State:**
```js
const [feedbackContent, setFeedbackContent] = useState('');
const [feedbacks, setFeedbacks] = useState([]);
const [loading, setLoading] = useState(false);
const [submitting, setSubmitting] = useState(false);
```

**Behavior:**
1. On mount: call `getMyFeedbacks()` — if 404, set empty array and show info toast "Feedback history unavailable".
2. On submit: validate non-empty, call `sendFeedback(content)` — on success, prepend to list, clear textarea, show success toast. On 404, show toast "Feature coming soon".

**Empty state:** "You haven't submitted any feedback yet."

---

## 3. Cleanup Verification

Run these checks to ensure no stale mock references:

```bash
# Search for any remaining mock imports
grep -r "mockData\|AppContext" src/

# If found, remove/replace them
```

Since `src/data/mockData.js` and `src/context/AppContext.jsx` don't exist, and `main.jsx` has no `AppProvider`, cleanup should be minimal.

---

## 4. Testing Checklist

| # | Step | Expected |
|---|------|----------|
| 1 | Open `/settings` | Feedback section visible at bottom |
| 2 | Type feedback and submit | POST `/feedbacks` fires; on 404 show "coming soon" toast |
| 3 | Load feedback history | GET `/feedbacks` fires; on 404 show empty list with info message |
| 4 | `npm run build` | Success, no errors |
| 5 | Check console | No warnings about missing imports |

---

## 5. Risk Mitigation

| Risk | Mitigation |
|---|---|
| **BE not ready (404)** | Catch 404 errors in component, show user-friendly "Feedback feature coming soon" instead of crashing. |
| **No existing feedbacks** | Empty state with friendly copy. |
| **Long feedback text** | Max 500 chars in textarea, show counter. |


# Health Goal: Option B — Expand Backend Enums to Match Frontend

Expand `GoalType` and `ActivityLevel` enums in the backend (Java + DB) to fully support all values the frontend currently sends.

---

## Target Enum Values

### `goalType`
| Value stored in DB | Java enum constant | FE sends |
|---|---|---|
| `weight_loss` | `WEIGHT_LOSS` | `weight_loss` ✅ |
| `muscle_gain` | `MUSCLE_GAIN` | `muscle_gain` ✅ |
| `maintain` | `MAINTAIN` | *(kept for backward compat)* |
| `maintenance` | `MAINTENANCE` | `maintenance` ✅ fix |
| `endurance` | `ENDURANCE` | `endurance` ✅ fix |

### `activityLevel`
| Value stored in DB | Java enum constant | FE sends |
|---|---|---|
| `low` | `LOW` | *(kept)* |
| `medium` | `MEDIUM` | *(kept)* |
| `high` | `HIGH` | *(kept)* |
| `sedentary` | `SEDENTARY` | `sedentary` ✅ fix |
| `light` | `LIGHT` | `light` ✅ fix |
| `moderate` | `MODERATE` | `moderate` ✅ fix |
| `active` | `ACTIVE` | `active` ✅ fix |
| `very_active` | `VERY_ACTIVE` | `very_active` ✅ fix |

---

## Files to Change

### Backend (BE)

1. **`GoalType.java`** — add `MAINTENANCE("maintenance")` and `ENDURANCE("endurance")`
2. **`ActivityLevel.java`** — add `SEDENTARY`, `LIGHT`, `MODERATE`, `ACTIVE`, `VERY_ACTIVE`
3. **`EnumConverters.java`** — no logic change needed (already uses `equalsIgnoreCase` loop)

### Database

4. **`meal_planner_schema.sql`** — update `ENUM` columns in `tblHealthGoal`:
   - `goal_type`: add `'maintenance'`, `'endurance'`
   - `activity_level`: add `'sedentary'`, `'light'`, `'moderate'`, `'active'`, `'very_active'`
5. **Run ALTER TABLE** on the live DB (SQL script provided)

### Frontend (FE)

6. **`validators.js`** — update `healthGoalSchema` default values to match (no structural change needed since FE values already match new BE)
7. **`Settings.jsx`** — default `goalType` value change: `'maintenance'` (already correct), default `activityLevel`: `'moderate'` (already correct)

> FE validators.js and Settings.jsx are already correct — no changes needed there if BE is expanded.

---

## DB Migration SQL

```sql
ALTER TABLE tblHealthGoal
  MODIFY COLUMN goal_type ENUM('weight_loss','muscle_gain','maintain','maintenance','endurance') NOT NULL,
  MODIFY COLUMN activity_level ENUM('low','medium','high','sedentary','light','moderate','active','very_active') NOT NULL DEFAULT 'medium';
```

---

## Execution Order

1. BE: `GoalType.java`
2. BE: `ActivityLevel.java`
3. DB: Run ALTER TABLE migration
4. DB: Update `meal_planner_schema.sql` to reflect new schema
5. Restart Spring Boot app
6. Verify FE "Save Health Goal" no longer errors

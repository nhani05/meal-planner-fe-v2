# Module 1: Account Management - Implementation Plan

Implement the missing "5 failed login attempts = account lockout" business rule for UC02.

## Findings Summary

**Status:** UC01, UC03, UC04, UC05, UC06 are fully implemented per specification.

**Gap:** UC02 is missing the critical business rule: "Sai quá 5 lần khóa tài khoản" (Account lockout after 5 failed attempts).

## Implementation Plan

### Phase 1: Backend - Login Attempt Tracking

**Files to modify:**
- `@/d:/OneDrive - ptit.edu.vn/Documents/meal-planner-system/meal-planner-system/src/main/java/com/example/javaweb/meal_planner_system/entity/UserAccount.java` - Add fields for login attempt tracking
- `@/d:/OneDrive - ptit.edu.vn/Documents/meal-planner-system/meal-planner-system/src/main/java/com/example/javaweb/meal_planner_system/controller/AuthController.java` - Update login logic with attempt counting
- `@/d:/OneDrive - ptit.edu.vn/Documents/meal-planner-system/meal-planner-system/src/main/java/com/example/javaweb/meal_planner_system/service/UserAccountService.java` - Add method signatures
- `@/d:/OneDrive - ptit.edu.vn/Documents/meal-planner-system/meal-planner-system/src/main/java/com/example/javaweb/meal_planner_system/service/impl/UserAccountServiceImpl.java` - Implement lockout logic

**Changes needed:**
1. Add `failedLoginAttempts` (int, default 0) and `lockedUntil` (LocalDateTime, nullable) to UserAccount entity
2. Update login endpoint to:
   - Check if account is locked before validating password
   - Increment failed attempts on wrong password
   - Lock account for 30 minutes when attempts reach 5
   - Reset failed attempts to 0 on successful login

### Phase 2: Frontend - Lockout UI Feedback

**Files to modify:**
- `@/d:/OneDrive - ptit.edu.vn/Documents/meal-planner-v2-fe/src/pages/auth/Login.jsx` - Display lockout message with remaining time

**Changes needed:**
1. Parse lockout error from backend
2. Show countdown timer or "Account locked until X" message
3. Disable login button during lockout period

### Database Migration (if needed)

Add columns to `tblUserAccount`:
```sql
ALTER TABLE tblUserAccount ADD COLUMN failed_login_attempts INT DEFAULT 0;
ALTER TABLE tblUserAccount ADD COLUMN locked_until TIMESTAMP NULL;
```

## Verification Checklist

- [ ] UserAccount entity has new fields
- [ ] Login fails with specific message when account is locked
- [ ] Failed attempts increment on wrong password
- [ ] Account locks after 5th failed attempt
- [ ] Lockout expires after 30 minutes
- [ ] Successful login resets failed attempts to 0
- [ ] Frontend displays clear lockout message with time

## Estimated Effort

- Backend changes: 2 hours
- Frontend changes: 1 hour
- Testing: 1 hour

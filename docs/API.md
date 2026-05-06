# 📋 API Endpoints — Meal Planner System

**Base URL:** `http://localhost:8081/api`  
**Content-Type:** `application/json`  
**Auth Header:** `Authorization: Bearer <JWT_TOKEN>` (trừ endpoint công khai)

---

## Mục lục

1. [Quy ước chung](#1-quy-ước-chung)
2. [Auth — Xác thực](#2-auth--xác-thực)
3. [Health Profile — Hồ sơ sức khỏe](#3-health-profile)
4. [Health Goal — Mục tiêu sức khỏe](#4-health-goal)
5. [Dishes — Món ăn](#5-dishes)
6. [Dish Categories](#6-dish-categories)
7. [Dish Ratings](#7-dish-ratings)
8. [Feedbacks — Phản hồi người dùng](#8-feedbacks--phản-hồi-người-dùng-user)
9. [Favorites — Yêu thích](#9-favorites--yêu-thích)
10. [Ingredients — Nguyên liệu](#10-ingredients)
11. [Meal Plans — Kế hoạch bữa ăn](#11-meal-plans--kế-hoạch-bữa-ăn)
12. [Meals — Bữa ăn](#12-meals--bữa-ăn)
13. [Portions — Khẩu phần](#13-portions--khẩu-phần)
14. [Meal Plan Templates](#14-meal-plan-templates)
15. [Admin](#15-admin)
16. [Bảng so sánh BE vs FE](#16-bảng-so-sánh-be-vs-fe)
17. [Enum Values](#17-enum-values)

---

## 1. Quy ước chung

### Error Response (mọi endpoint)

```json
{
  "status": 400,
  "message": "Mô tả lỗi cụ thể",
  "timestamp": 1746345600000
}
```

| HTTP Status | Khi nào |
|---|---|
| `200 OK` | Thành công (GET, PUT, POST) |
| `204 No Content` | Xóa thành công (DELETE) |
| `400 Bad Request` | Validation failed |
| `401 Unauthorized` | Chưa đăng nhập / JWT hết hạn |
| `403 Forbidden` | Không đủ quyền |
| `404 Not Found` | Tài nguyên không tồn tại |
| `500 Internal Server Error` | Lỗi server |

---

## 2. Auth — Xác thực

### 2.1 `POST /auth/register` ✅ BE + FE

> **Auth:** Không yêu cầu

**Request:**
```json
{
  "username": "tester1",
  "email": "tester1@example.com",
  "password": "P@ssw0rd",
  "passwordConfirm": "P@ssw0rd"
}
```

**Response 200:**
```json
{
  "id": 1,
  "username": "tester1",
  "email": "tester1@example.com",
  "role": "user",
  "status": "active"
}
```

**Errors:** `400` — `"Passwords do not match"` / `"Username already exists"` / `"Email already exists"`

---

### 2.2 `POST /auth/login` ✅ BE + FE

> **Auth:** Không yêu cầu

**Request:**
```json
{
  "username": "tester1",
  "password": "P@ssw0rd"
}
```

**Response 200:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "user": {
    "id": 1,
    "username": "tester1",
    "email": "tester1@example.com",
    "role": "user",
    "status": "active"
  }
}
```

> [!IMPORTANT]
> FE `authService.js` comment ghi response là `{ token, tokenType, expiresIn, role, userId }` — **SAI**. BE thực tế trả `{ token, user: {...} }`. FE cần đọc `response.data.token` và `response.data.user`.

**Errors:** `400` — `"Invalid username or password"`

---

### 2.3 `GET /auth/user/{id}` ✅ BE + FE

> **Auth:** Bearer Token

**Response 200:**
```json
{
  "id": 1,
  "username": "tester1",
  "email": "tester1@example.com",
  "role": "user",
  "status": "active"
}
```

**Errors:** `404` — `"UserAccount not found with id {id}"`

---

### 2.4 `POST /auth/logout` ✅ BE + FE

> **Auth:** Không yêu cầu (client-side token removal)

Logout xử lý client-side (xóa token khỏi store). BE trả `200 OK` xác nhận.

**Response 200:**
```json
{ "message": "Logged out successfully" }
```

---

### 2.5 `POST /auth/forgot-password` ✅ BE + FE

> **Auth:** Không yêu cầu

**Request:** `{ "email": "user@example.com" }`

**Response 200:**
```json
{
  "message": "If the email exists, an OTP has been sent",
  "devOtp": "123456"
}
```

> **Lưu ý:** `devOtp` chỉ có trong môi trường dev. Production sẽ gửi OTP qua email.

---

### 2.6 `POST /auth/verify-otp` ✅ BE + FE

> **Auth:** Không yêu cầu

**Request:** `{ "email": "user@example.com", "otp": "123456" }`

**Response 200:**
```json
{ "message": "OTP verified successfully" }
```

**Errors:** `400` — `"Invalid email or OTP"` / `"OTP has expired"`

---

### 2.7 `POST /auth/reset-password` ✅ BE + FE

> **Auth:** Không yêu cầu

**Request:** `{ "token": "123456", "newPassword": "NewP@ss" }`

**Response 200:**
```json
{ "message": "Password reset successfully" }
```

**Errors:** `400` — `"Invalid token"` / `"Token has expired"` / `"Token has already been used"`

---

### 2.8 `PUT /auth/change-password` ✅ BE + FE

> **Auth:** Bearer Token

**Request:** `{ "oldPassword": "...", "newPassword": "..." }`

**Response 200:**
```json
{ "message": "Password changed successfully" }
```

**Errors:** `400` — `"Old password is incorrect"`

---

## 3. Health Profile

### 3.1 `GET /health-profile/{accountId}` ✅ BE + FE

> **Auth:** Bearer Token

**Response 200:**
```json
{
  "id": 1,
  "fullName": "Nguyen Van A",
  "age": 30,
  "gender": "male",
  "heightCm": 175.00,
  "weightKg": 70.00,
  "avatarUrl": "https://example.com/avatar.jpg"
}
```

**Errors:** `404` — `"Health profile not found for account {accountId}"`

---

### 3.2 `POST /health-profile/{accountId}` ✅ BE + FE

> **Auth:** Bearer Token — Tạo mới hoặc cập nhật

**Request:**
```json
{
  "fullName": "Nguyen Van A",
  "age": 30,
  "gender": "male",
  "heightCm": 175.00,
  "weightKg": 70.00,
  "avatarUrl": "https://example.com/avatar.jpg"
}
```

**Response 200:** (trả HealthProfileDTO đã lưu — cùng format GET)

---

## 4. Health Goal

### 4.1 `GET /health-goal/{accountId}` ✅ BE + FE

**Response 200:**
```json
{
  "id": 1,
  "goalType": "weight_loss",
  "activityLevel": "medium",
  "targetWeightKg": 65.0,
  "dailyCaloriesKcal": 1800,
  "proteinGDay": 120.0,
  "carbGDay": 200.0,
  "fatGDay": 60.0
}
```

---

### 4.2 `POST /health-goal/{accountId}` ✅ BE + FE

**Request:**
```json
{
  "goalType": "weight_loss",
  "activityLevel": "medium",
  "targetWeightKg": 65.0,
  "dailyCaloriesKcal": 1800,
  "proteinGDay": 120.0,
  "carbGDay": 200.0,
  "fatGDay": 60.0
}
```

**Response 200:** (HealthGoalDTO đã lưu)

---

## 5. Dishes — Món ăn

### 5.1 `GET /dishes` ✅ BE + FE (Filter ⏳ BE chưa implement)

> **Auth:** Bearer Token

**Query Params:**
- `keyword` — tìm kiếm theo tên món (optional, case-insensitive)
- `categoryId` — lọc theo danh mục (optional)
- `minCal` — lọc calo tối thiểu trên 100g (optional)
- `maxCal` — lọc calo tối đa trên 100g (optional)
- `page` — số trang (default: 0)
- `size` — số lượng mỗi trang (default: 20)

**Response 200:**
```json
{
  "content": [
    {
      "id": 1,
      "name": "Grilled Chicken",
      "categoryId": 1,
      "imageUrl": "https://example.com/chicken.jpg",
      "source": "system",
      "difficulty": "easy",
      "totalTimeMin": 45
    }
  ],
  "totalElements": 1,
  "totalPages": 1
}
```

> [!NOTE]
> FE `dishService.getDishes()` gửi query params `{ keyword, categoryId, minCal, maxCal, page, size }` — nhưng BE hiện tại **không hỗ trợ filter/phân trang**, trả toàn bộ danh sách. Cần bổ sung `Specification<Dish>` hoặc JPQL query.

---

### 5.2 `GET /dishes/{id}` ✅ BE + FE

**Response 200:** (1 DishDTO — cùng format trên)

**Errors:** `404` — `"Dish not found with id {id}"`MA

---

### 5.3 `GET /dishes/system` ✅ BE only

Lấy danh sách món `source = "system"`. FE chưa gọi trực tiếp.

---

### 5.4 `GET /dishes/account/{accountId}` ✅ BE only

Lấy danh sách món `source = "custom"` của user. FE chưa gọi trực tiếp.

---

### 5.5 `POST /dishes` ✅ BE + FE (Auto-calc Nutrition ⏳ BE chưa implement)

> **Auth:** Bearer Token

**Request (cơ bản — giữ nguyên):**
```json
{
  "name": "Grilled Chicken",
  "categoryId": 1,
  "imageUrl": "https://example.com/chicken.jpg",
  "source": "custom",
  "difficulty": "easy",
  "totalTimeMin": 45
}
```

**Request (nâng cao — UR-14: Custom Dish + Ingredients → Auto Nutrition):**
```json
{
  "name": "Salad ức gà tự làm",
  "categoryId": 3,
  "imageUrl": "https://example.com/salad.jpg",
  "source": "custom",
  "difficulty": "easy",
  "totalTimeMin": 20,
  "ingredients": [
    { "name": "Chicken Breast", "quantityG": 200.0, "unit": "g" },
    { "name": "Lettuce", "quantityG": 100.0, "unit": "g" },
    { "name": "Olive Oil", "quantityG": 10.0, "unit": "ml" }
  ]
}
```

> **Logic:** Nếu request chứa `ingredients[]`, hệ thống tự động tính `NutritionInfo` (caloriesPer100g, proteinPer100g, carbPer100g, fatPer100g) từ tổng nguyên liệu và lưu vào `tblNutritionInfo`.

**Response 200:** (DishDTO đã lưu)

**Errors:** `400` — `"Dish name is required"` / `"Ingredients cannot be empty"`

---

### 5.6 `PUT /dishes/{id}` ✅ BE + FE

**Request:** (cùng format POST, chỉ gửi trường cần update)

**Response 200:** (DishDTO đã cập nhật)

**Errors:** `404` — `"Dish not found with id {id}"`

---

### 5.7 `DELETE /dishes/{id}` ✅ BE + FE

**Response 204 No Content** (không có body)

> [!WARNING]
> FE `dishService.deleteDish()` đang `return response.data` — sẽ là `undefined` vì 204 không có body. FE nên kiểm tra `response.status === 204`.

**Errors:** `404` — `"Dish not found with id {id}"`

---

## 6. Dish Categories

### 6.1 `GET /dish-categories` ✅ BE + FE

**Response 200 (expected):**
```json
[
  { "id": 1, "name": "Cơm" },
  { "id": 2, "name": "Canh" }
]
```

---

## 7. Dish Ratings

### 7.1 `POST /dishes/{dishId}/ratings` ✅ BE + FE

**Request:**
```json
{
  "score": 5,
  "comment": "Rất ngon!"
}
```

---

### 7.2 `GET /dishes/{dishId}/ratings` ✅ BE + FE

**Response 200:**
```json
[
  {
    "id": 1,
    "accountId": 1,
    "dishId": 5,
    "score": 5,
    "comment": "Rất ngon!"
  }
]
```

---

## 8. Feedbacks — Phản hồi người dùng (User)

### 8.1 `POST /feedbacks` ⏳ BE chưa implement

> **Auth:** Bearer Token

**Request:**
```json
{
  "content": "Ứng dụng rất hay, nhưng cần thêm tính năng gợi ý món ăn"
}
```

**Response 201:**
```json
{
  "id": 1,
  "accountId": 5,
  "content": "Ứng dụng rất hay, nhưng cần thêm tính năng gợi ý món ăn",
  "status": "pending",
  "submittedAt": "2026-05-06T08:00:00Z"
}
```

**Errors:** `400` — `"Content is required"`

---

### 8.2 `GET /feedbacks` ⏳ BE chưa implement

> **Auth:** Bearer Token — Chỉ trả phản hồi của user đang đăng nhập

**Response 200:**
```json
[
  {
    "id": 1,
    "accountId": 5,
    "content": "Ứng dụng rất hay",
    "status": "pending",
    "submittedAt": "2026-05-06T08:00:00Z"
  }
]
```

---

## 9. Favorites — Yêu thích

### 9.1 `GET /favorites/account/{accountId}` ✅ BE + FE

**Response 200:**
```json
[
  {
    "id": 1,
    "name": "Grilled Chicken",
    "categoryId": 1,
    "imageUrl": "https://example.com/chicken.jpg",
    "source": "system",
    "difficulty": "easy",
    "totalTimeMin": 45
  }
]
```

---

### 9.2 `POST /favorites/account/{accountId}/{dishId}` ✅ BE + FE

**Response 200:** (Thành công)

---

### 9.3 `DELETE /favorites/account/{accountId}/{dishId}` ✅ BE + FE

**Response 204 No Content**

---

## 10. Ingredients — Nguyên liệu

### 10.1 `GET /ingredients` — Query: `{ page, size, search }` ✅ BE + FE

> **Auth:** Bearer Token

**Query Params:**
- `page` — số trang (default: 0)
- `size` — số lượng mỗi trang (default: 20)
- `search` — tìm kiếm theo tên (optional, case-insensitive)

**Response 200:** (Paginated IngredientDTO)
```json
{
  "content": [
    { "id": 1, "dishId": 5, "name": "Chicken Breast", "quantityG": 500.0, "unit": "g" }
  ],
  "pageable": { "pageNumber": 0, "pageSize": 20 },
  "totalElements": 1,
  "totalPages": 1
}
```

### 10.2 `GET /ingredients/{id}` ✅ BE only

### 10.3 `POST /ingredients` ✅ BE only

### 10.4 `PUT /ingredients/{id}` ✅ BE only

### 10.5 `DELETE /ingredients/{id}` ✅ BE only

**IngredientDTO format:**
```json
{
  "id": 1,
  "dishId": 5,
  "name": "Ức gà",
  "quantityG": 200.00,
  "unit": "g"
}
```

---

## 11. Meal Plans — Kế hoạch bữa ăn

### 11.1 `GET /meal-plans/account/{accountId}` ✅ BE + FE

> **Auth:** Bearer Token

**Response 200:**
```json
[
  {
    "id": 1,
    "planName": "Lunch Plan",
    "planDate": "2026-05-03"
  }
]
```

---

### 11.2 `GET /meal-plans/account/{accountId}/date/{planDate}` ✅ BE + FE

**Path:** `planDate` format `yyyy-MM-dd`

**Response 200:** (1 MealPlanDTO)

**Errors:** `404` — `"MealPlan not found for account {id} on {date}"`

---

### 11.3 `GET /meal-plans/{id}` ✅ BE + FE

> **Auth:** Bearer Token

**Response 200:** (MealPlanDTO)
```json
{
  "id": 1,
  "planName": "Gym Diet Plan",
  "planDate": "2026-05-04"
}
```

**Errors:** `404` — `"MealPlan not found with id {id}"`

---

### 11.4 `POST /meal-plans?accountId={accountId}` ✅ BE + FE

> **Auth:** Bearer Token — `accountId` là **query param**

**Request:**
```json
{
  "planName": "Lunch Plan",
  "planDate": "2026-05-03"
}
```

**Response 200:** (MealPlanDTO đã tạo)

---

### 11.5 `PUT /meal-plans/{id}` ✅ BE + FE (Nested Update ⏳ BE chưa implement)

> **Auth:** Bearer Token

**Request (cơ bản — giữ nguyên):**
```json
{
  "planName": "Lunch Plan Updated",
  "planDate": "2026-05-03"
}
```

**Request (nâng cao — UR-09: Chỉnh sửa cấu trúc bữa ăn bên trong):**
```json
{
  "planName": "Lunch Plan Updated",
  "planDate": "2026-05-03",
  "meals": [
    {
      "mealType": "breakfast",
      "portions": [
        { "dishId": 5, "quantityG": 200.0 },
        { "dishId": 8, "quantityG": 150.0 }
      ]
    },
    {
      "mealType": "lunch",
      "portions": [
        { "dishId": 3, "quantityG": 300.0 }
      ]
    }
  ]
}
```

> **Logic:**
> - So sánh `meals[]` gửi lên với DB: giữ nguyên portions không đổi, thêm mới, xóa thiếu, cập nhật `quantityG`.
> - Tự động recalculate dinh dưỡng cho các portions bị thay đổi.
> - Trả về `MealPlanDTO` đầy đủ với `meals[]` và `portions[]` đã cập nhật.

**Response 200:** (MealPlanDTO đã cập nhật)

**Errors:** `404` — `"MealPlan not found with id {id}"` / `400` — `"Invalid meal type or portion data"`

---

### 11.6 `DELETE /meal-plans/{id}` ✅ BE + FE

**Response 204 No Content**

---

## 12. Meals — Bữa ăn

> **Endpoint trung gian được dùng trong Portions**

### 12.1 `GET /meal-plans/{planId}/meals` ✅ BE + FE

> **Auth:** Bearer Token

**Response 200:**
```json
[
  {
    "id": 1,
    "mealPlanId": 10,
    "mealType": "breakfast"
  },
  {
    "id": 2,
    "mealPlanId": 10,
    "mealType": "lunch"
  }
]
```

---

## 13. Portions — Khẩu phần

### 13.1 `GET /meal-plans/{planId}/meals/{mealType}/portions` ✅ BE + FE

> **Auth:** Bearer Token

> **Mục đích:** Lấy danh sách khẩu phần của một bữa ăn (breakfast/lunch/dinner/snack) trong kế hoạch. Frontend gọi endpoint này khi mở lại kế hoạch để load dữ liệu khẩu phần đã lưu.

**Response 200:**
```json
[
  {
    "id": 1,
    "mealId": 3,
    "dishId": 5,
    "quantityG": 200.0,
    "caloriesKcal": 330.0,
    "proteinG": 62.0,
    "carbG": 0.0,
    "fatG": 7.2
  }
]
```

> [!NOTE]
> - Trả về mảng rỗng `[]` nếu bữa ăn chưa có khẩu phần nào (không trả 404).
> - `mealType` nhận giá trị: `breakfast`, `lunch`, `dinner`, `snack` (lowercase).

---

### 13.2 `POST /meal-plans/{planId}/meals/{mealType}/portions` ✅ BE + FE

**Request:**
```json
{
  "dishId": 5,
  "quantityG": 200.0
}
```

**Response 200:**
```json
{
  "id": 1,
  "mealId": 3,
  "dishId": 5,
  "quantityG": 200.0,
  "caloriesKcal": 330.0,
  "proteinG": 62.0,
  "carbG": 0.0,
  "fatG": 7.2
}
```

---

### 13.3 `PUT /meal-plans/{planId}/meals/{mealType}/portions/{portionId}` ✅ BE + FE

**Request:**
```json
{
  "quantityG": 250.0
}
```

**Response 200:** (PortionDTO đã cập nhật)

---

### 13.3 `DELETE /meal-plans/{planId}/meals/{mealType}/portions/{portionId}` ✅ BE + FE

**Response 204 No Content**

---

## 14. Meal Plan Templates

### 14.1 `GET /meal-plan-templates?accountId={id}` ✅ BE + FE

> **Auth:** Bearer Token

**Response 200:**
```json
[
  {
    "id": 1,
    "templateName": "Gym Day Diet",
    "savedAt": "2026-05-01T10:00:00Z"
  }
]
```

---

### 14.2 `POST /meal-plan-templates?accountId={id}` ⏳ BE chưa implement

> **Auth:** Bearer Token

**Request:**
```json
{
  "templateName": "Gym Day Diet",
  "sourcePlanId": 10
}
```

> **Note:** `sourcePlanId` là ID của `MealPlan` hiện có cần sao chép thành template.

**Response 201:**
```json
{
  "id": 2,
  "templateName": "Gym Day Diet",
  "savedAt": "2026-05-06T10:00:00Z"
}
```

**Errors:** `404` — `"Source meal plan not found or not owned by user"`

---

### 14.3 `DELETE /meal-plan-templates/{id}` ⏳ BE chưa implement

> **Auth:** Bearer Token

**Response 204 No Content**

**Errors:** `404` — `"Template not found"` / `403` — `"You do not own this template"`

---

## 15. Admin

### 15.1 `GET /admin/statistics?startDate=&endDate=` ✅ BE + FE

**Response 200:**
```json
{
  "totalUsers": 150,
  "totalDishes": 500,
  "activePlansToday": 45,
  "newFeedbacks": 5
}
```

---

### 15.2 `GET /admin/users?keyword=&status=&page=&size=` ✅ BE + FE

**Response 200:**
```json
{
  "content": [
    { "id": 1, "username": "user1", "email": "user1@a.com", "role": "user", "status": "active" }
  ],
  "totalPages": 5,
  "totalElements": 100
}
```

---

### 15.3 `GET /admin/users/{id}` ✅ BE + FE

> **Auth:** Bearer Token (Admin only)

**Response 200:** (UserAccountDTO)

---

### 15.4 `PATCH /admin/users/{id}/lock` ✅ BE + FE

**Response 200:** (UserAccountDTO updated)

---

### 15.5 `PATCH /admin/users/{id}/unlock` ✅ BE + FE

**Response 200:** (UserAccountDTO updated)

---

### 15.6 `DELETE /admin/users/{id}` ✅ BE + FE

**Response 204 No Content**

---

### 15.7 `GET /admin/dishes?keyword=&categoryId=&page=&size=` ✅ BE + FE

> **Auth:** Bearer Token (Admin only)

**Query Params:**
- `keyword` — tìm kiếm theo tên món (optional)
- `categoryId` — lọc theo danh mục (optional)
- `page` — số trang (default: 0)
- `size` — số lượng mỗi trang (default: 20)

**Response 200:** (Paginated DishDTO list)

---

### 15.8 `POST /admin/dishes` ✅ BE + FE

> **Auth:** Bearer Token (Admin only)

**Request:** (DishDTO + NutritionInfo + Ingredients)
```json
{
  "dish": {
    "name": "Grilled Chicken Salad",
    "categoryId": 1,
    "imageUrl": "https://example.com/salad.jpg",
    "difficulty": "easy",
    "totalTimeMin": 30
  },
  "nutrition": {
    "caloriesPer100g": 120.50,
    "proteinPer100g": 15.00,
    "carbPer100g": 5.00,
    "fatPer100g": 4.00
  },
  "ingredients": [
    { "name": "Chicken Breast", "quantityG": 200.0, "unit": "g" },
    { "name": "Lettuce", "quantityG": 100.0, "unit": "g" }
  ]
}
```

---

### 15.9 `PUT /admin/dishes/{id}` ✅ BE + FE

> **Auth:** Bearer Token (Admin only)

**Request:** (cùng format POST — đè toàn bộ Dish + Nutrition + Ingredients)

**Response 200:** (DishDTO updated)

---

### 15.10 `DELETE /admin/dishes/{id}` ✅ BE + FE

> **Auth:** Bearer Token (Admin only)

**Response 204 No Content**

**Errors:** `400` — `"Cannot delete dish: it is currently used in meal plans"`

---

### 15.11 `GET /admin/feedbacks?status=&page=&size=` ✅ BE + FE

**Response 200:**
```json
{
  "content": [
    {
      "id": 1,
      "accountId": 5,
      "content": "Ứng dụng rất hay",
      "status": "pending",
      "submittedAt": "2026-05-04T12:00:00Z"
    }
  ]
}
```

---

### 15.12 `PATCH /admin/feedbacks/{id}/status` ✅ BE + FE

**Request:** `{ "status": "resolved" }`

**Response 200:** (FeedbackDTO updated)

---

### 15.13 `POST /dish-categories` ⏳ BE chưa implement

> **Auth:** Bearer Token (Admin only)

**Request:**
```json
{
  "name": "Salad"
}
```

**Response 201:**
```json
{
  "id": 5,
  "name": "Salad"
}
```

**Errors:** `409` — `"Category name already exists"`

---

### 15.14 `PUT /dish-categories/{id}` ⏳ BE chưa implement

> **Auth:** Bearer Token (Admin only)

**Request:**
```json
{
  "name": "Salad & Rau trộn"
}
```

**Response 200:** (DishCategoryDTO updated)

**Errors:** `404` — `"Category not found"` / `409` — `"Category name already exists"`

---

### 15.15 `DELETE /dish-categories/{id}` ⏳ BE chưa implement

> **Auth:** Bearer Token (Admin only)

**Response 204 No Content**

**Errors:** `409` — `"Cannot delete category: it is currently used by dishes"`

---

## 16. Bảng so sánh BE vs FE

### ✅ Đã implement cả BE + FE (khớp nhau)

| # | Method | Endpoint | BE Controller | FE Service |
|---|---|---|---|---|
| 1 | POST | `/auth/register` | `AuthController` | `authService.register()` |
| 2 | POST | `/auth/login` | `AuthController` | `authService.login()` |
| 3 | GET | `/auth/user/{id}` | `AuthController` | `authService.getUserAccount()` |
| 4 | GET | `/health-profile/{accountId}` | `HealthProfileController` | `userService.getProfile()` |
| 5 | POST | `/health-profile/{accountId}` | `HealthProfileController` | `userService.updateProfile()` |
| 6 | GET | `/dishes` | `DishController` | `dishService.getDishes()` |
| 7 | GET | `/dishes/{id}` | `DishController` | `dishService.getDishById()` |
| 8 | POST | `/dishes` | `DishController` | `dishService.createDish()` |
| 9 | PUT | `/dishes/{id}` | `DishController` | `dishService.updateDish()` |
| 10 | DELETE | `/dishes/{id}` | `DishController` | `dishService.deleteDish()` |
| 11 | GET | `/meal-plans/account/{accountId}` | `MealPlanController` | `mealService.getMealPlans()` |
| 12 | GET | `/meal-plans/account/{accountId}/date/{date}` | `MealPlanController` | `mealService.getMealPlanByDate()` |
| 13 | POST | `/meal-plans?accountId={id}` | `MealPlanController` | `mealService.createMealPlan()` |
| 14 | PUT | `/meal-plans/{id}` | `MealPlanController` | `mealService.updateMealPlan()` |
| 15 | DELETE | `/meal-plans/{id}` | `MealPlanController` | `mealService.deleteMealPlan()` |
| 16 | GET | `/health-goal/{accountId}` | `HealthGoalController` | `userService.getHealthGoal()` |
| 17 | POST | `/health-goal/{accountId}` | `HealthGoalController` | `userService.updateHealthGoal()` |
| 18 | GET | `/dish-categories` | `DishCategoryController` | `dishService.getCategories()` |
| 19 | POST | `/dishes/{id}/ratings` | `DishRatingController` | `dishService.rateDish()` |
| 20 | GET | `/dishes/{id}/ratings` | `DishRatingController` | `dishService.getDishRatings()` |
| 21 | GET | `/favorites/account/{id}` | `FavoriteDishController` | `userService.getFavorites()` |
| 22 | POST | `/favorites/account/{id}/{dishId}` | `FavoriteDishController` | `userService.addFavorite()` |
| 23 | DELETE | `/favorites/account/{id}/{dishId}` | `FavoriteDishController` | `userService.removeFavorite()` |
| 24 | GET | `/meal-plans/{planId}/meals/{type}/portions` | `PortionController` | `mealService.getPortions()` |
| 25 | POST | `/meal-plans/{planId}/meals/{type}/portions` | `PortionController` | `mealService.addPortion()` |
| 26 | PUT | `/meal-plans/{planId}/meals/{type}/portions/{id}` | `PortionController` | `mealService.updatePortion()` |
| 27 | DELETE | `/meal-plans/{planId}/meals/{type}/portions/{id}` | `PortionController` | `mealService.deletePortion()` |
| 28 | GET | `/admin/statistics` | `AdminController` | `adminService.getStatistics()` |
| 29 | GET | `/admin/users` | `AdminController` | `adminService.getUsers()` |
| 30 | PATCH | `/admin/users/{id}/lock` | `AdminController` | `adminService.lockUser()` |
| 31 | PATCH | `/admin/users/{id}/unlock` | `AdminController` | `adminService.unlockUser()` |
| 32 | DELETE | `/admin/users/{id}` | `AdminController` | `adminService.deleteUser()` |
| 33 | GET | `/admin/feedbacks` | `AdminController` | `adminService.getFeedbacks()` |
| 34 | PATCH | `/admin/feedbacks/{id}/status` | `AdminController` | `adminService.updateFeedbackStatus()` |
| 35 | POST | `/auth/logout` | `AuthController` | `authService.logout()` |
| 36 | POST | `/auth/forgot-password` | `AuthController` | `authService.forgotPassword()` |
| 37 | POST | `/auth/verify-otp` | `AuthController` | `authService.verifyOtp()` |
| 38 | POST | `/auth/reset-password` | `AuthController` | `authService.resetPassword()` |
| 39 | PUT | `/auth/change-password` | `AuthController` | `authService.changePassword()` |
| 40 | GET | `/meal-plans/{id}` | `MealPlanController` | `mealService.getMealPlanById()` |
| 41 | GET | `/meal-plans/{planId}/meals` | `MealController` | `mealService.getMeals()` |
| 42 | GET | `/meal-plan-templates` | `MealPlanTemplateController` | `mealService.getTemplates()` |
| 43 | GET | `/ingredients` | `IngredientController` | `ingredientService.getIngredients()` |
| 44 | GET | `/admin/users/{id}` | `AdminController` | `adminService.getUserById()` |
| 45 | GET | `/admin/dishes` | `AdminController` | `adminService.getDishes()` |
| 46 | POST | `/admin/dishes` | `AdminController` | `adminService.createDish()` |
| 47 | PUT | `/admin/dishes/{id}` | `AdminController` | `adminService.updateDish()` |
| 48 | DELETE | `/admin/dishes/{id}` | `AdminController` | `adminService.deleteDish()` |

### ⏳ BE chưa implement — FE chưa gọi (Giai đoạn 6-10)

| # | Method | Endpoint | BE Controller | FE Service | Giai đoạn |
|---|---|---|---|---|---|
| 48 | POST | `/feedbacks` | `UserFeedbackController` | `feedbackService.sendFeedback()` | Giai đoạn 5 |
| 49 | GET | `/feedbacks` | `UserFeedbackController` | `feedbackService.getMyFeedbacks()` | Giai đoạn 5 |
| 50 | POST | `/dish-categories` | `DishCategoryController` | `adminService.createCategory()` | Giai đoạn 6 |
| 51 | PUT | `/dish-categories/{id}` | `DishCategoryController` | `adminService.updateCategory()` | Giai đoạn 6 |
| 52 | DELETE | `/dish-categories/{id}` | `DishCategoryController` | `adminService.deleteCategory()` | Giai đoạn 6 |
| 53 | GET | `/dishes?keyword=&categoryId=&minCal=&maxCal=&page=&size=` | `DishController` | `dishService.getDishes()` | Giai đoạn 7 |
| 54 | POST | `/dishes` (with `ingredients[]`) | `DishController` | `dishService.createCustomDish()` | Giai đoạn 7 |
| 55 | POST | `/meal-plan-templates` | `MealPlanTemplateController` | `mealService.saveTemplate()` | Giai đoạn 8 |
| 56 | DELETE | `/meal-plan-templates/{id}` | `MealPlanTemplateController` | `mealService.deleteTemplate()` | Giai đoạn 8 |
| 57 | PUT | `/meal-plans/{id}` (nested `meals[]`) | `MealPlanController` | `mealService.updateMealPlan()` | Giai đoạn 9 |

### ✅ BE implement nhưng FE chưa gọi

| # | Method | Endpoint | BE Controller |
|---|---|---|---|
| 1 | GET | `/dishes/system` | `DishController` |
| 2 | GET | `/dishes/account/{accountId}` | `DishController` |
| 3 | GET | `/ingredients/{id}` | `IngredientController` |
| 4 | POST | `/ingredients` | `IngredientController` |
| 5 | PUT | `/ingredients/{id}` | `IngredientController` |
| 6 | DELETE | `/ingredients/{id}` | `IngredientController` |

---

## 17. Enum Values

> Tất cả enum gửi/nhận đều là **lowercase string**, khớp với MySQL ENUM.

| Enum | Giá trị | Dùng ở |
|---|---|---|
| `role` | `"user"`, `"admin"` | UserAccountDTO |
| `status` | `"active"`, `"locked"`, `"deleted"` | UserAccountDTO |
| `gender` | `"male"`, `"female"`, `"other"` | HealthProfileDTO |
| `goalType` | `"weight_loss"`, `"muscle_gain"`, `"maintain"` | HealthGoalDTO |
| `activityLevel` | `"low"`, `"medium"`, `"high"` | HealthGoalDTO |
| `source` | `"system"`, `"custom"` | DishDTO |
| `difficulty` | `"easy"`, `"medium"`, `"hard"` | DishDTO |
| `mealType` | `"breakfast"`, `"lunch"`, `"dinner"`, `"snack"` | MealDTO, Portions |
| `feedbackStatus` | `"pending"`, `"processing"`, `"resolved"` | Admin Feedback |

---

## DTO Reference

### UserAccountDTO
```json
{ "id": 1, "username": "str", "email": "str", "role": "user", "status": "active" }
```

### HealthProfileDTO
```json
{ "id": 1, "fullName": "str", "age": 30, "gender": "male", "heightCm": 175.00, "weightKg": 70.00, "avatarUrl": "str" }
```

### HealthGoalDTO
```json
{ "id": 1, "goalType": "weight_loss", "activityLevel": "medium", "targetWeightKg": 65.00, "dailyCaloriesKcal": 1800, "proteinGDay": 120.00, "carbGDay": 200.00, "fatGDay": 60.00 }
```

### DishDTO
```json
{ "id": 1, "name": "str", "categoryId": 1, "imageUrl": "str", "source": "system", "difficulty": "easy", "totalTimeMin": 45 }
```

### MealPlanDTO
```json
{ "id": 1, "planName": "str", "planDate": "2026-05-03" }
```

### MealDTO
```json
{ "id": 1, "mealPlanId": 1, "mealType": "breakfast" }
```

### PortionDTO
```json
{ "id": 1, "mealId": 1, "dishId": 5, "quantityG": 200.00, "caloriesKcal": 330.00, "proteinG": 62.00, "carbG": 0.00, "fatG": 7.20 }
```

### NutritionInfoDTO
```json
{ "id": 1, "dishId": 5, "caloriesPer100g": 165.00, "proteinPer100g": 31.00, "carbPer100g": 0.00, "fatPer100g": 3.60, "fiberPer100g": 0.00, "satFatPer100g": 1.00, "vitaminAMcg": 6.00, "vitaminCMg": 0.00, "vitaminDMcg": 0.00, "calciumMg": 15.00, "ironMg": 1.00 }
```

### ErrorResponse
```json
{ "status": 400, "message": "Mô tả lỗi", "timestamp": 1746345600000 }
```

# Chiến lược triển khai API Endpoints còn thiếu

Triển khai toàn bộ các endpoint được liệt kê trong tài liệu [API Endpoints](api_endpoints.md) theo mô hình 3 lớp.

## Phân nhóm triển khai

### Nhóm 1: Health Goal & Dish Category ✅ Hoàn thành
- **Health Goal:** `HealthGoalController` + `HealthGoalServiceImpl` đã triển khai. Lưu và lấy mục tiêu dinh dưỡng theo `accountId`.
- **Dish Category:** `DishCategoryController` + `DishCategoryServiceImpl` đã triển khai. Lấy danh sách danh mục món ăn.

### Nhóm 2: Dish Interaction (Ratings & Favorites) ✅ Hoàn thành
- **Dish Rating:** `DishRatingController` + `DishRatingServiceImpl` đã triển khai. Cho phép người dùng đánh giá món ăn (score, comment).
- **Favorites:** `FavoriteDishController` + `FavoriteDishServiceImpl` đã triển khai. Thêm/Xóa món ăn yêu thích.

### Nhóm 3: Ingredients & Meal/Portions ✅ Hoàn thành
- **Ingredients:** `IngredientController` + `IngredientServiceImpl` đã triển khai CRUD đầy đủ, bao gồm `GET /ingredients` với phân trang (`page`, `size`) và tìm kiếm (`search`).
- **Meal & Portions:** `PortionController` + `PortionServiceImpl` đã triển khai. Tự động tính dinh dưỡng khi thêm/cập nhật khẩu phần và tạo `Meal` nếu chưa tồn tại. `GET /meal-plans/{planId}/meals` đã implement trong `MealController`.

### Nhóm 4: Admin & Feedback ✅ Hoàn thành
- `UserFeedback` entity/repository, `AdminAuditLog` entity/repository đã tạo.
- `AdminController` + `AdminServiceImpl` đã triển khai đầy đủ: Thống kê, Quản lý users (lock/unlock/soft delete/getById), Quản lý feedbacks, CRUD món ăn dưới `/admin/dishes`.

### Nhóm 5: Auth bổ sung ✅ Hoàn thành
- `POST /auth/logout`, `POST /auth/forgot-password`, `POST /auth/verify-otp`, `POST /auth/reset-password`, `PUT /auth/change-password` đã triển khai trong `AuthController` + `UserAccountServiceImpl`.

---

## Danh sách file đã tạo/chỉnh sửa

### Entities & Repositories (đã tạo)
- `UserFeedback.java` & `UserFeedbackRepository.java` ✅
- `AdminAuditLog.java` & `AdminAuditLogRepository.java` ✅

### DTOs (đã tạo)
- `FeedbackDTO.java` ✅
- `AdminStatsDTO.java` ✅

### Services & Controllers (đã triển khai)
1. **HealthGoalService** & `HealthGoalController` ✅
2. **DishCategoryService** & `DishCategoryController` ✅
3. **DishRatingService** & `DishRatingController` ✅
4. **FavoriteDishService** & `FavoriteDishController` ✅
5. **IngredientService** & `IngredientController` ✅ (đầy đủ: CRUD + phân trang/tìm kiếm)
6. **PortionService** & `PortionController` ✅
7. **AdminService** & `AdminController` ✅ (đầy đủ: users, feedbacks, dishes)

---

## Logic xử lý quan trọng (Portions) ✅ Đã hoàn thành
Khi thêm hoặc cập nhật `Portion`, Backend phải:
1. Lấy `NutritionInfo` của món ăn tương ứng.
2. Tính toán `caloriesKcal`, `proteinG`, `carbG`, `fatG` dựa trên `quantityG` và giá trị dinh dưỡng trên 100g.
3. Tự động tạo `Meal` nếu bữa ăn đó chưa tồn tại trong `MealPlan`.

---

## Kế hoạch thực hiện

| Giai đoạn | Nội dung | Trạng thái |
|---|---|---|
| **Giai đoạn 1** | Health Goal, Categories, Ingredients (cơ bản) | ✅ Hoàn thành |
| **Giai đoạn 2** | Ratings, Favorites | ✅ Hoàn thành |
| **Giai đoạn 3** | Portions (tính toán dinh dưỡng) | ✅ Hoàn thành |
| **Giai đoạn 4** | Admin module (stats, users, feedbacks) | ✅ Hoàn thành |

## Các endpoint / tính năng còn thiếu cần triển khai

### Auth ✅ Đã hoàn thành (05/05/2026)

### Meal Plans ✅ Hoàn thành
- ✅ `GET /meal-plans/{id}` (lấy theo ID) — `MealPlanController`
- ✅ `GET /meal-plans/{planId}/meals` (liệt kê bữa ăn) — `MealController`
- ✅ `GET /meal-plan-templates` (mẫu kế hoạch) — `MealPlanTemplateController`

### Ingredients ✅ Hoàn thành
- ✅ `GET /ingredients` với phân trang (`page`, `size`) và tìm kiếm (`search`) — `IngredientController`

### Admin ✅ Hoàn thành
- ✅ `GET /admin/users/{id}` — `AdminController`
- ✅ `GET /admin/dishes` (phân trang, lọc theo keyword + categoryId) — `AdminController`
- ✅ `POST /admin/dishes` (tạo Dish + NutritionInfo + Ingredients) — `AdminController`
- ✅ `PUT /admin/dishes/{id}` (cập nhật toàn bộ) — `AdminController`
- ✅ `DELETE /admin/dishes/{id}` (kiểm tra portions trước khi xóa) — `AdminController`

> **Tất cả backend endpoints CƠ BẢN đã triển khai. Các tính năng nâng cao / còn thiếu theo UR-09..UR-19 đang được lên kế hoạch bên dưới.**

---

## Danh sách endpoint / tính năng còn thiếu cần triển khai

### Giai đoạn 5: User Feedback — UR-19 ⏳ Chưa triển khai
- `POST /feedbacks` — Người dùng gửi phản hồi / góp ý (cần `FeedbackCreateDTO`)
- `GET /feedbacks` — Người dùng xem lại danh sách phản hồi của chính mình
- **File cần tạo / chỉnh sửa:**
  - `controller/UserFeedbackController.java` — TẠO MỚI (hoặc bổ sung vào `FeedbackController`)
  - `dto/FeedbackCreateDTO.java` — TẠO MỚI (`content` bắt buộc)
  - `service/UserFeedbackService.java` + `impl` — TẠO MỚI
- **Logic nghiệp vụ:**
  - Ghi nhận `accountId` từ JWT, `status` mặc định `"pending"`.
  - Không cho phép user sửa/xóa feedback sau khi gửi.

### Giai đoạn 6: Admin Dish Category CRUD — UR-17 ⏳ Chưa triển khai
- `POST /dish-categories` — Admin tạo danh mục mới
- `PUT /dish-categories/{id}` — Admin sửa tên danh mục
- `DELETE /dish-categories/{id}` — Admin xóa danh mục (kiểm tra không có Dish đang tham chiếu)
- **File cần chỉnh sửa:**
  - `controller/DishCategoryController.java` — THÊM 3 endpoints, bảo vệ `@PreAuthorize("hasRole('ADMIN')")`
  - `service/DishCategoryService.java` + `impl` — THÊM `create`, `update`, `delete`
- **Logic nghiệp vụ:**
  - Tên danh mục `UNIQUE`, không cho xóa nếu còn `Dish` thuộc category.

### Giai đoạn 7: Dish Filter & Auto-calc Nutrition — UR-13 + UR-14 ⏳ Chưa triển khai
- `GET /dishes` — Bổ sung query params: `keyword`, `categoryId`, `minCal`, `maxCal`, `page`, `size` (hiện BE trả toàn bộ)
- `POST /dishes` (custom dish) — Khi request bao gồm `ingredients[]`, hệ thống tự động tính `NutritionInfo` (caloriesPer100g, proteinPer100g, carbPer100g, fatPer100g) từ tổng nguyên liệu.
- **File cần chỉnh sửa:**
  - `controller/DishController.java` — Sửa `GET /dishes` thêm filter params; Sửa `POST /dishes` nhận thêm `ingredients`
  - `service/DishService.java` + `impl` — THÊM `searchDishes(...)`, `calculateNutritionFromIngredients(...)`
  - `repository/DishRepository.java` — THÊM `@Query` JPQL filter theo `name`, `categoryId`, JOIN `NutritionInfo` lọc theo `caloriesPer100g`
- **Logic nghiệp vụ:**
  - Filter kết hợp nhiều điều kiện, dùng `Specification` hoặc JPQL.
  - Auto-calc: tổng khối lượng nguyên liệu → tính dinh dưỡng trên 100g món ăn hoàn chỉnh.

### Giai đoạn 8: Meal Plan Templates (POST/DELETE) — UR-12 ⏳ Chưa triển khai
- `POST /meal-plan-templates?accountId={id}` — Lưu một `MealPlan` hiện có thành template (sao chép `Meal` → `TemplateMeal`, `Portion` → `TemplatePortion`)
- `DELETE /meal-plan-templates/{id}` — Xóa template của user
- **File cần tạo / chỉnh sửa:**
  - `controller/MealPlanTemplateController.java` — THÊM 2 endpoints
  - `service/MealPlanTemplateService.java` + `impl` — THÊM `saveTemplateFromMealPlan(...)`, `deleteTemplate(...)`
  - `entity/TemplateMeal.java`, `TemplatePortion.java` — KIỂM TRA đã tồn tại chưa
  - `repository/TemplateMealRepository.java`, `TemplatePortionRepository.java` — KIỂM TRA
- **Logic nghiệp vụ:**
  - Clone: `TemplateMeal` không có `plan_date`, chỉ có cấu trúc `meal_type` + danh sách `TemplatePortion` (dishId, quantityG).
  - Chỉ chủ sở hữu mới được xóa template của mình.

### Giai đoạn 9: PUT Meal Plans (nested update) — UR-09 ⏳ Chưa triển khai
- `PUT /meal-plans/{id}` — Cập nhật không chỉ `planName`/`planDate` mà còn cấu trúc bên trong (thêm/xóa/sửa `Meal` và `Portion`).
- **File cần chỉnh sửa:**
  - `controller/MealPlanController.java` — Sửa `PUT` nhận `MealPlanUpdateRequestDTO` chứa nested `meals[]`
  - `service/MealPlanService.java` + `impl` — THÊM logic `updateMealPlanWithNestedMeals(...)`
- **Logic nghiệp vụ:**
  - So sánh danh sách meals/portions gửi lên với DB: giữ lại cái cũ không đổi, thêm mới, xóa thiếu, cập nhật quantity.
  - Tự động tính lại dinh dưỡng cho các `Portion` bị thay đổi.

---

## Kế hoạch thực hiện tổng hợp (cập nhật)

| Giai đoạn | Nội dung | Trạng thái | Ưu tiên |
|---|---|---|---|
| **Giai đoạn 1** | Health Goal, Categories, Ingredients (cơ bản) | ✅ Hoàn thành | - |
| **Giai đoạn 2** | Ratings, Favorites | ✅ Hoàn thành | - |
| **Giai đoạn 3** | Portions (tính toán dinh dưỡng) | ✅ Hoàn thành | - |
| **Giai đoạn 4** | Admin module (stats, users, feedbacks, dishes) | ✅ Hoàn thành | - |
| **Giai đoạn 5** | User Feedback (POST/GET /feedbacks) | ⏳ Chưa triển khai | **Cao** |
| **Giai đoạn 6** | Admin Dish Category CRUD | ⏳ Chưa triển khai | **Cao** |
| **Giai đoạn 7** | Dish Filter & Auto-calc Nutrition | ⏳ Chưa triển khai | **Cao** |
| **Giai đoạn 8** | Meal Plan Templates (POST/DELETE) | ⏳ Chưa triển khai | **Trung bình** |
| **Giai đoạn 9** | PUT Meal Plans (nested meals/portions) | ⏳ Chưa triển khai | **Trung bình** |

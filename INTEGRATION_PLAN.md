# Kế hoạch tích hợp Backend Spring Boot — Meal Planner Frontend

> Ngày lập: 06/05/2026  
> BE base URL: `http://localhost:8081/api`  
> Tech stack thêm: `axios`, `zustand`, `react-hook-form`, `zod`, `@hookform/resolvers`

---

## 0. Xác nhận API Contract từ code Backend (Đã verify)

### Auth (`/auth`)
| Method | Endpoint | Request Body | Response 200 | Auth |
|---|---|---|---|---|
| POST | `/auth/register` | `{ username, email, password, passwordConfirm }` | `{ id, username, email, role, status }` | Không |
| POST | `/auth/login` | `{ username, password }` | `{ token, user: { id, username, email, role, status } }` | Không |
| GET | `/auth/user/{id}` | — | `UserAccountDTO` | Bearer |
| POST | `/auth/logout` | — | `200 OK` (empty body) | Không |
| POST | `/auth/forgot-password` | `{ email }` | `{ message, devOtp }` | Không |
| POST | `/auth/verify-otp` | `{ email, otp }` | `{ message }` | Không |
| POST | `/auth/reset-password` | `{ token, newPassword }` | `{ message }` | Không |
| PUT | `/auth/change-password` | `{ oldPassword, newPassword }` | `{ message }` | Bearer |

### Health Profile (`/health-profile/{accountId}`)
| GET / POST | `{ fullName, age, gender, heightCm, weightKg, avatarUrl }` | Bearer |

### Health Goal (`/health-goal/{accountId}`)
| GET / POST | `{ goalType, activityLevel, targetWeightKg, dailyCaloriesKcal, proteinGDay, carbGDay, fatGDay }` | Bearer |

### Dishes (`/dishes`)
| GET | `/dishes?keyword=&categoryId=&minCal=&maxCal=&page=&size=` | Paginated `DishDTO` | Bearer |
| GET | `/dishes/{id}` | `DishDTO` (kèm `nutritionInfo`, `ingredients`) | Bearer |
| GET | `/dishes/system` | `DishDTO[]` | Bearer |
| GET | `/dishes/account/{accountId}` | `DishDTO[]` (custom) | Bearer |
| POST | `/dishes` | `AdminDishRequestDTO` `{ dish: {...}, nutrition: {...}, ingredients: [...] }` | `DishDTO` | Bearer |
| PUT | `/dishes/{id}` | `DishDTO` | `DishDTO` | Bearer |
| DELETE | `/dishes/{id}` | — | `204` | Bearer |

### Dish Categories (`/dish-categories`)
| GET | `[]` | Bearer |
| POST | `{ name }` | `201` `{ id, name }` | Bearer |
| PUT | `/{id}` | `{ name }` | `200` | Bearer |
| DELETE | `/{id}` | — | `204` | Bearer |

### Dish Ratings (`/dishes/{dishId}/ratings`)
| POST | `{ score, comment }` | `RatingDTO` | Bearer |
| GET | — | `RatingDTO[]` | Bearer |

### Favorites (`/favorites/account/{accountId}`)
| GET | — | `DishDTO[]` | Bearer |
| POST | `/{dishId}` | `200` | Bearer |
| DELETE | `/{dishId}` | `204` | Bearer |

### Ingredients (`/ingredients`)
| GET | `?page=&size=&search=` | Paginated `IngredientDTO` | Bearer |

### Meal Plans (`/meal-plans`)
| GET | `/meal-plans/account/{accountId}` | `MealPlanDTO[]` | Bearer |
| GET | `/meal-plans/account/{accountId}/date/{planDate}` | `MealPlanDTO` | Bearer |
| GET | `/meal-plans/{id}` | `MealPlanDTO` | Bearer |
| POST | `?accountId={id}` | `{ planName, planDate }` | `MealPlanDTO` | Bearer |
| PUT | `/{id}` | `{ planName, planDate, meals: [ { mealType, portions: [ {dishId, quantityG} ] } ] }` | `MealPlanDTO` | Bearer |
| DELETE | `/{id}` | — | `204` | Bearer |

### Meals (`/meal-plans/{planId}/meals`)
| GET | — | `MealDTO[]` | Bearer |

### Portions (`/meal-plans/{planId}/meals/{mealType}/portions`)
| GET | — | `PortionDTO[]` | Bearer |
| POST | `{ dishId, quantityG }` | `PortionDTO` (auto-calc nutrition) | Bearer |
| PUT | `/{portionId}` | `{ quantityG }` | `PortionDTO` | Bearer |
| DELETE | `/{portionId}` | — | `204` | Bearer |

### Meal Plan Templates (`/meal-plan-templates`)
| GET | `?accountId={id}` | `TemplateDTO[]` | Bearer |
| POST | `{ templateName, sourcePlanId }` | `TemplateDTO` (201) | Bearer (tự extract) |
| DELETE | `/{id}` | — | `204` | Bearer |

### Feedbacks (`/feedbacks`)
| POST | `{ content }` | `FeedbackDTO` | Bearer (tự extract) |
| GET | — | `FeedbackDTO[]` | Bearer (tự extract) |

### Admin (`/admin/*`) — yêu cầu `role=admin`
| GET | `/admin/statistics?startDate=&endDate=` | `StatsDTO` | Bearer |
| GET | `/admin/users?keyword=&status=&page=&size=` | Paginated `UserAccountDTO` | Bearer |
| GET | `/admin/users/{id}` | `UserAccountDTO` | Bearer |
| PATCH | `/admin/users/{id}/lock` | `UserAccountDTO` | Bearer |
| PATCH | `/admin/users/{id}/unlock` | `UserAccountDTO` | Bearer |
| DELETE | `/admin/users/{id}` | `204` | Bearer |
| GET | `/admin/dishes?keyword=&categoryId=&page=&size=` | Paginated `DishDTO` | Bearer |
| POST | `/admin/dishes` | `{ dish, nutrition, ingredients }` | `DishDTO` | Bearer |
| PUT | `/admin/dishes/{id}` | `{ dish, nutrition, ingredients }` | `DishDTO` | Bearer |
| DELETE | `/admin/dishes/{id}` | `204` | Bearer |
| GET | `/admin/feedbacks?status=&page=&size=` | Paginated `FeedbackDTO` | Bearer |
| PATCH | `/admin/feedbacks/{id}/status` | `{ status }` | `FeedbackDTO` | Bearer |

---

## 1. Cấu trúc thư mục FE sau refactor

```
src/
├── api/
│   ├── axiosInstance.js          # Axios baseURL + interceptor gắn token
│   ├── authApi.js                # Auth endpoints
│   ├── dishApi.js                # Dish, Rating, Category, Favorite
│   ├── mealApi.js                # MealPlan, Meal, Portion, Template
│   ├── userApi.js                # HealthProfile, HealthGoal
│   ├── ingredientApi.js          # Ingredients
│   ├── feedbackApi.js          # User feedback
│   └── adminApi.js               # Admin endpoints
├── stores/
│   ├── authStore.js              # token, user, isAdmin, login, logout
│   ├── userStore.js              # profile, healthGoal, favorites
│   ├── dishStore.js              # dish list, categories, search/filter state
│   ├── mealStore.js              # current plan, portions, templates
│   └── uiStore.js                # toast/loading/global UI state
├── pages/
│   ├── auth/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── ForgotPassword.jsx
│   │   └── ResetPassword.jsx
│   ├── user/
│   │   ├── Dashboard.jsx         # refactor: gọi API thay mock
│   │   ├── TodaysMeals.jsx       # refactor
│   │   ├── MealPlanner.jsx       # refactor
│   │   ├── Recipes.jsx           # refactor
│   │   ├── Analytics.jsx         # refactor
│   │   └── Settings.jsx          # refactor: profile + health goal + change-password
│   └── admin/
│       ├── AdminLayout.jsx
│       ├── AdminDashboard.jsx    # stats + charts
│       ├── AdminUsers.jsx        # quản lý users
│       ├── AdminDishes.jsx       # quản lý món ăn
│       ├── AdminCategories.jsx   # CRUD danh mục
│       └── AdminFeedbacks.jsx    # quản lý phản hồi
├── components/
│   ├── layout/
│   │   ├── Layout.jsx            # refactor: thêm auth check, admin menu
│   │   ├── Sidebar.jsx           # refactor: điều hướng role-based
│   │   └── TopBar.jsx            # refactor: user info từ store
│   ├── auth/
│   │   └── AuthLayout.jsx        # layout trang auth (không sidebar)
│   ├── ui/                       # giữ nguyên CalorieRing, Chip, MealCard,...
│   └── common/
│       ├── ProtectedRoute.jsx    # chặn chưa đăng nhập → /login
│       ├── AdminRoute.jsx        # chặn không phải admin → /dashboard
│       ├── LoadingSpinner.jsx
│       └── Toast.jsx
├── hooks/
│   ├── useAuth.js                # wrap authStore
│   ├── useNutrition.js           # tính tổng dinh dưỡng từ portions
│   └── useMealPlan.js            # logic CRUD meal plan + portions
├── types/
│   └── index.js                  # JSDoc / zod schemas cho DTOs
├── utils/
│   ├── formatters.js             # formatDate, formatNumber, capitalize
│   └── validators.js             # zod schemas (login, register, dish, etc.)
├── context/
│   └── (XÓA AppContext.jsx)      # thay bằng Zustand
├── data/
│   └── (XÓA mockData.js)        # xóa khi tích hợp xong
├── App.jsx                       # refactor routing
└── main.jsx                      # giữ nguyên
```

---

## 2. Chi tiết triển khai theo Phase

### Phase 0: Setup & Base Infrastructure
**Mục tiêu:** Cài đặt thư viện, thiết lập Axios + Zustand + Router Guards.

1. **Cài dependencies**
   ```bash
   npm install axios zustand react-hook-form zod @hookform/resolvers
   ```

2. **Tạo `src/api/axiosInstance.js`**
   - `baseURL: 'http://localhost:8081/api'`
   - Request interceptor: đọc `token` từ `authStore`, gắn `Authorization: Bearer <token>`
   - Response interceptor: xử lý `401` → `logout()` + redirect `/login`; xử lý `403` → toast "Không có quyền"

3. **Tạo `src/stores/authStore.js`** (Zustand)
   ```js
   { token: null, user: null, isAuthenticated: false, isAdmin: false, login(token,user), logout() }
   ```
   - `login`: lưu token + user vào state, set `isAdmin = user.role === 'admin'`
   - `logout`: xóa state, redirect `/login`
   - **Không lưu vào localStorage** (theo docs). Nếu cần dev/test, có thể dùng `sessionStorage` tạm.

4. **Tạo `src/components/common/ProtectedRoute.jsx`**
   - Check `isAuthenticated`. Nếu false → redirect `/login`
   - Nếu route là `/admin/*` và `!isAdmin` → redirect `/dashboard`

5. **Tạo `src/components/common/Toast.jsx` + `src/stores/uiStore.js`**
   - Global toast queue để hiển thị lỗi/thành công từ API

**Kết quả kiểm tra:**
- Chạy `npm run dev` không lỗi build.
- `axiosInstance` gọi `GET /api/dishes` trả về 401 khi chưa login (expected).

---

### Phase 1: Auth Pages & Flow
**Mục tiêu:** Người dùng có thể đăng ký, đăng nhập, quên mật khẩu.

6. **Tạo `src/utils/validators.js`**
   - `loginSchema`: `username` (min 4), `password` (min 6)
   - `registerSchema`: `username`, `email` (email), `password`, `passwordConfirm` (refine khớp)
   - `forgotPasswordSchema`: `email`
   - `resetPasswordSchema`: `token` (6 chữ số), `newPassword` (min 6)

7. **Tạo `src/api/authApi.js`**
   ```js
   export const login = (data) => axiosInstance.post('/auth/login', data);
   export const register = (data) => axiosInstance.post('/auth/register', data);
   export const forgotPassword = (data) => axiosInstance.post('/auth/forgot-password', data);
   export const verifyOtp = (data) => axiosInstance.post('/auth/verify-otp', data);
   export const resetPassword = (data) => axiosInstance.post('/auth/reset-password', data);
   export const changePassword = (data) => axiosInstance.put('/auth/change-password', data);
   export const getUser = (id) => axiosInstance.get(`/auth/user/${id}`);
   ```

8. **Tạo pages Auth**
   - `Login.jsx`: form RHF + Zod, gọi `authApi.login`, lưu vào `authStore`, redirect `/dashboard`
   - `Register.jsx`: form RHF + Zod, gọi `authApi.register`, redirect `/login`
   - `ForgotPassword.jsx`: nhập email → gọi `forgot-password` → hiển thị `devOtp` (dev mode) → chuyển ResetPassword
   - `ResetPassword.jsx`: nhập OTP + newPassword → gọi `reset-password` → redirect `/login`

9. **Refactor `App.jsx`**
   ```jsx
   <BrowserRouter>
     <Routes>
       <Route element={<AuthLayout />}>
         <Route path="/login" element={<Login />} />
         <Route path="/register" element={<Register />} />
         <Route path="/forgot-password" element={<ForgotPassword />} />
         <Route path="/reset-password" element={<ResetPassword />} />
       </Route>
       <Route element={<ProtectedRoute />}>
         <Route path="/" element={<Layout />}>
           <Route index element={<Dashboard />} />
           <Route path="meals" element={<TodaysMeals />} />
           <Route path="planner" element={<MealPlanner />} />
           <Route path="recipes" element={<Recipes />} />
           <Route path="analytics" element={<Analytics />} />
           <Route path="settings" element={<Settings />} />
         </Route>
       </Route>
       <Route element={<AdminRoute />}>
         <Route path="/admin" element={<AdminLayout />}>
           <Route index element={<AdminDashboard />} />
           <Route path="users" element={<AdminUsers />} />
           <Route path="dishes" element={<AdminDishes />} />
           <Route path="categories" element={<AdminCategories />} />
           <Route path="feedbacks" element={<AdminFeedbacks />} />
         </Route>
       </Route>
     </Routes>
   </BrowserRouter>
   ```

**Kết quả kiểm tra:**
- Đăng ký user mới → login → redirect Dashboard.
- FE state có token và user object.

---

### Phase 2: Core User Features (Profile, Goal, Dashboard)
**Mục tiêu:** Thay mock data bằng API thật cho user cá nhân.

10. **Tạo `src/api/userApi.js`**
    ```js
    export const getHealthProfile = (accountId) => axiosInstance.get(`/health-profile/${accountId}`);
    export const saveHealthProfile = (accountId, data) => axiosInstance.post(`/health-profile/${accountId}`, data);
    export const getHealthGoal = (accountId) => axiosInstance.get(`/health-goal/${accountId}`);
    export const saveHealthGoal = (accountId, data) => axiosInstance.post(`/health-goal/${accountId}`, data);
    ```

11. **Tạo `src/stores/userStore.js`** (Zustand)
    ```js
    { profile: null, healthGoal: null, fetchProfile(accountId), updateProfile(accountId,data), fetchGoal(accountId), updateGoal(accountId,data) }
    ```

12. **Refactor `Settings.jsx`**
    - Load `profile` từ `userStore` → hiển thị form cập nhật thông tin cá nhân.
    - Load `healthGoal` → hiển thị form cập nhật mục tiêu sức khỏe.
    - Thêm form Đổi mật khẩu (gọi `authApi.changePassword`).

13. **Refactor `Dashboard.jsx`**
    - Thay `mockUser` bằng `authStore.user`
    - Thay `mockNutrition` bằng `userStore.healthGoal` (target) + tính current từ meals.
    - Giữ `CalorieRing`, `NutritionBar` nhưng truyền data từ store.

**Kết quả kiểm tra:**
- Login vào → Dashboard hiển thị tên user đúng.
- Vào Settings → cập nhật profile/goal → API thành công → UI cập nhật.

---

### Phase 3: Dish & Recipe Features
**Mục tiêu:** Tích hợp món ăn, danh mục, yêu thích, đánh giá.

14. **Tạo `src/api/dishApi.js`**
    ```js
    export const getDishes = (params) => axiosInstance.get('/dishes', { params });
    export const getDishById = (id) => axiosInstance.get(`/dishes/${id}`);
    export const getSystemDishes = () => axiosInstance.get('/dishes/system');
    export const getCustomDishes = (accountId) => axiosInstance.get(`/dishes/account/${accountId}`);
    export const createDish = (data) => axiosInstance.post('/dishes', data);
    export const updateDish = (id, data) => axiosInstance.put(`/dishes/${id}`, data);
    export const deleteDish = (id) => axiosInstance.delete(`/dishes/${id}`);
    export const getCategories = () => axiosInstance.get('/dish-categories');
    export const createCategory = (name) => axiosInstance.post('/dish-categories', { name });
    export const updateCategory = (id, name) => axiosInstance.put(`/dish-categories/${id}`, { name });
    export const deleteCategory = (id) => axiosInstance.delete(`/dish-categories/${id}`);
    export const getRatings = (dishId) => axiosInstance.get(`/dishes/${dishId}/ratings`);
    export const addRating = (dishId, data) => axiosInstance.post(`/dishes/${dishId}/ratings`, data);
    export const getFavorites = (accountId) => axiosInstance.get(`/favorites/account/${accountId}`);
    export const addFavorite = (accountId, dishId) => axiosInstance.post(`/favorites/account/${accountId}/${dishId}`);
    export const removeFavorite = (accountId, dishId) => axiosInstance.delete(`/favorites/account/${accountId}/${dishId}`);
    ```

15. **Tạo `src/stores/dishStore.js`**
    ```js
    { dishes: [], categories: [], favorites: [], filters: {}, fetchDishes(params), fetchCategories(), toggleFavorite(dishId), ... }
    ```

16. **Refactor `Recipes.jsx`**
    - Gọi `dishApi.getDishes({ keyword, categoryId, page, size })` thay `mockRecipes`
    - Hiển thị phân trang (pagination UI) nếu `totalPages > 1`
    - Thêm tính năng: click xem chi tiết món (modal hoặc route mới `/recipes/:id`)
    - Nút "Yêu thích" gọi `addFavorite` / `removeFavorite`
    - Nút "Đánh giá" gọi `addRating`

**Kết quả kiểm tra:**
- Trang Recipes load danh sách món từ BE.
- Tìm kiếm/lọc theo category hoạt động.
- Thêm/xóa yêu thích phản ánh đúng.

---

### Phase 4: Meal Planning & Portions
**Mục tiêu:** Tích hợp MealPlan, Meal, Portion, Template.

17. **Tạo `src/api/mealApi.js`**
    ```js
    export const getMealPlans = (accountId) => axiosInstance.get(`/meal-plans/account/${accountId}`);
    export const getMealPlanByDate = (accountId, date) => axiosInstance.get(`/meal-plans/account/${accountId}/date/${date}`);
    export const getMealPlanById = (id) => axiosInstance.get(`/meal-plans/${id}`);
    export const createMealPlan = (accountId, data) => axiosInstance.post(`/meal-plans?accountId=${accountId}`, data);
    export const updateMealPlan = (id, data) => axiosInstance.put(`/meal-plans/${id}`, data);
    export const deleteMealPlan = (id) => axiosInstance.delete(`/meal-plans/${id}`);
    export const getMeals = (planId) => axiosInstance.get(`/meal-plans/${planId}/meals`);
    export const getPortions = (planId, mealType) => axiosInstance.get(`/meal-plans/${planId}/meals/${mealType}/portions`);
    export const addPortion = (planId, mealType, data) => axiosInstance.post(`/meal-plans/${planId}/meals/${mealType}/portions`, data);
    export const updatePortion = (planId, mealType, portionId, data) => axiosInstance.put(`/meal-plans/${planId}/meals/${mealType}/portions/${portionId}`, data);
    export const deletePortion = (planId, mealType, portionId) => axiosInstance.delete(`/meal-plans/${planId}/meals/${mealType}/portions/${portionId}`);
    export const getTemplates = (accountId) => axiosInstance.get(`/meal-plan-templates?accountId=${accountId}`);
    export const createTemplate = (data) => axiosInstance.post('/meal-plan-templates', data);
    export const deleteTemplate = (id) => axiosInstance.delete(`/meal-plan-templates/${id}`);
    ```

18. **Tạo `src/stores/mealStore.js`**
    ```js
    { plans: [], currentPlan: null, portions: {}, templates: [], fetchPlans(accountId), fetchPortions(planId, mealType), addPortion(...), ... }
    ```

19. **Refactor `MealPlanner.jsx` + `TodaysMeals.jsx`**
    - Load `mealPlans` theo `accountId`
    - Chọn ngày → gọi `getMealPlanByDate` hoặc `getMealPlanById`
    - Hiển thị 4 khung: Breakfast / Lunch / Dinner / Snack
    - Mỗi khung: gọi `getPortions(planId, mealType)` → hiển thị danh sách món + dinh dưỡng
    - Thêm món vào bữa: chọn từ danh sách `dishes` → `addPortion(planId, mealType, { dishId, quantityG })`
    - Tính tổng dinh dưỡng ngày bằng cách `SUM` tất cả portions (dùng `useNutrition` hook hoặc `useMemo`)
    - Lưu template: `createTemplate({ templateName, sourcePlanId })`

**Kết quả kiểm tra:**
- Tạo kế hoạch cho ngày → hiển thị đúng 4 bữa.
- Thêm món vào bữa sáng → portion được tạo, tự động tính calories/protein/carb/fat.
- Tổng dinh dưỡng ngày khớp với target từ `healthGoal`.

---

### Phase 5: Admin Dashboard
**Mục tiêu:** Xây dựng toàn bộ trang quản trị.

20. **Tạo `src/api/adminApi.js`**
    ```js
    export const getStatistics = (params) => axiosInstance.get('/admin/statistics', { params });
    export const getUsers = (params) => axiosInstance.get('/admin/users', { params });
    export const getUserById = (id) => axiosInstance.get(`/admin/users/${id}`);
    export const lockUser = (id) => axiosInstance.patch(`/admin/users/${id}/lock`);
    export const unlockUser = (id) => axiosInstance.patch(`/admin/users/${id}/unlock`);
    export const deleteUser = (id) => axiosInstance.delete(`/admin/users/${id}`);
    export const getAdminDishes = (params) => axiosInstance.get('/admin/dishes', { params });
    export const createAdminDish = (data) => axiosInstance.post('/admin/dishes', data);
    export const updateAdminDish = (id, data) => axiosInstance.put(`/admin/dishes/${id}`, data);
    export const deleteAdminDish = (id) => axiosInstance.delete(`/admin/dishes/${id}`);
    export const getAdminFeedbacks = (params) => axiosInstance.get('/admin/feedbacks', { params });
    export const updateFeedbackStatus = (id, status) => axiosInstance.patch(`/admin/feedbacks/${id}/status`, { status });
    ```

21. **Tạo pages Admin**
    - `AdminLayout.jsx`: sidebar admin (Dashboard, Users, Dishes, Categories, Feedbacks)
    - `AdminDashboard.jsx`: hiển thị `StatsDTO` (cards + biểu đồ Recharts nếu muốn)
    - `AdminUsers.jsx`: bảng users + phân trang + lock/unlock/delete
    - `AdminDishes.jsx`: bảng dishes + phân trang + tạo/sửa/xóa món (form nhập nutrition + ingredients)
    - `AdminCategories.jsx`: bảng categories + thêm/sửa/xóa
    - `AdminFeedbacks.jsx`: bảng feedbacks + cập nhật status

**Kết quả kiểm tra:**
- User admin login → sidebar có link Admin.
- Truy cập `/admin` → hiển thị dashboard với số liệu thật.
- Lock user → user không thể login (BE trả 400/403).

---

### Phase 6: User Feedback & Cleanup
**Mục tiêu:** Hoàn thiện tính năng phản hồi, xóa mock data.

22. **Tạo `src/api/feedbackApi.js`**
    ```js
    export const getMyFeedbacks = () => axiosInstance.get('/feedbacks');
    export const sendFeedback = (content) => axiosInstance.post('/feedbacks', { content });
    ```

23. **Thêm Feedback UI**
    - Trong `Settings.jsx` hoặc trang riêng `/feedback`: form gửi phản hồi + lịch sử phản hồi của user.

24. **Cleanup**
    - Xóa `src/context/AppContext.jsx`
    - Xóa `src/data/mockData.js`
    - Cập nhật `main.jsx` (bỏ `AppProvider` nếu có)
    - Kiểm tra tất cả `import` cũ, đảm bảo không còn tham chiếu mock.

**Kết quả kiểm tra:**
- `npm run build` thành công.
- App chạy không lỗi console.
- Tất cả tính năng cơ bản gọi API thật.

---

## 3. Bảng mapping API ↔ FE Service/Store/Page

| API | FE File | Page/Component |
|---|---|---|
| `POST /auth/login` | `authApi.login` | `Login.jsx` |
| `POST /auth/register` | `authApi.register` | `Register.jsx` |
| `GET /auth/user/{id}` | `authApi.getUser` | `Settings.jsx` (nếu cần refresh) |
| `GET /health-profile/{id}` | `userApi.getHealthProfile` | `Settings.jsx`, `Dashboard.jsx` |
| `POST /health-profile/{id}` | `userApi.saveHealthProfile` | `Settings.jsx` |
| `GET /health-goal/{id}` | `userApi.getHealthGoal` | `Settings.jsx`, `Dashboard.jsx` |
| `POST /health-goal/{id}` | `userApi.saveHealthGoal` | `Settings.jsx` |
| `GET /dishes` | `dishApi.getDishes` | `Recipes.jsx` |
| `GET /dishes/{id}` | `dishApi.getDishById` | `RecipeDetail` (modal/page) |
| `POST /dishes` | `dishApi.createDish` | `Recipes.jsx` (thêm món custom) |
| `GET /dish-categories` | `dishApi.getCategories` | `Recipes.jsx`, `AdminCategories.jsx` |
| `POST /favorites/...` | `dishApi.addFavorite` | `Recipes.jsx` |
| `GET /meal-plans/account/{id}` | `mealApi.getMealPlans` | `MealPlanner.jsx` |
| `GET /meal-plans/{planId}/meals/{type}/portions` | `mealApi.getPortions` | `TodaysMeals.jsx`, `MealPlanner.jsx` |
| `POST /meal-plans/.../portions` | `mealApi.addPortion` | `MealPlanner.jsx` (LogMealModal) |
| `GET /meal-plan-templates?accountId={id}` | `mealApi.getTemplates` | `MealPlanner.jsx` |
| `POST /meal-plan-templates` | `mealApi.createTemplate` | `MealPlanner.jsx` (nút Save Template) |
| `GET /admin/statistics` | `adminApi.getStatistics` | `AdminDashboard.jsx` |
| `GET /admin/users` | `adminApi.getUsers` | `AdminUsers.jsx` |
| `PATCH /admin/users/{id}/lock` | `adminApi.lockUser` | `AdminUsers.jsx` |
| `GET /admin/feedbacks` | `adminApi.getAdminFeedbacks` | `AdminFeedbacks.jsx` |

---

## 4. Lưu ý kỹ thuật quan trọng

### 4.1 CORS
Backend đã có `@CrossOrigin(origins = "*")` trên tất cả controllers. Không cần proxy Vite.

### 4.2 Pagination Response Format
Backend dùng Spring `Page<T>`. Response JSON có dạng:
```json
{
  "content": [...],
  "totalElements": 100,
  "totalPages": 5,
  "number": 0,
  "size": 20
}
```
FE pagination cần đọc `totalPages` và `content`.

### 4.3 `204 No Content`
DELETE endpoints trả `204` (không có body). Axios sẽ có `response.status === 204`, `response.data` là `undefined`. FE không được đọc `response.data.message`.

### 4.4 Login Response
```json
{ "token": "...", "user": { "id": 1, "username": "...", "email": "...", "role": "user", "status": "active" } }
```
FE lưu `response.data.token` và `response.data.user`.

### 4.5 `accountId` param
Một số endpoint yêu cầu `accountId` path/query param. FE lấy từ `authStore.user.id`.

### 4.6 Admin Route Guard
Check `authStore.user.role === 'admin'`. Nếu không, redirect `/dashboard`. BE cũng sẽ tự chặn `403` nếu gọi admin API bằng user.

### 4.7 Token Strategy
- **Mặc định:** Memory-only (Zustand). Refresh page = logout.
- **Dev/Testing (tùy chọn):** Lưu `token` vào `sessionStorage` trong `authStore` để đỡ login lại khi reload. KHÔNG dùng `localStorage`.

### 4.8 Error Handling Pattern
Tất cả API calls trong stores/pages nên bọc `try/catch`:
```js
try {
  const res = await dishApi.getDishes(params);
  set({ dishes: res.data.content });
} catch (err) {
  const msg = err.response?.data?.message || err.message;
  uiStore.getState().showToast(msg, 'error');
}
```

### 4.9 Form Validation (RHF + Zod)
Mọi form phức tạp (login, register, dish create, admin dish, profile) dùng `react-hook-form` + `zodResolver`. Các form đơn giản (tìm kiếm, filter) có thể dùng state thường.

---

## 5. Thứ tự thực hiện tóm tắt

| # | Phase | Thời gian ước tính | Kết quả đầu ra |
|---|---|---|---|
| 1 | Phase 0: Setup Axios + Zustand + Guards | 1h | Infra sẵn sàng |
| 2 | Phase 1: Auth Pages | 2h | Login, Register, Forgot/Reset password hoạt động |
| 3 | Phase 2: Profile + Dashboard | 2h | Settings, Dashboard dùng API thật |
| 4 | Phase 3: Recipes + Dishes | 2h | Recipes có search/filter/favorite/rating |
| 5 | Phase 4: Meal Planner + Portions | 3h | Tạo plan, thêm món, tính dinh dưỡng, template |
| 6 | Phase 5: Admin Dashboard | 3h | Trang admin CRUD users/dishes/categories/feedbacks |
| 7 | Phase 6: Feedback + Cleanup | 1h | Xóa mock data, app chạy hoàn chỉnh |

---

> **Lưu ý cuối:** Nếu phát hiện BE response khác với docs trong quá trình code, cập nhật ngay bảng "Xác nhận API Contract" ở đầu file này để giữ đồng bộ.

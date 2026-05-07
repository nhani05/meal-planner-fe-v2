# Meal Planner UC07–UC12 – Gap Fix Plan

Align the existing Meal Planner frontend with the UC07–UC12 specs by fixing missing flows, adding validation, improving error handling, and upgrading the template overwrite feature.

---

## Gap Analysis (current vs spec)

| UC | Spec requirement | Current state | Gap |
|----|-----------------|---------------|-----|
| UC07 | Modal hiển thị "Tạo mới từ đầu" / "Sử dụng kế hoạch mẫu" | ✅ PlanCreationModal có 2 lựa chọn | OK |
| UC07 | Toast "Tạo kế hoạch thành công" sau khi lưu | ❌ Không có toast khi tạo plan | Missing |
| UC07 | Toast "Không thể tạo kế hoạch lúc này" khi lỗi | ✅ mealStore._createPlan hiện toast | OK |
| UC08 | Gợi ý món yêu thích / gần đây trong AddFoodModal | ❌ Chỉ hiện tất cả món, không có tab gợi ý | Missing |
| UC08 | Empty state "Không tìm thấy món ăn phù hợp" | ❌ Khi filtered rỗng không có thông báo | Missing |
| UC08 | Validate: cảnh báo khi khẩu phần rỗng/0 khi bấm "Add" | ❌ Không validate, min=1 dùng parseInt | Missing |
| UC09 | Nút "Update" rõ ràng + auto-save khi thay đổi | ❌ Không có nút Update trong DayDetailView | Missing |
| UC09 | Real-time macro re-calc khi thay đổi khẩu phần | ✅ Đã có optimistic calc trong store | OK |
| UC09 | Validate khẩu phần âm/rỗng → disable Update button | ❌ MealCard không validate input | Missing |
| UC10 | Toast "Xóa thành công" | ✅ deletePlan hiện "Plan deleted" | OK |
| UC10 | Redirect về calendar sau xóa | ✅ handleDeletePlan gọi setViewMode('calendar') | OK |
| UC11 | Lịch tuần Thứ 2 → Chủ nhật | ✅ getWeekDates dùng Monday start | OK |
| UC11 | Toast "Không thể tải dữ liệu" khi lỗi kết nối | ✅ fetchWeekPlans hiện toast | OK |
| UC11 | Ngày có kế hoạch hiện tóm tắt calo + trạng thái "Planned" | ✅ weekPlanSummaries đã hiển thị | OK |
| UC12 | Validate tên rỗng → hiển thị lỗi inline | ✅ SaveTemplateModal có error state | OK |
| UC12 | Kiểm tra tên trùng → dialog xác nhận ghi đè | ❌ Không có kiểm tra trùng tên | Missing |
| UC12 | Toast "Đã lưu kế hoạch mẫu thành công" | ✅ saveTemplate hiện "Template saved" | OK |

---

## Implementation Steps

### Step 1 – UC07: Toast "Plan created successfully"
- **File**: `src/stores/mealStore.js` → `_createPlan()`
- Thêm `showToast('Plan created successfully', 'success')` sau khi tạo thành công

### Step 2 – UC08: Empty state + Favorites tab trong AddFoodModal
- **File**: `src/components/planner/AddFoodModal.jsx`
- Thêm tab `All | Favorites` (dùng `dishStore.favorites`)
- Khi `filtered.length === 0` hiện "No matching dishes found"
- Validate: khi bấm "Add to Meal", nếu bất kỳ selectedMap item nào có `quantityG <= 0` hoặc rỗng → hiển thị inline error, không đóng modal
- Load favorites khi modal mở (cần `accountId` từ `useAuthStore`)

### Step 3 – UC09: Nút "Update" + validate khẩu phần trong MealCard
- **File**: `src/components/ui/MealCard.jsx`
  - Thêm `localQuantity` state cho mỗi portion (controlled input)
  - Validate: nếu `quantityG <= 0` hoặc rỗng → highlight input đỏ + disable stepper save
  - Giữ auto-save (onBlur / stepper click) nhưng chỉ gọi nếu valid
- **File**: `src/components/planner/DayDetailView.jsx`
  - Thêm nút "Update Plan" (ở header, cạnh "Save as Template")
  - Nút này gọi `onUpdatePlan()` → reload `loadDayDetail` với toast "Updated successfully"
  - Disable nút khi `isAdding` hoặc có portion invalid

### Step 4 – UC12: Kiểm tra tên trùng + dialog ghi đè
- **File**: `src/components/planner/SaveTemplateModal.jsx`
  - Nhận thêm prop `existingTemplates: []`
  - Trước khi lưu: kiểm tra `existingTemplates.find(t => t.templateName === name)`
  - Nếu trùng: hiển thị confirm dialog nhỏ trong modal "Template name already exists. Overwrite?"
  - Nếu xác nhận ghi đè: gọi `onConfirmOverwrite(existingId, name)` → `updateTemplateName` trong store
- **File**: `src/pages/MealPlanner.jsx`
  - Truyền `templates` vào `SaveTemplateModal`
  - Thêm `handleOverwriteTemplate(templateId, name)` gọi `saveTemplate` với overwrite

### Step 5 – UC07/UC11: Đóng PlanCreationModal đúng flow
- **File**: `src/components/planner/PlanCreationModal.jsx`
  - Hiện tại "Create from Scratch" gọi `onCreateNew()` rồi `onClose()` ngay — nếu `ensurePlanForDate` chậm thì modal đóng trước khi plan được tạo
  - Thêm loading state: hiển thị spinner trong nút khi đang tạo

---

## Files to modify

| File | Thay đổi |
|------|---------|
| `src/stores/mealStore.js` | Toast khi tạo plan thành công (Step 1) |
| `src/components/planner/AddFoodModal.jsx` | Favorites tab, empty state, validation (Step 2) |
| `src/components/ui/MealCard.jsx` | Local quantity state, validation, auto-save guard (Step 3) |
| `src/components/planner/DayDetailView.jsx` | Nút Update Plan (Step 3) |
| `src/components/planner/SaveTemplateModal.jsx` | Kiểm tra tên trùng + overwrite confirm (Step 4) |
| `src/pages/MealPlanner.jsx` | Truyền templates vào SaveTemplateModal, handleOverwriteTemplate (Step 4) |
| `src/components/planner/PlanCreationModal.jsx` | Loading state khi đang tạo (Step 5) |

---

## No new files needed
Tất cả thay đổi nằm trong các file hiện có.

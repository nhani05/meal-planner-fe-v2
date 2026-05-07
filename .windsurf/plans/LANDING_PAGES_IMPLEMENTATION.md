# Triển khai Landing Page (4 trang)

Triển khai giao diện giới thiệu website **NutriPlan** với 4 trang công khai: Home, Features, About, Contact - sử dụng tiếng Anh và thiết kế sinh động nhiều hình ảnh.

## Cấu hình đã chọn
- **Routing**: Landing Page tại `/` công khai, Dashboard chuyển sang `/dashboard`
- **Ngôn ngữ**: Tiếng Anh (đồng nhất với app hiện tại)
- **Thiết kế**: Sinh động, nhiều icons/illustrations, animation phong phú
- **Số trang**: 4 trang (Home, Features, About, Contact)

## Files cần tạo

### 1. Layout Components
- `src/components/landing/LandingLayout.jsx` - Layout chung với navbar, footer cho các trang landing
- `src/components/landing/LandingNavbar.jsx` - Navigation bar cố định với logo, menu links, CTA buttons
- `src/components/landing/LandingFooter.jsx` - Footer với links, social icons, copyright

### 2. Page Components
- `src/pages/landing/Home.jsx` - Trang chủ với Hero section, benefits, testimonials, CTA
- `src/pages/landing/Features.jsx` - Chi tiết tính năng với icons, descriptions, screenshots
- `src/pages/landing/About.jsx` - Thông tin về team, mission, vision, giá trị cốt lõi
- `src/pages/landing/Contact.jsx` - Form liên hệ, thông tin liên hệ, FAQ

### 3. Shared Components
- `src/components/landing/SectionHeader.jsx` - Header reusable cho các section
- `src/components/landing/FeatureCard.jsx` - Card hiển thị tính năng
- `src/components/landing/TestimonialCard.jsx` - Card testimonial
- `src/components/landing/TeamCard.jsx` - Card thông tin thành viên team

### 4. Routing Updates
- `src/App.jsx` - Cập nhật routes: `/` (Home), `/features`, `/about`, `/contact`, `/dashboard` (thay cho `/`)

## Cấu trúc routing mới
```
/              → LandingLayout → Home (công khai)
/features      → LandingLayout → Features (công khai)
/about         → LandingLayout → About (công khai)
/contact       → LandingLayout → Contact (công khai)
/login         → AuthLayout → Login
/register      → AuthLayout → Register
/dashboard     → Protected → Layout → Dashboard (đổi từ /)
/meals         → Protected → Layout → TodaysMeals
/planner       → Protected → Layout → MealPlanner
/recipes       → Protected → Layout → Recipes
/templates     → Protected → Layout → Templates
/analytics     → Protected → Layout → Analytics
/settings      → Protected → Layout → Settings
/admin/*       → AdminRoute → AdminLayout → Admin pages
```

## Các section trong trang Home
1. **Hero** - Headline, subheadline, CTA buttons, hero image/illustration
2. **Trusted By** - Logo carousel các đối tác (placeholder)
3. **Features Preview** - 3-4 tính năng nổi bật với icons
4. **How It Works** - 3 bước sử dụng app
5. **Testimonials** - Đánh giá từ người dùng
6. **CTA Section** - Call-to-action đăng ký

## Các section trong trang Features
1. **Page Header** - Tiêu đề và mô tả
2. **Core Features Grid** - Grid 6 tính năng chính
3. **Feature Deep Dive** - Chi tiết từng tính năng lớn
4. **Screenshots** - Mockups/screenshots app

## Các section trong trang About
1. **Mission & Vision** - Giá trị cốt lõi
2. **Team** - Thông tin thành viên
3. **Stats** - Số liệu thống kê (users, recipes, etc.)
4. **Timeline** - Milestones của dự án

## Các section trong trang Contact
1. **Contact Form** - Name, email, message
2. **Contact Info** - Email, address, phone
3. **FAQ** - Câu hỏi thường gặp
4. **Map Placeholder** - Vị trí (nếu cần)

## Dependencies
- Sử dụng `lucide-react` cho icons (đã có)
- Sử dụng `framer-motion` cho animation (đã có)
- Thêm `lucide-react` icons: `ArrowRight`, `Check`, `Star`, `Mail`, `MapPin`, `Phone`, etc.

## Lưu ý khi cài đặt
1. Cập nhật tất cả internal links từ `/` sang `/dashboard` trong Sidebar và các components
2. Đảm bảo ProtectedRoute redirect đến `/login` thay vì `/` sau khi thay đổi
3. Cập nhật authStore nếu cần thay đổi redirect sau login
4. Giữ nguyên style hệ thống màu xanh lá (#006e1c, #4caf50)
5. Responsive design cho mobile/tablet/desktop

## Thời gian dự kiến
- Tạo layout components: 30 phút
- Tạo 4 page components: 90 phút
- Cập nhật routing: 20 phút
- Kiểm tra và chỉnh sửa: 20 phút
- **Tổng**: ~2.5-3 giờ

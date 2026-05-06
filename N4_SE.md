# BÁO CÁO BÀI TẬP LỚN
## Nhập môn Công nghệ Phần mềm

**HỌC VIỆN CÔNG NGHỆ BƯU CHÍNH VIỄN THÔNG**  
**KHOA CÔNG NGHỆ THÔNG TIN 1**

---

> **ĐỀ TÀI: HỆ THỐNG LẬP KẾ HOẠCH BỮA ĂN VÀ QUẢN LÝ DINH DƯỠNG**

<!-- [HÌNH ẢNH: Logo Học viện Công nghệ Bưu chính Viễn thông] -->

**Giảng viên hướng dẫn:** Nguyễn Đình Quảng  
**Nhóm thực hiện:** 04

**Danh sách thành viên nhóm:**

| STT | Họ và tên | Mã sinh viên |
|-----|-----------|--------------|
| 1 | Nguyễn Minh Huyền | B23DCKH060 |
| 2 | Lê Xuân Nhân | B23DCKH083 |
| 3 | Vũ Minh Phước | B23DCKH091 |

**Hà Nội – 2026**

---

## MỤC LỤC

- [I. Mô tả hệ thống](#i-mô-tả-hệ-thống)
  - [1. Mô tả chung về hệ thống, lý do lựa chọn](#1-mô-tả-chung-về-hệ-thống-lý-do-lựa-chọn)
  - [2. Khảo sát các hệ thống tương tự](#2-khảo-sát-các-hệ-thống-tương-tự)
- [II. Thu thập yêu cầu](#ii-thu-thập-yêu-cầu)
  - [1. Bảng thuật ngữ (Glossary list)](#1-bảng-thuật-ngữ-glossary-list)
  - [2. Mô hình nghiệp vụ bằng ngôn ngữ tự nhiên](#2-mô-hình-nghiệp-vụ-bằng-ngôn-ngữ-tự-nhiên)
  - [3. Mô hình nghiệp vụ bằng UML](#3-mô-hình-nghiệp-vụ-bằng-uml)
  - [4. Bảng yêu cầu người dùng (với ID, mô tả, độ ưu tiên)](#4-bảng-yêu-cầu-người-dùng)
- [III. Phân tích](#iii-phân-tích)
  - [1. UC Specification](#1-uc-specification)
  - [2. Trích xuất thực thể và xây dựng sơ đồ lớp phân tích](#2-trích-xuất-thực-thể-và-xây-dựng-sơ-đồ-lớp-phân-tích)
  - [3. Mô hình động](#3-mô-hình-động)
- [IV. Thiết kế](#iv-thiết-kế)
  - [1. Architectural Design](#1-architectural-design)
  - [2. Detailed Design](#2-detailed-design)

---

## I. Mô tả hệ thống

### 1. Mô tả chung về hệ thống, lý do lựa chọn

#### 1.1 Mô tả chung về hệ thống

- Hệ thống lập kế hoạch bữa ăn và quản lý dinh dưỡng **(Meal Planner)** là một ứng dụng hỗ trợ người dùng lập kế hoạch bữa ăn và theo dõi dinh dưỡng hằng ngày. Hệ thống giúp người dùng quản lý chế độ ăn uống khoa học dựa trên các chỉ số cá nhân như tuổi, giới tính, chiều cao, cân nặng và mức độ vận động.
- Hệ thống giúp người dùng xây dựng chế độ ăn uống khoa học, tiết kiệm thời gian lập kế hoạch bữa ăn và cải thiện sức khỏe tổng thể.

#### 1.2 Lý do lựa chọn đề tài

- Hiện nay, vấn đề dinh dưỡng và sức khỏe cá nhân ngày càng được nhiều người quan tâm. Tuy nhiên, nhiều người gặp khó khăn trong việc:
  - Lập kế hoạch bữa ăn cân bằng dinh dưỡng.
  - Kiểm soát lượng calo tiêu thụ mỗi ngày.
  - Theo dõi các chỉ số dinh dưỡng như protein, chất béo, carbohydrate.
  - Chuẩn bị danh sách nguyên liệu khi nấu ăn.
- Phần lớn người dùng thường ăn uống theo thói quen hoặc cảm tính, dẫn đến tình trạng thừa hoặc thiếu dinh dưỡng, ảnh hưởng đến sức khỏe lâu dài.
- Do đó, việc xây dựng hệ thống Meal Planner có ý nghĩa thiết thực vì:
  - Giúp người dùng lập kế hoạch bữa ăn khoa học.
  - Hỗ trợ kiểm soát lượng calo và dinh dưỡng.
  - Giúp tiết kiệm thời gian lên thực đơn và mua sắm thực phẩm.
  - Ứng dụng kiến thức công nghệ thông tin để giải quyết vấn đề thực tế.

### 2. Khảo sát các hệ thống tương tự

Hiện nay có nhiều ứng dụng hỗ trợ theo dõi dinh dưỡng và lập kế hoạch bữa ăn. Một số hệ thống phổ biến bao gồm:

| Ứng dụng | Chức năng chính | Ưu điểm | Nhược điểm |
|----------|----------------|---------|-----------|
| **MyFitnessPal** | Theo dõi lượng calo tiêu thụ mỗi ngày; Cơ sở dữ liệu thực phẩm lớn; Theo dõi các chỉ số dinh dưỡng: protein, carbs, fat; Kết nối với thiết bị theo dõi sức khỏe | Cơ sở dữ liệu món ăn phong phú; Giao diện thân thiện, dễ sử dụng; Có thể quét mã vạch thực phẩm | Một số tính năng nâng cao yêu cầu trả phí; Không tập trung nhiều vào việc lập thực đơn theo tuần |
| **Mealime** | Gợi ý thực đơn theo chế độ ăn (Keto, Vegan, Gluten-Free); Tạo danh sách nguyên liệu cần mua; Hướng dẫn nấu ăn chi tiết | Tập trung mạnh vào meal planning; Giao diện trực quan; Có danh sách đi chợ tự động | Ít chức năng phân tích dinh dưỡng chi tiết; Không cho phép tùy chỉnh món ăn quá sâu |
| **Yazio** | Tính toán lượng calo cần thiết mỗi ngày; Theo dõi bữa ăn và dinh dưỡng; Theo dõi cân nặng và tiến trình giảm cân | Phân tích dinh dưỡng khá chi tiết; Có biểu đồ theo dõi tiến trình sức khỏe | Khả năng lập kế hoạch thực đơn còn hạn chế; Một số tính năng yêu cầu phiên bản trả phí |

- Hệ thống Meal Planner được đề xuất sẽ kết hợp các ưu điểm của các ứng dụng hiện có, đồng thời tập trung vào việc lập thực đơn cá nhân hóa dựa trên nhu cầu dinh dưỡng của người dùng.

---

## II. Thu thập yêu cầu

### 1. Bảng thuật ngữ (Glossary list)

#### NHÓM 1: HỆ THỐNG & TÀI KHOẢN

| ID | Thuật ngữ (VI) | Thuật ngữ (EN) | Định nghĩa trong hệ thống |
|----|---------------|---------------|--------------------------|
| TN-1.01 | Hệ thống | System | Tập hợp các thành phần phần mềm, dữ liệu và quy trình được thiết kế để thực hiện các chức năng nhằm đạt được mục tiêu cụ thể. |
| TN-1.02 | Hệ thống lập thực đơn | Meal Planner | Công cụ phần mềm giúp lập kế hoạch bữa ăn theo ngày hoặc tuần. |
| TN-1.03 | Người dùng | User | Người sử dụng hệ thống để quản lý thực đơn và dinh dưỡng. |
| TN-1.04 | Quản trị hệ thống | System Admin | Người có quyền cao nhất quản lý toàn bộ hệ thống. |
| TN-1.05 | Hồ sơ người dùng | User Profile | Thông tin cá nhân cơ bản như tuổi, chiều cao, cân nặng, giới tính. |
| TN-1.06 | Nhóm | Group | Tập hợp nhiều người dùng cùng lập kế hoạch bữa ăn chung. |
| TN-1.07 | Thành viên nhóm | Group Member | Người dùng tham gia trong một nhóm gia đình/bạn bè. |
| TN-1.08 | Người quản lý nhóm | Group Owner | Người tạo nhóm và có quyền quản lý thành viên. |
| TN-1.09 | Mã mời | Invite Code | Mã chuỗi ký tự dùng để tham gia vào một nhóm. |
| TN-1.10 | Xác thực | Authentication | Quá trình xác nhận danh tính người dùng (đúng tài khoản, mật khẩu). |
| TN-1.11 | Phân quyền | Authorization | Cơ chế xác định quyền truy cập các chức năng dựa trên vai trò. |
| TN-1.12 | Đăng nhập | Login | Quá trình truy cập vào hệ thống bằng tài khoản đã có. |
| TN-1.13 | Đăng ký | Register | Quá trình tạo tài khoản định danh mới trên hệ thống. |
| TN-1.14 | Đăng nhập OAuth | OAuth | Phương thức đăng nhập nhanh qua các nền tảng thứ 3 như Google. |
| TN-1.15 | Trang tổng quan | Dashboard | Màn hình chính tổng hợp các thông tin và chỉ số quan trọng nhất. |
| TN-1.16 | Phiên đăng nhập | Session | Khoảng thời gian người dùng duy trì trạng thái thao tác trên hệ thống. |
| TN-1.17 | Khách vãng lai | Guest | Người truy cập hệ thống chưa có tài khoản, chỉ có quyền xem các tính năng công khai. |
| TN-1.18 | Trạng thái tài khoản | Account Status | Trạng thái hoạt động của tài khoản người dùng: Đang hoạt động / Bị khóa. |

#### NHÓM 2: THỰC ĐƠN & MÓN ĂN

| ID | Thuật ngữ (VI) | Thuật ngữ (EN) | Định nghĩa trong hệ thống |
|----|---------------|---------------|--------------------------|
| TN-2.01 | Kế hoạch bữa ăn | Meal Plan | Tổng thể lịch trình các món ăn được sắp xếp theo thời gian. |
| TN-2.02 | Thực đơn tuần | Weekly Meal Plan | Kế hoạch bữa ăn được thiết lập chi tiết trong 7 ngày. |
| TN-2.03 | Ô bữa ăn | Meal Slot | Vị trí/Khung giờ phân bổ bữa ăn trong lịch trình một ngày. |
| TN-2.04 | Bữa sáng | Breakfast | Bữa ăn đầu tiên trong ngày. |
| TN-2.05 | Bữa trưa | Lunch | Bữa ăn chính vào giữa ngày. |
| TN-2.06 | Bữa tối | Dinner | Bữa ăn chính vào cuối ngày. |
| TN-2.07 | Bữa ăn nhẹ | Snack | Bữa ăn phụ giữa các bữa chính để bổ sung năng lượng. |
| TN-2.08 | Món ăn | Dish | Một thực phẩm đã qua chế biến thành phẩm. |
| TN-2.09 | Thư viện món ăn | Dish Library | Kho dữ liệu có sẵn lưu trữ danh sách các món ăn của hệ thống. |
| TN-2.10 | Món tự tạo | Custom Dish | Món ăn do người dùng tự định nghĩa và thêm mới vào hệ thống. |
| TN-2.11 | Gợi ý món ăn | Meal Recommendation | Đề xuất món ăn phù hợp với mục tiêu dinh dưỡng hiện tại. |
| TN-2.12 | Hệ thống gợi ý | Suggestion Engine | Thuật toán xử lý việc chọn và đề xuất thực đơn cho người dùng. |
| TN-2.13 | Lịch sử bữa ăn | Meal History | Danh sách các món ăn mà người dùng đã lên kế hoạch hoặc đã ăn. |
| TN-2.14 | Sở thích ăn uống | User Preference | Cài đặt về các loại thực phẩm người dùng yêu thích để ưu tiên gợi ý. |
| TN-2.15 | Kế hoạch dinh dưỡng | Diet Plan | Chế độ ăn uống mang tính định hướng dài hạn. |
| TN-2.16 | Công thức nấu ăn | Recipe | Tập hợp các bước hướng dẫn và định lượng nguyên liệu để nấu món ăn. |
| TN-2.17 | Khẩu phần ăn tiêu chuẩn | Serving Size | Lượng thức ăn tiêu chuẩn được tính toán cho một người trong một bữa. |
| TN-2.18 | Thời gian chế biến | Total Time | Tổng thời gian dự kiến để hoàn thành món ăn (sơ chế và đun nấu). |
| TN-2.19 | Độ khó | Difficulty Level | Mức độ phức tạp khi chế biến một món ăn (Dễ, Trung bình, Khó). |
| TN-2.20 | Đánh giá món ăn | Dish Rating | Điểm số hoặc nhận xét người dùng lưu lại cho một món ăn. |
| TN-2.21 | Món ăn yêu thích | Favorite Dish | Tính năng đánh dấu (bookmark) để truy cập nhanh các món ưa thích. |
| TN-2.22 | Thay thế món | Meal Swap | Đề xuất đổi một món trong thực đơn bằng món khác có dinh dưỡng tương đương. |
| TN-2.23 | Sao chép thực đơn | Clone Menu | Thao tác nhân bản nhanh thực đơn sang một khoảng thời gian khác. |
| TN-2.24 | Bữa ăn tự do | Cheat Meal | Bữa ăn ngoại lệ không bị tính toán gắt gao vào giới hạn calo. |
| TN-2.25 | Bộ lọc món ăn | Dish Filter | Công cụ tìm kiếm món ăn theo nhiều tiêu chí (calo, loại, thời gian...). |
| TN-2.26 | Khẩu phần ăn thực tế | Portion Size | Lượng thực tế nạp vào cơ thể. Linh hoạt, do người dùng tự quyết định, lớn hoặc nhỏ hơn serving size. |
| TN-2.27 | Kế hoạch mẫu | Meal Plan Template | Kế hoạch bữa ăn đã được người dùng lưu lại để tái sử dụng cho các ngày/tuần khác. |
| TN-2.28 | Danh mục món ăn | Dish Category | Nhóm phân loại của món ăn trong hệ thống (Ví dụ: Cơm, Canh, Salad, Đồ uống). |
| TN-2.29 | Khung bữa ăn | Meal Slot Frame | Giao diện vùng chứa (container UI) để người dùng thêm và quản lý các món ăn trong một bữa cụ thể. |
| TN-2.30 | Nguồn gốc món ăn | Dish Source | Thuộc tính xác định món ăn do hệ thống cung cấp (system) hay do người dùng tự tạo (custom). |

#### NHÓM 3: DINH DƯỠNG & SỨC KHỎE

| ID | Thuật ngữ (VI) | Thuật ngữ (EN) | Định nghĩa trong hệ thống |
|----|---------------|---------------|--------------------------|
| TN-3.01 | Dinh dưỡng | Nutrition | Thông tin chung về mức năng lượng và các chất cấu thành thực phẩm. |
| TN-3.02 | Calo | Calories | Đơn vị đo lường năng lượng của thực phẩm hoặc năng lượng tiêu hao. |
| TN-3.03 | Chất đạm | Protein | Thành phần dinh dưỡng đa lượng giúp phục hồi và phát triển cơ. |
| TN-3.04 | Tinh bột | Carbohydrate | Nguồn dưỡng chất cung cấp năng lượng chính cho cơ thể. |
| TN-3.05 | Chất béo | Fat | Chất dinh dưỡng đa lượng giúp dự trữ năng lượng và hấp thụ vitamin. |
| TN-3.06 | Chất béo bão hòa | Saturated Fat | Loại chất béo hệ thống nhắc nhở cần hạn chế tiêu thụ. |
| TN-3.07 | Chất xơ | Fiber | Phần không tiêu hóa được của thực vật, hỗ trợ tốt cho tiêu hóa. |
| TN-3.08 | Mục tiêu dinh dưỡng | Nutrition Goal | Các mốc calo và tỷ lệ dinh dưỡng đích mà người dùng muốn đạt. |
| TN-3.09 | Mục tiêu calo | Daily Calories Target | Tổng lượng calo tối đa hoặc tối thiểu cần nạp vào mỗi ngày. |
| TN-3.10 | Theo dõi dinh dưỡng | Nutrition Tracking | Quá trình giám sát, tính toán tự động lượng dinh dưỡng đã tiêu thụ. |
| TN-3.11 | Biểu đồ dinh dưỡng | Nutrition Chart | Giao diện đồ thị trực quan hóa các chỉ số dinh dưỡng theo thời gian. |
| TN-3.12 | Phân tích bữa ăn | Meal Analytics | Việc xử lý và bóc tách dữ liệu dinh dưỡng từ các món ăn đã nhập. |
| TN-3.13 | Dị ứng thực phẩm | Food Allergy | Các loại thực phẩm gây kích ứng cơ thể mà người dùng cần tránh. |
| TN-3.14 | Chế độ ăn lành mạnh | Healthy Diet | Chế độ ăn cân bằng dinh dưỡng, tốt cho sức khỏe tổng thể. |
| TN-3.15 | Chế độ ăn Keto | Keto Diet | Chế độ ăn cắt giảm tối đa tinh bột, tăng cường chất béo. |
| TN-3.16 | Chế độ ăn thuần chay | Vegan Diet | Chế độ ăn hoàn toàn không sử dụng các nguyên liệu từ động vật. |
| TN-3.17 | Giảm cân | Weight Loss | Mục tiêu giảm trọng lượng cơ thể hiện tại. |
| TN-3.18 | Tăng cơ | Muscle Gain | Mục tiêu tăng khối lượng cơ bắp thông qua ăn uống và tập luyện. |
| TN-3.19 | Tổng năng lượng tiêu hao | TDEE | Tổng lượng calo cơ thể đốt cháy mỗi ngày dựa trên mức độ vận động. |
| TN-3.20 | Chỉ số sức khỏe | Health Metric | Các thông số y tế hoặc thể chất của người dùng. |
| TN-3.21 | Chỉ số cơ thể | Body Metrics | Số đo cơ thể hiện hành như chiều cao, cân nặng, tỷ lệ mỡ. |
| TN-3.22 | Chỉ số BMI | BMI | Chỉ số tính từ chiều cao và cân nặng để đánh giá tình trạng cơ thể. |
| TN-3.23 | Đa lượng chất | Macronutrients (Macros) | Ba nhóm chất sinh năng lượng chính: Tinh bột (Carb), Đạm (Protein), Béo (Fat). |
| TN-3.24 | Vi lượng chất | Micronutrients | Các loại vitamin và khoáng chất hệ thống theo dõi (Sắt, Canxi, Vitamin C...). |
| TN-3.25 | Tỷ lệ trao đổi chất | BMR | Lượng calo tối thiểu cơ thể cần để duy trì các chức năng sống khi nghỉ ngơi. |
| TN-3.26 | Thâm hụt calo | Calorie Deficit | Trạng thái lượng calo nạp vào ít hơn tổng calo tiêu hao (để giảm cân). |
| TN-3.27 | Dư thừa calo | Calorie Surplus | Trạng thái lượng calo nạp vào nhiều hơn tổng calo tiêu hao (để tăng cân). |
| TN-3.28 | Cân nặng mục tiêu | Target Weight | Trọng lượng đích dùng để hệ thống tính toán lộ trình thời gian và calo. |
| TN-3.29 | Nhật ký ăn uống | Food Log/Diary | Giao diện ghi nhận thực tế những món người dùng đã ăn trong ngày. |
| TN-3.30 | Mục tiêu lượng nước | Water Goal | Lượng nước (ml) hệ thống khuyến nghị người dùng cần uống mỗi ngày. |
| TN-3.31 | Theo dõi lượng nước | Water Tracking | Chức năng ghi chú lại số ly nước hoặc lượng nước (ml) người dùng đã uống. |
| TN-3.32 | Chỉ số đường huyết | GI (Glycemic Index) | Chỉ số phân loại tốc độ làm tăng đường huyết của thực phẩm. |
| TN-3.33 | Mức độ vận động | Activity Level | Mức độ thể chất hàng ngày của người dùng (Thấp / Trung bình / Cao), dùng để tính TDEE và calo mục tiêu. |
| TN-3.34 | Gợi ý điều chỉnh | Adjustment Suggestion | Đề xuất hệ thống sinh ra để người dùng thêm món, giảm khẩu phần hoặc thay món nhằm đạt mục tiêu dinh dưỡng. |
| TN-3.35 | Tỉ lệ đạt mục tiêu | Goal Achievement Rate | Phần trăm mức độ hoàn thành mục tiêu dinh dưỡng trong ngày, so sánh giữa lượng thực tế và mục tiêu đề ra. |
| TN-3.36 | Chỉ số dinh dưỡng bữa ăn | Meal Nutrition Summary | Tổng hợp các giá trị calo, protein, carb, chất béo được tính toán tự động cho một bữa ăn cụ thể. |

#### NHÓM 4: MUA SẮM & NGUYÊN LIỆU

| ID | Thuật ngữ (VI) | Thuật ngữ (EN) | Định nghĩa trong hệ thống |
|----|---------------|---------------|--------------------------|
| TN-4.01 | Nguyên liệu | Ingredient | Thành phần đơn lẻ cấu tạo nên món ăn (Ví dụ: thịt, rau, muối). |
| TN-4.02 | Danh mục nguyên liệu | Ingredient Category | Nhóm phân loại của nguyên liệu (Ví dụ: Đồ tươi sống, Gia vị, Rau củ). |
| TN-4.03 | Số lượng | Quantity | Mức định lượng cần dùng hoặc cần mua của một nguyên liệu. |
| TN-4.04 | Đơn vị | Unit | Ký hiệu quy chuẩn đo lường (Ví dụ: gram, kg, ml). |
| TN-4.05 | Danh sách đi chợ | Shopping List | Danh sách các nguyên liệu cần mua được tạo tự động từ thực đơn. |
| TN-4.06 | Mục mua sắm | Shopping Item | Một dòng cụ thể (một nguyên liệu) trong danh sách đi chợ. |
| TN-4.07 | Gộp nguyên liệu | Consolidation | Tính năng cộng dồn tự động các nguyên liệu giống nhau từ nhiều món ăn. |
| TN-4.08 | Phân loại nguyên liệu | Shopping Category | Việc tự động nhóm các mặt hàng mua sắm theo quầy/kệ siêu thị để dễ tìm. |
| TN-4.09 | Trạng thái mua | Purchase Status | Trạng thái đánh dấu tick (Đã mua) hoặc để trống (Chưa mua) trong danh sách. |
| TN-4.10 | Chi phí | Expense | Số tiền bỏ ra để mua thực phẩm hoặc nguyên liệu. |
| TN-4.11 | Chi phí tuần | Weekly Expense | Tổng chi phí ước tính hoặc thực tế cho thực đơn của một tuần. |
| TN-4.12 | Chia chi phí | Cost Sharing | Tính năng chia đều chi phí mua sắm cho các thành viên trong nhóm. |
| TN-4.13 | Tủ lạnh / Kho dự trữ | Pantry / Inventory | Quản lý các nguyên liệu người dùng đang có sẵn ở nhà để tránh mua thừa. |
| TN-4.14 | Nguyên liệu thay thế | Substitute Ingredient | Đề xuất nguyên liệu khác có thể dùng thay thế khi nguyên liệu gốc hết hàng. |
| TN-4.15 | Quét mã vạch | Barcode Scanning | Dùng camera quét mã bao bì thực phẩm để truy xuất nhanh thông tin. |
| TN-4.16 | Hạn sử dụng | Expiration Date | Ngày hết hạn của thực phẩm lưu trong kho dự trữ để hệ thống cảnh báo. |
| TN-4.17 | Giá dự kiến | Estimated Price | Mức chi phí ước tính hệ thống đưa ra cho danh sách đi chợ. |
| TN-4.18 | Lịch sử mua sắm | Shopping History | Danh sách các biên lai/danh sách đi chợ đã được đánh dấu hoàn thành. |
| TN-4.19 | Đơn vị đo lường | Measurement Unit | Các đơn vị chuẩn hóa dùng trong hệ thống (muỗng canh, muỗng cà phê...). |
| TN-4.20 | Nguyên liệu thô | Raw Ingredient | Các thực phẩm chưa qua chế biến, có mức tính toán calo khác với nấu chín. |

#### NHÓM 5: KỸ THUẬT, GIAO DIỆN & PHÂN TÍCH

| ID | Thuật ngữ (VI) | Thuật ngữ (EN) | Định nghĩa trong hệ thống |
|----|---------------|---------------|--------------------------|
| TN-5.01 | Thông báo | Notification | Các cảnh báo, tin nhắn từ hệ thống gửi đến người dùng. |
| TN-5.02 | Nhắc nhở | Reminder | Thông báo theo lịch trình (ví dụ: nhắc uống nước, nhắc nấu ăn). |
| TN-5.03 | Thông báo đẩy | Push Notification | Thông báo nổi hiển thị trực tiếp trên màn hình thiết bị di động/trình duyệt. |
| TN-5.04 | Thông báo hệ thống | System Notification | Cảnh báo tự động về lỗi hoặc cập nhật của ứng dụng. |
| TN-5.05 | Giao diện lập trình | API | Cổng kết nối để hệ thống trao đổi dữ liệu với các ứng dụng khác. |
| TN-5.06 | API dinh dưỡng | Nutrition API | Cổng cung cấp dữ liệu calo và thành phần thực phẩm từ kho dữ liệu chuẩn. |
| TN-5.07 | API bên ngoài | External API | Các cổng kết nối của bên thứ ba (như cổng thanh toán, Google Auth). |
| TN-5.08 | Cơ sở dữ liệu | Database | Hệ thống quản trị, lưu trữ dữ liệu người dùng, thực đơn, món ăn. |
| TN-5.09 | Cấu trúc dữ liệu | Schema | Mô hình thiết kế các bảng và mối quan hệ dữ liệu trong Database. |
| TN-5.10 | Máy chủ | Backend | Phần mềm chạy trên máy chủ, xử lý tính toán logic (tính TDEE, tổng calo). |
| TN-5.11 | Giao diện người dùng | Frontend / UI | Phần thiết kế hình ảnh, nút bấm mà người dùng thao tác trực tiếp. |
| TN-5.12 | Trải nghiệm người dùng | UX | Cảm nhận về sự thuận tiện, logic khi sử dụng hệ thống. |
| TN-5.13 | Thiết kế thích ứng | Responsive Design | Công nghệ giúp giao diện tự động điều chỉnh vừa với mọi kích thước màn hình. |
| TN-5.14 | Kéo thả | Drag and Drop | Thao tác UI cho phép nhấn giữ và di chuyển món ăn vào các ô bữa ăn. |
| TN-5.15 | Tác nhân | Actor | Người dùng hoặc hệ thống bên ngoài tương tác với phần mềm trong Use Case. |
| TN-5.16 | Mức độ ưu tiên | Priority | Đánh giá tính cấp thiết của một Use Case (Must Have, Should Have...). |
| TN-5.17 | Kích hoạt | Trigger | Hành động mồi (click, gõ phím) bắt đầu khởi phát một chuỗi Use Case. |
| TN-5.18 | Điều kiện tiên quyết | Pre-Condition | Trạng thái bắt buộc hệ thống phải có/đáp ứng trước khi Use Case chạy. |
| TN-5.19 | Điều kiện kết thúc | Post-Condition | Trạng thái của hệ thống sau khi một Use Case chạy hoàn tất. |
| TN-5.20 | Luồng cơ bản | Basic Flow | Chuỗi các bước thao tác lý tưởng và thành công của một chức năng. |
| TN-5.21 | Luồng rẽ nhánh | Alternative Flow | Các hướng thao tác thay thế khác ngoài luồng chuẩn nhưng vẫn hợp lệ. |
| TN-5.22 | Luồng ngoại lệ | Exception Flow | Quy trình hệ thống hiển thị lỗi và xử lý khi người dùng thao tác sai. |
| TN-5.23 | Quy tắc nghiệp vụ | Business Rules | Ràng buộc logic (Ví dụ: Lượng calo phải > 0, tên món không được để trống). |
| TN-5.24 | Yêu cầu phi chức năng | Non-Functional Requirement | Các yêu cầu không thuộc tính năng như tốc độ phản hồi, tính bảo mật, hiệu năng. |
| TN-5.25 | Ca sử dụng | Use Case | Mô tả tính năng phần mềm từ góc nhìn tương tác của Tác nhân (Actor). |
| TN-5.26 | Hộp thoại xác nhận | Confirmation Dialog | Cửa sổ pop-up yêu cầu người dùng xác nhận trước khi hệ thống thực hiện hành động quan trọng (xóa, khóa, đăng xuất). |
| TN-5.27 | Bảng điều khiển Admin | Admin Dashboard | Màn hình tổng quan dành riêng cho Quản trị viên, tập hợp các chức năng quản lý hệ thống. |
| TN-5.28 | Nhật ký Admin | Admin Audit Log | Bản ghi lịch sử các thao tác quản trị (khóa tài khoản, sửa/xóa món ăn...) kèm thông tin thời gian và đối tượng bị tác động. |
| TN-5.29 | Phản hồi người dùng | User Feedback | Nội dung góp ý hoặc báo cáo lỗi mà người dùng gửi lên hệ thống để admin xem xét và xử lý. |
| TN-5.30 | Thống kê hệ thống | System Analytics | Dữ liệu tổng hợp phản ánh hoạt động của hệ thống (số người dùng mới, số kế hoạch tạo, món ăn phổ biến) dùng cho mục đích quản trị. |

---

### 2. Mô hình nghiệp vụ bằng ngôn ngữ tự nhiên

#### 2.1 Mục tiêu và phạm vi hệ thống

- **Mục tiêu của hệ thống:** Hệ thống là phần mềm ứng dụng cho phép quản lý và lên kế hoạch bữa ăn theo ngày, tính toán và theo dõi dinh dưỡng cho từng bữa ăn.
- **Phạm vi hệ thống:**
  - Kiểu ứng dụng: ứng dụng web
  - Đối tượng phục vụ:
    - Những người muốn quản lý chế độ ăn uống và dinh dưỡng cá nhân
    - Người quan tâm đến sức khỏe và cân bằng dinh dưỡng
    - Người muốn lập kế hoạch bữa ăn hằng ngày
  - Đối tượng sử dụng:
    - **Người dùng (User):** sử dụng hệ thống để nhập thông tin sức khỏe, lập kế hoạch bữa ăn, tạo món ăn riêng của mình và theo dõi dinh dưỡng.
    - **Quản trị viên hệ thống (Admin):** quản lý dữ liệu món ăn và thông tin người dùng trong hệ thống.
  - Chức năng phục vụ:
    - **Quản lý tài khoản:** đăng ký, đăng nhập, cập nhật hồ sơ, thông tin sức khỏe (nhập chiều cao, nhập cân nặng, mục tiêu dinh dưỡng).
    - **Thư viện món ăn:** xem danh sách món ăn, xem chi tiết món ăn (thông tin dinh dưỡng).
    - **Lập kế hoạch bữa ăn:** chọn món cho từng bữa, lập kế hoạch theo ngày / tuần.

#### 2.2 Ai có thể sử dụng phần mềm? (Đối tượng sử dụng và chức năng)

**Các Actor trong hệ thống:**

**Actor 1: Khách vãng lai (Guest)** – Người chưa có tài khoản, truy cập hệ thống lần đầu

| STT | Chức năng |
|-----|-----------|
| 1 | Xem giới thiệu hệ thống |
| 2 | Tìm kiếm món ăn công khai |
| 3 | Xem thông tin dinh dưỡng cơ bản của món ăn |
| 4 | Đăng ký tài khoản |
| 5 | Đăng nhập |

**Actor 2: Người dùng đã đăng nhập (Registered User)** – Người đã có tài khoản, sử dụng đầy đủ tính năng cá nhân

| STT | Chức năng |
|-----|-----------|
| **Quản lý tài khoản** | |
| 1 | Đăng nhập / Đăng xuất |
| 2 | Cập nhật thông tin cá nhân (tuổi, giới tính, chiều cao, cân nặng) |
| 3 | Thiết lập mục tiêu sức khỏe (giảm cân, tăng cơ, duy trì) |
| 4 | Đổi mật khẩu |
| **Quản lý kế hoạch món ăn** | |
| 5 | Tạo kế hoạch bữa ăn trong ngày |
| 6 | Thêm món ăn vào kế hoạch (sáng/trưa/tối/phụ) |
| 7 | Chỉnh sửa / Xóa kế hoạch bữa ăn |
| 8 | Xem lịch kế hoạch bữa ăn |
| 9 | Lưu kế hoạch mẫu yêu thích |
| **Quản lý món ăn cá nhân** | |
| 10 | Tìm kiếm món ăn trong hệ thống |
| 11 | Thêm món ăn tùy chỉnh (tự nhập thành phần) |
| 12 | Lưu món ăn yêu thích |

**Actor 3: Quản trị viên (Admin)** – Người quản lý toàn bộ hệ thống và dữ liệu

| STT | Chức năng |
|-----|-----------|
| 1 | Quản lý tài khoản người dùng (xem, khóa, xóa) |
| 2 | Quản lý danh mục món ăn (thêm, sửa, xóa) |
| 3 | Quản lý thông tin dinh dưỡng của món ăn |
| 4 | Xem thống kê người dùng |
| 5 | Quản lý phản hồi / báo cáo từ người dùng |

#### 2.3 Mô tả chức năng hoạt động

##### MODULE 1: QUẢN LÝ TÀI KHOẢN

**Đăng ký tài khoản**
- Người dùng chọn chức năng "Đăng ký" tại màn hình Trang chủ.
- Hệ thống hiển thị giao diện Đăng ký, bao gồm các trường nhập liệu: Họ và tên, Email, Mật khẩu, Xác nhận mật khẩu; các nút chức năng: Đăng ký, Hủy.
- Người dùng nhập thông tin cần thiết và nhấn "Đăng ký".
- Hệ thống kiểm tra tính hợp lệ của dữ liệu (email đúng định dạng, mật khẩu khớp, email chưa tồn tại).
- Hệ thống lưu thông tin tài khoản và hiển thị thông báo "Đăng ký thành công".
- Người dùng chọn OK trên thông báo.
- Hệ thống chuyển về màn hình Đăng nhập.

**Đăng nhập**
- Người dùng chọn chức năng "Đăng nhập" tại màn hình Trang chủ.
- Hệ thống hiển thị giao diện Đăng nhập, bao gồm các trường nhập liệu: Email, Mật khẩu; các nút chức năng: Đăng nhập, Quên mật khẩu.
- Người dùng nhập thông tin và nhấn "Đăng nhập".
- Hệ thống xác thực thông tin tài khoản.
- Hệ thống hiển thị thông báo "Đăng nhập thành công" và chuyển đến màn hình Trang chủ cá nhân.

**Đăng xuất**
- Người dùng chọn chức năng "Đăng xuất" tại menu cá nhân.
- Hệ thống hiển thị hộp thoại xác nhận "Bạn có chắc muốn đăng xuất không?" với các nút: Xác nhận, Hủy.
- Người dùng chọn "Xác nhận".
- Hệ thống kết thúc phiên làm việc và chuyển về màn hình Trang chủ.

**Lấy lại mật khẩu**
- Người dùng truy cập vào trang đăng nhập của hệ thống và click "Quên mật khẩu".
- Trang quên mật khẩu hiển thị có ô nhập email và nút "Lấy lại mật khẩu".
- Người dùng nhập email và click nút "Lấy lại mật khẩu".
- Hệ thống gửi email lấy lại mật khẩu cho người dùng.
- Người dùng truy cập vào email và click vào link lấy lại mật khẩu.
- Trang đặt lại mật khẩu hiển thị có ô nhập password mới và nút xác nhận.
- Người dùng nhập password mới và click "Xác nhận".
- Hệ thống cập nhật password mới và thông báo cập nhật mật khẩu thành công.

**Cập nhật thông tin cá nhân**
- Người dùng chọn chức năng "Chỉnh sửa thông tin" tại màn hình Thông tin cá nhân.
- Hệ thống hiển thị giao diện chỉnh sửa với các trường: Họ và tên, Tuổi, Giới tính, Chiều cao (cm), Cân nặng (kg); các nút: Lưu, Hủy.
- Người dùng chỉnh sửa thông tin và nhấn "Lưu".
- Hệ thống kiểm tra tính hợp lệ và lưu thông tin.
- Hệ thống hiển thị thông báo "Cập nhật thành công" và làm mới màn hình Thông tin cá nhân.

**Thiết lập mục tiêu sức khỏe**
- Người dùng chọn chức năng "Thiết lập mục tiêu" tại màn hình Thông tin cá nhân.
- Hệ thống hiển thị giao diện Thiết lập mục tiêu với các lựa chọn: Mục tiêu (Giảm cân / Tăng cơ / Duy trì), Mức độ vận động, Calo mục tiêu mỗi ngày; các nút: Lưu, Hủy.
- Người dùng chọn mục tiêu phù hợp và nhấn "Lưu".
- Hệ thống tính toán và đề xuất lượng calo, dinh dưỡng chuẩn theo thông tin cá nhân.
- Hệ thống lưu mục tiêu và hiển thị thông báo "Thiết lập mục tiêu thành công".

##### MODULE 2: QUẢN LÝ KẾ HOẠCH BỮA ĂN

1. **Xem lịch kế hoạch bữa ăn:** Người dùng đăng nhập vào hệ thống và chọn chức năng "Kế hoạch bữa ăn" → Hệ thống hiển thị lịch tuần hiện tại với đầy đủ 7 ngày → Các ngày đã có kế hoạch hiển thị thông tin tóm tắt (tổng calo, trạng thái dinh dưỡng), các ngày trống hiển thị nút "Tạo kế hoạch" → Người dùng có thể chuyển sang tuần trước hoặc tuần sau để xem dữ liệu tương ứng → Người dùng nhấn vào một ngày đã có kế hoạch → Hệ thống hiển thị giao diện chi tiết các bữa ăn trong ngày đó.

2. **Tạo kế hoạch bữa ăn:** Người dùng đang ở giao diện lịch tuần và nhấn "Tạo kế hoạch" tại một ngày trống → Hệ thống hiển thị tùy chọn "Tạo mới từ đầu" hoặc "Sử dụng kế hoạch mẫu" → Người dùng chọn "Sử dụng kế hoạch mẫu" và chọn một mẫu có sẵn (hệ thống tự động điền các món ăn) HOẶC chọn "Tạo mới từ đầu" (hệ thống hiển thị các khung bữa ăn trống) → Người dùng thêm món ăn vào các khung bữa (Sáng / Trưa / Tối / Phụ) → Người dùng nhấn "Lưu kế hoạch" → Hệ thống lưu dữ liệu, hiển thị thông báo "Tạo kế hoạch thành công" và cập nhật lại giao diện lịch tuần.

3. **Chỉnh sửa kế hoạch bữa ăn:** Người dùng đang ở giao diện chi tiết của một ngày đã có kế hoạch → Người dùng thực hiện thao tác trực tiếp bằng cách nhấn vào món ăn hiện tại để sửa khẩu phần, nhấn icon xóa để bỏ món, hoặc nhấn thêm món mới vào khung bữa ăn → Hệ thống tự động tính toán lại tổng calo và chỉ số dinh dưỡng hiển thị ngay trên màn hình → Người dùng nhấn "Cập nhật" → Hệ thống ghi nhận thay đổi, hiển thị thông báo "Cập nhật kế hoạch thành công" và duy trì màn hình chi tiết với dữ liệu mới.

4. **Xóa kế hoạch bữa ăn:** Người dùng đang ở giao diện chi tiết của kế hoạch muốn xóa → Người dùng nhấn nút "Xóa" → Hệ thống hiển thị hộp thoại xác nhận việc xóa kế hoạch → Người dùng chọn "Xác nhận" → Hệ thống xóa hoàn toàn kế hoạch cùng các bữa ăn liên quan của ngày đó, hiển thị thông báo "Xóa kế hoạch thành công" và tự động chuyển người dùng về màn hình lịch tuần đã được làm mới.

5. **Thêm món ăn vào kế hoạch:** Người dùng đang ở giao diện chi tiết kế hoạch → Người dùng chọn thêm món tại khung bữa ăn mong muốn (Sáng / Trưa / Tối / Phụ) → Giao diện thêm món hiển thị với thanh tìm kiếm cùng danh sách ưu tiên các món ăn gần đây và món ăn yêu thích → Người dùng tìm kiếm và tích chọn một hoặc nhiều món ăn cùng lúc → Người dùng nhập định lượng khẩu phần cho các món đã chọn và nhấn "Thêm vào bữa" → Hệ thống nạp các món ăn vào khung bữa, tự động cập nhật tổng calo cùng thông tin dinh dưỡng của bữa đó.

6. **Lưu kế hoạch mẫu yêu thích:** Người dùng đang ở giao diện chi tiết của kế hoạch muốn lưu làm mẫu → Người dùng nhấn "Lưu làm mẫu" → Hộp thoại hiển thị với ô nhập tên mẫu cùng hai nút Lưu và Hủy → Người dùng nhập tên cho kế hoạch mẫu và nhấn "Lưu" → Hệ thống lưu kế hoạch thành mẫu có thể tái sử dụng, hiển thị thông báo "Đã lưu kế hoạch mẫu thành công" và trở về giao diện chi tiết kế hoạch.

##### MODULE 3: QUẢN LÝ MÓN ĂN

**Tìm kiếm món ăn**
- Người dùng chọn chức năng "Tìm kiếm món ăn" tại màn hình chính hoặc khi thêm món vào kế hoạch.
- Hệ thống hiển thị giao diện tìm kiếm với ô nhập từ khóa và bộ lọc: Danh mục, Calo, Nguyên liệu.
- Người dùng nhập từ khóa hoặc chọn bộ lọc và nhấn "Tìm kiếm".
- Hệ thống hiển thị danh sách món ăn phù hợp kèm thông tin calo cơ bản.
- Người dùng chọn món ăn để xem chi tiết dinh dưỡng đầy đủ.

**Thêm món ăn tùy chỉnh**
- Người dùng chọn chức năng "Thêm món ăn mới" tại màn hình Món ăn của tôi.
- Hệ thống hiển thị giao diện nhập liệu gồm: Tên món, Danh mục, Ảnh món ăn, Danh sách nguyên liệu (tên + khối lượng), các nút: Lưu, Hủy.
- Người dùng nhập thông tin và danh sách nguyên liệu, nhấn "Lưu".
- Hệ thống tự động tính toán dinh dưỡng dựa trên nguyên liệu đã nhập.
- Hệ thống lưu món ăn vào danh sách cá nhân và hiển thị thông báo "Thêm món ăn thành công".

**Lưu món ăn yêu thích**
- Người dùng xem chi tiết một món ăn và chọn biểu tượng "Yêu thích" (trái tim).
- Hệ thống lưu món ăn vào danh sách Yêu thích và đổi biểu tượng sang màu đỏ.
- Người dùng có thể xem toàn bộ món ăn yêu thích tại màn hình "Món ăn yêu thích".

##### MODULE 4: QUẢN TRỊ HỆ THỐNG (ADMIN)

**Quản lý tài khoản người dùng**
- Admin chọn chức năng "Quản lý người dùng" tại màn hình Bảng điều khiển Admin.
- Hệ thống hiển thị danh sách tài khoản người dùng kèm thông tin: Họ tên, Email, Trạng thái, Ngày tạo; các nút chức năng: Xem, Khóa, Xóa.
- Admin chọn người dùng cần thao tác và chọn hành động tương ứng.
- Hệ thống hiển thị hộp thoại xác nhận trước khi thực hiện Khóa hoặc Xóa.
- Admin xác nhận, hệ thống thực hiện và hiển thị thông báo thành công.

**Quản lý danh mục món ăn**
- Admin chọn chức năng "Quản lý món ăn" tại màn hình Bảng điều khiển Admin.
- Hệ thống hiển thị danh sách món ăn với các nút: Thêm mới, Chỉnh sửa, Xóa.
- Admin chọn thao tác cần thực hiện (Thêm/Sửa/Xóa).
- Với Thêm/Sửa: Hệ thống hiển thị form nhập liệu gồm Tên món, Danh mục, Nguyên liệu, Thông tin dinh dưỡng, Ảnh; Admin nhập và nhấn "Lưu".
- Với Xóa: Hệ thống hiển thị hộp thoại xác nhận; Admin xác nhận xóa.
- Hệ thống thực hiện và hiển thị thông báo thành công, làm mới danh sách.

**Xem thống kê người dùng**
- Admin chọn chức năng "Thống kê" tại màn hình Bảng điều khiển Admin.
- Hệ thống hiển thị dashboard thống kê gồm: Tổng số người dùng, Người dùng mới theo tháng, Số kế hoạch được tạo, Món ăn được dùng nhiều nhất.
- Admin có thể chọn khoảng thời gian để lọc thống kê.
- Hệ thống cập nhật biểu đồ và số liệu tương ứng.

**Quản lý phản hồi từ người dùng**
- Admin chọn chức năng "Phản hồi" tại màn hình Bảng điều khiển Admin.
- Hệ thống hiển thị danh sách phản hồi/báo cáo từ người dùng, kèm trạng thái: Chưa xử lý, Đang xử lý, Đã xử lý.
- Admin chọn phản hồi cần xem và thực hiện xử lý.
- Hệ thống lưu trạng thái xử lý và cập nhật danh sách phản hồi.

#### 2.4 Những thông tin / đối tượng mà hệ thống cần xử lý

- **Tài khoản:** họ tên, email, mật khẩu (đã mã hóa), vai trò (người dùng / admin), trạng thái (hoạt động / bị khóa), ngày tạo.
- **Thông tin cá nhân:** tuổi, giới tính, chiều cao (cm), cân nặng (kg), ảnh đại diện.
- **Mục tiêu sức khỏe:** loại mục tiêu (giảm cân / tăng cơ / duy trì), mức độ vận động (thấp / trung bình / cao), calo mục tiêu mỗi ngày, protein mục tiêu (g/ngày), carb mục tiêu (g/ngày), chất béo mục tiêu (g/ngày).
- **Kế hoạch bữa ăn:** tên kế hoạch, người tạo, ngày cho kế hoạch bữa ăn, ngày tạo.
- **Bữa ăn:** loại bữa (sáng / trưa / tối / phụ), ngày của bữa, tổng calo (tính tự động từ các khẩu phần).
- **Khẩu phần:** món ăn được chọn, khối lượng (gram / ml), calo thực tế, protein thực tế, carb thực tế, chất béo thực tế (các giá trị tính tự động theo khối lượng nhập vào).
- **Kế hoạch mẫu:** tên mẫu, cấu trúc bữa ăn được sao chép từ kế hoạch gốc, ngày lưu mẫu.
- **Món ăn:** tên món, danh mục (cơm / canh / salad / đồ uống...), ảnh minh họa, nguồn gốc (hệ thống / người dùng tự tạo), ngày tạo.
- **Nguyên liệu:** tên nguyên liệu, khối lượng trong công thức gốc (gram).
- **Thông tin dinh dưỡng:** calo (kcal/100g), protein (g/100g), carbohydrate (g/100g), chất béo (g/100g), vitamin (A, C, D...), khoáng chất (Ca, Fe...).
- **Món ăn yêu thích:** tài khoản người lưu, món ăn được lưu, ngày lưu.
- **Thống kê dinh dưỡng:** ngày thống kê, tổng calo thực tế, tổng protein, tổng carb, tổng chất béo, tỉ lệ đạt mục tiêu (%) — dữ liệu tính động, không nhất thiết lưu cứng.
- **Gợi ý điều chỉnh:** loại gợi ý (thêm món / giảm khẩu phần / thay món), nội dung gợi ý, trạng thái áp dụng (chưa áp dụng / đã áp dụng / bỏ qua), ngày sinh gợi ý.
- **Phản hồi người dùng:** người gửi, nội dung báo cáo / góp ý, trạng thái xử lý (chưa xử lý / đang xử lý / đã xử lý), ngày gửi, ghi chú của admin.
- **Nhật ký admin:** admin thực hiện, hành động (khóa tài khoản / sửa món ăn / xóa kế hoạch...), đối tượng bị tác động, mã định danh đối tượng, thời gian thực hiện.

#### 2.5 Quan hệ giữa các đối tượng

- **Tài khoản — Thông tin cá nhân (1 – 1):** Mỗi tài khoản có đúng một hồ sơ sức khỏe tương ứng. Khi tài khoản bị xóa, thông tin cá nhân cũng bị xóa theo.
- **Tài khoản — Mục tiêu sức khỏe (1 – 1):** Mỗi tài khoản có một bộ mục tiêu sức khỏe. Hệ thống tự động tính toán calo và các chỉ tiêu dinh dưỡng mục tiêu dựa trên thông tin cá nhân của người dùng.
- **Tài khoản — Kế hoạch bữa ăn (1 – N):** Một người dùng có thể tạo nhiều kế hoạch bữa ăn khác nhau theo ngày, tuần, hoặc lưu lại làm kế hoạch mẫu để tái sử dụng.
- **Kế hoạch bữa ăn — Bữa ăn (1 – N):** Một kế hoạch bao gồm nhiều bữa ăn, mỗi ngày trong kế hoạch có thể có các bữa sáng, trưa, tối và phụ. Khi xóa kế hoạch, toàn bộ các bữa ăn bên trong cũng bị xóa theo.
- **Bữa ăn — Khẩu phần (1 – N):** Một bữa ăn chứa nhiều khẩu phần, mỗi khẩu phần tương ứng với một món ăn cụ thể và lượng gram người dùng nhập vào. Khi xóa bữa ăn, các khẩu phần thuộc bữa đó cũng bị xóa theo.
- **Khẩu phần — Món ăn (N – 1):** Nhiều khẩu phần ở các bữa ăn khác nhau có thể cùng tham chiếu đến một món ăn. Đây là liên kết cốt lõi giúp hệ thống tính dinh dưỡng thực tế theo từng bữa.
- **Món ăn — Nguyên liệu (1 – N):** Một món ăn được cấu thành từ nhiều nguyên liệu. Khi xóa món ăn, toàn bộ nguyên liệu của món đó cũng bị xóa theo.
- **Món ăn — Dinh dưỡng (1 – 1):** Mỗi món ăn có đúng một bộ thông tin dinh dưỡng, được tính trên 100g. Khi xóa món ăn, bộ dinh dưỡng tương ứng cũng bị xóa theo.
- **Tài khoản — Món ăn (N – N, qua bảng trung gian Món ăn yêu thích):** Một người dùng có thể lưu nhiều món ăn yêu thích; một món ăn có thể được yêu thích bởi nhiều người dùng khác nhau.
- **Tài khoản — Món ăn (1 – N, món tự tạo):** Ngoài kho món ăn hệ thống, người dùng có thể tự tạo thêm món ăn tùy chỉnh của riêng mình.
- **Khẩu phần → Thống kê dinh dưỡng (tổng hợp):** Thống kê dinh dưỡng không được lưu cứng mà được tính động từ toàn bộ khẩu phần trong ngày của người dùng.
- **Thống kê dinh dưỡng — Mục tiêu sức khỏe (so sánh):** Hệ thống đối chiếu số liệu dinh dưỡng thực tế với mục tiêu đã thiết lập để sinh ra các gợi ý điều chỉnh thực đơn.
- **Tài khoản — Gợi ý điều chỉnh (1 – N):** Hệ thống có thể sinh ra nhiều gợi ý cho một người dùng, mỗi gợi ý tương ứng với một phân tích cụ thể theo ngày hoặc theo bữa.
- **Tài khoản — Phản hồi người dùng (1 – N):** Một người dùng có thể gửi nhiều phản hồi hoặc báo cáo lên hệ thống.
- **Tài khoản (admin) — Nhật ký admin (1 – N):** Mỗi thao tác quản trị của admin đều tạo ra một bản ghi nhật ký.

### 3. Mô hình nghiệp vụ bằng UML

> **Xác định các actor của hệ thống**

<!-- [HÌNH ẢNH: Sơ đồ Use Case Tổng quan – Toàn bộ các Actor và Use Case của hệ thống] -->

> **Các use case cho từng actor**

<!-- [HÌNH ẢNH: Use Case chi tiết cho từng Actor (Guest, User, Admin)] -->

### 4. Bảng yêu cầu người dùng

| ID | Mô tả yêu cầu người dùng | Độ ưu tiên | Use Case liên quan |
|----|--------------------------|-----------|-------------------|
| UR-01 | Người dùng có thể đăng ký tài khoản | Must Have | UC01 |
| UR-02 | Người dùng có thể đăng nhập hệ thống | Must Have | UC02 |
| UR-03 | Người dùng có thể đăng xuất | Must Have | UC03 |
| UR-04 | Người dùng có thể đổi mật khẩu | Must Have | UC04 |
| UR-05 | Người dùng có thể cập nhật thông tin cá nhân | Must Have | UC05 |
| UR-06 | Người dùng có thể thiết lập mục tiêu sức khỏe | Should Have | UC06 |
| UR-07 | Người dùng có thể tạo kế hoạch bữa ăn | Must Have | UC07 |
| UR-08 | Người dùng có thể thêm món ăn vào kế hoạch | Must Have | UC08 |
| UR-09 | Người dùng có thể chỉnh sửa kế hoạch bữa ăn | Must Have | UC09 |
| UR-10 | Người dùng có thể xóa kế hoạch bữa ăn | Must Have | UC10 |
| UR-11 | Người dùng có thể xem lịch kế hoạch bữa ăn | Must Have | UC11 |
| UR-12 | Người dùng có thể lưu kế hoạch mẫu yêu thích | Should Have | UC12 |
| UR-13 | Người dùng có thể tìm kiếm món ăn | Must Have | UC13 |
| UR-14 | Người dùng có thể thêm món ăn tùy chỉnh | Should Have | UC14 |
| UR-15 | Người dùng có thể lưu món ăn yêu thích | Should Have | UC15 |
| UR-16 | Admin có thể quản lý tài khoản người dùng | Must Have | UC16 |
| UR-17 | Admin có thể quản lý danh mục món ăn | Must Have | UC17 |
| UR-18 | Admin có thể xem thống kê người dùng | Should Have | UC18 |
| UR-19 | Admin có thể quản lý phản hồi người dùng | Should Have | UC19 |

---

## III. Phân tích

### 1. UC Specification

#### 1.1 Module 1 - Quản lý tài khoản

##### Vẽ Use Case – Module 1

<!-- [HÌNH ẢNH: Sơ đồ Use Case Tổng quan – Module 1 (Quản lý tài khoản)] -->

<!-- [HÌNH ẢNH: Use Case chi tiết 1 – Đăng ký] -->

<!-- [HÌNH ẢNH: Use Case chi tiết 2 – Đăng nhập] -->

<!-- [HÌNH ẢNH: Use Case chi tiết 3 – Đăng xuất] -->

<!-- [HÌNH ẢNH: Use Case chi tiết 4 – Lấy lại mật khẩu] -->

<!-- [HÌNH ẢNH: Use Case chi tiết 5 – Cập nhật thông tin] -->

<!-- [HÌNH ẢNH: Use Case chi tiết 6 – Thiết lập mục tiêu sức khỏe] -->

---

##### UC01 – Đăng ký

| Mục | Nội dung |
|-----|---------|
| **Use Case Name** | Đăng ký |
| **Description** | Người dùng tạo tài khoản mới để sử dụng hệ thống |
| **Actor(s)** | Người dùng |
| **Priority** | Must Have |
| **Trigger** | Người dùng chọn đăng ký |
| **Pre-Condition(s)** | Chưa có tài khoản |
| **Post-Condition(s)** | Tạo tài khoản thành công |
| **Basic Flow** | 1. Người dùng chọn "Đăng ký" <br> 2. Nhập username, password, email <br> 3. Nhấn "Đăng ký" <br> 4. Hệ thống kiểm tra dữ liệu <br> 5. Lưu tài khoản <br> 6. Thông báo thành công |
| **Alternative Flow** | 2a. Nhập thiếu → yêu cầu nhập lại |
| **Exception Flow** | 4a. Username đã tồn tại <br> 4b. Email không hợp lệ |
| **Business Rules** | Username duy nhất; password tối thiểu 6 ký tự |
| **Non-Functional Requirement** | Bảo mật dữ liệu; xử lý nhanh |

##### UC02 – Đăng nhập

| Mục | Nội dung |
|-----|---------|
| **Use Case Name** | Đăng nhập |
| **Description** | Là người dùng, tôi muốn đăng nhập vào hệ thống để sử dụng các chức năng của ứng dụng |
| **Actor(s)** | Người dùng |
| **Priority** | Must Have |
| **Trigger** | Người dùng chọn chức năng đăng nhập |
| **Pre-Condition(s)** | Người dùng đã có tài khoản; có kết nối internet |
| **Post-Condition(s)** | Đăng nhập thành công; hệ thống ghi nhận trạng thái đăng nhập |
| **Basic Flow** | 1. Người dùng truy cập hệ thống <br> 2. Chọn "Đăng nhập" <br> 3. Hệ thống hiển thị form <br> 4. Người dùng nhập username, password <br> 5. Nhấn "Đăng nhập" <br> 6. Hệ thống kiểm tra thông tin <br> 7. Nếu hợp lệ → vào trang chính <br> 8. Kết thúc |
| **Alternative Flow** | 2a. Chọn "Đăng ký" → UC02 <br> 4a. Chọn "Quên mật khẩu" → UC03 |
| **Exception Flow** | 6a. Sai thông tin → hiển thị lỗi → nhập lại <br> 4b. Để trống → yêu cầu nhập |
| **Business Rules** | Không để trống; sai quá 5 lần khóa tài khoản |
| **Non-Functional Requirement** | Thời gian phản hồi < 3s; bảo mật thông tin |

##### UC03 – Đăng xuất

| Mục | Nội dung |
|-----|---------|
| **Use Case Name** | Đăng xuất |
| **Description** | Người dùng đăng xuất khỏi hệ thống |
| **Actor(s)** | Người dùng |
| **Priority** | Must Have |
| **Trigger** | Chọn "Đăng xuất" |
| **Pre-Condition(s)** | Đã đăng nhập |
| **Post-Condition(s)** | Thoát hệ thống |
| **Basic Flow** | 1. Chọn đăng xuất <br> 2. Hệ thống xóa session <br> 3. Quay về màn hình chính |
| **Alternative Flow** | - |
| **Exception Flow** | - |
| **Business Rules** | Xóa session |
| **Non-Functional Requirement** | Phản hồi nhanh |

##### UC04 – Lấy lại mật khẩu

| Mục | Nội dung |
|-----|---------|
| **Use Case Name** | Lấy lại mật khẩu |
| **Description** | Người dùng lấy lại mật khẩu khi quên |
| **Actor(s)** | Người dùng |
| **Priority** | Must Have |
| **Trigger** | Chọn "Quên mật khẩu" |
| **Pre-Condition(s)** | Có tài khoản hợp lệ |
| **Post-Condition(s)** | Mật khẩu được thay đổi |
| **Basic Flow** | 1. Chọn "Quên mật khẩu" <br> 2. Nhập email <br> 3. Hệ thống gửi OTP <br> 4. Nhập OTP <br> 5. Nhập mật khẩu mới <br> 6. Xác nhận thành công |
| **Alternative Flow** | 4a. OTP sai → nhập lại |
| **Exception Flow** | 2a. Email không tồn tại <br> 4b. OTP hết hạn |
| **Business Rules** | OTP có hiệu lực 5 phút |
| **Non-Functional Requirement** | Bảo mật OTP; gửi nhanh |

##### UC05 – Cập nhật thông tin

| Mục | Nội dung |
|-----|---------|
| **Use Case Name** | Cập nhật thông tin |
| **Description** | Người dùng cập nhật thông tin cá nhân |
| **Actor(s)** | Người dùng |
| **Priority** | Must Have |
| **Trigger** | Chọn "Cập nhật hồ sơ" |
| **Pre-Condition(s)** | Đã đăng nhập |
| **Post-Condition(s)** | Thông tin được lưu |
| **Basic Flow** | 1. Vào hồ sơ <br> 2. Chỉnh sửa thông tin (tuổi, cân nặng…) <br> 3. Nhấn lưu <br> 4. Hệ thống cập nhật |
| **Alternative Flow** | 2a. Hủy chỉnh sửa |
| **Exception Flow** | 3a. Nhập sai định dạng |
| **Business Rules** | Dữ liệu phải hợp lệ |
| **Non-Functional Requirement** | Hiển thị nhanh, dễ dùng |

##### UC06 – Thiết lập mục tiêu

| Mục | Nội dung |
|-----|---------|
| **Use Case Name** | Thiết lập mục tiêu |
| **Description** | Người dùng thiết lập mục tiêu dinh dưỡng |
| **Actor(s)** | Người dùng |
| **Priority** | Must Have |
| **Trigger** | Chọn "Thiết lập mục tiêu" |
| **Pre-Condition(s)** | Đã đăng nhập |
| **Post-Condition(s)** | Lưu mục tiêu thành công |
| **Basic Flow** | 1. Chọn chức năng <br> 2. Nhập mục tiêu (cân nặng, calo…) <br> 3. Nhấn lưu <br> 4. Hệ thống ghi nhận |
| **Alternative Flow** | 2a. Sửa lại trước khi lưu |
| **Exception Flow** | 2b. Nhập sai dữ liệu |
| **Business Rules** | Giá trị > 0 |
| **Non-Functional Requirement** | Tính toán nhanh |

---

#### 1.2 Module 2 - Quản lý kế hoạch bữa ăn

##### Vẽ Use Case – Module 2

<!-- [HÌNH ẢNH: Sơ đồ Use Case Tổng quan – Module 2 (Quản lý kế hoạch bữa ăn)] -->

##### UC07 – Tạo kế hoạch bữa ăn

| Mục | Nội dung |
|-----|---------|
| **Use Case ID** | UC07 |
| **Use Case Name** | Tạo kế hoạch bữa ăn |
| **Description** | Là người dùng đã đăng nhập, tôi muốn tạo kế hoạch bữa ăn theo ngày hoặc tuần để sắp xếp các món ăn cho từng bữa trong khoảng thời gian mong muốn. |
| **Actor(s)** | Người dùng đã đăng nhập |
| **Priority** | Must Have |
| **Trigger** | Người dùng chọn chức năng "Tạo kế hoạch mới" tại màn hình Kế hoạch bữa ăn. |
| **Pre-Condition(s)** | Người dùng đã đăng nhập hệ thống; đang ở màn hình Kế hoạch bữa ăn; hệ thống có sẵn các khung bữa ăn mặc định: Sáng/Trưa/Tối/Phụ; hệ thống cho phép tạo kế hoạch theo ngày hoặc theo tuần. |
| **Post-Condition(s)** | Một kế hoạch bữa ăn mới được lưu trong hệ thống; kế hoạch gắn với người tạo, ngày bắt đầu, ngày kết thúc và các bữa ăn tương ứng; hệ thống chuyển về màn hình Lịch kế hoạch bữa ăn và hiển thị kế hoạch vừa tạo. |
| **Basic Flow** | 1. Người dùng chọn "Tạo kế hoạch mới" <br> 2. Hệ thống hiển thị giao diện tạo kế hoạch <br> 3. Người dùng chọn khoảng thời gian mong muốn <br> 4. Hệ thống hiển thị khung kế hoạch trống <br> 5. Người dùng thêm món ăn vào từng bữa <br> 6. Người dùng nhấn "Lưu kế hoạch" <br> 7. Hệ thống kiểm tra dữ liệu kế hoạch hợp lệ <br> 8. Hệ thống lưu kế hoạch bữa ăn <br> 9. Hệ thống hiển thị thông báo "Tạo kế hoạch thành công" <br> 10. Hệ thống chuyển đến màn hình Lịch kế hoạch bữa ăn |
| **Alternative Flow** | 5a. Người dùng chưa thêm món ăn ngay → Hệ thống vẫn cho phép lưu kế hoạch khung trống <br> 3a. Người dùng chọn lập kế hoạch theo ngày → Hệ thống tạo khung cho một ngày <br> 3b. Người dùng chọn lập kế hoạch theo tuần → Hệ thống tạo khung cho 7 ngày |
| **Exception Flow** | 6a. Chưa chọn ngày/tuần → Hệ thống hiển thị lỗi: "Vui lòng chọn thời gian kế hoạch." <br> 7a. Kế hoạch trùng khoảng thời gian → Hệ thống hiển thị thông báo lỗi <br> 8a. Lỗi máy chủ/cơ sở dữ liệu → Hệ thống thông báo "Không thể tạo kế hoạch. Vui lòng thử lại sau." |
| **Business Rules** | BR07-1: Mỗi kế hoạch phải gắn với đúng một người dùng tạo <br> BR07-2: Kế hoạch phải có ngày bắt đầu và ngày kết thúc hợp lệ <br> BR07-3: Một kế hoạch gồm nhiều bữa ăn; mỗi ngày có thể có các bữa sáng, trưa, tối và phụ <br> BR07-4: Khi lưu kế hoạch, hệ thống phải lưu cả cấu trúc các bữa thuộc kế hoạch |
| **Non-Functional Requirement** | NFR07-1: Thời gian hiển thị giao diện tạo kế hoạch không quá 3 giây <br> NFR07-2: Dữ liệu kế hoạch phải được lưu an toàn và gắn đúng tài khoản người dùng <br> NFR07-3: Giao diện phải hỗ trợ web responsive |

##### UC08 – Thêm món ăn vào kế hoạch

| Mục | Nội dung |
|-----|---------|
| **Use Case ID** | UC08 |
| **Use Case Name** | Thêm món ăn vào kế hoạch |
| **Description** | Là người dùng đã đăng nhập, tôi muốn thêm món ăn vào một bữa cụ thể trong kế hoạch để hoàn thiện thực đơn và theo dõi dinh dưỡng. |
| **Actor(s)** | Người dùng đã đăng nhập |
| **Priority** | Must Have |
| **Trigger** | Người dùng chọn một bữa ăn cần thêm món trong màn hình Kế hoạch. |
| **Pre-Condition(s)** | Người dùng đã đăng nhập; đã tồn tại kế hoạch bữa ăn hoặc đang tạo mới; hệ thống có dữ liệu món ăn để tìm kiếm/chọn; bữa ăn đích thuộc một kế hoạch hợp lệ. |
| **Post-Condition(s)** | Món ăn được thêm vào bữa đã chọn; khẩu phần, calo, protein, carb, fat của bữa được cập nhật tự động; kế hoạch hiển thị dữ liệu mới nhất sau khi thêm món. |
| **Basic Flow** | 1. Người dùng chọn bữa ăn cần thêm món (Sáng/Trưa/Tối/Phụ) <br> 2. Hệ thống hiển thị giao diện Thêm món ăn với ô tìm kiếm và danh sách gợi ý <br> 3. Người dùng tìm kiếm hoặc chọn món ăn từ danh sách <br> 4. Hệ thống hiển thị thông tin dinh dưỡng của món ăn được chọn <br> 5. Người dùng nhập khẩu phần (gram/ml) <br> 6. Người dùng nhấn "Thêm vào bữa" <br> 7. Hệ thống thêm món ăn vào bữa tương ứng <br> 8. Hệ thống tự động cập nhật tổng calo và dinh dưỡng của bữa <br> 9. Hệ thống hiển thị lại kế hoạch với món ăn vừa được thêm |
| **Alternative Flow** | 3a. Người dùng không tìm kiếm mà chọn món trong danh sách gợi ý <br> 5a. Người dùng thay đổi khẩu phần nhiều lần trước khi xác nhận → hệ thống cập nhật xem trước chỉ số dinh dưỡng |
| **Exception Flow** | 3b. Không tìm thấy món ăn phù hợp → Hệ thống hiển thị "Không tìm thấy món ăn phù hợp." <br> 5b. Khẩu phần không hợp lệ (rỗng, âm, bằng 0, sai định dạng) → Hệ thống hiển thị lỗi "Khẩu phần không hợp lệ." <br> 7a. Hệ thống không thêm được món ăn do lỗi xử lý → Hệ thống hiển thị thông báo thất bại |
| **Business Rules** | BR08-1: Mỗi khẩu phần phải gắn với một món ăn cụ thể <br> BR08-2: Khẩu phần được nhập theo gram/ml và phải lớn hơn 0 <br> BR08-3: Calo và các chỉ số dinh dưỡng thực tế phải được tính tự động theo khẩu phần nhập vào <br> BR08-4: Một bữa ăn có thể chứa nhiều khẩu phần/món ăn |
| **Non-Functional Requirement** | NFR08-1: Tìm kiếm món ăn nên phản hồi trong thời gian ngắn <br> NFR08-2: Việc cập nhật tổng calo và dinh dưỡng phải diễn ra tự động, chính xác <br> NFR08-3: Giao diện thêm món phải dễ thao tác trên cả desktop và mobile |

##### UC09 – Chỉnh sửa kế hoạch bữa ăn

| Mục | Nội dung |
|-----|---------|
| **Use Case ID** | UC09 |
| **Use Case Name** | Chỉnh sửa kế hoạch bữa ăn |
| **Description** | Là người dùng đã đăng nhập, tôi muốn chỉnh sửa kế hoạch bữa ăn để thay đổi món ăn, khẩu phần hoặc cấu trúc bữa theo nhu cầu mới. |
| **Actor(s)** | Người dùng đã đăng nhập |
| **Priority** | Must Have |
| **Trigger** | Người dùng chọn một kế hoạch tại màn hình Lịch kế hoạch và nhấn "Chỉnh sửa". |
| **Pre-Condition(s)** | Người dùng đã đăng nhập; kế hoạch cần chỉnh sửa tồn tại và thuộc quyền của người dùng; hệ thống có thể tải chi tiết kế hoạch và các bữa ăn liên quan. |
| **Post-Condition(s)** | Kế hoạch được cập nhật thành công; các thay đổi về món ăn/khẩu phần được lưu vào hệ thống; tổng calo và chỉ số dinh dưỡng liên quan được cập nhật lại. |
| **Basic Flow** | 1. Người dùng chọn kế hoạch cần chỉnh sửa tại màn hình Lịch kế hoạch <br> 2. Hệ thống hiển thị chi tiết kế hoạch với các nút Chỉnh sửa, Xóa, Quay lại <br> 3. Người dùng chọn "Chỉnh sửa" <br> 4. Hệ thống mở giao diện chỉnh sửa kế hoạch <br> 5. Người dùng thực hiện thêm món, xóa món, thay đổi khẩu phần <br> 6. Người dùng nhấn "Lưu" <br> 7. Hệ thống kiểm tra tính hợp lệ của dữ liệu chỉnh sửa <br> 8. Hệ thống cập nhật kế hoạch bữa ăn <br> 9. Hệ thống hiển thị thông báo "Cập nhật kế hoạch thành công" <br> 10. Hệ thống hiển thị kế hoạch với dữ liệu mới |
| **Alternative Flow** | 5a. Chỉ thay đổi khẩu phần → Hệ thống tính lại calo và dinh dưỡng theo khẩu phần mới <br> 5b. Thêm món mới → Hệ thống thực hiện luồng UC08 <br> 5c. Xóa một món khỏi bữa ăn → Hệ thống loại bỏ khẩu phần tương ứng và cập nhật lại tổng dinh dưỡng |
| **Exception Flow** | 1a. Kế hoạch không còn tồn tại → Hệ thống hiển thị "Kế hoạch không tồn tại hoặc đã bị xóa." <br> 7a. Dữ liệu chỉnh sửa không hợp lệ → Hệ thống hiển thị lỗi tại trường tương ứng <br> 8a. Hệ thống không cập nhật được dữ liệu → Hệ thống hiển thị thông báo lỗi |
| **Business Rules** | BR09-1: Người dùng chỉ được chỉnh sửa kế hoạch do chính mình tạo <br> BR09-2: Sau mỗi thay đổi, hệ thống phải tính lại tổng dinh dưỡng của bữa/kế hoạch <br> BR09-3: Các khẩu phần trong kế hoạch sau chỉnh sửa vẫn phải hợp lệ <br> BR09-4: Mọi thay đổi phải được lưu đồng nhất giữa kế hoạch, bữa ăn và khẩu phần |
| **Non-Functional Requirement** | NFR09-1: Dữ liệu sau chỉnh sửa phải được đồng bộ và nhất quán <br> NFR09-2: Hệ thống cần phản hồi nhanh khi người dùng lưu thay đổi <br> NFR09-3: Không được làm mất dữ liệu cũ nếu cập nhật thất bại giữa chừng |

##### UC10 – Xóa kế hoạch bữa ăn

| Mục | Nội dung |
|-----|---------|
| **Use Case ID** | UC10 |
| **Use Case Name** | Xóa kế hoạch bữa ăn |
| **Description** | Là người dùng đã đăng nhập, tôi muốn xóa kế hoạch bữa ăn không còn sử dụng để giữ lịch kế hoạch gọn gàng và đúng nhu cầu hiện tại. |
| **Actor(s)** | Người dùng đã đăng nhập |
| **Priority** | Must Have |
| **Trigger** | Người dùng chọn kế hoạch cần xóa tại màn hình Lịch kế hoạch. |
| **Pre-Condition(s)** | Người dùng đã đăng nhập; kế hoạch cần xóa tồn tại và thuộc về người dùng; hệ thống cho phép thao tác xóa kế hoạch. |
| **Post-Condition(s)** | Kế hoạch bị xóa khỏi hệ thống; các bữa ăn thuộc kế hoạch cũng bị xóa theo; màn hình Lịch kế hoạch được làm mới. |
| **Basic Flow** | 1. Người dùng chọn kế hoạch cần xóa tại màn hình Lịch kế hoạch <br> 2. Hệ thống hiển thị hộp thoại xác nhận: "Bạn có chắc muốn xóa kế hoạch này không?" với các nút Xác nhận/Hủy <br> 3. Người dùng chọn "Xác nhận" <br> 4. Hệ thống xóa kế hoạch khỏi cơ sở dữ liệu <br> 5. Hệ thống xóa các bữa ăn liên quan thuộc kế hoạch <br> 6. Hệ thống hiển thị thông báo "Xóa kế hoạch thành công" <br> 7. Hệ thống làm mới màn hình Lịch kế hoạch |
| **Alternative Flow** | 3a. Người dùng chọn "Hủy" → Hệ thống đóng hộp thoại xác nhận; Use Case kết thúc, không có dữ liệu nào bị xóa |
| **Exception Flow** | 1a. Kế hoạch đã bị xóa trước đó hoặc không tồn tại → Hệ thống hiển thị thông báo tương ứng <br> 4a. Hệ thống gặp lỗi khi xóa kế hoạch → Hệ thống hiển thị thông báo "Xóa kế hoạch thất bại." |
| **Business Rules** | BR10-1: Người dùng chỉ được xóa kế hoạch của chính mình <br> BR10-2: Khi xóa kế hoạch, toàn bộ bữa ăn bên trong cũng phải bị xóa theo <br> BR10-3: Hệ thống phải yêu cầu xác nhận trước khi xóa |
| **Non-Functional Requirement** | NFR10-1: Thao tác xóa phải đảm bảo tính toàn vẹn dữ liệu <br> NFR10-2: Hệ thống phải ghi nhận log thao tác xóa nếu thiết kế có nhật ký hệ thống <br> NFR10-3: Thông báo phản hồi phải rõ ràng, tránh xóa nhầm |

##### UC11 – Xem lịch kế hoạch bữa ăn

| Mục | Nội dung |
|-----|---------|
| **Use Case ID** | UC11 |
| **Use Case Name** | Xem lịch kế hoạch bữa ăn |
| **Description** | Là người dùng đã đăng nhập, tôi muốn xem lịch kế hoạch bữa ăn theo ngày hoặc tuần để theo dõi thực đơn và mức độ đạt mục tiêu dinh dưỡng. |
| **Actor(s)** | Người dùng đã đăng nhập |
| **Priority** | Must Have |
| **Trigger** | Người dùng chọn chức năng "Kế hoạch bữa ăn" tại menu chính. |
| **Pre-Condition(s)** | Người dùng đã đăng nhập; hệ thống có quyền truy xuất các kế hoạch của người dùng; dữ liệu kế hoạch, bữa ăn, khẩu phần và mục tiêu dinh dưỡng đã sẵn sàng để hiển thị. |
| **Post-Condition(s)** | Màn hình lịch kế hoạch được hiển thị theo tuần hiện tại hoặc ngày được chọn; người dùng nhìn thấy danh sách bữa ăn theo ngày, tổng calo mỗi ngày và thanh tiến độ so với mục tiêu. |
| **Basic Flow** | 1. Người dùng chọn chức năng "Kế hoạch bữa ăn" tại menu chính <br> 2. Hệ thống truy xuất dữ liệu kế hoạch của tuần hiện tại <br> 3. Hệ thống hiển thị màn hình lịch kế hoạch theo tuần hiện tại <br> 4. Người dùng xem thông tin kế hoạch trên màn hình <br> 5. Người dùng chọn chuyển sang tuần trước, tuần sau hoặc chọn ngày cụ thể <br> 6. Hệ thống truy xuất dữ liệu theo ngày/tuần được chọn <br> 7. Hệ thống cập nhật giao diện hiển thị tương ứng |
| **Alternative Flow** | 5a. Người dùng chỉ xem tuần hiện tại và không chuyển thời gian → Use Case kết thúc sau bước 4 <br> 5b. Người dùng chọn một ngày cụ thể → Hệ thống hiển thị dữ liệu chi tiết cho ngày đó |
| **Exception Flow** | 2a. Người dùng chưa có kế hoạch nào → Hệ thống hiển thị thông báo "Chưa có kế hoạch bữa ăn." và gợi ý tạo kế hoạch mới <br> 6a. Hệ thống không tải được dữ liệu lịch kế hoạch → Hệ thống hiển thị thông báo lỗi tải dữ liệu |
| **Business Rules** | BR11-1: Lịch kế hoạch mặc định hiển thị theo tuần hiện tại <br> BR11-2: Mỗi ngày hiển thị danh sách bữa ăn và tổng calo tương ứng <br> BR11-3: Thanh tiến độ phải được tính dựa trên dữ liệu thực đơn và mục tiêu dinh dưỡng của người dùng |
| **Non-Functional Requirement** | NFR12-1: Thao tác lưu mẫu phải hoàn thành nhanh <br> NFR12-2: Dữ liệu kế hoạch mẫu phải chính xác, không mất cấu trúc bữa ăn <br> NFR12-3: Hệ thống phải đảm bảo chỉ chủ sở hữu mới truy cập và dùng lại mẫu của mình |

##### UC12 – Lưu kế hoạch mẫu yêu thích

| Mục | Nội dung |
|-----|---------|
| **Use Case ID** | UC12 |
| **Use Case Name** | Lưu kế hoạch mẫu yêu thích |
| **Description** | Là người dùng đã đăng nhập, tôi muốn lưu một kế hoạch hiện có thành mẫu yêu thích để tái sử dụng nhanh cho các lần lập kế hoạch sau. |
| **Actor(s)** | Người dùng đã đăng nhập |
| **Priority** | Should Have |
| **Trigger** | Người dùng chọn "Lưu làm mẫu" tại màn hình Chi tiết kế hoạch. |
| **Pre-Condition(s)** | Người dùng đã đăng nhập; kế hoạch cần lưu mẫu tồn tại và thuộc quyền của người dùng; hệ thống hỗ trợ dữ liệu kế hoạch mẫu gồm tên mẫu và cấu trúc bữa ăn sao chép từ kế hoạch gốc. |
| **Post-Condition(s)** | Một kế hoạch mẫu mới được lưu trong hệ thống; kế hoạch mẫu chứa tên mẫu và cấu trúc bữa ăn lấy từ kế hoạch gốc; hệ thống hiển thị thông báo lưu thành công. |
| **Basic Flow** | 1. Người dùng mở màn hình Chi tiết kế hoạch <br> 2. Người dùng chọn "Lưu làm mẫu" <br> 3. Hệ thống hiển thị hộp thoại nhập tên mẫu với các nút Lưu/Hủy <br> 4. Người dùng nhập tên mẫu <br> 5. Người dùng nhấn "Lưu" <br> 6. Hệ thống kiểm tra tên mẫu hợp lệ <br> 7. Hệ thống sao chép cấu trúc kế hoạch gốc sang dữ liệu kế hoạch mẫu <br> 8. Hệ thống lưu kế hoạch mẫu <br> 9. Hệ thống hiển thị thông báo "Đã lưu kế hoạch mẫu thành công" |
| **Alternative Flow** | 4a. Người dùng nhập tên mẫu trùng với tên mẫu đã có nhưng hệ thống cho phép trùng → Hệ thống vẫn lưu mẫu mới <br> 3a. Người dùng chọn Hủy → Hệ thống đóng hộp thoại; Use Case kết thúc |
| **Exception Flow** | 4b. Người dùng để trống tên mẫu → Hệ thống hiển thị lỗi: "Tên mẫu không được để trống." <br> 8a. Hệ thống không lưu được kế hoạch mẫu → Hệ thống hiển thị thông báo lỗi |
| **Business Rules** | BR12-1: Kế hoạch mẫu phải được tạo từ một kế hoạch đã tồn tại <br> BR12-2: Kế hoạch mẫu gồm tên mẫu và cấu trúc bữa ăn sao chép từ kế hoạch gốc <br> BR12-3: Kế hoạch mẫu thuộc quyền sở hữu của người dùng đã lưu |
| **Non-Functional Requirement** | NFR12-1: Thao tác lưu mẫu phải hoàn thành nhanh <br> NFR12-2: Dữ liệu kế hoạch mẫu phải chính xác, không mất cấu trúc bữa ăn <br> NFR12-3: Hệ thống phải đảm bảo chỉ chủ sở hữu mới truy cập và dùng lại mẫu của mình |

---

#### 1.3 Module 3 - Quản lý món ăn

> *(Phần đặc tả UC13–UC15 cho Module 3 – Tham khảo nội dung Module 3 ở phần thiết kế)*

---

#### 1.4 Module 4 - Quản trị hệ thống (Admin)

##### UC16 – Quản lý tài khoản người dùng

| Mục | Nội dung |
|-----|---------|
| **Use Case ID** | UC16 |
| **Use Case Name** | Quản lý tài khoản người dùng |
| **Description** | Là Admin, tôi muốn truy cập danh sách tài khoản để quản lý trạng thái người dùng trên hệ thống. |
| **Actor(s)** | Admin |
| **Priority** | Must Have |
| **Trigger** | Admin muốn xem, khóa hoặc xóa một hoặc nhiều tài khoản người dùng |
| **Pre-Condition(s)** | Admin có tài khoản và đăng nhập thành công vào hệ thống; Admin được phân quyền quản lý người dùng; có dữ liệu tài khoản người dùng trong hệ thống. |
| **Post-Condition(s)** | Hệ thống hiển thị danh sách tài khoản người dùng kèm các thông tin liên quan; trạng thái tài khoản người dùng được cập nhật thành công (nếu có thao tác Khóa/Xóa) và danh sách người dùng được làm mới. |
| **Basic Flow** | 1. Admin chọn chức năng "Quản lý người dùng" tại Bảng điều khiển <br> 2. Hệ thống truy xuất dữ liệu và hiển thị danh sách tài khoản người dùng kèm thông tin người dùng <br> 3. Admin chọn một người dùng cụ thể thực hiện thao tác cần thiết <br> 4. Hệ thống tiến hành cập nhật trạng thái tài khoản và hiển thị thông báo "Thao tác thành công". Danh sách được làm mới. |
| **Alternative Flow** | 2a. Không có dữ liệu người dùng → Hiển thị thông báo "Không có dữ liệu" <br> 3a. Admin không muốn tiếp tục thực hiện thao tác → Admin chọn "Hủy" ở hộp thoại xác nhận |
| **Exception Flow** | 3b. Admin không chọn được tài khoản muốn thao tác → Hệ thống hiển thị thông báo "Không thể chọn tài khoản này" |
| **Business Rules** | BR16-1: Chỉ có Admin được trao quyền quản lý người dùng <br> BR16-2: Tài khoản đã bị "Khóa" sẽ không thể đăng nhập vào ứng dụng client <br> BR16-3: Tài khoản bị "Xóa" sẽ bị vô hiệu hóa hoàn toàn và hiển thị là đã xóa với cả Admin và User |
| **Non-Functional Requirement** | NFR16-1: Danh sách người dùng tải lên trong vòng dưới 2 giây. Hệ thống phân trang nếu danh sách vượt quá 50 người dùng <br> NFR16-2: Thông tin người dùng được bảo mật <br> NFR16-3: Mọi hành động Khóa/Xóa phải được ghi log (nhật ký hệ thống) bao gồm ID Admin thực hiện, thời gian và ID tài khoản bị tác động |

##### UC17 – Quản lý danh mục món ăn

| Mục | Nội dung |
|-----|---------|
| **Use Case ID** | UC17 |
| **Use Case Name** | Quản lý danh mục món ăn |
| **Description** | Là Admin, tôi muốn truy cập danh sách món ăn để quản lý thông tin về các món ăn hiện có trong hệ thống. |
| **Actor(s)** | Admin |
| **Priority** | Must Have |
| **Trigger** | Admin muốn thêm, sửa hoặc xóa món ăn; người dùng yêu cầu thêm hoặc sửa món ăn và được Admin duyệt |
| **Pre-Condition(s)** | Admin có tài khoản và đăng nhập thành công vào hệ thống; Admin được phân quyền quản lý món ăn; đã có món ăn được lưu trong hệ thống. |
| **Post-Condition(s)** | Hệ thống hiển thị danh sách món ăn mới nhất; thông tin của món ăn được tạo mới, cập nhật hoặc xóa thành công trong cơ sở dữ liệu; dữ liệu món ăn được cập nhật. |
| **Basic Flow** | 1. Admin chọn chức năng "Quản lý món ăn" <br> 2. Hệ thống hiển thị danh sách món ăn hiện tại với các nút chức năng tương ứng <br> 3. Admin thực hiện thao tác cần thiết (thêm/sửa/xóa món ăn) <br> 4. Hệ thống xác thực dữ liệu, lưu vào CSDL và làm mới danh sách hiển thị |
| **Alternative Flow** | 2a. Không có dữ liệu món ăn trong hệ thống → Hiển thị thông báo "Không có dữ liệu" <br> 3a. Admin không muốn tiếp tục thực hiện thao tác → Admin chọn "Hủy" ở hộp thoại xác nhận |
| **Exception Flow** | 2b. Màn hình không tải được danh sách món ăn → Hiện thông báo "Lỗi hệ thống" <br> 4a. Thực hiện thao tác với món ăn (thêm/sửa/xóa) không thành công → Reload lại trang |
| **Business Rules** | BR17-1: Tên món ăn không được phép trùng lặp hoàn toàn <br> BR17-2: Thông tin dinh dưỡng (Calories, Protein, Fat, Carb) phải đầy đủ, chính xác và hợp lệ |
| **Non-Functional Requirement** | NFR17-1: Hình ảnh upload lên tối đa 5MB, hỗ trợ định dạng JPG, JPEG, PNG <br> NFR17-2: Thời gian tải danh sách món ăn không quá 2 giây <br> NFR17-3: Hỗ trợ tính năng tìm kiếm và lọc món ăn theo danh mục để Admin dễ thao tác |

##### UC18 – Xem thống kê người dùng

| Mục | Nội dung |
|-----|---------|
| **Use Case ID** | UC18 |
| **Use Case Name** | Xem thống kê người dùng |
| **Description** | Là Admin, tôi muốn truy cập chức năng "Thống kê" để theo dõi các chỉ số phát triển của ứng dụng. |
| **Actor(s)** | Admin |
| **Priority** | Should Have |
| **Trigger** | Admin muốn xem báo cáo về thống kê người dùng. |
| **Pre-Condition(s)** | Admin có tài khoản và đăng nhập thành công vào hệ thống; có dữ liệu về người dùng được tạo ra trong hệ thống. |
| **Post-Condition(s)** | Hệ thống hiển thị dashboard thống kê gồm các chỉ tiêu thống kê; hệ thống cập nhật biểu đồ và số liệu tương ứng. |
| **Basic Flow** | 1. Admin chọn chức năng "Thống kê" tại màn hình Bảng điều khiển Admin <br> 2. Hệ thống hiển thị dashboard thống kê người dùng |
| **Alternative Flow** | 2a. Không có dữ liệu người dùng trong hệ thống để thống kê → Hiển thị thông báo "Không có dữ liệu" <br> 2b. Số liệu thống kê không đúng với khoảng thời gian cần xem → Admin chọn lại khoảng thời gian trên thanh điều chỉnh thời gian |
| **Exception Flow** | 2c. Hệ thống gặp lỗi không thống kê được dữ liệu → Hiển thị thông báo "Lỗi hệ thống" |
| **Business Rules** | BR18-1: Dữ liệu chính xác theo thời gian |
| **Non-Functional Requirement** | NFR18-1: Thời gian load dữ liệu thống kê tối đa 5 giây <br> NFR18-2: Biểu đồ phải trực quan |

##### UC19 – Quản lý phản hồi từ người dùng

| Mục | Nội dung |
|-----|---------|
| **Use Case ID** | UC19 |
| **Use Case Name** | Quản lý phản hồi từ người dùng |
| **Description** | Là Admin, tôi muốn truy cập danh sách phản hồi từ người dùng để cải thiện hệ thống. |
| **Actor(s)** | Admin |
| **Priority** | Should Have |
| **Trigger** | Admin muốn xem và xử lý phản hồi từ người dùng. |
| **Pre-Condition(s)** | Admin có tài khoản và đăng nhập thành công vào hệ thống; có phản hồi từ người dùng được gửi đến hệ thống. |
| **Post-Condition(s)** | Hệ thống hiển thị danh sách phản hồi từ người dùng kèm các trạng thái tương ứng; nếu có thao tác xử lý phản hồi hệ thống lưu trạng thái xử lý và cập nhật danh sách phản hồi. |
| **Basic Flow** | 1. Admin chọn chức năng "Phản hồi" tại màn hình Bảng điều khiển Admin <br> 2. Hệ thống hiển thị danh sách phản hồi từ người dùng, kèm trạng thái: Chưa xử lý, Đang xử lý, Đã xử lý <br> 3. Admin chọn phản hồi cần xem và thực hiện xử lý <br> 4. Hệ thống lưu trạng thái xử lý và cập nhật danh sách phản hồi |
| **Alternative Flow** | 2a. Không có phản hồi từ người dùng → Hiển thị thông báo "Không có phản hồi" |
| **Exception Flow** | 3a. Admin không chọn được phản hồi muốn xử lý → Hệ thống hiển thị thông báo "Không thể chọn phản hồi này" |
| **Business Rules** | BR19-1: Phản hồi ở trạng thái "Chưa xử lý" được làm nổi bật (in đậm, icon màu đỏ) để Admin dễ nhận diện <br> BR19-2: Khi phản hồi "Đã xử lý", hệ thống có thể tùy chọn tự động gửi một email thông báo đến email của người dùng <br> BR19-3: Người dùng phải điền đầy đủ các trường bắt buộc trong form phản hồi |
| **Non-Functional Requirement** | NFR19-1: Danh sách phản hồi cần sắp xếp mặc định theo thứ tự thời gian gửi mới nhất <br> NFR19-2: Admin không được quyền chỉnh sửa nội dung phản hồi, chỉ được quyền thay đổi trạng thái <br> NFR19-3: Thời gian load phản hồi tối đa 3 giây |

---

### 2. Trích xuất thực thể và xây dựng sơ đồ lớp phân tích

#### 2.1 Module 1 - Quản lý tài khoản

**Bước 1: Mô tả hệ thống trong một đoạn văn**

Hệ thống quản lý tài khoản cho phép người dùng tạo tài khoản mới, đăng nhập vào hệ thống, đăng xuất khỏi hệ thống, lấy lại mật khẩu khi quên mật khẩu, cập nhật thông tin cá nhân và thiết lập mục tiêu sức khỏe. Hệ thống lưu trữ thông tin tài khoản của người dùng như tên đăng nhập, mật khẩu, email và trạng thái tài khoản. Ngoài ra, hệ thống còn quản lý hồ sơ sức khỏe của người dùng như tuổi, giới tính, chiều cao, cân nặng và các mục tiêu sức khỏe như cân nặng mục tiêu, lượng calo mục tiêu và lượng protein mục tiêu.

**Bước 2: Trích tất cả các danh từ xuất hiện trong đoạn văn**

Các danh từ trích được gồm: Hệ thống, Tài khoản, Người dùng, Thông tin tài khoản, Tên đăng nhập, Mật khẩu, Email, Trạng thái tài khoản, Hồ sơ sức khỏe, Tuổi, Giới tính, Chiều cao, Cân nặng, Mục tiêu sức khỏe, Cân nặng mục tiêu, Calo mục tiêu, Protein mục tiêu.

**Bước 3: Đánh giá các danh từ**

*3.1. Các danh từ bị loại* (mang tính trừu tượng, chung chung hoặc chỉ là thuộc tính):
- Hệ thống → danh từ chung chung, không phải lớp thực thể
- Thông tin tài khoản → khái niệm chung, có thể tách thành các thuộc tính cụ thể
- Tên đăng nhập, Mật khẩu, Email, Trạng thái tài khoản → thuộc tính
- Tuổi, Giới tính, Chiều cao, Cân nặng → thuộc tính
- Cân nặng mục tiêu, Calo mục tiêu, Protein mục tiêu → thuộc tính

*3.2. Các danh từ được chọn làm lớp thực thể:*
- **UserAccount**
- **HealthProfile**
- **HealthGoal**

**Bước 4: Xét quan hệ số lượng giữa các danh từ**

- **UserAccount và HealthProfile:** Mỗi UserAccount có một HealthProfile; Mỗi HealthProfile thuộc về một UserAccount → **Quan hệ: 1 : 1**
- **UserAccount và HealthGoal:** Một UserAccount có thể thiết lập một hoặc nhiều HealthGoal; Mỗi HealthGoal thuộc về một UserAccount → **Quan hệ: 1 : n**

**Bước 5: Xét quan hệ đối tượng giữa các lớp**

- **UserAccount và HealthProfile:** Hồ sơ sức khỏe là thông tin gắn chặt với tài khoản người dùng. Nếu tài khoản người dùng bị xóa thì hồ sơ sức khỏe cũng không còn ý nghĩa tồn tại độc lập → **Chọn quan hệ: thành phần chặt (composition)**
- **UserAccount và HealthGoal:** Mục tiêu sức khỏe cũng do người dùng thiết lập và gắn với tài khoản của người dùng → Có thể chọn **association** hoặc **aggregation/composition**

<!-- [HÌNH ẢNH: Class Diagram pha phân tích – Module 1 (UserAccount, HealthProfile, HealthGoal)] -->

#### 2.2 Module 2 - Quản lý kế hoạch bữa ăn

<!-- [HÌNH ẢNH: Class Diagram pha phân tích – Module 2 (MealPlan, Meal, Portion, MealPlanStructure)] -->

#### 2.3 Module 3 - Quản lý món ăn

<!-- [HÌNH ẢNH: Class Diagram pha phân tích – Module 3 (Dish, Ingredient, NutritionInfo, FoodCategory)] -->

#### 2.4 Module 4 - Quản trị hệ thống (Admin)

<!-- [HÌNH ẢNH: Class Diagram pha phân tích – Module 4 (Feedback, AdminLog, UserStat)] -->

---

### 3. Mô hình động

*(Yêu cầu: sequence diagram; khuyến khích: activity diagram, statechart diagram)*

#### 3.1 Module 1 - Quản lý tài khoản

<!-- [HÌNH ẢNH: Sequence Diagram – UC01: Đăng ký] -->

<!-- [HÌNH ẢNH: Sequence Diagram – UC02: Đăng nhập] -->

<!-- [HÌNH ẢNH: Sequence Diagram – UC03: Đăng xuất] -->

<!-- [HÌNH ẢNH: Sequence Diagram – UC04: Lấy lại mật khẩu] -->

<!-- [HÌNH ẢNH: Sequence Diagram – UC05: Cập nhật thông tin cá nhân] -->

<!-- [HÌNH ẢNH: Sequence Diagram – UC06: Thiết lập mục tiêu sức khỏe] -->

#### 3.2 Module 2 - Quản lý kế hoạch bữa ăn

<!-- [HÌNH ẢNH: Sequence Diagram – UC07: Tạo kế hoạch bữa ăn] -->

<!-- [HÌNH ẢNH: Sequence Diagram – UC08: Thêm món ăn vào kế hoạch] -->

<!-- [HÌNH ẢNH: Sequence Diagram – UC09: Chỉnh sửa kế hoạch bữa ăn] -->

<!-- [HÌNH ẢNH: Sequence Diagram – UC10: Xóa kế hoạch bữa ăn] -->

<!-- [HÌNH ẢNH: Sequence Diagram – UC11: Xem lịch kế hoạch bữa ăn] -->

<!-- [HÌNH ẢNH: Sequence Diagram – UC12: Lưu kế hoạch mẫu yêu thích] -->

#### 3.3 Module 3 - Quản lý món ăn

<!-- [HÌNH ẢNH: Sequence Diagram – Module 3 (Tìm kiếm món ăn, Thêm món ăn tùy chỉnh, Lưu món ăn yêu thích)] -->

#### 3.4 Module 4 - Quản trị hệ thống (Admin)

<!-- [HÌNH ẢNH: Sequence Diagram – UC16: Quản lý tài khoản người dùng] -->

<!-- [HÌNH ẢNH: Sequence Diagram – UC17 (a): Thêm món ăn] -->

<!-- [HÌNH ẢNH: Sequence Diagram – UC17 (b): Sửa món ăn] -->

<!-- [HÌNH ẢNH: Sequence Diagram – UC17 (c): Xóa món ăn] -->

<!-- [HÌNH ẢNH: Sequence Diagram – UC18: Xem thống kê người dùng] -->

---

## IV. Thiết kế

### 1. Architectural Design

#### 1.1 Lựa chọn kiến trúc triển khai – MVC

##### Lý do lựa chọn kiến trúc MVC

Mô hình **MVC (Model – View – Controller)** là một kiến trúc phổ biến trong phát triển ứng dụng web, cho phép tách biệt giữa giao diện người dùng, xử lý nghiệp vụ và dữ liệu hệ thống.

Việc lựa chọn kiến trúc MVC cho hệ thống mang lại các lợi ích sau:

**1.1. Tách biệt trách nhiệm (Separation of Concerns)**

MVC phân chia hệ thống thành ba thành phần độc lập:
- **View:** chịu trách nhiệm giao diện
- **Controller:** xử lý yêu cầu
- **Model:** quản lý dữ liệu và nghiệp vụ

Nhờ đó, mỗi thành phần có vai trò riêng biệt, giảm sự phụ thuộc lẫn nhau.

**1.2. Dễ bảo trì và nâng cấp**

Khi thay đổi giao diện người dùng, hệ thống không cần chỉnh sửa logic xử lý. Ngược lại, khi thay đổi nghiệp vụ, không ảnh hưởng đến phần hiển thị.

**1.3. Khả năng mở rộng tốt**

Hệ thống có thể dễ dàng mở rộng chức năng mà không ảnh hưởng đến các thành phần khác, nhờ cấu trúc phân lớp rõ ràng.

**1.4. Tái sử dụng và phát triển song song**

Các thành phần có thể được phát triển độc lập bởi các nhóm khác nhau, giúp tăng hiệu suất làm việc và khả năng tái sử dụng.

**1.5. Phù hợp với các công nghệ hiện đại**

MVC được hỗ trợ rộng rãi trong các nền tảng và framework phát triển web, giúp hệ thống dễ dàng triển khai và tích hợp.

##### Mô tả kiến trúc 3 tầng theo MVC

**2.1. Tầng View (Giao diện người dùng)**

Tầng View chịu trách nhiệm hiển thị dữ liệu và tiếp nhận các thao tác từ người dùng.

Chức năng chính:
- Nhận dữ liệu đầu vào từ người dùng
- Gửi yêu cầu đến Controller
- Hiển thị kết quả xử lý (thành công hoặc lỗi)

View không chứa logic nghiệp vụ, chỉ tập trung vào trình bày và tương tác.

**2.2. Tầng Controller (Điều khiển)**

Controller là thành phần trung gian giữa View và Model.

Chức năng chính:
- Tiếp nhận request từ View
- Xử lý điều hướng luồng chương trình
- Gọi các phương thức của Model để xử lý dữ liệu
- Trả kết quả về View

Controller đóng vai trò điều phối, không xử lý logic phức tạp.

**2.3. Tầng Model (Dữ liệu và nghiệp vụ)**

Tầng Model chịu trách nhiệm quản lý dữ liệu và xử lý nghiệp vụ của hệ thống. Trong kiến trúc hiện đại, Model thường được chia thành các lớp nhỏ hơn:

**a. Entity (Lớp dữ liệu)**
- Đại diện cho các đối tượng dữ liệu trong hệ thống
- Lưu trữ thông tin; Định nghĩa cấu trúc dữ liệu

**b. Service (Lớp nghiệp vụ)**
- Chứa các xử lý nghiệp vụ chính của hệ thống
- Kiểm tra tính hợp lệ của dữ liệu; Xử lý logic nghiệp vụ; Điều phối các thao tác dữ liệu

**c. Repository (Lớp truy cập dữ liệu)**
- Thực hiện các thao tác với cơ sở dữ liệu
- Truy vấn dữ liệu; Thêm, sửa, xóa dữ liệu; Kết nối với hệ quản trị cơ sở dữ liệu

**d. Database**
- Là nơi lưu trữ toàn bộ dữ liệu của hệ thống.

##### Luồng xử lý tổng quát

Luồng xử lý của hệ thống theo mô hình MVC được thực hiện như sau:

1. Người dùng tương tác với giao diện (View)
2. View gửi yêu cầu đến Controller
3. Controller tiếp nhận và chuyển yêu cầu đến Model
4. Model xử lý dữ liệu và nghiệp vụ
5. Kết quả được trả ngược về Controller
6. Controller trả kết quả về View để hiển thị

**Luồng tổng quát:**
```
View → Controller → Model → Controller → View
```

**Trong trường hợp có cơ sở dữ liệu:**
```
View → Controller → Service → Repository → Database
```

##### Ánh xạ các module vào kiến trúc MVC

Hệ thống được chia thành các module chức năng chính. Mỗi module được ánh xạ vào các thành phần của mô hình MVC nhằm đảm bảo sự phân tách rõ ràng giữa giao diện, xử lý và dữ liệu.

**Bảng ánh xạ tổng thể:**

| Module | View (Giao diện) | Controller | Service | Repository | Entity |
|--------|-----------------|------------|---------|-----------|--------|
| Module 1 – Quản lý tài khoản | LoginView, RegisterView, ForgotPasswordView, ProfileView, GoalView | AuthController, ProfileController, GoalController | AuthService, ProfileService, GoalService | UserRepo, ProfileRepo, GoalRepo | UserAccount, HealthProfile, HealthGoal |
| Module 2 – Quản lý kế hoạch bữa ăn | MealCalendarView, CreateMealPlanView, MealDetailView, AddDishView, SaveTemplateView | MealPlanController | MealPlanService | MealPlanRepo | MealPlan, Meal, Portion, MealPlanStructure |
| Module 4 – Quản lý món ăn | DishView | DishController | DishService | DishRepo | Dish, Ingredient, NutritionInfo, FoodCategory |
| Module 5 – Quản trị hệ thống | AdminDashboardView | AdminController | AdminService | AdminRepo | Feedback, AdminLog, UserStat |

#### 1.2 Component/Module (hoặc package) diagram

> **Tham khảo:** https://www.visual-paradigm.com/guide/uml-unified-modeling-language/what-is-component-diagram/

<!-- [HÌNH ẢNH: Component/Package Diagram của hệ thống Meal Planner] -->

#### 1.3 Deployment diagram

> **Tham khảo:** https://www.visual-paradigm.com/guide/uml-unified-modeling-language/what-is-deployment-diagram/

<!-- [HÌNH ẢNH: Deployment Diagram – Mô tả triển khai hệ thống Meal Planner (Client, Web Server, Application Server, Database Server)] -->

---

### 2. Detailed Design

#### 2.1 Detailed class diagram

##### Module 1 - Quản lý tài khoản

<!-- [HÌNH ẢNH: Detailed Class Diagram – Module 1 (UserAccount, HealthProfile, HealthGoal với đầy đủ thuộc tính và phương thức)] -->

##### Module 2 - Quản lý kế hoạch bữa ăn

<!-- [HÌNH ẢNH: Detailed Class Diagram – Module 2 (MealPlan, Meal, Portion, MealPlanTemplate với đầy đủ thuộc tính và phương thức)] -->

##### Module 3 - Quản lý món ăn

<!-- [HÌNH ẢNH: Detailed Class Diagram – Module 3 (Dish, Ingredient, NutritionInfo, FoodCategory, FavoriteDish với đầy đủ thuộc tính và phương thức)] -->

##### Module 4 - Quản trị hệ thống (Admin)

<!-- [HÌNH ẢNH: Detailed Class Diagram – Module 4 (Admin, Feedback, AdminLog, UserStat với đầy đủ thuộc tính và phương thức)] -->

#### 2.2 Detailed sequence diagram

##### Module 1 - Quản lý tài khoản

<!-- [HÌNH ẢNH: Detailed Sequence Diagram – UC01 Đăng ký (có đầy đủ lớp: View, Controller, Service, Repository, Database)] -->

<!-- [HÌNH ẢNH: Detailed Sequence Diagram – UC02 Đăng nhập] -->

<!-- [HÌNH ẢNH: Detailed Sequence Diagram – UC03 Đăng xuất] -->

<!-- [HÌNH ẢNH: Detailed Sequence Diagram – UC04 Lấy lại mật khẩu] -->

<!-- [HÌNH ẢNH: Detailed Sequence Diagram – UC05 Cập nhật thông tin cá nhân] -->

<!-- [HÌNH ẢNH: Detailed Sequence Diagram – UC06 Thiết lập mục tiêu sức khỏe] -->

##### Module 2 - Quản lý kế hoạch bữa ăn

<!-- [HÌNH ẢNH: Detailed Sequence Diagram – UC07 Tạo kế hoạch bữa ăn] -->

<!-- [HÌNH ẢNH: Detailed Sequence Diagram – UC08 Thêm món ăn vào kế hoạch] -->

<!-- [HÌNH ẢNH: Detailed Sequence Diagram – UC09 Chỉnh sửa kế hoạch bữa ăn] -->

<!-- [HÌNH ẢNH: Detailed Sequence Diagram – UC10 Xóa kế hoạch bữa ăn] -->

<!-- [HÌNH ẢNH: Detailed Sequence Diagram – UC11 Xem lịch kế hoạch bữa ăn] -->

<!-- [HÌNH ẢNH: Detailed Sequence Diagram – UC12 Lưu kế hoạch mẫu yêu thích] -->

##### Module 3 - Quản lý món ăn

<!-- [HÌNH ẢNH: Detailed Sequence Diagram – Module 3 (UC13 Tìm kiếm, UC14 Thêm món tùy chỉnh, UC15 Lưu yêu thích)] -->

##### Module 4 - Quản trị hệ thống (Admin)

<!-- [HÌNH ẢNH: Detailed Sequence Diagram – UC16 Quản lý tài khoản người dùng] -->

<!-- [HÌNH ẢNH: Detailed Sequence Diagram – UC17 (a) Thêm món ăn] -->

<!-- [HÌNH ẢNH: Detailed Sequence Diagram – UC17 (b) Sửa món ăn] -->

<!-- [HÌNH ẢNH: Detailed Sequence Diagram – UC17 (c) Xóa món ăn] -->

<!-- [HÌNH ẢNH: Detailed Sequence Diagram – UC18 Xem thống kê người dùng] -->

<!-- [HÌNH ẢNH: Detailed Sequence Diagram – UC19 Quản lý phản hồi người dùng (đang làm)] -->

#### 2.3 ERD (Database)

<!-- [HÌNH ẢNH: ERD – Sơ đồ quan hệ thực thể của toàn bộ hệ thống Meal Planner] -->

#### 2.4 Test case

##### Module 1 - Quản lý tài khoản

- TC-UC01: Đăng ký (valid / email trùng / sai định dạng / mật khẩu không khớp)
- TC-UC02: Đăng nhập (valid / sai mật khẩu / tài khoản bị khóa)

##### Module 2 - Quản lý kế hoạch bữa ăn

**TC-UC07: Tạo kế hoạch bữa ăn**

*a) Thêm một kế hoạch bữa ăn chưa có trong CSDL*

CSDL trước khi test:

| Bữa sáng | Bữa trưa | Bữa tối | Bữa phụ |
|----------|----------|---------|---------|
| Bánh mì | Cơm | Mì tôm | Chuối |

| Các bước thực hiện | Kết quả mong đợi |
|-------------------|-----------------|
| 1. Click nút "Tạo kế hoạch" | Giao diện hiển thị nút "Tạo mới từ đầu" hoặc "Sử dụng kế hoạch mẫu" |
| 2. Click nút "Tạo mới từ đầu" | Giao diện tạo kế hoạch hiển thị với các khung bữa ăn trống (Sáng, Trưa, Tối, Phụ) |
| 3. Nhập món ăn: Sáng: Phở / Trưa: Gà rán / Tối: Salad / Phụ: Sữa tươi và click nút lưu | Thông báo hiện lên: Tạo kế hoạch thành công! |
| Click vào nút OK của thông báo | Quay trở về giao diện ban đầu |

CSDL sau khi test:

| Bữa sáng | Bữa trưa | Bữa tối | Bữa phụ |
|----------|----------|---------|---------|
| Bánh mì | Cơm | Mì tôm | Chuối |
| Phở | Gà rán | Salad | Sữa tươi |

*b) Thêm một kế hoạch bữa ăn đã có trong CSDL*

CSDL trước khi test:

| Bữa sáng | Bữa trưa | Bữa tối | Bữa phụ |
|----------|----------|---------|---------|
| Bánh mì | Cơm | Mì tôm | Chuối |
| Phở | Gà rán | Salad | Sữa tươi |

| Các bước thực hiện | Kết quả mong đợi |
|-------------------|-----------------|
| 1. Click nút "Tạo kế hoạch" | Giao diện hiển thị nút "Tạo mới từ đầu" hoặc "Sử dụng kế hoạch mẫu" |
| 2. Click nút "Tạo mới từ đầu" | Giao diện tạo kế hoạch hiển thị với các khung bữa ăn trống (Sáng, Trưa, Tối, Phụ) |
| 3. Nhập món ăn: Sáng: Phở / Trưa: Gà rán / Tối: Salad / Phụ: Sữa tươi và click nút lưu | Thông báo hiện lên: Kế hoạch đã tồn tại! |
| Click vào nút OK của thông báo | Quay trở về giao diện ban đầu |

CSDL sau khi test *(không thay đổi)*:

| Bữa sáng | Bữa trưa | Bữa tối | Bữa phụ |
|----------|----------|---------|---------|
| Bánh mì | Cơm | Mì tôm | Chuối |
| Phở | Gà rán | Salad | Sữa tươi |

##### Module 3 - Quản lý món ăn

- TC-UC14: Thêm món tùy chỉnh (valid / thiếu nguyên liệu / tên trùng)

##### Module 4 - Quản trị hệ thống (Admin)

**TC-UC17: Admin quản lý món ăn (Thêm / Sửa / Xóa)**

*5.2. Test case – Thêm món ăn*

a) Thêm một món ăn chưa có trong CSDL

| Các bước thực hiện | Kết quả mong đợi |
|-------------------|-----------------|
| 1. Click nút "Tạo kế hoạch" | Giao diện hiển thị nút "Tạo mới từ đầu" hoặc "Sử dụng kế hoạch mẫu" |
| 2. Click nút "Tạo mới từ đầu" | Giao diện tạo kế hoạch hiển thị với các khung bữa ăn trống (Sáng, Trưa, Tối, Phụ) |
| 3. Nhập món ăn và click nút lưu | Thông báo hiện lên: Tạo kế hoạch thành công! |
| Click vào nút OK của thông báo | Quay trở về giao diện ban đầu |

b) Thêm một kế hoạch bữa ăn đã có trong CSDL

| Các bước thực hiện | Kết quả mong đợi |
|-------------------|-----------------|
| 1. Click nút "Tạo kế hoạch" | Giao diện hiển thị nút "Tạo mới từ đầu" hoặc "Sử dụng kế hoạch mẫu" |
| 2. Click nút "Tạo mới từ đầu" | Giao diện tạo kế hoạch hiển thị với các khung bữa ăn trống (Sáng, Trưa, Tối, Phụ) |
| 3. Nhập món ăn đã tồn tại và click nút lưu | Thông báo hiện lên: Kế hoạch đã tồn tại! |
| Click vào nút OK của thông báo | Quay trở về giao diện ban đầu |

---

*Hà Nội – 2026*  
*Nhóm 04 – Môn Nhập môn Công nghệ Phần mềm*

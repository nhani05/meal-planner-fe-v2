# Meal Planner V2 Frontend

Frontend React cho he thong Meal Planner, ho tro lap ke hoach bua an, theo doi dinh duong, quan ly cong thuc, mau thuc don va trang quan tri.

## Tinh nang chinh

- Trang landing: gioi thieu, tinh nang, thong tin lien he.
- Xac thuc nguoi dung: dang nhap, dang ky, quen mat khau, dat lai mat khau.
- Route bao ve bang JWT, luu phien dang nhap trong `sessionStorage`.
- Dashboard tong quan chi so bua an va dinh duong.
- Lap ke hoach bua an, them mon an, xem chi tiet theo ngay va luu mau thuc don.
- Quan ly cong thuc, bua an hom nay, thong ke va cai dat tai khoan.
- Khu vuc admin cho nguoi dung co role `admin`: quan ly users, dishes, categories, feedbacks va audit logs.
- Ho tro da ngon ngu voi `react-i18next`.

## Cong nghe

- React 19
- Vite 8
- Tailwind CSS 4
- React Router 7
- Zustand
- Axios
- React Hook Form, Zod
- Recharts
- Framer Motion
- Lucide React
- ESLint

## Yeu cau moi truong

- Node.js phien ban hien dai tuong thich voi Vite 8.
- npm.
- Backend Meal Planner dang chay va expose API, mac dinh tai `http://localhost:8080/api`.

## Cai dat

```bash
npm install
```

Tao file cau hinh moi truong:

```bash
cp .env.example .env
```

Tren PowerShell co the dung lenh tuong duong:

```powershell
Copy-Item .env.example .env
```

## Bien moi truong

File `.env.example`:

```env
VITE_API_URL=http://localhost:8080/api
```

Khi deploy, cap nhat `VITE_API_URL` sang URL backend public:

```env
VITE_API_URL=https://your-backend.example.com/api
```

Frontend se gui request qua Axios instance tai `src/api/axiosInstance.js`. Neu co token dang nhap, token duoc gan vao header:

```http
Authorization: Bearer <token>
```

## Chay du an

Chay moi truong development:

```bash
npm run dev
```

Neu PowerShell chan script `npm`, dung:

```powershell
npm.cmd run dev
```

Build production:

```bash
npm run build
```

Xem thu ban build:

```bash
npm run preview
```

Kiem tra lint:

```bash
npm run lint
```

## Scripts

| Lenh | Mo ta |
| --- | --- |
| `npm run dev` | Khoi dong Vite dev server |
| `npm run build` | Build ung dung production vao `dist/` |
| `npm run preview` | Preview ban build production |
| `npm run lint` | Chay ESLint cho source code |

## Routes chinh

| Route | Mo ta |
| --- | --- |
| `/` | Trang chu landing |
| `/features` | Gioi thieu tinh nang |
| `/about` | Gioi thieu du an |
| `/contact` | Lien he |
| `/login` | Dang nhap |
| `/register` | Dang ky |
| `/forgot-password` | Quen mat khau |
| `/reset-password` | Dat lai mat khau |
| `/dashboard` | Dashboard nguoi dung |
| `/meals` | Bua an hom nay |
| `/planner` | Lap ke hoach bua an |
| `/recipes` | Cong thuc / danh sach mon an |
| `/templates` | Mau thuc don |
| `/analytics` | Thong ke |
| `/settings` | Cai dat |
| `/admin` | Dashboard admin |
| `/admin/users` | Quan ly nguoi dung |
| `/admin/dishes` | Quan ly mon an |
| `/admin/categories` | Quan ly danh muc |
| `/admin/feedbacks` | Quan ly phan hoi |
| `/admin/audit-logs` | Lich su he thong |

## Cau truc thu muc

```text
src/
  api/              Axios client va cac module goi API
  components/
    auth/           Layout xac thuc
    common/         Route guard, toast, language switcher
    landing/        Layout va thanh phan landing page
    layout/         Layout ung dung sau dang nhap
    planner/        Modal va view cho meal planner
    ui/             Component UI dung chung
  i18n/             Cau hinh ngon ngu va file dich
  pages/            Cac route page nguoi dung, auth, landing, admin
  stores/           Zustand stores
  utils/            Validator va helper dung chung
```

## Ghi chu phat trien

- `dist/` la output build production, khong nen commit.
- File `.env` chua cau hinh cuc bo, khong nen commit.
- Admin route yeu cau user co `role` la `admin`.
- Khi API tra ve `401`, frontend se logout va dieu huong ve `/login`.

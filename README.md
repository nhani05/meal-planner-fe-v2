# NutriPlan Frontend

React + Vite frontend for the Meal Planner system.

## Stack

- React 19
- Vite
- Tailwind CSS 4
- Zustand
- Axios
- React Router
- Recharts

## Run Locally

```bash
npm install
cp .env.example .env
npm run dev
```

PowerShell may block `npm` scripts on Windows. If that happens, use:

```bash
npm.cmd run dev
```

## Environment

```env
VITE_API_URL=http://localhost:8081/api
```

For deployment, set `VITE_API_URL` to your public backend URL, for example:

```env
VITE_API_URL=https://your-backend.example.com/api
```

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Structure

```text
src/
  api/          Axios client and API modules
  components/   Shared UI, layout, auth, landing, planner components
  pages/        Route pages
  stores/       Zustand stores
  utils/        Shared helpers and validators
```

Production build output is generated in `dist/` and should not be committed.

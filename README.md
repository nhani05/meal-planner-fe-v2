# NutriPlan - Meal Planner System

A modern, intelligent meal planning application built with React and Vite. NutriPlan helps users create personalized meal plans, track nutrition, and achieve their health goals.

## Features

- **Smart Meal Planning**: Create weekly meal plans tailored to your dietary preferences and health goals
- **Nutrition Tracking**: Monitor calories, macros, and micronutrients in real-time
- **Recipe Discovery**: Browse and search through a curated collection of healthy recipes
- **Progress Analytics**: Visualize your nutrition journey with detailed charts and insights
- **Personalized Templates**: Save and reuse your favorite meal plan templates
- **Admin Dashboard**: Comprehensive management tools for administrators

## Tech Stack

- **Frontend**: React 19, Vite, TailwindCSS 4
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **HTTP Client**: Axios

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── api/                    # API layer (Axios instances)
├── components/
│   ├── auth/              # Authentication components
│   ├── common/            # Shared components (ProtectedRoute, Toast)
│   ├── landing/           # Landing page components
│   ├── layout/            # App layout components
│   ├── planner/           # Meal planner components
│   └── ui/                # Reusable UI components
├── pages/
│   ├── admin/             # Admin pages
│   ├── auth/              # Auth pages (Login, Register)
│   ├── landing/           # Landing pages (Home, Features, About, Contact)
│   └── test/              # Test pages
├── stores/                # Zustand stores
└── main.jsx               # App entry point
```

## Documentation

- [API Documentation](./docs/API.md) - Complete API reference
- [OpenAPI Spec](./docs/OPENAPI.yaml) - Import into Swagger UI
- [Entity Documentation](./docs/database/ENTITY_DOCUMENTATION.md) - Database schema

## Development

The app uses Vite with HMR (Hot Module Replacement) for fast development. ESLint is configured for code quality.

## Environment Variables

Create a `.env` file:

```
VITE_API_URL=http://localhost:8081/api
```

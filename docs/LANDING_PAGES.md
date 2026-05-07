# Landing Pages Documentation

This document describes the public landing pages of the NutriPlan application.

## Overview

The landing pages are designed to introduce NutriPlan to visitors and convert them into registered users. They are accessible without authentication and provide information about the product, its features, the company, and ways to get in touch.

## Pages

### 1. Home (`/`)
The main landing page that introduces NutriPlan and encourages sign-ups.

**Sections:**
- **Hero**: Main headline, subheadline, CTA buttons, and app preview mockup
- **Stats**: Key metrics (users, recipes, meals planned, satisfaction rate)
- **Features Preview**: 6 core features with icons and descriptions
- **How It Works**: 3-step process explanation with timeline
- **Testimonials**: User reviews and ratings
- **CTA**: Final call-to-action with trial offer

**Key Features:**
- Responsive design for all screen sizes
- Smooth scroll animations using Framer Motion
- Floating UI elements for visual interest
- Gradient backgrounds and modern aesthetics

### 2. Features (`/features`)
Detailed feature showcase page.

**Sections:**
- **Hero**: Page title and description
- **Core Features Grid**: 6 main features with detailed cards
- **Feature Deep Dive**: Alternating layout sections for major features:
  - Intelligent Meal Planning
  - Comprehensive Nutrition Tracking
  - Curated Recipe Collection
- **Additional Features**: 8 more features in compact grid
- **CTA**: Trial signup prompt

**Key Features:**
- Interactive cards with hover effects
- Feature comparison layout
- Animated transitions

### 3. About (`/about`)
Company information and team introduction.

**Sections:**
- **Hero**: Mission statement
- **Stats**: Company achievements in green banner
- **Core Values**: 4 company values with icons
- **Story**: Origin story with timeline
- **Team**: Team member profiles (4 members)
- **Join Us CTA**: Careers call-to-action

**Key Features:**
- Timeline component for milestones
- Team member cards with avatars
- Company statistics display

### 4. Contact (`/contact`)
Contact form and support information.

**Sections:**
- **Hero**: Page title and description
- **Contact Form**: Name, email, subject dropdown, message textarea
- **Contact Info**: Email, phone, address, working hours
- **FAQ**: Expandable accordion with 6 common questions
- **Support Cards**: Help Center, Live Chat, Community Forum

**Key Features:**
- Form validation and submission feedback
- Animated FAQ accordion
- Contact information cards
- Map placeholder

## Technical Details

### Components

**Layout Components:**
- `LandingLayout.jsx` - Main layout wrapper with navbar and footer
- `LandingNavbar.jsx` - Sticky navigation with mobile menu
- `LandingFooter.jsx` - Multi-column footer with links and social icons

**Shared Components:**
- `FeatureCard.jsx` - Reusable feature card with icon, title, description
- `TestimonialCard.jsx` - User testimonial with rating, quote, and author
- `SectionHeader.jsx` - Consistent section title and subtitle styling

### Styling

**Color Palette:**
- Primary: `#006e1c` (Green)
- Secondary: `#4caf50` (Light Green)
- Background: `#f5fbef` (Light mint)
- Text: `#171d16` (Dark)
- Muted: `#6f7a6b` (Gray-green)
- Borders: `#becab9` (Light gray-green)

**Typography:**
- Font: Inter (system fallback)
- Headlines: Bold/Black weight with tight tracking
- Body: Regular weight with comfortable line height

**Animations:**
- Fade in up: Elements animate from below on scroll
- Stagger: Children animate with delay between each
- Hover: Scale and shadow transitions on interactive elements

### Routing

```
/              → LandingLayout → Home (public)
/features      → LandingLayout → Features (public)
/about         → LandingLayout → About (public)
/contact       → LandingLayout → Contact (public)
/login         → AuthLayout → Login
/register      → AuthLayout → Register
/dashboard     → Protected → Layout → Dashboard (was /)
/meals         → Protected → Layout → TodaysMeals
/planner       → Protected → Layout → MealPlanner
/recipes       → Protected → Layout → Recipes
```

## Dependencies

- `react-router-dom` - Routing
- `framer-motion` - Animations
- `lucide-react` - Icons
- `tailwindcss` - Styling

## Future Enhancements

- [ ] Add blog section to About page
- [ ] Implement actual contact form backend
- [ ] Add live chat integration
- [ ] Create video demos for Features page
- [ ] Add customer logos to Home page
- [ ] Implement A/B testing for CTA buttons

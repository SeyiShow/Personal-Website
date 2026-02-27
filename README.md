# Seyi Sorinade Portfolio

A professional, high-performance portfolio website built with Next.js, featuring a clean design and a robust administrative backend for content management.

## 🚀 Features

### Public Frontend
- **Dual-Image Hero Section**: Interactive hover transition between hero and about images.
- **Dynamic Portfolio Showcase**: Categorized view of projects with detailed overlays.
- **Client Testimonials**: Slideshow representation of client feedback.
- **Brand Identity**: Integrated typography using "Public Sans" for body and "Uncut Sans" for headings.
- **Full Responsitivity**: Optimized for all devices from desktop to mobile.
- **SEO Optimized**: Standard meta tags and semantic HTML structure.

### Admin Dashboard (`/admin`)
- **Secure Authentication**: JWT-based login protected via HTTP-only cookies.
- **Content Management (CRUD)**:
  - **Portfolio**: Add, edit, and delete projects (supports direct image uploads).
  - **Testimonials**: Manage client quotes and ratings.
- **Unified Interface**: Tabbed dashboard for quick management.

## 🛠️ Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **Styling**: Vanilla CSS Modules (Glassmorphism & Modern UI)
- **Authentication**: JWT (`jsonwebtoken` & `jose`)
- **Icons**: `react-icons`
- **Fonts**: `@fontsource/public-sans` & `@fontsource/uncut-sans`

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory and add the following:

```env
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB=your_database_name
JWT_SECRET=your_secure_random_secret
ADMIN_PASSWORD=your_admin_login_password
```

## 🚥 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the site.

### 3. Build for Production
```bash
npm run build
npm start
```

## 📁 Project Structure

- `src/app/(public)`: Public facing routes (Home, Layout).
- `src/app/admin`: Password-protected admin dashboard.
- `src/app/api`: Backend API routes for MongoDB interaction and image uploads.
- `src/components`: Reusable UI components (Hero, Portfolio, etc.).
- `public/uploads`: Directory designated for uploaded project images.

## 📄 License
This project is private and for personal use.

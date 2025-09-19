# The Social Network 🌐

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat&logo=vercel)](https://the-social-network-two.vercel.app/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2-764ABC?style=flat&logo=redux)](https://redux-toolkit.js.org/)

> 🚧 **Ongoing class project** — A retro social network built with React and friends

**🌍 Live Demo:** https://the-social-network-two.vercel.app/

**🔗 Backend API:** https://mongoose-backend-project.onrender.com

## ⚡ Tech Stack

- **⚛️ React 19** + **⚡ Vite 7** — Fast development and modern React features
- **🗂️ Redux Toolkit 2** — Predictable state management
- **🧭 React Router DOM 7** — Client-side routing
- **🎨 Ant Design 5** — Beautiful UI components (with React 19 patch)
- **📡 Axios** — HTTP client for API calls
- **💅 Sass** — Enhanced CSS with complete SCSS architecture (variables, mixins, components)
- **☁️ Cloudinary & Multer** — File upload and image storage capabilities

## ✨ Features

- **👤 User Registration** — Client-side validation (name, email, age ≥ 18, password rules)
- **📧 Email Confirmation Flow**
  - Instruction screen after registering (`/confirm-email`)
  - Token confirmation route (`/confirm/:token`)
- **🔐 Authentication System**
  - Stores `user` and `token` in `localStorage`
  - Sends `Authorization: Bearer <token>` on logout
- **👨‍💼 Profile View** — Displays authenticated user data from Redux store
- **🧭 Smart Navigation** — Header updates based on authentication state
- **📝 Posts System**
  - View all posts on the home page with pagination support
  - Post display includes title, content, author name, and creation date
  - **🖼️ Image Gallery** — Multiple images per post in responsive grid layout
  - Loading states, error handling, and empty state management
  - Automatic image fallback for broken/missing images
  - **🔍 Individual Post Detail** — Dedicated page for viewing single posts (`/post/:id`)
  - **🔎 Search Functionality** — Search posts by title with dedicated results page (`/search/:postName`)
- **🎨 Modern UI Design**
  - Classic Facebook-inspired theme with retro styling
  - Custom SVG icons for enhanced user experience
  - Complete SCSS architecture with organized variables, mixins, and components
  - Responsive design patterns and consistent spacing system

## 📁 Project Structure

```
src/
  components/
    Header/
      Header.jsx       # Navigation header with auth-based links
    Posts/
      Posts.jsx        # Posts list container component
    Post/
      Post.jsx         # Individual post display with images
    PostDetail/
      PostDetail.jsx   # Single post detail page component
    Search/
      Search.jsx       # Search results page component
    Icons/
      Icons.jsx        # Custom SVG icons (Heart, User, Clock, Comment)
    Footer/            # Footer component (directory)
  pages/
    Home/Home.jsx      # Main page displaying Posts component
    Login/Login.jsx    # User login page
    Register/Register.jsx # User registration page
    Profile/Profile.jsx # User profile page
    ConfirmEmail/ConfirmEmail.jsx # Email confirmation page
  redux/
    auth/
      authService.js   # API calls (register, login, logout, confirm)
      authSlice.js     # Redux slice + thunks for authentication
    posts/
      postsService.js  # API calls (getAllPostsInfo, getPostById, getPostByTitle)
      postsSlice.js    # Redux slice + thunks for posts with search
    store.js           # Redux store configuration
  assets/
    sass/
      main.scss        # Main SCSS entry point
      utils/
        _variables.scss # SCSS variables (colors, spacing, typography)
        _mixins.scss   # Reusable SCSS mixins
      base/
        _reset.scss    # CSS reset and base styles
        _typography.scss # Typography styles
        _layout.scss   # Layout utilities
      components/
        _header.scss   # Header component styles
        _post-card.scss # Post card component styles
  config/
    api.js             # API base URL and URL helper functions
  App.jsx              # Routes and main layout
  main.jsx             # App bootstrap (Redux Provider)
```

## 🚀 Getting Started

### 📋 Prerequisites

- Node.js ≥ 18 (recommend using `nvm`)

```bash
nvm install 20
nvm use 20
```

### 📦 Install Dependencies

```bash
npm install
```

### 🌍 Environment Variables

This project uses Vite env variables (must be prefixed with `VITE_`).

- API base URL defaults to `http://localhost:3000` (see `src/redux/auth/authService.js`).
- You can override it with `VITE_API_BASE` in a `.env` file at the project root.

Example `.env`:

```bash
VITE_API_BASE=https://mongoose-backend-project.onrender.com
```

### 🔥 Run Development Server

```bash
npm run dev
```

Vite will print a local URL to open in your browser.

### 📦 Build for Production

```bash
npm run build
```

### 👀 Preview Production Build

```bash
npm run preview
```

### 🔍 Lint Code

```bash
npm run lint
```

## 🗺️ Routing

Declared in `src/App.jsx`:

- `🏠 /` → Home (displays all posts)
- `🔑 /login` → Login
- `📝 /register` → Register
- `📧 /confirm-email` → Instructions to check your email
- `✅ /confirm/:token` → Confirms email via token
- `👨‍💼 /profile` → User profile page
- `🔍 /post/:id` → Individual post detail page
- `🔎 /search/:postName` → Search results for posts by title
- `❌ /*` → 404 Not Found page

## 🔌 API Integration

The frontend integrates with the backend API using Axios. Services are defined in Redux service files:

### 👤 Authentication Endpoints (`src/redux/auth/authService.js`)

- **📝 `POST /users/register`** — Creates a new user
- **🔑 `POST /users/login`** — Authenticates a user; stores `{ user, token }` in `localStorage`
- **🚪 `DELETE /users/logout`** — Logs out the current user (requires `Authorization: Bearer <token>`)
- **✅ `GET /users/confirm/:token`** — Confirms email

### 📝 Posts Endpoints (`src/redux/posts/postsService.js`)

- **📖 `GET /posts/full`** — Fetches all posts with full details including:
  - Post content (title, body, creation date)
  - Author information (name)
  - Multiple image URLs
  - Supports pagination via `page` and `limit` query parameters
- **🔍 `GET /posts/id/:id`** — Fetches a single post by its ID for detailed view
- **🔎 `GET /posts/title/:title`** — Searches posts by title (returns array of matching posts)

The API base URL is configured via `VITE_API_BASE`. If not set, it falls back to `http://localhost:3000`.

## 🔐 Authentication Flow

1. **📝 Register**
   - Client-side checks: required fields, password length (≥ 6), age (≥ 18), matching passwords
   - On success, the UI navigates to `/confirm-email`
2. **📧 Confirm Email**
   - Follow the link sent by the backend to `/confirm/:token`
   - The page calls the confirm endpoint and shows success or error
3. **🔑 Login**
   - Stores `user` and `token` in `localStorage`
   - Header switches to authenticated links
4. **🚪 Logout**
   - Sends `DELETE /users/logout` with `Authorization: Bearer <token>`
   - Clears `localStorage` and returns to unauthenticated state

## 📝 Posts System

The posts functionality is built with Redux Toolkit and provides a complete viewing experience:

### 🏗️ Architecture

- **Redux State Management**: Posts are managed via `postsSlice.js` with typical async states (loading, success, error)
- **Service Layer**: `postsService.js` handles API communication with the backend
- **Component Architecture**: 
  - `Posts.jsx` — Container component that fetches and lists all posts
  - `Post.jsx` — Individual post renderer with image gallery support
  - `PostDetail.jsx` — Dedicated component for single post viewing
  - `Search.jsx` — Search results page with URL-decoded search terms

### 🎯 Features

1. **📖 Posts Display**
   - Automatic loading on home page visit
   - Shows post title, content, author name, and creation date
   - Responsive design that adapts to different screen sizes

2. **🖼️ Image Handling**
   - Support for multiple images per post
   - Responsive grid layout (auto-fill, min 180px columns)
   - Automatic URL conversion from relative to absolute paths
   - Graceful fallback for broken/missing images
   - Lazy loading for performance optimization

3. **⚡ State Management**
   - Loading indicators while fetching posts
   - Error state display with helpful messages
   - Empty state handling when no posts are available
   - State reset functionality for cleanup

4. **🔄 Data Flow**
   - Posts fetched automatically when `Posts` component mounts
   - Uses Redux `useSelector` to access posts state
   - Dispatches multiple thunks via `useDispatch`:
     - `getAllPostsInfo` — Fetch all posts with pagination
     - `getPostById` — Fetch single post for detail view
     - `getPostByTitle` — Search posts by title
   - Backend pagination support (configurable page/limit parameters)
   - Automatic state cleanup on component unmount (`clearPost`, `reset` actions)

## 🎨 SCSS Architecture & Styling

The project now features a complete SCSS architecture with organized, maintainable styles:

### 📁 SCSS Structure

- **`main.scss`** — Main entry point that imports all styles in correct order
- **`utils/`** — Variables and mixins (imported first)
  - `_variables.scss` — Color palette, typography, spacing, breakpoints
  - `_mixins.scss` — Reusable SCSS mixins for common patterns
- **`base/`** — Foundation styles
  - `_reset.scss` — CSS reset and normalize styles
  - `_typography.scss` — Font definitions and text styles
  - `_layout.scss` — Layout utilities and grid systems
- **`components/`** — Component-specific styles
  - `_header.scss` — Navigation header styling
  - `_post-card.scss` — Individual post card styling

### 🎯 Design System

- **Classic Facebook Theme** — Retro Facebook-inspired color scheme with `#3b5998` primary blue
- **Consistent Spacing** — Systematic spacing scale from `$spacing-xs` (4px) to `$spacing-xxl` (48px)
- **Responsive Breakpoints** — Mobile-first approach with tablet and desktop breakpoints
- **Typography Scale** — Organized font weights and Segoe UI font family
- **Component Variants** — Organized shadows, border radius, and transition definitions

## 🎭 Icons & Visual Assets

The project includes custom SVG icons through the `Icons.jsx` component:

- **HeartIcon** — Like/favorite functionality (ready for implementation)
- **UserIcon** — Profile and user-related features
- **ClockIcon** — Timestamps and time-based content
- **CommentIcon** — Comments and interaction features

All icons are SVG-based for crisp rendering at any size and follow the retro theme aesthetic.

## 📋 Available Scripts

From `package.json`:

- **🔥 `npm run dev`** — Start Vite dev server
- **📦 `npm run build`** — Production build
- **🔍 `npm run lint`** — Run ESLint
- **👀 `npm run preview`** — Preview the production build

## 📝 Notes

- 🚧 This is an ongoing student project. Expect active changes and improvements.
- ⏰ If the backend is down or sleeping (free tier), the first request may take a few seconds to spin up.

## 🔗 Links

- **🌍 Frontend (Vercel):** https://the-social-network-two.vercel.app/
- **🚀 Backend API (Render):** https://mongoose-backend-project.onrender.com

---

*Made with ❤️ for learning purposes*

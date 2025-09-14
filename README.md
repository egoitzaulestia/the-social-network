# The Social Network 🌐

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat&logo=vercel)](https://the-social-network-two.vercel.app/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2-764ABC?style=flat&logo=redux)](https://redux-toolkit.js.org/)

> 🚧 **Ongoing class project** — A modern social network built with React and friends

**🌍 Live Demo:** https://the-social-network-two.vercel.app/

**🔗 Backend API:** https://mongoose-backend-project.onrender.com

## ⚡ Tech Stack

- **⚛️ React 19** + **⚡ Vite 7** — Fast development and modern React features
- **🗂️ Redux Toolkit 2** — Predictable state management
- **🧭 React Router DOM 7** — Client-side routing
- **🎨 Ant Design 5** — Beautiful UI components (with React 19 patch)
- **📡 Axios** — HTTP client for API calls
- **💅 Sass** — Enhanced CSS (coming soon...)

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

## 📁 Project Structure

```
src/
  components/
    Header/
      Header.jsx
  pages/
    Home/Home.jsx
    Login/Login.jsx
    Register/Register.jsx
    Profile/Profile.jsx
    ConfirmEmail/ConfirmEmail.jsx
  redux/
    auth/
      authService.js   # API calls (register, login, logout, confirm)
      authSlice.js     # Redux slice + thunks
    store.js
  App.jsx              # Routes
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

- `🏠 /` → Home
- `🔑 /login` → Login
- `📝 /register` → Register
- `📧 /confirm-email` → Instructions to check your email
- `✅ /confirm/:token` → Confirms email via token

## 🔌 API Integration

Defined in `src/redux/auth/authService.js` using Axios. The following endpoints are used by the frontend:

- **📝 `POST /users/register`** — Creates a new user
- **🔑 `POST /users/login`** — Authenticates a user; stores `{ user, token }` in `localStorage`
- **🚪 `DELETE /users/logout`** — Logs out the current user (requires `Authorization: Bearer <token>`)
- **✅ `GET /users/confirm/:token`** — Confirms email

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

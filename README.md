# The Social Network — (still ongoing project)

Front-end for an ongoing class project: a simple social network with user authentication and email confirmation. The app is built with React, Redux Toolkit, React Router, Vite, Ant Design, and Axios.

- Backend API (deployed): https://mongoose-backend-project.onrender.com

## Tech stack

- React 19 + Vite 7
- Redux Toolkit 2 for state management
- React Router DOM 7 for routing
- Ant Design 5 (with `@ant-design/v5-patch-for-react-19`)
- Axios for HTTP requests
- Sass (soon...)

## Features

- User registration with client-side validation (name, email, age ≥ 18, password rules)
- Email confirmation flow
  - Instruction screen after registering (`/confirm-email`)
  - Token confirmation route (`/confirm/:token`)
- Login and Logout
  - Stores `user` and `token` in `localStorage`
  - Sends `Authorization: Bearer <token>` on logout
- Basic profile view that reads the authenticated user from the Redux store
- Navigation updates based on auth state (Header)

## Project structure (simplified)

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

## Getting started

### Prerequisites

- Node.js ≥ 18 (recommend using `nvm`)

```bash
nvm install 20
nvm use 20
```

### Install dependencies

```bash
npm install
```

### Environment variables

This project uses Vite env variables (must be prefixed with `VITE_`).

- API base URL defaults to `http://localhost:3000` (see `src/redux/auth/authService.js`).
- You can override it with `VITE_API_BASE` in a `.env` file at the project root.

Example `.env`:

```bash
VITE_API_BASE=https://mongoose-backend-project.onrender.com
```

### Run the app in development

```bash
npm run dev
```

Vite will print a local URL to open in your browser.

### Build for production

```bash
npm run build
```

### Preview the production build locally

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Routing

Declared in `src/App.jsx`:

- `/` → Home
- `/login` → Login
- `/register` → Register
- `/confirm-email` → Instructions to check your email
- `/confirm/:token` → Confirms email via token

## API integration

Defined in `src/redux/auth/authService.js` using Axios. The following endpoints are used by the front-end:

- `POST /users/register` — creates a new user
- `POST /users/login` — authenticates a user; stores `{ user, token }` in `localStorage`
- `DELETE /users/logout` — logs out the current user (requires `Authorization: Bearer <token>`)
- `GET /users/confirm/:token` — confirms email

The API base URL is configured via `VITE_API_BASE`. If not set, it falls back to `http://localhost:3000`.

## Auth flow (front-end)

1. Register
   - Client-side checks: required fields, password length (≥ 6), age (≥ 18), matching passwords.
   - On success, the UI navigates to `/confirm-email`.
2. Confirm email
   - Follow the link sent by the backend to `/confirm/:token`.
   - The page calls the confirm endpoint and shows success or error.
3. Login
   - Stores `user` and `token` in `localStorage`.
   - Header switches to authenticated links.
4. Logout
   - Sends `DELETE /users/logout` with `Authorization: Bearer <token>`.
   - Clears `localStorage` and returns to unauthenticated state.

## Scripts

From `package.json`:

- `npm run dev` — start Vite dev server
- `npm run build` — production build
- `npm run lint` — run eslint
- `npm run preview` — preview the production build

## Notes

- This is an ongoing student project. Expect active changes and improvements.
- If the backend is down or sleeping (free tier), the first request may take a few seconds to spin up.

## Backend

- Deployed API base: https://mongoose-backend-project.onrender.com

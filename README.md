# Task Management Frontend

A simple task management UI built using **React**, with integration to a backend API.

## Features

- ✅ Task list with check/uncheck for completion
- ➕ Add new tasks via form (inline or modal)
- 🔁 API integration with backend (supports microservice architecture)
- 🔐 Protected routes: update/delete/create require authentication
- 📦 Environment variable configuration via `.env`

---

## Tech Stack

- Frontend: [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- Styling: Tailwind CSS
- State Management: Redux Toolkit
- HTTP Client: Axios
- Authentication: JWT

---



## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/alfindwi/artee-fe
cd artee-fe
```
### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Environment Variables
Copy the example file and fill in the required values:

```bash
cp .env.example .env
```

Edit .env :

```bash
NEXT_PUBLIC_API_URL=http://localhost:8080
```
Make sure your backend server is running at the specified URL.

### 4. Run App

```bash
npm run dev
```
Visit: http://localhost:5173
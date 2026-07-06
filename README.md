# Student Grade Management System

A full-stack web application for managing student grades.

## Features
- **Subjects:** Add, edit, and delete subjects.
- **Students:** Add, edit, and delete students with subject and grade.
- **Auto-Calculations:** Remarks are auto-calculated (grade >= 75 = PASS, otherwise FAIL) and are read-only.
- **Student Grades:** View all grades with search and PASS/FAIL filters.

## Technologies Used
- **Frontend:** React (Vite), Bootstrap
- **Backend:** Node.js, Express
- **Database:** MySQL

---

## 🚀 Getting Started Locally

### 1. Database Setup
1. Create a MySQL database instance (e.g., using Aiven).
2. Execute the `database/setup.sql` script on your database to create the required tables and views.

### 2. Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on the provided `.env.example` and fill in your database credentials.
4. Start the development server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on the provided `.env.example` and set `VITE_API_URL` to your backend URL (e.g., `http://localhost:5000`).
4. Start the development server:
   ```bash
   npm run dev
   ```

---

## 🌐 Deployment Guides

### Deploy Backend (e.g., Render)
1. Create a new Web Service.
2. Set root directory to `backend`.
3. Set build command: `npm install`.
4. Set start command: `node server.js`.
5. Add all required environment variables from your `.env` file.

### Deploy Frontend (e.g., Cloudflare Pages)
1. Connect your repository to your hosting provider.
2. Set root directory to `frontend`.
3. Set build command: `npm run build`.
4. Set build output directory: `dist`.
5. Add the `VITE_API_URL` environment variable pointing to your deployed backend URL.

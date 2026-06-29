# Student Grade Management System

A simple full-stack web application for managing student grades.

## Tech Stack

- **Frontend:** React (Vite) + Bootstrap - hosted on Cloudflare Pages
- **Backend:** Node.js + Express - hosted on Render
- **Database:** MySQL - hosted on Aiven

## Database Setup

Run `database/setup.sql` on your Aiven MySQL instance to create the tables and view.

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file (see `.env.example`):

```
DB_HOST=your-aiven-host.aivencloud.com
DB_PORT=12345
DB_USER=avnadmin
DB_PASSWORD=your-password
DB_NAME=student_grades_db
DB_SSL=true
PORT=5000
```

Run locally:

```bash
npm run dev
```

### Deploy to Render

1. Create a new Web Service on Render
2. Set root directory to `backend`
3. Build command: `npm install`
4. Start command: `node server.js`
5. Add the environment variables from `.env.example`

## Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file:

```
VITE_API_URL=http://localhost:5000
```

Run locally:

```bash
npm run dev
```

### Deploy to Cloudflare Pages

1. Connect your repo to Cloudflare Pages
2. Set build command: `npm run build`
3. Set build output directory: `dist`
4. Set root directory: `frontend`
5. Add environment variable: `VITE_API_URL=https://your-render-app.onrender.com`

## Features

- **Subjects** - Add, edit, and delete subjects
- **Students** - Add, edit, and delete students with subject and grade
- **Student Grades** - View all grades with search and PASS/FAIL filter

## Business Rules

- Remarks are auto-calculated: grade >= 75 = PASS, otherwise FAIL
- Remarks field is readonly and cannot be edited by the user

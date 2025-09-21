# Polling System

A real-time polling application built with **React (Vite + TypeScript)** for the frontend and **Node.js (Express) + PostgreSQL** for the backend. This app allows teachers to create questions, students to submit answers, and view real-time results.


Live Demo: [https://polling-system-frontend-r03n.onrender.com]

<img width="1885" height="983" alt="image" src="https://github.com/user-attachments/assets/9261e3ef-0599-4d93-970b-06de2dcb959f" />
<img width="1885" height="983" alt="image" src="https://github.com/user-attachments/assets/d079ef14-0e55-4db4-a57e-6f06c581a74f" />
<img width="1885" height="983" alt="image" src="https://github.com/user-attachments/assets/d38c54c7-b0e8-4c16-90c1-9ef37fdb64ee" />
<img width="1885" height="983" alt="image" src="https://github.com/user-attachments/assets/014296fe-2879-4396-b9e7-5a4863cabea0" />
<img width="1885" height="983" alt="image" src="https://github.com/user-attachments/assets/d2a5b67c-af90-4ac3-8234-f56fda23b172" />
<img width="1853" height="950" alt="image" src="https://github.com/user-attachments/assets/6fc4943f-0637-4112-b466-d606c0f4bfd0" />


---

## Table of Contents

- Features
- Tech Stack
- Project Structure
- Getting Started
  - Backend
  - Frontend
- Environment Variables
- Database Setup
- Running the Project
- Deployment

---

## Features

- Teachers can:
  - Create new questions with multiple options.
  - View live results and percentages for each option.
  - Start/close questions.
- Students can:
  - View active questions.
  - Submit answers.
  - See results after submission.
- Poll history tracking for teachers.

---

## Tech Stack

- **Frontend:** React, TypeScript, Vite, React Router DOM, CSS Modules  
- **Backend:** Node.js, Express, PostgreSQL, pg (node-postgres)  
- **Tools:** Nodemon, dotenv, CORS  

---

## Project Structure

```
polling_system/
├── backend/
│   ├── routes/
│   │   ├── students.js
│   │   ├── questions.js
│   │   └── answers.js
│   ├── db.js
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── pages/
    │   ├── components/
    │   ├── App.tsx
    │   └── main.tsx
    ├── vite.config.ts
    └── package.json
```

---

## Getting Started

### Backend

1. Navigate to backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Configure `.env` file (example provided below).

4. Run locally:

```bash
npm run dev
```

---

### Frontend

1. Navigate to frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Configure `.env` file (example provided below).

4. Run locally:

```bash
npm run dev
```

---

## Environment Variables

### Backend (`backend/.env`)

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=polling_system
PORT=5000
```

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:5000
```

> Note: `VITE_API_URL` is used to call backend APIs from React.

---

## Database Setup

1. Start PostgreSQL and connect:

```bash
psql -U postgres
```

2. Create database:

```sql
CREATE DATABASE polling_system;
```

3. Create tables:

```sql
-- Students
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Questions
CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    question_text TEXT NOT NULL,
    status ENUM('active', 'closed') DEFAULT 'active',
    timer_duration INT DEFAULT 60,
    timer_start TIMESTAMP,
    timer_end TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Options
CREATE TABLE options (
    id SERIAL PRIMARY KEY,
    question_id INT NOT NULL,
    option_text VARCHAR(255) NOT NULL,
    is_correct BOOLEAN DEFAULT FALSE
);

-- Answers
CREATE TABLE answers (
    id SERIAL PRIMARY KEY,
    question_id INT NOT NULL,
    student_id INT NOT NULL,
    option_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Running the Project

1. Start **backend** on port `5000`.  
2. Start **frontend** on port `5173` (Vite default).  
3. Open `http://localhost:5173` in your browser.

---

## Deployment

- **Backend:** Can be deployed on **Render** with PostgreSQL as the database.  
  - Build Command: `npm install` (no build needed for Node backend).  
  - Start Command: `npm start`  

- **Frontend:** Can be deployed on **Vercel / Netlify**.  
  - Ensure `VITE_API_URL` points to deployed backend.  

---

## Notes

- Make sure PostgreSQL allows connections from your frontend/backend host.  
- Teacher routes `/teacher` and `/teacher/history` require `user="teacher"` in components.  
- Student routes `/student` and `/student/questionaire` require `user="student"`.


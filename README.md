Mini Project Manager
A full-stack web application for managing personal projects and tasks with user authentication, built with separate backend and frontend architectures.
🚀 Features
Authentication

User Registration & Login - Secure email/password authentication
JWT Token Management - Stateless authentication with JSON Web Tokens
Protected Routes - Both API endpoints and frontend pages require authentication

Project Management

Personal Projects - Each user manages their own project workspace
Project CRUD - Create, read, update, and delete projects
Project Details - Each project includes title and description

Task Management

Task Organization - Tasks are organized within projects
Task Properties - Each task has:

Title and description
Status (todo, in-progress, done)
Due date


Task Operations - Full CRUD operations for tasks
Task Filtering - Filter and sort tasks by status and due date

🛠 Tech Stack
Frontend

React - UI library for building interactive interfaces
Next.js - React framework for production-ready applications
Redux Toolkit - State management for predictable app state
Tailwind CSS - Utility-first CSS framework for styling

Backend

Node.js - JavaScript runtime environment
Express.js - Web application framework for RESTful APIs
MongoDB - NoSQL database for flexible data storage
Mongoose - MongoDB object modeling for Node.js

Authentication

JWT (JSON Web Tokens) - Secure token-based authentication
bcrypt - Password hashing and verification

📋 Prerequisites
Before running this application, make sure you have:

Node.js (v16 or higher)
npm package manager
MongoDB database (local)

⚙️ Installation & Setup
git clone <your-repository-url>
cd mini-project-manager


2. Backend Setup
bash# Navigate to backend directory
cd backend

# Install backend dependencies
npm install

# Create environment file
cp .env.example .env

Edit the .env file in the backend directory:
env# Database
MONGODB_URI=mongodb://localhost:27017/mini-project-manager

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-here

# Server Port
PORT=5000

# Node Environment
NODE_ENV=development

3. Frontend Setup
bash# Navigate to frontend directory (from root)
cd frontend

# Install frontend dependencies
npm install

4. Database Setup
Local MongoDB:
bash# Start MongoDB service
sudo systemctl start mongod

# Or using MongoDB Community Edition on macOS
brew services start mongodb/brew/mongodb-community

🚀 Running the Application
Development Mode
You need to run both backend and frontend servers:
Terminal 1 - Backend Server:
bashcd backend
npm run dev
# Backend will run on http://localhost:5000
Terminal 2 - Frontend Server:
bashcd frontend
npm run dev
# Frontend will run on http://localhost:3000
Production Mode
Backend:
bashcd backend
npm start
Frontend:
bashcd frontend
npm run build
npm start

Project Structure
mini-project-manager/
├── backend/                    # Express.js API server
│   ├── package.json           # Backend dependencies
│   ├── server.js              # Express server entry point
│   ├── .env.example           # Environment variables template
│   ├── models/                # Mongoose database models
│   │   ├── User.js            # User schema and model
│   │   ├── Project.js         # Project schema and model
│   │   └── Task.js            # Task schema and model
│   ├── routes/                # Express route handlers
│   │   ├── auth.js            # Authentication routes
│   │   ├── projects.js        # Project CRUD routes
│   │   └── tasks.js           # Task CRUD routes
│   └── middleware/            # Custom middleware
│       └── auth.js            # JWT authentication middleware
├── frontend/                  # Next.js React application
│   ├── package.json          # Frontend dependencies
│   ├── next.config.js        # Next.js configuration
│   ├── tailwind.config.js    # Tailwind CSS configuration
│   ├── pages/                # Next.js pages
│   │   ├── _app.js           # App component wrapper
│   │   ├── index.js          # Home/landing page
│   │   ├── login.js          # Login page
│   │   ├── signup.js         # Registration page
│   │   └── dashboard.js      # Main dashboard
│   ├── components/           # Reusable React components
│   │   ├── Layout.js         # Page layout wrapper
│   │   ├── ProjectCard.js    # Project display component
│   │   ├── TaskList.js       # Task listing component
│   │   └── TaskModal.js      # Task creation/editing modal
│   ├── store/                # Redux Toolkit store
│   │   ├── store.js          # Store configuration
│   │   ├── authSlice.js      # Authentication state
│   │   ├── projectSlice.js   # Project management state
│   │   └── taskSlice.js      # Task management state
│   └── utils/                # Utility functions
│       └── api.js            # API client configuration
└── README.md                 # Project documentation

🔧 API Endpoints
Base URL: http://localhost:5000/api
Authentication

POST /api/auth/register - User registration
POST /api/auth/login - User login
GET /api/auth/me - Get current user profile

Projects

GET /api/projects - Get user's projects
POST /api/projects - Create new project
GET /api/projects/:id - Get specific project
PUT /api/projects/:id - Update project
DELETE /api/projects/:id - Delete project

Tasks

GET /api/tasks?project=:projectId - Get tasks for a project
POST /api/tasks - Create new task
GET /api/tasks/:id - Get specific task
PUT /api/tasks/:id - Update task
DELETE /api/tasks/:id - Delete task

🎯 Usage

Setup - Follow installation instructions for both backend and frontend
Start Servers - Run both backend (port 5000) and frontend (port 3000)
Register/Login - Create an account at /signup or sign in at /login
Dashboard - Access main dashboard at /dashboard
Create Projects - Add new projects with titles and descriptions
Manage Tasks - Add tasks to projects with status and due dates
Track Progress - Filter tasks by status and monitor project completion

🔒 Security Features

Password hashing with bcrypt
JWT token authentication
Protected API routes with middleware
Input validation and sanitization
CORS configuration
Environment variable protection

📦 Package Scripts
Backend (/backend/package.json):
json{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest"
  }
}
Frontend (/frontend/package.json):
json{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}

🚀 Deployment
Backend Deployment (Railway, Heroku, or DigitalOcean)

Environment Variables:
envMONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
NODE_ENV=production
PORT=5000

Build Command: npm install
Start Command: npm start

Frontend Deployment (Vercel, Netlify)

Update API Base URL in frontend/utils/api.js:
javascriptconst API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-domain.com/api'
  : 'http://localhost:5000/api';

Environment Variables:
envNEXT_PUBLIC_API_URL=https://your-backend-domain.com

Build Command: npm run build
Deploy: Push to main branch (auto-deploy)

🛠 Development
Adding New Features

Backend: Add routes in /backend/routes/, models in /backend/models/
Frontend: Add components in /frontend/components/, pages in /frontend/pages/
State Management: Update Redux slices in /frontend/store/

Database Models

User: { name, email, password, createdAt }
Project: { title, description, userId, createdAt, updatedAt }
Task: { title, description, status, dueDate, projectId, createdAt, updatedAt }

🔧 Configuration Files

backend/.env - Backend environment variables
frontend/next.config.js - Next.js configuration
frontend/tailwind.config.js - Tailwind CSS customization

🐛 Troubleshooting
Common Issues:

CORS Errors: Ensure backend CORS is configured for frontend URL
Database Connection: Check MongoDB URI and network access
JWT Errors: Verify JWT_SECRET is set and tokens are properly sent
Port Conflicts: Make sure ports 3000 and 5000 are available

Debug Mode:
bash# Backend with debug logs
cd backend
DEBUG=* npm run dev

# Frontend with verbose output
cd frontend
npm run dev -- --verbose
🤝 Contributing

Fork the repository
Create a feature branch (git checkout -b feature/amazing-feature)
Make changes to both backend and frontend as needed
Test both servers work together
Commit your changes (git commit -m 'Add amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
📞 Support
If you encounter any issues:

Check both backend and frontend are running
Verify database connection
Check browser console and server logs
Create an issue with detailed error information


Happy Project Managing! 

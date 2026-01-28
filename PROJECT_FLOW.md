# 🚀 CodeIntuit - Complete Project Flow & Architecture

## 📊 Project Overview
**CodeIntuit** is a full-stack DSA (Data Structures & Algorithms) learning platform that helps developers master coding problems with AI-powered analysis and intelligent progress tracking.

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     CLIENT (React + Vite)                       │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ Pages: Landing, Login, Register, Dashboard, Problems, etc  │ │
│  │ Components: Navbar, ThemeSwitcher                          │ │
│  │ Context: AuthContext (User state), ThemeContext            │ │
│  │ Services: api.js (Axios interceptor for HTTP calls)        │ │
│  └────────────────────────────────────────────────────────────┘ │
└──────────────────────┬──────────────────────────────────────────┘
                       │ HTTP (REST API)
                       │ Axios Calls
                       │
┌──────────────────────▼──────────────────────────────────────────┐
│                SERVER (Express + Node.js)                        │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ Routes: auth, problems, dashboard, leaderboard, export    │ │
│  │ Controllers: Handle business logic                        │ │
│  │ Middleware: Auth (JWT), Error handling                   │ │
│  │ Services: AI (Gemini), PDF generation                    │ │
│  └────────────────────────────────────────────────────────────┘ │
└──────────────────────┬──────────────────────────────────────────┘
                       │ Database Queries
                       │ MongoDB (Mongoose)
                       │
┌──────────────────────▼──────────────────────────────────────────┐
│                  DATABASE (MongoDB)                              │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ Collections: Users, Problems                              │ │
│  │ Stores: User credentials, problems, streaks, leaderboard │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📁 Folder Structure & Purpose

### **CLIENT SIDE** (`client/`)

```
client/
├── src/
│   ├── main.jsx                    # React entry point
│   ├── App.jsx                     # Main router & route definitions
│   ├── index.css                   # Global styles
│   ├── App.css                     # App-specific styles
│   │
│   ├── pages/                      # Page components (full page views)
│   │   ├── Landing.jsx             # Public landing page (hero section)
│   │   ├── Login.jsx               # Login form page
│   │   ├── Register.jsx            # Registration form page
│   │   ├── Dashboard.jsx           # Main dashboard (stats, charts, streaks)
│   │   ├── Problems.jsx            # Problems list with search & filters
│   │   ├── ProblemDetails.jsx      # Individual problem view
│   │   ├── UploadProblem.jsx       # Add new problem form
│   │   └── Leaderboard.jsx         # User rankings & statistics
│   │
│   ├── components/                 # Reusable components
│   │   ├── Navbar.jsx              # Navigation bar (all pages)
│   │   └── ThemeSwitcher.jsx       # Light/Dark theme toggle
│   │
│   ├── context/                    # Global state management
│   │   ├── AuthContext.jsx         # User auth state (login, signup, token)
│   │   └── ThemeContext.jsx        # Theme state (light/dark mode)
│   │
│   ├── services/                   # API & external services
│   │   └── api.js                  # Axios instance with interceptors
│   │
│   └── assets/                     # Static files (images, icons)
│
├── package.json                    # Dependencies & scripts
├── vite.config.js                  # Vite configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── postcss.config.cjs              # PostCSS configuration
└── index.html                      # HTML entry point

```

### **SERVER SIDE** (`server/`)

```
server/
├── server.js                       # Main server entry point
├── package.json                    # Dependencies & scripts
│
├── config/                         # Configuration files
│   ├── db.js                       # MongoDB connection setup
│   └── jwt.js                      # JWT token generation utilities
│
├── models/                         # Database schemas
│   ├── User.js                     # User schema (name, email, password, stats)
│   └── Problem.js                  # Problem schema (title, code, difficulty, etc)
│
├── routes/                         # API endpoint definitions
│   ├── authRoutes.js               # /api/auth (login, register, verify)
│   ├── problemRoutes.js            # /api/problems (CRUD operations)
│   ├── dashboardRoutes.js          # /api/dashboard (user stats)
│   ├── leaderboardRoutes.js        # /api/leaderboard (rankings)
│   ├── exportRoutes.js             # /api/export (problem export)
│   ├── pdfRoutes.js                # /api/export (PDF generation)
│   └── userRoutes.js               # /api/user (profile operations)
│
├── controllers/                    # Business logic handlers
│   ├── authController.js           # Login/Register/Verify logic
│   ├── problemController.js        # Problem CRUD logic
│   ├── dashboardController.js      # Dashboard stats calculation
│   ├── leaderboardController.js    # Leaderboard ranking logic
│   └── exportController.js         # Export & PDF logic
│
├── middleware/                     # Request interceptors
│   ├── authMiddleware.js           # JWT verification
│   └── errorMiddleware.js          # Error handling
│
├── services/                       # External service integrations
│   └── aiService.js                # Google Gemini AI integration
│
└── utils/                          # Helper functions
    ├── gemini.js                   # Gemini API wrapper
    ├── logger.js                   # Logging utility
    └── validate.js                 # Data validation functions

```

---

## 🔄 Complete User Flow

### **1️⃣ AUTHENTICATION FLOW**

#### **Landing Page → Registration**
```
User opens app
    ↓
Landing.jsx (Public)
    ↓
Clicks "Sign Up"
    ↓
Register.jsx (Form)
    ├─ Input: name, email, password
    ├─ Validation
    └─ POST /api/auth/register (authController)
        ├─ Hash password with bcryptjs
        ├─ Create User in MongoDB
        ├─ Generate JWT token
        └─ Return token to client
                ↓
AuthContext.jsx
    ├─ Store token in localStorage
    ├─ Store user data in state
    └─ Navigate to /dashboard
```

#### **Login Flow**
```
Login.jsx (Form)
    ├─ Input: email, password
    └─ POST /api/auth/login (authController)
        ├─ Find user by email
        ├─ Compare password with hash
        ├─ Generate JWT token
        └─ Return token
                ↓
AuthContext.jsx
    ├─ Save token to localStorage
    ├─ Set user in context
    └─ Redirect to /dashboard
```

#### **Protected Routes**
```
App.jsx
    ├─ ProtectedRoute wrapper
    │   ├─ Check if user exists in AuthContext
    │   ├─ If NO → Redirect to /login
    │   └─ If YES → Show Navbar + Page
    │
    └─ PublicRoute wrapper
        ├─ Check if user exists
        ├─ If YES → Redirect to /dashboard
        └─ If NO → Show page
```

---

### **2️⃣ PROBLEM MANAGEMENT FLOW**

#### **Upload Problem**
```
UploadProblem.jsx
    ├─ User fills form:
    │   ├─ Title, Description, Code
    │   ├─ Language (Java, Python, JS, C++)
    │   ├─ Difficulty (Easy, Medium, Hard)
    │   ├─ Topic (DataStructures, Algorithms, etc)
    │   └─ Tags
    │
    └─ POST /api/problems (problemController)
        ├─ Validate input
        ├─ Call AI Service:
        │   └─ aiService.js → Gemini API
        │       ├─ Analyze code complexity
        │       ├─ Generate intuition/explanation
        │       ├─ Extract time complexity
        │       └─ Extract space complexity
        │
        ├─ Create Problem in MongoDB
        │   └─ Problem.js schema stores all data
        │
        └─ Return problem with AI analysis
                ↓
                Toast notification "Problem uploaded!"
                ↓
                Redirect to /problems
```

#### **View Problems List**
```
Problems.jsx
    ├─ Fetch data on mount:
    │   ├─ GET /api/problems (all problems)
    │   └─ GET /api/problems/folders (topics)
    │
    ├─ Display with:
    │   ├─ Search bar (filter by title/topic)
    │   ├─ Difficulty filter dropdown
    │   ├─ Folder/Topic filter dropdown
    │   └─ Grid of problem cards
    │
    ├─ Each card shows:
    │   ├─ Title, Difficulty badge
    │   ├─ Time/Space complexity
    │   ├─ Problem description snippet
    │   ├─ Topic & Tags
    │   ├─ View button
    │   └─ More menu (View, Download, Delete)
    │
    └─ Filter Logic (all work together):
        ├─ Search: title.includes(query) OR topic.includes(query)
        ├─ Difficulty: difficulty === selected
        └─ Folder: topic === selected
```

#### **View Problem Details**
```
ProblemDetails.jsx (/problems/:id)
    ├─ Fetch single problem:
    │   └─ GET /api/problems/:id
    │
    └─ Display:
        ├─ Full problem information
        ├─ Code block (syntax highlighted)
        ├─ AI-generated insights:
        │   ├─ Intuition/Approach
        │   ├─ Time Complexity analysis
        │   ├─ Space Complexity analysis
        │   └─ Tags & metadata
        │
        └─ Actions:
            ├─ Edit problem
            ├─ Delete problem
            ├─ Download as PDF
            └─ Back to problems list
```

#### **Delete Problem**
```
Problems.jsx / ProblemDetails.jsx
    ├─ User clicks Delete
    ├─ Confirmation dialog
    ├─ If confirmed:
    │   └─ DELETE /api/problems/:id (problemController)
    │       ├─ Remove from MongoDB
    │       └─ Return success
    │
    └─ Update UI (remove from list)
```

---

### **3️⃣ DASHBOARD & STATISTICS FLOW**

#### **Dashboard Page Load**
```
Dashboard.jsx
    ├─ Fetch user stats on mount:
    │   └─ GET /api/dashboard (dashboardController)
    │       ├─ Find user in MongoDB
    │       ├─ Count solved problems
    │       ├─ Get current streak
    │       ├─ Calculate statistics:
    │       │   ├─ Problems by difficulty
    │       │   ├─ Problems by topic
    │       │   └─ Solving trends
    │       └─ Return all data
    │
    └─ Display Cards & Charts:
        ├─ Stats Cards:
        │   ├─ Total Solved: X
        │   ├─ Current Streak: X days
        │   ├─ Ranking: #X
        │   └─ Accuracy: X%
        │
        ├─ Charts (Recharts):
        │   ├─ Difficulty distribution pie chart
        │   ├─ Topic distribution bar chart
        │   ├─ Solving trend line chart
        │   └─ Weekly activity heatmap
        │
        └─ Recent Activity:
            ├─ Recently solved problems
            └─ Recent uploads
```

---

### **4️⃣ LEADERBOARD FLOW**

#### **Leaderboard Page Load**
```
Leaderboard.jsx
    ├─ Fetch all users rankings:
    │   └─ GET /api/leaderboard (leaderboardController)
    │       ├─ Sort users by totalSolved (descending)
    │       ├─ Rank by streak
    │       ├─ Calculate accuracy per user
    │       └─ Return top users
    │
    └─ Display:
        ├─ Ranking table with:
        │   ├─ Rank position
        │   ├─ User name
        │   ├─ Total problems solved
        │   ├─ Current streak
        │   ├─ Accuracy percentage
        │   └─ Difficulty distribution
        │
        └─ Highlight current user's position
```

---

### **5️⃣ THEME FLOW**

#### **Light/Dark Mode Toggle**
```
ThemeSwitcher.jsx (in Navbar)
    ├─ Current theme from ThemeContext
    ├─ Click theme button
    │   └─ Show dropdown with options:
    │       ├─ Light Mode
    │       └─ Dark Mode
    │
    └─ Select theme:
        └─ ThemeContext.jsx
            ├─ changeTheme(themeName)
            ├─ Apply CSS variables to DOM
            ├─ Save to localStorage
            └─ Re-render app with new colors
                ├─ Light: Bright background, dark text
                └─ Dark: Dark background, light text
```

---

## 🔌 API Routes & Their Purpose

### **Authentication Routes** (`/api/auth`)
```
POST /api/auth/register
├─ Input: { name, email, password }
└─ Output: { token, user }

POST /api/auth/login
├─ Input: { email, password }
└─ Output: { token, user }

GET /api/auth/verify
├─ Input: Authorization header (token)
└─ Output: { user }
```

### **Problem Routes** (`/api/problems`)
```
GET /api/problems
├─ Get all problems
└─ Output: [{ _id, title, difficulty, ... }]

GET /api/problems/:id
├─ Get single problem
└─ Output: { problem details with AI analysis }

POST /api/problems
├─ Create new problem (with AI analysis)
├─ Input: { title, code, description, language, difficulty, topic }
└─ Calls aiService.js for Gemini analysis

PUT /api/problems/:id
├─ Update problem
└─ Input: { updated fields }

DELETE /api/problems/:id
├─ Delete problem
└─ Removes from database

GET /api/problems/folders
├─ Get list of unique topics
└─ Output: [{ topic, count }]
```

### **Dashboard Routes** (`/api/dashboard`)
```
GET /api/dashboard
├─ Get user statistics
├─ Calculates:
│   ├─ Total problems solved
│   ├─ Problems by difficulty
│   ├─ Problems by topic
│   ├─ Current streak
│   └─ Accuracy metrics
└─ Output: { stats object }
```

### **Leaderboard Routes** (`/api/leaderboard`)
```
GET /api/leaderboard
├─ Get top users
├─ Sort by:
│   ├─ Total solved count
│   ├─ Current streak
│   └─ Accuracy
└─ Output: [{ rank, user, stats }]
```

### **Export/PDF Routes** (`/api/export`)
```
GET /api/export/problems/:id/pdf
├─ Generate PDF of problem
├─ Uses pdfGenerator service
└─ Returns: PDF file (blob)

GET /api/export/problems
├─ Export all problems as JSON/CSV
└─ Returns: File download
```

### **User Routes** (`/api/user`)
```
GET /api/user/profile
├─ Get current user profile
└─ Output: { user details }

PUT /api/user/profile
├─ Update user profile
└─ Input: { updated user data }
```

---

## 🧠 Key Services & Utilities

### **1. API Service** (`client/services/api.js`)
```javascript
Axios instance with:
├─ Base URL: http://localhost:5000/api
├─ Request Interceptor:
│   └─ Adds Authorization header with JWT token
│
└─ Response Interceptor:
    ├─ If 401 (Unauthorized):
    │   └─ Remove token and logout user
    └─ Pass response to caller
```

### **2. AI Service** (`server/services/aiService.js`)
```javascript
Integrates with Google Gemini AI:
├─ Input: Code snippet
├─ Calls Gemini API to:
│   ├─ Analyze code complexity
│   ├─ Generate intuitive explanation
│   ├─ Extract time complexity
│   ├─ Extract space complexity
│   └─ Suggest improvements
│
└─ Output: { intuition, timeComplexity, spaceComplexity }
```

### **3. Auth Middleware** (`server/middleware/authMiddleware.js`)
```javascript
For protected routes:
├─ Extract token from Authorization header
├─ Verify token with JWT secret
├─ If valid:
│   └─ Add user to req.user
│
└─ If invalid:
    └─ Return 401 Unauthorized
```

### **4. Context Providers** (Client-side state)

#### **AuthContext.jsx**
```javascript
Provides globally:
├─ user: Current logged-in user
├─ loading: Is auth checking
├─ login(): Function to authenticate
├─ logout(): Function to clear token
└─ register(): Function to create account
```

#### **ThemeContext.jsx**
```javascript
Provides globally:
├─ currentTheme: 'light' or 'dark'
├─ theme: Current theme colors object
├─ themes: All available themes
└─ changeTheme(): Function to switch theme
```

---

## 📊 Database Schema

### **User Collection**
```javascript
{
  _id: ObjectId,
  name: String,           // User's full name
  email: String,          // Unique email
  password: String,       // Hashed password
  totalSolved: Number,    // Count of problems solved
  streak: Number,         // Current streak (days)
  createdAt: Date,        // Account creation date
  updatedAt: Date
}
```

### **Problem Collection**
```javascript
{
  _id: ObjectId,
  title: String,                // Problem title
  description: String,          // Full problem description
  code: String,                 // Solution code
  intuition: String,            // AI-generated explanation
  timeComplexity: String,       // AI-analyzed time complexity
  spaceComplexity: String,      // AI-analyzed space complexity
  difficulty: String,           // 'Easy', 'Medium', 'Hard'
  language: String,             // 'Java', 'Python', 'JavaScript', 'C++'
  topic: String,                // Category/Folder name
  tags: [String],               // Topic tags
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔐 Security & Authentication

### **JWT Flow**
```
1. User logs in
   ├─ Server generates JWT token (with user._id as payload)
   ├─ Token stored in localStorage (client)
   └─ Token expires in 7 days

2. For protected API calls:
   ├─ Client sends: Authorization: Bearer <token>
   ├─ Server verifies token
   ├─ If valid → Process request
   └─ If invalid → Return 401

3. Logout:
   ├─ Remove token from localStorage
   └─ Clear user from context
```

### **Password Security**
```
Registration:
├─ User enters password
├─ Server hashes with bcryptjs (salt: 10)
└─ Stores hashed password in DB

Login:
├─ User enters password
├─ Server compares with stored hash
└─ If match → Generate JWT
```

---

## 🚀 Complete User Journey Example

### **Scenario: New User Learning DSA**

```
1. User lands on app
   └─ Landing page (Landing.jsx)

2. User clicks "Sign Up"
   └─ Register page (Register.jsx)
       ├─ Fills: name, email, password
       ├─ Sends to POST /api/auth/register
       └─ Account created

3. Logged in, sees Dashboard
   └─ Dashboard.jsx
       ├─ Shows empty stats (no problems yet)
       └─ Displays welcome message

4. User clicks "Add Problem"
   └─ UploadProblem.jsx
       ├─ Pastes problem code
       ├─ Selects language & difficulty
       ├─ Sends to POST /api/problems
       ├─ AI analyzes code (Gemini)
       └─ Problem saved with AI insights

5. User sees all problems
   └─ Problems.jsx
       ├─ Lists all problems (just uploaded one)
       ├─ Can search, filter by difficulty/folder
       └─ Clicks to view details

6. User views problem
   └─ ProblemDetails.jsx
       ├─ Shows code, AI analysis
       ├─ Can download as PDF
       └─ Can edit or delete

7. User checks leaderboard
   └─ Leaderboard.jsx
       ├─ Sees rankings
       ├─ Their position
       └─ Other users' stats

8. User checks dashboard again
   └─ Dashboard.jsx
       ├─ Stats updated (1 problem solved)
       ├─ Shows streak (1 day)
       ├─ Charts updated
       └─ Can toggle theme (Light/Dark)
```

---

## 📝 Summary Table

| Component | Purpose | Tech Used |
|-----------|---------|-----------|
| **main.jsx** | React entry point | React DOM |
| **App.jsx** | Router & routes | React Router |
| **AuthContext** | User state management | React Context |
| **ThemeContext** | Theme state management | React Context |
| **Navbar** | Navigation bar | React + Tailwind |
| **Landing** | Public homepage | React + Framer Motion |
| **Login/Register** | Auth pages | React + Axios |
| **Dashboard** | Stats & charts | Recharts + Axios |
| **Problems** | Problems list | React + Filters |
| **ProblemDetails** | Single problem | React + Axios |
| **UploadProblem** | Problem creation | React + Axios |
| **Leaderboard** | User rankings | React + Axios |
| **API Service** | HTTP client | Axios + Interceptors |
| **Server.js** | Express app | Express + Middleware |
| **Routes** | API endpoints | Express Router |
| **Controllers** | Business logic | JavaScript |
| **Models** | DB schemas | Mongoose |
| **authMiddleware** | JWT verification | jsonwebtoken |
| **aiService** | Code analysis | Google Gemini API |
| **MongoDB** | Database | Mongoose ODM |

---

## 🎯 Key Technologies

- **Frontend**: React 19, Vite, Tailwind CSS, Framer Motion, Recharts, Axios
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: JWT, bcryptjs
- **AI Integration**: Google Gemini API
- **UI/UX**: Responsive design, Dark/Light theme, Smooth animations

---

## 🔗 Data Flow Diagram

```
User Action
    ↓
React Component (pages/)
    ↓
api.js (Axios call + JWT token)
    ↓
Server Route (routes/)
    ↓
Controller (business logic)
    ↓
AI Service (if needed) / Database Query (models/)
    ↓
MongoDB (CRUD operation)
    ↓
Response back to Client
    ↓
Context update + UI re-render
    ↓
User sees result
```

This is the complete flow of CodeIntuit! 🎉

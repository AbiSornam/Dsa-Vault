# 🚀 CodeIntuit - DSA Learning Platform

![CodeIntuit Banner](https://img.shields.io/badge/DSA-Learning%20Platform-7c3aed?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb)

> Master coding problems with AI-powered analysis and intelligent progress tracking

## ✨ Features

### 🎯 Core Features
- **AI-Powered Analysis**: Automatically analyze code complexity using Google Gemini AI
- **Visual Dashboard**: Track your learning journey with beautiful charts and statistics
- **Problem Management**: Organize problems by topics, difficulty, and tags
- **Leaderboard**: Compete with other developers and track your ranking
- **Smart Organization**: Intelligent file management with folders and categories
- **Streak Tracking**: Maintain your coding consistency with daily streaks

### 🎨 UI Highlights
- **Modern Design**: Professional, colorful interface matching industry standards
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Smooth Animations**: Framer Motion powered transitions and interactions
- **Dark Mode Ready**: Eye-friendly interface (coming soon)

## 🛠️ Tech Stack

### Frontend
- **React 19.2** - Modern UI library
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Recharts** - Beautiful data visualizations
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications

### Backend
- **Node.js & Express** - Server framework
- **MongoDB & Mongoose** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Google Gemini AI** - Code analysis
- **CORS** - Cross-origin support

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn
- Google Gemini API key

### Step 1: Clone the Repository
```bash
git clone https://github.com/AbiSornam/Dsa-Vault.git
cd DSAVAULT
```

### Step 2: Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Configure environment variables
# Create a .env file with:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_here
GEMINI_API_KEY=your_gemini_api_key

# Start the server
npm run dev
```

### Step 3: Frontend Setup

Open a new terminal window:

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Step 4: Access the Application

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000
- **API Documentation**: See `/server/API_ROUTES.md`

## 🎮 Usage Guide

### 1. **Registration & Login**
- Create a new account on the register page
- Login with your credentials
- Get automatically redirected to the dashboard

### 2. **Upload a Problem**
- Navigate to the Upload page
- Fill in problem details (title, description, code)
- Select language, difficulty, and topic
- Add relevant tags
- Click "Generate Analysis & Save"
- AI will analyze your code and provide:
  - Time complexity
  - Space complexity
  - Intuitive explanation

### 3. **View Dashboard**
- See your total problems solved
- Track weekly progress
- View difficulty distribution (pie chart)
- Analyze most practiced topics (bar chart)
- Monitor complexity trends (line chart)
- Check recent problem submissions

### 4. **Manage Problems**
- Browse all your problems in grid view
- Filter by difficulty, topic, or tags
- Search for specific problems
- Organize by folders/topics
- Delete unwanted problems
- Click on any problem to view details

### 5. **Leaderboard**
- View global statistics
- See top performers
- Track your ranking
- Compare difficulty levels
- Monitor accuracy and streaks

## 🔑 Key API Endpoints

### Authentication
```
POST   /api/auth/register    - Register new user
POST   /api/auth/login       - Login user
GET    /api/auth/me          - Get current user
```

### Problems
```
GET    /api/problems         - Get all user problems
POST   /api/problems         - Create problem with AI analysis
GET    /api/problems/:id     - Get single problem
PUT    /api/problems/:id     - Update problem
DELETE /api/problems/:id     - Delete problem
GET    /api/problems/folders - Get topic folders
GET    /api/problems/search  - Search problems
```

### Dashboard
```
GET    /api/dashboard/summary          - Get dashboard stats
GET    /api/dashboard/topics           - Get topic statistics
GET    /api/dashboard/complexity-trend - Get complexity trends
GET    /api/dashboard/streak           - Get current streak
```

### Leaderboard
```
GET    /api/leaderboard      - Get leaderboard data
```

## 📁 Project Structure

```
DSAVAULT/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context (Auth)
│   │   ├── services/       # API services
│   │   └── assets/         # Static assets
│   ├── public/
│   └── package.json
│
├── server/                 # Node.js backend
│   ├── controllers/        # Route controllers
│   ├── models/            # Mongoose models
│   ├── routes/            # Express routes
│   ├── middleware/        # Custom middleware
│   ├── utils/             # Utility functions
│   ├── config/            # Configuration files
│   └── server.js          # Entry point
│
└── README.md
```

## 🎨 Color Palette

- **Primary Purple**: `#7c3aed` - Main brand color
- **Indigo**: `#6366f1` - Interactive elements
- **Success Green**: `#10b981` - Easy difficulty
- **Warning Yellow**: `#f59e0b` - Medium difficulty
- **Error Red**: `#ef4444` - Hard difficulty
- **Neutral Slate**: `#64748b` - Text and borders

## 🔐 Environment Variables

### Server (.env)
```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dsavault
JWT_SECRET=your_super_secret_jwt_key_here
GEMINI_API_KEY=your_gemini_api_key_here
```

### Client (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 🚀 Deployment

### Backend (Render/Railway)
1. Push code to GitHub
2. Create new web service
3. Connect GitHub repository
4. Set environment variables
5. Deploy!

### Frontend (Vercel/Netlify)
1. Push code to GitHub
2. Import project
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Deploy!

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👤 Author

**Abi Sornam**
- GitHub: [@AbiSornam](https://github.com/AbiSornam)

## 🙏 Acknowledgments

- Google Gemini AI for code analysis
- React community for amazing tools
- All contributors and users

## 📧 Support

For support, email abisornam16@gmail.com or open an issue on GitHub.

---

Made with ❤️ by Abi Sornam

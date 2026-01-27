# 🚀 Quick Start Guide - CodeIntuit

## Prerequisites Checklist
- ✅ Node.js (v16+) installed
- ✅ MongoDB (local or Atlas account)
- ✅ Google Gemini API Key ([Get it here](https://makersuite.google.com/app/apikey))
- ✅ Git installed

## Step-by-Step Setup

### 1️⃣ Backend Setup (Server)

```bash
# Open terminal in the project root
cd server

# Install all dependencies
npm install

# Create .env file (already exists, just verify)
# Make sure these values are set:
PORT=5000
MONGO_URI=mongodb+srv://abisornam16:JirXu5hDlepEF6se@cluster0.tsbhecf.mongodb.net/dsavault
JWT_SECRET=supersecretkey123
GEMINI_API_KEY=AIzaSyCjosyeSUgfW1PZ6v79FNCV60ogpqDZo_E

# Start the backend server
npm run dev
```

✅ **Expected Output:**
```
Server started on port 5000
MongoDB Connected: cluster0...
```

### 2️⃣ Frontend Setup (Client)

**Open a NEW terminal window** (keep the backend running):

```bash
# Navigate to client directory from project root
cd client

# Install all dependencies
npm install

# Start the development server
npm run dev
```

✅ **Expected Output:**
```
VITE v7.x.x  ready in xxx ms
Local:   http://localhost:5173/
```

### 3️⃣ Access the Application

**Open your browser and go to:**
```
http://localhost:5173
```

## 🎯 First Time User Journey

### Step 1: Register
1. Click "Continue with Google" or "Start Free Trial"
2. Fill in your details:
   - Name: Your Full Name
   - Email: your@email.com
   - Password: (min 6 characters)
3. Click "Start For Free"
4. You'll be automatically logged in and redirected to Dashboard

### Step 2: Upload Your First Problem
1. Click "Upload" in the navigation
2. Fill in the form:
   - **Title**: "Two Sum"
   - **Language**: Select your preferred language
   - **Topic**: "Arrays"
   - **Difficulty**: "Easy"
   - **Problem Statement**: Paste the problem description
   - **Your Solution**: Paste your code
   - **Tags**: "array, hash-table" (comma separated)
3. Click "Generate Analysis & Save"
4. Wait for AI to analyze (5-10 seconds)
5. View the analysis with time/space complexity and intuition!

### Step 3: Explore Dashboard
1. Click "Dashboard" in navigation
2. See your statistics:
   - Total problems solved
   - Weekly progress
   - Difficulty distribution pie chart
   - Most practiced topics bar chart
   - Recent problems list

### Step 4: Manage Problems
1. Click "My Problems" in navigation
2. View all problems in a beautiful grid
3. Filter by difficulty or search
4. Click on any problem card to view details
5. Delete problems if needed

### Step 5: Check Leaderboard
1. Click "Leaderboard" in navigation
2. See your ranking among all users
3. View global statistics
4. Compare your performance

## 🔧 Troubleshooting

### Backend Issues

**Problem**: `MongoDB connection failed`
```bash
# Solution 1: Check if MongoDB is running
# For local MongoDB:
sudo systemctl start mongod  # Linux
brew services start mongodb-community  # Mac

# For MongoDB Atlas:
# Verify your MONGO_URI in .env is correct
# Check if your IP is whitelisted in Atlas
```

**Problem**: `Port 5000 already in use`
```bash
# Solution: Change port in .env
PORT=5001

# Or kill the process using port 5000
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:5000 | xargs kill
```

**Problem**: `Gemini API error`
```bash
# Solution: Verify your API key
# Get a new key from: https://makersuite.google.com/app/apikey
# Update GEMINI_API_KEY in server/.env
```

### Frontend Issues

**Problem**: `Cannot connect to backend`
```bash
# Solution 1: Make sure backend is running on port 5000
# Check console for errors

# Solution 2: Update API base URL
# Open client/src/services/api.js
# Verify baseURL is 'http://localhost:5000/api'
```

**Problem**: `npm install fails`
```bash
# Solution: Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Problem**: `Vite build errors`
```bash
# Solution: Make sure you're using Node 16+
node --version  # Should be v16 or higher

# Update Node if needed
# Then reinstall dependencies
npm install
```

## 🎨 Customization

### Change Brand Colors
Edit `client/tailwind.config.js`:
```javascript
colors: {
  primary: {
    600: '#YOUR_COLOR_HERE',
    // ... other shades
  }
}
```

### Add New Features
1. **Backend**: Add routes in `server/routes/`
2. **Frontend**: Add pages in `client/src/pages/`
3. Follow existing patterns for consistency

## 📊 Testing the Features

### Test Authentication
- [ ] Register new user
- [ ] Login with credentials
- [ ] Access protected routes
- [ ] Logout successfully

### Test Problem Upload
- [ ] Upload a problem
- [ ] AI analysis generates
- [ ] Problem appears in dashboard
- [ ] Problem appears in "My Problems"

### Test Dashboard
- [ ] Stats cards show correct data
- [ ] Charts render properly
- [ ] Recent problems display

### Test Leaderboard
- [ ] Global stats load
- [ ] User rankings display
- [ ] Badges show correctly

## 🚨 Important Notes

1. **API Key Security**: Never commit .env files to Git
2. **MongoDB**: Use a strong password in production
3. **JWT Secret**: Change it to a secure random string
4. **CORS**: Update allowed origins for production

## 📞 Need Help?

- 📧 Email: abisornam16@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/AbiSornam/Dsa-Vault/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/AbiSornam/Dsa-Vault/discussions)

## 🎉 Success!

If everything is working:
- ✅ Backend running on http://localhost:5000
- ✅ Frontend running on http://localhost:5173
- ✅ MongoDB connected
- ✅ AI analysis working
- ✅ All pages loading properly

**You're ready to master DSA! 🚀**

---

Made with ❤️ by Abi Sornam

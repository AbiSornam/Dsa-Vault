# 🚀 Quick Start Commands

## Start Development Environment

### Terminal 1 - Backend
```bash
cd server
npm install
npm run dev
```
✅ Backend running on http://localhost:5000

### Terminal 2 - Frontend
```bash
cd client
npm install
npm run dev
```
✅ Frontend running on http://localhost:5173

## Common Commands

### Backend (server/)
```bash
# Install dependencies
npm install

# Development mode with auto-restart
npm run dev

# Production mode
npm start

# Test MongoDB connection
node test-db.js
```

### Frontend (client/)
```bash
# Install dependencies
npm install

# Development mode with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Environment Setup

### Backend (.env in server/)
```env
PORT=5000
MONGO_URI=your_mongodb_uri_here
JWT_SECRET=your_jwt_secret_here
GEMINI_API_KEY=your_gemini_api_key_here
```

### Frontend (optional .env in client/)
```env
VITE_API_URL=http://localhost:5000/api
```

## Quick Checks

### Test Backend
```bash
# Check if server is running
curl http://localhost:5000

# Test auth endpoint
curl http://localhost:5000/api/auth/login
```

### Test Frontend
Open browser: http://localhost:5173

## Troubleshooting

### Port Already in Use
```bash
# Windows - Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux - Kill process on port 5000
lsof -ti:5000 | xargs kill
```

### Clear Node Modules
```bash
# Backend
cd server
rm -rf node_modules package-lock.json
npm install

# Frontend
cd client
rm -rf node_modules package-lock.json
npm install
```

### Database Connection Issues
- Check if MongoDB is running
- Verify MONGO_URI in .env
- Check network/firewall settings

## Git Commands

### First Time Setup
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

### Regular Updates
```bash
git add .
git commit -m "Your commit message"
git push
```

## Production Build

### Build Frontend
```bash
cd client
npm run build
# Output in client/dist/
```

### Test Production Build
```bash
cd client
npm run preview
# Preview at http://localhost:4173
```

## Health Checks

✅ Backend: http://localhost:5000
✅ Frontend: http://localhost:5173
✅ API Docs: /server/API_ROUTES.md

## Need Help?

📧 Email: abisornam16@gmail.com
📚 Docs: README.md, SETUP_GUIDE.md
🐛 Issues: GitHub Issues

---

Happy Coding! 🎉

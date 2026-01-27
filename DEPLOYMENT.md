# 🚀 Deployment Guide - CodeIntuit

## Overview
This guide covers deploying CodeIntuit to production using popular hosting platforms.

## Architecture
```
Frontend (React) → Vercel/Netlify
Backend (Node.js) → Render/Railway
Database → MongoDB Atlas
```

---

## 📦 Pre-Deployment Checklist

### Backend
- [ ] Environment variables configured
- [ ] MongoDB Atlas database created
- [ ] Gemini API key obtained
- [ ] CORS origins updated
- [ ] Error handling tested
- [ ] API endpoints documented

### Frontend
- [ ] API base URL configured
- [ ] Build process tested locally
- [ ] Environment variables set
- [ ] Routes working correctly
- [ ] Images optimized

---

## 🗄️ MongoDB Atlas Setup

### 1. Create Cluster
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up or login
3. Create a new cluster (Free tier is fine)
4. Choose your region (nearest to your users)

### 2. Configure Database
```bash
# Create a database user
1. Database Access → Add New Database User
   - Username: your_username
   - Password: <strong_password>
   - Privileges: Read & Write

# Whitelist IP addresses
2. Network Access → Add IP Address
   - For development: Add Current IP
   - For production: Add 0.0.0.0/0 (allow from anywhere)
```

### 3. Get Connection String
```
1. Clusters → Connect → Connect your application
2. Copy connection string:
   mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/dsavault?retryWrites=true&w=majority
3. Replace <password> with your actual password
```

---

## 🖥️ Backend Deployment (Render)

### Option 1: Render.com (Recommended)

#### Step 1: Prepare Repository
```bash
# Make sure your server/package.json has start script
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

#### Step 2: Create Render Account
1. Go to [Render.com](https://render.com)
2. Sign up with GitHub

#### Step 3: Create Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: codeintuit-api
   - **Root Directory**: `server`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

#### Step 4: Set Environment Variables
```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/dsavault
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
GEMINI_API_KEY=your_gemini_api_key_here
NODE_ENV=production
```

#### Step 5: Deploy
1. Click "Create Web Service"
2. Wait for build (3-5 minutes)
3. Your API will be live at: `https://your-app-name.onrender.com`

#### Step 6: Test API
```bash
# Test your deployed API
curl https://your-app-name.onrender.com/

# Should return: "Backend is running 🚀"
```

---

## 🌐 Frontend Deployment (Vercel)

### Step 1: Prepare Frontend

#### Update API URL
```javascript
// client/src/services/api.js
const api = axios.create({
  baseURL: 'https://your-app-name.onrender.com/api', // Your Render URL
  headers: {
    'Content-Type': 'application/json',
  },
});
```

#### Add Build Script
```json
// client/package.json - should already exist
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### Step 2: Deploy to Vercel

#### Option A: Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to client directory
cd client

# Deploy
vercel

# Follow prompts:
# Set up and deploy? Yes
# Which scope? Your account
# Link to existing project? No
# Project name? codeintuit
# Directory? ./
# Override settings? No

# Production deployment
vercel --prod
```

#### Option B: Vercel Dashboard
1. Go to [Vercel](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

#### Step 3: Environment Variables (if needed)
```env
VITE_API_URL=https://your-app-name.onrender.com/api
```

#### Step 4: Deploy
1. Click "Deploy"
2. Wait 2-3 minutes
3. Your app will be live at: `https://your-project.vercel.app`

---

## 🔐 Security Checklist

### Backend
```javascript
// server/server.js - Update CORS
app.use(cors({
  origin: [
    'https://your-project.vercel.app',
    'http://localhost:5173' // for development
  ],
  credentials: true
}));
```

### Environment Variables
- ✅ Never commit .env files
- ✅ Use strong JWT secret (32+ characters)
- ✅ Use strong MongoDB password
- ✅ Restrict API key usage in Google Cloud Console

### Rate Limiting
```javascript
// Add to server.js
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

---

## 🧪 Post-Deployment Testing

### Backend Health Check
```bash
# Test API endpoints
curl https://your-api.onrender.com/
curl https://your-api.onrender.com/api/problems  # Should return 401 without token
```

### Frontend Testing
1. Visit your Vercel URL
2. Register a new account
3. Login
4. Upload a problem
5. Check dashboard
6. View leaderboard

### Monitor Logs
**Render:**
1. Dashboard → Your Service → Logs
2. Check for errors

**Vercel:**
1. Dashboard → Your Project → Deployments → Logs

---

## 📊 Performance Optimization

### Backend
```javascript
// Add compression
const compression = require('compression');
app.use(compression());

// Add helmet for security
const helmet = require('helmet');
app.use(helmet());
```

### Frontend
```javascript
// Lazy load routes
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Problems = lazy(() => import('./pages/Problems'));

// Use Suspense
<Suspense fallback={<Loading />}>
  <Routes>
    <Route path="/dashboard" element={<Dashboard />} />
  </Routes>
</Suspense>
```

---

## 🔄 CI/CD Setup (Optional)

### GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Render
        run: |
          curl -X POST ${{ secrets.RENDER_DEPLOY_HOOK }}
```

---

## 🆘 Troubleshooting

### "CORS Error"
```javascript
// Add your frontend URL to CORS
app.use(cors({
  origin: 'https://your-frontend.vercel.app'
}));
```

### "MongoDB Connection Failed"
- Check if IP is whitelisted (0.0.0.0/0)
- Verify connection string
- Check database user credentials

### "Build Failed"
- Check Node version (use 16+)
- Clear build cache
- Check all dependencies are installed

### "API Not Responding"
- Check if backend is deployed
- Verify API URL in frontend
- Check Render logs for errors

---

## 📈 Monitoring & Analytics

### Error Tracking
- [Sentry](https://sentry.io) - Error monitoring
- [LogRocket](https://logrocket.com) - Session replay

### Analytics
- [Google Analytics](https://analytics.google.com)
- [Mixpanel](https://mixpanel.com)

### Uptime Monitoring
- [UptimeRobot](https://uptimerobot.com) - Free monitoring
- [Pingdom](https://www.pingdom.com)

---

## 💰 Cost Estimation

### Free Tier (Good for MVP)
- **MongoDB Atlas**: 512MB free
- **Render**: 750 hours/month free
- **Vercel**: 100GB bandwidth free
- **Total**: $0/month

### Production Tier
- **MongoDB Atlas**: $9/month (Shared cluster)
- **Render**: $7/month (Starter)
- **Vercel**: $20/month (Pro)
- **Total**: ~$36/month

---

## 🎉 Success Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Database connected
- [ ] User can register
- [ ] User can login
- [ ] Problems can be uploaded
- [ ] AI analysis working
- [ ] Dashboard showing data
- [ ] Leaderboard loading
- [ ] All features working

**Congratulations! Your app is live! 🚀**

---

## 📞 Support

Need help with deployment?
- 📧 Email: abisornam16@gmail.com
- 🐛 [GitHub Issues](https://github.com/AbiSornam/Dsa-Vault/issues)

---

Made with ❤️ by Abi Sornam

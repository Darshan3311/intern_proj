# Render Deployment Guide

## 🚀 Deploy to Render

This project is fully configured for deployment on Render. Follow these steps to deploy your Social Trends Dashboard:

### Prerequisites
- GitHub account
- Render account (free tier available)
- Your code pushed to a GitHub repository

### Deployment Steps

#### 1. **Push to GitHub**
```bash
git add .
git commit -m "Configure for Render deployment"
git push origin main
```

#### 2. **Connect to Render**
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Select this repository

#### 3. **Configure Service**
Render will automatically detect the `render.yaml` file, but you can also configure manually:

- **Name**: `social-trends-dashboard`
- **Environment**: `Node`
- **Build Command**: `npm run render-build`
- **Start Command**: `npm start`
- **Plan**: Free (or upgrade as needed)

#### 4. **Environment Variables**
Add these environment variables in Render dashboard:
- `NODE_ENV`: `production`
- `NODE_VERSION`: `20.18.0` (LTS version)
- Add any other variables from `.env.example` as needed

#### 5. **Deploy**
Click "Create Web Service" - Render will automatically build and deploy your app!

### 🎯 Live URL
Your app will be available at: `https://your-service-name.onrender.com`

### 📁 Project Configuration

#### Files Added/Modified:
- ✅ `render.yaml` - Render service configuration
- ✅ `package.json` - Added render-build script
- ✅ `next.config.mjs` - Configured for standalone output
- ✅ `.env.example` - Environment variables template

#### Key Features:
- **Auto-deploy**: Automatically deploys on git push
- **Health checks**: Built-in health monitoring
- **Optimized build**: Uses standalone output for faster cold starts
- **Environment ready**: Pre-configured for production

### 🔧 Local Development
```bash
npm install
npm run dev
```

### 🏗️ Production Build (Test Locally)
```bash
npm run render-build
npm start
```

### 📝 Notes
- **Free tier**: Render's free tier includes automatic sleep after 15 minutes of inactivity
- **Custom domains**: Available on paid plans
- **SSL**: Automatically provided for all deployments
- **Logs**: Available in Render dashboard for debugging

### 🚨 Troubleshooting
If deployment fails:
1. Check build logs in Render dashboard
2. Ensure all dependencies are in `package.json`
3. Verify environment variables are set correctly
4. Check that your GitHub repository is public or properly connected

---
**Ready to deploy!** 🎉
#!/bin/bash

# Render Deployment Script
# This script helps prepare and deploy your app to Render

echo "🚀 Preparing for Render deployment..."

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Not a git repository. Please run 'git init' first."
    exit 1
fi

# Check if there are uncommitted changes
if [[ -n $(git status --porcelain) ]]; then
    echo "📝 Uncommitted changes detected. Committing changes..."
    git add .
    git commit -m "Configure for Render deployment - $(date)"
else
    echo "✅ No uncommitted changes."
fi

# Test the build
echo "🧪 Testing production build..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Please fix the issues before deploying."
    exit 1
fi

echo ""
echo "🎉 Your project is ready for Render deployment!"
echo ""
echo "Next steps:"
echo "1. Push to GitHub: git push origin main"
echo "2. Go to https://dashboard.render.com/"
echo "3. Create a new Web Service"
echo "4. Connect your GitHub repository"
echo "5. Render will auto-detect the render.yaml configuration"
echo ""
echo "📖 For detailed instructions, see RENDER_DEPLOYMENT.md"
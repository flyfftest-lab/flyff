#!/bin/bash

# Railway Deployment Script
# This script helps you deploy Flyff to Railway.app

echo "🚀 Flyff Railway Deployment Setup"
echo "═════════════════════════════════════════"
echo ""

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "📦 Installing Railway CLI..."
    npm install -g @railway/cli
fi

echo "✅ Railway CLI ready"
echo ""
echo "Next steps:"
echo "1. Go to https://railway.app and create an account (use GitHub)"
echo "2. Create a new project"
echo "3. Run: railway login"
echo "4. Run: railway link (select your project)"
echo "5. Run: railway up"
echo ""
echo "For more details, see: docs/RAILWAY_DEPLOYMENT.md"
echo ""

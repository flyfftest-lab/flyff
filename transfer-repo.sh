#!/bin/bash
# Complete mirror transfer from ed3ath/flyff-web-mmo to flyfftest-lab/flyff

echo "🔄 Starting complete repository mirror transfer..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Clone as mirror
mkdir -p /tmp/flyff-mirror
cd /tmp/flyff-mirror
git clone --mirror https://github.com/ed3ath/flyff-web-mmo.git flyff-mirror.git

echo "✅ Mirror cloned"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Push to new repo
cd flyff-mirror.git
git push --mirror https://github.com/flyfftest-lab/flyff.git

echo "✅ Complete repository transferred!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📦 Your repository now has everything:"
echo "   • All source code (packages/)"
echo "   • All tools and scripts"
echo "   • Reference materials"
echo "   • Full git history"
echo ""
echo "Next steps:"
echo "1. git clone https://github.com/flyfftest-lab/flyff.git"
echo "2. cd flyff"
echo "3. pnpm install"
echo "4. cp .env.example .env"
echo "5. pnpm dev:login (Terminal 1)"
echo "6. pnpm dev:game (Terminal 2)"
echo "7. pnpm client:install && pnpm client:configure && pnpm client:build && pnpm client:run (Terminal 3)"
echo "8. Open http://localhost:8080 - Login: admin/admin"
echo ""

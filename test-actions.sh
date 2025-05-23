#!/bin/bash

# Test GitHub Actions Setup
# This script helps validate the setup before pushing to GitHub

echo "🧪 Testing GitHub Actions Setup"
echo "================================"

# Check if required files exist
echo "📁 Checking workflow files..."
if [ -f ".github/workflows/ci.yml" ]; then
    echo "✅ CI workflow found"
else
    echo "❌ CI workflow missing"
fi

if [ -f ".github/workflows/release-and-publish.yml" ]; then
    echo "✅ Release workflow found"
else
    echo "❌ Release workflow missing"
fi

if [ -f ".github/workflows/manual-release.yml" ]; then
    echo "✅ Manual release workflow found"
else
    echo "❌ Manual release workflow missing"
fi

# Check package.json configuration
echo ""
echo "📦 Checking package.json..."
if grep -q '"name": "@paxapos/av-inputs"' package.json; then
    echo "✅ Package name configured"
else
    echo "❌ Package name not configured"
fi

if grep -q '"publishConfig"' package.json; then
    echo "✅ Publish config found"
else
    echo "❌ Publish config missing"
fi

# Check if build works
echo ""
echo "🔨 Testing build..."
if npm run build; then
    echo "✅ Build successful"
else
    echo "❌ Build failed"
    exit 1
fi

# Check if tests work
echo ""
echo "🧪 Testing tests..."
if npm test; then
    echo "✅ Tests passed"
else
    echo "⚠️ Tests failed or not configured"
fi

# Check dist directory
echo ""
echo "📂 Checking build output..."
if [ -d "dist" ]; then
    echo "✅ Dist directory exists"
    echo "📋 Contents:"
    ls -la dist/ | head -10
else
    echo "❌ Dist directory not found"
fi

echo ""
echo "🎯 Next steps:"
echo "1. Set up NPM_TOKEN secret in GitHub repository"
echo "2. Push changes to trigger workflows"
echo "3. Test manual release workflow"
echo ""
echo "🔗 GitHub Actions setup: https://github.com/alevilar/av-inputs/actions"
echo "📦 NPM package: https://www.npmjs.com/package/@paxapos/av-inputs"

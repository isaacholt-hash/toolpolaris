#!/bin/bash
# ToolPolaris — GitHub Setup Script
# Run this in Git Bash from inside the toolpolaris-site folder
# Replace YOUR_GITHUB_USERNAME below before running

GITHUB_USERNAME="isaacholt-hash"

echo "Setting up ToolPolaris git repo..."

git config --global init.defaultBranch main
git init
git config user.email "isaac.holt@outlook.com"
git config user.name "ToolPolaris"
git add .
git commit -m "Initial commit — ToolPolaris landing page"
git branch -M main
git remote add origin https://github.com/$GITHUB_USERNAME/toolpolaris.git
git push -u origin main

echo ""
echo "Done! Visit https://github.com/$GITHUB_USERNAME/toolpolaris to confirm."

@echo off
cd /d "E:\OneDrive - Home\Claude\New Hustle\toolpolaris-site"

echo Staging resolved conflict...
git add src\content\articles\ai-ad-copy-generator.md

echo.
echo Committing merge...
git commit --no-edit

echo.
echo Pushing to origin/main...
git push origin main

echo.
echo Done. Netlify will deploy automatically.
pause

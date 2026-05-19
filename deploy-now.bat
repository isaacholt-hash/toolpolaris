@echo off
cd /d "E:\OneDrive - Home\Claude\New Hustle\toolpolaris-site"

echo Clearing all stale git locks...
if exist ".git\index.lock" del /f ".git\index.lock"
if exist ".git\HEAD.lock"  del /f ".git\HEAD.lock"
if exist ".git\refs\heads\main.lock" del /f ".git\refs\heads\main.lock"

echo.
echo Recovering orphaned commit 434d069 onto main branch...
git update-ref refs/heads/main 434d069a4f73858a24e5f389e2dfffbecdaf00f1
if %ERRORLEVEL% NEQ 0 (
  echo update-ref failed - branch may already be at 434d069 or ahead of it
)

echo.
echo Staging any remaining changes (hero image fix etc)...
git add -A

echo.
echo Committing if anything new is staged...
git diff --cached --quiet
if %ERRORLEVEL% == 0 (
  echo Nothing new to commit.
) else (
  git commit -m "Fix: add missing hero image for ai-marketing-tools-comparison page"
)

echo.
echo Pushing to origin/main...
git push origin main

echo.
echo ======================================================
echo Done. Netlify should start deploying within 30 seconds.
echo Check: https://app.netlify.com/projects/toolpolaris
echo New article live at:
echo   https://toolpolaris.com/tools/best-ai-writing-tools-affiliate-programs/
echo ======================================================
pause

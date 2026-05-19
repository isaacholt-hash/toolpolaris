@echo off
cd /d "E:\OneDrive - Home\Claude\New Hustle\toolpolaris-site"
echo Removing stale lock file if present...
if exist .git\HEAD.lock del /f .git\HEAD.lock
if exist .git\index.lock del /f .git\index.lock
echo Adding SEO article updates...
git add src/content/articles/ai-ad-copy-generator.md src/content/articles/ai-social-media-tools.md src/content/articles/best-ai-seo-tools.md
echo Committing...
git commit -m "SEO content updates: comparison tables, use-case sections, landing page copy

- best-ai-seo-tools: Add At a Glance comparison table near top for 'ai seo tools comparison' query (#1, 14 impressions)
- ai-social-media-tools: Expand table with ratings; add H2 sections for scheduling, caption writing, analytics
- ai-ad-copy-generator: Add Landing Page Copy Generator section with tool table and workflow"
echo Pushing to GitHub...
git push origin main
echo.
echo Done! Netlify will auto-deploy in ~60 seconds.
pause

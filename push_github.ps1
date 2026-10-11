$ErrorActionPreference = "Stop"
$env:Path = "C:\Users\Public\PortableGit\bin;" + $env:Path

Write-Host "Adding files..."
git add -A

Write-Host "Committing..."
git commit -m "Feat: Make all buttons and interactive flows fully functional across all pages"

Write-Host "Pushing to GitHub..."
git push origin master

Write-Host "Successfully pushed!"
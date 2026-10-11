$ErrorActionPreference = "Stop"
$env:Path = "C:\Users\Public\PortableGit\bin;" + $env:Path

Write-Host "Adding files..."
git add -A

Write-Host "Committing..."
git commit -m "Fix: Make registration and login resilient with local session fallback and default Firebase client config"

Write-Host "Pushing to GitHub..."
git push origin master

Write-Host "Successfully pushed!"
$ErrorActionPreference = "Stop"
$env:Path = "C:\Users\Public\PortableGit\bin;" + $env:Path

Write-Host "Adding files..."
git add -A

Write-Host "Committing..."
git commit -m "Fix: Resolve Visa Services white screen with resilient fallbacks and error boundary"

Write-Host "Pushing to GitHub..."
git push origin master

Write-Host "Successfully pushed!"
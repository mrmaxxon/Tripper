$ErrorActionPreference = "Stop"
$env:Path = "C:\Users\Public\PortableGit\bin;" + $env:Path

Write-Host "Adding files..."
git add -A

Write-Host "Committing..."
git commit -m "Branding: Add high-resolution emblem as favicon, icon, and apple-touch-icon"

Write-Host "Pushing..."
git push origin master

Write-Host "Successfully pushed favicon update!"
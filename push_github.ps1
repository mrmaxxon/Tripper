$ErrorActionPreference = "Stop"
$env:Path = "C:\Users\Public\PortableGit\bin;" + $env:Path

Write-Host "Adding files..."
git add -A

Write-Host "Committing..."
git commit -m "Fix: Overwrite legacy app favicon and add explicit cache-busting head links"

Write-Host "Pushing to GitHub..."
git push origin master

Write-Host "Successfully pushed!"
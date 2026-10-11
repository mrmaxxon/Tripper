$ErrorActionPreference = "Stop"
$env:Path = "C:\Users\Public\PortableGit\bin;" + $env:Path

Write-Host "Adding files..."
git add -A

Write-Host "Committing..."
git commit -m "Branding: Add official Tripper logo and brand icon across navigation, footer, and favicon"

Write-Host "Pushing..."
git push origin master

Write-Host "Successfully pushed official brand updates!"
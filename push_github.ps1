$ErrorActionPreference = "Stop"
$env:Path = "C:\Users\Public\PortableGit\bin;" + [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

Write-Host "Committing updates..."
git add .
git commit -m "Phase 2: Add Explore Bangladesh live Firestore integration"

Write-Host "Pushing to Github..."
git push origin master

Write-Host "Done!"

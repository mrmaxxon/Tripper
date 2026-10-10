$ErrorActionPreference = "Stop"
$env:Path = "C:\Users\Public\PortableGit\bin;" + [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

Write-Host "Initializing Git..."
git config --global user.name "mrmaxxon"
git config --global user.email "mrmaxxon@github.com"
git init
git add .
git commit -m "Initial commit for Tripper by Antigravity"

Write-Host "Creating Github Repo..."
gh repo create Tripper --public --source . --push

Write-Host "Done!"

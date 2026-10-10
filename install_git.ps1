$ErrorActionPreference = "Stop"
Write-Host "Downloading Portable Git..."
Invoke-WebRequest -Uri "https://github.com/git-for-windows/git/releases/download/v2.42.0.windows.2/PortableGit-2.42.0.2-64-bit.7z.exe" -OutFile "PortableGit.exe"
Write-Host "Extracting..."
.\PortableGit.exe -y -o C:\Users\Public\PortableGit
Write-Host "Done installing."

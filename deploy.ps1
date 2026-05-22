$gitExe = "D:\Program Files\Git\bin\git.exe"

if (-not (Test-Path $gitExe)) {
    Write-Host "ERROR: Git not found at $gitExe"
    exit 1
}

Write-Host "Using Git: $gitExe"

& $gitExe config --global user.name "humr"
& $gitExe config --global user.email "humurong@hotmail.com"
& $gitExe init
& $gitExe add .
& $gitExe commit -m "Initial commit: Xinzhou Great Wall Museum"
& $gitExe remote add origin https://github.com/humurong/xinzhougw.git
& $gitExe push -u origin main
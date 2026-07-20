$ErrorActionPreference = "Stop"
Start-Process powershell -ArgumentList '-NoExit','-Command',"Set-Location '$PSScriptRoot'; npm.cmd run dev:backend"
Start-Sleep -Seconds 2
Start-Process powershell -ArgumentList '-NoExit','-Command',"Set-Location '$PSScriptRoot'; npm.cmd run dev:frontend"
Write-Host "Se abrieron dos terminales: backend y frontend." -ForegroundColor Green

$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

function Require-Command($Name, $Friendly) {
    if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
        throw "Falta $Friendly. Instálalo y abre una nueva ventana de PowerShell."
    }
}

Require-Command "git" "Git"
Require-Command "node" "Node.js"
Require-Command "npm.cmd" "npm"

Write-Host "Verificando El Refugio de Mimi..." -ForegroundColor Cyan
& npm.cmd install --no-audit --no-fund
if ($LASTEXITCODE -ne 0) { throw "No se pudieron instalar las dependencias." }

& npm.cmd run build
if ($LASTEXITCODE -ne 0) { throw "La compilación del frontend falló." }

& npm.cmd run test --workspace backend
if ($LASTEXITCODE -ne 0) { throw "Las pruebas de seguridad fallaron." }

if (-not (Test-Path ".git")) {
    git init
    git branch -M main
}

git add .
$changes = git status --porcelain
if ($changes) {
    git commit -m "Primera versión de El Refugio de Mimi"
} else {
    Write-Host "No hay cambios nuevos para guardar." -ForegroundColor Yellow
}

$hasOrigin = (git remote) -contains "origin"
if (-not $hasOrigin) {
    $repo = Read-Host "Pega la URL del repositorio vacío (ej. https://github.com/TU-USUARIO/El-Refugio-de-Mimi.git)"
    if ([string]::IsNullOrWhiteSpace($repo)) { throw "No se indicó la URL del repositorio." }
    git remote add origin $repo.Trim()
}

git branch -M main
git push -u origin main
Write-Host "Proyecto subido. Activa Settings > Pages > GitHub Actions." -ForegroundColor Green

$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

if (-not (Get-Command node -ErrorAction SilentlyContinue)) { throw "Falta Node.js." }
$example = Join-Path $PSScriptRoot "backend\.env.example"
$target = Join-Path $PSScriptRoot "backend\.env"
Copy-Item $example $target -Force

$user = Read-Host "Usuario privado" 
if ([string]::IsNullOrWhiteSpace($user)) { $user = "Lourdes" }

$passwordSecure = Read-Host "Nueva contraseña privada (puede usar lula solo para probar)" -AsSecureString
$bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($passwordSecure)
$password = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($bstr)
[Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr)
if ([string]::IsNullOrWhiteSpace($password)) { throw "La contraseña no puede estar vacía." }

$env:MIMI_PASSWORD = $password
$hash = node -e "const {randomBytes,scryptSync}=require('crypto');const p=process.env.MIMI_PASSWORD;const s=randomBytes(16).toString('hex');console.log(s+':'+scryptSync(p,s,64).toString('hex'))"
Remove-Item Env:MIMI_PASSWORD

$keySecure = Read-Host "Pega la OPENAI_API_KEY creada (no se mostrará)" -AsSecureString
$bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($keySecure)
$key = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($bstr)
[Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr)
if ([string]::IsNullOrWhiteSpace($key)) { throw "La clave no puede estar vacía." }

$jwt = node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
$origin = Read-Host "Origen del frontend (ej. https://TU-USUARIO.github.io)"
if ([string]::IsNullOrWhiteSpace($origin)) { $origin = "http://localhost:5173" }

$content = Get-Content $target -Raw
$content = $content -replace '(?m)^APP_USERNAME=.*$', "APP_USERNAME=$user"
$content = $content -replace '(?m)^APP_PASSWORD_HASH=.*$', "APP_PASSWORD_HASH=$hash"
$content = $content -replace '(?m)^JWT_SECRET=.*$', "JWT_SECRET=$jwt"
$content = $content -replace '(?m)^OPENAI_API_KEY=.*$', "OPENAI_API_KEY=$key"
$content = $content -replace '(?m)^FRONTEND_ORIGIN=.*$', "FRONTEND_ORIGIN=$origin"
[IO.File]::WriteAllText($target, $content, (New-Object Text.UTF8Encoding($false)))

$key = $null
$password = $null
Write-Host "backend/.env creado. Este archivo está ignorado por Git y no debe subirse." -ForegroundColor Green

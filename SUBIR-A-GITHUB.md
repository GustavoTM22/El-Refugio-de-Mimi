# Subir El Refugio de Mimi a GitHub

## 1. Crear el repositorio

En GitHub crea un repositorio vacío llamado `El-Refugio-de-Mimi`. No agregues README, licencia ni `.gitignore` desde GitHub.

## 2. Publicar desde PowerShell

Descomprime el proyecto, abre PowerShell dentro de su carpeta y ejecuta:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File ".\PUBLICAR-GITHUB.ps1"
```

Cuando pregunte por la URL pega, por ejemplo:

```text
https://github.com/TU-USUARIO/El-Refugio-de-Mimi.git
```

## 3. Desplegar el backend

Sigue [docs/CONFIGURAR-BACKEND.md](docs/CONFIGURAR-BACKEND.md). El backend no puede ejecutarse en GitHub Pages.

## 4. Configurar la URL del backend

En GitHub abre:

```text
Settings → Secrets and variables → Actions → Variables → New repository variable
```

Crea:

```text
Name: VITE_API_URL
Value: https://TU-BACKEND.onrender.com
```

## 5. Activar Pages

```text
Settings → Pages → Source: GitHub Actions
```

Después abre **Actions** y espera que `Publicar El Refugio de Mimi` quede verde.

Tu enlace será similar a:

```text
https://TU-USUARIO.github.io/El-Refugio-de-Mimi/
```

# Backend seguro en Render

GitHub Pages aloja solo archivos estáticos. La clave de OpenAI y la contraseña deben permanecer en un servidor.

## Opción recomendada: Render

1. Entra en Render y conecta tu cuenta de GitHub.
2. Crea **New → Web Service**.
3. Selecciona el repositorio `El-Refugio-de-Mimi`.
4. Configura:

```text
Root Directory: backend
Build Command: npm install --no-audit --no-fund
Start Command: npm start
Health Check Path: /api/health
```

5. Añade estas variables:

```text
APP_USERNAME=Lourdes
APP_PASSWORD_HASH=<hash generado>
JWT_SECRET=<secreto largo aleatorio>
OPENAI_API_KEY=<clave creada en OpenAI Platform>
OPENAI_MODEL=gpt-5-mini
FRONTEND_ORIGIN=https://TU-USUARIO.github.io
NODE_ENV=production
```

No coloques comillas alrededor de los valores.

## Crear el hash de la contraseña

En la carpeta del proyecto:

```powershell
npm.cmd install
npm.cmd run hash-password --workspace backend -- "TU-CONTRASEÑA-PRIVADA"
```

Copia el resultado completo como `APP_PASSWORD_HASH`.

## CORS

`FRONTEND_ORIGIN` usa únicamente el origen, sin ruta del repositorio:

```text
Correcto: https://gustavotm22.github.io
Incorrecto: https://gustavotm22.github.io/El-Refugio-de-Mimi/
```

Para permitir local y producción separados por coma:

```text
http://localhost:5173,https://gustavotm22.github.io
```

## Conectar GitHub Pages

Guarda la URL pública de Render como variable `VITE_API_URL` en GitHub Actions o escríbela desde **Configurar servidor** en la pantalla inicial.

## Proteger la clave

- Nunca pegues `OPENAI_API_KEY` en React.
- Nunca la guardes en `frontend/.env`.
- Nunca subas `backend/.env`.
- Si una clave aparece en GitHub, revócala inmediatamente y crea otra.

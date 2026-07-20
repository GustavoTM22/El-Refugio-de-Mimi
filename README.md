# El Refugio de Mimi 🌸

Aplicación privada creada para acompañar a Lourdes con una experiencia suave, amorosa y accesible. Incluye una compañera virtual inspirada en Mimi, respiración guiada, música original, canciones locales, diario privado y acceso rápido a apoyo humano.

> Esta aplicación acompaña; no diagnostica, no modifica tratamientos y no sustituye a profesionales de salud mental.

## Arquitectura

```text
El-Refugio-de-Mimi/
├── frontend/              React + Vite + PWA (GitHub Pages)
├── backend/               Node.js + Express + OpenAI API (Render)
├── .github/workflows/     publicación automática
├── docs/                  despliegue, privacidad y seguridad
├── render.yaml            configuración opcional de Render
├── CONFIGURAR-BACKEND.ps1 asistente local para crear backend/.env
└── PUBLICAR-GITHUB.ps1    publicación del repositorio
```

## Funciones

- Acceso privado con usuario y contraseña validados en el servidor.
- Sesiones temporales de 12 horas.
- Límite de intentos de acceso y mensajes.
- Chat con OpenAI Responses API y moderación previa.
- Prompt diseñado para compañía emocional sin consejos médicos.
- Detección determinista de frases de crisis aunque la IA no responda.
- Línea 113 Salud y contacto de confianza.
- Respiración 4–2–6 y ejercicio sensorial 5–4–3–2–1.
- Música ambiental original generada por Web Audio.
- Reproductor de canciones privadas del teléfono sin subir archivos.
- Diario emocional guardado únicamente en el navegador.
- Tema nocturno, texto ampliado y respeto por `prefers-reduced-motion`.
- Instalable como PWA y disponible sin conexión para las funciones locales.

## Credenciales iniciales

- Usuario: `Lourdes`
- Contraseña de ejemplo: `lula`

La contraseña se guarda como hash `scrypt` en el servidor, no en React. Cámbiala antes de compartir el enlace público.

## Inicio local

Requisitos: Node.js 20 o superior.

```powershell
npm.cmd install
powershell.exe -NoProfile -ExecutionPolicy Bypass -File ".\CONFIGURAR-BACKEND.ps1"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File ".\PROBAR-LOCAL.ps1"
```

El frontend abre normalmente en `http://localhost:5173` y el backend en `http://localhost:8787`.

## Despliegue recomendado

1. Sube todo el repositorio a GitHub con `PUBLICAR-GITHUB.ps1`.
2. Despliega `backend/` como Web Service en Render.
3. Añade en Render las variables de `backend/.env.example`.
4. En GitHub, crea la variable de repositorio `VITE_API_URL` con la URL de Render.
5. Activa **Settings → Pages → GitHub Actions**.

También puedes introducir la URL de Render desde **Configurar servidor** en la pantalla de acceso.

Lee:

- [Subir a GitHub](SUBIR-A-GITHUB.md)
- [Configurar Render y la clave](docs/CONFIGURAR-BACKEND.md)
- [Privacidad](docs/PRIVACIDAD.md)
- [Seguridad y límites](SECURITY.md)

## Clave de OpenAI

`OPENAI_API_KEY` debe existir únicamente en Render o en `backend/.env`. Nunca debe escribirse en React, `frontend/.env`, GitHub Pages ni un commit.

El backend usa `store: false` en Responses API y no mantiene una base de datos de conversaciones. El navegador conserva solo la conversación de la sesión y el diario local.

## Personalizar

- Retrato de Mimi: `frontend/src/components/MimiAvatar.jsx`
- Colores: `frontend/src/styles.css`
- Texto de acompañamiento: `backend/src/prompt.js`
- Usuario: `APP_USERNAME`
- Contraseña: genera otro hash con:

```powershell
npm.cmd run hash-password --workspace backend -- "NUEVA-CONTRASEÑA"
```

## Autoría

Proyecto privado de acompañamiento familiar. No afiliado con personajes, marcas musicales ni servicios de salud.

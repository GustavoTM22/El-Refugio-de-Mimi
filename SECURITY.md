# Seguridad

## Controles incluidos

- Contraseña con hash `scrypt` y sal aleatoria.
- Comparación de hash con tiempo constante.
- JWT con expiración.
- Rate limiting para acceso y chat.
- CORS restringido.
- Helmet y límite pequeño de JSON.
- Validación de entradas con Zod.
- Moderación de autolesión antes de generar respuestas.
- Detección local adicional de lenguaje de crisis.
- La clave de OpenAI solo se lee desde variables del servidor.

## Límites

- No es un dispositivo médico ni servicio de emergencias.
- Un repositorio público revela el código, aunque no las claves.
- La disponibilidad depende de GitHub Pages, Render y OpenAI.
- El inicio de sesión protege el backend, pero el HTML público seguirá siendo descargable.
- Cambia la contraseña `lula` antes de entregar el enlace.

## Reportar un problema

No publiques contraseñas, tokens ni datos de Lourdes en un Issue público. Revoca primero cualquier secreto expuesto.

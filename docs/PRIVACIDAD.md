# Privacidad

## Qué se guarda localmente

- Preferencias visuales.
- Contacto de confianza.
- Entradas del diario.
- URL del backend.

El chat se mantiene únicamente durante la sesión del navegador y se elimina al cerrar sesión.

## Qué se envía al backend

- Credenciales de acceso durante el inicio de sesión mediante HTTPS en producción.
- Mensajes recientes necesarios para responder con contexto.

El backend no incluye base de datos ni guarda historiales. La llamada de Responses API utiliza `store: false`. Los servicios de infraestructura y OpenAI pueden mantener registros técnicos o de prevención de abuso según sus políticas.

## Diario

El diario se guarda en `localStorage`. Quien tenga acceso desbloqueado al dispositivo podría verlo. Para información clínica sensible es preferible usar herramientas aprobadas por su profesional o proteger el dispositivo con PIN/biometría.

## Música

Las canciones elegidas desde el dispositivo se reproducen mediante URLs locales temporales y no se cargan al servidor.

# RECORRIDOS — Documentación Fase 3
## Los tres paneles: conductor, inspector y administrador

---

> ✅ Al terminar esta fase los tres roles tendrán su panel completo
> y funcional. El conductor podrá iniciar rutas, el inspector reportar
> incidencias y el administrador gestionar todo desde su panel.

---

## Qué hay en esta fase

Se han creado tres archivos que sustituyen a los placeholders anteriores:

- `pages/conductor.html` — Panel completo del conductor
- `pages/inspector.html` — Panel completo del inspector
- `pages/admin.html`    — Panel completo del administrador

---

## PASO 1 — Subir los tres archivos a GitHub

Para cada uno de los tres archivos:

1. Ve a tu repositorio: `https://github.com/TU-USUARIO/recorridos`
2. Entra en la carpeta `pages`
3. Haz clic en el archivo (por ejemplo `conductor.html`)
4. Haz clic en el lápiz ✏️ (Edit this file)
5. **Selecciona todo el texto** (Ctrl+A) y **bórralo**
6. **Pega** el contenido del nuevo archivo
7. Haz clic en **"Commit changes"**

Repite para los otros dos archivos.

---

## PASO 2 — Crear el primer recorrido de prueba

Para que el conductor vea algo al entrar, necesitas crear al menos
un recorrido desde el panel del administrador.

1. Entra en la app como administrador
2. En la pestaña **"Recorridos"**, pulsa **"+ Nuevo"**
3. Rellena:
   - **Número**: 1
   - **Nombre**: Zona Centro (o el nombre que quieras)
   - **Zona**: descripción del área
   - **Teléfono del superior**: el número a llamar en caso de avería
   - **Coordenadas vertedero**: busca el vertedero en Google Maps,
     haz clic derecho → "¿Qué hay aquí?" → copia las coordenadas
     en formato `36.1234,-5.4321`
4. Añade los contenedores uno a uno:
   - **Nº contenedor**: el identificador del contenedor (ej: C-001)
   - **Calle / dirección**: la dirección exacta
   - **Nota**: instrucciones especiales (ej: "acceso en marcha atrás",
     "giro prohibido, entrar por calle lateral")
5. Pulsa **"Guardar recorrido"**

---

## PASO 3 — Probar el panel del conductor

1. Entra como conductor (`conductor1` + su contraseña)
2. Verás el recorrido que acabas de crear
3. Pulsa en él para iniciar la ruta
4. Se abrirá Google Maps con las paradas
5. Puedes marcar contenedores como recogidos con el botón verde
6. Los botones de incidencia (Vertedero / Avería / Accidente)
   abrirán sus respectivos modales

**Comandos de voz disponibles** (di en voz alta):
- "recogido" o "siguiente" → marca el contenedor actual
- "vertedero" → abre el modal del vertedero
- "avería" → abre el modal de avería
- "accidente" → abre el modal de accidente

---

## PASO 4 — Probar el panel del inspector

1. Entra como inspector (`inspector1` + su contraseña)
2. Selecciona el recorrido a inspeccionar
3. Verás la lista de contenedores
4. Toca un contenedor:
   - Si está en orden → confirma "Sí" → se marca en verde
   - Si hay incidencia → se abre el formulario de reporte
5. En el formulario puedes:
   - Elegir el tipo de incidencia
   - Escribir una descripción
   - Hacer una foto con la cámara del móvil
6. Al enviar, la incidencia aparece en el panel del administrador

---

## PASO 5 — Probar el mapa en vivo (admin)

1. Entra como administrador
2. Abre otra ventana/dispositivo y entra como conductor
3. Inicia un recorrido desde el conductor
4. En el admin, pulsa la pestaña **"Mapa en vivo"**
5. Verás un punto verde moviéndose con la posición del conductor

**Colores en el mapa:**
- 🟢 Verde: conductor en ruta normal
- 🟡 Naranja: conductor en el vertedero
- 🔴 Rojo: avería o accidente

---

## Funcionalidades del panel administrador

### Recorridos
- Crear nuevos recorridos con todos sus contenedores en orden
- Editar recorridos existentes (se actualiza para todos los conductores)
- Borrar recorridos

### Mapa en vivo
- Ver la posición en tiempo real de todos los conductores activos
- Al tocar un punto en el mapa se ve el nombre del conductor,
  su estado y en qué contenedor va

### Incidencias
- Ver todas las incidencias reportadas por los inspectores
- Ver la foto, descripción, fecha y ubicación de cada incidencia
- Marcar incidencias como resueltas
- Enlace directo a Google Maps para cada incidencia

---

## ¿Algo ha salido mal?

**"El conductor ve 'No hay recorridos configurados'"**
→ Crea al menos un recorrido desde el panel de administrador

**"El mapa en vivo no muestra nada"**
→ El conductor debe tener la ruta activa y haber dado permiso
  de geolocalización al navegador

**"La foto de la incidencia no se sube"**
→ Las fotos se guardan como base64 directamente en Firestore.
  Si son muy grandes (>5MB) pueden fallar. Activa la cámara
  frontal o trasera con resolución estándar.

**"Los comandos de voz no funcionan"**
→ El reconocimiento de voz requiere HTTPS (ya lo tienes con
  GitHub Pages) y permiso del micrófono en el navegador.
  En algunos dispositivos Android es necesario Chrome.

---

## ¿Qué viene en la Fase 4?

Construiremos el sistema completo de informes:
- Informe de recorrido interrumpido (contenedores pendientes
  en formato descargable)
- Historial de recorridos completados
- Estadísticas por conductor y por zona

---

*Documentación RECORRIDOS v1.0 — Fase 3 de 7*

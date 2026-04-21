# RECORRIDOS — Documentación Fase 1
## Crear el repositorio en GitHub y publicar la app en internet

---

> ✅ Al terminar esta fase tendrás una URL pública real (gratis) donde
> funciona la pantalla de login de RECORRIDOS, accesible desde cualquier
> móvil o navegador.

---

## ¿Qué necesitas antes de empezar?

- Un ordenador con conexión a internet
- Una dirección de correo electrónico
- Los archivos del proyecto (te los ha dado Claude)
- Aproximadamente 15 minutos

---

## PASO 1 — Crear una cuenta en GitHub

GitHub es el servicio gratuito donde guardaremos todos los archivos
del proyecto. También es quien publica la app en internet.

1. Abre el navegador y ve a: **https://github.com**
2. Haz clic en **"Sign up"** (Registrarse)
3. Rellena:
   - **Username**: elige un nombre de usuario (por ejemplo: recorridos-app)
   - **Email**: tu dirección de correo
   - **Password**: una contraseña segura
4. Completa la verificación que te piden (puzzle o captcha)
5. Haz clic en **"Create account"**
6. GitHub te enviará un email de verificación — ábrelo y haz clic
   en el enlace que contiene para activar la cuenta

---

## PASO 2 — Crear el repositorio del proyecto

Un repositorio es la "carpeta" donde vivirán todos los archivos de la app.

1. Una vez dentro de GitHub, haz clic en el botón verde **"New"**
   que aparece a la izquierda, o ve a: **https://github.com/new**

2. Rellena el formulario:
   - **Repository name**: `recorridos` (en minúsculas, sin espacios)
   - **Description**: Gestión de rutas de recogida de residuos
   - Selecciona **Public** (esto es necesario para que GitHub Pages funcione gratis)
   - Marca la casilla **"Add a README file"**

3. Haz clic en el botón verde **"Create repository"**

4. ✅ Ya tienes tu repositorio. Verás una página con el nombre
   de tu usuario seguido de `/recorridos`

---

## PASO 3 — Subir los archivos del proyecto

Ahora subiremos los archivos que te ha dado Claude.

### 3.1 Subir el archivo principal (index.html)

1. En tu repositorio, haz clic en **"Add file"** → **"Upload files"**
2. Arrastra el archivo `index.html` a la zona de subida,
   o haz clic en "choose your files" y selecciónalo
3. En el campo **"Commit changes"** escribe: `Añadir pantalla de login`
4. Haz clic en **"Commit changes"** (botón verde)

### 3.2 Crear la carpeta "pages" y subir los paneles

GitHub no permite crear carpetas vacías directamente. Haremos esto:

1. Haz clic en **"Add file"** → **"Create new file"**
2. En el campo del nombre escribe exactamente: `pages/conductor.html`
   (al escribir la barra `/` GitHub creará la carpeta automáticamente)
3. Copia y pega el contenido del archivo `conductor.html` en el editor
4. Haz clic en **"Commit new file"**

Repite los mismos pasos para:
- `pages/inspector.html`
- `pages/admin.html`

---

## PASO 4 — Activar GitHub Pages

GitHub Pages es el servicio que convierte tu repositorio en una
página web accesible desde cualquier lugar del mundo, gratis.

1. En tu repositorio, haz clic en **"Settings"** (arriba a la derecha,
   con icono de engranaje)

2. En el menú de la izquierda, busca y haz clic en **"Pages"**

3. En la sección **"Source"**, despliega el menú y selecciona **"main"**

4. Deja la carpeta como **"/ (root)"**

5. Haz clic en **"Save"**

6. Espera 1-2 minutos. Cuando recargues la página verás un mensaje en
   verde con tu URL:
   ```
   Your site is live at: https://TU-USUARIO.github.io/recorridos/
   ```

7. ✅ ¡Ya tienes tu URL pública! Guárdala, es la que enviarás por
   WhatsApp o email a los conductores, inspectores y administradores.

---

## PASO 5 — Comprobar que todo funciona

1. Abre la URL en tu móvil o en otro navegador
2. Deberías ver la pantalla de login de RECORRIDOS con:
   - El logo del camión
   - Los campos de usuario y contraseña
   - El botón "Entrar"

3. Si intentas entrar con cualquier dato, verá un mensaje de error
   (normal, aún no hemos configurado Firebase en la Fase 2)

---

## Estructura de archivos creada

```
recorridos/
│
├── index.html          ← Pantalla de login (la página principal)
│
└── pages/
    ├── conductor.html  ← Panel del conductor (se completará en Fase 5)
    ├── inspector.html  ← Panel del inspector (se completará en Fase 3)
    └── admin.html      ← Panel del administrador (se completará en Fase 4)
```

---

## Cómo actualizar archivos en el futuro

Cuando en las siguientes fases modifiquemos archivos:

1. Ve a tu repositorio en GitHub
2. Haz clic en el archivo que quieras actualizar
3. Haz clic en el icono del lápiz (✏️) — "Edit this file"
4. Borra el contenido antiguo y pega el nuevo
5. Haz clic en **"Commit changes"**
6. En 1-2 minutos el cambio estará en la URL pública

---

## ¿Algo ha salido mal?

**"La URL no carga"**
→ Espera 5 minutos más y vuelve a intentarlo. GitHub Pages tarda
  un poco la primera vez.

**"Veo un error 404"**
→ Comprueba que el archivo se llama exactamente `index.html`
  (en minúsculas) y está en la raíz del repositorio, no dentro
  de ninguna carpeta.

**"No encuentro Settings o Pages"**
→ Asegúrate de que el repositorio es **Public** (no Private).
  Ve a Settings → General → Danger Zone → "Change visibility"

---

## ¿Qué viene en la Fase 2?

Configuraremos Firebase: la base de datos y el sistema de usuarios.
Al terminar podrás crear los usuarios de conductores, inspectores
y administradores, y el login empezará a funcionar de verdad.

---

*Documentación RECORRIDOS v1.0 — Fase 1 de 7*

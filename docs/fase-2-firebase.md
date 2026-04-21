# RECORRIDOS — Documentación Fase 2
## Configurar Firebase: base de datos, usuarios y login real

---

> ✅ Al terminar esta fase el login funcionará de verdad.
> Podrás crear conductores, inspectores y administradores,
> y cada uno será redirigido a su panel correspondiente.

---

## ¿Qué es Firebase?

Firebase es un servicio gratuito de Google que nos da:
- **Autenticación**: gestión de usuarios y contraseñas de forma segura
- **Firestore**: base de datos en la nube donde se guarda todo
- **Storage**: almacenamiento de fotos (para las incidencias del inspector)

Todo gratuito con el plan Spark para nuestro uso (~50 usuarios).

---

## PASO 1 — Crear el proyecto en Firebase

1. Ve a: **https://console.firebase.google.com**
2. Inicia sesión con tu cuenta de Google (la misma del correo Gmail)
3. Haz clic en **"Crear un proyecto"** (o "Add project")
4. **Nombre del proyecto**: escribe `recorridos-app`
5. En la siguiente pantalla, Google Analytics:
   - Puedes desactivarlo (no lo necesitamos) → toggle en OFF
6. Haz clic en **"Crear proyecto"**
7. Espera 30 segundos mientras se crea
8. Haz clic en **"Continuar"**

✅ Ya estás dentro del panel de tu proyecto Firebase.

---

## PASO 2 — Activar la Autenticación

Aquí configuramos el sistema de usuarios y contraseñas.

1. En el menú de la izquierda, haz clic en **"Authentication"**
   (o busca el icono de persona con llave)
2. Haz clic en **"Comenzar"** / "Get started"
3. En la pestaña **"Sign-in method"**, busca **"Email/Password"**
4. Haz clic en el lápiz (editar) que aparece al lado
5. Activa el primer toggle (**"Email/Password"**: ON)
6. Deja el segundo toggle (Email link) en OFF
7. Haz clic en **"Guardar"**

✅ El sistema de login ya está activado.

---

## PASO 3 — Crear la base de datos Firestore

1. En el menú de la izquierda, haz clic en **"Firestore Database"**
2. Haz clic en **"Crear base de datos"** / "Create database"
3. Elige **"Comenzar en modo de producción"**
   (lo aseguraremos correctamente en el siguiente paso)
4. En "Ubicación de Cloud Firestore", selecciona:
   **`eur3 (europe-west)`** — los datos quedarán en servidores europeos
5. Haz clic en **"Habilitar"**
6. Espera 1 minuto mientras se crea

✅ La base de datos está creada.

---

## PASO 4 — Configurar las reglas de seguridad

Las reglas controlan quién puede leer y escribir datos.
Solo los usuarios autenticados podrán acceder.

1. Dentro de Firestore, haz clic en la pestaña **"Reglas"**
2. Borra todo el texto que hay y pega exactamente esto:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Usuarios: solo pueden leer su propio perfil
    match /usuarios/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null
                   && get(/databases/$(database)/documents/usuarios/$(request.auth.uid)).data.rol == 'administrador';
    }

    // Recorridos: conductores e inspectores solo leen, admin escribe
    match /recorridos/{recorridoId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null
                   && get(/databases/$(database)/documents/usuarios/$(request.auth.uid)).data.rol == 'administrador';
    }

    // Estado de contenedores: conductor y admin escriben
    match /recorridos/{recorridoId}/contenedores/{contenedorId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }

    // Incidencias: inspector crea, admin gestiona
    match /incidencias/{incidenciaId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null
                            && get(/databases/$(database)/documents/usuarios/$(request.auth.uid)).data.rol == 'administrador';
    }

    // Localización en tiempo real del conductor
    match /localizacion/{userId} {
      allow read: if request.auth != null
                  && get(/databases/$(database)/documents/usuarios/$(request.auth.uid)).data.rol == 'administrador';
      allow write: if request.auth != null && request.auth.uid == userId;
    }

  }
}
```

3. Haz clic en **"Publicar"**

✅ La base de datos está protegida correctamente.

---

## PASO 5 — Activar Storage (para fotos de incidencias)

1. En el menú de la izquierda, haz clic en **"Storage"**
2. Haz clic en **"Comenzar"** / "Get started"
3. Acepta las reglas por defecto → haz clic en **"Siguiente"**
4. Selecciona la misma ubicación: **`eur3 (europe-west)`**
5. Haz clic en **"Listo"**

Ahora configura las reglas de Storage:
1. Haz clic en la pestaña **"Reglas"**
2. Reemplaza el contenido por:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /incidencias/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null
                   && request.resource.size < 10 * 1024 * 1024
                   && request.resource.contentType.matches('image/.*');
    }
  }
}
```

3. Haz clic en **"Publicar"**

✅ Las fotos de incidencias se podrán subir (máx. 10 MB por foto).

---

## PASO 6 — Obtener la configuración de Firebase para la app

Necesitamos unos códigos que conectan nuestra app con Firebase.

1. En el panel principal de Firebase, haz clic en el **icono de engranaje ⚙️**
   (arriba a la izquierda, junto a "Descripción general del proyecto")
2. Haz clic en **"Configuración del proyecto"**
3. Baja hasta la sección **"Tus aplicaciones"**
4. Haz clic en el icono **`</>`** (Web)
5. En "Apodo de la app" escribe: `recorridos-web`
6. **NO** marques la casilla de Firebase Hosting (usamos GitHub Pages)
7. Haz clic en **"Registrar app"**
8. Verás un bloque de código como este (con tus datos reales):

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "recorridos-app.firebaseapp.com",
  projectId: "recorridos-app",
  storageBucket: "recorridos-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

9. **COPIA ESTOS DATOS** y guárdalos en un documento de texto.
   Los necesitarás en el siguiente paso.
10. Haz clic en **"Continuar a la consola"**

---

## PASO 7 — Actualizar index.html con tu configuración

Ahora ponemos los datos de Firebase en el archivo de login.

1. Ve a tu repositorio en GitHub: `https://github.com/TU-USUARIO/recorridos`
2. Haz clic en el archivo `index.html`
3. Haz clic en el lápiz ✏️ para editar
4. Busca (Ctrl+F) el texto: `TU_API_KEY`
5. Reemplaza cada valor con tus datos reales:

```javascript
// ANTES (ejemplo):
apiKey: "TU_API_KEY",
authDomain: "TU_PROYECTO.firebaseapp.com",
projectId: "TU_PROYECTO",
storageBucket: "TU_PROYECTO.appspot.com",
messagingSenderId: "TU_SENDER_ID",
appId: "TU_APP_ID"

// DESPUÉS (con tus datos reales de Firebase):
apiKey: "AIzaSy...",
authDomain: "recorridos-app.firebaseapp.com",
projectId: "recorridos-app",
storageBucket: "recorridos-app.appspot.com",
messagingSenderId: "123456789",
appId: "1:123456789:web:abc123"
```

6. Haz clic en **"Commit changes"** → **"Commit changes"**

---

## PASO 8 — Crear los usuarios en Firebase

Aquí crearemos las cuentas de todos los usuarios del sistema.

### 8.1 Crear usuario en Authentication

1. En Firebase, ve a **Authentication** → pestaña **"Usuarios"**
2. Haz clic en **"Añadir usuario"**
3. Rellena:
   - **Email**: `admin@recorridos.app`
   - **Contraseña**: elige una contraseña segura (mínimo 8 caracteres)
4. Haz clic en **"Añadir usuario"**
5. Anota el **UID** que aparece (es una cadena larga como `abc123xyz...`)

Repite para cada conductor e inspector. Usa este formato de emails:
```
conductor1@recorridos.app
conductor2@recorridos.app
...
inspector1@recorridos.app
inspector2@recorridos.app
...
admin@recorridos.app
```

> 💡 El email no necesita ser real, es solo el identificador interno.
> El conductor solo verá "usuario" en la pantalla de login.

### 8.2 Crear el perfil en Firestore

Por cada usuario creado en el paso anterior, hay que añadir
su perfil en la base de datos:

1. Ve a **Firestore Database** → haz clic en **"+ Iniciar colección"**
2. **ID de colección**: `usuarios`
3. Haz clic en **"Siguiente"**
4. **ID del documento**: pega el **UID** del usuario (el que anotaste)
5. Añade los siguientes campos:

**Para el administrador:**
| Campo | Tipo | Valor |
|-------|------|-------|
| rol | string | administrador |
| nombre | string | (nombre real de la persona) |
| email | string | admin@recorridos.app |
| activo | boolean | true |

**Para un conductor:**
| Campo | Tipo | Valor |
|-------|------|-------|
| rol | string | conductor |
| nombre | string | (nombre real) |
| email | string | conductor1@recorridos.app |
| activo | boolean | true |

**Para un inspector:**
| Campo | Tipo | Valor |
|-------|------|-------|
| rol | string | inspector |
| nombre | string | (nombre real) |
| email | string | inspector1@recorridos.app |
| activo | boolean | true |

6. Haz clic en **"Guardar"**

Repite para cada usuario.

---

## PASO 9 — Probar el login

1. Abre tu URL de GitHub Pages:
   `https://TU-USUARIO.github.io/recorridos/`

2. En el campo **Usuario** escribe: `admin`
   (sin necesidad de poner @recorridos.app)

3. En **Contraseña** escribe la que elegiste

4. Haz clic en **Entrar**

5. ✅ Deberías ser redirigido a `pages/admin.html`

Prueba también con un conductor y un inspector para confirmar
que la redirección por rol funciona correctamente.

---

## Estructura de la base de datos creada

```
Firestore/
│
├── usuarios/
│   ├── {uid-admin}     → { rol, nombre, email, activo }
│   ├── {uid-conductor} → { rol, nombre, email, activo }
│   └── {uid-inspector} → { rol, nombre, email, activo }
│
├── recorridos/         ← se rellenará en la Fase 4
│
├── incidencias/        ← se rellenará en la Fase 6
│
└── localizacion/       ← se rellenará en la Fase 5/6
```

---

## ¿Algo ha salido mal?

**"El login da error aunque los datos son correctos"**
→ Comprueba que en `index.html` los valores de `firebaseConfig`
  coinciden exactamente con los de la consola Firebase.
→ Asegúrate de que el usuario existe en Authentication Y
  tiene su documento en Firestore con el campo `rol`.

**"No encuentro el UID del usuario"**
→ En Firebase → Authentication → Usuarios, haz clic en
  los tres puntos (...) al lado del usuario → "Copiar UID"

**"Veo 'Firebase: Error (auth/invalid-api-key)'"**
→ El apiKey en index.html está mal copiado. Revísalo carácter
  a carácter.

---

## ¿Qué viene en la Fase 3?

Construiremos los paneles completos de los tres roles:
- **Conductor**: selector de recorrido, pantalla de ruta con voz
- **Inspector**: visor de recorridos con botón de reportar incidencia
- **Administrador**: panel de control con acceso a todo

---

*Documentación RECORRIDOS v1.0 — Fase 2 de 7*

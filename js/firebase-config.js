// ═══════════════════════════════════════════════════════════════
// firebase-config.js — Configuración central de Firebase
// RECORRIDOS v1.0
//
// INSTRUCCIONES:
// Sustituye los valores de firebaseConfig con los de tu proyecto.
// Los encuentras en: Firebase Console → ⚙️ → Configuración del proyecto
// ═══════════════════════════════════════════════════════════════

import { initializeApp }          from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut }
                                  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, serverTimestamp }
                                  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getStorage }             from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

// ─── CAMBIA ESTOS VALORES CON LOS DE TU PROYECTO FIREBASE ───
const firebaseConfig = {
  apiKey:            "TU_API_KEY",
  authDomain:        "TU_PROYECTO.firebaseapp.com",
  projectId:         "TU_PROYECTO",
  storageBucket:     "TU_PROYECTO.appspot.com",
  messagingSenderId: "TU_SENDER_ID",
  appId:             "TU_APP_ID"
};
// ─────────────────────────────────────────────────────────────

const app     = initializeApp(firebaseConfig);
const auth    = getAuth(app);
const db      = getFirestore(app);
const storage = getStorage(app);

// ─── Función: obtener datos del usuario actual ───────────────
async function obtenerUsuarioActual() {
  return new Promise((resolve, reject) => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      unsub();
      if (!user) { resolve(null); return; }
      try {
        const snap = await getDoc(doc(db, 'usuarios', user.uid));
        if (snap.exists()) {
          resolve({ uid: user.uid, email: user.email, ...snap.data() });
        } else {
          resolve({ uid: user.uid, email: user.email, rol: 'conductor' });
        }
      } catch (e) { reject(e); }
    });
  });
}

// ─── Función: cerrar sesión ──────────────────────────────────
async function cerrarSesion() {
  await signOut(auth);
  window.location.href = '../index.html';
}

// ─── Función: proteger página (redirige si no tiene el rol correcto) ─
async function protegerPagina(rolesPermitidos) {
  const usuario = await obtenerUsuarioActual();
  if (!usuario) {
    window.location.href = '../index.html';
    return null;
  }
  if (!rolesPermitidos.includes(usuario.rol)) {
    window.location.href = '../index.html';
    return null;
  }
  return usuario;
}

// ─── Función: guardar localización del conductor ─────────────
async function guardarLocalizacion(uid, lat, lng, recorridoId, indexContenedor) {
  await setDoc(doc(db, 'localizacion', uid), {
    lat, lng,
    recorridoId,
    indexContenedor,
    timestamp: serverTimestamp()
  });
}

export {
  app, auth, db, storage,
  obtenerUsuarioActual,
  cerrarSesion,
  protegerPagina,
  guardarLocalizacion,
  // re-exportar utilidades de Firestore para usar desde otros módulos
  doc, getDoc, setDoc, updateDoc, serverTimestamp
};

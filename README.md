# Ojo Super — Frontend

App móvil (Android/iOS) y web construida con Expo y React Native.

---

## Stack

- **Expo SDK 55** con `expo-dev-client` y **EAS Build**
- **React Native 0.83** / **React 19** / **TypeScript**
- **Redux Toolkit** + `redux-persist` (AsyncStorage)
- **React Navigation** (native stack + bottom tabs)
- **React Hook Form** + **Zod** para validación
- **React Native Paper** como UI kit
- **Google Sign-In** (nativo: `@react-native-google-signin/google-signin`, web: `@react-oauth/google`)

---

## Requisitos

- Node.js 22+
- npm 10+
- EAS CLI: `npm i -g eas-cli`
- Cuenta Expo autenticada: `eas login`
- Para desarrollo físico: Android 7+ con Google Play Services

---

## Setup

```bash
# 1. Instalar dependencias
npm install

# 2. Completar variables de entorno (ver sección "Variables de entorno")
#    Crear .env en la raíz

# 3. Arrancar Metro
npm start
```

Una vez corriendo Metro:

- `a` → abre Android (requiere dev build instalado, ver sección "Builds")
- `w` → abre web en el navegador
- `i` → abre iOS (no configurado actualmente)

---

## Scripts

| Script | Descripción |
|---|---|
| `npm start` | Arranca Metro bundler |
| `npm run android` | Metro + abre Android |
| `npm run ios` | Metro + abre iOS |
| `npm run web` | Metro + abre web |
| `npm run lint` | ESLint |
| `npm run lint:fix` | ESLint con autofix |
| `npm run format` | Prettier write |
| `npm run format:check` | Prettier check |
| `npm run typecheck` | TypeScript `tsc --noEmit` |

Reinicio con caché limpia: `npm start -- --clear` (necesario tras cambiar `.env` o agregar archivos `.web.tsx`).

---

## Estructura

```
src/
├── components/     Design System (atoms, molecules, organisms, templates)
├── confirm/        Provider + hook para diálogos de confirmación
├── const/          Constantes de la app
├── devTools/       FAB de design system (solo dev)
├── helpers/        env, api, paperTheme, navTheme, webScrollbar
├── hooks/          Custom hooks (ej. useAppFonts)
├── interface/      Tipos TypeScript globales (auth, components, router, etc.)
├── layout/         Layouts compartidos (public, private, safeLayout)
├── router/         Navegación (RootNavigator + public/private navigators)
├── screen/
│   ├── (public)/   Pantallas sin auth (login)
│   ├── (private)/  Pantallas con auth (dashboard, profile, settings)
│   └── designSystem/  Showcase del design system
├── service/        Servicios (Google auth, API)
├── snackbar/       Provider + hook de snackbars globales
├── store/          Redux slices + store + persist
└── theme/          ThemeProvider + useTheme (paletas + modo claro/oscuro)
```

Convenciones:

- Archivos `.web.tsx` se cargan solo en web (Metro los resuelve automático). El `.tsx` sin sufijo se carga en nativo.
- Las rutas se definen en `src/router/`; cada screen importa desde `interface` sus tipos de params.
- El design system vive en `src/components/`; todo lo visual debe componerse de sus atoms/molecules.

---

## Variables de entorno

Archivo: `.env` (no versionado). Todas las vars prefijadas con `EXPO_PUBLIC_` se embeben en el bundle cliente.

```env
# Entorno
EXPO_PUBLIC_TYPE_DEPLOY=development

# Google OAuth
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=260084845955-xxx.apps.googleusercontent.com

# API backend
EXPO_PUBLIC_API_PORT=3030
EXPO_PUBLIC_API_PREFIX=/api
EXPO_PUBLIC_API_URL_PROD=
```

Resolución de URL de la API (ver [src/helpers/api/api.ts](src/helpers/api/api.ts)):

| Entorno | URL resultante |
|---|---|
| Web dev | `http://127.0.0.1:3030/api` |
| Dispositivo físico | `http://<IP-Metro>:3030/api` (extraída automáticamente) |
| Producción | `EXPO_PUBLIC_API_URL_PROD + EXPO_PUBLIC_API_PREFIX` |

---

## Autenticación

### Flujo

```
Google → idToken → POST /api/auth/google → backend valida → { user, token } → Redux
```

### Google Sign-In

- **Móvil**: SDK nativo `@react-native-google-signin/google-signin` (requiere dev build de EAS con el plugin nativo, no Expo Go).
- **Web**: `@react-oauth/google` + `GoogleOAuthProvider` envolviendo la app.
- Ambos producen un `idToken` con el mismo formato → misma petición al backend.

### Setup en Google Cloud Console

1. Crear **Web Client** (`webClientId` usado por el SDK para generar `idToken`)
2. Crear **Android Client** con package `com.rricardo.ojosuper` + SHA-1 (obtener con `eas credentials`)
3. (Opcional) Crear **iOS Client** con bundle `com.rricardo.ojosuper`
4. En el Web Client, agregar **Authorized JavaScript origins**:
   - `http://localhost:8081`
   - `http://127.0.0.1:8081`
   - URL de producción cuando aplique

### Contrato con el backend

Ver [BACKEND_AUTH.md](BACKEND_AUTH.md) para el detalle completo (request/response, verificación del `idToken`, esquema de BD, checklist de seguridad).

---

## Builds

Perfiles definidos en [eas.json](eas.json):

| Perfil | Uso |
|---|---|
| `development` | Dev client interno (APK). Permite Metro + Fast Refresh. |
| `preview` | APK interno para QA. |
| `production` | Build de tienda con auto-increment. |

Comandos:

```bash
# Build Android de desarrollo (instala en tu móvil)
eas build --profile development --platform android

# Build de producción
eas build --profile production --platform android
```

### Cuándo rebuild (no basta con Metro)

- Al instalar/quitar paquetes con código nativo
- Al tocar `plugins`, `android.*`, `ios.*`, íconos o splash en [app.json](app.json)
- Al cambiar la versión de Expo, React Native o plugins nativos

Para cambios solo JS/TS: Fast Refresh basta, no requiere rebuild.

---

## Development workflow

1. Metro corriendo en segundo plano (`npm start`)
2. Editar código → guardar → Fast Refresh en el móvil/web
3. Antes de commitear: `npm run typecheck && npm run lint`

### Tips

- Sacudir el móvil → menú de debug → **Reload** si Fast Refresh no actualiza.
- `--clear` al cambiar `.env` o agregar archivos nuevos con sufijos de plataforma.
- El dispositivo físico debe estar en la **misma red WiFi** que el PC para alcanzar Metro y el backend de dev.

---

## Identificadores de la app

- **Slug**: `ojo-super`
- **Android package**: `com.rricardo.ojosuper`
- **iOS bundle**: `com.rricardo.ojosuper`
- **EAS Project ID**: `aac93aab-2196-4c9a-a31c-2127746793b8`

---

## Documentación relacionada

- [BACKEND_AUTH.md](BACKEND_AUTH.md) — Contrato del endpoint `/auth/google` para el backend

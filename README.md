# FlorcitaNails Academy - Plataforma Educativa

Desarrollé **plataforma educativa para FlorcitaNails**, una academia enfocada en la enseñanza de técnicas de belleza de uñas, que ofrece cursos tanto en modalidad online como presencial.

## 📚 Modalidades de Cursos

### **Cursos Online**
Los cursos online están disponibles directamente en la academia virtual. Cada curso incluye:
* Videos académicos pregrabados
* Documentación complementaria
* Evaluación final teórica (formulario virtual)

El acceso a los materiales se habilita luego del pago a través de **MercadoPago**. Una vez completado y aprobado el examen, el sistema genera automáticamente un **certificado descargable** con los datos del alumno.

### **Cursos Presenciales**
En la modalidad presencial, los estudiantes también acceden a la plataforma online, donde pueden consultar documentación y material de estudio. El examen final en este caso es **práctico y se realiza de forma presencial** en la sede.

La modalidad de pago para los cursos presenciales se divide en dos etapas:
* Primer pago: inscripción vía **MercadoPago** (desde la plataforma)
* Segundo pago: al finalizar el curso, en **efectivo o transferencia bancaria**

### **Certificación**
Al completar y aprobar los exámenes correspondientes (teórico o práctico según la modalidad), el sistema permite descargar un **certificado digital personalizado**, verificable desde un enlace único.

## 🔐 Sistema de Autenticación

El sistema utiliza NextAuth.js con dos proveedores de autenticación:
* **Credenciales locales** (email/contraseña)
* **Google OAuth**

La información se almacena en PostgreSQL mediante Prisma ORM.

### **Registro de Usuarios**
**Endpoint:** `POST /api/register`

**Request:**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "contraseñaSegura123",
  "name": "Nombre Usuario"
}
```

**Proceso:**
1. Valida campos obligatorios
2. Verifica si el usuario ya existe
3. Hashea la contraseña con bcrypt
4. Crea el usuario en la base de datos

**Response exitoso (201):**
```json
{
  "id": "clp5h8z7q0000...",
  "email": "usuario@ejemplo.com",
  "name": "Nombre Usuario",
  "image": null,
  "role": "user"
}
```

**Posibles errores:**
* **400**: Faltan campos obligatorios
* **409**: Usuario ya existe
* **500**: Error interno del servidor

### **Autenticación con Credenciales**
**Configuración:**
```typescript
CredentialsProvider({
  name: "Credentials",
  credentials: {
    email: { type: "text" },
    password: { type: "password" }
  },
  authorize: async (credentials) => {
    // Lógica de validación
  }
})
```

**Proceso de login:**
1. Usuario ingresa email y contraseña
2. Sistema busca usuario por email
3. Compara contraseña hasheada con bcrypt
4. Si es válido, retorna objeto de usuario

**Errores posibles:**
* "Credenciales no proporcionadas"
* "Usuario no encontrado"
* "Contraseña incorrecta"

### **Autenticación con Google**
**Configuración:**
```typescript
GoogleProvider({
  clientId: process.env.AUTH_GOOGLE_ID,
  clientSecret: process.env.AUTH_GOOGLE_SECRET
})
```

**Flujo especial:**
Cuando un usuario registrado con credenciales inicia con Google:
1. Busca usuario existente por email
2. Si existe pero no tiene cuenta Google vinculada:
   * Crea registro en tabla `Account`
   * Vincula ambas cuentas automáticamente

### **Middleware de Protección**
**Configuración:**
```typescript
export const config = {
  matcher: [
    "/((?!login|register|api/auth|_next/static|_next/image|favicon.ico).*)",
  ]
}
```

**Rutas excluidas:**
* `/login` - Página de inicio de sesión
* `/register` - Página de registro
* `/api/auth` - Endpoints de NextAuth
* Archivos estáticos (`_next/static`, `_next/image`, `favicon.ico`)

**Comportamiento:**
1. Redirige usuarios no autenticados a `/login`
2. Mantiene la URL original en `callbackUrl`
3. Protege todas las demás rutas

## 🗄️ Modelos de Base de Datos

### **User**
```prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  password      String?
  role          String    @default("user")
  accounts      Account[]
  sessions      Session[]
  Authenticator Authenticator[]
}
```

### **Account (para OAuth)**
```prisma
model Account {
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?
  user              User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

**Relaciones clave:**
* Un `User` puede tener múltiples `Account` (para múltiples proveedores OAuth)
* Cada sesión (`Session`) está asociada a un usuario

## ⚙️ Variables de Entorno Requeridas

`.env.local`:
```ini
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"
NEXTAUTH_SECRET="your-secure-secret-for-jwt"
NEXTAUTH_URL="http://localhost:3000"
```

**Importante**: `NEXTAUTH_SECRET` debe ser una cadena segura (mínimo 32 caracteres)

## 🔄 Flujos de Autenticación

### Registro Inicial

<image src="/image/registro-inicial.png" alt="Registro Inicial" width="400"/>

### Login con Credenciales

<image src="/image/login-credenciales.png" alt="Login con Credenciales" width="400"/>

### Login con Google

<image src="/image/login-google.png" alt="Login con Google" width="400"/>

## 🚀 Instalación y Desarrollo

1. **Clonar el repositorio:**
```bash
git clone [URL_DEL_REPOSITORIO]
cd academy-florcitanails
```

2. **Instalar dependencias:**
```bash
pnpm install
```

3. **Configurar variables de entorno:**
```bash
cp .env.example .env.local
# Editar .env.local con tus credenciales
```

4. **Ejecutar migraciones de base de datos:**
```bash
npx prisma migrate dev
```

5. **Iniciar servidor de desarrollo:**
```bash
pnpm dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

## 🛠️ Tecnologías Utilizadas

- **Frontend:** Next.js 14, React, TypeScript
- **Autenticación:** NextAuth.js
- **Base de Datos:** PostgreSQL + Prisma ORM
- **Pagos:** MercadoPago API
- **Estilos:** Tailwind CSS
- **Certificados:** Generación automática de PDFs
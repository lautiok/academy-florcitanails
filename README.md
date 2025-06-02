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
# 📚 Sistema de Gestión de Cursos

FlorcitaNails Academy permite a los administradores crear y gestionar cursos de forma completa, incluyendo la creación de cursos, capítulos, carga de contenido multimedia y gestión del progreso estudiantil.

## 🎯 Características Principales

### **Tipos de Cursos**
- **Cursos Online**: Completamente virtuales con certificación automática
- **Cursos Presenciales**: Combinan material online con prácticas presenciales
- **Cursos Gratuitos**: Sin costo para el usuario
- **Cursos de Pago**: Integrados con MercadoPago

### **Niveles de Curso**
- Principiante
- Intermedio  
- Avanzado

### **Categorías Disponibles**
- Técnicas de Uñas
- Arte en Uñas
- Decoración
- Cuidado y Salud

## 🏗️ Arquitectura del Sistema

### Modelo de Base de Datos

#### **Course Model**
```prisma
model Course {
  id          String   @id @default(cuid())
  userId      String  
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  title       String   @db.Text
  slug        String   @unique @db.Text
  description String?  @db.Text
  imageUrl    String?  @db.Text
  price       String   @default("gratis")
  isPublished Boolean  @default(false)
  level       String?  @db.Text
  category    String?  @db.Text
  chapters    Chapter[]
  purchases   Purchase[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

#### **Chapter Model**
```prisma
model Chapter {
  id          String   @id @default(cuid())
  title       String
  description String?  @db.Text
  videoUrl    String?  @db.Text
  documentUrl String?  @db.Text
  position    Int
  courseId    String
  course      Course   @relation(fields: [courseId], references: [id], onDelete: Cascade)
  isfree      Boolean  @default(false)
  isPublished Boolean  @default(false)
  userProgress UserProgress[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

#### **UserProgress Model**
```prisma
model UserProgress {
  id          String   @id @default(cuid())
  userId      String
  chapterId   String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  chapter     Chapter  @relation(fields: [chapterId], references: [id], onDelete: Cascade)
  isCompleted Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@unique([userId, chapterId])
}
```

#### **Purchase Model**
```prisma
model Purchase {
  id          String   @id @default(cuid())
  userId      String
  courseId    String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  course      Course   @relation(fields: [courseId], references: [id], onDelete: Cascade)
  price       Float
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@unique([userId, courseId])
}
```

## 🔧 API Endpoints

### **Gestión de Cursos (Admin)**

#### Crear Nuevo Curso
```http
POST /api/courses/teacher
```

**Headers:**
```
Authorization: Bearer [token]
Content-Type: application/json
```

**Body:**
```json
{
  "title": "Técnicas Básicas de Manicure",
  "slug": "tecnicas-basicas-manicure"
}
```

**Response (201):**
```json
{
  "id": "clp5h8z7q0000...",
  "userId": "clp5h8z7q0001...",
  "title": "Técnicas Básicas de Manicure",
  "slug": "tecnicas-basicas-manicure",
  "description": null,
  "imageUrl": null,
  "price": "gratis",
  "isPublished": false,
  "level": null,
  "category": null,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

#### Actualizar Curso
```http
PATCH /api/courses/teacher/[slug]
```

**Body (campos opcionales):**
```json
{
  "title": "Técnicas Avanzadas de Manicure",
  "description": "Aprende las técnicas más avanzadas...",
  "imageUrl": "https://utfs.io/f/abc123.jpg",
  "price": "50000",
  "level": "intermedio",
  "category": "Técnicas de Uñas",
  "isPublished": true
}
```

#### Eliminar Curso
```http
DELETE /api/courses/teacher/[slug]
```

**Proceso de eliminación:**
1. Busca el curso por slug y verifica permisos
2. Elimina imagen asociada de UploadThing
3. Elimina curso y todos sus capítulos (cascada)
4. Retorna confirmación

### **Gestión de Capítulos**

#### Crear Capítulo
```http
POST /api/courses/teacher/[slug]/chapters
```

**Body:**
```json
{
  "title": "Introducción a las Técnicas Básicas"
}
```

**Proceso:**
1. Verifica permisos de administrador
2. Busca el curso por slug
3. Calcula la posición del nuevo capítulo
4. Crea capítulo con posición automática

**Response (201):**
```json
{
  "id": "clp5h8z7q0002...",
  "title": "Introducción a las Técnicas Básicas",
  "description": null,
  "videoUrl": null,
  "documentUrl": null,
  "position": 1,
  "courseId": "clp5h8z7q0000...",
  "isfree": false,
  "isPublished": false,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

## 🛡️ Control de Acceso

### **Roles y Permisos**

#### Administrador (`role: "admin"`)
- ✅ Crear cursos
- ✅ Editar cualquier curso
- ✅ Eliminar cursos
- ✅ Gestionar capítulos
- ✅ Publicar/despublicar contenido
- ✅ Ver estadísticas de progreso

#### Usuario Regular (`role: "user"`)
- ✅ Ver cursos publicados
- ✅ Comprar cursos
- ✅ Acceder a contenido comprado
- ✅ Marcar progreso
- ❌ Crear/editar cursos

### **Middleware de Seguridad**
```typescript
// Verificación en cada endpoint
const session = await auth();
if (!session) {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

if (session.user.role !== "admin") {
  return NextResponse.json({ error: "No tienes permisos" }, { status: 401 });
}
```

## 📤 Gestión de Archivos

### **UploadThing Integration**
- **Imágenes de curso**: Portadas y thumbnails
- **Videos**: Contenido principal de capítulos  
- **Documentos**: Material complementario (PDFs)

### **Eliminación Automática**
```typescript
// Al eliminar curso, se eliminan archivos asociados
const imageUrl = courseFind.imageUrl;
if (imageUrl) {
  const key = imageUrl.split("/").pop();
  if (key) {
    await utapi.deleteFiles(key);
  }
}
```

## 🏃‍♂️ Flujos de Trabajo

### **Creación de Curso Completo**

1. **Crear Curso Base**
   ```http
   POST /api/courses/teacher
   ```

2. **Actualizar Información**
   ```http
   PATCH /api/courses/teacher/[slug]
   ```

3. **Agregar Capítulos**
   ```http
   POST /api/courses/teacher/[slug]/chapters
   ```

4. **Subir Contenido**
   - Imágenes via UploadThing
   - Videos via UploadThing
   - Documentos via UploadThing

5. **Publicar Curso**
   ```http
   PATCH /api/courses/teacher/[slug]
   { "isPublished": true }
   ```

### **Experiencia del Estudiante**

1. **Descubrimiento**: Lista de cursos publicados
2. **Compra**: Integración con MercadoPago
3. **Acceso**: Desbloqueo de contenido
4. **Progreso**: Tracking automático
5. **Certificación**: Generación automática al completar

## 🎨 Interfaz de Administración

### **Panel de Profesor** (`/teacher`)
- Lista de cursos creados
- Botón para crear nuevo curso
- Acceso rápido a edición

### **Editor de Curso** (`/teacher/course/[slug]`)
- Formulario de información básica
- Gestión de capítulos
- Preview del curso
- Controles de publicación

### **Editor de Capítulo**
- Formulario de contenido
- Subida de archivos
- Configuración de acceso
- Preview del capítulo

## 📊 Métricas y Analytics

### **Datos del Curso**
- Número de estudiantes inscritos
- Progreso promedio de finalización
- Valoraciones y feedback
- Ingresos generados

### **Datos del Capítulo**
- Tiempo promedio de visualización
- Tasa de finalización
- Puntos de abandono

## 🔄 Estados del Curso

### **Draft (Borrador)**
- `isPublished: false`
- Solo visible para el creador
- Permite edición completa

### **Published (Publicado)**
- `isPublished: true`
- Visible para todos los usuarios
- Disponible para compra/inscripción
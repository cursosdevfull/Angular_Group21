# Backend API - CRUD de Usuarios con Autenticación JWT

API REST desarrollada con Node.js y Express para el manejo de usuarios con operaciones CRUD completas y sistema de autenticación basado en JWT.

## Características

- ✅ CRUD completo para usuarios
- ✅ Sistema de autenticación con JWT
- ✅ Access tokens y refresh tokens
- ✅ Validación de datos con Zod
- ✅ Cifrado de contraseñas con crypto
- ✅ Conexión a MySQL con mysql2
- ✅ CORS habilitado
- ✅ Manejo de excepciones
- ✅ Async/Await (sin callbacks)

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Iniciar la base de datos con Docker:
```bash
docker-compose up -d
```

3. Ejecutar el script SQL para agregar el campo refreshToken:
```sql
-- Conectarse a la base de datos y ejecutar:
ALTER TABLE `user` ADD COLUMN `refreshToken` VARCHAR(36) NULL AFTER `password`;
CREATE INDEX idx_refresh_token ON `user`(refreshToken);
```

4. Iniciar el servidor:
```bash
# Desarrollo
npm run dev

# Producción
npm start
```

## Endpoints

### Base URL
```
http://localhost:3000
```

### Usuarios

| Método | Endpoint | Descripción | Auth Requerida |
|--------|----------|-------------|----------------|
| GET | `/api/users` | Obtener todos los usuarios | No |
| GET | `/api/users/paginated?page=0` | Obtener usuarios paginados | No |
| GET | `/api/users/:id` | Obtener usuario por ID | No |
| POST | `/api/users` | Crear nuevo usuario | No |
| PUT | `/api/users/:id` | Actualizar usuario | No |
| DELETE | `/api/users/:id` | Eliminar usuario | No |

### Autenticación

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/auth/login` | Iniciar sesión |
| POST | `/api/auth/refresh-token` | Renovar access token |

### Ejemplos de uso

#### Crear usuario
```bash
POST /api/users
Content-Type: application/json

{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "123456"
}
```

#### Iniciar sesión
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "juan@example.com",
  "password": "123456"
}

# Respuesta:
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "550e8400-e29b-41d4-a716-446655440000"
  },
  "message": "Autenticación exitosa"
}
```

#### Renovar access token
```bash
POST /api/auth/refresh-token
Content-Type: application/json

{
  "refreshToken": "550e8400-e29b-41d4-a716-446655440000"
}

# Respuesta:
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "660e8400-e29b-41d4-a716-446655440111"
  },
  "message": "Tokens renovados exitosamente"
}
```

#### Obtener usuarios paginados
```bash
GET /api/users/paginated?page=0

# Respuesta:
{
  "success": true,
  "data": [
    {
      "userId": 1,
      "name": "Juan Pérez",
      "email": "juan@example.com"
    },
    {
      "userId": 2,
      "name": "María García",
      "email": "maria@example.com"
    }
    // ... hasta 15 usuarios por página
  ],
  "pagination": {
    "currentPage": 0,
    "pageSize": 15,
    "totalItems": 45,
    "totalPages": 3,
    "hasNext": true,
    "hasPrevious": false
  },
  "message": "Usuarios paginados obtenidos correctamente"
}
```

#### Usar access token en peticiones protegidas
```bash
GET /api/protected-route
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Actualizar usuario
```bash
PUT /api/users/1
Content-Type: application/json

{
  "name": "Juan Carlos Pérez",
  "email": "juancarlos@example.com"
}
```

#### Respuesta estándar
```json
{
  "success": true,
  "data": {
    "userId": 1,
    "name": "Juan Pérez",
    "email": "juan@example.com"
  },
  "message": "Usuario creado correctamente"
}
```

## Configuración de la Base de Datos

La configuración se toma automáticamente del archivo `compose.yml`:

- **Host:** localhost
- **Puerto:** 3306
- **Usuario:** admin
- **Contraseña:** admin123
- **Base de datos:** cursos_db

## Autenticación y Autorización

### Access Tokens
- **Duración:** 1 día
- **Contenido:** userId, name, email
- **Uso:** Incluir en header `Authorization: Bearer <token>`

### Refresh Tokens
- **Formato:** UUID v4
- **Almacenamiento:** Base de datos
- **Uso:** Renovar access tokens expirados

### Flujo de autenticación
1. Usuario hace login con email/password
2. API retorna accessToken y refreshToken
3. Cliente usa accessToken para peticiones autenticadas
4. Cuando accessToken expira, usar refreshToken para obtener nuevos tokens

## Validaciones

### Autenticación
- `email`: Requerido, formato de email válido
- `password`: Requerido
- `refreshToken`: Debe ser UUID v4 válido

### Crear usuario
- `name`: Requerido, máximo 100 caracteres
- `email`: Requerido, formato de email válido, máximo 100 caracteres
- `password`: Requerido, mínimo 6 caracteres, máximo 200 caracteres

### Actualizar usuario
- Todos los campos son opcionales
- Las mismas validaciones que crear usuario

## Seguridad

- Las contraseñas se cifran usando PBKDF2 con salt aleatorio
- Access tokens firmados con JWT (expiran en 1 día)
- Refresh tokens son UUID únicos almacenados en BD
- Validación de email único en la base de datos
- Validación de datos de entrada con Zod
- Manejo de errores centralizado

## Estructura del Proyecto

```
backend/
├── config/
│   └── database.js          # Configuración de base de datos
├── controllers/
│   ├── AuthController.js    # Controlador de autenticación
│   └── UserController.js    # Controlador de usuarios
├── middleware/
│   ├── authMiddleware.js    # Middleware de autenticación
│   └── errorHandler.js      # Manejo de errores
├── models/
│   └── UserModel.js         # Modelo de usuario
├── routes/
│   ├── authRoutes.js        # Rutas de autenticación
│   └── userRoutes.js        # Rutas de usuarios
├── sql/
│   └── add_refresh_token.sql # Script para agregar refreshToken
├── utils/
│   ├── crypto.js            # Utilidades de cifrado
│   └── jwt.js               # Utilidades JWT
├── validators/
│   ├── authValidator.js     # Esquemas de validación auth
│   └── userValidator.js     # Esquemas de validación user
├── index.js                 # Servidor principal
├── package.json
└── compose.yml              # Docker Compose para MySQL
```

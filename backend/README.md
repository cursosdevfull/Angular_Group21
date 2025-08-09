# Courses Management API con WebSocket

API RESTful para gestión de usuarios, cursos y horarios con datos en tiempo real de patentes por países vía WebSocket.

## 🚀 Características

- ✅ Autenticación con JWT (Access Token + Refresh Token)
- ✅ CRUD completo para Usuarios, Cursos y Horarios
- ✅ **WebSocket con Socket.IO para datos en tiempo real**
- ✅ **Datos de patentes por países actualizados cada 5 segundos**
- ✅ Validación de datos con Zod
- ✅ Paginación en todas las consultas
- ✅ Relaciones entre entidades (Course -> Schedule)
- ✅ Documentación completa con Swagger
- ✅ Middleware de autenticación y manejo de errores
- ✅ Demo interactiva con gráficos en tiempo real

## 📋 Requisitos Previos

- Node.js >= 14.x
- MySQL >= 8.0
- npm o yarn

## 🛠️ Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/cursosdevfull/Angular_Group21.git
cd Angular_Group21/backend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar base de datos**
   - Crear una base de datos MySQL
   - Ejecutar los scripts SQL en el directorio `sql/`:
     - `create_course_schedule_tables.sql`
     - `insert_sample_data.sql`

4. **Configurar variables de entorno**
   - Configurar la conexión a la base de datos en `config/database.js`

5. **Iniciar el servidor**
```bash
npm start
```

## 📚 Documentación

### Swagger UI
Una vez que el servidor esté ejecutándose, puedes acceder a la documentación interactiva de la API en:

**🔗 http://localhost:3000/api-docs**

### Demo WebSocket
Prueba la funcionalidad de WebSocket en tiempo real:

**🔗 http://localhost:3000/public/socket-demo.html**

## 🌐 WebSocket - Datos de Patentes en Tiempo Real

### Características del WebSocket:
- **📊 Datos cada 5 segundos**: Información de patentes actualizada automáticamente
- **🌍 6 países**: Estados Unidos, China, Japón, Alemania, Corea del Sur, Reino Unido
- **📈 Rango de valores**: Entre 100 y 300 patentes por país
- **📱 Datos en tiempo real**: Perfecto para gráficos dinámicos en Angular

### Eventos WebSocket Disponibles:

#### 📥 Eventos que el servidor envía:
- `patent-data` - Datos de patentes por países
- `global-stats` - Estadísticas globales 
- `connection-info` - Información de conexión
- `countries-list` - Lista de países disponibles
- `error` - Mensajes de error

#### 📤 Eventos que el cliente puede enviar:
- `request-update` - Solicitar actualización manual
- `get-countries` - Obtener lista de países
- `get-global-stats` - Obtener estadísticas globales
- `join-room` - Unirse a una sala específica

### Estructura de Datos:

#### Datos de Patentes (`patent-data`):
```json
{
  "type": "update",
  "data": [
    {
      "country": "US",
      "countryName": "Estados Unidos", 
      "flag": "🇺🇸",
      "patents": 245,
      "timestamp": "2025-08-09T10:30:00.000Z",
      "trend": "up",
      "category": "Tecnología"
    }
  ],
  "timestamp": "2025-08-09T10:30:00.000Z"
}
```

#### Estadísticas Globales (`global-stats`):
```json
{
  "type": "update",
  "stats": {
    "totalPatents": 1285,
    "averagePatents": 214,
    "topCountry": {
      "country": "US",
      "countryName": "Estados Unidos",
      "flag": "🇺🇸", 
      "patents": 275
    },
    "updateTime": "2025-08-09T10:30:00.000Z",
    "activeCountries": 6
  },
  "timestamp": "2025-08-09T10:30:00.000Z"
}
```

## 📡 Endpoints API

### 🔐 Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/refresh-token` - Renovar token de acceso

### 👥 Usuarios
- `GET /api/users` - Obtener todos los usuarios
- `GET /api/users/paginated` - Obtener usuarios paginados
- `GET /api/users/:id` - Obtener usuario por ID
- `POST /api/users` - Crear nuevo usuario
- `PUT /api/users/:id` - Actualizar usuario
- `DELETE /api/users/:id` - Eliminar usuario

### 📚 Cursos
- `GET /api/courses` - Obtener todos los cursos
- `GET /api/courses/paginated` - Obtener cursos paginados
- `GET /api/courses/:id` - Obtener curso por ID
- `POST /api/courses` - Crear nuevo curso
- `PUT /api/courses/:id` - Actualizar curso
- `DELETE /api/courses/:id` - Eliminar curso

### 📅 Horarios
- `GET /api/schedules` - Obtener todos los horarios
- `GET /api/schedules/paginated` - Obtener horarios paginados
- `GET /api/schedules/course/:courseId` - Obtener horarios por curso
- `GET /api/schedules/:id` - Obtener horario por ID
- `POST /api/schedules` - Crear nuevo horario
- `PUT /api/schedules/:id` - Actualizar horario
- `DELETE /api/schedules/:id` - Eliminar horario

### 🔌 WebSocket
- `GET /api/socket/stats` - Estadísticas del servidor Socket.IO
- `GET /api/socket/test-data` - Datos de prueba sin WebSocket

## 🔑 Autenticación

La API utiliza JWT (JSON Web Tokens) para la autenticación:

1. **Login**: Envía credenciales a `/api/auth/login`
2. **Recibe tokens**: Access token (15 min) y Refresh token (7 días)
3. **Usar Access Token**: Incluye en el header: `Authorization: Bearer <access_token>`
4. **Renovar token**: Cuando expire, usa `/api/auth/refresh-token`

## 💻 Implementación en Angular

### 1. Instalar Socket.IO Client
```bash
npm install socket.io-client
npm install @types/socket.io-client --save-dev
```

### 2. Servicio Angular para WebSocket
```typescript
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatentDataService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000');
  }

  // Escuchar datos de patentes
  getPatentData(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('patent-data', data => observer.next(data));
    });
  }

  // Escuchar estadísticas globales  
  getGlobalStats(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('global-stats', data => observer.next(data));
    });
  }

  // Solicitar actualización manual
  requestUpdate(): void {
    this.socket.emit('request-update');
  }

  // Desconectar
  disconnect(): void {
    this.socket.disconnect();
  }
}
```

### 3. Componente con Gráfico (Chart.js)
```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { PatentDataService } from './patent-data.service';

@Component({
  selector: 'app-patent-chart',
  template: `
    <div>
      <canvas #chartCanvas></canvas>
    </div>
  `
})
export class PatentChartComponent implements OnInit, OnDestroy {
  chart: Chart | null = null;

  constructor(private patentService: PatentDataService) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.initChart();
    this.subscribeToData();
  }

  initChart() {
    const ctx = document.getElementById('chartCanvas') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          label: 'Patentes por País',
          data: [],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40']
        }]
      },
      options: {
        responsive: true,
        animation: { duration: 1000 }
      }
    });
  }

  subscribeToData() {
    this.patentService.getPatentData().subscribe(response => {
      const data = response.data;
      this.chart!.data.labels = data.map((item: any) => `${item.flag} ${item.country}`);
      this.chart!.data.datasets[0].data = data.map((item: any) => item.patents);
      this.chart!.update();
    });
  }

  ngOnDestroy() {
    this.patentService.disconnect();
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
```

## 🗄️ Estructura de la Base de Datos

### Tablas Principales

#### Users
```sql
CREATE TABLE user (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    refreshToken VARCHAR(500),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### Courses
```sql
CREATE TABLE course (
    courseId INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### Schedules
```sql
CREATE TABLE schedule (
    scheduleId INT AUTO_INCREMENT PRIMARY KEY,
    courseId INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    frequency VARCHAR(50) NOT NULL,
    duration VARCHAR(50) NOT NULL,
    resume TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (courseId) REFERENCES course(courseId) ON DELETE RESTRICT ON UPDATE CASCADE
);
```

## 🏗️ Arquitectura

```
backend/
├── config/              # Configuración (DB, Swagger)
├── controllers/         # Lógica de controladores
│   └── SocketController.js # Control de WebSocket
├── middleware/          # Middleware personalizado
├── models/              # Modelos de datos
├── routes/              # Definición de rutas
├── validators/          # Esquemas de validación Zod
├── services/            # Servicios de negocio
│   └── PatentDataService.js # Generación de datos de patentes
├── utils/               # Utilidades (crypto, JWT)
├── sql/                 # Scripts SQL
├── requests/            # Archivos HTTP para testing
├── public/              # Archivos estáticos
│   └── socket-demo.html # Demo interactiva
└── index.js            # Punto de entrada
```

## 🧪 Testing

### Archivos HTTP de ejemplo disponibles en `/requests/`:
- `auth.http` - Pruebas de autenticación
- `user.http` - Pruebas de usuarios
- `course.http` - Pruebas de cursos  
- `schedule.http` - Pruebas de horarios

### Demo Interactiva:
- **URL**: `http://localhost:3000/public/socket-demo.html`
- **Funciones**: Gráficos en tiempo real, estadísticas, controles manuales

## 🛡️ Seguridad

- 🔒 **Autenticación JWT** con tokens de corta duración
- 🔑 **Refresh Tokens** para renovación segura
- 🔐 **Contraseñas cifradas** con bcrypt
- 🛡️ **Validación estricta** de todos los inputs
- 🚫 **Protección CORS** configurada
- 🔌 **WebSocket seguro** con CORS habilitado

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

---

**📞 Soporte**: Para preguntas o soporte, contacta a support@cursosdev.com
**🔗 Demo Live**: http://localhost:3000/public/socket-demo.html
**📚 Documentación**: http://localhost:3000/api-docs

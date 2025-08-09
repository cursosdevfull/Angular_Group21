const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');
const { connectDB } = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const socketRoutes = require('./routes/socketRoutes');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');
const SocketController = require('./controllers/SocketController');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // En producción, especificar dominios permitidos
        methods: ["GET", "POST"],
        credentials: true
    }
});

const PORT = process.env.PORT || 3000;

// Inicializar controlador de sockets
const socketController = new SocketController();
socketController.initialize(io);

// Hacer disponible el controlador de sockets para las rutas HTTP
app.set('socketController', socketController);

// Middleware
app.use(cors({
    origin: '*', // En producción, especificar dominios permitidos
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use('/public', express.static('public'));

// Rutas
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'API funcionando correctamente',
        version: '1.0.0',
        endpoints: {
            users: '/api/users',
            auth: '/api/auth',
            courses: '/api/courses',
            schedules: '/api/schedules',
            socket: '/api/socket',
            documentation: '/api-docs',
            demo: '/public/socket-demo.html'
        },
        webSocket: {
            enabled: true,
            url: `ws://localhost:${PORT}`,
            events: {
                'patent-data': 'Datos de patentes por países (actualización cada 5s)',
                'global-stats': 'Estadísticas globales de patentes',
                'connection-info': 'Información de conexión del cliente',
                'countries-list': 'Lista de países disponibles',
                'request-update': 'Solicitar actualización manual de datos',
                'get-countries': 'Obtener lista de países',
                'get-global-stats': 'Obtener estadísticas globales'
            },
            description: 'WebSocket para datos en tiempo real de patentes por países'
        }
    });
});

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "Courses Management API Documentation"
}));

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/socket', socketRoutes);

// Middleware de manejo de errores
app.use(notFoundHandler);
app.use(errorHandler);

// Inicialización del servidor
const startServer = async () => {
    try {
        // Conectar a la base de datos
        await connectDB();
        console.log('Conexión a la base de datos establecida');

        // Iniciar el servidor con Socket.IO
        server.listen(PORT, () => {
            console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
            console.log(`📚 Documentación API: http://localhost:${PORT}/api-docs`);
            console.log(`🔌 Socket.IO habilitado para datos en tiempo real`);
            console.log(`📊 Datos de patentes enviándose cada 5 segundos`);
            console.log(`\n📡 Endpoints disponibles:`);
            console.log(`  GET    http://localhost:${PORT}/api/users`);
            console.log(`  GET    http://localhost:${PORT}/api/users/paginated?page=0`);
            console.log(`  GET    http://localhost:${PORT}/api/users/:id`);
            console.log(`  POST   http://localhost:${PORT}/api/users`);
            console.log(`  PUT    http://localhost:${PORT}/api/users/:id`);
            console.log(`  DELETE http://localhost:${PORT}/api/users/:id`);
            console.log(`  GET    http://localhost:${PORT}/api/courses`);
            console.log(`  GET    http://localhost:${PORT}/api/courses/paginated?page=0`);
            console.log(`  GET    http://localhost:${PORT}/api/courses/:id`);
            console.log(`  POST   http://localhost:${PORT}/api/courses`);
            console.log(`  PUT    http://localhost:${PORT}/api/courses/:id`);
            console.log(`  DELETE http://localhost:${PORT}/api/courses/:id`);
            console.log(`  GET    http://localhost:${PORT}/api/schedules`);
            console.log(`  GET    http://localhost:${PORT}/api/schedules/paginated?page=0`);
            console.log(`  GET    http://localhost:${PORT}/api/schedules/course/:courseId`);
            console.log(`  GET    http://localhost:${PORT}/api/schedules/:id`);
            console.log(`  POST   http://localhost:${PORT}/api/schedules`);
            console.log(`  PUT    http://localhost:${PORT}/api/schedules/:id`);
            console.log(`  DELETE http://localhost:${PORT}/api/schedules/:id`);
            console.log(`  POST   http://localhost:${PORT}/api/auth/login`);
            console.log(`  POST   http://localhost:${PORT}/api/auth/refresh-token`);
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
        process.exit(1);
    }
};

// Manejo de cierre graceful
process.on('SIGINT', () => {
    console.log('\n🔄 Cerrando servidor gracefulmente...');
    socketController.stopDataBroadcast();
    console.log('🔌 Socket.IO desconectado');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n🔄 Cerrando servidor gracefulmente...');
    socketController.stopDataBroadcast();
    console.log('🔌 Socket.IO desconectado');
    process.exit(0);
});

// Manejo de excepciones no capturadas
process.on('uncaughtException', (error) => {
    console.error('Excepción no capturada:', error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Promesa rechazada no manejada en:', promise, 'razón:', reason);
    process.exit(1);
});

startServer();

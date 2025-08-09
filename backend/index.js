const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: '*', // En producción, especificar dominios permitidos
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rutas
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'API de usuarios funcionando correctamente',
        version: '1.0.0',
        endpoints: {
            users: '/api/users',
            auth: '/api/auth'
        }
    });
});

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Middleware de manejo de errores
app.use(notFoundHandler);
app.use(errorHandler);

// Inicialización del servidor
const startServer = async () => {
    try {
        // Conectar a la base de datos
        await connectDB();
        console.log('Conexión a la base de datos establecida');

        // Iniciar el servidor
        app.listen(PORT, () => {
            console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
            console.log(`Endpoints disponibles:`);
            console.log(`  GET    http://localhost:${PORT}/api/users`);
            console.log(`  GET    http://localhost:${PORT}/api/users/paginated?page=0`);
            console.log(`  GET    http://localhost:${PORT}/api/users/:id`);
            console.log(`  POST   http://localhost:${PORT}/api/users`);
            console.log(`  PUT    http://localhost:${PORT}/api/users/:id`);
            console.log(`  DELETE http://localhost:${PORT}/api/users/:id`);
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
    console.log('\nCerrando servidor...');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\nCerrando servidor...');
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

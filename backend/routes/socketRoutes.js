const express = require('express');
const SocketController = require('../controllers/SocketController');

const router = express.Router();

// Crear una instancia para acceder a las estadísticas
// Nota: En un entorno real, esto debería ser un singleton
let socketControllerInstance = null;

// Middleware para obtener la instancia del controlador de sockets
const getSocketController = (req, res, next) => {
    if (!socketControllerInstance) {
        // Si no tenemos la instancia, la obtenemos del contexto global de la app
        socketControllerInstance = req.app.get('socketController');
    }
    req.socketController = socketControllerInstance;
    next();
};

/**
 * @swagger
 * /api/socket/stats:
 *   get:
 *     summary: Obtener estadísticas del servidor Socket.IO
 *     tags: [WebSocket]
 *     responses:
 *       200:
 *         description: Estadísticas del servidor obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     connectedClients:
 *                       type: integer
 *                       description: Número de clientes conectados
 *                     broadcastActive:
 *                       type: boolean
 *                       description: Si el broadcast automático está activo
 *                     uptime:
 *                       type: number
 *                       description: Tiempo de actividad del servidor en segundos
 *                     timestamp:
 *                       type: string
 *                       format: date-time
 *                       description: Timestamp de la consulta
 *                 message:
 *                   type: string
 *                   example: "Estadísticas del servidor Socket.IO"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/stats', getSocketController, (req, res) => {
    try {
        const stats = req.socketController ?
            req.socketController.getServerStats() :
            {
                connectedClients: 0,
                broadcastActive: false,
                uptime: process.uptime(),
                timestamp: new Date().toISOString(),
                error: 'Socket controller not available'
            };

        res.status(200).json({
            success: true,
            data: stats,
            message: 'Estadísticas del servidor Socket.IO'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: null
        });
    }
});

/**
 * @swagger
 * /api/socket/test-data:
 *   get:
 *     summary: Obtener datos de prueba de patentes (sin WebSocket)
 *     tags: [WebSocket]
 *     responses:
 *       200:
 *         description: Datos de prueba obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     patentData:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           country:
 *                             type: string
 *                             example: "US"
 *                           countryName:
 *                             type: string
 *                             example: "Estados Unidos"
 *                           flag:
 *                             type: string
 *                             example: "🇺🇸"
 *                           patents:
 *                             type: integer
 *                             example: 245
 *                           timestamp:
 *                             type: string
 *                             format: date-time
 *                           trend:
 *                             type: string
 *                             enum: [up, down, stable]
 *                           category:
 *                             type: string
 *                             example: "Tecnología"
 *                     globalStats:
 *                       type: object
 *                       properties:
 *                         totalPatents:
 *                           type: integer
 *                         averagePatents:
 *                           type: integer
 *                         topCountry:
 *                           type: object
 *                         updateTime:
 *                           type: string
 *                           format: date-time
 *                         activeCountries:
 *                           type: integer
 *                 message:
 *                   type: string
 *                   example: "Datos de prueba generados"
 */
router.get('/test-data', (req, res) => {
    try {
        // Importar el servicio aquí para evitar problemas de dependencias circulares
        const PatentDataService = require('../services/PatentDataService');
        const patentService = new PatentDataService();

        const patentData = patentService.generatePatentData();
        const globalStats = patentService.generateGlobalStats();

        res.status(200).json({
            success: true,
            data: {
                patentData,
                globalStats,
                note: 'Estos son datos de prueba. Para datos en tiempo real, conectarse vía WebSocket.'
            },
            message: 'Datos de prueba generados'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: null
        });
    }
});

module.exports = router;

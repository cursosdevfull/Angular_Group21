const PatentDataService = require('../services/PatentDataService');

class SocketController {
    constructor() {
        this.patentService = new PatentDataService();
        this.updateInterval = null;
        this.connectedClients = new Set();
    }

    /**
     * Inicializa el servidor de sockets
     * @param {Object} io - Instancia de Socket.IO
     */
    initialize(io) {
        console.log('🔌 Servidor Socket.IO inicializado');

        io.on('connection', (socket) => {
            this.handleConnection(socket, io);
        });

        // Iniciar el envío automático de datos cada 5 segundos
        this.startDataBroadcast(io);
    }

    /**
     * Maneja la conexión de un nuevo cliente
     * @param {Object} socket - Socket del cliente
     * @param {Object} io - Instancia de Socket.IO
     */
    handleConnection(socket, io) {
        const clientId = socket.id;
        this.connectedClients.add(clientId);

        console.log(`📱 Cliente conectado: ${clientId} (Total: ${this.connectedClients.size})`);

        // Enviar datos iniciales al cliente recién conectado
        this.sendInitialData(socket);

        // Manejar eventos del cliente
        this.setupClientEvents(socket, io);

        // Manejar desconexión
        socket.on('disconnect', () => {
            this.handleDisconnection(clientId);
        });
    }

    /**
     * Envía datos iniciales al cliente recién conectado
     * @param {Object} socket - Socket del cliente
     */
    sendInitialData(socket) {
        try {
            const patentData = this.patentService.generatePatentData();
            const globalStats = this.patentService.generateGlobalStats();

            // Enviar datos de patentes por países
            socket.emit('patent-data', {
                type: 'initial',
                data: patentData,
                timestamp: new Date().toISOString()
            });

            // Enviar estadísticas globales
            socket.emit('global-stats', {
                type: 'initial',
                stats: globalStats,
                timestamp: new Date().toISOString()
            });

            // Enviar información de conexión
            socket.emit('connection-info', {
                clientId: socket.id,
                connectedClients: this.connectedClients.size,
                message: 'Conectado exitosamente al servidor de patentes'
            });

            console.log(`📊 Datos iniciales enviados a ${socket.id}`);
        } catch (error) {
            console.error('❌ Error enviando datos iniciales:', error);
            socket.emit('error', {
                message: 'Error al cargar datos iniciales',
                timestamp: new Date().toISOString()
            });
        }
    }

    /**
     * Configura los eventos que el cliente puede enviar
     * @param {Object} socket - Socket del cliente
     * @param {Object} io - Instancia de Socket.IO
     */
    setupClientEvents(socket, io) {
        // Evento para solicitar datos actualizados manualmente
        socket.on('request-update', () => {
            console.log(`🔄 Cliente ${socket.id} solicitó actualización manual`);
            this.sendDataUpdate(socket);
        });

        // Evento para obtener lista de países disponibles
        socket.on('get-countries', () => {
            socket.emit('countries-list', {
                countries: this.patentService.countries,
                timestamp: new Date().toISOString()
            });
        });

        // Evento para obtener estadísticas globales
        socket.on('get-global-stats', () => {
            const globalStats = this.patentService.generateGlobalStats();
            socket.emit('global-stats', {
                type: 'requested',
                stats: globalStats,
                timestamp: new Date().toISOString()
            });
        });

        // Evento para unirse a una sala específica (futuro: filtros por región)
        socket.on('join-room', (room) => {
            socket.join(room);
            console.log(`🏠 Cliente ${socket.id} se unió a la sala: ${room}`);
        });
    }

    /**
     * Maneja la desconexión de un cliente
     * @param {string} clientId - ID del cliente desconectado
     */
    handleDisconnection(clientId) {
        this.connectedClients.delete(clientId);
        console.log(`📱 Cliente desconectado: ${clientId} (Total: ${this.connectedClients.size})`);
    }

    /**
     * Inicia el broadcast automático de datos cada 5 segundos
     * @param {Object} io - Instancia de Socket.IO
     */
    startDataBroadcast(io) {
        // Limpiar interval existente si hay uno
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }

        this.updateInterval = setInterval(() => {
            if (this.connectedClients.size > 0) {
                this.broadcastDataUpdate(io);
            }
        }, 5000); // 5 segundos

        console.log('⏰ Broadcast automático iniciado (cada 5 segundos)');
    }

    /**
     * Envía datos actualizados a todos los clientes conectados
     * @param {Object} io - Instancia de Socket.IO
     */
    broadcastDataUpdate(io) {
        try {
            const patentData = this.patentService.generatePatentData();
            const globalStats = this.patentService.generateGlobalStats();

            // Broadcast a todos los clientes conectados
            io.emit('patent-data', {
                type: 'update',
                data: patentData,
                timestamp: new Date().toISOString()
            });

            io.emit('global-stats', {
                type: 'update',
                stats: globalStats,
                timestamp: new Date().toISOString()
            });

            console.log(`📊 Datos actualizados enviados a ${this.connectedClients.size} cliente(s)`);
        } catch (error) {
            console.error('❌ Error en broadcast:', error);
            io.emit('error', {
                message: 'Error al actualizar datos',
                timestamp: new Date().toISOString()
            });
        }
    }

    /**
     * Envía datos actualizados a un cliente específico
     * @param {Object} socket - Socket del cliente
     */
    sendDataUpdate(socket) {
        try {
            const patentData = this.patentService.generatePatentData();
            const globalStats = this.patentService.generateGlobalStats();

            socket.emit('patent-data', {
                type: 'manual-update',
                data: patentData,
                timestamp: new Date().toISOString()
            });

            socket.emit('global-stats', {
                type: 'manual-update',
                stats: globalStats,
                timestamp: new Date().toISOString()
            });

        } catch (error) {
            console.error('❌ Error enviando actualización manual:', error);
            socket.emit('error', {
                message: 'Error al actualizar datos',
                timestamp: new Date().toISOString()
            });
        }
    }

    /**
     * Detiene el broadcast automático
     */
    stopDataBroadcast() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
            console.log('⏰ Broadcast automático detenido');
        }
    }

    /**
     * Obtiene estadísticas del servidor de sockets
     * @returns {Object} Estadísticas del servidor
     */
    getServerStats() {
        return {
            connectedClients: this.connectedClients.size,
            broadcastActive: !!this.updateInterval,
            uptime: process.uptime(),
            timestamp: new Date().toISOString()
        };
    }
}

module.exports = SocketController;

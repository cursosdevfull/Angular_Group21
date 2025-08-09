const mysql = require('mysql2/promise');

const dbConfig = {
    host: 'localhost',
    port: 3306,
    user: 'admin',
    password: 'admin123',
    database: 'cursos_db'
};

let connection;

const connectDB = async () => {
    try {
        connection = await mysql.createConnection(dbConfig);
        console.log('Conexión a MySQL establecida correctamente');
        return connection;
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
        throw error;
    }
};

const getConnection = () => {
    if (!connection) {
        throw new Error('No hay conexión a la base de datos establecida');
    }
    return connection;
};

module.exports = {
    connectDB,
    getConnection
};

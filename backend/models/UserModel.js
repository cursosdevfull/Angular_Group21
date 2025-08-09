const { getConnection } = require('../config/database');
const { hashPassword, verifyPassword } = require('../utils/crypto');
const { generateRefreshToken } = require('../utils/jwt');

class UserModel {

    static async getAll() {
        try {
            const connection = getConnection();
            const [rows] = await connection.execute('SELECT userId, name, email FROM user ORDER BY name');
            return rows;
        } catch (error) {
            throw new Error(`Error al obtener usuarios: ${error.message}`);
        }
    }

    static async getPaginated(page = 0, pageSize = 10) {
        try {
            const connection = getConnection();
            const offset = page * pageSize;

            // Obtener el total de registros
            const [countResult] = await connection.execute('SELECT COUNT(*) as total FROM user');
            const total = countResult[0].total;

            // Calcular información de paginación
            const totalPages = Math.ceil(total / pageSize);

            console.log("pageSize", pageSize)
            console.log("offset", offset)

            // Obtener los registros paginados
            const [rows] = await connection.execute(
                `SELECT userId, name, email FROM user ORDER BY name LIMIT ${pageSize} OFFSET ${offset};`
            );

            return {
                data: rows,
                pagination: {
                    currentPage: page,
                    pageSize: pageSize,
                    totalItems: total,
                    totalPages: totalPages,
                    hasNext: page < totalPages - 1,
                    hasPrevious: page > 0
                }
            };
        } catch (error) {
            throw new Error(`Error al obtener usuarios paginados: ${error.message}`);
        }
    }

    static async getById(userId) {
        try {
            const connection = getConnection();
            const [rows] = await connection.execute(
                'SELECT userId, name, email FROM user WHERE userId = ?',
                [userId]
            );
            return rows[0] || null;
        } catch (error) {
            throw new Error(`Error al obtener usuario por ID: ${error.message}`);
        }
    }

    static async create(userData) {
        try {
            const connection = getConnection();

            // Verificar si el email ya existe
            const [existingUser] = await connection.execute(
                'SELECT userId FROM user WHERE email = ?',
                [userData.email]
            );

            if (existingUser.length > 0) {
                throw new Error('El email ya está registrado');
            }

            // Cifrar la contraseña
            const hashedPassword = await hashPassword(userData.password);

            // Generar refresh token
            const refreshToken = generateRefreshToken();

            const [result] = await connection.execute(
                'INSERT INTO user (name, email, password, refreshToken) VALUES (?, ?, ?, ?)',
                [userData.name, userData.email, hashedPassword, refreshToken]
            );

            return {
                userId: result.insertId,
                name: userData.name,
                email: userData.email
                // No retornamos refreshToken por seguridad - solo se obtiene en login
            };
        } catch (error) {
            throw new Error(`Error al crear usuario: ${error.message}`);
        }
    }

    static async update(userId, userData) {
        try {
            const connection = getConnection();

            // Verificar si el usuario existe
            const existingUser = await this.getById(userId);
            if (!existingUser) {
                throw new Error('Usuario no encontrado');
            }

            // Construir la consulta dinámicamente
            const fieldsToUpdate = [];
            const values = [];

            if (userData.name) {
                fieldsToUpdate.push('name = ?');
                values.push(userData.name);
            }

            if (userData.email) {
                // Verificar si el email ya está en uso por otro usuario
                const [emailCheck] = await connection.execute(
                    'SELECT userId FROM user WHERE email = ? AND userId != ?',
                    [userData.email, userId]
                );

                if (emailCheck.length > 0) {
                    throw new Error('El email ya está registrado por otro usuario');
                }

                fieldsToUpdate.push('email = ?');
                values.push(userData.email);
            }

            if (userData.password) {
                const hashedPassword = await hashPassword(userData.password);
                fieldsToUpdate.push('password = ?');
                values.push(hashedPassword);
            }

            if (fieldsToUpdate.length === 0) {
                throw new Error('No hay campos para actualizar');
            }

            values.push(userId);

            const query = `UPDATE user SET ${fieldsToUpdate.join(', ')} WHERE userId = ?`;
            await connection.execute(query, values);

            // Retornar el usuario actualizado
            return await this.getById(userId);
        } catch (error) {
            throw new Error(`Error al actualizar usuario: ${error.message}`);
        }
    }

    static async delete(userId) {
        try {
            const connection = getConnection();

            // Verificar si el usuario existe
            const existingUser = await this.getById(userId);
            if (!existingUser) {
                throw new Error('Usuario no encontrado');
            }

            const [result] = await connection.execute(
                'DELETE FROM user WHERE userId = ?',
                [userId]
            );

            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(`Error al eliminar usuario: ${error.message}`);
        }
    }

    // Métodos de autenticación
    static async authenticate(email, password) {
        try {
            const connection = getConnection();

            // Obtener usuario con contraseña
            const [rows] = await connection.execute(
                'SELECT userId, name, email, password, refreshToken FROM user WHERE email = ?',
                [email]
            );

            if (rows.length === 0) {
                throw new Error('Credenciales inválidas');
            }

            const user = rows[0];

            // Verificar contraseña
            const isValidPassword = await verifyPassword(password, user.password);
            if (!isValidPassword) {
                throw new Error('Credenciales inválidas');
            }

            // Retornar usuario sin contraseña
            return {
                userId: user.userId,
                name: user.name,
                email: user.email,
                refreshToken: user.refreshToken
            };
        } catch (error) {
            throw new Error(`Error en autenticación: ${error.message}`);
        }
    }

    static async findByRefreshToken(refreshToken) {
        try {
            const connection = getConnection();

            const [rows] = await connection.execute(
                'SELECT userId, name, email, refreshToken FROM user WHERE refreshToken = ?',
                [refreshToken]
            );

            return rows[0] || null;
        } catch (error) {
            throw new Error(`Error al buscar por refresh token: ${error.message}`);
        }
    }

    static async updateRefreshToken(userId, newRefreshToken) {
        try {
            const connection = getConnection();

            const [result] = await connection.execute(
                'UPDATE user SET refreshToken = ? WHERE userId = ?',
                [newRefreshToken, userId]
            );

            if (result.affectedRows === 0) {
                throw new Error('Usuario no encontrado para actualizar refresh token');
            }

            return true;
        } catch (error) {
            throw new Error(`Error al actualizar refresh token: ${error.message}`);
        }
    }
}

module.exports = UserModel;

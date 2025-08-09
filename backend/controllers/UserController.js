const UserModel = require('../models/UserModel');
const { createUserSchema, updateUserSchema, userIdSchema, pageSchema } = require('../validators/userValidator');

class UserController {

    static async getAll(req, res) {
        try {
            const users = await UserModel.getAll();
            res.status(200).json({
                success: true,
                data: users,
                message: 'Usuarios obtenidos correctamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
                data: null
            });
        }
    }

    static async getPaginated(req, res) {
        try {
            // Validar parámetros de consulta
            const validation = pageSchema.safeParse(req.query);
            if (!validation.success) {
                return res.status(400).json({
                    success: false,
                    message: 'Parámetros de paginación inválidos',
                    errors: validation.error.errors,
                    data: null
                });
            }

            const { page } = validation.data;
            const result = await UserModel.getPaginated(page);

            res.status(200).json({
                success: true,
                data: result.data,
                pagination: result.pagination,
                message: 'Usuarios paginados obtenidos correctamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
                data: null
            });
        }
    }

    static async getById(req, res) {
        try {
            // Validar parámetros
            const validation = userIdSchema.safeParse(req.params);
            if (!validation.success) {
                return res.status(400).json({
                    success: false,
                    message: 'ID de usuario inválido',
                    errors: validation.error.errors,
                    data: null
                });
            }

            const { userId } = validation.data;
            const user = await UserModel.getById(userId);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuario no encontrado',
                    data: null
                });
            }

            res.status(200).json({
                success: true,
                data: user,
                message: 'Usuario obtenido correctamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
                data: null
            });
        }
    }

    static async create(req, res) {
        try {
            // Validar datos de entrada
            const validation = createUserSchema.safeParse(req.body);
            if (!validation.success) {
                return res.status(400).json({
                    success: false,
                    message: 'Datos de entrada inválidos',
                    errors: validation.error.errors,
                    data: null
                });
            }

            const userData = validation.data;
            const newUser = await UserModel.create(userData);

            res.status(201).json({
                success: true,
                data: newUser,
                message: 'Usuario creado correctamente'
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
                data: null
            });
        }
    }

    static async update(req, res) {
        try {
            // Validar parámetros
            const paramValidation = userIdSchema.safeParse(req.params);
            if (!paramValidation.success) {
                return res.status(400).json({
                    success: false,
                    message: 'ID de usuario inválido',
                    errors: paramValidation.error.errors,
                    data: null
                });
            }

            // Validar datos de entrada
            const bodyValidation = updateUserSchema.safeParse(req.body);
            if (!bodyValidation.success) {
                return res.status(400).json({
                    success: false,
                    message: 'Datos de entrada inválidos',
                    errors: bodyValidation.error.errors,
                    data: null
                });
            }

            const { userId } = paramValidation.data;
            const userData = bodyValidation.data;

            const updatedUser = await UserModel.update(userId, userData);

            res.status(200).json({
                success: true,
                data: updatedUser,
                message: 'Usuario actualizado correctamente'
            });
        } catch (error) {
            const statusCode = error.message.includes('no encontrado') ? 404 : 400;
            res.status(statusCode).json({
                success: false,
                message: error.message,
                data: null
            });
        }
    }

    static async delete(req, res) {
        try {
            // Validar parámetros
            const validation = userIdSchema.safeParse(req.params);
            if (!validation.success) {
                return res.status(400).json({
                    success: false,
                    message: 'ID de usuario inválido',
                    errors: validation.error.errors,
                    data: null
                });
            }

            const { userId } = validation.data;
            await UserModel.delete(userId);

            res.status(200).json({
                success: true,
                data: null,
                message: 'Usuario eliminado correctamente'
            });
        } catch (error) {
            const statusCode = error.message.includes('no encontrado') ? 404 : 500;
            res.status(statusCode).json({
                success: false,
                message: error.message,
                data: null
            });
        }
    }
}

module.exports = UserController;

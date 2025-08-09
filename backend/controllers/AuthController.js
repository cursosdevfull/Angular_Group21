const UserModel = require('../models/UserModel');
const { generateAccessToken, generateRefreshToken } = require('../utils/jwt');
const { loginSchema, refreshTokenSchema } = require('../validators/authValidator');

class AuthController {

    static async login(req, res) {
        try {
            // Validar datos de entrada
            const validation = loginSchema.safeParse(req.body);
            if (!validation.success) {
                return res.status(400).json({
                    success: false,
                    message: 'Datos de entrada inválidos',
                    errors: validation.error.errors,
                    data: null
                });
            }

            const { email, password } = validation.data;

            // Autenticar usuario
            const user = await UserModel.authenticate(email, password);

            // Generar tokens
            const accessToken = generateAccessToken(user);
            const newRefreshToken = generateRefreshToken();

            // Actualizar refresh token en la base de datos
            await UserModel.updateRefreshToken(user.userId, newRefreshToken);

            res.status(200).json({
                success: true,
                data: {
                    accessToken,
                    refreshToken: newRefreshToken
                },
                message: 'Autenticación exitosa'
            });
        } catch (error) {
            const statusCode = error.message.includes('Credenciales inválidas') ? 401 : 500;
            res.status(statusCode).json({
                success: false,
                message: error.message,
                data: null
            });
        }
    }

    static async refreshToken(req, res) {
        try {
            // Validar datos de entrada
            const validation = refreshTokenSchema.safeParse(req.body);
            if (!validation.success) {
                return res.status(400).json({
                    success: false,
                    message: 'Refresh token inválido',
                    errors: validation.error.errors,
                    data: null
                });
            }

            const { refreshToken } = validation.data;

            // Buscar usuario por refresh token
            const user = await UserModel.findByRefreshToken(refreshToken);
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Refresh token inválido o expirado',
                    data: null
                });
            }

            // Generar nuevos tokens
            const newAccessToken = generateAccessToken(user);
            const newRefreshToken = generateRefreshToken();

            // Actualizar refresh token en la base de datos
            await UserModel.updateRefreshToken(user.userId, newRefreshToken);

            res.status(200).json({
                success: true,
                data: {
                    accessToken: newAccessToken,
                    refreshToken: newRefreshToken
                },
                message: 'Tokens renovados exitosamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
                data: null
            });
        }
    }
}

module.exports = AuthController;

const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const JWT_SECRET = process.env.JWT_SECRET || 'mi_clave_secreta_super_segura_2025';
const JWT_EXPIRES_IN = '1d';

const generateAccessToken = (user) => {
    try {
        const payload = {
            userId: user.userId,
            name: user.name,
            email: user.email
        };

        return jwt.sign(payload, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
            issuer: 'cursos-api',
            audience: 'cursos-client'
        });
    } catch (error) {
        throw new Error('Error al generar el access token');
    }
};

const generateRefreshToken = () => {
    try {
        return uuidv4();
    } catch (error) {
        throw new Error('Error al generar el refresh token');
    }
};

const verifyAccessToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET, {
            issuer: 'cursos-api',
            audience: 'cursos-client'
        });
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new Error('Token expirado');
        } else if (error.name === 'JsonWebTokenError') {
            throw new Error('Token inválido');
        } else {
            throw new Error('Error al verificar el token');
        }
    }
};

const extractTokenFromHeader = (authHeader) => {
    if (!authHeader) {
        throw new Error('Header de autorización no encontrado');
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        throw new Error('Formato de token inválido. Use: Bearer <token>');
    }

    return parts[1];
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    extractTokenFromHeader
};

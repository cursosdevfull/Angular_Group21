const { verifyAccessToken, extractTokenFromHeader } = require('../utils/jwt');

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = extractTokenFromHeader(authHeader);

        const decoded = verifyAccessToken(token);

        // Agregar información del usuario al request
        req.user = {
            userId: decoded.userId,
            name: decoded.name,
            email: decoded.email
        };

        next();
    } catch (error) {
        const statusCode = error.message.includes('expirado') ? 401 : 403;
        res.status(statusCode).json({
            success: false,
            message: error.message,
            data: null
        });
    }
};

const optionalAuthMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (authHeader) {
            const token = extractTokenFromHeader(authHeader);
            const decoded = verifyAccessToken(token);

            req.user = {
                userId: decoded.userId,
                name: decoded.name,
                email: decoded.email
            };
        }

        next();
    } catch (error) {
        // En el middleware opcional, si hay error simplemente continuamos sin usuario
        next();
    }
};

module.exports = {
    authMiddleware,
    optionalAuthMiddleware
};

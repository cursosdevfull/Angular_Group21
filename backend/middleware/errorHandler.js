const errorHandler = (err, req, res, next) => {
    console.error('Error capturado por el middleware:', err);

    // Error de validación de Zod
    if (err.name === 'ZodError') {
        return res.status(400).json({
            success: false,
            message: 'Error de validación',
            errors: err.errors,
            data: null
        });
    }

    // Error de sintaxis JSON
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({
            success: false,
            message: 'JSON malformado',
            data: null
        });
    }

    // Error de base de datos
    if (err.code && err.code.startsWith('ER_')) {
        return res.status(500).json({
            success: false,
            message: 'Error de base de datos',
            data: null
        });
    }

    // Error genérico
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Error interno del servidor',
        data: null
    });
};

const notFoundHandler = (req, res) => {
    res.status(404).json({
        success: false,
        message: `Ruta ${req.originalUrl} no encontrada`,
        data: null
    });
};

module.exports = {
    errorHandler,
    notFoundHandler
};

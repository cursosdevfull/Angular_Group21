const { z } = require('zod');

const loginSchema = z.object({
    email: z.string()
        .email({ message: "Formato de email inválido" })
        .max(100, { message: "El email no puede exceder 100 caracteres" }),
    password: z.string()
        .min(1, { message: "La contraseña es requerida" })
        .max(200, { message: "La contraseña no puede exceder 200 caracteres" })
});

const refreshTokenSchema = z.object({
    refreshToken: z.string()
        .uuid({ message: "El refresh token debe ser un UUID válido" })
});

module.exports = {
    loginSchema,
    refreshTokenSchema
};

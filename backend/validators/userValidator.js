const { z } = require('zod');

const createUserSchema = z.object({
    name: z.string()
        .min(1, { message: "El nombre es requerido" })
        .max(100, { message: "El nombre no puede exceder 100 caracteres" }),
    email: z.string()
        .email({ message: "Formato de email inválido" })
        .max(100, { message: "El email no puede exceder 100 caracteres" }),
    password: z.string()
        .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
        .max(200, { message: "La contraseña no puede exceder 200 caracteres" })
});

const updateUserSchema = z.object({
    name: z.string()
        .min(1, { message: "El nombre es requerido" })
        .max(100, { message: "El nombre no puede exceder 100 caracteres" })
        .optional(),
    email: z.string()
        .email({ message: "Formato de email inválido" })
        .max(100, { message: "El email no puede exceder 100 caracteres" })
        .optional(),
    password: z.string()
        .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
        .max(200, { message: "La contraseña no puede exceder 200 caracteres" })
        .optional()
});

const userIdSchema = z.object({
    userId: z.string()
        .regex(/^\d+$/, { message: "El ID debe ser un número válido" })
        .transform(val => parseInt(val))
});

const pageSchema = z.object({
    page: z.string()
        .regex(/^\d+$/, { message: "La página debe ser un número válido" })
        .transform(val => parseInt(val))
        .refine(val => val >= 0, { message: "La página debe ser mayor o igual a 0" })
        .optional()
        .default("0")
});

module.exports = {
    createUserSchema,
    updateUserSchema,
    userIdSchema,
    pageSchema
};

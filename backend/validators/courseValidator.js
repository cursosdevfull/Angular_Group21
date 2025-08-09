const { z } = require('zod');

const createCourseSchema = z.object({
    name: z.string()
        .min(1, { message: "El nombre es requerido" })
        .max(100, { message: "El nombre no puede exceder 100 caracteres" })
});

const updateCourseSchema = z.object({
    name: z.string()
        .min(1, { message: "El nombre es requerido" })
        .max(100, { message: "El nombre no puede exceder 100 caracteres" })
        .optional()
});

const courseIdSchema = z.object({
    courseId: z.string()
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
    createCourseSchema,
    updateCourseSchema,
    courseIdSchema,
    pageSchema
};

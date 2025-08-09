const { z } = require('zod');

const createScheduleSchema = z.object({
    courseId: z.number()
        .int({ message: "El ID del curso debe ser un número entero" })
        .positive({ message: "El ID del curso debe ser positivo" }),
    name: z.string()
        .min(1, { message: "El nombre es requerido" })
        .max(100, { message: "El nombre no puede exceder 100 caracteres" }),
    frequency: z.string()
        .min(1, { message: "La frecuencia es requerida" })
        .max(50, { message: "La frecuencia no puede exceder 50 caracteres" }),
    duration: z.string()
        .min(1, { message: "La duración es requerida" })
        .max(50, { message: "La duración no puede exceder 50 caracteres" }),
    resume: z.string()
        .min(1, { message: "El resumen es requerido" })
        .max(500, { message: "El resumen no puede exceder 500 caracteres" }),
    price: z.number()
        .nonnegative({ message: "El precio debe ser mayor o igual a 0" })
});

const updateScheduleSchema = z.object({
    courseId: z.number()
        .int({ message: "El ID del curso debe ser un número entero" })
        .positive({ message: "El ID del curso debe ser positivo" })
        .optional(),
    name: z.string()
        .min(1, { message: "El nombre es requerido" })
        .max(100, { message: "El nombre no puede exceder 100 caracteres" })
        .optional(),
    frequency: z.string()
        .min(1, { message: "La frecuencia es requerida" })
        .max(50, { message: "La frecuencia no puede exceder 50 caracteres" })
        .optional(),
    duration: z.string()
        .min(1, { message: "La duración es requerida" })
        .max(50, { message: "La duración no puede exceder 50 caracteres" })
        .optional(),
    resume: z.string()
        .min(1, { message: "El resumen es requerido" })
        .max(500, { message: "El resumen no puede exceder 500 caracteres" })
        .optional(),
    price: z.number()
        .nonnegative({ message: "El precio debe ser mayor o igual a 0" })
        .optional()
});

const scheduleIdSchema = z.object({
    scheduleId: z.string()
        .regex(/^\d+$/, { message: "El ID debe ser un número válido" })
        .transform(val => parseInt(val))
});

const courseIdParamSchema = z.object({
    courseId: z.string()
        .regex(/^\d+$/, { message: "El ID del curso debe ser un número válido" })
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
    createScheduleSchema,
    updateScheduleSchema,
    scheduleIdSchema,
    courseIdParamSchema,
    pageSchema
};

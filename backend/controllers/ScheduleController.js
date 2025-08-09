const ScheduleModel = require('../models/ScheduleModel');
const { createScheduleSchema, updateScheduleSchema, scheduleIdSchema, courseIdParamSchema, pageSchema } = require('../validators/scheduleValidator');

class ScheduleController {

    static async getAll(req, res) {
        try {
            const schedules = await ScheduleModel.getAll();
            res.status(200).json({
                success: true,
                data: schedules,
                message: 'Horarios obtenidos correctamente'
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
            const result = await ScheduleModel.getPaginated(page);

            res.status(200).json({
                success: true,
                data: result.data,
                pagination: result.pagination,
                message: 'Horarios paginados obtenidos correctamente'
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
            const validation = scheduleIdSchema.safeParse(req.params);
            if (!validation.success) {
                return res.status(400).json({
                    success: false,
                    message: 'ID de horario inválido',
                    errors: validation.error.errors,
                    data: null
                });
            }

            const { scheduleId } = validation.data;
            const schedule = await ScheduleModel.getById(scheduleId);

            if (!schedule) {
                return res.status(404).json({
                    success: false,
                    message: 'Horario no encontrado',
                    data: null
                });
            }

            res.status(200).json({
                success: true,
                data: schedule,
                message: 'Horario obtenido correctamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
                data: null
            });
        }
    }

    static async getByCourseId(req, res) {
        try {
            // Validar parámetros
            const validation = courseIdParamSchema.safeParse(req.params);
            if (!validation.success) {
                return res.status(400).json({
                    success: false,
                    message: 'ID de curso inválido',
                    errors: validation.error.errors,
                    data: null
                });
            }

            const { courseId } = validation.data;
            const schedules = await ScheduleModel.getByCourseId(courseId);

            res.status(200).json({
                success: true,
                data: schedules,
                message: 'Horarios del curso obtenidos correctamente'
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
            const validation = createScheduleSchema.safeParse(req.body);
            if (!validation.success) {
                return res.status(400).json({
                    success: false,
                    message: 'Datos de entrada inválidos',
                    errors: validation.error.errors,
                    data: null
                });
            }

            const scheduleData = validation.data;
            const newSchedule = await ScheduleModel.create(scheduleData);

            res.status(201).json({
                success: true,
                data: newSchedule,
                message: 'Horario creado correctamente'
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
            const paramValidation = scheduleIdSchema.safeParse(req.params);
            if (!paramValidation.success) {
                return res.status(400).json({
                    success: false,
                    message: 'ID de horario inválido',
                    errors: paramValidation.error.errors,
                    data: null
                });
            }

            // Validar datos de entrada
            const bodyValidation = updateScheduleSchema.safeParse(req.body);
            if (!bodyValidation.success) {
                return res.status(400).json({
                    success: false,
                    message: 'Datos de entrada inválidos',
                    errors: bodyValidation.error.errors,
                    data: null
                });
            }

            const { scheduleId } = paramValidation.data;
            const scheduleData = bodyValidation.data;

            const updatedSchedule = await ScheduleModel.update(scheduleId, scheduleData);

            res.status(200).json({
                success: true,
                data: updatedSchedule,
                message: 'Horario actualizado correctamente'
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
            const validation = scheduleIdSchema.safeParse(req.params);
            if (!validation.success) {
                return res.status(400).json({
                    success: false,
                    message: 'ID de horario inválido',
                    errors: validation.error.errors,
                    data: null
                });
            }

            const { scheduleId } = validation.data;
            await ScheduleModel.delete(scheduleId);

            res.status(200).json({
                success: true,
                data: null,
                message: 'Horario eliminado correctamente'
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

module.exports = ScheduleController;

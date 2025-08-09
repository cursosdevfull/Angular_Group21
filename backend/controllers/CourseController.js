const CourseModel = require('../models/CourseModel');
const { createCourseSchema, updateCourseSchema, courseIdSchema, pageSchema } = require('../validators/courseValidator');

class CourseController {

    static async getAll(req, res) {
        try {
            const courses = await CourseModel.getAll();
            res.status(200).json({
                success: true,
                data: courses,
                message: 'Cursos obtenidos correctamente'
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
            const result = await CourseModel.getPaginated(page);

            res.status(200).json({
                success: true,
                data: result.data,
                pagination: result.pagination,
                message: 'Cursos paginados obtenidos correctamente'
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
            const validation = courseIdSchema.safeParse(req.params);
            if (!validation.success) {
                return res.status(400).json({
                    success: false,
                    message: 'ID de curso inválido',
                    errors: validation.error.errors,
                    data: null
                });
            }

            const { courseId } = validation.data;
            const course = await CourseModel.getById(courseId);

            if (!course) {
                return res.status(404).json({
                    success: false,
                    message: 'Curso no encontrado',
                    data: null
                });
            }

            res.status(200).json({
                success: true,
                data: course,
                message: 'Curso obtenido correctamente'
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
            const validation = createCourseSchema.safeParse(req.body);
            if (!validation.success) {
                return res.status(400).json({
                    success: false,
                    message: 'Datos de entrada inválidos',
                    errors: validation.error.errors,
                    data: null
                });
            }

            const courseData = validation.data;
            const newCourse = await CourseModel.create(courseData);

            res.status(201).json({
                success: true,
                data: newCourse,
                message: 'Curso creado correctamente'
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
            const paramValidation = courseIdSchema.safeParse(req.params);
            if (!paramValidation.success) {
                return res.status(400).json({
                    success: false,
                    message: 'ID de curso inválido',
                    errors: paramValidation.error.errors,
                    data: null
                });
            }

            // Validar datos de entrada
            const bodyValidation = updateCourseSchema.safeParse(req.body);
            if (!bodyValidation.success) {
                return res.status(400).json({
                    success: false,
                    message: 'Datos de entrada inválidos',
                    errors: bodyValidation.error.errors,
                    data: null
                });
            }

            const { courseId } = paramValidation.data;
            const courseData = bodyValidation.data;

            const updatedCourse = await CourseModel.update(courseId, courseData);

            res.status(200).json({
                success: true,
                data: updatedCourse,
                message: 'Curso actualizado correctamente'
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
            const validation = courseIdSchema.safeParse(req.params);
            if (!validation.success) {
                return res.status(400).json({
                    success: false,
                    message: 'ID de curso inválido',
                    errors: validation.error.errors,
                    data: null
                });
            }

            const { courseId } = validation.data;
            await CourseModel.delete(courseId);

            res.status(200).json({
                success: true,
                data: null,
                message: 'Curso eliminado correctamente'
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

module.exports = CourseController;

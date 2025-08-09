const { getConnection } = require('../config/database');

class CourseModel {

    static async getAll() {
        try {
            const connection = getConnection();
            const [rows] = await connection.execute('SELECT courseId, name FROM course ORDER BY name');
            return rows;
        } catch (error) {
            throw new Error(`Error al obtener cursos: ${error.message}`);
        }
    }

    static async getPaginated(page = 0, pageSize = 10) {
        try {
            const connection = getConnection();
            const offset = page * pageSize;

            // Obtener el total de registros
            const [countResult] = await connection.execute('SELECT COUNT(*) as total FROM course');
            const total = countResult[0].total;

            // Calcular información de paginación
            const totalPages = Math.ceil(total / pageSize);

            // Obtener los registros paginados
            const [rows] = await connection.execute(
                `SELECT courseId, name FROM course ORDER BY name LIMIT ${pageSize} OFFSET ${offset};`
            );

            return {
                data: rows,
                pagination: {
                    currentPage: page,
                    pageSize: pageSize,
                    totalItems: total,
                    totalPages: totalPages,
                    hasNext: page < totalPages - 1,
                    hasPrevious: page > 0
                }
            };
        } catch (error) {
            throw new Error(`Error al obtener cursos paginados: ${error.message}`);
        }
    }

    static async getById(courseId) {
        try {
            const connection = getConnection();
            const [rows] = await connection.execute(
                'SELECT courseId, name FROM course WHERE courseId = ?',
                [courseId]
            );
            return rows[0] || null;
        } catch (error) {
            throw new Error(`Error al obtener curso por ID: ${error.message}`);
        }
    }

    static async create(courseData) {
        try {
            const connection = getConnection();

            // Verificar si el nombre ya existe
            const [existingCourse] = await connection.execute(
                'SELECT courseId FROM course WHERE name = ?',
                [courseData.name]
            );

            if (existingCourse.length > 0) {
                throw new Error('El nombre del curso ya está registrado');
            }

            const [result] = await connection.execute(
                'INSERT INTO course (name) VALUES (?)',
                [courseData.name]
            );

            return {
                courseId: result.insertId,
                name: courseData.name
            };
        } catch (error) {
            throw new Error(`Error al crear curso: ${error.message}`);
        }
    }

    static async update(courseId, courseData) {
        try {
            const connection = getConnection();

            // Verificar si el curso existe
            const existingCourse = await this.getById(courseId);
            if (!existingCourse) {
                throw new Error('Curso no encontrado');
            }

            // Construir la consulta dinámicamente
            const fieldsToUpdate = [];
            const values = [];

            if (courseData.name) {
                // Verificar si el nombre ya está en uso por otro curso
                const [nameCheck] = await connection.execute(
                    'SELECT courseId FROM course WHERE name = ? AND courseId != ?',
                    [courseData.name, courseId]
                );

                if (nameCheck.length > 0) {
                    throw new Error('El nombre del curso ya está registrado por otro curso');
                }

                fieldsToUpdate.push('name = ?');
                values.push(courseData.name);
            }

            if (fieldsToUpdate.length === 0) {
                throw new Error('No hay campos para actualizar');
            }

            values.push(courseId);

            const query = `UPDATE course SET ${fieldsToUpdate.join(', ')} WHERE courseId = ?`;
            await connection.execute(query, values);

            // Retornar el curso actualizado
            return await this.getById(courseId);
        } catch (error) {
            throw new Error(`Error al actualizar curso: ${error.message}`);
        }
    }

    static async delete(courseId) {
        try {
            const connection = getConnection();

            // Verificar si el curso existe
            const existingCourse = await this.getById(courseId);
            if (!existingCourse) {
                throw new Error('Curso no encontrado');
            }

            // Verificar si el curso tiene schedules asociados
            const [relatedSchedules] = await connection.execute(
                'SELECT COUNT(*) as count FROM schedule WHERE courseId = ?',
                [courseId]
            );

            if (relatedSchedules[0].count > 0) {
                throw new Error('No se puede eliminar el curso porque tiene horarios asociados');
            }

            const [result] = await connection.execute(
                'DELETE FROM course WHERE courseId = ?',
                [courseId]
            );

            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(`Error al eliminar curso: ${error.message}`);
        }
    }
}

module.exports = CourseModel;

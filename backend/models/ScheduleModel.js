const { getConnection } = require('../config/database');

class ScheduleModel {

    static async getAll() {
        try {
            const connection = getConnection();
            const [rows] = await connection.execute(`
                SELECT s.scheduleId, s.courseId, s.name, s.frequency, s.duration, s.resume, s.price, c.name as courseName
                FROM schedule s 
                INNER JOIN course c ON s.courseId = c.courseId 
                ORDER BY s.name
            `);
            return rows;
        } catch (error) {
            throw new Error(`Error al obtener horarios: ${error.message}`);
        }
    }

    static async getPaginated(page = 0, pageSize = 10) {
        try {
            const connection = getConnection();
            const offset = page * pageSize;

            // Obtener el total de registros
            const [countResult] = await connection.execute('SELECT COUNT(*) as total FROM schedule');
            const total = countResult[0].total;

            // Calcular información de paginación
            const totalPages = Math.ceil(total / pageSize);

            // Obtener los registros paginados
            const [rows] = await connection.execute(
                `SELECT s.scheduleId, s.courseId, s.name, s.frequency, s.duration, s.resume, s.price, c.name as courseName
                 FROM schedule s 
                 INNER JOIN course c ON s.courseId = c.courseId 
                 ORDER BY s.name 
                 LIMIT ${pageSize} OFFSET ${offset};`
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
            throw new Error(`Error al obtener horarios paginados: ${error.message}`);
        }
    }

    static async getById(scheduleId) {
        try {
            const connection = getConnection();
            const [rows] = await connection.execute(
                `SELECT s.scheduleId, s.courseId, s.name, s.frequency, s.duration, s.resume, s.price, c.name as courseName
                 FROM schedule s 
                 INNER JOIN course c ON s.courseId = c.courseId 
                 WHERE s.scheduleId = ?`,
                [scheduleId]
            );
            return rows[0] || null;
        } catch (error) {
            throw new Error(`Error al obtener horario por ID: ${error.message}`);
        }
    }

    static async getByCourseId(courseId) {
        try {
            const connection = getConnection();
            const [rows] = await connection.execute(
                `SELECT s.scheduleId, s.courseId, s.name, s.frequency, s.duration, s.resume, s.price, c.name as courseName
                 FROM schedule s 
                 INNER JOIN course c ON s.courseId = c.courseId 
                 WHERE s.courseId = ?
                 ORDER BY s.name`,
                [courseId]
            );
            return rows;
        } catch (error) {
            throw new Error(`Error al obtener horarios por curso: ${error.message}`);
        }
    }

    static async create(scheduleData) {
        try {
            const connection = getConnection();

            // Verificar si el curso existe
            const [courseExists] = await connection.execute(
                'SELECT courseId FROM course WHERE courseId = ?',
                [scheduleData.courseId]
            );

            if (courseExists.length === 0) {
                throw new Error('El curso especificado no existe');
            }

            const [result] = await connection.execute(
                'INSERT INTO schedule (courseId, name, frequency, duration, resume, price) VALUES (?, ?, ?, ?, ?, ?)',
                [scheduleData.courseId, scheduleData.name, scheduleData.frequency, scheduleData.duration, scheduleData.resume, scheduleData.price]
            );

            return await this.getById(result.insertId);
        } catch (error) {
            throw new Error(`Error al crear horario: ${error.message}`);
        }
    }

    static async update(scheduleId, scheduleData) {
        try {
            const connection = getConnection();

            // Verificar si el horario existe
            const existingSchedule = await this.getById(scheduleId);
            if (!existingSchedule) {
                throw new Error('Horario no encontrado');
            }

            // Si se está actualizando el courseId, verificar que existe
            if (scheduleData.courseId) {
                const [courseExists] = await connection.execute(
                    'SELECT courseId FROM course WHERE courseId = ?',
                    [scheduleData.courseId]
                );

                if (courseExists.length === 0) {
                    throw new Error('El curso especificado no existe');
                }
            }

            // Construir la consulta dinámicamente
            const fieldsToUpdate = [];
            const values = [];

            if (scheduleData.courseId) {
                fieldsToUpdate.push('courseId = ?');
                values.push(scheduleData.courseId);
            }

            if (scheduleData.name) {
                fieldsToUpdate.push('name = ?');
                values.push(scheduleData.name);
            }

            if (scheduleData.frequency) {
                fieldsToUpdate.push('frequency = ?');
                values.push(scheduleData.frequency);
            }

            if (scheduleData.duration) {
                fieldsToUpdate.push('duration = ?');
                values.push(scheduleData.duration);
            }

            if (scheduleData.resume) {
                fieldsToUpdate.push('resume = ?');
                values.push(scheduleData.resume);
            }

            if (scheduleData.price !== undefined) {
                fieldsToUpdate.push('price = ?');
                values.push(scheduleData.price);
            }

            if (fieldsToUpdate.length === 0) {
                throw new Error('No hay campos para actualizar');
            }

            values.push(scheduleId);

            const query = `UPDATE schedule SET ${fieldsToUpdate.join(', ')} WHERE scheduleId = ?`;
            await connection.execute(query, values);

            // Retornar el horario actualizado
            return await this.getById(scheduleId);
        } catch (error) {
            throw new Error(`Error al actualizar horario: ${error.message}`);
        }
    }

    static async delete(scheduleId) {
        try {
            const connection = getConnection();

            // Verificar si el horario existe
            const existingSchedule = await this.getById(scheduleId);
            if (!existingSchedule) {
                throw new Error('Horario no encontrado');
            }

            const [result] = await connection.execute(
                'DELETE FROM schedule WHERE scheduleId = ?',
                [scheduleId]
            );

            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(`Error al eliminar horario: ${error.message}`);
        }
    }
}

module.exports = ScheduleModel;

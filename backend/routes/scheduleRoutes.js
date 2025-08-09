const express = require('express');
const ScheduleController = require('../controllers/ScheduleController');
const { authMiddleware } = require("../middleware/authMiddleware")

const router = express.Router();

/**
 * @swagger
 * /api/schedules:
 *   get:
 *     summary: Obtener todos los horarios
 *     tags: [Schedules]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de horarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Schedule'
 *       401:
 *         description: Token de autenticación requerido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', authMiddleware, ScheduleController.getAll);

/**
 * @swagger
 * /api/schedules/paginated:
 *   get:
 *     summary: Obtener horarios paginados
 *     tags: [Schedules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *         description: Número de página (comenzando desde 0)
 *     responses:
 *       200:
 *         description: Lista paginada de horarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedResponse'
 *       400:
 *         description: Parámetros de paginación inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Token de autenticación requerido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/paginated', authMiddleware, ScheduleController.getPaginated);

/**
 * @swagger
 * /api/schedules/course/{courseId}:
 *   get:
 *     summary: Obtener horarios por curso
 *     tags: [Schedules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del curso
 *     responses:
 *       200:
 *         description: Lista de horarios del curso obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Schedule'
 *       400:
 *         description: ID de curso inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Token de autenticación requerido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/course/:courseId', authMiddleware, ScheduleController.getByCourseId);

/**
 * @swagger
 * /api/schedules/{scheduleId}:
 *   get:
 *     summary: Obtener un horario por ID
 *     tags: [Schedules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: scheduleId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del horario
 *     responses:
 *       200:
 *         description: Horario obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Schedule'
 *       400:
 *         description: ID de horario inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Horario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Token de autenticación requerido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:scheduleId', authMiddleware, ScheduleController.getById);

/**
 * @swagger
 * /api/schedules:
 *   post:
 *     summary: Crear un nuevo horario
 *     tags: [Schedules]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - courseId
 *               - name
 *               - frequency
 *               - duration
 *               - resume
 *               - price
 *             properties:
 *               courseId:
 *                 type: integer
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: "Grupo Mañana"
 *               frequency:
 *                 type: string
 *                 example: "Lunes a Viernes"
 *               duration:
 *                 type: string
 *                 example: "3 meses"
 *               resume:
 *                 type: string
 *                 example: "Curso intensivo de Angular con enfoque práctico"
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 299.99
 *     responses:
 *       201:
 *         description: Horario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Schedule'
 *       400:
 *         description: Datos de entrada inválidos o curso no existe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Token de autenticación requerido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', authMiddleware, ScheduleController.create);

/**
 * @swagger
 * /api/schedules/{scheduleId}:
 *   put:
 *     summary: Actualizar un horario
 *     tags: [Schedules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: scheduleId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del horario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseId:
 *                 type: integer
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: "Grupo Tarde"
 *               frequency:
 *                 type: string
 *                 example: "Lunes, Miércoles y Viernes"
 *               duration:
 *                 type: string
 *                 example: "4 meses"
 *               resume:
 *                 type: string
 *                 example: "Curso de Angular para profesionales"
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 349.99
 *     responses:
 *       200:
 *         description: Horario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Schedule'
 *       400:
 *         description: Datos de entrada inválidos o curso no existe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Horario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Token de autenticación requerido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:scheduleId', authMiddleware, ScheduleController.update);

/**
 * @swagger
 * /api/schedules/{scheduleId}:
 *   delete:
 *     summary: Eliminar un horario
 *     tags: [Schedules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: scheduleId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del horario
 *     responses:
 *       200:
 *         description: Horario eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: null
 *       400:
 *         description: ID de horario inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Horario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Token de autenticación requerido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:scheduleId', authMiddleware, ScheduleController.delete);

module.exports = router;

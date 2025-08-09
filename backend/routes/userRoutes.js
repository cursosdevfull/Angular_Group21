const express = require('express');
const UserController = require('../controllers/UserController');
const { authMiddleware } = require("../middleware/authMiddleware")

const router = express.Router();

// GET /api/users - Obtener todos los usuarios
router.get('/', authMiddleware, UserController.getAll);

// GET /api/users/paginated - Obtener usuarios paginados
router.get('/paginated', authMiddleware, UserController.getPaginated);

// GET /api/users/:userId - Obtener un usuario por ID
router.get('/:userId', authMiddleware, UserController.getById);

// POST /api/users - Crear un nuevo usuario
router.post('/', authMiddleware, UserController.create);

// PUT /api/users/:userId - Actualizar un usuario
router.put('/:userId', authMiddleware, UserController.update);

// DELETE /api/users/:userId - Eliminar un usuario
router.delete('/:userId', authMiddleware, UserController.delete);

module.exports = router;

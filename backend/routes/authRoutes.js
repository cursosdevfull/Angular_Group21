const express = require('express');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

// POST /api/auth/login - Iniciar sesión
router.post('/login', AuthController.login);

// POST /api/auth/refresh-token - Renovar access token
router.post('/refresh-token', AuthController.refreshToken);

module.exports = router;

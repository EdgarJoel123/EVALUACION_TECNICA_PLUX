const express = require('express');
const router = express.Router();
const PagoController = require('../controllers/pagoController');
const authMiddleware = require('../middlewares/authMiddleware');

// Crear Link de Pago
router.post('/crearLinkPago', authMiddleware, PagoController.crearLinkPago);

// Consultar estado de la transacción
router.get('/consultarEstado/:parentId', authMiddleware, PagoController.consultarEstado);

module.exports = router;

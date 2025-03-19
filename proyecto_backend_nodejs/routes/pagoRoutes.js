const express = require('express');
const router = express.Router();
const PagoController = require('../controllers/pagoController');
const authMiddleware = require('../middlewares/authMiddleware');

// Ruta para realizar un pago
router.post('/pagoPlux', PagoController.realizarPago);

module.exports = router;

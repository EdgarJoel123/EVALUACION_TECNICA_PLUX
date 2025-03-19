const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const PagoController = {
    async realizarPago(req, res) {
        const { userId, monto, descripcion } = req.body;

        try {
            // 1. Guardar pago en la base de datos
            const insertPago = `
                INSERT INTO papx_pagos (user_id, monto, descripcion, fecha_pago)
                VALUES ($1, $2, $3, NOW())
                RETURNING *;
            `;

            const result = await pool.query(insertPago, [userId, monto, descripcion]);

            // 2. (Opcional) Llamar a la API de PagoPlux o simular
            const transaccion = {
                idPago: result.rows[0].id_pagos,
                estado: "Pagado",
                mensaje: "Pago procesado exitosamente"
            };

            res.json({
                success: true,
                message: "Pago realizado con éxito",
                transaccion
            });

        } catch (error) {
            console.error('Error en realizarPago:', error);
            res.status(500).json({ success: false, message: 'Error en el servidor' });
        }
    }
};

module.exports = PagoController;

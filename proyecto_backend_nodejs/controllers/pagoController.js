const pool = require('../config/db');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid'); // Para generar parentId dummy

const PagoController = {
    // 🔹 1. Crear link de pago (con dummy)
    async crearLinkPago(req, res) {
        const {
            userId,
            monto,
            descripcion,
            montoCero,
            monto12,
            whatsapp,
            ci,
            direccion,
            nombrePago,
            emailPago,
            telefono
        } = req.body;

        try {
            // 1. Guardamos en la BD
            const insertPagoQuery = `
                INSERT INTO papx_pagos 
                (user_id, monto, descripcion, fecha_pago, monto_cero, monto_12, whatsapp, ci, direccion, nombre_pago, email_pago, telefono)
                VALUES ($1, $2, $3, NOW(), $4, $5, $6, $7, $8, $9, $10, $11)
                RETURNING *;
            `;

            const insertPagoResult = await pool.query(insertPagoQuery, [
                userId,
                monto,
                descripcion,
                montoCero,
                monto12,
                whatsapp,
                ci,
                direccion,
                nombrePago,
                emailPago,
                telefono
            ]);

            const pagoGuardado = insertPagoResult.rows[0];

            // 2. Simulamos el parentId (como si viniera de PagoPlux)
            const dummyParentId = uuidv4(); // Genera un UUID aleatorio como parentId

            // 3. Guardamos el parentId en la BD
            await pool.query(
                'UPDATE papx_pagos SET parent_id = $1 WHERE id_pagos = $2',
                [dummyParentId, pagoGuardado.id_pagos]
            );

            res.json({
                success: true,
                message: 'Pago (DUMMY) creado y link generado exitosamente',
                datosGuardados: {
                    ...pagoGuardado,
                    parent_id: dummyParentId
                },
                respuestaPagoPlux: {
                    code: 0,
                    description: 'DUMMY: Link de pago creado correctamente.',
                    detail: {
                        parentId: dummyParentId
                    },
                    status: 'succeded'
                }
            });

        } catch (error) {
            console.error('❌ Error en crearLinkPago:', error.message);

            res.status(500).json({
                success: false,
                message: 'Error al procesar el pago o generar el link',
                error: error.message
            });
        }
    },

    // 🔹 2. Consultar el estado de la transacción (con dummy)
    async consultarEstado(req, res) {
        const { parentId } = req.params;

        try {
            if (!parentId) {
                return res.status(400).json({
                    success: false,
                    message: 'parentId es requerido'
                });
            }

            // 🔸 Simulación del estado (dummy)
            const estados = ['paid', 'pending', 'failed'];
            const randomEstado = estados[Math.floor(Math.random() * estados.length)];

            const dummyEstado = {
                code: 0,
                description: `DUMMY: Estado de la transacción es ${randomEstado}`,
                detail: {
                    parentId
                },
                status: randomEstado
            };

            res.json({
                success: true,
                message: 'Consulta exitosa (DUMMY)',
                estadoTransaccion: dummyEstado
            });

        } catch (error) {
            console.error('❌ Error en consultarEstado:', error.message);
            res.status(500).json({
                success: false,
                message: 'Error al consultar estado de la transacción',
                error: error.message
            });
        }
    }
};

module.exports = PagoController;

const pool = require('../config/db');
const axios = require('axios');

const PagoController = {

    // 👉 Crear Link de Pago REAL
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
            telefono,
            parentId
        } = req.body;

        try {
            // 1️⃣ Guarda primero en tu BD (sin parent_id)
            const insertPagoQuery = `
                INSERT INTO papx_pagos 
                (user_id, monto, descripcion, fecha_pago, monto_cero, monto_12, whatsapp, ci, direccion, nombre_pago, email_pago, telefono, parent_id)
                VALUES ($1, $2, $3, NOW(), $4, $5, $6, $7, $8, $9, $10, $11, $12)
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
                telefono,
                parentId
            ]);

            const pagoGuardado = insertPagoResult.rows[0];

            // 2️⃣ Payload para PagoPlux (de acuerdo a la documentación)
            const payloadPagoPlux = {
                montoCero: montoCero,
                monto12: monto12,
                whatsapp: whatsapp,
                descripcion: descripcion,
                ci: ci,
                direccion: direccion,
                nombrePago: nombrePago,
                emailPago: emailPago,
                telefono: telefono
            };

            // 3️⃣ Autenticación con Basic Auth (usuario + clave secreta en base64)
            const idCliente = '8b1dnmmmTy2DqkSJMnZTF0zkY2';
            const claveSecreta = 'BClsmrXgdZUQOAuJv1OWAN8qsuqw0CB3SFefMvniooPXr3p4';
            const credentials = `${idCliente}:${claveSecreta}`;
            const authHeader = 'Basic ' + Buffer.from(credentials).toString('base64');

            // 4️⃣ Consumir API de PagoPlux para crear el link de pago
            const apiUrl = 'https://apipre.pagoplux.com/intv1/integrations/createTransactionWhatsappResource';

            const pagoPluxResponse = await axios.post(apiUrl, payloadPagoPlux, {
                headers: {
                    'Authorization': authHeader,
                    'Content-Type': 'application/json'
                }
            });

            const respuestaPagoPlux = pagoPluxResponse.data;
            console.log('✅ Respuesta de PagoPlux:', respuestaPagoPlux);

    
            res.json({
                success: true,
                message: 'Pago creado y link generado exitosamente',
                datosGuardados: pagoGuardado,
                respuestaPagoPlux
            });

        } catch (error) {
            console.error('❌ Error en crearLinkPago:', error.response ? error.response.data : error.message);

            res.status(500).json({
                success: false,
                message: 'Error al procesar el pago o generar el link',
                error: error.response ? error.response.data : error.message
            });
        }
    },

    // 👉 Consultar Estado de Pago REAL
    async consultarEstado(req, res) {
        const { parentId } = req.params;

        try {
            if (!parentId) {
                return res.status(400).json({
                    success: false,
                    message: 'parentId es requerido'
                });
            }

            // 1️⃣ Autenticación con Basic Auth
            const idCliente = '8b1dnmmmTy2DqkSJMnZTF0zkY2';
            const claveSecreta = 'BClsmrXgdZUQOAuJv1OWAN8qsuqw0CB3SFefMvniooPXr3p4';
            const credentials = `${idCliente}:${claveSecreta}`;
            const authHeader = 'Basic ' + Buffer.from(credentials).toString('base64');

            // 2️⃣ Consumir API de PagoPlux para consultar el estado de la transacción
            const apiUrl = `https://apipre.pagoplux.com/intv1/integrations/getTransactionByIdStateResource?idTransaction=${parentId}`;

            const estadoPagoResponse = await axios.get(apiUrl, {
                headers: {
                    'Authorization': authHeader,
                    'Content-Type': 'application/json'
                }
            });

            const dataEstado = estadoPagoResponse.data;
            console.log('✅ Estado de la transacción:', dataEstado);

            res.json({
                success: true,
                message: 'Consulta exitosa',
                estadoTransaccion: dataEstado
            });

        } catch (error) {
            console.error('❌ Error en consultarEstado:', error.response ? error.response.data : error.message);

            res.status(500).json({
                success: false,
                message: 'Error al consultar estado de la transacción',
                error: error.response ? error.response.data : error.message
            });
        }
    }
};

module.exports = PagoController;

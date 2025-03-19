const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const pool = require('./config/db'); // Conexión a PostgreSQL

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba para ver conexión
app.get('/ping', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ success: true, time: result.rows[0] });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Arrancar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor backend corriendo en puerto ${PORT}`);
});

const express = require('express');
const cors = require('cors');
const app = express();

require('dotenv').config();

// Middlewares
app.use(cors());
app.use(express.json());

// Aquí traes tus rutas
const pagoRoutes = require('./routes/pagoRoutes');
const authRoutes = require('./routes/authRoutes');

// Aquí las usas
app.use('/api/pagos', pagoRoutes);  // 👈 esto hace que /api/pagos sea la base
app.use('/api/auth', authRoutes);

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor backend corriendo en el puerto ${PORT}`);
});

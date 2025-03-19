const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
const config = require('../config/config');

const AuthController = {
    async login(req, res) {
        const { username, password } = req.body;

        try {
            const user = await UserModel.findByUsername(username);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuario no encontrado'
                });
            }

            // Verifica la contraseña
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(401).json({
                    success: false,
                    message: 'Contraseña incorrecta'
                });
            }

            // Generar el JWT con el userId
            const token = jwt.sign(
                { userId: user.id_user },  // Aquí asignaste el id del usuario
                config.jwtSecret,
                { expiresIn: '1h' }
            );

            console.log('✅ Usuario logueado:', user.username);

            // ✅ Ahora incluyes el id_user en la respuesta
            res.json({
                success: true,
                message: 'Login exitoso',
                token,
                user_id: user.id_user   // Aquí lo envías explícitamente
            });

        } catch (error) {
            console.error('❌ Error en login:', error);
            res.status(500).json({
                success: false,
                message: 'Error en el servidor'
            });
        }
    }
};

module.exports = AuthController;

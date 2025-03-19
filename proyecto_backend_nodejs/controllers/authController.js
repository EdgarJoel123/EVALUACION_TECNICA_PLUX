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
                return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
            }

            // Comparar la contraseña ingresada con el hash guardado en la base de datos
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
            }

            const token = jwt.sign({ userId: user.id_user }, config.jwtSecret, { expiresIn: '1h' });

            console.log('JWT SECRET:', config.jwtSecret);


            res.json({
                success: true,
                message: 'Login exitoso',
                token
            });

        } catch (error) {
            console.error('Error en login:', error);
            res.status(500).json({ success: false, message: 'Error en el servidor' });
        }
    }
};

module.exports = AuthController;

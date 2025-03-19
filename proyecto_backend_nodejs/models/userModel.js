const pool = require('../config/db');

const UserModel = {
    async findByUsername(username) {
        try {
            const res = await pool.query(
                'SELECT * FROM papx_users WHERE username = $1',
                [username]
            );
            return res.rows[0]; // Devuelve el usuario encontrado
        } catch (error) {
            console.error('Error en findByUsername:', error);
            throw error;
        }
    }
};

module.exports = UserModel;

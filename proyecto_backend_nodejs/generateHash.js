const bcrypt = require('bcryptjs');

async function createUser(username, plainPassword) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

    console.log(`Username: ${username}`);
    console.log(`Contraseña en hash: ${hashedPassword}`);
}

createUser('esanchez', '123joel');

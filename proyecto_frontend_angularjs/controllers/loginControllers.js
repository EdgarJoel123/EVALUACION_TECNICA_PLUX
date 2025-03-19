const loginController = {
    login: async function() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const result = await response.json();

            if (result.success) {
                alert('✅ Login exitoso');
                
                // 🔥 GUARDAMOS EN LOCALSTORAGE
                localStorage.setItem('token', result.token);
                localStorage.setItem('user_id', result.user_id);

                console.log('✅ Token guardado:', result.token);
                console.log('✅ User ID guardado:', result.user_id);

                // 🔥 REDIRIGIMOS A LA VISTA DE COMPRA
                window.location.href = 'compra.html';

            } else {
                alert(`❌ ${result.message}`);
            }

        } catch (error) {
            console.error('❌ Error en login:', error);
            alert('Error en el servidor');
        }
    }
};

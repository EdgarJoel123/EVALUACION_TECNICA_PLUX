const compraController = {
    crearLinkPago: async function() {
        // ✅ OBTENEMOS EL TOKEN DEL LOCALSTORAGE
        const token = localStorage.getItem('token');
        const user_id = localStorage.getItem('user_id');

        // 🔴 Validamos que exista
        if (!token || !user_id) {
            alert('❌ Debes iniciar sesión antes de pagar');
            window.location.href = 'index.html';
            return;
        }

        console.log('👉 Token recuperado:', token);
        console.log('👉 User ID recuperado:', user_id);

        const datos = {
            userId: user_id,
            monto: 1500,
            descripcion: 'Compra de iPhone 15 Pro Max',
            montoCero: 0,
            monto12: 1500,
            whatsapp: '+593993778542',
            ci: '1710010002',
            direccion: 'Calle Falsa 123',
            nombrePago: 'Cliente Prueba',
            emailPago: 'cliente@correo.com',
            telefono: '0999999999'
        };

        try {
            const response = await fetch('http://localhost:3000/api/pagos/crearLinkPago', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(datos)
            });

            const resultado = await response.json();

            if (resultado.success) {
                alert('✅ Link de pago creado con éxito');

                // Puedes abrir la URL si te la devuelve PagoPlux
                if (resultado.respuestaPagoPlux.detail && resultado.respuestaPagoPlux.detail.url) {
                    window.open(resultado.respuestaPagoPlux.detail.url, '_blank');
                } else {
                    alert('❗ No se recibió un link de PagoPlux');
                }

            } else {
                alert(`❌ ${resultado.message}`);
            }

        } catch (error) {
            console.error('❌ Error al crear link de pago:', error);
            alert('Error en el servidor');
        }
    }
};

var compraController = (function () {
  
  // 👉 Lógica para registrar el pago cuando se confirma la transacción
  async function registrarPago(parentId) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      alert('⚠️ No hay sesión activa. Inicia sesión primero.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/pagos/crearLinkPago', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({
          userId: userId,
          monto: parseFloat(data.PayboxBase12),                          // De data
          descripcion: data.PayboxDescription,                          // De data
          montoCero: parseFloat(data.PayboxBase0),                      // De data
          monto12: parseFloat(data.PayboxBase12),                      // De data
          whatsapp: "+593989353272",                                    // Hardcodeado, cámbialo si quieres por otro campo en data
          ci: data.PayBoxClientIdentification,                         // De data
          direccion: data.PayboxDirection,                             // De data
          nombrePago: data.PayboxSendname,                             // De data
          emailPago: data.PayboxSendmail,                              // De data
          telefono: data.PayBoxClientPhone,                            // De data
          parentId: parentId                                           // El que devuelve la transacción
        })
      });

      const result = await response.json();

      if (result.success) {
        console.log('✅ Registro de pago creado en backend:', result);
        alert('✅ Registro guardado exitosamente en la base de datos.');
      } else {
        console.error('❌ Error en el registro de pago:', result.message);
        alert('❌ Error al registrar el pago: ' + result.message);
      }
    } catch (error) {
      console.error('❌ Error al comunicarse con backend:', error);
      alert('❌ Error de comunicación con el backend.');
    }
  }

  // 👉 Exponemos las funciones públicas
  return {
    registrarPago
  };
})();

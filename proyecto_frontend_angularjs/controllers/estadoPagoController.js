var estadoPagoController = (function () {

  async function consultar(idTransaccion) {
    const resultadoDiv = document.getElementById('consultaResultado');

    const token = localStorage.getItem('token');
    if (!token) {
      alert('⚠️ No hay sesión activa. Inicia sesión primero.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/pagos/consultarEstado/${idTransaccion}`, {
        method: 'GET',
        headers: {
          'Authorization': token
        }
      });

      const result = await response.json();

      if (!result.success) {
        resultadoDiv.innerHTML = `<p style="color:red;"> Error: ${result.message}</p>`;
        console.error(result);
        return;
      }

      const data = result.estadoTransaccion.detail.respuest;

      resultadoDiv.innerHTML = `
        <h3>Estado de la Transacción</h3>
        <p><strong>ID Transacción:</strong> ${data.id_transaccion}</p>
        <p><strong>Descripción:</strong> ${data.descripcion}</p>
        <p><strong>Estado:</strong> ${data.catalogos.nombre_catalogo} (${data.valor_catalogo_estado})</p>
        <p><strong>Monto:</strong> ${data.monto}</p>
        <p><strong>Cliente:</strong> ${data.cliente.nombres} (${data.cliente.numero_identificacion})</p>
        <p><strong>Banco:</strong> ${data.banco}</p>
        <p><strong>Emisor Tarjeta:</strong> ${data.emisor_tarjeta}</p>
        <p><strong>Número Tarjeta:</strong> ${data.detalle.numero_tarjeta}</p>
        <p><strong>Voucher:</strong> ${data.voucher}</p>
        <p><strong>Adquiriente:</strong> ${data.adquiriente}</p>
        <p><strong>Fecha Transacción:</strong> ${new Date(data.fecha_transaccion).toLocaleString()}</p>
      `;

      console.log('✅ Resultado completo:', data);

    } catch (error) {
      console.error(' Error al consultar el estado de pago:', error);
      resultadoDiv.innerHTML = `<p style="color:red;"> Error de comunicación con el servidor.</p>`;
    }
  }

  return {
    consultar
  };

})();

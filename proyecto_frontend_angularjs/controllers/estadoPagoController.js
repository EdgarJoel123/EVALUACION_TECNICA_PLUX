const estadoPagoController = {
    init: function() {
      console.log('Estado Pago Controller Loaded');
    },
  
    consultar: async function() {
      const parentId = document.getElementById('parentId').value;
  
      if (!parentId) {
        alert('⚠️ Debes ingresar el parentId');
        return;
      }
  
      const response = await apiServices.consultarEstado(parentId);
  
      if (response.success) {
        const resultado = document.getElementById('resultado');
        resultado.innerHTML = `
          <p><strong>Estado:</strong> ${response.estadoTransaccion.status}</p>
          <p><strong>Descripción:</strong> ${response.estadoTransaccion.description}</p>
        `;
      } else {
        alert('❌ ' + response.message);
      }
    }
  };
  
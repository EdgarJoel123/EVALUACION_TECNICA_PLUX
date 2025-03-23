// controllers/estadoPagoController.js

const estadoPagoController = {
  init: function () {
    document.getElementById('btnConsultarEstado').addEventListener('click', this.consultarEstadoPago);
  },

  consultarEstadoPago: async function () {
    const token = localStorage.getItem('token');
    const parentId = document.getElementById('parentId').value;

    if (!token || !parentId) {
      alert('❌ Faltan datos para consultar');
      return;
    }

    try {
      const response = await apiServices.consultarEstado(parentId, token);

      if (response.success) {
        alert(`✅ Estado: ${response.estadoTransaccion.status}`);
      } else {
        alert('❌ No se encontró la transacción');
      }
    } catch (error) {
      console.error(error);
      alert('❌ Error en la consulta');
    }
  }
};

estadoPagoController.init();

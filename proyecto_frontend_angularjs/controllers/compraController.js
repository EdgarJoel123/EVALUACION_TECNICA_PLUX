// controllers/compraController.js

const compraController = {
    init: function () {
      document.getElementById('btnPagar').addEventListener('click', this.realizarPago);
    },
  
    realizarPago: async function () {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('user_id');
  
      if (!token || !userId) {
        alert('No hay sesión activa');
        window.location.href = 'index.html';
        return;
      }
  
      const datosPago = {
        userId: userId,
        monto: 1500.00,
        descripcion: 'Compra de iPhone 15 Pro Max',
        montoCero: 0,
        monto12: 1500.00,
        whatsapp: '+593999999999',
        ci: '1710010002',
        direccion: 'Vencedores y Acacias',
        nombrePago: 'Cliente Demo',
        emailPago: 'cliente@correo.com',
        telefono: '0999999999'
      };
  
      try {
        const response = await apiServices.crearLinkPago(datosPago, token);
  
        if (response.success) {
          alert('✅ Link de pago generado');
          // Lógica para mostrar el botón de PagoPlux aquí 👇
          compraController.generarBotonPagoPlux(response.datosGuardados);
        } else {
          alert('❌ Error al generar link de pago');
        }
      } catch (error) {
        console.error(error);
        alert('❌ Error al generar link de pago');
      }
    },
  
    generarBotonPagoPlux: function (datosPago) {
      var data = {
        PayboxRemail: "demo@negocio.com",
        PayboxSendmail: datosPago.email_pago,
        PayboxRename: "Nombre del Comercio",
        PayboxSendname: datosPago.nombre_pago,
        PayboxBase0: datosPago.monto_cero,
        PayboxBase12: datosPago.monto_12,
        PayboxDescription: datosPago.descripcion,
        PayboxProduction: false,
        PayboxPagoPlux: true,
        PayboxIdElement: "btnPagoPlux"
      };
  
      var onAuthorize = function (response) {
        if (response.status === 'succeeded') {
          console.log("✅ Pago exitoso", response);
          alert('✅ Pago exitoso');
        }
      };
  
      // Generamos el botón de pago
      window.Paybox.init(data, onAuthorize);
    }
  };
  
  compraController.init();
  
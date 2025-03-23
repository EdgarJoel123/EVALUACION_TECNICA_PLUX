// controllers/loginController.js

const loginController = {
    init: function () {
      document.getElementById('btnLogin').addEventListener('click', this.realizarLogin);
    },
  
    realizarLogin: async function () {
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      if (!username || !password) {
        alert('Por favor llena los campos');
        return;
      }
  
      try {
        const response = await apiServices.login(username, password);
  
        if (response.success) {
          alert('✅ Login exitoso');
          localStorage.setItem('token', response.token);
          localStorage.setItem('user_id', response.user_id);
          window.location.href = 'compra.html';
        } else {
          alert('❌ Error en login');
        }
      } catch (error) {
        console.error(error);
        alert('❌ Error en login');
      }
    }
  };
  
  loginController.init();
  
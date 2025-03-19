import apiService from '../services/apiServices.js';

document.getElementById('loginBtn').addEventListener('click', async () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const result = await apiService.login(username, password);
  if (result.success) {
    alert('Login exitoso');
    // Puedes redirigir o mostrar opciones de pago
  } else {
    alert(result.message || 'Error en login');
  }
});

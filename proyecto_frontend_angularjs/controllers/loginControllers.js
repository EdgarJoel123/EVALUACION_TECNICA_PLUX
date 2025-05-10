const loginController = {
  async realizarLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const result = await response.json();

      if (result.success) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('userId', result.user_id);

        alert('Login exitoso');
        window.location.href = 'compra.html'; // Redirige a la página de compra
      } else {
        alert('Credenciales incorrectas');
      }

    } catch (error) {
      console.error(' Error al hacer login:', error);
      alert('Error en login');
    }
  }
};

// Este código debe estar aquí para que el botón funcione:
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btnLogin').addEventListener('click', loginController.realizarLogin);
});

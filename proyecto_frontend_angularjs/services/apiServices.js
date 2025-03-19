const apiUrl = 'http://localhost:3000/api';

const apiService = {
  token: '',

  setToken(newToken) {
    this.token = newToken;
  },

  async login(username, password) {
    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (data.success) {
        this.setToken(data.token);
      }
      return data;
    } catch (error) {
      console.error('Error en login:', error);
    }
  },

  async crearLinkPago(pagoData) {
    try {
      const response = await fetch(`${apiUrl}/pagos/crearLinkPago`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
        body: JSON.stringify(pagoData)
      });
      return await response.json();
    } catch (error) {
      console.error('Error al crear link de pago:', error);
    }
  },

  async consultarEstado(parentId) {
    try {
      const response = await fetch(`${apiUrl}/pagos/consultarEstado/${parentId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Error al consultar estado:', error);
    }
  }
};

export default apiService;

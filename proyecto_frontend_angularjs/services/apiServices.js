const apiServices = {
  getToken() {
    return localStorage.getItem('token');
  },

  getUserId() {
    return localStorage.getItem('userId');
  },

  async crearLinkPago(payload) {
    const token = this.getToken();

    try {
      const response = await fetch('http://localhost:3000/api/pagos/crearLinkPago', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      return await response.json();

    } catch (error) {
      console.error('❌ Error en crearLinkPago:', error);
      throw error;
    }
  }
};

const apiServices = {
    apiUrl: 'http://localhost:3000/api',
  
    login: async function(datos) {
      try {
        const res = await fetch(`${this.apiUrl}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(datos)
        });
        return await res.json();
      } catch (error) {
        console.error(error);
        return { success: false, message: 'Error de conexión' };
      }
    },
  
    crearLinkPago: async function(datos) {
      const token = localStorage.getItem('token');
  
      try {
        const res = await fetch(`${this.apiUrl}/pagos/crearLinkPago`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(datos)
        });
        return await res.json();
      } catch (error) {
        console.error(error);
        return { success: false, message: 'Error de conexión' };
      }
    },
  
    consultarEstado: async function(parentId) {
      const token = localStorage.getItem('token');
  
      try {
        const res = await fetch(`${this.apiUrl}/pagos/consultarEstado/${parentId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        return await res.json();
      } catch (error) {
        console.error(error);
        return { success: false, message: 'Error de conexión' };
      }
    }
  };
  
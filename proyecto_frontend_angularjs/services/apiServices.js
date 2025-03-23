// services/apiServices.js

const apiServices = {
  login: async function (username, password) {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    return await response.json();
  },

  crearLinkPago: async function (datosPago, token) {
    const response = await fetch('http://localhost:3000/api/pagos/crearLinkPago', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(datosPago)
    });
    return await response.json();
  },

  consultarEstado: async function (parentId, token) {
    const response = await fetch(`http://localhost:3000/api/pagos/consultarEstado/${parentId}`, {
      method: 'GET',
      headers: {
        'Authorization': token
      }
    });
    return await response.json();
  }
};

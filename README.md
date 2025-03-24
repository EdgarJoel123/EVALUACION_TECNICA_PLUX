
# 📲 EVALUACION_TECNICA_PLUX

Evaluación técnica para el cargo de desarrollador, integrando **PagoPlux** como pasarela de pagos.

Este proyecto simula la **compra de un iPhone 15 Pro Max**, incluyendo autenticación, generación de link de pago y consulta del estado de la transacción.

---

## 🛠️ Tecnologías Utilizadas

| Tecnología     | Descripción                          |
|----------------|--------------------------------------|
| **HTML5/CSS3** | Estructura y estilos de las vistas   |
| **JavaScript** | Funcionalidades principales          |
| **AngularJS**  | Framework del frontend               |
| **Node.js**    | Backend con Express.js               |
| **PostgreSQL** | Base de datos para los pagos         |
| **PagoPlux**   | Pasarela de pagos integrada          |

---

## 🚀 Estructura del Proyecto

📁 PROYECTO_FRONTEND_ANGULARJS
├── controllers/
│   ├── compraController.js
│   └── estadoPagoController.js
├── index.html // Vista principal
└── estado.html // Vista de consulta de estado (opcional)

📁 PROYECTO_BACKEND
├── controllers/
│   └── PagoController.js
├── config/
│   └── db.js
├── routes/
│   ├── auth.js
│   └── pagos.js
└── server.js // Punto de inicio del servidor

---

## 🔐 Autenticación

Autenticación basada en **JWT**.

### Endpoint de Login

POST ➡️ http://localhost:3000/api/auth/login

#### Body (JSON)
```json
{
  "username": "usuario",
  "password": "contraseña"
}
```

#### Respuesta Exitosa
```json
{
  "success": true,
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user_id": "1"
}
```

✅ Este token es requerido para:
- Crear el link de pago.
- Consultar el estado de la transacción.

---

## ⚙️ ¿Qué hace el proyecto?

- Inicia sesión y guarda el token JWT en localStorage.
- Simula la compra de un iPhone 15 Pro Max desde el frontend.
- Si el pago es exitoso:
  - Se muestra el ID de la transacción en pantalla.
  - Se registra el pago en la base de datos (con parent_id).
  - Se puede consultar el estado de la transacción a partir de su ID.

---

## ▶️ Instalación y Configuración

### Frontend (AngularJS)

1. Clona el proyecto:
```bash
git clone https://github.com/EdgarJoel123/EVALUACION_TECNICA_PLUX.git
cd PROYECTO_FRONTEND_ANGULARJS
```
2. Abre index.html directamente en tu navegador o usa un servidor local como Live Server en VSCode.

### Backend (Node.js)

#### Requisitos
- Node.js v14 o superior
- PostgreSQL corriendo

#### Pasos
1. Instala dependencias:
```bash
cd PROYECTO_BACKEND
npm install
```
2. Configura la base de datos en config/db.js:

```javascript
const { Pool } = require('pg');

const pool = new Pool({
  user: 'tu_usuario',
  host: 'localhost',
  database: 'tu_base_de_datos',
  password: 'tu_password',
  port: 5432
});

module.exports = pool;
```
3. Inicia el servidor:
```bash
node server.js
```

---

## 📝 Flujo de Pago

### Crear Link de Pago (Backend)

POST ➡️ http://localhost:3000/api/pagos/crearLinkPago

#### Headers:
```
Authorization: {token}
```

#### Body (JSON)
```json
{
  "userId": 1,
  "monto": 150.75,
  "descripcion": "Compra de iPhone 15 Pro Max",
  "montoCero": 5,
  "monto12": 1500,
  "whatsapp": "+593989353272",
  "ci": "1850201169",
  "direccion": "Ambato",
  "nombrePago": "Nombre Tarjetahabiente",
  "emailPago": "correocliente@gmail.com",
  "telefono": "0989353272",
  "parentId": "ID_DE_TRANSACCION"
}
```

### Consultar Estado de Transacción (Backend)

GET ➡️ http://localhost:3000/api/pagos/consultarEstado/{id_transaccion}

#### Headers:
```
Authorization: {token}
```

---

## ✨ Características Implementadas

✅ Pago con botón personalizado de PagoPlux  
✅ Mostrar el ID de la transacción después del pago  
✅ Registro del pago en la base de datos con parent_id  
✅ Consulta de estado de transacción vía API  
✅ Autenticación JWT  
✅ Consumo de API backend desde el frontend  
✅ Manejo de errores en JS  

---

## 👨‍💻 Próximas Mejoras

- Migrar el frontend a React o Angular moderno
- Implementar logs de auditoría
- Mejorar la gestión de errores en frontend/backend
- Notificaciones push por estado de pago
- Pruebas automáticas (Jest)

---

## 📬 Contacto

Desarrollador: Edgar Joel  
Correo: esanchez1169joel@gmail.com

---

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.  
Consulta el archivo LICENSE para más información.

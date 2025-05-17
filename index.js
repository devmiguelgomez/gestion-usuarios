const express = require('express');
const cors = require('cors');
const conectarDB = require('./config/db');
require('dotenv').config();

// Conectar a la base de datos
conectarDB();

// Crear la aplicación de Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ extended: true }));

// Rutas
app.use('/api/v1/users', require('./routes/users'));

// Puerto de la app
const PORT = process.env.PORT || 4000;
// Ruta básica para verificar que el servidor está funcionando
app.get('/', (req, res) => {
  res.send('API de users funcionando correctamente');
});
// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});

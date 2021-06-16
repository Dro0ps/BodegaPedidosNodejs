const express = require('express');
const conectarDB = require('./config/db');
const corsMiddleware = require('./middleware/cors/index');

// crear el servidor
const app = express();

app.options('*', corsMiddleware);
app.use(corsMiddleware);

// Conectar a la base de datos
conectarDB();

// habilitar cors
app.use(cors());

// Habilitar express.json
app.use( express.json({ extended: true }));

// puerto de la app
const port = process.env.PORT || 4000;

// Importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/pedidos', require('./routes/pedidos'));
app.use('/api/tareas', require('./routes/tareas'));
app.use('/api/clientes', require('./routes/clientes'));
app.use('/api/productos', require('./routes/productos'));
app.use('/api/notas', require('./routes/notas'));

// arrancar la app
app.listen(port, '0.0.0.0', () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});
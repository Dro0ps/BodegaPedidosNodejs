const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// Crea clientes
// api/clientes
router.post('/', 
    auth,
    [
        check('rut_cliente', 'El rut del cliente es obligatoio').not().isEmpty()
    ],
    clienteController.crearCliente
);

// Obtener todos los clientes
router.get('/', 
    auth,
    clienteController.obtenerClientes
)

// Query para Buscar clientes por su r
router.post('/busqueda/:query',
clienteController.buscarCliente
);

// Actualizar cliente via ID
router.put('/:id', 
    auth,
    [
        check('rut_cliente', 'El rut del cliente es obligatoio').not().isEmpty()
    ],
    clienteController.actualizarCliente
);

// Eliminar un Proyecto
router.delete('/:id', 
    auth,
    clienteController.eliminarCliente
);

module.exports = router;
const express = require('express');
const router = express.Router();
const notaventaController = require('../controllers/notaventaController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');


// api/notas
router.post('/',
   
    notaventaController.crearNotaVenta
);

// Obtener todas las notas de venta
router.get('/',
    
    notaventaController.obtenerNotasVenta
);


// Obtener nota de venta por su id
router.get('/:idNota',
    
    notaventaController.obtenerNotaVenta
);


// Actualizar una nota de Venta
router.put('/:idNota',
    notaventaController.actualizarNotaVenta
);


// Elimina una nota de Venta
router.delete('/:idNota', 
    notaventaController.eliminarNotaVenta
);


module.exports = router;
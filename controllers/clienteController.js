const Cliente = require('../models/Cliente');
const { validationResult } = require('express-validator');


// Crear al cliente
exports.crearCliente = async (req, res) => {

    // Revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }


    try {
        // Crear un nuevo cliente
        const cliente = new Cliente(req.body);

        // guardamos el cliente
        cliente.save();
        res.json(cliente);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al crear cliente');
    }

}

// Obtiene todos los clientes del usuario actual
exports.obtenerClientes = async (req, res) => {
    try {
        const clientes = await Cliente.find();
        res.json({ clientes });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al obetener clientes');
    }
} 

/* exports.elegircliente = async (req, res) => {
    try {
        let cliente = await Cliente.findById(req.params.id);
    // si el cliente existe o no
    if(!cliente) {
        return res.status(404).json({msg: 'Cliente no encontrado'})
    }
    res.json({cliente});

        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
} */

exports.buscarCliente = async (req, res) => {
   
    try {
        
        const cliente = await Cliente.find({rut_cliente: req.params.rutCliente});

        res.json(cliente);
    
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al buscar cliente');
    }
}

// Actualiza un cliente
exports.actualizarCliente = async (req, res) => {

    // Revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }

    // extraer la información del cliente
    const { 
        rut_cliente,
        nombre_cliente,
        dir_cliente,
        comuna,
        ciudad,
        tlf_cliente,
        giro } = req.body;


    const nuevoCliente = {};
    
    if(rut_cliente) {
        nuevoCliente.rut_cliente = rut_cliente;
        nuevoCliente.nombre_cliente = nombre_cliente;
        nuevoCliente.dir_cliente = dir_cliente;
        nuevoCliente.comuna = comuna;
        nuevoCliente.ciudad = ciudad;
        nuevoCliente.tlf_cliente = tlf_cliente;
        nuevoCliente.giro = giro;
        
    }
    

    try {

        // revisar el ID 
        let cliente = await Cliente.findById(req.params.id);

        // si el cliente existe o no
        if(!cliente) {
            return res.status(404).json({msg: 'Cliente no encontrado'})
        }

        /* // verificar el creador del cliente
        if(cliente.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({msg: 'No Autorizado'});
        } */

        // actualizar
        cliente = await Cliente.findByIdAndUpdate({ _id: req.params.id }, { $set : nuevoCliente}, { new: true });

        res.json({cliente});

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}

// Elimina un cliente por su id
exports.eliminarCliente = async (req, res ) => {
    try {
        // revisar el ID 
        let cliente = await Cliente.findById(req.params.id);

        // si el cliente existe o no
        if(!cliente) {
            return res.status(404).json({msg: 'Cliente no encontrado'})
        }

        // verificar el creador del cliente
        /* if(cliente.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({msg: 'No Autorizado'});
        } */

        // Eliminar el Cliente
        await Cliente.findOneAndRemove({ _id : req.params.id });
        res.json({ msg: 'Cliente eliminado '})

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor')
    }
}
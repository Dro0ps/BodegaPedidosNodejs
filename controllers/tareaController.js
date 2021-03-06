const Tarea = require('../models/Tarea');
const Pedido = require('../models/Pedido');
const { validationResult } = require('express-validator');

// Crea una nueva tarea
exports.crearTarea = async (req, res) => {

    // Revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }
    

    try {

        // Extraer el pedido y comprobar si existe
        const { pedido } = req.body;

        const existePedido = await Pedido.findById(pedido);
        if(!existePedido) {
            return res.status(404).json({msg: 'Pedido no encontrado'})
        }

        // Revisar si el pedido actual pertenece al usuario autenticado
        if(existePedido.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({msg: 'No Autorizado'});
        }

        // Creamos la tarea
        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json({ tarea });
    
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }

}

// Obtiene las tareas por pedido
exports.obtenerTareas = async (req, res) => {

        try {
            // Extraer el pedido y comprobar si existe
            const { pedido } = req.query;


            const existePedido = await Pedido.findById(pedido);
            if(!existePedido) {
                return res.status(404).json({msg: 'Pedido no encontrado'})
            }

            // Revisar si el pedido actual pertenece al usuario autenticado
            if(existePedido.creador.toString() !== req.usuario.id ) {
                return res.status(401).json({msg: 'No Autorizado'});
            }

            // Obtener las tareas por pedido
            const tareas = await Tarea.find({ pedido }).sort({ creado: -1 });
            res.json({ tareas });

        } catch (error) {
            console.log(error);
            res.status(500).send('Hubo un error');
        }
}

// Actualizar una tarea
exports.actualizarTarea = async (req, res ) => {
    try {
        // Extraer el pedido y comprobar si existe
        const { 
            pedido,
            tipo_despacho,
            fecha_despacho,
            sucursal,
            dir_entrega,
            preparador,
            coment_despacho,
            estado } = req.body;


        // Si la tarea existe o no
        let tarea = await Tarea.findById(req.params.id);

        if(!tarea) {
            return res.status(404).json({msg: 'No existe esa tarea'});
        }

        // extraer pedido
        const existePedido = await Pedido.findById(pedido);

        // Revisar si el pedido actual pertenece al usuario autenticado
        if(existePedido.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({msg: 'No Autorizado'});
        }
        // Crear un objeto con la nueva informaci??n
        const nuevaTarea = {};
        nuevaTarea.tipo_despacho = tipo_despacho;
        nuevaTarea.fecha_despacho = fecha_despacho;
        nuevaTarea.sucursal = sucursal;
        nuevaTarea.dir_entrega = dir_entrega;
        nuevaTarea.preparador = preparador;
        nuevaTarea.coment_despacho = coment_despacho;
        nuevaTarea.estado = estado;

        // Guardar la tarea
        tarea = await Tarea.findOneAndUpdate({_id : req.params.id }, nuevaTarea, { new: true } );

        res.json({ tarea });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}


// Elimina una tarea
exports.eliminarTarea = async (req, res) => {
    try {
        // Extraer el pedido y comprobar si existe
        const { pedido  } = req.query;

        // Si la tarea existe o no
        let tarea = await Tarea.findById(req.params.id);

        if(!tarea) {
            return res.status(404).json({msg: 'No existe esa tarea'});
        }

        // extraer pedido
        const existePedido = await Pedido.findById(pedido);

        // Revisar si el pedido actual pertenece al usuario autenticado
        if(existePedido.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({msg: 'No Autorizado'});
        }

        // Eliminar
        await Tarea.findOneAndRemove({_id: req.params.id});
        res.json({msg: 'Tarea Eliminada'})

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}
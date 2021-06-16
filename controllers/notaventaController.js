const NotaVenta = require('../models/NotaVenta');
const { validationResult } = require('express-validator');


exports.crearNotaVenta = async (req, res) => {
    // Revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }

    try {
        // Crear una nota de venta
        const notaVenta = new NotaVenta(req.body);

        // Guardar el creador via JWT
        /* notaVenta.creador = req.usuario.id; */

        // Guardamos la nota de Venta
        notaVenta.save();
        res.json(notaVenta);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al crear la nota de Venta');

    }

}


// Obtiene todas las notas de venta del usuario actual
exports.obtenerNotasVenta = async (req, res) => {
    try {
        const notas = await NotaVenta.find({}).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Producto'
        });
        res.json(notas);
        
        
    } catch (error) {
        console.log(error);
    res.status(500).send('Hubo un error al obtener las notas de venta');
    }
}

// Obtiene una nota de venta por su ID
exports.obtenerNotaVenta = async (req, res) => {
    try {
        const nota = await NotaVenta.findById(req.params.idNota).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Producto'
        });
        res.json(nota);
        
        
    } catch (error) {
        console.log(error);
    res.status(500).send('Hubo un error al llamar la nota de venta');
    }
}


// Actualiza una nota de venta
exports.actualizarNotaVenta = async(req, res) => {
    try {
        const nota = await NotaVenta.findByIdAndUpdate({_id : req.params.idNota}, req.body, {
            new: true
        })
        .populate('cliente')
        .populate({
            path: 'pedido.producto',
            model: 'Producto'
        });
        res.json(nota);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al actualizar la nota de venta');
    }
}

// Elimina un pedido por su ID
/* exports.eliminarNotaVenta = async(req, res) => {
    try {
        await NotaVenta.findOneAndDelete({_id : req.params.idNota});
        res.json({ mensaje : 'La nota de Venta se ha eliminado'});
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al eliminar la nota de venta');
    }
}; */


// Elimina una nota de venta por su id
exports.eliminarNotaVenta = async (req, res) => {

    try {
        // revisar el ID 
        let notaVenta = await NotaVenta.findById(req.params.idNota);

        // si la nota de venta existe o no
        if(!notaVenta) {
            return res.status(404).json({msg: 'Nota de venta no encontrada'})
        }

        /* // verificar el creador del nota de venta
        if(notaVenta.creador.toString() !== req.usuario.idNota ) {
            return res.status(401).json({msg: 'No Autorizado'});
        } */

        // Eliminar el nota de venta
        await NotaVenta.findOneAndDelete({ _id : req.params.idNota });
        res.json({ msg: 'nota de venta eliminada '})

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor')
    }

}




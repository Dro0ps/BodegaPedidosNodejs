const mongoose = require('mongoose');

const NotaVentaSchema = mongoose.Schema({

    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente'
    },
    pedido: [{
        producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto'
    },
    cantidad: Number
    }],

    total: {
        type: Number
    },
    
    creador: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario'
    },
    creado: {
        type: Date,
        default: Date.now()
    }

});

module.exports = mongoose.model('NotaVenta', NotaVentaSchema);
const mongoose = require('mongoose');

const PedidoSchema = mongoose.Schema({
    num_pedido: {
        type: String,
        required: true,
        trim: true
    },
    nombre_cliente: {
        type: String,
        required: true,
        trim: true
    },
    monto_pedido: {
        type: String,
        required: true,
        trim: true
    },
    medio_pago: {
        type: String, 
        required: true,
        trim: true
    },
    banco: {
        type: String,
        required: true,
        trim: true
    },
    fecha_deposito: {
        type: String,
        required: true,
        trim: true
    },
    tipo_documento: {
        type: String,
        required: true,
        trim: true
    },
    num_documento: {
        type: String,
        required: true,
        trim: true
    },
    estado_pedido: {
        type: Boolean,
        required: true,
        trim: true,
        
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

module.exports = mongoose.model('Pedido', PedidoSchema);
const mongoose = require('mongoose');

const TareaSchema = mongoose.Schema({
    tipo_despacho: {
        type: String,
        required: true,
        trim: true
    },
    fecha_despacho: {
        type: String,
        required: true,
        trim: true
    },
    sucursal: {
        type: String,
        required: true,
        trim: true
    },
    dir_entrega: {
        type: String,
        required: true,
        trim: true
    },
    preparador: {
        type: String,
        required: true,
        trim: true
    },
    coment_despacho: {
        type: String,
        required: false,
        trim: false
    },
    estado: {
        type: Boolean,
        default: false
    },
    creado: {
        type: Date,
        default: Date.now()
    }, 
    pedido: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pedido'
    }
});

module.exports = mongoose.model('Tarea', TareaSchema);
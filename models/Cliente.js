const mongoose = require('mongoose');

const ClienteSchema = mongoose.Schema({
    rut_cliente: {
        type: String,
        required: true,
        trim: true
        
    },
    nombre_cliente: { 
        type: String,
        required: true,
        trim: true
    },
    dir_cliente: {
        type: String,
        required: true,
        trim: true
    },
    comuna: {
        type: String,
        required: true,
        trim: true
    }, 
    ciudad: {
        type: String,
        required: true,
        trim: true
    },
    tlf_cliente: {
        type: String,
        required: true,
        trim: true
    },
    giro: {
        type: String,
        required: true,
        trim: true
    } 

});

module.exports = mongoose.model('Cliente', ClienteSchema);
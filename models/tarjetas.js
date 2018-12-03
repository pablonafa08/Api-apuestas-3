'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

var tarjetaSchema = schema({
    numero: String,
    nombre: String,
    idUsuario: { type: schema.ObjectId, ref: 'Usuario' },
    estatus: String

});

module.exports = mongoose.model('Tarjeta', tarjetaSchema);
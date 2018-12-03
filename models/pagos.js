'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

var pagoSchema = schema({
    idapuesta: { type: schema.ObjectId, ref: 'Apuesta' },
    usuario: { type: schema.ObjectId, ref: 'Usuario' },
    pago: Number,
    fecha: Date
});

module.exports = mongoose.model('Pago', pagoSchema);
'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

var apuestaSchema = schema({
    usuario: { type: schema.ObjectId, ref: 'Usuario' },
    juego: { type: schema.ObjectId, ref: 'Juego' },
    resultado: String,
    montoApuesta: Number,
    estatus: String
});

module.exports = mongoose.model('Apuesta', apuestaSchema);
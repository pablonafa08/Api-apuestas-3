'use strict'
const mongoose = require('mongoose');
const schema = mongoose.Schema;

var equipoSchema = schema({
    nombre: String,
    ciudad: String,
    deporte: { type: schema.ObjectId, ref: 'Deporte' },
    estatus: String,
    imagen: String
});

module.exports = mongoose.model('Equipo', equipoSchema);
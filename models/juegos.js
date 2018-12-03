'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

var juegoSchema = schema({
    equipo1: { type: schema.ObjectId, ref: 'Equipo' },
    equipo2: { type: schema.ObjectId, ref: 'Equipo' },
    //deporte: { type: schema.ObjectId, ref: 'Deporte' },
    fecha: String,
    estatus: String,
    ResultadoEq1: String,
    ResultadoEq2: String
});

module.exports = mongoose.model('Juego', juegoSchema);
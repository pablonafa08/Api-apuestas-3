'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

var administradorSchema = schema({
    nombre: String,
    app: String,
    apm: String,
    correo: String,
    contra: String,
    estatus: String
});


module.exports = mongoose.model('Administrador', administradorSchema);
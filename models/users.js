'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

var userSchema = schema({
    nombre: String,
    app: String,
    apm: String,
    correo: String,
    contra: String,
    estatus: String,
    customerid: String
});

module.exports = mongoose.model('Usuario', userSchema);
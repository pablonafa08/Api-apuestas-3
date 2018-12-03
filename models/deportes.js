'use strict'
const mongoose = require('mongoose');
const schema = mongoose.Schema;

var deporteSchema = schema({
    descripcion: String,
    estatus: String
});

module.exports = mongoose.model('Deporte', deporteSchema);
'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'bienvenido-al-infierno-muggle';

exports.createToken = function(admin) {
    var payload = {
        sub: admin._id,
        nombre: admin.nombre,
        app: admin.app,
        apm: admin.apm,
        correo: admin.correo,
        estatus: admin.estatus,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix
    };
    return jwt.encode(payload, secret);
};
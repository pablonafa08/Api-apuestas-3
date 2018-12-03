'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'bienvenido-al-infierno-muggle';

exports.ensureAuth = function(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({ message: 'La peticion no cuenta con autenticación'});        
    }
    var token = req.headers.authorization.replace(/['"]+/g,'');

    try{
        var payload = jwt.decode(token, secret);
        if(payload.exp <= moment().unix()){
            return res.status(401).send({
                message: 'El token a expirado'
            })
        }
    }catch(ex){
        return res.status(401).send({
            message: 'El token no es válido'});
    }
    req.admin = payload;
    
    next();
}
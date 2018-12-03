'use strict'
//modulos
const moment = require('moment');
const bcrypt = require('bcrypt-nodejs');

//modelo
const Administrador = require('../models/administradores');

// servicio jwt
var jwt = require('../services/jwt');
//acciones

function addAdministrador(req, res) {
    var administrador = new Administrador();
    var params = req.body;


    administrador.nombre = params.nombre;
    administrador.app = params.app;
    administrador.apm = params.apm;
    administrador.correo = params.correo;
    administrador.contra = params.contra;
    administrador.estatus = params.estatus;


    Administrador.findOne({ correo: administrador.correo.toLowerCase() }, (err, issetAdministrador) => {
        if (err) {
            res.status(500).send({ message: `Error al buscar` });
        } else {
            if (!issetAdministrador) {
                bcrypt.hash(params.contra, null, null, (err, hash) => {
                    administrador.contra = hash;

                    administrador.save((err, administradorStored) => {
                        if (err) {
                            res.status(500).send({ message: `Error al guardar` });
                        } else {
                            if (!administradorStored) {
                                res.status(404).send({ message: `No se pudo guardar` });
                            } else {
                                res.status(200).send({ administrador: administradorStored });
                            }
                        }
                    });
                });
            } else {
                res.status(200).send({ message: `El administrador ya existe` });
            }
        }
    });
}

function updateAdministrador(req, res) {
    var administradorId = req.params.id;
    var update = req.body;

    Administrador.findByIdAndUpdate(administradorId, update, { new: true }, (err, administradorUpdated) => {
        if (err) {
            res.status(500).send({ message: `Error al buscar` });
        } else {
            if (!administradorUpdated) {
                res.status(404).send({ message: `No se pudo actualizar` });
            } else {
                res.status(200).send({ administrador: administradorUpdated });
            }
        }
    });
}


function getAdministradores(req, res) {
    Administrador.find({ estatus: 'A' }).exec((err, allAdministradores) => {
        if (err) {
            res.status(500).send({ message: `Error en la peticion` });
        } else {
            if (!allAdministradores) {
                res.status(200).send({ message: `No hay Administradores` });
            } else {
                res.status(200).send({ administradores: allAdministradores });

            }
        }
    });
}

function login(req, res) {
    var params = req.body;
    var correo = params.correo;
    var contra = params.contra;


    Administrador.findOne({ correo: correo.toLowerCase() }, (err, issetAdministrador) => {
        if (err) {
            res.status(500).send({ message: `Error al buscar` });
        } else {
            if (issetAdministrador) {
                bcrypt.compare(contra, issetAdministrador.contra, (err, check) => {
                    if (check) {
                        if (params.gettoken) {
                            res.status(200).send({
                                token: jwt.createToken(issetAdministrador)
                            });
                        } else {
                            res.status(200).send({ issetAdministrador });
                        }
                        // res.status(200).send({ issetAdministrador });
                    } else {
                        res.status(404).send({
                            message: `El usuario no ha podido loguearse correctamente`
                        });
                    }
                });
            }
        }
    });
}

module.exports = {
    addAdministrador,
    updateAdministrador,
    getAdministradores,
    login
}
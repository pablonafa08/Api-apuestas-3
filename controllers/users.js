'use strict'
//modulo
const moment = require('moment');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');

//modelo
const Usuario = require('../models/users');

//acciones

function addUser(req, res) {
    var usuario = new Usuario();
    var params = req.body;

    usuario.nombre = params.nombre;
    usuario.app = params.app;
    usuario.apm = params.apm;
    usuario.correo = params.correo;
    usuario.contra = params.contra;
    usuario.customerid = '';
    usuario.estatus = 'A';

    Usuario.findOne({ correo: usuario.correo.toLowerCase() }, (err, issetUsuario) => {
        if (err) {
            res.status(500).send({ message: `Error al buscar` });
        } else {
            if (!issetUsuario) {
                bcrypt.hash(params.contra, null, null, (err, hash) => {
                    usuario.contra = hash;

                    usuario.save((err, usuarioStored) => {
                        if (err) {
                            res.status(500).send({ message: `Error al guardar` });
                        } else {
                            if (!usuarioStored) {
                                res.status(404).send({ message: `No se ha podido guardar` });
                            } else {
                                res.status(200).send({ usuarioStored });
                            }
                        }
                    });
                });

            } else {
                res.status(200).send({ message: `El usuario ya existe` });
            }
        }
    });
}

function updateUser(req, res) {
    var userId = req.params.id;
    var update = req.body;

    Usuario.findByIdAndUpdate(userId, update, { new: true }, (err, userUpdated) => {
        if (err) {
            res.status(500).send({ message: `Error al buscar` });
        } else {
            if (!userUpdated) {
                res.status(404).send({ message: `No se pudo actualizar` });
            } else {
                res.status(200).send({ userUpdated });
            }
        }
    });
}

function getUsuarios(req, res) {
    Usuario.find({ estatus: 'A' }).exec((err, allUsers) => {
        if (err) {
            res.status(500).send({ message: `Error en la peticion` });
        } else {
            if (!allUsers) {
                res.status(200).send({ message: `No hay Usuarios` });
            } else {
                res.status(200).send({ usuarios: allUsers });
            }
        }
    });
}

function login(req, res) {
    var params = req.body;

    var correo = params.correo;
    var contra = params.contra;

    Usuario.findOne({ correo: correo.toLowerCase() }, (err, Usuario) => {
        if (err) {
            res.status(500).send({ error: true, message: `Ocurrio un error, intentarlo mas tarde` });
        } else {
            if (!Usuario) {
                res.status(404).send({ error: true, message: `El usuario no existe` });
            } else {
                bcrypt.compare(contra, Usuario.contra, (err, check) => {
                    if (check) {
                        if (params.gettoken) {
                            res.status(200).send({ Usuario, token: jwt.createToken(Usuario) });
                        } else {
                            res.status(200).send({ Usuario, token: jwt.createToken(Usuario) });
                        }
                    } else {
                        res.status(404).send({ message: `La contraseña no es correcta` });
                    }
                });
            }
        }
    });
}

module.exports = {
    addUser,
    updateUser,
    getUsuarios,
    login
}
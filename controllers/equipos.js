'use strict'
//modulo
const moment = require('moment');

//modelo
const Equipo = require('../models/equipos');

function addEquipo(req, res) {
    var equipo = new Equipo();
    var params = req.body;

    equipo.nombre = params.nombre;
    equipo.ciudad = params.ciudad;
    equipo.deporte = params.deporte;
    equipo.estatus = params.estatus;
    //imagen

    Equipo.findOne({ nombre: equipo.nombre.toLowerCase() }, (err, issetEquipo) => {
        if (err) {
            res.status(500).send({ message: `Error al buscar` });
        } else {
            if (!issetEquipo) {
                equipo.save((err, equipoStored) => {
                    if (err) {
                        res.status(500).send({ message: `Error al guardar` });
                    } else {
                        if (!equipoStored) {
                            res.status(404).send({ message: `No se ha podido guardar` });
                        } else {
                            res.status(200).send({ equipo: equipoStored });
                        }
                    }
                });
            } else {
                res.status(200).send({ message: `El equipo ya existe` });
            }
        }
    });
}

function updateEquipo(req, res) {
    var equipoId = req.params.id;
    var update = req.body;

    Equipo.findByIdAndUpdate(equipoId, update, { new: true }, (err, equipoUpdated) => {
        if (err) {
            res.status(500).send({ message: `Error al comprobar` });
        } else {
            if (!equipoUpdated) {
                res.status(404).send({ message: `No se pudo actualizar` });
            } else {
                res.status(200).send({ equipo: equipoUpdated });
            }
        }
    });
}


function getEquipos(req, res) {
    Equipo.find({ estatus: 'A' }).populate({ path: 'deporte' }).exec((err, allEquipos) => {
        if (err) {
            res.status(500).send({ message: `Error en la peticion` });
        } else {
            if (!allEquipos) {
                res.status(200).send({ message: `No hay Equipos` });
            } else {
                res.status(200).send({ equipos: allEquipos });
            }
        }
    });
}

function getEquiposByDeporte(req, res) {
    var deporteId = req.params.id;
    Equipo.find({ deporte: deporteId, estatus: 'A' }).populate({ path: 'deporte' }).exec((err, allEquipos) => {
        if (err) {
            res.status(500).send({ message: `Error en la peticion` });
        } else {
            if (!allEquipos) {
                res.status(200).send({ message: `No hay Equipos` });
            } else {
                res.status(200).send({ equipos: allEquipos });
            }
        }
    });
}

module.exports = {
    addEquipo,
    updateEquipo,
    getEquipos,
    getEquiposByDeporte
}
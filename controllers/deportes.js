'use strict'
//modulos
const moment = require('moment');

//modelo
const Deporte = require('../models/deportes');

//acciones

function addDeporte(req, res) {
    var params = req.body;
    var deporte = new Deporte();

    deporte.descripcion = params.descripcion;
    deporte.estatus = params.estatus

    Deporte.findOne({ descripcion: deporte.descripcion.toLowerCase() }, (err, issetDeporte) => {
        if (err) {
            res.status(500).send({ message: `Error al buscar` });
        } else {
            if (!issetDeporte) {
                deporte.save((err, deporteStored) => {
                    if (err) {
                        res.status(500).send({ message: `Error al guardar` });
                    } else {
                        if (!deporteStored) {
                            res.status(404).send({ message: `No se ha podido guardar` });
                        } else {
                            res.status(200).send({ deporte: deporteStored });
                        }
                    }
                });
            } else {
                res.status(200).send({ message: `El deporte ya existe` });
            }
        }
    });
}

function updateDeporte(req, res) {

    var deporteId = req.params.id;
    var update = req.body;

    Deporte.findByIdAndUpdate(deporteId, update, { new: true }, (err, deporteUpdated) => {
        if (err) {
            res.status(500).send({ message: `Error al comprobar` });
        } else {
            if (!deporteUpdated) {
                res.status(404).send({ message: `No se pudo actualizar` });
            } else {
                res.status(200).send({ deporte: deporteUpdated });
            }
        }
    });
}

function getDeportes(req, res) {
    Deporte.find({ estatus: 'A' }).exec((err, allDeportes) => {
        if (err) {
            res.status(500).send({ message: `Error en la peticion` });
        } else {
            if (!allDeportes) {
                res.status(200).send({ message: `No hay Deportes` });
            } else {
                res.status(200).send({ allDeportes });
            }
        }
    });
}

module.exports = {
    addDeporte,
    updateDeporte,
    getDeportes
}
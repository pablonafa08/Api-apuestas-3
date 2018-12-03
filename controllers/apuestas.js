'use strict'
//modulo
const moment = require('moment');

//modelo
const Apuesta = require('../models/apuestas');

//acciones

function addApuesta(req, res) {
    var apuesta = new Apuesta();
    var params = req.body;

    apuesta.usuario = params.usuario;
    apuesta.juego = params.juego;
    apuesta.resultado = params.resultado;
    apuesta.montoApuesta = params.montoApuesta;
    parseFloat(apuesta.montoApuesta);
    apuesta.estatus = 'A';

    apuesta.save((err, apuesta) => {
        if (err) {
            res.status(500).send({ error: 'Ocurrio un error en la conexion' });
        } else {
            if (!apuesta) {
                res.status(404).send({ error: 'No se pudo realizar la apeusta' });
            } else {
                res.status(200).send({ apuesta });
            }
        }
    });

}

function getApuestas(req, res) {
    Apuesta.find({ estatus: 'A' }).populate('juego').exec((err, apuestas) => {
        if (err) {
            res.status(500).send({ error: `Error en la peticion` });
        } else {
            if (!apuestas) {
                res.status(404).send({ error: `No hay apuestas` });
            } else {
                res.status(200).send({ apuestas });
            }
        }
    });
}

function getNoApuestas(req, res) {
    Apuesta.find({ estatus: 'B' }).populate('juego').exec((err, apuestas) => {
        if (err) {
            res.status(500).send({ error: `Error en la peticion` });
        } else {
            if (!apuestas) {
                res.status(404).send({ error: `No hay apuestas` });
            } else {
                res.status(200).send({ apuestas });
            }
        }
    });
}

function getApuestasXJuego(req, res) {
    var juegoId = req.params.id;

    Apuesta.find({ juego: juegoId, estatus: 'A' }).populate('juego').populate('usuario').exec((err, apuestas) => {
        if (err) {
            res.status(500).send({ error: `Error en la peticion` });
        } else {
            if (!apuestas) {
                res.status(404).send({ error: `No hay apuestas` });
            } else {
                res.status(200).send({ apuestas });
            }
        }
    });
}

function updateApuesta(req, res) {
    var apuestaId = req.params.id;
    var update = req.body;

    Apuesta.findByIdAndUpdate(apuestaId, update, { new: true }, (err, apuestaUpdated) => {
        if (err) {
            res.status(500).send({ message: `Error al buscar` });
        } else {
            if (!apuestaUpdated) {
                res.status(404).send({ message: `No se pudo actualizar` });
            } else {
                res.status(200).send({ apuesta: apuestaUpdated });
            }
        }
    });
}

module.exports = {
    addApuesta,
    getApuestas,
    getNoApuestas,
    getApuestasXJuego,
    updateApuesta
}
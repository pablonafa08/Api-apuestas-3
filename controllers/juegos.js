'use strict'
//modulo
const moment = require('moment');

//modelo
const Juego = require('../models/juegos');

//acciones

function addJuego(req, res) {
    var juego = new Juego();
    var params = req.body;

    juego.equipo1 = params.equipo1;
    juego.equipo2 = params.equipo2;
    juego.fecha = params.fecha;
    juego.estatus = params.estatus;
    juego.ResultadoEq1 = null;
    juego.ResultadoEq2 = null;
    //juego.deporte = params.deporte;

    juego.save((err, juegoStored) => {
        if (err) {
            res.status(500).send({ message: `Error al guardar` });
        } else {
            if (!juegoStored) {
                res.status(404).send({ message: `No se pudo guardar` });
            } else {
                res.status(200).send({ juego: juegoStored });
            }
        }
    });
}

function updateJuego(req, res) {
    var juegoId = req.params.id;
    var update = req.body;

    Juego.findByIdAndUpdate(juegoId, update, { new: true }, (err, juegoUpdated) => {
        if (err) {
            res.status(500).send({ message: `Error al buscar` });
        } else {
            if (!juegoUpdated) {
                res.status(404).send({ message: `No se pudo actualizar` });
            } else {
                res.status(200).send({ juego: juegoUpdated });
            }
        }
    });
}


function getJuegos(req, res) {
    Juego.find({ estatus: 'A' }).populate({ path: 'equipo1' }).populate({ path: 'equipo2' }).exec((err, allJuegos) => {
        if (err) {
            res.status(500).send({ message: `Error en la peticion` });
        } else {
            if (!allJuegos) {
                res.status(200).send({ message: `No hay Juegos` });
            } else {
                res.status(200).send({ allJuegos });
            }
        }
    });
}

function getJuego(req, res) {
    var juegoId = req.params.id;

    Juego.findById(juegoId).populate({ path: 'equipo1' }).populate({ path: 'equipo2' }).exec((err, juego) => {
        if (err) {
            res.status(500).send({ message: `Error en la peticion` });
        } else {
            if (!juego) {
                res.status(200).send({ message: `No hay juego` });
            } else {
                res.status(200).send({ juego });
            }
        }
    });
}

function getNoJuegos(req, res) {
    Juego.find({ estatus: 'B' }).populate({ path: 'equipo1' }).populate({ path: 'equipo2' }).exec((err, allJuegos) => {
        if (err) {
            res.status(500).send({ message: `Error en la peticion` });
        } else {
            if (!allJuegos) {
                res.status(200).send({ message: `No hay Juegos` });
            } else {
                res.status(200).send({ allJuegos });
            }
        }
    });
}

module.exports = {
    addJuego,
    updateJuego,
    getJuegos,
    getJuego,
    getNoJuegos
}
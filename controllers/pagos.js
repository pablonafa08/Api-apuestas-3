'use strict'
//modulo

const moment = require('moment');
//modelo
const Pago = require('../models/pagos');


//acciones

function addPago(req, res) {
    var pago = new Pago();
    var params = req.body;


    pago.idapuesta = params.idapuesta;
    pago.usuario = params.usuario;
    pago.pago = params.pago;
    pago.fecha = moment().format('YYYY-MM-DD'); //params.fecha;

    pago.save((err, pagoStored) => {
        if (err) {
            res.status(500).send({ message: `Error al guardar` });
        } else {
            if (!pagoStored) {
                res.status(404).send({ message: `No se pudo guardar` });
            } else {
                res.status(200).send({ pago: pagoStored });
            }
        }
    });
}

function getPago(req, res) {
    var pagoId = req.params.usuario;
    Pago.find({ pagoId }).populate('idapuesta').exec((err, pagos) => {
        if (err) {
            res.status(500).send({ message: `Error en la peticion` });
        } else {
            if (!pagos) {
                res.status(404).send({ message: `No hay pago` });
            } else {
                res.status(200).send({ pagos });
            }
        }
    });
}
module.exports = {
    addPago,
    getPago
}
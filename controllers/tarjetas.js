'use strict'
//modulo


//modelos
const Tarjeta = require('../models/tarjetas');

//acciones

function addTarjeta(req, res) {
    var tarjeta = new Tarjeta();
    var params = req.body;

    tarjeta.numero = params.numero;
    tarjeta.nombre = params.nombre;
    tarjeta.estatus = params.estatus;


    Tarjeta.findOne({ numero: tarjeta.numero.toLowerCase() }, (err, issetTarjeta) => {
        if (err) {
            res.status(500).send({ message: `Error al buscar` });
        } else {
            if (!issetTarjeta) {
                tarjeta.save((err, tarjetaStored) => {
                    if (err) {
                        res.status(500).send({ message: `Error al guardar` });
                    } else {
                        if (!tarjetaStored) {
                            res.status(404).send({ message: `No se pudo guardar` });
                        } else {
                            res.status(200).send({ message: `Se ha guardado con exito` });
                        }
                    }
                });
            } else {
                res.status(200).send({ message: `La tarjeta ya existe` });
            }
        }
    });
}


module.exports = {
    addTarjeta
}
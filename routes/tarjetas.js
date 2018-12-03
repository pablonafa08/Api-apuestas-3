'use strict'

const express = require('express');
const router = express.Router();
const tarjetaCtrl = require('../controllers/tarjetas');

router.post('/add', tarjetaCtrl.addTarjeta);

module.exports = router;
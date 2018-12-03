'use strict'

const express = require('express');
const router = express.Router();
const equipoCtrl = require('../controllers/equipos');

router.post('/add', equipoCtrl.addEquipo);
router.put('/update/:id', equipoCtrl.updateEquipo);
router.get('/all', equipoCtrl.getEquipos);
router.get('/allbydeporte/:id', equipoCtrl.getEquiposByDeporte);

module.exports = router;
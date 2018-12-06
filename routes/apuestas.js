'use strict'

const express = require('express');
const router = express.Router();
const apuestaCtrl = require('../controllers/apuestas');

router.post('/add', apuestaCtrl.addApuesta);
router.get('/getAll', apuestaCtrl.getApuestas);
router.get('/getNoAll', apuestaCtrl.getNoApuestas);
router.get('/getxjuego/:id', apuestaCtrl.getApuestasXJuego);
router.put('/update/:id', apuestaCtrl.updateApuesta);

module.exports = router;
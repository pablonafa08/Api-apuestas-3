'use strict'

const express = require('express');
const router = express.Router();
const juegoCtrl = require('../controllers/juegos');

router.post('/add', juegoCtrl.addJuego);
router.get('/all', juegoCtrl.getJuegos);
router.put('/update/:id', juegoCtrl.updateJuego);
router.get('/getone/:id', juegoCtrl.getJuego);

module.exports = router;
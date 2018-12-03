'use strict'

const express = require('express');
const router = express.Router();
const pagoCtrl = require('../controllers/pagos');

router.post('/add', pagoCtrl.addPago);
router.get('/get/:id', pagoCtrl.getPago);


module.exports = router;
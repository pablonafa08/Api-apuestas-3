'use strict'

const express = require('express');
const router = express.Router();
const deporteCtrl = require('../controllers/deportes');

router.post('/add', deporteCtrl.addDeporte);
router.put('/update/:id', deporteCtrl.updateDeporte);
router.get('/all', deporteCtrl.getDeportes);


module.exports = router;
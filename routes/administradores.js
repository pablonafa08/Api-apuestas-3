'use strict'

const express = require('express');
const router = express.Router();
const administradorCtrl = require('../controllers/administradores');

var md_auth = require('../middlewares/authenticated');


router.post('/add', administradorCtrl.addAdministrador);
router.put('/update/:id', administradorCtrl.updateAdministrador);
router.get('/all', administradorCtrl.getAdministradores);
router.post('/login', administradorCtrl.login);

module.exports = router;
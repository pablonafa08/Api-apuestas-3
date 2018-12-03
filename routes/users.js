'use strict'

const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/users');

router.post('/add', userCtrl.addUser);
router.put('/update/:id', userCtrl.updateUser);
router.get('/all', userCtrl.getUsuarios);
router.post('/login', userCtrl.login);


module.exports = router;
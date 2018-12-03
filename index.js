'use strict'
var app = require('./app');
const mongoose = require('mongoose');

mongoose.connect('mongodb://uscxbspmaxq7nya:puuWsySjy6lY9NkfPqB1@b84e4r8r3dcrwrs-mongodb.services.clever-cloud.com:27017/b84e4r8r3dcrwrs', { useNewUrlParser: true }, (err) => {
    if (!err) {
        app.listen(3000, () => {
            console.log('El servidor corre en el http://localhost:3000');
        });
    }
});
'use strict'
var app = require('./app');
const mongoose = require('mongoose');

app.set('port', process.env.PORT || 3000);

mongoose.connect('mongodb://uscxbspmaxq7nya:puuWsySjy6lY9NkfPqB1@b84e4r8r3dcrwrs-mongodb.services.clever-cloud.com:27017/b84e4r8r3dcrwrs', { useNewUrlParser: true }, (err) => {
    if (!err) {
        app.listen(app.get('port'), () => {
            console.log(`El servidor corre en el http://localhost:${app.get('port')}`);
        });
    }
});
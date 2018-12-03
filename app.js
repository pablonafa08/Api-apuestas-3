'use strict'
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');
var app = express();
/**
 * OPENPAY CONFIG
 */
var Openpay = require('openpay'); //class
var openpay = new Openpay('mmf1i1brwfk2phqyjsf7', 'sk_ced44512d96e45379242cc5641086dd4'); //intance (id de comerciante, clave privada)
/**
 * MIDDLEARES
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

//configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('access-control-allow-origin', '*');
    res.header('Access-Control-Allow-Headers', 'Anthoriztion, X-API-KEY, Origin, X-Requested-Whith, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

/**
 * ROUTES
 */
const deporteRoutes = require('./routes/deportes');
const equipoRoutes = require('./routes/equipos');
const juegoRoutes = require('./routes/juegos');
const apuestaRouter = require('./routes/apuestas');
const userRouter = require('./routes/users');
const administradorRouter = require('./routes/administradores');
const pagoRouter = require('./routes/pagos');
const tarjetaRouter = require('./routes/tarjetas');

 
app.use('/deportes', deporteRoutes);
app.use('/equipos', equipoRoutes);
app.use('/juegos', juegoRoutes);
app.use('/apuestas', apuestaRouter);
app.use('/usuarios', userRouter);
app.use('/administradores', administradorRouter);
app.use('/pagos', pagoRouter);
app.use('/tarjetas', tarjetaRouter);


app.get('/', function(req, res) {
    res.status(200).send({ message: 'Hello World' });
});

app.post('/charge', (req, res) => {
    console.log(req.body);
    var data = req.body;
    //res.status(200).send({ message: 'ok' });
    // var payoutRequest = {
    //     'method': 'bank_account',
    //     'bank_account': {
    //         'clabe': '4766840919366596',
    //         'holder_name': 'noe orrantia'
    //     },
    //     'amount': 0.50,
    //     'description': 'Retiro de saldo semanal',
    //     'order_id': 'oid-1110011'
    // };

    // openpay.payouts.create(payoutRequest, function(err, payout) {
    //     if (err) {
    //         console.log(err);
    //         return res.status(500).send({ message: `Error ${err}` });
    //     }
    //     console.log(payout);
    //     res.status(200).send({ payout });
    // });
});

app.post('/tarjeta', (req, res) => {

    var cardRequest = {
        'card_number': '4658285101700791',
        'holder_name': 'Noe Orrantia Martinez',
        'expiration_year': '22',
        'expiration_month': '11',
        'cvv2': '042'
    };

    openpay.customers.cards.create('ad0j5w8trcwrbc02dykx', cardRequest, function(err, card) {
        if (err) {
            console.log(err);
            return res.status(500).send({ message: `Error ${err}` });
        }
        console.log(card);
        res.status(200).send({ card });
    });
});

app.post('/cliente', (req, res) => {
    var customerRequest = {
        'name': 'Noe Orrantia Martinez',
        'email': 'eldarkchuy@gmail.com',
        'requires_account': false
    };

    openpay.customers.create(customerRequest, function(err, customer) {
        if (err) {
            console.log(err);
            return res.status(500).send({ message: `Error ${err}` });
        }
        console.log(customer);
        res.status(200).send({ customer });
    });
});

app.post('/pay', (req, res) => {

})

module.exports = app;
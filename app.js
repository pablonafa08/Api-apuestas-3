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

    var newCharge = {
        'source_id': 'ko0apfmajg3ow4yonbku', //es el token generado al parecer, de unico uso al parecer
        "method": "card",
        "amount": 5.00,
        "currency": "MXN",
        'device_session_id': '6A10nMVHh4nXAWOwCImJl4FlTtBG60nm', //id generado desde el frontend con el ------ OpenPay.deviceData.setup("payment-form", "deviceIdHiddenFieldName");
        "description": "Service Charge",
        "order_id": "oid-12358"
    };

    // openpay.charges.create(newCharge, function (error, body){

    //esta es la que usaremos 
    openpay.customers.charges.create('aoeio7sokirftpiugitt', newCharge, function(error, body) {
        if (error) {
            res.status(500).send({ error });
        } else {
            res.status(200).send({ body });
        }
    });

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

    // var cardRequest = {
    //     card_number: '4658285101700791',
    //     holder_name: 'Noe Orrantia Martinez',
    //     expiration_year: '22',
    //     expiration_month: '11',
    //     cvv2: '042'
    // };

    var params = req.body;

    function Tarjeta() {
        this.card_number = "",
            this.holder_name = "",
            this.expiration_year = "",
            this.expiration_month = "",
            this.cvv2 = ""
    }

    var card = new Tarjeta();

    card.card_number = params.card_number;
    card.holder_name = params.holder_name;
    card.expiration_year = params.expiration_year;
    card.expiration_month = params.expiration_month;
    card.cvv2 = params.cvv2;
    var cliente = params.customerid;

    console.log(card);

    //el id del cliente al que se le añade la tarjeta
    openpay.customers.cards.create(cliente, card, function(err, card) {
        if (err) {
            console.log(err);
            return res.status(500).send({ message: `Error ${err}` });
        }
        console.log(card);
        res.status(200).send({ card });
    });
});

app.post('/cliente', (req, res) => {
    // var customerRequest = {
    //     'name': 'Noe',
    //     'last_name':'Orrantia Martinez',
    //     'email': 'eldarkchuy@gmail.com',
    //     'requires_account': false
    // };

    var params = req.body;

    function Cliente() {
        this.name = "",
            this.last_name = "",
            this.email = "",
            this.requires_account = false
    }

    var client = new Cliente();

    client.name = params.name;
    client.last_name = params.last_name;
    client.email = params.email;
    client.requires_account = false;

    openpay.customers.create(client, function(err, customer) {
        if (err) {
            console.log(err);
            return res.status(500).send({ message: `Error ${err}` });
        }
        console.log(customer);
        res.status(200).send({ customer });
    });
});



app.post('/account', (req, res) => {

    var bankaccountRequest = {
        'clabe': '021743064510205017',
        'alias': 'Cuenta principal',
        'holder_name': 'Jose Miguel Mendivil Torres'
    };
    //pide el id del cliente
    openpay.customers.bankaccounts.create('a0qbodtyus5lrhm3lukd', bankaccountRequest, function(error, bankaccount) {
        // ...
        if (error) {
            res.status(500).send({ error });
        } else {
            res.status(200).send({ bankaccount });
        }
    });


    // Metodo bien para obtener id de cuenta bancaria
    // openpay.customers.bankaccounts.get('a0qbodtyus5lrhm3lukd', 'byw6ooktfwfsrimhfxzu', function(error, bankaccount){
    //     // ...
    //   });  card

})

app.post('/pay', (req, res) => {
    var payout = {
        'method': 'bank_account',
        'bank_account': {
            'clabe': '021743064510205017',
            'holder_name': 'pruebas'
        },
        // 'destination_id': 'byw6ooktfwfsrimhfxzu', //es el id de la cuenta bancaria
        'amount': 1.50,
        'description': 'Apuesta de deportes pago',
        'order_id': 'oid-00721'
    };

    var params = req.body;

    // function Pago(){
    //     this.method = "",
    //     this.bank_account = {
    //         clabe="",
    //         holder_name=""
    //     },
    //     this.amount = 0,
    //     this.description = ""
    // }

    // var pago = new Pago();

    // pago.name = params.method;
    // pago.bank_account = params.bank_account;
    // pago.amount = params.amount;
    // pago.description = params.description;


    openpay.customers.payouts.create('a0qbodtyus5lrhm3lukd', payout, function(err, pay) {
        if (err) {
            res.status(500).send({ err });
        } else {
            res.status(200).send({ pay });
        }
    });
})

module.exports = app;
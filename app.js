'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var routes = require('./routes/index');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);

let server = app.listen(3000, function () {
    console.log('Connected to port 3000')
})

var express = require('express');
var app = express();

app.use('/user', require('./user'));
app.use('/upload', require('./upload'));
app.use('/item', require('./item'));

module.exports = app;
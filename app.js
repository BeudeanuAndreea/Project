const express = require('express');
const port = 3200;
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/', express.static(`${__dirname}/public`));

mongoose.connect('mongodb://localhost/project', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', function () {
    console.log("error");
});
db.once('open', function () {
    console.log('db connected');
});
app.listen(port, function () {
    console.log("hey");
});

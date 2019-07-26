const express = require('express');
const port = 3500;
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

// var engines = require('consolidate');
// app.set('andreea', __dirname + '/andreea');
// app.engine('html', engines.mustache);
// app.set('view engine', 'html');

const itemSchema = new Schema({
    artist: String,
    name: String,
    price: Number,
    category_name: String,
    src: String

},{collection: 'item'});
const Item = mongoose.model('Item', itemSchema);

app.get('/items', function (request, response) {
    console.log(request.body);
    Item.find().then((data, error) => {
        if (error === undefined) {
            response.status(200).json(data);
        } else {
            response.status(500).json(null);
        }
    })
});

app.get('/rock/items', function (request, response) {
   
    Item.find({category_name : 'rock'}).then((data, error) => {
        if (error === undefined) {
            response.status(200).json(data);
        } else {
            response.status(500).json(null);
        }
    })
});

app.get('/pop/items', function (request, response) {
   
    Item.find({category_name : 'pop'}).then((data, error) => {
        if (error === undefined) {
            response.status(200).json(data);
        } else {
            response.status(500).json(null);
        }
    })
});

app.get('/jazz/items', function (request, response) {
   
    Item.find({category_name : 'jazz'}).then((data, error) => {
        if (error === undefined) {
            response.status(200).json(data);
        } else {
            response.status(500).json(null);
        }
    })
});

app.get('/hiphop/items', function (request, response) {
   
    Item.find({category_name : 'hiphop'}).then((data, error) => {
        if (error === undefined) {
            response.status(200).json(data);
        } else {
            response.status(500).json(null);
        }
    })
});

app.listen(port, function () {
    console.log("hey");
});


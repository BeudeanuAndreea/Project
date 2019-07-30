const express = require('express');
const port = 3600;
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

}, { collection: 'item' });



const itemUser = new Schema({
    name: String,
    password: String,
    cart: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }]
}, { collection: 'user' });
const Item = mongoose.model('Item', itemSchema);
const User = mongoose.model('User', itemUser);

app.post('/login', function (request, response) {
    User.find({ name: request.body.usermane, password: request.body.password}).then((data, error) => {
         if (error === undefined) {
            response.status(200).json(data);
        } else {
            response.status(500).json(null);
        }
    })
 });

app.get('/items', function (request, response) {
    //console.log(request.body);
    Item.find().then((data, error) => {
        if (error === undefined) {
            response.status(200).json(data);
        } else {
            response.status(500).json(null);
        }
    })
});

app.get('/rock/items', function (request, response) {

    Item.find({ category_name: 'rock' }).then((data, error) => {
        if (error === undefined) {
            response.status(200).json(data);
        } else {
            response.status(500).json(null);
        }
    })
});

app.get('/pop/items', function (request, response) {

    Item.find({ category_name: 'pop' }).then((data, error) => {
        if (error === undefined) {
            response.status(200).json(data);
        } else {
            response.status(500).json(null);
        }
    })
});

app.get('/jazz/items', function (request, response) {

    Item.find({ category_name: 'jazz' }).then((data, error) => {
        if (error === undefined) {
            response.status(200).json(data);
        } else {
            response.status(500).json(null);
        }
    })
});

app.get('/hiphop/items', function (request, response) {

    Item.find({ category_name: 'hiphop' }).then((data, error) => {
        if (error === undefined) {
            response.status(200).json(data);
        } else {
            response.status(500).json(null);
        }
    })
});

app.post('/items/filter', function (request, response) {
    Item.find({ price: { $gt: request.body.min, $lt: request.body.max } }).then((data, error) => {
        if (error === undefined) {
            response.status(200).json(data);
        } else {
            response.status(500).json(null);
        }
    })
});

app.post('/items/filter/both', function (request, response) {
    //console.log(Item.category_name);
    if (Item.category_name == 'rock') {
        Item.find({ price: { $gt: request.body.min, $lt: request.body.max } }).then((data, error) => {
            if (error === undefined) {
                response.status(200).json(data);
            } else {
                response.status(500).json(null);
            }
        })

    }

});
app.put('/items/cart', function (request, response) {
    x = JSON.parse(request.body.elements);
    //console.log(x);
    User.findOne({ _id: "5d3e968c51013124e027fbd0" }, function (err, user) {
        if (err != undefined) {
            response.status(500).json(null);
        }
        else {
            //console.log('user cart first', user.cart);
            for (i = 0; i < x.length; i++) {
                //console.log(x[i]);
                user.cart.push(x[i]);
            }
           // console.log('user cart second', user.cart);
            User.updateOne({ _id: user._id }, user, function (err, newUser) {
            });
        }
    });
});

app.get('/cart', function (request, response) {
    //console.log(request.body);
    
    User.findOne({_id : "5d3e968c51013124e027fbd0" }).populate('cart').then((data, error) => {
        if (error === undefined) {
            response.status(200).json(data);
           // console.log(data.cart[0]);
        } else {
            response.status(500).json(null);
        }
    })
});
app.delete('/delete/item/:id', function (request, response) {
    console.log(request.params.id);
    User.updateOne({ _id: "5d3e968c51013124e027fbd0"},{$pull : {cart :{$in: [request.params.id]}}}).then((data, error) => {
        if (error === undefined) {
            response.status(200).json(data);
        } else {
            response.status(500).json(error);
            
        }
        
    })
});
app.delete('/delete', function (request, response) {
    User.updateOne({ _id: "5d3e968c51013124e027fbd0"}, { $set: { cart: [] }}).then((data, error) => {
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


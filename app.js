const express = require('express');
const port = 3600;
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
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

let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth: {
        user: 'springinterns4@gmail.com',
        pass: 'Project.002'
    },
    tls: {
        rejectUnathorized: false
    }
});
app.post('/send', function(request,response) {
    console.log(request.body);
    let HelperOptions = {
    from: 'springinterns4@gmail.com',
    to: 'springinterns4@gmail.com',
    subject: request.body.email,
    text:request.body.name +"  "+ "sent text: " + request.body.message
};
transporter.sendMail(HelperOptions,(error,info) =>{
    if(error){
         response.status(500).json(null);
       return console.log(error);
    } else{ 
        console.log("the message was sent");
        response.status(200).json(data);
    }
    
});
});


app.post('/login', function (request, response) {
    let user = request.body;
    User.findOne(user, (error, data) => {
        if (error == undefined) {
            if (data === null) {
                response.status(500).json(null);
            } else {
                console.log('here!!!')
                response.status(200).json(data);
            }

        } else {
            response.status(500).json(error);
        }
    })
});

app.get('/items', function (request, response) {
    //console.log(request.body);
    Item.find().then((data) => {
        response.status(200).json(data);
    }, (error) => {
        response.status(500).json(null);
    });
});

app.post('/items/filtered', function (request, response) {
    let filterObject = {};

    if (request.body.category_name) {
        filterObject.category_name = request.body.category_name;
    }
    if (request.body.price) {
        filterObject.price = {
            $gte: request.body.price.min,
            $lte: request.body.price.max
        }
    }

    console.log('obj', filterObject);

    Item.find(filterObject).then((data, error) => {
        if (error === undefined) {
            response.status(200).json(data);
        } else {
            response.status(500).json(null);
        }
    })
});


app.put('/items/cart', function (request, response) {


    //console.log( request.body.id);
    User.findOne({ _id: request.body.userid }, function (err, user) {
        if (err != undefined) {
            response.status(500).json(null);
        } else {
            // console.log(request.body.id);
            user.cart.push(request.body.id);
            User.updateOne({ _id: user._id }, user, function (err, newUser) {
                response.status(200).json(true);
            });
        }
    });
});

app.post('/cart', function (request, response) {
    //console.log(request.body);
    User.findOne({ _id: request.body.uid }).populate('cart').then((data, error) => {

        if (error === undefined) {
            response.status(200).json(data);
        } else {
            response.status(500).json(null);
        }
    })
});
app.post('/cart/second', function (request, response) {
    //console.log(request.body);
    User.findOne({ _id: request.body.uid }).populate('cart').then((data, error) => {

        if (error === undefined) {
            response.status(200).json(data);
        } else {
            response.status(500).json(null);
        }
    })
});
app.delete('/delete/item', function (request, response) {
    console.log(request.body.userid);
    User.findOne({ _id: request.body.userid }, function (err, user) {
        console.log(user);
        if (err != undefined) {
            response.status(500).json(err);
        }
        else {

            for (let i = 0; i < user.cart.length; i++) {
                console.log(user.cart[i], ' ---' , request.body.id);
                if (user.cart[i] == request.body.id) {
                    console.log(true);
                    user.cart.splice(i, 1);
                    break;
                }
            }
            console.log(user.cart);
            User.updateOne({ _id: user._id }, user, function (err, user) {
                response.status(200).json(true);
            });
            //    User.cart.deleteOne({id : request.body.id},function (err, newUser) {response.status(200).json(true);
            //    });

        }
    });
});
// User.updateOne({ _id:  }, { $pull: { cart: { $in: [request.body.id] } } }).then((data, error) => {
//     if (error === undefined) {
//         response.status(200).json(data);
//     } else {
//         response.status(500).json(error);

//     }

// })

app.delete('/delete', function (request, response) {
    User.updateOne({ _id: "5d3e968c51013124e027fbd0" }, { $set: { cart: [] } }).then((data, error) => {
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

const categorySchema = new Schema({
    name: String,
    sales: Number
}, { collection: 'category' });

const Category = mongoose.model('Category', categorySchema);

app.get('/statistics', function (request, response) {
    Category.find().then((data) => {
        response.status(200).json(data);
    }, (error) => {
        response.status(500).json(error);
    });
});
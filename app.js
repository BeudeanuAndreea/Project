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

const userSchema = new Schema({
    username: String,
    password: String
});

const User = mongoose.model('User', userSchema);

// app.get('user/:username', function(request, response) {
//     User.find({username: request.params.username}).then((data, error) => {
//         if (error === undefined) {
//             response.status(200).json(data);
//         } else {
//             response.status(500).json(null);
//         }
//     })
// });

app.post('/demo',function(request, response) {
    User.findOne({ username: request.body.name}, function(error, user) {
              if(user ===null){
                response.end("Login invalid");
             }else if (user.name === request.body.name && user.password === request.body.password){
             response.render('completeprofile',{profileData:user});
           } else {
             console.log("Credentials wrong");
             response.end("Login invalid");
           }
    });
  
 });

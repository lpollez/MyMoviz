require('dotenv').config();
var mongoose = require('mongoose');

var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true, // deprecated à terme
};

mongoose.connect(process.env.DB_NAME, options, function (err) {
  // cette fonction s'execute à la connexion (erreur ou pas)
  console.log(err);
});
